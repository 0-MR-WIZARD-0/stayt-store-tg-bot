import { Markup } from "telegraf";

export const backToMainMenu = Markup.inlineKeyboard([
        Markup.button.callback('🔙 Вернуться назад', 'back')
    ], {
        columns: 1
    }
)