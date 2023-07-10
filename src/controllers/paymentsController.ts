import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares";
import { getPaymentsService, postPaymentsService } from "../services/payments-service";
import httpStatus from "http-status";

export async function getPayments(req:AuthenticatedRequest,res:Response){
    const ticketId=req.query
    const userId=req.userId
    try {
        const payment=await getPaymentsService(Number(ticketId),userId)
        return res.status(httpStatus.OK).send(payment);
      } catch (error) {
        if(error.name=== 'UnauthorizedError') return res.sendStatus(401)
        if(error.name==="RequestError") return res.sendStatus(error.status)
        return res.status(httpStatus.NOT_FOUND).send("couldn't get payment");
      }
}

export async function postPayments(req:AuthenticatedRequest,res:Response){
     const userId=req.userId
    const {ticketId,cardData}=req.body as {
      ticketId:number,
      cardData:{
        issuer:string,
        number:number,
        name:string,
        expirationDate:Date,
        cvv:number
      }
    }

    try {
        const payment=await postPaymentsService(ticketId,cardData,userId)
        return res.status(httpStatus.OK).send(payment);
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send("couldn't post payment");
      }
}