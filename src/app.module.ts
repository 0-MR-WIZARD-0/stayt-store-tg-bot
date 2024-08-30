import { Module } from '@nestjs/common';
import { TelegrafModule, } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { mainScene } from './modules/scenes/mainScene';
import { AppUpdate } from './app.service';
import { calculateScene } from './modules/scenes/calculateScene';
import { faqScene } from './modules/scenes/faqScene';
import { awaitPrice } from './modules/scenes/awaitPrice';
import { affiliateScene } from './modules/scenes/affiliateScene';
import { feedbackScene } from './modules/scenes/feedbackScene';
import { intermediateScene } from './modules/scenes/intermediateScene';
import { ManagerRequestsScene } from './modules/scenes/ManagerRequestScene';

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
providers: [AppUpdate, mainScene, calculateScene, faqScene, awaitPrice, affiliateScene, intermediateScene, feedbackScene, ManagerRequestsScene]
})

export class AppModule {}
