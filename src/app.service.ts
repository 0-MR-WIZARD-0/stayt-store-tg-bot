import { Update, Start, Ctx, Help } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class AppUpdate {
  @Start() @Help()
  async onStart(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter('start');
  }
}
