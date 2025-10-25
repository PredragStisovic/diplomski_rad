import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { FilterDto } from 'src/dto/filter.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RoleEnum } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Worker)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createRecordDto: CreateRecordDto,
    @UploadedFiles() allFiles?: Express.Multer.File[],
  ) {
    return await this.recordService.create(createRecordDto, allFiles);
  }

  @Get()
  findAll() {
    return this.recordService.findAll();
  }

  @Post('filter')
  filterAll(@Body() filter: FilterDto) {
    return this.recordService.filterAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Worker)
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
    @UploadedFiles() allFiles?: Express.Multer.File[],
  ) {
    return this.recordService.update(+id, updateRecordDto, allFiles);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(+id);
  }
}
