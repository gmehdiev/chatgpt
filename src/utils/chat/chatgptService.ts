import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const API_KEY = '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'

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))


export const chatgpt = async (message: ChatCompletionRequestMessage[] ) =>{
  try {
    const answer = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 1,
      
  })
  return answer.data.choices[0].message 
  } catch (error) {
    console.log(error)
  }
  //  await openai.createChatCompletion({
  //       model: "gpt-3.5-turbo",
  //       messages: message,
  //       temperature: 1,
        
  //   }).then(res =>{console.log(res.data.choices[0].message)})
}