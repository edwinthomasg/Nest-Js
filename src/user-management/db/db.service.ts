import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
    private readonly users = [
        {
            name: "edwin",
            email: "edwin@gmail.com",
            password: "edwin2918"
        },
        {
            name: "akash",
            email: "akash@gmail.com",
            password: "akash2918"
        },
        {
            name: "karthik",
            email: "karthi@gmail.com",
            password: "karthi2918"
        }
    ]
    findUser(username: string){
        return this.users.find((user) => user.name === username)
    }
}
