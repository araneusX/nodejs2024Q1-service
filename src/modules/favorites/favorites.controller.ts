import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { plainToInstance } from 'class-transformer';
import { ViewFavoritesDto } from './favorites.dto';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllFavorites(): Promise<ViewFavoritesDto> {
    const favorites = await this.favoritesService.getAll();
    return plainToInstance(ViewFavoritesDto, favorites, {
      excludeExtraneousValues: true,
    });
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ViewFavoritesDto> {
    const favorites = await this.favoritesService.addTrack(id);
    return plainToInstance(ViewFavoritesDto, favorites, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ViewFavoritesDto> {
    const favorites = await this.favoritesService.addAlbum(id);
    return plainToInstance(ViewFavoritesDto, favorites, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ViewFavoritesDto> {
    const favorites = await this.favoritesService.addArtist(id);
    return plainToInstance(ViewFavoritesDto, favorites, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteArtist(id);
  }
}
