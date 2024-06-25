import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Cache } from 'cache-manager';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('category')
export class CategoryController {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private readonly categoryService: CategoryService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/fetch-all-category')
  async getAllCategory() {
    console.log('inside controller');
    //     const cachedData = await this.cacheManager.get('categories');

    //     if (cachedData) {
    //       console.log('Got data from cache');
    //       return cachedData;
    //     }
    const data = await this.categoryService.fetchAllCategory();
    //     await this.cacheManager.set('categories', data);
    return data;
  }

  @Get('/fetch-all-active-category')
  async fetAllActiveCategory() {
    return await this.categoryService.fetchAllActiveCategory();
  }

  @Get('/:id')
  async FetchCategoryById(@Param('id') id: number) {
    console.log(id);
    return await this.categoryService.fetchcategoryById(id);
  }

  @Post('/create')
  async createCategory(@Body() data: any) {
    return await this.categoryService.createCategory(data);
  }

  @Patch('/update/:id')
  async UpdateCategory(@Param('id') id: number, @Body() data: any) {
    return await this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async DeleteCategory() {}
}
