import { Scene, SceneEnter, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Scene('feedback')
export class feedbackScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.reply("Задайте свой вопрос:");
  }

}