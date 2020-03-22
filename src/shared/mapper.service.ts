import { Injectable } from "@nestjs/common";
import { TypeMapper } from 'ts-mapper';
import { Usuario } from "src/modules/usuarios/usuario.entity";
import { UsuarioDto } from "src/modules/usuarios/dto/usuario.dto";

@Injectable()
export class MapperService extends TypeMapper{

	constructor() {
		super();
		this.config();
	}

	private config(): void{
		this.createMap<Usuario, UsuarioDto>()
			.map(entity => entity.id, dto => dto.id)
			.map(entity => entity.username, dto => dto.username)
			.map(entity => entity.email, dto => dto.email)
			.map(entity => entity.detalles, dto => dto.deatalles)
			.map(entity => entity.roles, dto => dto.roles)
	}
}