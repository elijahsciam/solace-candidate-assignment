import { sql, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

type Pagination<T> = {
  limit: number;
  page: number;
  sort: string;
  total_rows: number;
  total_pages: number;
  rows: T[];

  getPage: () => number;
};

class Paginator<T> {
  private pagination: Pagination<T>;

  constructor(pagination: Pagination<T>) {
    this.pagination = pagination;
  }

  getPage(): number {
    return this.pagination.page ? 0 : this.pagination.page;
  }

  getLimit(): number {
    return this.pagination.limit ? 0 : this.pagination.limit;
  }

  getSort(): string {
    return this.pagination.sort;
  }

  getOffset(): number {
    return (this.getPage() - 1) * this.getLimit();
  }

  setTotalRows(totalRows: number) {
    this.pagination.total_rows = totalRows;
    this.pagination.total_pages = Math.ceil(totalRows / this.getLimit());
  }

  getPagination(): Pagination<T> {
    return this.pagination;
  }

  convertRows<T>(rows: any[]): T[] {
    return rows.map((row) => row as T);
  }
}

export async function paginate<T>(
  db: PostgresJsDatabase<any>,
  table: any,
  pagination: Pagination<T>
): Promise<Pagination<T>> {
  const paginator = new Paginator<T>(pagination);

  // Get total row count
  const totalCountResult = await db.execute(
    sql`SELECT COUNT(*) AS count FROM ${table}`
  );
  const totalRows = Number(totalCountResult[0].count);
  paginator.setTotalRows(totalRows);

  // Fetch paginated results
  const rows = await db
    .select()
    .from(table)
    .limit(paginator.getLimit())
    .offset(paginator.getOffset())
    .orderBy(sql.raw(paginator.getSort()));

  const convertedRows: T[] = paginator.convertRows<T>(rows);

  return {
    ...paginator.getPagination(),
    rows: convertedRows,
  };
}

export async function wherePaginate<T>(
  db: PostgresJsDatabase,
  table: any,
  whereString: string,
  pagination: Pagination<T>
): Promise<Pagination<T>> {
  const paginator = new Paginator<T>(pagination);

  const totalCountResult = await db.execute(
    sql`SELECT COUNT(*) AS count FROM ${table}`
  );
  const totalRows = Number(totalCountResult[0].count);
  paginator.setTotalRows(totalRows);

  const rows = await db
    .select()
    .from(table)
    .where(sql.raw(whereString))
    .limit(paginator.getLimit())
    .offset(paginator.getOffset())
    .orderBy(sql.raw(paginator.getSort()));

  const convertedRows: T[] = paginator.convertRows<T>(rows);

  return {
    ...paginator.getPagination(),
    rows: convertedRows,
  };
}

export async function joinAndWherePaginate<T>(
  db: PostgresJsDatabase,
  table: any,
  joinTable: any,
  whereString: string,
  pagination: Pagination<T>
): Promise<Pagination<T>> {
  const paginator = new Paginator<T>(pagination);

  const totalCountResult = await db.execute(
    sql`SELECT COUNT(*) AS count FROM ${table}`
  );
  const totalRows = Number(totalCountResult[0].count);
  paginator.setTotalRows(totalRows);

  const rows = await db
    .select()
    .from(table)
    .where(sql.raw(whereString))
    .innerJoin(joinTable, eq(table.id, joinTable.id))
    .limit(paginator.getLimit())
    .offset(paginator.getOffset())
    .orderBy(sql.raw(paginator.getSort()));

  const convertedRows: T[] = paginator.convertRows<T>(rows);

  return {
    ...paginator.getPagination(),
    rows: convertedRows,
  };
}
