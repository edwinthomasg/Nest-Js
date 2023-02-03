import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class TransformPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        value.year = !isNaN(parseInt(value.year))  && parseInt(value.year)
        return value
    }
}