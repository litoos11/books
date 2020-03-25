import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuariosService } from './usuarios.service';
import { SharedModule } from 'src/shared/shared.module';
import { UsuariosController } from './usuarios.controller';
import { AuthModule } from '../auth/auth.module';
import { RolRepository } from '../rol/rol.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioRepository, RolRepository]), SharedModule, AuthModule],
	providers: [UsuariosService],
	controllers: [UsuariosController]
})
export class UsuariosModule {}
