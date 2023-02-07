import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      name: 'ross',
      series: 'friends',
      password: "ross@2918"
    },
    {
      name: 'rach',
      series: 'friends',
      password: "rach@2918"
    },
    {
      name: 'joey',
      series: 'friends',
      password: "joey@2918"
    },
    {
      name: 'chandler',
      series: 'friends',
      password: "chandler@2918"
    },
    {
      name: 'monica',
      series: 'friends',
      password: "monica@2918"
    },
  ];
  getUser(username: string) {
    return this.users.find(user => user.name === username)
  }
}
