import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { FilterQuery, Model } from "mongoose";
import { Register, RegisterDocument, REGISTER_MODEL } from "../schemas/register.schema";

@Injectable()
export class RegisterRepository{
    constructor(@InjectModel(REGISTER_MODEL) private registerModel: Model<RegisterDocument>,
    private scheduleRegistry: SchedulerRegistry){}

    async registerClient(entry: any, fileNames: Array<string>): Promise<Register>{
        entry.resume = fileNames[0]
        entry.profile = fileNames[1]
        const newEntry = new this.registerModel(entry)
        const timeout = setTimeout(() => {
            console.log("successfully registered")
        },2000)
        this.scheduleRegistry.addTimeout("REGISTERED", timeout)
        return await newEntry.save()
    }

    async getClientById(filterQuery: FilterQuery<Register>){
        // this.scheduleRegistry.deleteCronJob("DATA_LOADED")
        return await this.registerModel.findOne(filterQuery)
    }

    // @Cron('* * * * * *', {
    //     name: "DATA_LOADED"
    // })
    // dataLoaded(){
    //     console.log("LOADING")
    // }
    
}