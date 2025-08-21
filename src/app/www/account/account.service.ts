import type {
    AccountEmail,
    AccountUsername,
    ClientSessionToken,
    ObjectCuid,
    RawUserPassword,
} from "@reanime.art/user-service/types/inputs/infotype.js";
import { bcryptjsService } from "#/utils/services/bcrypt.js";
import { serviceUtils } from "#/utils/service.js";
import { Account_Model as model } from "[www]/account/account.model.js";
import type { Account, Session } from "#/db/orm/client.js";
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "@reanime.art/user-service/errors/client-side/exceptions.js";
import { NotImplementedException } from "@reanime.art/user-service/errors/server-side/exceptions.js";
import { email_is_used } from "#/configs/frequent-errors.js";
/** Account Service */
export const Account_Service = new (class Account_Service {
    explore_me = async (account_id: ObjectCuid): Promise<Account> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);
        return found_user;
    };
    update_email = async ({
        current_email,
        new_email,
        by_account_id,
    }: {
        current_email: AccountEmail;
        new_email: AccountEmail;
        by_account_id: ObjectCuid;
    }): Promise<{
        updated_account: Account;
    }> => {
        const found_user = await model.Get_account_by_email_throw_error(current_email);
        if (found_user.email === new_email) {
            throw new BadRequestException(["Новый адрес электронной почты совпадает со старым. Пожалуйста, введите другую почту"]);
        }
        if (found_user.id !== by_account_id) {
            throw new ForbiddenException(["Вам не разрешено редактировать адрес электронной почты этого пользователя."]);
        }
        const found_user_dublicate = await model.Get_account_by_email_No_Throw_Error(new_email);
        if (found_user_dublicate) {
            throw new ConflictException([email_is_used]);
        }
        const updated_account = await model.update_email_for_one(found_user.id, new_email);
        return { updated_account };
    };

    set_email = async ({ email, account_id }: { email: AccountEmail; account_id: ObjectCuid }): Promise<{ updated_account: Account }> => {
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
        current_password,
        account_id,
    }: {
        account_id: ObjectCuid;
        current_password: RawUserPassword;
        new_password: RawUserPassword;
    }): Promise<{ updated_account: Account }> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);

        if (new_password === current_password) {
            throw new BadRequestException(["Новый введенный пароль и текущий пароль совпадают"]);
        }
        const matches = await bcryptjsService.compare_raw_to_hash(current_password, found_user.password_hash);
        if (!matches) {
            throw new UnauthorizedException(["Текущий пароль неверный"]);
        }
        const new_password_hash = await bcryptjsService.create_hash(new_password);
        const updated_account = await model.update_password_hash_account(found_user.id, new_password_hash);
        return { updated_account };
    };
    update_username = async ({
        new_username,
        account_id,
    }: {
        new_username: AccountUsername;
        account_id: ObjectCuid;
    }): Promise<{
        updated_account: Account;
    }> => {
        const found_user = await model.Get_account_by_its_id_throw_error(account_id);
        if (found_user.username === new_username) {
            throw new ConflictException(["Новый юзернейм совпадает со старым. Введите другое имя пользователя"]);
        }
        const found_account_with_new_username = await model.get_account_by_its_username_no_throw_error(new_username);
        if (found_account_with_new_username) {
            throw new ConflictException(["Конфликт с введенным вами новым юзернеймом. Это имя пользователя уже используется другим аккаунтом"]);
        }

        const updated_account = await model.update_username_for_account(found_user.id, new_username);
        return { updated_account };
    };
    get_sessions = async (account_id: ObjectCuid): Promise<{ sessions: Session[] }> => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const sessions = await model.find_all_sessions_by_account_id(found_account.id);
        return { sessions };
    };
    terminate_other_sessions = async (session_token: ClientSessionToken, account_id: ObjectCuid) => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const this_session_id = (await model.find_one_session_by_its_token(session_token)).id;

        const all_sessions_ids = (await model.find_all_sessions_by_account_id(found_account.id)).map((s) => s.id);
        const deleted_sessions = await model.delete_many_sessions_except_for_one(all_sessions_ids, this_session_id);
        return deleted_sessions.count;
    };

    delete_account = async (
        account_id: ObjectCuid,
    ): Promise<{
        deleted_account: Account;
    }> => {
        const found_account = await model.Get_account_by_its_id_throw_error(account_id);
        const found_profile = await model.find_profile_by_account_id(found_account.id);
        if (found_profile.cover_url_hash) {
            throw new NotImplementedException("Мы пока не можем удалять обложки");
        }
        if (found_profile.avatar_url_hash) {
            await serviceUtils.request_to_media_service_to_delete_avatar(found_profile.id, found_profile.avatar_url_hash);
        }
        const deleted_account = await model.delete_account_by_its_id(found_account.id);
        return {
            deleted_account,
        };
    };
})();

