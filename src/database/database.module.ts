import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 import

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ // 👈 use TypeOrmModule
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { user, dbName, password, port, host} = configService.postgres;
        // const client = new Client({  // 👈 client
        //   user,
        //   host,
        //   database: dbName,
        //   password,
        //   port,
        // });
        
        // client.connect();
      }
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
