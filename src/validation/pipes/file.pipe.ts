import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class FileUploadPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(value.size > 500) return "size limit exceeded"
        return value
    }
}