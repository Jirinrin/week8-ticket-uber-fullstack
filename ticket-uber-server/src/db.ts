import { createConnection } from 'typeorm';

import { DefaultNamingStrategy} from 'typeorm/naming-strategy/DefaultNamingStrategy';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { snakeCase } from 'typeorm/util/StringUtils';

import Event from './events/entity';
import Ticket from './tickets/entity';
import Comment from './comments/entity';
import User from './users/entity';
import AdminPass from './users/adminPassEntity';

// This naming strategy was largely taken from the reader. 
// It seems important that PostgreSQL has its naming stored in snake case
// as in the past I recall camelCase column names giving all kinds of errors.
class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  tableName(entityName: string, customName: string): string {
    /// heb dit zomaar aangepast
    return customName || snakeCase(entityName) + 's';
  }

  columnName(fieldName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName || fieldName).join("_"));
  }

  columnNameCustomized = (customName: string): string => customName;

  relationName = (fieldName: string): string => snakeCase(fieldName);
}

export default async () => createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL ||'postgres://postgres:secret@localhost:5432/postgres',
    entities: [
      Event,
      Ticket,
      Comment,
      User,
      AdminPass
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
  })
  .then(() => console.log('PostgreSQL-database started using TypeORM'));