import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuarios/usuario.entity";

@Entity('roles')
export class Rol extends BaseEntity{

	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({type: 'varchar', length: 20, nullable: false})
	name: string;

	@Column({type: 'varchar', nullable: false})
	description: string;

	@Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
	status: string;

	@CreateDateColumn({ type: 'timestamp', name: 'create_at' })
	createAd: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
	updateAd: Date;

	@ManyToMany(type => Usuario, usuario => usuario.roles)
	@JoinColumn()
	usuarios: Usuario[];
}