import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://alynasser:alynasser@aly-nasser-fyfqh.mongodb.net/nestjs-demo?retryWrites=true&w=majority', 
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
