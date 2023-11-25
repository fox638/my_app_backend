// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

export enum Table {
  Board = "board",
  BoardCard = "board_card",
  BoardColumn = "board_column",
  KnexMigrations = "knex_migrations",
  KnexMigrationsLock = "knex_migrations_lock",
  Users = "users",
}

export type Tables = {
  "board": Board,
  "board_card": BoardCard,
  "board_column": BoardColumn,
  "knex_migrations": KnexMigrations,
  "knex_migrations_lock": KnexMigrationsLock,
  "users": Users,
};

export type Board = {
  id: number;
  title: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

export type BoardCard = {
  id: number;
  title: string;
  description: string;
  order: number;
  column_id: number;
  board_id: number;
  created_at: Date;
  updated_at: Date;
};

export type BoardColumn = {
  id: number;
  title: string;
  order: number;
  board_id: number;
  created_at: Date;
  updated_at: Date;
};

export type KnexMigrations = {
  id: number;
  name: string | null;
  batch: number | null;
  migration_time: Date | null;
};

export type KnexMigrationsLock = {
  index: number;
  is_locked: number | null;
};

export type Users = {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

