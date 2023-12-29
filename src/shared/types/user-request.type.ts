import { Request } from 'express';
import { JwtPayload } from '../../auth/types/jwt-payload.type';

export interface UserRequest extends Request {
  user: JwtPayload;
}
