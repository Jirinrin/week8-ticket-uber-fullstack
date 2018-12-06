import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Ticket from '../tickets/entity';
import { IsString, IsUrl, MinLength } from 'class-validator';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(1)
  @Column('varchar', {nullable: false})
  name: string;

  @IsString()
  @MinLength(10)
  @Column('text', {nullable: false})
  description: string;

  @IsString()
  @IsUrl()
  @Column('text', {nullable: false})
  imageUrl: string;

  @Column({type: 'timestamp with time zone', nullable: false})
  startDate: string;

  // Would like to add in-class validation to make sure the end date is greater than the start date...
  // @MinDate(this.startDate as Date)
  @Column({type: 'timestamp with time zone', nullable: false})
  endDate: string;

  @OneToMany(type => Ticket, ticket => ticket.event)
  tickets: Ticket[];
}