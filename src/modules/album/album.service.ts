import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { ArtistEntity } from '../artist';

@Injectable()
export class AlbumService {
  async createAlbum({
    name,
    year,
    artistId,
  }: CreateAlbumDto): Promise<AlbumEntity> {
    let artist: ArtistEntity;

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

    const album = new AlbumEntity();
    album.name = name;
    album.year = year;
    album.artist = artist;

    return album.save();
  }

  getAll() {
    return AlbumEntity.find();
  }

  async getById(albumId: string): Promise<AlbumEntity> {
    const album = await AlbumEntity.findOneBy({
      id: albumId,
    });

    if (!album) {
      throw new HttpException(
        `Album with id ${albumId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async updateAlbum(
    albumId: string,
    { name, artistId, year }: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    let artist: ArtistEntity;

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

    const album = await AlbumEntity.findOneBy({
      id: albumId,
    });

    if (!album) {
      throw new HttpException(
        `Album with id ${albumId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    album.name = name ?? album.name;
    album.year = year ?? album.year;
    album.artist = artist ?? album.artist;

    return album.save();
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const { affected } = await AlbumEntity.delete({
      id: albumId,
    });

    if (!affected) {
      throw new HttpException(
        `Album with id ${albumId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
