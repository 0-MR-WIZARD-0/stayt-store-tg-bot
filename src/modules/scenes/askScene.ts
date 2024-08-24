import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { askMessage } from '../messages/messages';
import { askMenu } from '../menu/askMenu';

@Scene('ask')
export class askScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.reply(askMessage, askMenu);
  }

  @Action('feedback')
  async onFeedback(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('feedback');
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}