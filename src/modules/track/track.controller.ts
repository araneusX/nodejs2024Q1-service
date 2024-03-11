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
import { CreateTrackDto, UpdateTrackDto, ViewTrackDto } from './track.dto';
import { TrackService } from './track.service';
import { plainToInstance } from 'class-transformer';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllTracks(): Promise<ViewTrackDto[]> {
    const tracks = await this.trackService.getAll();
    return plainToInstance(ViewTrackDto, tracks, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':trackId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getTrackById(
    @Param('trackId', new ParseUUIDPipe()) trackId: string,
  ): Promise<ViewTrackDto> {
    const track = await this.trackService.getById(trackId);
    return plainToInstance(ViewTrackDto, track, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) trackData: CreateTrackDto,
  ): Promise<ViewTrackDto> {
    const track = await this.trackService.createTrack(trackData);
    return plainToInstance(ViewTrackDto, track, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':trackId')
  async updatePassword(
    @Param('trackId', new ParseUUIDPipe()) trackId: string,
    @Body(new ValidationPipe()) passwordData: UpdateTrackDto,
  ): Promise<ViewTrackDto> {
    const track = await this.trackService.updateTrack(trackId, passwordData);
    return plainToInstance(ViewTrackDto, track, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':trackId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('trackId', new ParseUUIDPipe()) trackId: string) {
    this.trackService.deleteTrack(trackId);
  }
}
