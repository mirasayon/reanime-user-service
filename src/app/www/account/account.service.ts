import { email_is_used } from "#/configs/frequent-errors.js";
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "#/modules/errors/client-side/exceptions.js";
import { NotImplementedException } from "#/modules/errors/server-side/exceptions.js";
import { avatarService } from "#/modules/media/app/profile-avatar.service.js";
import type { iAccountEmail, iAccountUsername, iObjectCuid, iRawUserPassword, TokenSelector } from "#/shared/types/inputs/informative.types.js";
import { bcryptjsService } from "#/utils/services/bcrypt.js";
import type { LoginSession, UserAccount } from "[orm]";
import { Account_Model as model } from "[www]/account/account.model.js";
/** UserAccount Service */
export const Account_Service = new (class Account_Service {
    explore_me = async (account_id: iObjectCuid): Promise<UserAccount> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);
        return found_user;
    };
    update_email = async ({
        current_email,
        new_email,
        by_account_id,
    }: {
        current_email: iAccountEmail;
        new_email: iAccountEmail;
        by_account_id: iObjectCuid;
    }): Promise<{
        updated_account: UserAccount;
    }> => {
        const found_user = await model.Get_account_by_email_throw_error(current_email);
        if (found_user.email === new_email) {
            throw new BadRequestException(["Новый адрес электронной почты совпадает со старым. Пожалуйста, введите другую почту"]);
        }
        if (found_user.id !== by_account_id) {
            throw new ForbiddenException(["Вам не разрешено редактировать адрес электронной почты этого пользователя."]);
        }
        const found_user_duplicate = await model.Get_account_by_email_No_Throw_Error(new_email);
        if (found_user_duplicate) {
            throw new ConflictException([email_is_used]);
        }
        const updated_account = await model.update_email_for_one(found_user.id, new_email);
        return { updated_account };
    };

    set_email = async ({ email, account_id }: { email: iAccountEmail; account_id: iObjectCuid }): Promise<{ updated_account: UserAccount }> => {
        const account_by_id = await model.Get_account_by_its_id_throw_error(account_id);
        if (account_by_id.email) {
            throw new BadRequestException(["У этой учетной записи уже есть адрес электронной почты, вам нужно обновить его настройках"]);
        }
        const account_by_email = await model.Get_account_by_email_throw_error(email);
        if (account_by_email) {
            throw new NotFoundException([email_is_used]);
        }
        const updated_account = await model.update_email_for_one(account_by_id.id, email);
        return { updated_account };
    };
    update_password = async ({
        new_password,
        repeat_new_password,
        current_password,
        account_id,
    }: {
        account_id: iObjectCuid;
        current_password: iRawUserPassword;
        new_password: iRawUserPassword;
        repeat_new_password: iRawUserPassword;
    }): Promise<boolean> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);

        if (new_password === current_password) {
            throw new BadRequestException(["Новый введенный пароль и текущий пароль совпадают"]);
        }
        if (new_password !== repeat_new_password) {
            throw new BadRequestException(["Новый введенный пароль и его повторный ввод различаются!"]);
        }
        const matches = await bcryptjsService.compare_raw_to_hash(current_password, found_user.password_hash);
        if (!matches) {
            throw new UnauthorizedException(["Текущий пароль неверный"]);
        }
        const new_password_hash = await bcryptjsService.create_hash(new_password);
        const is_password_updated = await model.update_password_hash_account(found_user.id, new_password_hash);
        return !!is_password_updated;
    };
    update_username = async ({ new_username, account_id }: { new_username: iAccountUsername; account_id: iObjectCuid }): Promise<boolean> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);
        if (found_user.username === new_username) {
            throw new ConflictException(["Новый юзернейм совпадает со старым. Введите другое имя пользователя"]);
        }
        const found_account_with_new_username = await model.get_account_by_its_username_no_throw_error(new_username);
        if (found_account_with_new_username) {
            throw new ConflictException(["Конфликт с введенным вами новым юзернеймом. Это имя пользователя уже используется другим аккаунтом"]);
        }

        const updated_username = await model.update_username_for_account(found_user.id, new_username);
        return !!updated_username;
    };
    get_sessions = async (account_id: iObjectCuid): Promise<{ sessions: LoginSession[] }> => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const sessions = await model.find_all_sessions_by_account_id(found_account.id);
        return { sessions };
    };
    terminate_other_sessions = async (session_token: TokenSelector, account_id: iObjectCuid) => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const this_session_id = (await model.find_one_session_by_its_token(session_token)).id;

        const all_sessions_ids = (await model.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const deleted_sessions = await model.delete_many_sessions_except_for_one(all_sessions_ids, this_session_id);
        return deleted_sessions.count;
    };

    terminate_specific_session = async (targetSessionIdToDelete: iObjectCuid, account_id: iObjectCuid) => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);

        const all_sessions_ids = (await model.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const isThisSessionOwner = all_sessions_ids.includes(targetSessionIdToDelete);
        if (!isThisSessionOwner) {
            throw new UnauthorizedException(["Айди сессии неправилен или вы не являетесь собственником этой сессии"]);
        }
        const deleted_session = await model.delete_one_session_by_id(targetSessionIdToDelete);
        return deleted_session;
    };

    delete_account = async (
        account_id: iObjectCuid,
    ): Promise<{
        deleted_account: UserAccount;
    }> => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const found_profile = await model.find_profile_by_account_id_with_data_about_cover_and_avatar(found_account.id);
        if (found_profile.cover) {
            throw new NotImplementedException("Мы пока не можем удалять обложки");
        }
        if (found_profile.avatar) {
            await avatarService.avatar_delete(found_profile.id);
        }
        const deleted_account = await model.delete_account_by_its_id(found_account.id);
        return {
            deleted_account: deleted_account,
        };
    };
})();
