import express from 'express';
import Auth from './auth.js';
import { Verify,VerifyRole } from '../middlewares/verify.js';

const Router = (server) => {
    server.get("/server", (req, res) => {
        try {
            res.status(200).json({
                status: "success",
                data: [],
                message: "Welcome to our API homepage!",
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    });

    // Change the route here to `/auth`
    server.use('/auth', Auth);
    server.get("/user", Verify, (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Welcome to the your Dashboard!",
        });
    });
    
    server.get("/admin", Verify, VerifyRole, (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Welcome to the Admin portal!",
        });
    });
};

export default Router;
