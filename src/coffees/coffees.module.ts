import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// Our mock implementation
export class MockCoffeesService { }
export class ConfigService {}
export class DevelopmentConfigService {}
export class ProductionConfigService {}


@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [
      CoffeesService,
    // {
    //   provide: CoffeesService,
    //   useValue: new MockCoffeesService(), // <-- mock implementation
    // },
    // { provide: ConfigService, 
    //     useClass: process.env.NODE_ENV === 'development'
    // ? DevelopmentConfigService
    // : ProductionConfigService
    // },
    // {
    //     provide: COFFEE_BRANDS, // 👈
    //     useValue: ['buddy brew', 'nescafe'] // array of coffee brands,
    // },
    // NOTE: Factory Providers
    // {
    //     provide: COFFEE_BRANDS, // 👈
    //     useFactory: () => ['buddy brew', 'nescafe'] // array of coffee brands,
    // },
    // {
    //     provide: COFFEE_BRANDS, // 👈
    //     useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create() // array of coffee brands,
    //     inject: [CoffeeBrandsFactory]
    // },
    // async factory
    // Asynchronous "useFactory" (async provider example)
    // {
    //     provide: COFFEE_BRANDS,
    //     // Note "async" here, and Promise/Async event inside the Factory function 
    //     // Could be a database connection / API call / etc
    //     // In our case we're just "mocking" this type of event with a Promise
    //     useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe'])
    //     return coffeeBrands;
    //     },
    //     scope: Scope.TRANSIENT, 
    //     inject: [Connection],
    // },
  ],
  exports: [CoffeesService]
})
export class CoffeesModule {}