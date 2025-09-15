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


io.on("connection",(socket)=>{
    console.log("a User connected ")
})
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index")
})



server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})