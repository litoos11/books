import { BaseEntity , Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('usuario_detalles')
export class UsuarioDetalles extends BaseEntity{

	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'varchar', length: 50, nullable:true })
	name: string;

	@Column({ type: 'varchar', nullable: true })
	lastname: string;
	
	@Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
	status: string;

	@CreateDateColumn({ type: 'timestamp', name: 'create_at', nullable: true })
	createAd: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'update_at', nullable: true })
	updateAd: Date;
}