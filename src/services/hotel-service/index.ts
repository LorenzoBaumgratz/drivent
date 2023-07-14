import enrollmentRepository from "../../repositories/enrollment-repository"
import {  getHotelByIdRep, getHotelsRep, getRoomsByHotelIdRep, teste1 } from "../../repositories/hotels-repository"
import ticketsRepository from "../../repositories/tickets-repository"
import { notFoundError, requestError } from "../../errors"

export async function getHotelsService(userId:number) {
    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket=await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()
    if(ticket.status!=="PAID") throw requestError(402,"payment required")
    if(ticket.TicketType.isRemote===true) throw requestError(402,"payment required")
    if(ticket.TicketType.includesHotel===false) throw requestError(402,"payment required")

    const hoteis=await getHotelsRep()
    if(!hoteis || hoteis.length===0) throw notFoundError()

    return hoteis
}

export async function getHotelsByIdService(hotelId:number,userId:number) {
    
    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    if(!enrollment) throw notFoundError()

    const ticket=await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(!ticket) throw notFoundError()

    const hoteis=await getHotelsRep()
    if(!hoteis || hoteis.length===0) throw notFoundError()
    
    if(ticket.status!=="PAID" || ticket.TicketType.isRemote===true || ticket.TicketType.includesHotel===false) throw requestError(402,"payment required")

    const hotel=await getHotelByIdRep(hotelId)
    const rooms=await getRoomsByHotelIdRep(hotelId)
    const teste=await teste1(hotelId)
    
    return teste
}