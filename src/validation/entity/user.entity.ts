import { Exclude, Expose, Transform } from "class-transformer"

export class UserEntity{
    name: string
    email: string
    @Transform(({value}) => {
        console.log(value)
        return value.location
    })
    company: object

    @Exclude()
    password: string

    @Expose()
    get emailAddress(): string{
        return this.email
    }

    constructor(partial: Partial<UserEntity>){
        Object.assign(this, partial)
    }
}