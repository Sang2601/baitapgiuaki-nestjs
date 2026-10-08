import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowedRecord } from './entities/borrowed-record.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { Reader } from '../readers/entities/reader.entity.js';
import { BorrowBookDto } from './dto/borrow-book.dto.js';

@Injectable()
export class BorrowedRecordsService {
  constructor(
    @InjectRepository(BorrowedRecord)
    private readonly borrowedRecordRepository: Repository<BorrowedRecord>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Reader)
    private readonly readerRepository: Repository<Reader>,
  ) {}

  // 3.3: Chức năng độc giả mượn sách, và lưu dữ liệu vào BorrowedRecord
  async borrowBook(dto: BorrowBookDto): Promise<BorrowedRecord> {
    const reader = await this.readerRepository.findOne({ where: { id: dto.readerId } });
    if (!reader) {
      throw new NotFoundException(`Không tìm thấy độc giả ID = ${dto.readerId}`);
    }

    const book = await this.bookRepository.findOne({ where: { id: dto.bookId } });
    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách ID = ${dto.bookId}`);
    }

    const record = this.borrowedRecordRepository.create({
      reader,
      readerId: reader.id,
      book,
      bookId: book.id,
      borrowDate: dto.borrowDate ? new Date(dto.borrowDate) : new Date(),
      dueDate: new Date(dto.dueDate),
    });

    return await this.borrowedRecordRepository.save(record);
  }

  // 3.4: Chức năng liệt kê danh sách Sách (Book) đã được mượn với thông tin ngày mượn, người mượn, và hạn trả sách
  async getBorrowedBooksList() {
    const records = await this.borrowedRecordRepository.find({
      relations: { book: true, reader: true },
    });

    return records.map((record) => ({
      book: {
        id: record.book?.id,
        title: record.book?.title,
        author: record.book?.author,
      },
      borrower: {
        id: record.reader?.id,
        name: record.reader?.name,
        email: record.reader?.email,
        phone: record.reader?.phone,
      },
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
    }));
  }
}
