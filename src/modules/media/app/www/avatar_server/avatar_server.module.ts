import { Module } from "@nestjs/common";
import { Avatar_Server_Service } from "./avatar_server.service.js";
import { Avatar_Server_Controller } from "./avatar_server.controller.js";

@Module({
    controllers: [Avatar_Server_Controller],
    providers: [Avatar_Server_Service],
})
export class Avatar_Server_Module {}
