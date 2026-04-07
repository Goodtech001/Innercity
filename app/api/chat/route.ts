import { getCampaignStats } from "@/components/stat"
import OpenAI from "openai"
// import { getCampaignStats } from "@/utils/aiTools"

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req:Request){

  const {message,token} = await req.json()

  if(message.includes("stats")){
    const stats = await getCampaignStats(token)
    return Response.json(stats)
  }

  const ai = await openai.chat.completions.create({
    model:"gpt-4.1-mini",
    messages:[
      {
        role:"system",
        content:"You are a helpful fundraising assistant."
      },
      {
        role:"user",
        content:message
      }
    ]
  })

  return Response.json({
    reply: ai.choices[0].message.content
  })

}