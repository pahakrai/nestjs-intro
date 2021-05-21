import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Flavor } from './flavor.entity';
  
  @Entity() // sql table === 'coffee'
  export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    brand: string;

    @Column({ default: 0 })
    recommendations: number;
  
    @JoinTable()
    @ManyToMany(
      type => Flavor,
      flavor => flavor.coffees,
      {
        cascade: true, // 👈 or optionally just insert or update ['insert']
      },
    )
    flavors: Flavor[];
  }