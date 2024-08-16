import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { calculateMenu } from '../menu/calculateMenu';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene('calculate')
export class calculateScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    const calculateMessage = `📊 В нашем калькуляторе Вы можете сделать расчет стоимости товара с 🚚 доставкой до России.\n\n` +
      `‼️ Товары с ≈ НЕ ВЫКУПАЕМ.`;
    await ctx.editMessageText(calculateMessage, calculateMenu);
  }

  @Action('back_to_main')
  async onBackToMain(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}