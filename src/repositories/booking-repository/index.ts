import { Booking, Room } from "@prisma/client";
import { prisma } from "../../config"

 async function getBookingRep(userId:number): Promise<Booking & {
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

 async function postBookingRep(userId:number,roomId:number) {
    return prisma.booking.create({
        data:{
            userId,
            roomId
        }
    })
}

 async function putBookingRep(roomId:number,bookingId:number) {
    return prisma.booking.update({
        data:{
            roomId
        },
        where:{
            id:bookingId
        }
    })
}

 async function checkRoomId(roomId:number) {
    return prisma.room.findFirst({
        where:{
            id:roomId
        }
    })
}

 async function findBookingWithRoomId(roomId:number) {
    return prisma.booking.findMany({
        where:{
            roomId
        }
    })
}

 async function findBookingByUserId(userId:number) {
    return prisma.booking.findFirst({
        where:{
            userId
        },
        include:{
            Room:true
        }
    })
}

 async function findBookingByRoomId(roomId:number) {
    return prisma.booking.findFirst({
        where:{
            roomId
        },
        include:{
            Room:true
        }
    })
}

export default {
    findBookingByRoomId,
    findBookingByUserId,
    findBookingWithRoomId,
    checkRoomId,
    putBookingRep,
    postBookingRep,
    getBookingRep
  };