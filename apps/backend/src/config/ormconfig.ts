import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const AppDataSource: DataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(String(process.env.DB_PORT), 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [],
    migrations: ['src/app/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
    logging: true,
});

// Démarre la connexion
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
