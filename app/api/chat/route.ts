import { getCampaignStats } from "@/components/stat"
import OpenAI from "openai"
// import { getCampaignStats } from "@/utils/aiTools"

const openai = new OpenAI({
  apiKey: "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"
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