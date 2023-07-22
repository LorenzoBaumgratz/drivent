import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createUser, createTicketType, createTicket } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createRoom } from '../factories/rooms-factory';
import { createHotel } from '../factories/hotels-factory';
import { createBooking } from '../factories/booking-factory';

const server = supertest(app);


beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});


describe('GET /booking', () => {

  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 404 when user has no booking', async () => {
    const user=await createUser()
    const token=await generateValidToken(user)
    const hotel=await createHotel()
    const room=await createRoom(hotel.id)

    const result = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(result.status).toBe(httpStatus.NOT_FOUND);
    
  });

    it('should respond with status 200 and the booking when user has booking', async () => {
    const user=await createUser()
    const token=await generateValidToken(user)
    const hotel=await createHotel()
    const room=await createRoom(hotel.id)
    const booking=await createBooking(user.id,room.id)

    const result = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(result.status).toBe(httpStatus.OK);
    expect(result.body).toEqual({
        id:booking.id,
        Room:{
            id:room.id,
            name:room.name,
            capacity:room.capacity,
            hotelId: room.hotelId,
            createdAt: room.createdAt.toISOString(),
            updatedAt: room.updatedAt.toISOString()
        }
    });


    });

});