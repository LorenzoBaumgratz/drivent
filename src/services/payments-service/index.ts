import { notFoundError, requestError, unauthorizedError } from "../../errors"
import { getPaymentsRep, postPaymentsRep } from "../../repositories/payments-repository"
import { getTicketById, ticketIdLinkUserRep, verifyTicketIdRep } from "../../repositories/ticket-repository"

export async function getPaymentsService(ticketId:number,userId:number) {
    if(!ticketId) throw requestError(400,"Bad request")
    const existeTicket= await verifyTicketIdRep(ticketId)
    if(!existeTicket) throw notFoundError()

    const ticketVerify= await verifyTicketIdRep(Number(ticketId))
    const enrollment= await ticketIdLinkUserRep(ticketVerify.enrollmentId)
    if(enrollment.userId!=userId) throw unauthorizedError()

    return await getPaymentsRep(ticketId)
}

export async function postPaymentsService(ticketId:number,cardData:{
    issuer:string,
    number:number,
    name:string,
    expirationDate:Date,
    cvv:number
  },userId:number) {
    if(!ticketId || !cardData) throw requestError(400,"Bad request")
    const existeTicket= await verifyTicketIdRep(ticketId)
    if(!existeTicket) throw notFoundError()
    const ticketVerify= await verifyTicketIdRep(Number(ticketId))
    const enrollment= await ticketIdLinkUserRep(ticketVerify.enrollmentId)
    if(enrollment.userId!=userId) throw unauthorizedError()

    const ticket=await getTicketById(ticketId)
    await postPaymentsRep(ticketId,cardData,ticket.TicketType.price)

    return await getPaymentsRep(ticketId)
}