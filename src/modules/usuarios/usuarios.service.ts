import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { MapperService } from 'src/shared/mapper.service';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioDetalles } from './usuario.detalles.entity';
import { getConnection } from 'typeorm';
import { Rol } from '../rol/rol.entity';

@Injectable()
export class UsuariosService {
	constructor(
		@InjectRepository(UsuarioRepository)
		private readonly _usuarioRepository: UsuarioRepository,
		private readonly _mappperService: MapperService
	) { }

	async getById(id: number): Promise<UsuarioDto> {
		if(!id){
			throw new BadRequestException("El id es requerido!");
		}
		const usuario: Usuario = await this._usuarioRepository.findOne(id, {where: {status: 'ACTIVE'} });

		if(!usuario){
			throw new NotFoundException(`El usaurio con id: ${id} -- Usuario no encontrado!`);
			// throw new BadRequestException(`El usaurio con id: ${id} -- Usuario no encontrado!`);

		}

		return this._mappperService.map<Usuario, UsuarioDto>(usuario, new UsuarioDto());
	}

	async getAll(): Promise<UsuarioDto[]> {
	
		const usuarios: Usuario[] = await this._usuarioRepository.find({where: {status: 'ACTIVE'} });

		return this._mappperService.mapCollection<Usuario, UsuarioDto>(usuarios, new UsuarioDto());
	}

	async create(usuario: Usuario): Promise<UsuarioDto>{
		const usuarioDetalles = new UsuarioDetalles();
		usuario.detalles = usuarioDetalles;

		const rolRepository = await getConnection().getRepository(Rol);
		const defaultRol = await rolRepository.findOne({name: 'GENERAL'});
		usuario.roles = [defaultRol];		

		const saveUsuario: Usuario = await this._usuarioRepository.save(usuario);

		return this._mappperService.map<Usuario, UsuarioDto>(saveUsuario, new UsuarioDto());
	}

	async update(id: number, usuario: Usuario): Promise<UsuarioDto>{
		//await this._usuarioRepository.update(id, usuario);
		const usuarioEncontrado: Usuario =  await this._usuarioRepository.findOne(id);
		if(usuarioEncontrado){
			await this._usuarioRepository.update(id, usuario);
			//return await this._usuarioRepository.findOne(id);
			return await this.getById(id);
		}else{
			throw new BadRequestException(`Error al actualizar el usaurio con id: ${id} -- Usuario no encontrado!`);
		}
	}

	async delete(id: number): Promise<void>{
		const usuarioExists = await this._usuarioRepository.findOne(id, {where: {status: 'ACTIVE'}});

		if(!usuarioExists){
			throw new NotFoundException();
		}

		await this._usuarioRepository.update(id, {status: 'INACTIVE'});
	}
}
