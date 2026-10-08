import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from 'typeorm';
import { BorrowedRecord } from '../../borrowed-records/entities/borrowed-record.entity.js';

@Entity('readers')
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => BorrowedRecord, (record) => record.reader)
  borrowedRecords: Relation<BorrowedRecord>[];
}
