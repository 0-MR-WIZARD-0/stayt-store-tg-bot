import { Scene, Ctx, On, Action, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Message } from 'telegraf/typings/core/types/typegram';
import { backToMainMenu } from '../menu/backToMainMenu';

@Scene('awaitPrice')
export class awaitPrice {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
   const message = await ctx.reply("Укажите стоимость товара с Poizon: ")
    ctx.session.__scenes.state["messageId"] = message.message_id;
  }
  
  @On("text")
  async onMessage(@Ctx() ctx: SceneContext) {
    let finalPrice: number;
    const category = ctx.session["categories"]
    const message = (ctx.message as Message.TextMessage)?.text
    const price = parseFloat(message);
    if (isNaN(price) || price <= 0) {
      ctx.deleteMessage()
      await ctx.reply('Пожалуйста, введите корректную стоимость товара.');
    } else {
      ctx.session.__scenes.state["price"] = price;
      ctx.deleteMessage()
      
      switch (category) {
        case 'shoes':
          finalPrice = (13*price) + (640*1.6) + 700;
          break;
          case 'hoodies':
            finalPrice = (13*price) + (640*0.8) + 700; 
            // где-то ошибка
            break;
            case 't_shirts':
              finalPrice = (13*price) + (640*0.5) + 700;
              break;
              case 'accessories':
                finalPrice = (13*price) + (640*0.5) + 700;
                break;
              }
              if(ctx.session.__scenes.state["messageId"]) await ctx.deleteMessage(ctx.session.__scenes.state["messageId"])
              await ctx.reply(`Итоговая стоимость для выбранной категории: ${finalPrice} руб.`, backToMainMenu)
            }
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: SceneContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('calculate');
  }

}
