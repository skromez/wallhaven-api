import {
  Controller, Get, Query,
} from '@nestjs/common';
import { WallhavenService } from './wallhaven.service';
import { ApiQuery } from '@nestjs/swagger';
import { Categories } from './enums/category.enum';
import { CategoryQueryInterface } from './interfaces/category-query.interface';

@Controller()
export class WallhavenController {
  constructor(private readonly wallhavenService: WallhavenService) {}

  getImageCategory(category: string): string {
    switch (category) {
      case Categories.Anime:
        return '010';
      case Categories.General:
        return '100';
      case Categories.People:
        return '001';
      default:
        return '111';
    }
  }

  @Get('/random-image')
  getRandomImage() {
    return this.wallhavenService.getRandomImage();
  }

  @Get('/category-image')
  @ApiQuery({
    name: 'category',
    type: String,
    required: false,
    description: 'Determines category of the image returned',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    required: false,
    description: 'Search params to find certain image (e.g `anime` or `naruto`)',
  })
  getCategoryRandomImage(
    @Query() query: CategoryQueryInterface,
  ) {
    const category = this.getImageCategory(query.category)
    const { q } = query
    return this.wallhavenService.getCategoryRandomImage(category, q);
  }
}
