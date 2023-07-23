import { TicketStatus } from "@prisma/client"
import { notFoundError, requestError } from "../../errors"
import enrollmentRepository from "../../repositories/enrollment-repository"
import ticketsRepository from "../../repositories/tickets-repository"
import bookingRepository from "../../repositories/booking-repository"

export async function getBookingService(userId:number) {
    const result=await bookingRepository.getBookingRep(userId)
    if(!result) throw notFoundError()
    return {
        "id":result.id,
        "Room":result.Room
    }
}

export async function postBookingService(userId:number,roomId:number) {

    const enrollment=await enrollmentRepository.findWithAddressByUserId(userId)
    const ticket=await ticketsRepository.findTicketByEnrollmentId(enrollment.id)
    if(ticket.status!==TicketStatus.PAID|| ticket.TicketType.isRemote ||!ticket.TicketType.includesHotel) throw requestError(403,"Outside business rules")

    const room=await bookingRepository.checkRoomId(roomId)
    if(!room ) throw notFoundError()

    const numberOfRoomsBooked=await bookingRepository.findBookingWithRoomId(roomId)
    if(room.capacity===numberOfRoomsBooked.length) throw requestError(403,"Outside business rules") 

    const booking=await bookingRepository.postBookingRep(userId,roomId)
    return booking.id
}

export async function putBookingService(userId:number,roomId:number,bookingId:number) {

    const hasBooking=await bookingRepository.findBookingByUserId(userId)
    if(!hasBooking) throw requestError(403,"Outside business rules") 

    const room=await bookingRepository.checkRoomId(roomId)
    if(!room) throw notFoundError()

    const numberOfRoomsBooked=await bookingRepository.findBookingWithRoomId(roomId)
    if(room.capacity===numberOfRoomsBooked.length) throw requestError(403,"Outside business rules") 

    const booking=await bookingRepository.putBookingRep(roomId,bookingId)
    return booking.id
}