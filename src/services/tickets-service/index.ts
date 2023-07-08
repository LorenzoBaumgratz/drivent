import { notFoundError, requestError } from "../../errors";
import enrollmentRepository from "../../repositories/enrollment-repository";
import { postTicketRep } from "../../repositories/ticket-repository";

export async function postTicketService(ticketTypeId:number,userId:number) {
    if(!ticketTypeId) throw requestError(400,"Bad request")

    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    return await postTicketRep(ticketTypeId,enrollment.id)
}