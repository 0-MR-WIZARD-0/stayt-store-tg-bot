import { Module } from '@nestjs/common';
import { TelegrafModule, } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { mainScene } from './modules/scenes/mainScene';
import { AppUpdate } from './app.service';
import { calculateScene } from './modules/scenes/calculateScene';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>("TELEGRAM_BOT_TOKEN"),
        middlewares: [session()]
      }),
    }),
],
providers: [AppUpdate, mainScene, calculateScene]
})


export class AppModule {}
