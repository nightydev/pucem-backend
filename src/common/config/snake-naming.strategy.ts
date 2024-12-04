// Custom TypeORM naming strategy to convert table, column, and relation names to snake_case.

import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    return customName || snakeCase(className);
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.join('_') + (customName || propertyName));
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
