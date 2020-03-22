import { IsNotEmpty } from 'class-validator';
import { RolType } from 'src/modules/rol/roltype.enum';
import { UsuarioDetalles } from '../usuario.detalles.entity';

export class UsuarioDto{
	@IsNotEmpty()
	id: number;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	roles: RolType;

	@IsNotEmpty()
	deatalles: UsuarioDetalles;
}