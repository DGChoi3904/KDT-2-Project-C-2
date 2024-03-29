import { Server } from "socket.io";
import sign_master from "../../src/models/DBConfig.js";
export default function socketServer(server) {
  sign_master.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("채팅 연결됨");
  });

  const io = new Server(server, { path: "/chat/" });

  // 서버 연결
  io.on("connection", (socket) => {
    // 유저가 입장되어 입장된 유저 id 를 클라이언트로 부터 전달받았을 때
    socket.on("enterUser", (data) => {
      // 해당 id 를 socket.nickname 에 담아준다.
      socket.nickname = data;
      console.log(socket.nickname);
      // 전체 유저에게 해당 유저 입장을 알려준다.
      io.emit("enterUser", socket.nickname);
    });
    // 클라이언트 측으로 부터 채팅을 전달받는다.
    socket.on("chat", (data) => {
      if (socket.nickname !== undefined) {
        // console.log(socket.nickname);
        sign_master.query(
          "insert into chatting_log(ID, CHATTING_LOG) values(?,?)",
          [socket.nickname, `${data}`]
        );
        // 본인을 제외한 나머지 사람들에게 채팅과 채팅한 사람의 닉네임을 전달한다.
        socket.broadcast.emit("chat", {
          nickname: socket.nickname,
          chat: data,
        });
      } else {
        socket.emit("error", { status: "nicknameError" });
      }
    });
    // 채팅이 끊겼을 때
    socket.on("disconnect", () => {
      // 모든 유저에게 서버에서 떠난 유저의 닉네임을 알려준다.
      io.emit("exitUser", socket.nickname);
    });
  });
}
