import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class ProductService {
    @Inject(AdminService)
    private adminService: AdminService

    async getAllProducts() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")

        return response.data
      }
      async getProduct(id: number){
        console.log("search id : ",id)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response.data
      }
      async getProductByFilter(userId: string, id: string){
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&id=${id}`)
        return response.data
      }
      async addProduct(details: any){
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, details, {headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }})
        return response.status
      }
      async updateProduct(id: string, details: any){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, details, {headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }})
        return response.status
      }
}
