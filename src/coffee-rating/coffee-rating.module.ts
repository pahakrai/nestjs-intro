import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  //   // Utilizing the dynamic DatabaseModule in another Modules imports: []
  // imports: [
  //   DatabaseModule.register({ // 👈 passing in dynamic values
  //     type: 'postgres',
  //     host: 'localhost',
  //     password: 'password',
  //   })
  // ]
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
