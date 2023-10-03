import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';

  
  @Controller('teste')
  // @UseGuards(JwtGuard)
  export class ControllerTeste {
    @Get('teste')
    a() {
      return '123'  
    }

    @Get('teste2')
    ab() {
      return '345'  
    }
   
  }
  