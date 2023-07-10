import { notFoundError, requestError, unauthorizedError } from "../../errors"
import enrollmentRepository from "../../repositories/enrollment-repository"
import { getPaymentsRep } from "../../repositories/payments-repository"
import { getTicketRep, ticketIdLinkUserRep, verifyTicketIdRep } from "../../repositories/ticket-repository"
import { getTicketService } from "../tickets-service"

export async function getPaymentsService(ticketId:number,userId:number) {
    if(!ticketId) throw requestError(400,"Bad request")
    const existeTicket= await verifyTicketIdRep(ticketId)
    if(!existeTicket) throw notFoundError()

    const ticketVerify= await verifyTicketIdRep(Number(ticketId))
    const enrollment= await ticketIdLinkUserRep(ticketVerify.enrollmentId)
    if(enrollment.userId!=userId) throw unauthorizedError()

    return await getPaymentsRep(ticketId)
}

export async function postPaymentsService() {
    return 
}