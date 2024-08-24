import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { mainMenu } from '../menu/mainMenu';
import { SceneContext } from 'telegraf/typings/scenes';
import { startMessage } from '../messages/messages';

@Scene('start')
export class mainScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
      if (ctx.message?.message_id) {
        try {
          await ctx.editMessageText(startMessage, mainMenu);
        } catch (error) {
          await ctx.reply(startMessage, mainMenu);
        }
      } else await ctx.reply(startMessage, mainMenu);
  }

  @Action('calculate')
  async onCalculate(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('calculate');
  }

  @Action('FAQ')
  async onFAQ(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter('FAQ');
  }

  @Action('ask')
  async onAsk(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter('ask');
  }

  @Action('affiliate')
  async onAffiliate(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter('affiliate');
  }
}