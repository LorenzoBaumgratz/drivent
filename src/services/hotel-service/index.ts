import enrollmentRepository from "../../repositories/enrollment-repository"
import { getHotelsRep } from "../../repositories/hotels-repository"
import ticketsRepository from "../../repositories/tickets-repository"
import { notFoundError, requestError } from "../../errors"
import { PAYMENT_REQUIRED } from "http-status"

export async function getHotelsService(userId:number) {
    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket=await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()

    const hoteis=await getHotelsRep()
    if(!hoteis || hoteis.length===0) throw notFoundError()
    
    if(ticket.status!=="PAID" || ticket.TicketType.isRemote===true || ticket.TicketType.includesHotel===false) throw requestError(402,"payment required")

    return hoteis
}

export async function getHotelsByIdService(hotelId:number,userId:number) {
    return
}