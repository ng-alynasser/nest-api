import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Get()
  greeting() {
    return `<h1>Nest.js API</h1`;
  }
}
