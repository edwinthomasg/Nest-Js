import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { FolderService } from './folder.service';

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
}
