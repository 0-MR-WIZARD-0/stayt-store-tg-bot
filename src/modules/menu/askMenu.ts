import { Markup } from "telegraf";

export const askMenu = Markup.inlineKeyboard([
        Markup.button.callback('Ответы на популярные вопросы', "FAQ"),
        Markup.button.callback('Задать вопрос', "feedback"),
        Markup.button.callback('🔙 Вернуться назад', 'back')
    ], {
        columns: 1
    }
)




    