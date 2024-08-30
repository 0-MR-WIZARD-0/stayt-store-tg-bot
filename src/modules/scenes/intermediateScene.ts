import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { intermediateMessage } from '../messages/messages';
import { intermediateMenu } from '../menu/intermediateMenu';
import { MyContext } from 'src/interfaces/feedback.interface';

@Scene('intermediate')
export class intermediateScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    await ctx.reply(intermediateMessage, intermediateMenu);
  }

  @Action('FAQ')
  async onFAQ(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('FAQ');
  }

  @Action('feedback')
  async onFeedback(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('feedback');
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}