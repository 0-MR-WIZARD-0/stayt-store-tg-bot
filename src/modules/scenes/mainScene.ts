import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { mainMenu } from '../menu/mainMenu';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene('start')
export class mainScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const startMessage = `😉 Добро пожаловать в бот группы Stayt Store!\n\n` +
      `Наша группа поможет Вам выкупить товары с POIZON:\n` +
      `⛔️ Данный бот поможет вам рассчитать стоимость заказа и доставки до вас! Оплата и отслеживание производится только через менеджера! ⛔️`;

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
    await ctx.scene.enter('calculate');
  }
}