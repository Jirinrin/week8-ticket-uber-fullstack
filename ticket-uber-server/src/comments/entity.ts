import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId } from "typeorm";
import User from "../users/entity";
import Ticket from "../tickets/entity";
import { MinLength, IsString } from "class-validator";

/// validation nog stuffen
@Entity()
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @MinLength(2)
  @Column('text', {nullable: false})
  content: string;

  @ManyToOne(type => Ticket, ticket => ticket.comments, {onDelete: 'CASCADE'})
  ticket: Ticket;
  
  // @Column('int', {nullable: true})
  // @RelationId((comment: Comment) => comment.ticket)
  // ticketId: number;
    
  @ManyToOne(type => User, user => user.comments)
  author: User;
    
  // @Column('int', {nullable: true})
  @RelationId((comment: Comment) => comment.author)
  authorId: number;
}