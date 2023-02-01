import { DynamicModule, MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SampleMiddleware } from './middlewares/sample.middleware';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service'
import { Sample, SampleSchemaDesign } from './schemas/sample.schema';

interface sampleOption{
    name: string
}

@Module({})
export class SampleModule implements NestModule{

    constructor(){
        console.log("intitialized sample module")
      }

    static register(sample:sampleOption): DynamicModule{
        console.log(sample)
        return{
            module: SampleModule,
            imports:[MongooseModule.forFeature([{name: Sample.name, schema: SampleSchemaDesign}])],
            controllers: [SampleController],
            providers: [SampleService]
        }
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SampleMiddleware).forRoutes({path: 'v1/sample', method: RequestMethod.GET})
    }
    
}
