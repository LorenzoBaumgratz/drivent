import { AuthenticatedRequest } from "../middlewares";
import { getPaymentsService } from "../services/payments-service";

export async function getPayments(req:AuthenticatedRequest,res:Response){
    const ticketId=req.query
    try {
        const payment=await getPaymentsService(Number(ticketId))
        return res.status(httpStatus.OK).send(payment);
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send("couldn't get payment");
      }
}

export async function postPayments(req:AuthenticatedRequest,res:Response){
    try {

        return res.status(httpStatus.OK).send();
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send("couldn't get payment");
      }
}