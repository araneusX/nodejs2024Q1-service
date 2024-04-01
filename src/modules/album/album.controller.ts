import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto, ViewAlbumDto } from './album.dto';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth';

@Controller('album')
@ApiTags('Album')
@UseGuards(AuthGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllAlbums(): Promise<ViewAlbumDto[]> {
    const albums = await this.albumService.getAll();
    return plainToInstance(ViewAlbumDto, albums, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':albumId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAlbumById(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
  ): Promise<ViewAlbumDto> {
    const album = await this.albumService.getById(albumId);
    return plainToInstance(ViewAlbumDto, album, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) albumData: CreateAlbumDto,
  ): Promise<ViewAlbumDto> {
    const album = await this.albumService.createAlbum(albumData);
    return plainToInstance(ViewAlbumDto, album, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':albumId')
  async updatePassword(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
    @Body(new ValidationPipe()) passwordData: UpdateAlbumDto,
  ): Promise<ViewAlbumDto> {
    const album = await this.albumService.updateAlbum(albumId, passwordData);
    return plainToInstance(ViewAlbumDto, album, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':albumId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
  ): Promise<void> {
    await this.albumService.deleteAlbum(albumId);
  }
}
