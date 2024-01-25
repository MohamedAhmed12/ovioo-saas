export const ormConfig = () => {
  const config: any = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    entities: ['dist/**/*.entity.js'],
  };
  const testingConfig: any = {
    type: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    username: 'postgres',
    password: 'postgres',
    database: 'ovioo_testing',
    synchronize: 'true',
    entities: [__dirname + '/**/*.entity.ts'],
  };

  if (process.env.NODE_ENV == 'production') {
    config['ssl'] = {
      rejectUnauthorized: false, // adjust after setup the ssl to RDS and domain to EC2
    };
  }

  return process.env.NODE_ENV == 'test' ? testingConfig : config;
};
