import { Markup } from "telegraf";

export const mainMenu = Markup.inlineKeyboard([
        Markup.button.callback('💰 Калькулятор стоимости', "calculate" ),
        Markup.button.url('📰 Отзывы о нашей работе', "https://t.me/FeedBackStayt"),
        Markup.button.callback('📬 Ответы на популярные вопросы', "FAQ"),
        Markup.button.url('🔎 Отследить посылку', "https://t.me/manager_stayt"),
        Markup.button.callback('📞 Задать вопрос', "ask"),
        Markup.button.url('📲 Скачать POIZON IOS', 
            "https://apps.apple.com/ru/app/&#24471;&%2329289;-&%2326377;&%2327602;&%2330340;&%2336816;&%2321160;-&%2328526;&%2327969;-&%2322909;&%2329289;/id1012871328"
        ),
        Markup.button.url('📲 Скачать POIZON Android', "https://m.anxinapk.com/rj/12201303.html"),
        Markup.button.callback('🌍 Партнерская программа', "affiliate"),
    ], {
        columns: 1
    }
    )
