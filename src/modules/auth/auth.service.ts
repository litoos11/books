import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto';
import { aqua } from 'color-name';
import { Usuario } from '../usuarios/usuario.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RolType } from '../rol/roltype.enum';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AuthRepository)
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService
		){}

		async signup(signupDto: SignupDto): Promise<void>{
			const { username, email } = signupDto;
			const usuarioExists = await this._authRepository.findOne({
				where: [{username}, {email}]
			});

			if(usuarioExists){
				throw new ConflictException('Usuario o Email ya extisten!');
			}

			return this._authRepository.signup(signupDto);
		}

		async signin(signinDto: SigninDto): Promise<{token: string}>{
			const {username, password} = signinDto;
			const usuario: Usuario = await this._authRepository.findOne({
				where: {username}
			});

			if(!usuario){
				throw new NotFoundException('El usuario no existe!');
			}

			const isMatch = await compare(password, usuario.password);

			if(!isMatch){
				throw new UnauthorizedException('Credenciales invalidas!');
			}

			const payload: IJwtPayload = {
				id: usuario.id,
				email: usuario.email,
				username: usuario.username,
				roles: usuario.roles.map(r => r.name as RolType)
			}
			console.log(payload)

			const token = await this._jwtService.sign(payload);

			return {token};
		}
}