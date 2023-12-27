import express from "express";
import http from "http";
import router from "../main/route";
import bodyParser from "body-parser";
import path from "path";

const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.set("views", path.join(import.meta.dir + "../../../views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.dir + "../../../views/public")));
app.use(express.static(path.join(import.meta.dir + "../../../views/css")));
app.use(express.static(path.join(import.meta.dir + "../../../views/js")));
// app.use(express.static("public"));


const server = http.createServer(app);

app.get("/", function (req, res) {
  res.render("public/login");
});
app.get("/SignUp", function (req, res) {
  res.render("public/signup");
});
app.get("/chat", function (req, res) {
  res.render("public/chat");
});

// app.get("/test", (req: any, res: any) => {
//   res.status(200).send("ok");
// });

export default server;
