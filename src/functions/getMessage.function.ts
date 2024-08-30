import { MyContext } from 'src/interfaces/feedback.interface';

export function getTextMessage(ctx: MyContext): string | undefined {
    if ('message' in ctx && ctx.message && 'text' in ctx.message) {
      return ctx.message.text;
    }
    return undefined;
}