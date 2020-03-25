import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.entity';
import { RolRepository } from '../rol/rol.repository';
import { Status } from '../../shared/entity-status.num'
@Injectable()
export class UsuariosService {
	constructor(
		@InjectRepository(UsuarioRepository)
		private readonly _usuarioRepository: UsuarioRepository,
		@InjectRepository(RolRepository)
		private readonly _rolRepository: RolRepository
	) { }

	async getById(id: number): Promise<Usuario> {
		if(!id){
			throw new BadRequestException("El id es requerido!");
		}
		const usuario: Usuario = await this._usuarioRepository.findOne(id, {where: {status: Status.ACTIVE} });

		if(!usuario){
			throw new NotFoundException(`El usaurio con id: ${id} -- Usuario no encontrado!`);
			// throw new BadRequestException(`El usaurio con id: ${id} -- Usuario no encontrado!`);
		}

		return usuario;
	}

	async getAll(): Promise<Usuario[]> {
	
		const usuarios: Usuario[] = await this._usuarioRepository.find({where: {status: Status.ACTIVE} });

		return usuarios;
	}

	// async create(usuario: Usuario): Promise<Usuario>{
	// 	const usuarioDetalles = new UsuarioDetalles();
	// 	usuario.detalles = usuarioDetalles;

	// 	const rolRepository = await getConnection().getRepository(Rol);
	// 	const defaultRol = await rolRepository.findOne({name: 'GENERAL'});
	// 	usuario.roles = [defaultRol];		

	// 	const saveUsuario: Usuario = await this._usuarioRepository.save(usuario);

	// 	return saveUsuario;
	// }

	async update(id: number, usuario: Usuario): Promise<Usuario>{
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
		const usuarioExist = await this._usuarioRepository.findOne(id, {where: {status: Status.ACTIVE}});

		if(!usuarioExist){
			throw new NotFoundException();
		}

		await this._usuarioRepository.update(id, {status: Status.INACTIVE});
	}

	async setRolToUsuaurio(idUsuario: number, idRol: number): Promise<boolean>{
		const usuarioExist = await this._usuarioRepository.findOne(idUsuario, {where: {status: Status.ACTIVE}});

		if(!usuarioExist){
			throw new NotFoundException('El usuario no existe!');
		}
		const rolExist = await this._rolRepository.findOne(idRol, {where: {status: Status.ACTIVE}});

		if(!rolExist){
			throw new NotFoundException('El rol no existe!');
		}

		//console.log(usuarioExist.roles)

		usuarioExist.roles.push(rolExist);
		//console.log(usuarioExist.roles)

		await this._usuarioRepository.save(usuarioExist);

		return true;
	}
}
