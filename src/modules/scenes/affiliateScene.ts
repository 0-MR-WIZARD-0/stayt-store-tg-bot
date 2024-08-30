import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { affiliateMessage } from '../messages/messages';
import { backToMainMenu } from '../menu/backToMainMenu';
import { MyContext } from 'src/interfaces/feedback.interface';

@Scene('affiliate')
export class affiliateScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    await ctx.reply(affiliateMessage, backToMainMenu);
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}