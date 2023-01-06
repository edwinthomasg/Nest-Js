import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class TransformPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(value === "one")
        return 1
        else return value
    }
}