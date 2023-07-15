import supertest from "supertest";
import app, { init } from '@/app';
import httpStatus from "http-status";
import { cleanDb, generateValidToken } from "../helpers";
import { createEnrollmentWithAddress, createPayment, createSession, createTicket, createTicketType, createTicketTypeComHot, createTicketTypeRem, createTicketTypeSemHot, createUser, createhAddressWithCEP } from "../factories";
import addressRepository from "@/repositories/address-repository";
import { createHotel } from "../factories/hotels-factory";
import { createRoomByHotelId } from "@/repositories/hotels-repository";

const server=supertest(app)
const full={
    number:"1",
    cep:"88906-000",
    street:"flor de lotus",
    city:"ararangua",
    state:"SC",
    neighborhood:"Jardim das avenidas",
    addressDetail:"ali"
}

beforeAll(async()=>{
    await init()
})

beforeEach(async()=>{
    await cleanDb()
    // const token=await generateValidToken()
    // const session=await createSession(token)
    // const user=await userRepository.findUserById(session.userId)
    // const enrollment=await createEnrollmentWithAddress(user)
    // const ticketType=await createTicketType()
    // const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
    // const hotel=createHotel()
    
})

// - Não existe (inscrição, ticket ou hotel): `404 (not found)`   
// - Ticket não foi pago, é remoto ou não inclui hotel: `402 (payment required)`
// - Outros erros: `400 (bad request)`

describe('get /hotels', () => {
    it('Não existe (inscrição): `404 (not found)', async () => {
        const user=await createUser()
        const token=await generateValidToken(user)


        
        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Não existe (ticket): `404 (not found)', async () => {

        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        // const address=await createhAddressWithCEP()
        
        await addressRepository.upsert(enrollment.id, full,full)
    
        const ticketType=await createTicketType()

        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Não existe (hotel): `404 (not found)', async () => {
        
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketType()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
        const payment=await createPayment(ticket.id,20)


        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Ticket não foi pago: `402 (payment required)`', async () => {
        
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketTypeComHot()
        const ticket=await createTicket(enrollment.id,ticketType.id,"RESERVED")
        const payment=await createPayment(ticket.id,20)


        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Ticket é remoto: `402 (payment required)`', async () => {
        
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketTypeRem()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
        const payment=await createPayment(ticket.id,20)


        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Ticket não inclui hotel: `402 (payment required)`', async () => {
        
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketTypeSemHot()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
        const payment=await createPayment(ticket.id,20)


        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.NOT_FOUND);
    });
    it('Tudo certo)`', async () => {
        
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketTypeComHot()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
        const payment=await createPayment(ticket.id,20)

        await createHotel()
        const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(httpStatus.OK);
    });
  });

  describe('get /hotels/:hotelId', () => {
    it('get /hotels/:hotelId', async () => {
        const user=await createUser()
        const token=await generateValidToken(user)
        const enrollment=await createEnrollmentWithAddress(user)
        await addressRepository.upsert(enrollment.id, full,full)

        const ticketType=await createTicketTypeComHot()
        const ticket=await createTicket(enrollment.id,ticketType.id,"PAID")
        const payment=await createPayment(ticket.id,20)

        const hotel=await createHotel()
        const rooms=createRoomByHotelId(hotel.id,"aquele",10)
        const result= await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`)
        expect(result.status).toBe(httpStatus.OK);
    });
    
  });
  