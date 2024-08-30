import { Update, Start, Ctx, Help, On } from 'nestjs-telegraf';
import { timeoutLocalMessage } from './functions/timeoutDelete.function';
import { MyContext } from './interfaces/feedback.interface';
import { Message } from 'telegraf/typings/core/types/typegram';

let localMessege: Message.TextMessage

@Update()
export class AppUpdate {

  @Start() 
  async onStart(@Ctx() ctx: MyContext) {
    await ctx.scene.enter('start');
    ctx.deleteMessage()
  }

  @Help()
  async onFAQ(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('FAQ');
  }
  
  @On('text')
  async handleText(@Ctx() ctx: MyContext) {
    const currentScene = ctx.scene.current?.id;
    if (currentScene !== 'awaitPrice' && currentScene !== 'feedback') {
      ctx.deleteMessage()
      localMessege = await ctx.reply('Я ещё не знаю как ответить на эту команду 👾');
      timeoutLocalMessage(ctx, localMessege, 2000)
    }
  }
  
}
