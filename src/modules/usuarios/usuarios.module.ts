import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuariosService } from './usuarios.service';
import { SharedModule } from 'src/shared/shared.module';
import { UsuariosController } from './usuarios.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioRepository]), SharedModule],
	providers: [UsuariosService],
	controllers: [UsuariosController]
})
export class UsuariosModule {}
