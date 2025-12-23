import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "#/errors/client-side-exceptions.js";
import { NotImplementedException } from "#/errors/server-side-exceptions.js";
import type {
    iAccountEmail,
    iAccountUsername,
    DbCuidType,
    iRawUserPassword,
    TokenSelector,
} from "#/shared/types-shared/informative-input-types-shared.js";
import { passwordHashingService } from "#/utilities/cryptography-services/hash-passwords.service.js";
import type { LoginSession, UserAccount } from "[orm]/client.js";
import { Account_Model } from "#/app/account/account.model.js";
import { mediaRouteService } from "#/app/media/media.service.js";
import { emailIsUsedErrorMessage } from "#/constants/frequent-errors.js";
/** UserAccount Service */
class AccountRouteServiceClass {
    explore_me = async (account_id: DbCuidType): Promise<UserAccount> => {
        const found_user = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        return found_user;
    };
    update_email = async ({
        current_email,
        new_email,
        by_account_id,
    }: {
        current_email: iAccountEmail;
        new_email: iAccountEmail;
        by_account_id: DbCuidType;
    }): Promise<{
        updated_account: UserAccount;
    }> => {
        const found_user = await Account_Model.Get_account_by_email_throw_error(current_email);
        if (found_user.email === new_email) {
            throw new BadRequestException(["Новый адрес электронной почты совпадает со старым. Пожалуйста, введите другую почту"]);
        }
        if (found_user.id !== by_account_id) {
            throw new ForbiddenException(["Вам не разрешено редактировать адрес электронной почты этого пользователя."]);
        }
        const found_user_duplicate = await Account_Model.Get_account_by_email_No_Throw_Error(new_email);
        if (found_user_duplicate) {
            throw new ConflictException([emailIsUsedErrorMessage]);
        }
        const updated_account = await Account_Model.update_email_for_one(found_user.id, new_email);
        return { updated_account };
    };
    set_email = async ({ email, account_id }: { email: iAccountEmail; account_id: DbCuidType }): Promise<boolean> => {
        const account_by_id = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        if (account_by_id.email) {
            throw new BadRequestException(["У этой учетной записи уже есть адрес электронной почты, вам нужно обновить его настройках"]);
        }
        const account_by_email = await Account_Model.Get_account_by_email_throw_error(email);
        if (account_by_email) {
            throw new NotFoundException([emailIsUsedErrorMessage]);
        }
        await Account_Model.update_email_for_one(account_by_id.id, email);
        return true;
    };
    update_password = async ({
        new_password,
        repeat_new_password,
        current_password,
        account_id,
    }: {
        account_id: DbCuidType;
        current_password: iRawUserPassword;
        new_password: iRawUserPassword;
        repeat_new_password: iRawUserPassword;
    }): Promise<boolean> => {
        const accountPassword = await Account_Model.getPasswordDataFromAccountId(account_id);

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
            throw new UnauthorizedException(["Текущий пароль неверный"]);
        }
        const new_password_hash = await passwordHashingService.hashPasswordArgon2id(new_password);
        await Account_Model.update_password_hash_account({
            account_id,
            hashResult: new_password_hash,
            password_id: accountPassword.id,
        });
        return true;
    };
    update_username = async ({ new_username, account_id }: { new_username: iAccountUsername; account_id: DbCuidType }): Promise<boolean> => {
        const found_user = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        if (found_user.username === new_username) {
            throw new ConflictException(["Новый юзернейм совпадает со старым. Введите другое имя пользователя"]);
        }
        const found_account_with_new_username = await Account_Model.get_account_by_its_username_no_throw_error(new_username);
        if (found_account_with_new_username) {
            throw new ConflictException(["Конфликт с введенным вами новым юзернеймом. Это имя пользователя уже используется другим аккаунтом"]);
        }

        const updated_username = await Account_Model.update_username_for_account(found_user.id, new_username);
        return !!updated_username;
    };
    get_sessions = async (account_id: DbCuidType): Promise<{ sessions: LoginSession[] }> => {
        const found_account = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        const sessions = await Account_Model.find_all_sessions_by_account_id(found_account.id);
        return { sessions };
    };
    /** Возвращает количество удалённых сессий */
    terminate_other_sessions = async (selector: TokenSelector, account_id: DbCuidType): Promise<number> => {
        const found_account = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        const this_session_id = (await Account_Model.find_one_session_by_its_selector(selector)).id;

        const all_sessions_ids = (await Account_Model.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const deleted_sessions = await Account_Model.delete_many_sessions_except_for_one(all_sessions_ids, this_session_id);
        return deleted_sessions.count;
    };

    terminate_specific_session = async (targetSessionIdToDelete: DbCuidType, account_id: DbCuidType) => {
        const found_account = await Account_Model.Get_account_by_its_id_throw_error(account_id);

        const all_sessions_ids = (await Account_Model.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const isThisSessionOwner = all_sessions_ids.includes(targetSessionIdToDelete);
        if (!isThisSessionOwner) {
            throw new UnauthorizedException(["Айди сессии неправилен или вы не являетесь собственником этой сессии"]);
        }
        await Account_Model.delete_one_session_by_id(targetSessionIdToDelete);
        return true;
    };
    delete_account = async (account_id: DbCuidType): Promise<boolean> => {
        const found_account = await Account_Model.Get_account_by_its_id_throw_error(account_id);
        const found_profile = await Account_Model.find_profile_by_account_id_with_data_about_cover_and_avatar(found_account.id);
        if (found_profile.cover) {
            throw new NotImplementedException("Мы пока не можем удалять обложки, пожалуйста, попробуйте позже");
        }
        if (found_profile.avatar) {
            await mediaRouteService.avatar_delete(found_profile.id);
        }
        await Account_Model.delete_account_by_its_id(found_account.id);
        return true;
    };
}

export const accountRouteService = new AccountRouteServiceClass();
