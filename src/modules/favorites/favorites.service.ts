import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesEntity } from './favorites.entity';
import { AlbumEntity } from '../album';
import { ArtistEntity } from '../artist';
import { TrackEntity } from '../track';
import { FindOptionsRelations } from 'typeorm';

@Injectable()
export class FavoritesService {
  async getFavorites(
    relations: FindOptionsRelations<FavoritesEntity> = {
      albums: true,
      artists: true,
      tracks: true,
    },
  ) {
    const [favorites] = await FavoritesEntity.find({
      relations,
    });

    if (!favorites) {
      const favorites = FavoritesEntity.create({
        albums: [],
        artists: [],
        tracks: [],
      });

      return favorites;
    }

    return favorites;
  }

  getAll() {
    return this.getFavorites();
  }

  async addTrack(trackId: string) {
    const track = await TrackEntity.findOneBy({ id: trackId });

    if (!track) {
      throw new HttpException(
        `Track with id ${trackId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ tracks: true });

    favorites.tracks = [...favorites.tracks, track];

    return favorites.save();
  }

  async deleteTrack(trackId: string) {
    const track = await TrackEntity.findOneBy({ id: trackId });

    if (!track) {
      throw new HttpException(
        `Track with id ${trackId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ tracks: true });

    const countBeforeUpdate = favorites.tracks.length;

    favorites.tracks = favorites.tracks.filter(({ id }) => id !== track.id);

    if (countBeforeUpdate === favorites.tracks.length) {
      throw new HttpException(
        `Track with id ${trackId} is not in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return favorites.save();
  }

  async addAlbum(albumId: string) {
    const album = await AlbumEntity.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        `Album with id ${albumId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ albums: true });

    favorites.albums = [...favorites.albums, album];

    return favorites.save();
  }

  async deleteAlbum(albumId: string) {
    const album = await AlbumEntity.findOneBy({ id: albumId });

    if (!album) {
      throw new HttpException(
        `Album with id ${albumId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ albums: true });

    const countBeforeUpdate = favorites.albums.length;
    favorites.albums = favorites.albums.filter(({ id }) => id !== album.id);

    if (countBeforeUpdate === favorites.albums.length) {
      throw new HttpException(
        `Album with id ${albumId} is not in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return favorites.save();
  }

  async addArtist(artistId: string) {
    const artist = await ArtistEntity.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        `Album with id ${artistId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ artists: true });

    favorites.artists = [...favorites.artists, artist];

    return favorites.save();
  }

  async deleteArtist(artistId: string) {
    const artist = await ArtistEntity.findOneBy({ id: artistId });

    if (!artist) {
      throw new HttpException(
        `Album with id ${artistId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavorites({ artists: true });

    const countBeforeUpdate = favorites.artists.length;

    favorites.artists = favorites.artists.filter(({ id }) => id !== artist.id);

    if (countBeforeUpdate === favorites.artists.length) {
      throw new HttpException(
        `Album with id ${artistId} is not in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return favorites.save();
  }
}
