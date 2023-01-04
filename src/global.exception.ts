import { HttpException, HttpStatus } from '@nestjs/common'

export class GlobalException extends HttpException{
    constructor(){
        super('Custom Global Exception', HttpStatus.BAD_REQUEST)
    }
}