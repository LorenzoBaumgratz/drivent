import { prisma } from "../../config"

// export async function postPaymentsRep(ticketId:number, cardData:{
//     issuer:string,
//     number:number,
//     name:string,
//     expirationDate:Date,
//     cvv:number
// }) {
//     return prisma.payment.create({
//         data:{
//             ticketId,
//             cardData
//         }
//     })
// }

// export async function getPaymentsRep(ticketId:number) {
//     return prisma.payment.findFirst({
//         where:{
//             ticketId
//         }
//     })
// }