import type { default as ExpressJS } from "express";
import { BadRequestException } from "#/errors/client-side-exceptions.js";
import { isDeepStrictEqual } from "node:util";
import { searchQueriesAreOutOfRangeErrorMessage } from "#/constants/frequent-errors.js";
/** Capitalizes First Letter of the string and lowercases the rest */
export function capitalizeFirstLetter(str: string): string {
    const low = str.toLowerCase();
    return low.charAt(0).toUpperCase() + low.slice(1);
}

/**
 * Deeply compares all elements of an array for strict structural equality.
 * Return `true` when every element in `objs` is deeply equal to the first element.
 *
 * Uses Node's `util.isDeepStrictEqual` (deep, strict equality).
 */
export function allDeepEqual<T>(objs: T[]): boolean {
    if (!Array.isArray(objs)) {
        throw new TypeError(`allDeepEqual expects an array argument, but received: ${typeof objs}`);
    }
    if (objs.length < 2) {
        throw new TypeError(`allDeepEqual requires at least two elements to compare — received ${objs.length}.`);
    }
    const first = objs[0];
    return objs.every((o) => isDeepStrictEqual(o, first));
}

/**
 * Gets specified value of the search params
 * @param query
 * @param spName
 * @returns
 */
export function get_universal_search_query_value(query: ExpressJS.Request["query"], spName: string) {
    let spNameV: null | string = null;
    for (const sqKey in query) {
        if (Object.hasOwn(query, sqKey)) {
            const SQName = query[sqKey];
            if (spName !== sqKey) {
                throw new BadRequestException([searchQueriesAreOutOfRangeErrorMessage]);
            }
            spNameV = String(SQName);
        }
    }
    if (spNameV === null) {
        throw new BadRequestException(["требуется параметр поиска страницы"]);
    }
    return spNameV;
}
/**
 * Gets specified array of values of the search params
 * @param query
 * @param spNames
 * @returns
 */
export function get_universal_search_query_values_array<search_query_names extends string[]>(
    query: ExpressJS.Request["query"],
    spNames: search_query_names,
) {
    const spAccumulator: { [keys: string]: string } = {};
    for (const sqKey in query) {
        if (Object.hasOwn(query, sqKey)) {
            const SQName = query[sqKey];
            spAccumulator[sqKey] = String(SQName);
        }
    }
    const avKeys = Object.keys(spAccumulator);
    for (const neededSP of spNames) {
        if (!Object.hasOwn(spAccumulator, neededSP)) {
            throw new BadRequestException([`Требуется параметр поиска для \'${neededSP}\'`]);
        }
    }
    if (!allDeepEqual([avKeys, spNames])) {
        throw new BadRequestException([searchQueriesAreOutOfRangeErrorMessage]);
    }
    return spAccumulator as {
        [keys in search_query_names[number]]: string;
    };
}
