import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { CustomerNotFoundException } from './notfound.excpetion';
import { CustomerType } from './types/customer.types';

@Injectable()
export class CustomersService {
    private users = [{name: "akash", id: 2, age: 21}]
    greetBrowser(){
        return "Hello Browser"
    }
    addUser(user: CustomerType){
        this.users.push(user)
        return "Created"
    }
    getUserById(id: number){
        let matchedUser = this.users.filter(user => user.id === id)
        // Inbuilt exception
        // if(matchedUser.length === 0) throw new HttpException('No user found', HttpStatusCode.NotFound)

        // Custom exception
        if(matchedUser.length === 0) throw new CustomerNotFoundException('User not found', 404)
        return matchedUser[0]
    }
    sortByAge(age: number){
        if(isNaN(age))
        throw new HttpException('Not a age', HttpStatusCode.BadRequest)
        return this.users.filter(user => user.age >= parseInt(age.toString()))
    }
}

