import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reader } from './entities/reader.entity.js';
import { ReadersService } from './readers.service.js';
import { ReadersController } from './readers.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Reader])],
  controllers: [ReadersController],
  providers: [ReadersService],
  exports: [TypeOrmModule],
})
export class ReadersModule {}
