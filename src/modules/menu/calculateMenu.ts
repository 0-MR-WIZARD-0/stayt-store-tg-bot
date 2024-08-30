import { Markup } from "telegraf";

export const calculateMenu = Markup.inlineKeyboard([
        Markup.button.callback('Кроссовки', "shoes" ),
        Markup.button.callback('Футболки/майки', "t_shirts"),
        Markup.button.callback('Толстовки/куртки', "hoodies"),
        Markup.button.callback('Аксессуары', "accessories"),
        Markup.button.callback('🔙 Вернуться назад', 'back')
    ], {
        columns: 2
    }
)




    