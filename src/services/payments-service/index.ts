import { notFoundError, requestError } from "../../errors"
import enrollmentRepository from "../../repositories/enrollment-repository"
import { getPaymentsRep } from "../../repositories/payments-repository"
import { getTicketRep, verifyTicketIdRep } from "../../repositories/ticket-repository"
import { getTicketService } from "../tickets-service"

export async function getPaymentsService(ticketId:number) {
    if(!ticketId) throw requestError(400,"Bad request")
    const existeTicket= await verifyTicketIdRep(ticketId)
    if(!existeTicket) throw notFoundError()

    
    return await getPaymentsRep(ticketId)
}

export async function postPaymentsService() {
    return 
}