import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { RolRepository } from "./rol.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { MapperService } from "src/shared/mapper.service";
import { Rol } from "./rol.entity";

@Injectable()
export class RolService {
	constructor(
		@InjectRepository(RolRepository)
		private readonly _rolRepository: RolRepository
	) {}

	async getById(id: number): Promise<Rol> {
		if(!id){
			throw new BadRequestException("El id es requerido!");
		}
		const rol: Rol = await this._rolRepository.findOne(id, {where: {status: 'ACTIVE'} });

		if(!rol){
			throw new NotFoundException(`El rol con id: ${id} -- Rol no encontrado!`);
		}

		return rol;
	}

	async getAll(): Promise<Rol[]> {
	
		const roles: Rol[] = await this._rolRepository.find({where: {status: 'ACTIVE'} });

		return roles;
	}

	async create(rol: Rol): Promise<Rol>{
		const rolSave: Rol = await this._rolRepository.save(rol);
		return rolSave;
	}

	async update(id: number, rol: Rol): Promise<Rol>{
		//await this._usuarioRepository.update(id, usuario);
		const rolEncontrado: Rol =  await this._rolRepository.findOne(id);
		if(rolEncontrado){
			await this._rolRepository.update(id, rol);
			//return await this._usuarioRepository.findOne(id);
			return await this.getById(id);
		}else{
			throw new BadRequestException(`Error al actualizar el rol con id: ${id} -- Rol no encontrado!`);
		}
	}

	async delete(id: number): Promise<void>{
		const rolExists = await this._rolRepository.findOne(id, {where: {status: 'ACTIVE'}});

		if(!rolExists){
			throw new NotFoundException();
		}

		await this._rolRepository.update(id, {status: 'INACTIVE'});
	}
}