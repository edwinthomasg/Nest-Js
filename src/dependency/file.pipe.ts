import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common'

@Injectable()
export class FilePipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const status = value.size > 1000 ? new Error("size limit exceeded") : value
        return status
    }
}