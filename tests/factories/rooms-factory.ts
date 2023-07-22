import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createRoom(hotelId:number) {
    return prisma.room.create({
        data:{
            hotelId,
            name:faker.name.firstName(),
            capacity:1
        }
    })
}