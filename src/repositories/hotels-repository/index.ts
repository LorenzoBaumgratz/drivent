import { prisma } from "../../config";

export async function getHotelsRep() {
    return prisma.hotel.findMany()
}

export async function getHotelsByIdRep(hotelId:number,userId:number ) {
    return 
}

export async function getBookingByUserIdRep(userId:number ) {
    return prisma.booking.findFirst({
        where:{
            userId
        }
    })
}
