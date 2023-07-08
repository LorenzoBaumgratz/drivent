import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { getTickets, getTicketsTypes, postTicket } from "../controllers/ticketsController";

const ticket=Router()

ticket
  .all('/*', authenticateToken)
    .get("/types",getTicketsTypes)
    .get("/",getTickets)
    .post("/",postTicket)

export default ticket