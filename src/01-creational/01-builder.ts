/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 *
 * * Ejercicio:
 * En este ejercicio se construye un mini ORM (QueryBuilder) que arma una
 * consulta SQL de tipo SELECT paso a paso, encadenando métodos como select,
 * where, orderBy y limit antes de llamar a execute para obtener el string
 * final de la consulta.
 *
 * Se espera entender cómo el patrón Builder permite ir configurando un objeto
 * complejo (la consulta) de forma incremental y legible, sin necesidad de un
 * constructor con muchos parámetros, y cómo cada método va devolviendo la
 * misma instancia (this) para permitir el encadenamiento (method chaining).
 */

import { COLORS } from '../helpers/colors.ts';

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`ORDER BY ${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    const fields = this.fields.length > 0 ? this.fields.join(', ') : '*';

    const whereClause =
      this.conditions.length > 0
        ? `WHERE ${this.conditions.join(' AND ')}`
        : '';

    const orderByClause =
      this.orderFields.length > 0
        ? `ORDER BY ${this.orderFields.join(', ')}`
        : '';

    const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : '';

    return `SELECT ${fields} FROM ${this.table} ${whereClause} ${orderByClause} ${limitClause}`;
  }
}

// Código cliente
function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 20')
    // .where("country = 'CHI'") // Esto debe de hacer una condición AND
    .orderBy('name', 'ASC')
    .orderBy('age', 'DESC')
    .limit(100)
    .execute();

  console.log('%cConsulta:\n', COLORS.red);
  console.log(usersQuery);
}

main();
