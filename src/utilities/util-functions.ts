import type ExpressJS from "express";
import { BadRequestException } from "#src/errors/client-side-exceptions.ts";
import { isDeepStrictEqual } from "node:util";
import { searchQueriesAreOutOfRangeErrorMessage } from "#src/constants/frequent-errors.ts";
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
 * Get specified value of the search params
 * @param query
 * @param field
 * @returns value of query
 */
export function getReqQueryField(query: ExpressJS.Request["query"], field: string) {
    let fieldValue: null | string = null;
    for (const sqKey in query) {
        if (Object.hasOwn(query, sqKey)) {
            const SQName = query[sqKey];
            if (field !== sqKey) {
                throw new BadRequestException([searchQueriesAreOutOfRangeErrorMessage]);
            }
            fieldValue = String(SQName);
        }
    }
    if (fieldValue === null) {
        throw new BadRequestException(["требуется параметр поиска страницы"]);
    }
    return fieldValue;
}
/**
 * Gets specified array of values of the search params
 * @param query
 * @param fields
 * @returns
 */
export function getReqQueryFields<SearchQueryFields extends string[]>(
    query: ExpressJS.Request["query"],
    fields: SearchQueryFields,
) {
    const fieldsValueObject: { [keys: string]: string } = {};
    for (const objectKey in query) {
        if (Object.hasOwn(query, objectKey)) {
            const field = query[objectKey];
            fieldsValueObject[objectKey] = String(field);
        }
    }
    const avKeys = Object.keys(fieldsValueObject);
    for (const neededSP of fields) {
        if (!Object.hasOwn(fieldsValueObject, neededSP)) {
            throw new BadRequestException([`Требуется параметр поиска для \'${neededSP}\'`]);
        }
    }
    if (!allDeepEqual([avKeys, fields])) {
        throw new BadRequestException([searchQueriesAreOutOfRangeErrorMessage]);
    }
    return fieldsValueObject as {
        [keys in SearchQueryFields[number]]: string;
    };
}
