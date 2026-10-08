import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from 'typeorm';
import { BorrowedRecord } from '../../borrowed-records/entities/borrowed-record.entity.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @OneToMany(() => BorrowedRecord, (record) => record.book)
  borrowedRecords: Relation<BorrowedRecord>[];
}
