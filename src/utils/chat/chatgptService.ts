import { Configuration, OpenAIApi } from "openai"

const API_KEY = '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'

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY
}))
export const chatgpt = async () =>{
   await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Где тут ошибка console.log{res.data.choices[0].message}"}, {
            role: 'assistant',
            content: 'Ошибка находится в скобках после "console.log". Нужно использовать круглые скобки, а не фигурные. Правильный код: console.log(res.data.choices[0].message)'
          },{role: "user", content: "Повтори"},{
            role: 'assistant',
            content: 'Конечно, повторю. Ошибка находится в скобках после "console.log". Нужно использовать круглые скобки, а не фигурные скобки. Правильный код: console.log(res.data.choices[0].message)'
          }],
        temperature: 1,
        
    }).then(res =>{console.log(res.data.choices[0].message)})
}