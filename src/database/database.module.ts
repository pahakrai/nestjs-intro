import { DynamicModule, Module } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

@Module({
    // static implementation
//     providers: [ // Initial attempt at creating "CONNECTION" provider, and utilizing useValue for values */
//     {
//       provide: 'CONNECTION',
//       useValue: createConnection({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432
//       }),
//     }
// ]
})
// Improved Dynamic Module way of creating CONNECTION provider
export class DatabaseModule {
    static register(options: ConnectionOptions): DynamicModule {
      return {
        module: DatabaseModule,
        providers: [
          {
            provide: 'CONNECTION', // 👈
            useValue: createConnection(options), 
          }
        ]
      }
    }
  }
