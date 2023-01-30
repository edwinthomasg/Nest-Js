import { Controller, Get, HttpException, Param, SetMetadata, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from './decorator/role.decorator';
import { ExceptionFilters } from './filters/exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { SampleInterceptor } from './interceptors/sample.interceptor';
import { IdPipe } from './pipes/id.pipe';
import { SampleService } from './sample.service';

@Controller('sample')
@UseGuards(AuthGuard)
export class SampleController {
    constructor(private sampleService: SampleService) {}
    @Get()
    // @UseInterceptors(SampleInterceptor)
    @Roles('admin','user')
    // @SetMetadata('roles', ['admin'])
    getSampleData(){
        return this.sampleService.getSampleData()
    }

    @Get('param/:id')
    getParamId(@Param('id', new IdPipe()) id: number){
        return typeof id
    }

    @Get('filter')
    @UseFilters(ExceptionFilters)
    getExceptionFilter(){
        throw new HttpException("exception", 400)
        // return "filter"
    }

}
