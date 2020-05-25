import {RoleEnum} from "../../users/enum/role.enum";

export interface JwtPayloadInterface {
  readonly email: string;
  readonly id: string;
  readonly roles: RoleEnum[];
}
