import { TicketStatus } from "@prisma/client"
import { notFoundError, requestError } from "../../errors"
import { checkRoomId, findBookingByUserId, findBookingWithRoomId, getBookingRep, postBookingRep, putBookingRep } from "../../repositories/booking-repository"
import enrollmentRepository from "../../repositories/enrollment-repository"
import ticketsRepository from "../../repositories/tickets-repository"

export async function getBookingService(userId:number) {
    const result=await getBookingRep(userId)
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

    const room=await checkRoomId(roomId)
    if(!room ) throw notFoundError()

    const numberOfRoomsBooked=await findBookingWithRoomId(roomId)
    if(room.capacity===numberOfRoomsBooked.length) throw requestError(403,"Outside business rules") 
    
    // const hasBook=await findBookingByUserId(userId)
    // if(hasBook) throw requestError(403,"Outside business rules") 

    const booking=await postBookingRep(userId,roomId)
    return booking.id
}

export async function putBookingService(userId:number,roomId:number,bookingId:number) {

    const hasBooking=await findBookingByUserId(userId)
    if(!hasBooking) throw requestError(403,"Outside business rules") 

    const room=await checkRoomId(roomId)
    if(!room) throw notFoundError()

    const numberOfRoomsBooked=await findBookingWithRoomId(roomId)
    if(room.capacity===numberOfRoomsBooked.length) throw requestError(403,"Outside business rules") 

    const booking=await putBookingRep(roomId,bookingId)
    return booking.id
}