import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { affiliateMessage } from '../messages/messages';

@Scene('affiliate')
export class affiliateScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.reply(affiliateMessage);
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}