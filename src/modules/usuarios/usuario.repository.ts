import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "./usuario.entity";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{

}