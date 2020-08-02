import { HttpModule, Module } from '@nestjs/common';
import { WallhavenController } from './wallhaven.controller';
import { WallhavenService } from './wallhaven.service';

@Module({
  imports: [HttpModule],
  controllers: [WallhavenController],
  providers: [WallhavenService],
})
export class WallhavenModule {

}
