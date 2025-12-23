import type { UserAccount, UserProfile } from "[orm]/client.js";

/** Типы ответов для маршрута администратора */
export namespace ResponseTypesForAdministratorSection {
    export type get_all_users = (UserAccount & { profile: UserProfile | null })[];
}
