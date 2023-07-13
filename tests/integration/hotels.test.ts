import supertest from "supertest";
import app from "../app";
import httpStatus from "http-status";
import { prisma } from "../config";

const server=supertest(app)

beforeEach(async()=>{
    await prisma.hotel.deleteMany()
})

// - Não existe (inscrição, ticket ou hotel): `404 (not found)`
// - Ticket não foi pago, é remoto ou não inclui hotel: `402 (payment required)`
// - Outros erros: `400 (bad request)`

describe('get /hotels', () => {
    it('get /hotels', async () => {
        const result= await
        expect(result.status).toBe(httpStatus.OK);
    });

    
    
  });

  describe('get /hotels/:hotelId', () => {
    it('get /hotels/:hotelId', async () => {
        const result= await
        expect(result.status).toBe(httpStatus.OK);
    });
    
  });
  