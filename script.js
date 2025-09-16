import express from "express";
const app = express();
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server =http.createServer(app);
const io = new Server(server);

let userCount = 0;
const connectedUsers = new Map();

io.on("connection",(socket)=>{
    userCount++;
    const isFirstUser = userCount === 1;
    
    console.log(`User ${socket.id} connected. Total: ${userCount}, First: ${isFirstUser}`);
    
    // Send all existing user locations to the new connection
    connectedUsers.forEach((location, userId) => {
        if(userId !== socket.id) {
            socket.emit("receiveLocation", {id: userId, ...location});
        }
    });
    
    socket.on("checkFirstUser", () => {
        socket.emit("userStatus", {isFirst: isFirstUser});
        console.log(`Sent user status to ${socket.id}: First=${isFirstUser}`);
    });
    
    socket.on("sendLocation",function(data){
        console.log(`Location from ${socket.id}:`, data);
        connectedUsers.set(socket.id, data);
        io.emit("receiveLocation",{id:socket.id, ...data});
    })
    
    socket.on("disconnect",()=>{
        userCount--;
        connectedUsers.delete(socket.id);
        console.log(`User ${socket.id} disconnected. Total: ${userCount}`);
        io.emit("userDisconnected",socket.id);
    })
})

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})