import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      //   .withUrl("https://localhost:7298/chatHub")
      .withUrl("http://comics-truyentranh.somee.com/chatHub")

      .configureLogging(signalR.LogLevel.Debug) // Thêm logging
      .build();
  }

  async start() {
    try {
      await this.connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log(err);
      // setTimeout(() => this.start(), 5000);
    }
  }

  onReceiveMessage(userId, callback) {
    const eventName = `receivemessage${userId}`;
    console.log(eventName);
    this.connection.on(eventName, (user, message, userId) => {
      // console.log(userId,user,message);
      callback(user, message, userId);
    });
  }
}

export default new SignalRService();
