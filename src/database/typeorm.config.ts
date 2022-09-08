import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        entities: [__dirname + '/../modules/**/*.entity.{js,ts}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        
        synchronize: false,
        logging: true,
    };
  },
};


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../modules/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: false,
    logging: true,
  };