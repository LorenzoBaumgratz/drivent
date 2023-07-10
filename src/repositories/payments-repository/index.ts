import { prisma } from "../../config"

export async function postPaymentsRep(ticketId:number, cardData:{
        issuer:string,
        number:number,
        name:string,
        expirationDate:Date,
        cvv:number
      
},value:number) {
    return prisma.payment.create({
        data:{
            ticketId,
            cardIssuer:cardData.issuer,
            cardLastDigits:`${cardData.number}`.slice(-4),
            value
        }
    })
}

export async function getPaymentsRep(ticketId:number) {
    return prisma.payment.findFirst({
        where:{
            ticketId
        }
    })
}