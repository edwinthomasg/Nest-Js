import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class IdPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const id = parseInt(value)
        return id
    }
}