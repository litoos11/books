import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { RolService } from "./rol.service";
import { Rol } from "./rol.entity";

@Controller('roles')
export class RolController{

	constructor(private readonly _rolService: RolService) {}		
	
	@Get(':id')
	async getRol(@Param('id') id: number): Promise<Rol>{
		const rol = await this._rolService.getById(id);
		return rol;
	}

	@Get()
	async getRoles():Promise<Rol[]>{
		const rol = await this._rolService.getAll();
		return rol;
	}

	@Post()
	async creteRol(@Body() rol: Rol): Promise<Rol>{
		const createdRol = await this._rolService.create(rol);
		return createdRol;
	}

	@Put(':id')
	async updateRol(@Param('id') id: number, @Body() rol: Rol): Promise<Rol>{
		const updateRol = await this._rolService.update(id, rol);

		return updateRol;
	}

	@Delete(':id')
	async deleteRol(@Param('id') id: number){
		await this._rolService.delete(id);
		return true;
	}

}