import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FolderDto } from './dto/folder.dto';
import { Folder, FolderDocument } from './schemas/folder.schema';

@Injectable()
export class FolderService {
    constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>) {}
    async getFolderName(){
        console.log(await this.folderModel.find({}))
        return "config"
    }

    async createFolder(folder: FolderDto): Promise<Folder>{
        folder.createdAt = new Date()
        const newFolder = new this.folderModel(folder)
        return await newFolder.save()
    }
}
