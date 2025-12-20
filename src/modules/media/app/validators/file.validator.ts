import { BadRequestException, PayloadTooLargeException } from "#/modules/errors/client-side/exceptions.js";
import type Express from "express";
/** 25 MB */
export const PAYLOAD_MAX_SIZE = 25 * 1_024 * 1_024; // 25 MB
/** For UPDATE/SET Middleware for validating upcoming image file body */
export function Set_Image_File_Validator(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    const size = Number(req.headers["content-length"]) ?? 0;
    if (!req.headers["content-type"]) {
        throw new BadRequestException(["There are not any content type header value"]);
    }
    if (size > PAYLOAD_MAX_SIZE) {
        throw new PayloadTooLargeException("The file size exceeds the maximum allowed limit of 25 MB.");
    }
    if (size === 0) {
        throw new BadRequestException(["The file size is 0"]);
    }
    return next();
}
