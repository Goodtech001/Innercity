// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { generateVoucherCode } from "@/lib/voucher";

// export async function POST(req: Request) {
//   try {
//     const { amount, currency } = await req.json();

//     if (!amount || !currency) {
//       return NextResponse.json(
//         { message: "Invalid payload" },
//         { status: 400 }
//       );
//     }

//     const voucher = await prisma.voucher.create({
//       data: {
//         code: generateVoucherCode(),
//         amount,
//         currency,
//       },
//     });

//     return NextResponse.json(voucher, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to create voucher" },
//       { status: 500 }
//     );
//   }
// }
