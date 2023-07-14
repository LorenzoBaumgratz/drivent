import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { getHotels, getHotelsById } from "../controllers/hotels-controller";

const hotel=Router()

hotel
    .all('/*', authenticateToken)
    .get('/',getHotels)
    .get('/:hotelId',getHotelsById);

export default hotel