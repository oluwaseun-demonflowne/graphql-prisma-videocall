import express, { Express, Response } from "express";
import dotenv from "dotenv";
import resolvers from "./resolvers/resolvers";
import typeDefs from "./schemas/schemas";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
const http = require("http");
const updateProfile = require("./rest/updateProfile");
const showTextList = require("./rest/getWhoUserTexted");
import { Socket } from "socket.io";
dotenv.config();
const { Server } = require("socket.io");
const app: Express = express();
const newServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/", updateProfile);
app.use("/", showTextList);
const port = process.env.PORT;

interface Online {
  userId: string;
  socketId: string;
}

const online_Users: Online[] = [];
let id = "hi";

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();

  server.applyMiddleware({ app });

  const io = new Server(newServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  let connectedUsers: any = {};

  io.on("connection", (socket: Socket) => {
    id = socket.id;

    socket.on("new-user-add", (newUserId) => {
      if (!online_Users.some((user) => user.userId === newUserId)) {
        online_Users.push({ userId: newUserId, socketId: socket.id });
        console.log("new user is here!", online_Users);
      }
      io.emit("get-users", online_Users);
    });

    socket.on("connectUsers", (data) => {
      console.log("this is " + data.id);
      socket.id = data.id;
      connectedUsers[data.id] = socket;
    });

    socket.on("sentMessage", (data) => {
      if (connectedUsers.hasOwnProperty(data.receiverId)) {
        connectedUsers[data.senderId]?.emit("sentMessageFromServer", {
          data,
        });
        connectedUsers[data.receiverId]?.emit("sentMessageFromServer", {
          data,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
      const onlineUsers = online_Users.filter((user) => user.socketId !== id);
      console.log("user disconnected", onlineUsers);
      // send all online users to all users
      io.emit("get-users", onlineUsers);
    });
  });

  // newServer.listen(port)

  app.get("/", (res: Response) => {
    res.send("GraphQL Server is running.");
  });

  newServer.listen(port, () => {
    console.log(`Server has started on port ${port}`);
  });
}

startServer();
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
