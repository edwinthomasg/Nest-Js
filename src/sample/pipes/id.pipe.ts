import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class IdPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        return parseInt(value)
    }
}