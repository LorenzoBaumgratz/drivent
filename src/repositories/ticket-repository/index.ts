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
    return prisma.ticket.findFirst({
        include:{
            TicketType:true
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

export async function verifyTicketIdRep(ticketId:number) {
    return await prisma.ticket.findUnique({
        where:{
            id:ticketId
        }      
    })
}

export async function ticketIdLinkUserRep(enrollmentId:number) {
    return await prisma.enrollment.findUnique({
        where:{
            id:enrollmentId
        }      
    })
}

export async function updateTicket(enrollmentId:number) {
    return await prisma.ticket.update({
        data:{
            status:"PAID"
        },
        where:{
            id:enrollmentId
        }      
    })
}