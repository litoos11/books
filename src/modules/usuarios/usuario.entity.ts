import { BaseEntity , Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { UsuarioDetalles } from './usuario.detalles.entity';
import { Rol } from '../rol/rol.entity';

@Entity('usuarios')
export class Usuario extends BaseEntity{

	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'varchar', unique: true, length: 25, nullable:false })
	username: string;

	@Column({ type: 'varchar', nullable: false })
	email: string;
	
	@Column({ type: 'varchar', nullable:false })
	password: string;

	@Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
	status: string;

	@CreateDateColumn({ type: 'timestamp', name: 'create_at' })
	createAd: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
	updateAd: Date;

	@OneToOne(type => UsuarioDetalles, { cascade: true, nullable: false, eager: true })
	@JoinColumn({name: 'detalle_id'})
	detalles: UsuarioDetalles;

	@ManyToMany(type => Rol, rol => rol.usuarios, {eager: true})
	@JoinTable({name: 'usuario_roles'})
	roles: Rol[];
}