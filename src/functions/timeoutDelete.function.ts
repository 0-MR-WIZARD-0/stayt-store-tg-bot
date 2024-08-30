import { MyContext } from "src/interfaces/feedback.interface";
import { Message } from "telegraf/typings/core/types/typegram";

export const timeoutLocalMessage  = async (ctx: MyContext, localMessege: Message.TextMessage, time: number, start?: boolean, prev?: boolean) => {

    if (!ctx.session.__scenes.state["ids_local_messages"]) {
        ctx.session.__scenes.state["ids_local_messages"] = [];
    }

    ctx.session.__scenes.state["ids_local_messages"].push( localMessege.message_id);

    setTimeout(async () => {
        const idsLocalMessages = ctx.session?.__scenes?.state?.["ids_local_messages"];
        if (Array.isArray(idsLocalMessages) && idsLocalMessages.length > 0) {
        const deletePromises = idsLocalMessages.map(async (id: number) => {
            try {
                await ctx.deleteMessage(id);
            } catch (error) {
                if (error.message.includes("message to delete not found")) {
                    console.log(`Сообщение с ID ${id} уже было удалено.`);
                } else {
                    console.log('Ошибка при удалении сообщения:', error);
                }
            }
        });
        await Promise.all(deletePromises)
        if (start) {
            await ctx.scene.enter("start")
        }
    }
    }, time)
}