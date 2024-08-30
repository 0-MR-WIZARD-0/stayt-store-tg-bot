import { MyContext } from 'src/interfaces/feedback.interface';
import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { getTextMessage } from 'src/functions/getMessage.function';
import { Message } from 'telegraf/typings/core/types/typegram';
import { getCardMenu } from '../menu/cardMenu';
import { timeoutLocalMessage } from 'src/functions/timeoutDelete.function';

let localMessage: Message.TextMessage

@Scene('managerRequests')
export class ManagerRequestsScene {
  
  private itemsPerPage = 1;
  
  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {

    const feedbackMessages = ctx.session.feedbackMessages;

    if (!feedbackMessages || Object.keys(feedbackMessages).length === 0) {
      localMessage = await ctx.reply('Нет новых заявок.');
      timeoutLocalMessage(ctx, localMessage, 2000, true)
      return;
    }

    ctx.session.currentPage = ctx.session.currentPage || 1;
    this.displayCurrentPage(ctx);

  }

  private async displayCurrentPage(ctx: MyContext) {

    const feedbackMessages = ctx.session.feedbackMessages;
    const keys = Object.keys(feedbackMessages);
    const page = ctx.session.currentPage || 1;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, keys.length);

    if (startIndex >= keys.length) {
      if(page === 1) return
      
      ctx.session.currentPage = Math.max(1, page - 1);
      return this.displayCurrentPage(ctx);
    }

    if(startIndex<endIndex){
      for (let i = startIndex; i < endIndex; i++) {
        const messageId = keys[i];
        const messageData = feedbackMessages[messageId];
        if (messageData){
          try {
            await getCardMenu(ctx, messageData, messageId, true)
          } catch (error) {
            getCardMenu(ctx, messageData, messageId)
          }
        } else getCardMenu(ctx, messageData, messageId)
      }
    }
  }
    
  @Action('prev_page')
  async onPrevPage(ctx: MyContext) {
    ctx.session.currentPage = Math.max(1, (ctx.session.currentPage || 1) - 1);
    await this.displayCurrentPage(ctx);
  }
    
  @Action('next_page')
  async onNextPage(ctx: MyContext) {
    const feedbackMessages = ctx.session.feedbackMessages;
    const totalPages = Math.ceil(Object.keys(feedbackMessages).length / this.itemsPerPage);
    ctx.session.currentPage = Math.min(totalPages, (ctx.session.currentPage || 1) + 1);
    await this.displayCurrentPage(ctx);
  }

  @Action('back')
  async onGoMainMenu(ctx: MyContext) {
    ctx.deleteMessage()
    ctx.session.currentPage = 1;
    ctx.scene.leave();
    await ctx.scene.enter('start');
  }

  @Action(/^reply_(\d+)$/)
  async onReply(ctx: MyContext) {

    
    const messageId = ctx.match[1];
    const feedbackMessage = ctx.session.feedbackMessages[messageId];
    
    if (feedbackMessage) {
          ctx.deleteMessage()
          localMessage = await ctx.reply(`Введите ответ для @${feedbackMessage.userName}:`);
          ctx.session['replyTo'] = messageId;
          timeoutLocalMessage(ctx, localMessage, 2000)
        } else {
          await ctx.reply('Сообщение не найдено.');
        }
      }
      
      
    @On('text')
    async onText(ctx: MyContext) {

    const replyTo = ctx.session['replyTo'];

    if (replyTo && ctx.session.feedbackMessages[replyTo]) {
      const feedbackMessage = ctx.session.feedbackMessages[replyTo];
      const replyText = getTextMessage(ctx);

      ctx.deleteMessage()

      if (replyText) {
        await ctx.telegram.sendMessage(
          feedbackMessage.userId,
          `Ответ от менеджера: ${replyText}`,
        );

        delete ctx.session.feedbackMessages[replyTo];
        delete ctx.session['replyTo'];

        await this.displayCurrentPage(ctx);
        ctx.scene.leave()
        ctx.scene.enter("start")
      }
    } else {
      await ctx.reply('Сообщение для ответа не найдено.');
      ctx.scene.enter("start")
    }
  }
}