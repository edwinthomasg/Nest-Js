import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDto } from './dto/file.dto';
import { File, FileSchemaDocument } from './schemas/file.schema';

@Injectable({scope: Scope.TRANSIENT})
export class FileService implements OnModuleInit {
    constructor(@Inject(INQUIRER) private parent: object, 
    @InjectModel(File.name) private fileModel: Model<FileSchemaDocument>,
    private configService: ConfigService){
        console.log("called...") 
    }
    onModuleInit() {
        console.log("the module has been initialized ...")
    }
    async getFileName(){
        console.log("token : ",this.configService.get('SECRET_TOKEN'))
        console.log("db : ",this.configService.get("DB"))
        console.log("json config : ",this.configService.get("domain"))
        console.log("sub domain : ",this.configService.get("subdomain.domain"))
        console.log(`${this.parent?.constructor?.name}`)
        // console.log(await this.fileModel.find({}).populate("folder"))
        return "config.yaml"
    }
    async createFile(file: FileDto): Promise<File>{
        file.createdAt = new Date()
        const newFile = new this.fileModel(file)
        console.log(newFile)
        return await newFile.save()
    }

}

// Scope Default - Constructor wont be called on every time
// Scope Req -Constructor called on every reqs
// Scope Transient - Constructor called wherever it is injecting