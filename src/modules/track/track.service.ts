import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album';
import { ArtistEntity } from '../artist';

@Injectable()
export class TrackService {
  async createTrack({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<TrackEntity> {
    let album: AlbumEntity;
    let artist: ArtistEntity;

    if (albumId) {
      album = await AlbumEntity.findOneBy({
        id: albumId,
      });

      if (!album) {
        throw new HttpException(
          `Album with id ${albumId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (artistId) {
      artist = await ArtistEntity.findOneBy({
        id: artistId,
      });

      if (!artist) {
        throw new HttpException(
          `Artist with id ${artistId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const track = new TrackEntity();
    track.name = name;
    track.duration = duration;
    track.album = album;
    track.artist = artist;

    return track.save();
  }

  getAll() {
    return TrackEntity.find();
  }

  async getById(trackId: string): Promise<TrackEntity> {
    const track = await TrackEntity.findOneBy({
      id: trackId,
    });

    if (!track) {
      throw new HttpException(
        `Track with id ${trackId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async updateTrack(
    trackId: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<TrackEntity> {
    let album: AlbumEntity;
    let artist: ArtistEntity;

    if (albumId) {
      album = await AlbumEntity.findOneBy({
        id: albumId,
      });

      if (!album) {
        throw new HttpException(
          `Album with id ${albumId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (artistId) {
      artist = await ArtistEntity.findOneBy({
        id: artistId,
      });

      if (!artist) {
        throw new HttpException(
          `Artist with id ${artistId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const track = await TrackEntity.findOneBy({
      id: trackId,
    });

    if (!track) {
      throw new HttpException(
        `Track with id ${trackId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    track.name = name ?? track.name;
    track.duration = duration;
    track.album = album ?? track.album;
    track.artist = artist ?? track.artist;

    return track.save();
  }

  async deleteTrack(trackId: string): Promise<void> {
    const { affected } = await TrackEntity.delete({
      id: trackId,
    });

    if (!affected) {
      throw new HttpException(
        `Track with id ${trackId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
