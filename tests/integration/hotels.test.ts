import supertest from "supertest";
import app from '@/app';
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { createEnrollmentWithAddress, createSession, createTicket, createTicketType } from "../factories";
import userRepository from "../repositories/user-repository";
import { createHotel } from "../factories/hotels-factory";

const server=supertest(app)

beforeEach(async()=>{
    await cleanDb()
    const token=await generateValidToken()
    const session=await createSession(token)
    const user=await userRepository.findUserById(session.userId)
    const enrollment=await createEnrollmentWithAddress(user)
    const ticketType=await createTicketType()
    const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
    const hotel=createHotel()
    
})

// - Não existe (inscrição, ticket ou hotel): `404 (not found)`   
// - Ticket não foi pago, é remoto ou não inclui hotel: `402 (payment required)`
// - Outros erros: `400 (bad request)`

describe('get /hotels', () => {
    it('Não existe (inscrição): `404 (not found)', async () => {

        const token=await generateValidToken()
        const session=await createSession(token)

        const result= await server.get("/hotels")
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Não existe (ticket): `404 (not found)', async () => {

        const token=await generateValidToken()
        const session=await createSession(token)
        const user=await userRepository.findUserById(session.userId)
        const enrollment=await createEnrollmentWithAddress(user)
        const ticketType=await createTicketType()

        const result= await server.get("/hotels")
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Não existe (hotel): `404 (not found)', async () => {
        
        const token=await generateValidToken()
        const session=await createSession(token)
        const user=await userRepository.findUserById(session.userId)
        const enrollment=await createEnrollmentWithAddress(user)
        const ticketType=await createTicketType()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")

        const result= await server.get("/hotels")
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Ticket não foi pago: `402 (payment required)`', async () => {
        
        const token=await generateValidToken()
        const session=await createSession(token)
        const user=await userRepository.findUserById(session.userId)
        const enrollment=await createEnrollmentWithAddress(user)
        const ticketType=await createTicketType()
        const ticket=await createTicket(enrollment.id,ticketType.id,"RESERVED")

        const result= await server.get("/hotels")
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    
  });

  describe('get /hotels/:hotelId', () => {
    it('get /hotels/:hotelId', async () => {
        const result= await server.get(`/hotels/1`)
        expect(result.status).toBe(httpStatus.OK);
    });
    
  });
  