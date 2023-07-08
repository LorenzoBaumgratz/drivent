import { Request, Response } from "express";
import httpStatus from "http-status";
import { getTicketById, getTicketsRep, getTicketsTypesRep, postTicketRep } from "../repositories/ticket-repository";
import { AuthenticatedRequest } from "../middlewares";
import { postTicketService } from "../services/tickets-service";

export async function getTicketsTypes(req:AuthenticatedRequest,res:Response){
    try {
        const ticketsTypes=await getTicketsTypesRep()
        return res.status(httpStatus.OK).send(ticketsTypes);
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send(console.log("couldn't get tickets types"));
      }
}

export async function getTickets(req:AuthenticatedRequest,res:Response){
  try {
      const tickets=await getTicketsRep()
      return res.status(httpStatus.OK).send(tickets);
    } catch (error) {
      return res.status(httpStatus.NOT_FOUND).send(console.log("couldn't get tickets"));
    }
}

export async function postTicket(req:AuthenticatedRequest,res:Response){
  const {ticketTypeId}=req.body as {ticketTypeId:number}
  const userId=req.userId

  try {
      await postTicketService(ticketTypeId,userId)
      const ticket=await getTicketById(ticketTypeId)
      return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
      return res.status(httpStatus.NOT_FOUND).send(console.log("couldn't post ticket"));
    }
}