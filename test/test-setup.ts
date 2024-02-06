import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const setupDatabase = async (
  app: INestApplication,
): Promise<DataSource> => {
  const dataSource = app.get(DataSource);
  await dataSource.query('BEGIN');
  await dataSource.synchronize(true);
  return dataSource;
};

export const cleanupDatabase = async (
  dataSource: DataSource,
): Promise<void> => {
  if (dataSource) {
    await dataSource.query('ROLLBACK');
  }
};
