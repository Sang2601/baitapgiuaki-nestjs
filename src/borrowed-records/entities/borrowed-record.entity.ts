import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, type Relation } from 'typeorm';
import { Book } from '../../books/entities/book.entity.js';
import { Reader } from '../../readers/entities/reader.entity.js';

@Entity('borrowed_records')
export class BorrowedRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.borrowedRecords, { eager: true })
  @JoinColumn({ name: 'bookId' })
  book: Relation<Book>;

  @Column()
  bookId: number;

  @ManyToOne(() => Reader, (reader) => reader.borrowedRecords, { eager: true })
  @JoinColumn({ name: 'readerId' })
  reader: Relation<Reader>;

  @Column()
  readerId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  borrowDate: Date;

  @Column({ type: 'datetime' })
  dueDate: Date;
}
