import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { faqMessage } from '../messages/messages';

@Scene('FAQ')
export class faqScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.reply(faqMessage);
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}