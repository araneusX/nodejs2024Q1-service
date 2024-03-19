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
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto, ViewArtistDto } from './artist.dto';
import { plainToInstance } from 'class-transformer';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllArtists(): Promise<ViewArtistDto[]> {
    const artists = await this.artistService.getAll();
    return plainToInstance(ViewArtistDto, artists, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':artistId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getArtistById(
    @Param('artistId', new ParseUUIDPipe()) artistId: string,
  ): Promise<ViewArtistDto> {
    const artist = await this.artistService.getById(artistId);
    return plainToInstance(ViewArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) artistData: CreateArtistDto,
  ): Promise<ViewArtistDto> {
    const artist = await this.artistService.createArtist(artistData);
    return plainToInstance(ViewArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':artistId')
  async updatePassword(
    @Param('artistId', new ParseUUIDPipe()) artistId: string,
    @Body(new ValidationPipe()) passwordData: UpdateArtistDto,
  ): Promise<ViewArtistDto> {
    const artist = await this.artistService.updateArtist(
      artistId,
      passwordData,
    );
    return plainToInstance(ViewArtistDto, artist, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':artistId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('artistId', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    await this.artistService.deleteArtist(artistId);
  }
}
