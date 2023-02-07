import { Injectable } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";


@WebSocketGateway()
export class EventGateway{
    @SubscribeMessage('newMessage')
    handleEvent(@MessageBody() body: any){
        console.log("message : ",body)
        return body
    }
}