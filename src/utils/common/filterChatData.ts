import { message } from "@prisma/client"
// export type message = {
//   uuid: string
//   role: string
//   content: string
//   createdAt: Date
//   updatedAt: Date
//   chatUuid: string | null
// }


export const filterMessage = (payload: message[]) =>{

  const filteredPayload = payload.map(({ role, content, ...other }) => ({
     role,
   content,
  }));
console.log(filteredPayload)
  return filteredPayload

}
