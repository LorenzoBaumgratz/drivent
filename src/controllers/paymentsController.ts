import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares";
import { getPaymentsService } from "../services/payments-service";
import httpStatus from "http-status";
import { verifyTicketIdRep } from "../repositories/ticket-repository";

export async function getPayments(req:AuthenticatedRequest,res:Response){
    const ticketId=req.query
    const userId=req.userId
    try {
        const payment=await getPaymentsService(Number(ticketId),userId)
        return res.status(httpStatus.OK).send(payment);
      } catch (error) {
        if(error.name==="RequestError") return res.sendStatus(error.status)
        return res.status(httpStatus.NOT_FOUND).send("couldn't get payment");
      }
}

export async function postPayments(req:AuthenticatedRequest,res:Response){
    try {

        return res.status(httpStatus.OK).send();
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send("couldn't get payment");
      }
}