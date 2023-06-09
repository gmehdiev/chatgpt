import { message } from "@prisma/client"
import { ChatCompletionRequestMessageRoleEnum } from "openai";
// export type message = {
//   uuid: string
//   role: string
//   content: string
//   createdAt: Date
//   updatedAt: Date
//   chatUuid: string | null
// }
ChatCompletionRequestMessageRoleEnum

export const filterMessage = (payload: message[]) =>{

  const filteredPayload = payload.map(({ role, content, ...other }) => ({
    role: ChatCompletionRequestMessageRoleEnum.User,
   content,
  }));
  return filteredPayload

}
