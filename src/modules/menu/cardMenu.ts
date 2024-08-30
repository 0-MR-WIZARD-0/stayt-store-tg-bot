import { feedbackMessage, MyContext } from "src/interfaces/feedback.interface"
import { Markup } from "telegraf"

export const getCardMenu = (ctx: MyContext, messageData: feedbackMessage, messageId: string, flagEdit?: boolean ) => {

    const menuCardButtons = Markup.inlineKeyboard( [
        [
          Markup.button.callback('Назад', 'prev_page'),
          Markup.button.callback('Ответить', `reply_${messageId}`),
          Markup.button.callback('Вперед', 'next_page'),
        ], 
        [
            Markup.button.callback('Вернуться на главный экран', 'back'),
        ]
    ])

    if (flagEdit) return ctx.editMessageText(`Сообщение от @${messageData.userName}: ${messageData.text}`, menuCardButtons)
    
    else return ctx.reply(`Сообщение от @${messageData.userName}: ${messageData.text}`, menuCardButtons)
    
}