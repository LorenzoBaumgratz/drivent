import { prisma } from "../../config";

export async function getTicketsTypesRep() {
    return prisma.ticketType.findMany()
}

export async function getTicketRep(enrollmentId:number) {
    return prisma.ticket.findFirst({
        include:{
            TicketType:true,
        },
        where:{
            enrollmentId
        }
    })
}

export async function getTicketById(ticketId:number) {
    return prisma.ticketType.findUnique({
        where:{
            id:ticketId
        }
    })
}

export async function postTicketRep(ticketTypeId:number,enrollmentId:number) {
    return await prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status:"RESERVED"
        }       
    })
}