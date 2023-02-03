import { Exclude } from "class-transformer"

export class RegisterEntity{
    name: string
    qualification: string
    year: number
    resume: string
    profile: string

    @Exclude()
    _id: any

    @Exclude()
    __v: number
    

    constructor(partial: Partial<RegisterEntity>){
        Object.assign(this, partial)
    }
    
}