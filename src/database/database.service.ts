import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from 'src/config/config.keys';

export const databaseProviders = [
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		async useFactory(config: ConfigService){
			return {
				//ssl: true, not support mysql localhost
				type: 'mysql',
				host: config.get(Configuration.HOST),
				port: config.get(Configuration.PORTDB),
				username: config.get(Configuration.USERNAME),
				password: config.get(Configuration.PASSWORD),
				database: config.get(Configuration.DATABASE),
				//synchronize: true,
				entities:[__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}']
			}	as ConnectionOptions;
		},
	}),
];