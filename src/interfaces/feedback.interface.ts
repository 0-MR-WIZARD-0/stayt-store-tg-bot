import { Scenes } from "telegraf";

export interface feedbackMessage {
    userId: number,
    userName: string,
    text: string[]
}

interface FeedbackMessages {
    [messageId: string]: feedbackMessage;
}

interface MySessionData {
    feedbackMessages: FeedbackMessages;
    replyTo?:string;
    currentPage?:number;

}
  
interface MySceneSessionData extends Scenes.SceneSessionData {
    feedbackMessages?: FeedbackMessages;
}
  
export interface MyContext extends Scenes.SceneContext<MySceneSessionData> {
    match: any;
    session: MySessionData & Scenes.SceneSession<MySceneSessionData>;
}