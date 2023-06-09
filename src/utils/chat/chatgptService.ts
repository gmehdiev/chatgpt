import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

const API_KEY = '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'

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))


export const chatgpt = async (message: ChatCompletionRequestMessage[] ) =>{
  try {
    console.log(message)
    const answer = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.1,
      
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