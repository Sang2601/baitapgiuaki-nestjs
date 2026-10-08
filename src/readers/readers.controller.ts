import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReadersService } from './readers.service.js';
import { CreateReaderDto } from './dto/create-reader.dto.js';

@Controller('readers')
export class ReadersController {
  constructor(private readonly readersService: ReadersService) {}

  @Post()
  async create(@Body() createReaderDto: CreateReaderDto) {
    return await this.readersService.create(createReaderDto);
  }

  @Get()
  async findAll() {
    return await this.readersService.findAll();
  }
}
