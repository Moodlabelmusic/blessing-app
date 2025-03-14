import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from './config/auth.config';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
