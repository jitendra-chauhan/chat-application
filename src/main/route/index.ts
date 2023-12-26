// const express = require("express");
import express from 'express'
import userProfile from "../userProfile";

const router = express.Router();

// router.post("/name", (req: any, res: any) => {
//   console.log("=====> call name <====");
//   const data = {
//     name: "my",
//   };
//   res.send(data);
// });

router.post("/signUp", userProfile.signUp);
router.post("/login", userProfile.login);


export default router;
