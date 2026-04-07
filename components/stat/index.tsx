import { baseUrl } from "@/constants"

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getCampaignStats(token: string) {

  const campaignsRes = await fetch(`${baseUrl}/campaigns`)
  const campaigns = await campaignsRes.json()

  const paymentsRes = await fetch(`${baseUrl}/payments/admin/all`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

  const payments = await paymentsRes.json()

  const campaignsData = campaigns?.data || campaigns || []

  const paymentsData =
    payments?.data?.data ||
    payments?.data ||
    payments ||
    []

  const totalRaised = paymentsData
    .filter((p:any)=>p.status === "success")
    .reduce((sum:number,p:any)=>sum + Number(p.amount || 0),0)

  return {
    totalCampaigns: campaignsData.length,
    totalRaised
  }
}