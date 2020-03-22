import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
	private readonly envConfig: { [key: string]: string | number };

	constructor(){
		const isDevelopmentEnv = process.env.NODE_ENV !== "production";

		if(isDevelopmentEnv){
			const envFilePath = __dirname + '/../../.env';
			const existsPath = fs.existsSync(envFilePath);

			if(!existsPath){
				//console.log(envFilePath)
				console.log('.env file does not exist');
				process.exit(0);
			}

			this.envConfig = parse(fs.readFileSync(envFilePath));
		}else{
			this.envConfig = {
				PORT: process.env.PORT,
			}
		}
	}

	get(key: string): string | number{
		return this.envConfig[key];
	}
}
