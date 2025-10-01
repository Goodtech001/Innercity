// import MoreFundraiseCampaignCard from "@/components/more-fundraiser-card";

import MoreFundraisingCampaigns from "../campaign/all/page";


// async function SearchPage({
//   searchParams,
// }: {
//   searchParams: {
//     query: string;
//   };
// }) {
//     const { query } = await searchParams;
//     const products = await searchProductsByName(query);

//     if (!products.length) {
//       return(
//         <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
//           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//             <h1 className="text-3xl font-bold mb-6 text-center">
//               No products found for: {query}
//             </h1>
//             <p className="text-gray-600 text-center">Try searching with different keywords</p>
//           </div>
//         </div>
//     );
//   }

  
//   return (
//     <div className="flex flex-col items-center justify-top min-h-screen bg-grey-100 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Search result for {query}
//         </h1>
//         <MoreFundraiseCampaignCard key={campaign.id} campaign={campaign} />
//       </div>
//     </div>
//   );
// }

// export default SearchPage;



export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <MoreFundraisingCampaigns />
    </main>
  )
}