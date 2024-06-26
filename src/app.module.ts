import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { DbModule } from './modules/db/db.module';
import { EnvService } from './utils';
import { AppController } from './app.controller';
import { LoggerMiddleware, LoggerModule } from './modules/logger';
import { AllExceptionsFilter } from './exception.filter';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  providers: [
    EnvService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
