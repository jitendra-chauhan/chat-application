import express from "express";
import http from "http";
import router from "../main/route";
import bodyParser from "body-parser";

const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.set("views", import.meta.dir + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


const server = http.createServer(app);

// app.get("/", function (req, res) {
//   res.sendFile("index.html");
// });

// app.get("/test", (req: any, res: any) => {
//   res.status(200).send("ok");
// });

export default server;
