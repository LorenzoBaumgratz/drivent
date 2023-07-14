import supertest from "supertest";
import app from '@/app';
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { getHotelsById } from "../controllers/hotels-controller";
import sessionRepository from "../repositories/session-repository";
import enrollmentRepository from "../repositories/enrollment-repository";
import { createEnrollmentWithAddress, createTicket, createTicketType } from "../factories";

const server=supertest(app)

beforeEach(async()=>{
    await cleanDb()
    const token=await generateValidToken()
    const session=await sessionRepository.findSessionByToken(token)
    const enrollment=await createEnrollmentWithAddress()
    const ticketType=await createTicketType()
    const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
    
})

// - Não existe (inscrição, ticket ou hotel): `404 (not found)`
// - Ticket não foi pago, é remoto ou não inclui hotel: `402 (payment required)`
// - Outros erros: `400 (bad request)`

describe('get /hotels', () => {
    it('get /hotels', async () => {

        const result= await server.get("/hotels")
        expect(result.status).toBe(httpStatus.OK);
    });

    
    
  });

  describe('get /hotels/:hotelId', () => {
    it('get /hotels/:hotelId', async () => {
        const result= await server.get(`/hotels/1`)
        expect(result.status).toBe(httpStatus.OK);
    });
    
  });
  