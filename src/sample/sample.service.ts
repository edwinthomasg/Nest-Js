import { BeforeApplicationShutdown, Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sample, SampleDocument } from './schemas/sample.schema';

@Injectable()
export class SampleService implements OnModuleInit, OnApplicationShutdown, OnModuleDestroy, BeforeApplicationShutdown{
    constructor(@InjectModel(Sample.name) private sampleModel: Model<SampleDocument>) {}
    onModuleDestroy() {
        console.log("on destroy - called after sigterm(app close)")
    }
    beforeApplicationShutdown(signal?: string | undefined) {
        console.log("on before app shut down")
    }
    onModuleInit() {
        console.log("the module has been initialized")
    }
    onApplicationShutdown(signal?: string | undefined) {
        console.log("signal : ",signal)
    }
    async getSampleData(){
        console.log("data : ", await this.sampleModel.find({}))
        return "sample data"
    }
}
