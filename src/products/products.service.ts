import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private products: Array<Product> = [];

  constructor(@InjectModel('Products') private readonly productModel: Model<Product>) {}

  async addProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title, 
      description, 
      price 
    });
    const result = await newProduct.save();
    console.log(result);
    
    return 'productId';
  }

  getAllProducts(): Array<Product> {
    return [ ...this.products ];
  }

  getProduct(productId: string) {
    const [ product ] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [ product, index ] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
  }

  removeProduct(prodId: string) {
    const [ product, index ] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    
    return [ product, productIndex ];
  }

  
}