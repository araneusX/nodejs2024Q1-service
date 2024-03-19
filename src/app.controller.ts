import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  @Redirect('api')
  redirect() {
    return;
  }
}
