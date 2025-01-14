import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Agents} from "./entities/agents.entity";
import {Messages} from "./entities/messages.entity";
import {Conversations} from "./entities/conversations.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => {
                const dbPort = process.env.DB_PORT;
                if (!dbPort) {
                    throw new Error('DB_PORT environment variable is not defined');
                }
                const port = parseInt(dbPort, 10);
                return {
                    type: 'postgres',
                    host: 'localhost',
                    port: port,
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.POSTGRES_DB,
                    autoLoadEntities: true,
                    synchronize: true, // false in prod
                    entities: [Agents, Messages, Conversations],
                    cli: {
                        migrationsDir: 'src/database/migrations/',
                    },
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}