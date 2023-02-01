import { PartialType } from "@nestjs/mapped-types";
import { CreateDto } from "./create-user.dto";

export class UpdateDto extends PartialType(CreateDto) {}