import { DataSource } from 'typeorm';
import { databaseConfig } from 'src/config/database.config';
import { ParkEntity } from 'src/entities';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            return new DataSource({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || "5432", 10),
                username: process.env.DB_USERNAME || 'iksena',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'postgres',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
            }).initialize();
        }
    },
    {
        provide: 'PARK_DATA_SOURCE',
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(ParkEntity),
        inject: ['DATA_SOURCE']
    }
];