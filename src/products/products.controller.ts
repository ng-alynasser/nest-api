import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'; 
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {} 
  @Post()
  addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number
    ) {
    const newProduct = this.productsService.addProduct(prodTitle, prodDesc, prodPrice);

    return {
      id: newProduct
    };
  }

  @Get()
  getAllProducts() {
    return {
      products: this.productsService.getAllProducts()
    };
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string, 
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
    ) {
      this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);

      return null; 
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.removeProduct(prodId);

    return null;
  }
}