import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares";
import { getBookingService, postBookingService, putBookingService } from "../services/booking-service";
import httpStatus from "http-status";

export async function getBookingController(req:AuthenticatedRequest,res:Response) {
    const userId=req.userId
    try{
        const booking=await getBookingService(userId) 
        return res.status(200).send(booking)
    }catch(error){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function postBookingController(req:AuthenticatedRequest,res:Response) {
    const userId=req.userId
    const {roomId}=req.body as {roomId:number}
    try{
        const id=await postBookingService(userId,roomId)
        return res.status(200).send({bookingId:id})
    }catch(error){
        if(error.statusText==="Outside business rules") return res.sendStatus(httpStatus.FORBIDDEN)
        if(error.name=== 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND)
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }
}

export async function putBookingController(req:AuthenticatedRequest,res:Response) {
    const userId=req.userId
    const {roomId}=req.body
    const {bookingId}=req.params
    try{
        const id=await putBookingService(userId,roomId,Number(bookingId))
        return res.status(200).send({bookingId:id})
    }catch(error){
        if(error.statusText==="Outside business rules") return res.sendStatus(httpStatus.FORBIDDEN)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}