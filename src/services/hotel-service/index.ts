import enrollmentRepository from "../../repositories/enrollment-repository"
import { getHotelsRep } from "../../repositories/hotels-repository"
import ticketsRepository from "../../repositories/tickets-repository"
import { notFoundError, requestError } from "../../errors"
import { PAYMENT_REQUIRED } from "http-status"

export async function getHotelsService(userId:number) {
    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    const ticket=await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    const hoteis=await getHotelsRep()
    
    if(!enrollment|| !ticket|| !hoteis) throw notFoundError()
    if(ticket.status!=="PAID" || ticket.TicketType.isRemote===true || ticket.TicketType.includesHotel===false) throw requestError(402,"payment required")

    return hoteis
}

export async function getHotelsByIdService(hotelId:number,userId:number) {
    return
}