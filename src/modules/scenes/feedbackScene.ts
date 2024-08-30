import { Scene, SceneEnter, Ctx, On } from 'nestjs-telegraf';
import { getTextMessage } from 'src/functions/getMessage.function';
import {  timeoutLocalMessage } from 'src/functions/timeoutDelete.function';
import { MyContext } from 'src/interfaces/feedback.interface';
import { Message } from 'telegraf/typings/core/types/typegram';

let localMessage: Message.TextMessage

@Scene('feedback')

export class feedbackScene {

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    localMessage = await ctx.reply('Введите ваш вопрос или сообщение для менеджера:');
  }

  @On('text')
  async onMessage(@Ctx() ctx: MyContext) {
    const userMessage = getTextMessage(ctx).split(' ');
    const userId = ctx.message.from.id;
    const userName = ctx.message.from.username || `${ctx.message.from.first_name} ${ctx.message.from.last_name}`;
    const messageId = Date.now().toString(); 

    if (!ctx.session['feedbackMessages']) {
      ctx.session['feedbackMessages'] = {};
    }

    if("feedbackMessages" in ctx.session){
      ctx.session.feedbackMessages[messageId] = {
      userId,
      userName,
      text: userMessage
      }
    }

    await timeoutLocalMessage(ctx, localMessage, 100)
    ctx.deleteMessage()
    localMessage = await ctx.reply('Ваше сообщение было отправлено менеджеру. Спасибо!');
    await timeoutLocalMessage(ctx, localMessage, 2000, true)
      
  }
}