import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class CustomersPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("Pipe : ",value)
    }
}