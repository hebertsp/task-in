import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TasksModule } from './tasks/tasks.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [UsersModule, TasksModule, CatsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
