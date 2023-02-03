import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { RegisterationDto } from "./dto/register.dto";
import { RegisterRepository } from "./repository/register.repo";
import { Register } from "./schemas/register.schema";

@Injectable()
export class RegisterService{   
    constructor(private registerRepo: RegisterRepository,
        private eventEmitter: EventEmitter2){}

    async registerClient(entry: RegisterationDto, files: any){
        const fileNames = Object.values(files).map((file: any) => file[0] && file[0].originalname)        
        return await this.registerRepo.registerClient(entry, fileNames)
    }

    async getClientById(id: string){
        this.eventEmitter.emit("data-load", "loaded")
        return await this.registerRepo.getClientById({_id: id})
    }

    @OnEvent("data-load")
    listenData(payload: any){
        console.log("data message : ",payload)
    }
}