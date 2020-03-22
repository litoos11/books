import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuario.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
	constructor(private readonly _usuarioService: UsuariosService){}
		
	
	@Get(':id')
	async getUsuario(@Param('id') id: number): Promise<UsuarioDto>{
		console.log(`El id desde el controller es: ${id}`)
		const usuario = await this._usuarioService.getById(id);
		return usuario;
	}

	@Get()
	async getUsuarios():Promise<UsuarioDto[]>{
		const usuarios = await this._usuarioService.getAll();
		return usuarios;
	}

	@Post()
	async creteUsuario(@Body() usuario: Usuario): Promise<UsuarioDto>{
		const createdUsuario = await this._usuarioService.create(usuario);
		return createdUsuario;
	}

	@Put(':id')
	async updateUsuario(@Param('id') id: number, @Body() usuario: Usuario): Promise<UsuarioDto>{
		const updateUsuario = await this._usuarioService.update(id, usuario);

		return updateUsuario;
	}

	@Delete(':id')
	async deleteUsuario(@Param('id') id: number){
		await this._usuarioService.delete(id);
		return true;
	}
}
