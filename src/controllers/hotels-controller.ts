import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares";
import httpStatus from "http-status";
import { getHotelsByIdService, getHotelsService } from "../services/hotel-service";

export async function getHotels(req:AuthenticatedRequest,res:Response) {
    const userId=req.userId
    try {
        const result=await getHotelsService(userId)
        res.status(httpStatus.OK).send(result);
      } catch (error) {
        if(error.name==='NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND)
        if(error.statusText==='payment required') return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}

export async function getHotelsById(req:AuthenticatedRequest,res:Response) {
  const hotelId=req.params 
  const userId=req.userId

    try {
        const result=await getHotelsByIdService(Number(hotelId),userId)
        res.status(httpStatus.OK).send(result);
      } catch (error) {
        if(error.name==='NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND)
        if(error.statusText==='payment required') return res.sendStatus(httpStatus.PAYMENT_REQUIRED)
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}