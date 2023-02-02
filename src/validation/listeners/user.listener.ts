import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class UserListener{
    @OnEvent('user.*')
    handleDataEvent(payload: string){
      console.log("message : ",payload)
    }
  
    @OnEvent('**')
    commonListeners(){
      console.log("listening for all events registered")
    }
}