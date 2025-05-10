import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { databaseProviders } from './providers/database.providers';
import { services } from './services';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [...controllers],
  providers: [...services, ...databaseProviders],
})
export class AppModule {}
