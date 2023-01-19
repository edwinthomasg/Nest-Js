import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { FilterQuery, Model } from 'mongoose';
import { EcommerceDto } from './ecommerce.dto';
import { Ecommerce, EcommerceDocument } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceRepository {
     constructor(
     @InjectModel(Ecommerce.name)
     private ecommerceModel: Model<EcommerceDocument>, @Inject(CACHE_MANAGER) private cacheManager: Cache
     , private readonly eventEmitter: EventEmitter2, private loggerService: Logger, private scheduleRegistry: SchedulerRegistry) {}

     async createProduct(product: Ecommerce): Promise<Ecommerce> {
          console.log('product : ', product);
          const newProduct = new this.ecommerceModel(product);
          this.eventEmitter.emit("products.created", newProduct)
          const webSocketConnection = setTimeout(() => {
               this.establishConnection("apple iphone")
          }, 3000)
          this.scheduleRegistry.addTimeout("WEBSOCKET_CONNECTION_APPLE", webSocketConnection)
          return await newProduct.save();
     }

     establishConnection(productName: string){
          this.loggerService.log("Web socket connection established ....",productName)
     }

     async getProduct(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
          console.log(await this.cacheManager.get('products'))
          const product = await this.ecommerceModel.find(filterQuery);
          return product;
     }

     async getProducts(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
          this.cacheManager.set('products', await this.ecommerceModel.find(filterQuery), 10000)
          console.log(await this.cacheManager.get('products'))
          const interval = () => console.log("inside interval method")
          const setIntervalFun = setInterval(interval, 1000)
          // Dynamic interval api by schedule registry
          this.scheduleRegistry.addInterval('INTERVAL_FUNCTION', setIntervalFun)
          return await this.ecommerceModel.find(filterQuery);
     }

     async updateById(updateQuery: FilterQuery<Ecommerce>, body: Partial<Ecommerce>) {
          return await this.ecommerceModel.findByIdAndUpdate(updateQuery, body, {new: true})
     }

     async deleteById(deleteQuery: FilterQuery<Ecommerce>){
          return await this.ecommerceModel.deleteOne(deleteQuery)
     }

     async getProductsByQueryFilter(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]>{
          await this.cacheManager.set("products", await this.ecommerceModel.find(filterQuery))
          console.log(await this.cacheManager.get("products"))
          await this.cacheManager.del("products")
          console.log(await this.cacheManager.get("products"))
          return await this.ecommerceModel.find(filterQuery)
     }

     @OnEvent('products.created')
     sendNotification(payload: any) {
          console.log("payload : ",payload)
          this.loggerService.log("logger service activated ...", payload)
     } 

     @OnEvent('products.created', {async: true})
     async sendCreatedMessage(payload: any){
          this.loggerService.log("welcome message started", payload.name)
          await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))
          this.loggerService.log("welcome message sent for ",payload.name)
     }

    

     // Every 10secs this task will get executed
     // @Cron(CronExpression.EVERY_10_SECONDS)
     // greetOthers(){
     //      this.loggerService.log("greeting others ...!")
     // }

     @Cron('45 * * * * * ')
     handleCron(){
          this.loggerService.log('called when second is 45')
     }

     // @Interval(10000)
     // logAfter10(){
     //      this.logMessage()
     // }

     logMessage(){
          this.loggerService.log("log after some interval 10s")
     }
}
