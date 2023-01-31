import { Body, Controller, forwardRef, Get, Inject, Post } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FolderDto } from './dto/folder.dto';
import { FolderService } from './folder.service';
import { Folder } from './schemas/folder.schema';

@Controller('folder')
export class FolderController {
    constructor(
        private folderService: FolderService,
        @Inject(forwardRef(() => FileService)) private fileService: FileService
    ){}

    @Get()
    getFolderName(){
        return this.folderService.getFolderName()
    }

    @Get('file')
    getFileName(){
        return this.fileService.getFileName()
    }

    @Post()
    async createFolder(@Body() folder: FolderDto): Promise<Folder>{
        return this.folderService.createFolder(folder)
    }

}
