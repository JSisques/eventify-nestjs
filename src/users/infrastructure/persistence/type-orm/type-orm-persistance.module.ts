import { Module } from '@nestjs/common';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMUserEntity } from './entities/type-orm-user.entity';
import { TypeOrmUserRepository } from './repositories/type-orm-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeORMUserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class TypeORMPersistanceModule {}
