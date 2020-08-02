import {
  Controller, Get, Query,
} from '@nestjs/common';
import { WallhavenService } from './wallhaven.service';
import { ApiQuery } from '@nestjs/swagger';
import { CategoriesEnum } from './enums/category.enum';
import { FindImagesQueryInterface } from './interfaces/find-images-query.interface';

@Controller()
export class WallhavenController {
  constructor(private readonly wallhavenService: WallhavenService) {}

  getCategory(category: string): string {
    switch (category) {
      case CategoriesEnum.Anime:
        return '010';
      case CategoriesEnum.General:
        return '100';
      case CategoriesEnum.People:
        return '001';
      default:
        return '111';
    }
  }

  @Get('/random-image')
  getRandomImage() {
    return this.wallhavenService.getRandomImage();
  }

  @Get('/find-images')
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
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Amount of returned images',
  })
  findImagesByName(
    @Query() query: FindImagesQueryInterface,
  ) {
    const category = this.getCategory(query.category)
    const { q, limit } = query
    return this.wallhavenService.findImagesByName(category, q, limit);
  }
}
