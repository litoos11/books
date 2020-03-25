import { RolType } from "../rol/roltype.enum";

export interface IJwtPayload {
	id: number;
	username: string;
	email: string;
	roles: RolType[];
	iat?: Date;
}