import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reader } from './entities/reader.entity.js';
import { CreateReaderDto } from './dto/create-reader.dto.js';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readonly readerRepository: Repository<Reader>,
  ) {}

  async create(createReaderDto: CreateReaderDto): Promise<Reader> {
    const reader = this.readerRepository.create(createReaderDto);
    return await this.readerRepository.save(reader);
  }

  async findAll(): Promise<Reader[]> {
    return await this.readerRepository.find();
  }
}
