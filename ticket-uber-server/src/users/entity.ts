import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, RelationId } from 'typeorm';
import Ticket from '../tickets/entity';
import { IsEmail, MinLength, IsString, IsIn } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import Comment from '../comments/entity';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @IsEmail()
  @Column('varchar', {nullable: true})
  email: string;

  @MinLength(7)
  @Column('text', {nullable: false})
  @Exclude({toPlainOnly:true})
  password: string;

  @IsString()
  @MinLength(1)
  @Column('varchar', {nullable: false})
  firstName: string;

  @IsString()
  @MinLength(1)
  @Column('varchar', {nullable: false})
  lastName: string;

  @IsString()
  @IsIn(['user', 'admin'])
  @Column('varchar', {nullable: false, default: 'user'})
  role?: 'user'|'admin';

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 3);
    this.password = hash;
  }

  async verifyPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
  
  @OneToMany(type => Ticket, ticket => ticket.author)
  tickets: Ticket[];

  @RelationId((user: User) => user.tickets)
  ticketIds: number[];

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[];
}