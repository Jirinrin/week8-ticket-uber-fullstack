/// alle double-quotes vervangen door enkele
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ticket from "../tickets/entity";
import { IsString, IsUrl, IsDate, MinLength } from "class-validator";

/// iets met cascade on delete van de onetomany-dingen
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

  /// kijken of dit met IsDate() werkt
  @IsDate()
  @Column({type: 'timestamp without time zone', nullable: false})
  startDate: Date;

  /// validation dat niet eerder dan startdate
  @IsDate()
  // @MinDate(this.startDate as Date)
  @Column({type: 'timestamp without time zone', nullable: false})
  endDate: Date;

  @OneToMany(type => Ticket, ticket => ticket.event)
  tickets: Ticket[];
}