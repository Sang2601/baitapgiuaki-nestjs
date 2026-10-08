import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedRecord } from './entities/borrowed-record.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { Reader } from '../readers/entities/reader.entity.js';
import { BorrowedRecordsService } from './borrowed-records.service.js';
import { BorrowedRecordsController } from './borrowed-records.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedRecord, Book, Reader])],
  controllers: [BorrowedRecordsController],
  providers: [BorrowedRecordsService],
})
export class BorrowedRecordsModule {}
