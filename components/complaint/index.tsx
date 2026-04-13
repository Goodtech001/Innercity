/* eslint-disable @typescript-eslint/no-explicit-any */
import emailjs from "@emailjs/browser"

export async function sendComplaint(message:string,user:any){

  await emailjs.send(
    "service_id",
    "template_id",
    {
      name:user?.fullname,
      email:user?.email,
      message
    },
    "public_key"
  )

  return { success:true }
}