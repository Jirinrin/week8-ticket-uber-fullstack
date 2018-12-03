import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, RelationId } from "typeorm";
import Event from '../events/entity';
import User from "../users/entity";
import Comment from "../comments/entity";
import { MinLength, IsUrl, IsNumber, IsString, IsDateString, Min, Max } from "class-validator";

/// validation nog stuffen
@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(10)
  @Column('text', {nullable: false})
  description: string;

  /// werkt dit zo? met dat hij niet IsUrl() alsnog draait als het niet gesupplied wordt
  @IsUrl()
  @Column('text', {nullable: true})
  pictureUrl?: string;

  /// kijken of dit met scale zo werkt
  @IsNumber()
  @Column('decimal', {nullable: false/*, scale: 2*/})
  price: number;
  
  /// kijken of dit werkt met time without time zone uitlezen etc, en ook of het IsDateString() werkt
  @IsDateString()
  @Column({type: 'time without time zone', nullable: false, default: 'NOW()'})
  createdAt?: string;

  @Min(0)
  @Max(100)
  @Column('decimal', {nullable: true/*, scale: 2*/})
  fraudRisk: number;
  
  /// calculate risk function gwn hier?? bijna niet mogelijk zeker

  @ManyToOne(type => Event, event => event.tickets)
  event: Event;

  @RelationId((ticket: Ticket) => ticket.event)
  eventId: number;

  @ManyToOne(type => User, user => user.tickets)
  author: User;

  @RelationId((ticket: Ticket) => ticket.author)
  authorId: number;

  @OneToMany(type => Comment, comment => comment.ticket)
  comments: Comment[];
}