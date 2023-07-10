import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { getPayments, postPayments } from "../controllers/paymentsController";

const payments=Router()

payments
    // .all('/*', authenticateToken)
    //     .get("/",getPayments)
    //     .post("/process",postPayments)
        
export default payments