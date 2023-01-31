import { Body, Controller, forwardRef, Get, Inject, OnModuleInit, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { FolderService } from 'src/folder/folder.service';
import { FileDto } from './dto/file.dto';
import { FileService } from './file.service';
import { FileGuard } from './guards/file.guard';
import { File } from './schemas/file.schema';


@Controller('file')
@UseGuards(FileGuard)
export class FileController implements OnModuleInit {
    constructor(
        private fileService: FileService,
        @Inject(forwardRef(() => FolderService)) private folderService: FolderService,
        private moduleRef: ModuleRef,
        @Inject(REQUEST) private req: Record<string, unknown>,
    ){
    }   
    async onModuleInit() {
        const contextId = ContextIdFactory.create()
        console.log("context id: ",contextId)
        this.fileService = this.moduleRef.get(FolderService,{strict: false})
        console.log("init : ",this.fileService)
        const transientServices = await Promise.all([
            this.moduleRef.resolve(FileService, contextId),
            this.moduleRef.resolve(FileService,contextId)
        ])
        console.log(transientServices[0] === transientServices[1])
    }

    @Get()
    getFileName(){
        const cid = ContextIdFactory.getByRequest(this.req)
        console.log(cid)

        // console.log("module : ",this.moduleRef.get(FileService))
        return this.fileService.getFileName()
    }

    @Get('folder')
    getFolderName(){
        return this.folderService.getFolderName()
    }

    @Post()
    createFile(@Body() file: FileDto): Promise<File>{
        return this.fileService.createFile(file)
    }

    @Get(":id")
    transformToPrimitive(@Param('id', new ValidationPipe({transform: true})) id: number){
        console.log(typeof id)
        return id
    }
}
