import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallhavenModule } from './wallhaven/wallhaven.module';

@Module({
  imports: [WallhavenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
