import { BadRequestException } from "@reanime.art/user-service/errors/client-side/exceptions.js";
import type e from "express";

export const global_Utilities = new (class global_Utilities {
    /** Capitalizes First Letter of the string and lowercases the rest */
    capitalizeFirstLetter = (str: string): string => {
        const low = str.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    };
    /** Checks if 2 objects are equal to each other. Returns `true` if equal, `false` otherwise. */
    deep_equal = <T, O>(obj1: T, obj2: O): boolean => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };
    /** Checks an `array` of elements of type `any` for consistency with each other. Returns `true` if equal, `false` otherwise. */
    deep_equals = <O>(objs: O[]) => {
        if (objs.at(0) === undefined) {
            throw new ReferenceError("The first argument in the Check function is undefined");
        }
        const objSTR: string[] = [];
        for (const el of objs) {
            objSTR.push(JSON.stringify(el));
        }
        for (const objjson of objSTR) {
            if (objSTR.at(0) !== objjson) {
                return false;
            }
        }
        return true;
    };

    sleep = async (ms: number): Promise<void> => {
        return await new Promise((resolve: () => void, reject) => {
            return setTimeout(resolve, ms);
        });
    };

    /**
     * Gets specified value of the search params
     * @param query
     * @param spName
     * @returns
     */
    get_universal_search_query_value = (query: e.Request["query"], spName: string) => {
        let spNameV: null | string = null;
        for (const sqKey in query) {
            if (Object.hasOwn(query, sqKey)) {
                const sqname = query[sqKey];
                if (spName !== sqKey) {
                    throw new BadRequestException(["Search queries are out of range"]);
                }
                spNameV = String(sqname);
            }
        }
        if (spNameV === null) {
            throw new BadRequestException(["page search param is required"]);
        }
        return spNameV;
    };
    /**
     * Gets specified array of values of the search params
     * @param query
     * @param spNames
     * @returns
     */
    get_universal_search_query_values_array = <search_query_names extends string[]>(query: e.Request["query"], spNames: search_query_names) => {
        const spAccumulator: { [keys: string]: string } = {};
        for (const sqKey in query) {
            if (Object.hasOwn(query, sqKey)) {
                const sqname = query[sqKey];
                spAccumulator[sqKey] = String(sqname);
            }
        }
        const avKeys = Object.keys(spAccumulator);

        for (const neededSP of spNames) {
            if (!Object.hasOwn(spAccumulator, neededSP)) {
                throw new BadRequestException([`Search param for \'${neededSP}\' is required`]);
            }
        }
        if (!this.deep_equals([avKeys, spNames])) {
            throw new BadRequestException(["Search queries are out of range"]);
        }

        return spAccumulator as {
            [keys in search_query_names[number]]: string;
        };
    };
})();

