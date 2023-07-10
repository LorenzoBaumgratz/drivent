import { requestError } from "../../errors"
import enrollmentRepository from "../../repositories/enrollment-repository"
import { getTicketRep, verifyTicketIdRep } from "../../repositories/ticket-repository"
import { getTicketService } from "../tickets-service"

export async function getPaymentsService(ticketId:number) {
    if(!ticketId) throw requestError(400,"Bad request")

    await verifyTicketIdRep(ticketId)
    await getTicketService(userId)
    await 

}

export async function postPaymentsService() {
    return 
}