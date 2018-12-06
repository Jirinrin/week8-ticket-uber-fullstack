import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, RelationId } from 'typeorm';
import Event from '../events/entity';
import User from '../users/entity';
import Comment from '../comments/entity';
import { MinLength, IsUrl, IsNumber, IsString, IsDateString, Min, Max } from 'class-validator';

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(10)
  @Column('text', {nullable: false})
  description: string;

  @IsUrl()
  @Column('text', {nullable: true})
  pictureUrl?: string;

  @IsNumber()
  @Column('decimal', {nullable: false})
  price: number;
  
  @IsDateString()
  @Column({type: 'timestamp with time zone', nullable: false, default: 'NOW()'})
  createdAt?: string;

  @Min(0)
  @Max(100)
  @Column('decimal', {nullable: true, default: 0})
  fraudRisk?: number;

  @ManyToOne(type => Event, event => event.tickets, {onDelete: 'CASCADE'})
  event: Event;

  // @Column({nullable: true})
  @RelationId((ticket: Ticket) => ticket.event)
  eventId: number;

  @ManyToOne(type => User, user => user.tickets, {onDelete: 'CASCADE'})
  author: User;

  // @Column('int', {nullable: true})
  @RelationId((ticket: Ticket) => ticket.author)
  authorId: number;

  @OneToMany(type => Comment, comment => comment.ticket)
  comments: Comment[];

  @RelationId((ticket: Ticket) => ticket.comments)
  commentIds: number[];
}