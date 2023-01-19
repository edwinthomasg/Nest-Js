import { Controller, Get, Inject, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Products } from 'src/ecommerce/products.dto';
import { DependencyService } from './dependency.service';
import { OverideDependencyService } from './overide.service';
import { Express } from 'express'
import { readFile } from 'fs';
import { FilePipe } from './file.pipe';
import { diskStorage } from 'multer';
import { dirname } from 'path';

@Controller('dependency')
export class DependencyController {
    constructor(private dependencyService: DependencyService, private overideDependency: OverideDependencyService, 
        @Inject('SERVICE') private service: DependencyService) {}
    
    @Get()
    getDependencyItems(): Products{
        console.log("dependency override : ",this.overideDependency.getDependencyItems())
        console.log(this.dependencyService === this.overideDependency)
        console.log(this.dependencyService.getDependencyItems())
        console.log("service : ",this.service.getDependencyItems()) //testing of use factory
        return this.dependencyService.getDependencyItems()
    }

    @Post('file-upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "./files",
            filename: (req, file, cb) => {
                console.log("file inside : ",file)
                const modFileName = `${Math.round(Math.random() * 1e9)}-${dirname(file.mimetype)}`
                cb(null, modFileName)
            }
        })
    }))
    @UsePipes(new FilePipe())
    uploadFiles(@UploadedFile() file: Express.Multer.File){
        file.buffer ? console.log(file.buffer.toString()) :  console.log(file)
        return "file posted"

    }

}
