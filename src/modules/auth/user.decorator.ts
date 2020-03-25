import { createParamDecorator } from "@nestjs/common";
import { UsuarioDto } from "../usuarios/dto/usuario.dto";

export const GetUsuario = createParamDecorator((data, request): UsuarioDto => {
	return request.usuario;
})