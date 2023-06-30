import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
  console.log("body",req.body)
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });


    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log("aq")
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

// TODO - Receber o CEP do usuário por query params.
export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const {cep}=req.query
  try {
    const address = await enrollmentsService.getAddressFromCEP(cep.toString());
    console.log(address)
    if(!address || address.erro===true) return res.sendStatus(204)
    const resposta={
      logradouro:address.logradouro,
      complemento:address.complemento,
      bairro:address.bairro,
      cidade:address.localidade,
      uf:address.uf
    }
    res.status(httpStatus.OK).send(resposta);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }
}
