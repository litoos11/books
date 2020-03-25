import { Repository, EntityRepository, getConnection } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";
import { SignupDto } from "./dto";
import { RolRepository } from "../rol/rol.repository";
import { Rol } from "../rol/rol.entity";
import { RolType } from "../rol/roltype.enum";
import { UsuarioDetalles } from "../usuarios/usuario.detalles.entity";
import { hash, genSalt } from "bcryptjs";

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario>{
	async signup(signupDto: SignupDto){
		const {username, email, password} = signupDto;
		const usuario = new Usuario();
		usuario.username = username;
		usuario.email = email;	
		
		const rolRepository: RolRepository = await getConnection().getRepository(Rol);

		const defaultRol: Rol = await rolRepository.findOne({ where: { name: RolType.GENERAL }});
		usuario.roles = [defaultRol];

		const detalles = new UsuarioDetalles();
		usuario.detalles = detalles;

		const salt = await genSalt(10);
		usuario.password = await hash(password, salt);

		await usuario.save();

	}
}
