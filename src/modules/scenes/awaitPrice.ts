import { Scene, Ctx, On, Action, SceneEnter } from 'nestjs-telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { backToMainMenu } from '../menu/backToMainMenu';
import { timeoutLocalMessage } from 'src/functions/timeoutDelete.function';
import { MyContext } from 'src/interfaces/feedback.interface';
import { getTextMessage } from 'src/functions/getMessage.function';

let localMessage: Message.TextMessage

@Scene('awaitPrice')
export class awaitPrice {
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
   localMessage = await ctx.reply("Укажите стоимость товара с Poizon: ")
  }
  
  @On("text")
  async onMessage(@Ctx() ctx: MyContext) {
    let finalPrice: number;
    const category = ctx.session["categories"]
    const message = getTextMessage(ctx)
    const price = parseFloat(message);
    if (isNaN(price) || price <= 0) {
      ctx.deleteMessage()
      localMessage = await ctx.reply('Пожалуйста, введите корректную стоимость товара.');
      timeoutLocalMessage(ctx, localMessage, 2000)
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
              timeoutLocalMessage(ctx, localMessage, 2000)
              await ctx.reply(`Итоговая стоимость для выбранной категории: ${finalPrice} руб.`, backToMainMenu)
            }
  }

  @Action('back')
  async onBackToMain(@Ctx() ctx: MyContext) {
    ctx.deleteMessage()
    await ctx.scene.enter('calculate');
  }

}
