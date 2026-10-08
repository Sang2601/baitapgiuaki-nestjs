import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { Book } from './books/entities/book.entity.js';
import { Reader } from './readers/entities/reader.entity.js';
import { BorrowedRecord } from './borrowed-records/entities/borrowed-record.entity.js';
import { User } from './auth/entities/user.entity.js';
import { BooksModule } from './books/books.module.js';
import { ReadersModule } from './readers/readers.module.js';
import { BorrowedRecordsModule } from './borrowed-records/borrowed-records.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    // Kết nối Cơ sở dữ liệu TypeORM (SQLite Local)
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'library.db',
      entities: [Book, Reader, BorrowedRecord, User],
      synchronize: true,
    }),
    BooksModule,
    ReadersModule,
    BorrowedRecordsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
