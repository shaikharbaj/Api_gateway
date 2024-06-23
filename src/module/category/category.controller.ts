import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
      constructor(private readonly categoryService:CategoryService){}
    @Get("/fetch-all-category")
    async getAllCategory(){
           const data = await this.categoryService.fetchAllCategory();
           return data;
    }

    @Get("/fetch-all-active-category")
    async fetAllActiveCategory(){
          return await this.categoryService.fetchAllActiveCategory();
    }

    @Get("/:id")
   async FetchCategoryById(@Param("id") id:number){
            console.log(id);
            return await this.categoryService.fetchcategoryById(id)
    }

    @Post("/create")
    async createCategory(@Body() data:any){
         return await this.categoryService.createCategory(data)
    }

    @Patch("/update/:id")
    async UpdateCategory(@Param("id") id:number,@Body() data:any){
           return await this.categoryService.updateCategory(id,data); 
    }

    @Delete(":id")
    async DeleteCategory(){

    }
}
