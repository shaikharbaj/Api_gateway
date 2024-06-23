import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CategoryService {

    constructor(@Inject("USER_MICROSERVICE") private readonly userClient: ClientProxy) { }

    async fetchAllCategory() {
        return await lastValueFrom(this.userClient.send({ role: "FETCH-ALL-CATEGORY", cmd: "fetch-all-category" }, {}))
    }

    async createCategory(payload: any) {
        return await lastValueFrom(this.userClient.send({ role: "CREATE-CATEGORY", cmd: "create-category" }, { data: payload }))
    }

    async fetchAllActiveCategory(){
    return await lastValueFrom(this.userClient.send({ role: "FETCH-ALL-ACTIVE_CATEGORY", cmd: "fetch-all-active-category" },{}));
    }

    async fetchcategoryById(id:number){
             return await lastValueFrom(this.userClient.send({role:"Fetch-Category-By-Id",cmd:"fetch-category-by-id"},{id:+id}))
    }

    async updateCategory(id:number,data:any){
             return await lastValueFrom(this.userClient.send({role:"UPDATE_CATEGORY",cmd:"update-category"},{id:Number,data}));
    }
}
