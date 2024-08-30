import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { startMessage } from '../messages/messages';
import { MyContext } from 'src/interfaces/feedback.interface';
import { getMainMenu } from '../menu/mainMenu';

@Scene('start')
export class mainScene {

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    if (ctx.message?.message_id) {
      try {
        await ctx.editMessageText(startMessage, getMainMenu(ctx));
      } catch (error) {
        ctx.reply(startMessage, getMainMenu(ctx));
      }
    } else {
      ctx.reply(startMessage, getMainMenu(ctx));
    }
  }

  @Action('managerRequests')
  async onManagerRequests(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    ctx.scene.leave()
    await ctx.scene.enter('managerRequests');
  }

  @Action('calculate')
  async onCalculate(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('calculate');
  }

  @Action('FAQ')
  async onFAQ(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('FAQ');
  }

  @Action('intermediate')
  async onAsk(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('intermediate');
  }

  @Action('affiliate')
  async onAffiliate(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('affiliate');
  }

}