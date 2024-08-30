import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { calculateMenu } from '../menu/calculateMenu';
import { MyContext } from 'src/interfaces/feedback.interface';

@Scene('calculate')
export class calculateScene {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    const calculateMessage = `📊 В нашем калькуляторе Вы можете сделать расчет стоимости товара с 🚚 доставкой до России.\n\n` +
      `‼️ Товары с ≈ НЕ ВЫКУПАЕМ.`;
      if (ctx.message?.message_id) {
        try {
          await ctx.editMessageText(calculateMessage, calculateMenu);
        } catch (error) {
          await ctx.reply(calculateMessage, calculateMenu);
        }
      } else await ctx.reply(calculateMessage, calculateMenu);
  }

  @Action(['hoodies','shoes','t_shirts','accessories'])
  async onCalculateItem(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const callbackData = ctx.callbackQuery.data as string;
      ctx.session["categories"] = callbackData;
    }
    ctx.scene.leave()
    ctx.scene.enter("awaitPrice")
  }
  
  @Action('back_to_calculate')
  async onBackToCalculate(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('calculate');
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('start');
  }
}