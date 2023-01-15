import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }
}
