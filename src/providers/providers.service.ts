import { Injectable, Scope } from "@nestjs/common";
import { ConfigData } from "./interfaces/interface.type";

@Injectable(({scope: Scope.REQUEST}))
export class ProvidersService{
    config = {
        baseUrl: "http://localhost:3000/aspire",
        portNumber: 3000,
        title: "Business site"
    }

    getConfigData(): ConfigData{
        return this.config
    }

}