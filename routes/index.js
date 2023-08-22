import express from "express";

const Router = express.Router();

Router.get("/", async(req, res) => {
    res.json({
        success: true,
        message: "HELLO I'M WORKING"
    })
})

export default Router