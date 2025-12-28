import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "#src/errors/client-side-exceptions.ts";
import { NotImplementedException } from "#src/errors/server-side-exceptions.ts";
import { passwordHashingService } from "#src/utilities/cryptography-services/hash-passwords.service.ts";
import type { LoginSession, UserAccount } from "#orm";
import { accountSectionModels } from "#src/app/user-account/user-account.model.ts";
import { mediaSectionService } from "#src/app/media/media.service.ts";
import { emailIsUsedErrorMessage } from "#src/constants/frequent-errors.ts";
/** UserAccount Service */
class AccountRouteServiceClass {
    explore_me = async (account_id: string): Promise<UserAccount> => {
        const found_user = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        return found_user;
    };
    update_email = async ({
        current_email,
        new_email,
        by_account_id,
    }: {
        current_email: string;
        new_email: string;
        by_account_id: string;
    }): Promise<boolean> => {
        const found_user = await accountSectionModels.Get_account_by_email_throw_error(current_email);
        if (found_user.email === new_email) {
            throw new BadRequestException(["Новый адрес электронной почты совпадает со старым. Пожалуйста, введите другую почту"]);
        }
        if (found_user.id !== by_account_id) {
            throw new ForbiddenException(["Вам не разрешено редактировать адрес электронной почты этого пользователя."]);
        }
        const found_user_duplicate = await accountSectionModels.Get_account_by_email_No_Throw_Error(new_email);
        if (found_user_duplicate) {
            throw new ConflictException([emailIsUsedErrorMessage]);
        }
        const updated_account = await accountSectionModels.update_email_for_one(found_user.id, new_email);
        return !!updated_account;
    };
    set_email = async ({ email, account_id }: { email: string; account_id: string }): Promise<boolean> => {
        const account_by_id = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        if (account_by_id.email) {
            throw new BadRequestException(["У этой учетной записи уже есть адрес электронной почты, вам нужно обновить его настройках"]);
        }
        const account_by_email = await accountSectionModels.Get_account_by_email_throw_error(email);
        if (account_by_email) {
            throw new NotFoundException([emailIsUsedErrorMessage]);
        }
        await accountSectionModels.update_email_for_one(account_by_id.id, email);
        return true;
    };
    update_password = async ({
        new_password,
        repeat_new_password,
        current_password,
        account_id,
    }: {
        account_id: string;
        current_password: string;
        new_password: string;
        repeat_new_password: string;
    }): Promise<boolean> => {
        const accountPassword = await accountSectionModels.getPasswordDataFromAccountId(account_id);

        if (new_password === current_password) {
            throw new BadRequestException(["Новый введенный пароль и текущий пароль совпадают"]);
        }
        if (new_password !== repeat_new_password) {
            throw new BadRequestException(["Новый введенный пароль и его повторный ввод различаются!"]);
        }
        const matches = await passwordHashingService.verifyPasswordWithStored({
            stored: accountPassword,
            password: current_password,
        });
        if (!matches) {
            throw new UnauthorizedException("Текущий пароль неверный");
        }
        const new_password_hash = await passwordHashingService.hashPasswordArgon2id(new_password);
        await accountSectionModels.update_password_hash_account({
            account_id,
            hashResult: new_password_hash,
            password_id: accountPassword.id,
        });
        return true;
    };
    update_username = async ({ new_username, account_id }: { new_username: string; account_id: string }): Promise<boolean> => {
        const found_user = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        if (found_user.username === new_username) {
            throw new ConflictException(["Новый юзернейм совпадает со старым. Введите другое имя пользователя"]);
        }
        const found_account_with_new_username = await accountSectionModels.get_account_by_its_username_no_throw_error(new_username);
        if (found_account_with_new_username) {
            throw new ConflictException(["Конфликт с введенным вами новым юзернеймом. Это имя пользователя уже используется другим аккаунтом"]);
        }

        const updated_username = await accountSectionModels.update_username_for_account(found_user.id, new_username);
        return !!updated_username;
    };
    get_sessions = async (account_id: string): Promise<{ sessions: LoginSession[] }> => {
        const found_account = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        const sessions = await accountSectionModels.find_all_sessions_by_account_id(found_account.id);
        return { sessions };
    };
    /** Возвращает количество удалённых сессий */
    terminate_other_sessions = async (selector: string, account_id: string): Promise<number> => {
        const found_account = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        const this_session_id = (await accountSectionModels.find_one_session_by_its_selector(selector)).id;

        const all_sessions_ids = (await accountSectionModels.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const deleted_sessions = await accountSectionModels.delete_many_sessions_except_for_one(all_sessions_ids, this_session_id);
        return deleted_sessions.count;
    };

    terminate_specific_session = async (targetSessionIdToDelete: string, account_id: string) => {
        const found_account = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);

        const all_sessions_ids = (await accountSectionModels.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const isThisSessionOwner = all_sessions_ids.includes(targetSessionIdToDelete);
        if (!isThisSessionOwner) {
            throw new UnauthorizedException("Айди сессии неправилен или вы не являетесь собственником этой сессии");
        }
        await accountSectionModels.delete_one_session_by_id(targetSessionIdToDelete);
        return true;
    };
    delete_account = async (account_id: string): Promise<boolean> => {
        const found_account = await accountSectionModels.Get_account_by_its_id_throw_error(account_id);
        const found_profile = await accountSectionModels.find_profile_by_account_id_with_data_about_cover_and_avatar(found_account.id);
        if (found_profile.cover) {
            throw new NotImplementedException("Мы пока не можем удалять обложки, пожалуйста, попробуйте позже");
        }
        if (found_profile.avatar) {
            await mediaSectionService.delete_avatar(found_profile.id);
        }
        await accountSectionModels.delete_account_by_its_id(found_account.id);
        return true;
    };
}

export const accountRouteService = new AccountRouteServiceClass();
