import { prisma } from "../../config";

export async function getHotelsRep() {
    return prisma.hotel.findMany()
}

export async function getHotelByIdRep(hotelId:number) {
    return prisma.hotel.findUnique({
        where:{
            id:hotelId
        }
    })
}

export async function getBookingByUserIdRep(userId:number ) {
    return prisma.booking.findFirst({
        where:{
            userId
        }
    })
}

export async function getRoomsByHotelIdRep(hotelId:number) {
    return prisma.room.findMany({
        where:{
            hotelId
        }
    })
}

export async function createRoomByHotelId(hotelId:number,name:string,capacity:number) {
    return prisma.room.create({
        data:{
            capacity,
            name,
            hotelId,
        }
    })
}

export async function teste1(hotelId:number) {
    return prisma.hotel.findMany({
        where:{
            id:hotelId
        },
        include:{
            Rooms:true
        }
    })
}