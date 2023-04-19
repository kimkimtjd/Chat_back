import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer , ConnectedSocket  } from "@nestjs/websockets";
import { Socket } from "socket.io";



@WebSocketGateway({
  cors : {
    origin:'*'
  }
})

export class ChatGateway {
  @WebSocketServer()
  server;

  // 실시간 채팅 Communication
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    ): 
  void {
    this.server.to(message.split("방이름")[1]).emit('message', message);
  }


  // 채팅방 생성
  @SubscribeMessage('room')
  createroom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
    ): 
  void {
    client.join(room)
    // console.log(room + "이 생성되었습니다.")
  }
}
