import { Booking, Room } from "@prisma/client";
import { prisma } from "../../config"

export async function getBookingRep(userId:number): Promise<Booking & {
    Room: Room;
}> {

    return prisma.booking.findFirst({
        where:{
            userId
        },
        include:{
            Room:true
        }
    })
}

export async function postBookingRep(userId:number,roomId:number) {
    return prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

export async function putBookingRep(roomId:number,bookingId:number) {
    return prisma.booking.update({
        data:{
            roomId
        },
        where:{
            id:bookingId
        }
    })
}

export async function checkRoomId(roomId:number) {
    return prisma.room.findUnique({
        where:{
            id:roomId
        }
    })
}

export async function findBookingWithRoomId(roomId:number) {
    return prisma.booking.findMany({
        where:{
            roomId
        }
    })
}

export async function findBookingByUserId(userId:number) {
    return prisma.booking.findFirst({
        where:{
            userId
        },
        include:{
            Room:true
        }
    })
}