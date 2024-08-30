import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { faqMessage } from '../messages/messages';
import { backToMainMenu } from '../menu/backToMainMenu';
import { MyContext } from 'src/interfaces/feedback.interface';

@Scene('FAQ')
export class faqScene {

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    await ctx.reply(faqMessage, backToMainMenu);
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
  
}