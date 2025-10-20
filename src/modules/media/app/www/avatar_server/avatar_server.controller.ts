import { Controller, Req, Param, Res, Get } from "@nestjs/common";
import { Avatar_Server_Service } from "./avatar_server.service.js";
import type e from "express";
@Controller("storage")
export class Avatar_Server_Controller {
    constructor(private readonly avatarImageStorerService: Avatar_Server_Service) {}

    @Get("avatar/:avatar_hash")
    posterImage(@Req() req: e.Request, @Param("avatar_hash") avatar_hash: string, @Res() res: e.Response) {
        return this.avatarImageStorerService.serve_avatar_files(req, res, avatar_hash);
    }
}
