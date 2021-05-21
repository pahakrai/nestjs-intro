import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:37017/nest-course'),
    /* forRootAsync() */
    TypeOrmModule.forRootAsync({ // 👈
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot(
      {
        // validationSchema: Joi.object({
        //   DATABASE_HOST: Joi.required(),
        //   DATABASE_PORT: Joi.number().default(5432),
        // }),
        load: [appConfig] // 👈
      }
    ),
    // TypeOrmModule.forRoot({
    //   // type: 'postgres', // type of our database
    //   // host: 'localhost', // database host
    //   // port: 5432, // database host
    //   // username: 'postgres', // username
    //   // password: 'pass123', // user password
    //   // database: 'postgres', // name of our database,
    //   // autoLoadEntities: true, // models will be loaded automatically 
    //   // synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    // }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
    // registers as global pipe
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
})
export class AppModule {}
