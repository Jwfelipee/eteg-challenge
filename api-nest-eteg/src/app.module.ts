import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { repositories } from './repository';
import { CustomerModule } from './modules';

@Module({
	imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig() as TypeOrmModuleOptions), TypeOrmModule.forFeature(repositories), CustomerModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
