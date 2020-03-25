import { PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
	constructor(
		private readonly _configService: ConfigService,
		@InjectRepository(AuthRepository)
		private readonly __authRepository: AuthRepository){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: _configService.get(Configuration.JWT_SECRET)
		});
	}

	async validate(payload: IJwtPayload){
		const {username} = payload;

		const usuario = await this.__authRepository.findOne({
			where: {username, status: 'ACTIVE'}
		});

		if(!usuario){
			throw new UnauthorizedException();
		}

		return payload;
	}

}