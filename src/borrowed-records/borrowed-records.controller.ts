import { Controller, Get, Post, Body } from '@nestjs/common';
import { BorrowedRecordsService } from './borrowed-records.service.js';
import { BorrowBookDto } from './dto/borrow-book.dto.js';

@Controller('borrowed-records')
export class BorrowedRecordsController {
  constructor(private readonly borrowedRecordsService: BorrowedRecordsService) {}

  // 3.3: Chức năng độc giả mượn sách, và lưu dữ liệu vào BorrowedRecord
  @Post('borrow')
  async borrowBook(@Body() dto: BorrowBookDto) {
    return await this.borrowedRecordsService.borrowBook(dto);
  }

  // 3.4: Chức năng liệt kê danh sách Sách (Book) đã được mượn với thông tin ngày mượn, người mượn, và hạn trả sách
  @Get('borrowed-books')
  async getBorrowedBooksList() {
    return await this.borrowedRecordsService.getBorrowedBooksList();
  }
}
