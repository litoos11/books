import { Controller, Get, Param, Body, Put, Delete, UseGuards, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { async } from 'rxjs/internal/scheduler/async';
import { Roles } from '../rol/decorators/rol.decoratos';
import { RolGuard } from '../rol/guards/rol.guard';

@Controller('usuarios')
export class UsuariosController {
	constructor(private readonly _usuarioService: UsuariosService){}
		
	
	@Get(':id')
	@Roles('ADMIN', 'AUTHOR')
	@UseGuards(AuthGuard(), RolGuard)	
	async getUsuario(@Param('id') id: number): Promise<Usuario>{
		console.log(`El id desde el controller es: ${id}`)
		const usuario = await this._usuarioService.getById(id);
		return usuario;
	}

	@UseGuards(AuthGuard())
	@Get()
	async getUsuarios():Promise<Usuario[]>{
		const usuarios = await this._usuarioService.getAll();
		return usuarios;
	}

	// @Post()
	// async creteUsuario(@Body() usuario: Usuario): Promise<Usuario>{
	// 	const createdUsuario = await this._usuarioService.create(usuario);
	// 	return createdUsuario;
	// }

	@Put(':id')
	async updateUsuario(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario>{
		const updateUsuario = await this._usuarioService.update(id, usuario);

		return updateUsuario;
	}

	@Delete(':id')
	async deleteUsuario(@Param('id') id: number){
		await this._usuarioService.delete(id);
		return true;
	}

	@Post('set-rol/:idUsuario/:idRol')
	async setRolToUsuario(
		@Param('idUsuario') idUsuario: number, 
		@Param('idRol') idRol: number): Promise<boolean>{
		return this._usuarioService.setRolToUsuaurio(idUsuario, idRol);
	}
}
