import { Module } from '@nestjs/common';
import { UserModule_v1 } from './user/user.module';

@Module({
  imports: [UserModule_v1],
})
export class ControllerModule_v1 {}
