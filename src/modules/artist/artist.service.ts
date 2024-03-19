import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistService {
  async createArtist({ name, grammy }: CreateArtistDto): Promise<ArtistEntity> {
    const artist = new ArtistEntity();
    artist.name = name;
    artist.grammy = grammy;

    return artist.save();
  }

  getAll() {
    return ArtistEntity.find();
  }

  async getById(artistId: string): Promise<ArtistEntity> {
    const artist = await ArtistEntity.findOneBy({
      id: artistId,
    });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${artistId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async updateArtist(
    artistId: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await ArtistEntity.findOneBy({
      id: artistId,
    });

    if (!artist) {
      throw new HttpException(
        `Artist with id ${artistId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    return artist.save();
  }

  async deleteArtist(artistId: string): Promise<void> {
    const { affected } = await ArtistEntity.delete({
      id: artistId,
    });

    if (!affected) {
      throw new HttpException(
        `Artist with id ${artistId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
