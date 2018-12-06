import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

// For the time being this will have to be set DIRECTLY via the source code of a controller or sth

@Entity()
export default class AdminPass extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @MinLength(7)
  @Column('text', {nullable: false})
  @Exclude({toPlainOnly: true})
  password: string;

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  async verifyPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}