import { Module } from '@nestjs/common';
import { ControllerTeste } from './controller.teste';

@Module({
  imports: [
  ],
  controllers: [ControllerTeste],
  providers: [],
})
export class AppModule {}
