/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { baseUrl } from '@/constants'

const SERVER_BASEURL = process.env.NEXT_PUBLIC_API_URL

export type Currency = {
  id: number
  title: string
  symbol_left: string
  symbol_right: string
  code: string
  decimal_place: number
  value: number
  decimal_point: string
  thousand_point: string
  status: number
}

const currencyFlags: Record<string, string> = {
  USD: 'emojione-v1:flag-for-united-states',
  NGN: 'emojione-v1:flag-for-nigeria',
  ZAR: 'emojione-v1:flag-for-south-africa',
  GBP: 'emojione-v1:flag-for-united-kingdom',
  EUR: 'emojione-v1:flag-for-european-union',
  CNY: 'emojione-v1:flag-for-china',
  CAD: 'emojione-v1:flag-for-canada',
  DKK: 'emojione-v1:flag-for-denmark',
}

type Props = {
  onChange?: (currency: Currency) => void
}

export default function CurrencyDropdown({ onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [selected, setSelected] = useState<Currency | null>(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(`${baseUrl}/currencies`)
        const data = await res.json()

        const active = (data?.data || data).filter((c: Currency) => c.status === 1)

        setCurrencies(active)

        const saved = localStorage.getItem('currency')

        const defaultCurrency = active.find((c: Currency) => c.code === saved) || active[0]

        setSelected(defaultCurrency)
        onChange?.(defaultCurrency)
      } catch (err) {
        console.error('Currency fetch failed', err)
      }
    }

    fetchCurrencies()
  }, [])

  const handleSelect = (currency: Currency) => {
  setSelected(currency)
  localStorage.setItem('currency', JSON.stringify(currency)) // store FULL object
  window.dispatchEvent(new Event('currencyChange')) // 🔥 notify entire app
  setOpen(false)
  onChange?.(currency)
}

  return (
    <div className="relative w-fit">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm"
      >
        <span>{selected?.code}</span>

        {selected && (
          <Icon
            icon={currencyFlags[selected.code] || 'emojione-v1:flag-for-united-states'}
            className="text-xl"
          />
        )}

        <Icon icon="mynaui:chevron-down-solid" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-52 overflow-y-auto rounded-md border bg-white shadow-lg">
          {currencies.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <Icon icon={currencyFlags[c.code] || 'emojione-v1:flag-for-united-states'} />
                <span>{c.code}</span>
              </div>

              <span className="text-gray-500">{c.symbol_left}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable @next/next/no-img-element */
// import { Icon } from '@iconify/react'
// import { useEffect, useState } from 'react'
// import espee from '@/public/assets/images/espees.png'
// import Image from 'next/image'

// const countryCurrencyList: TCountryCurrency[] = [
//   {
//     abv: 'USD',
//     country: 'USA',
//     currency: 'US Dollars',
//     symbol: '$',
//     icon: <Icon icon={'emojione-v1:flag-for-united-states'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'NGN',
//     country: 'Nigeria',
//     currency: 'Naira',
//     symbol: '₦',
//     icon: <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'ZAR',
//     country: 'South Africa',
//     currency: 'Rand',
//     symbol: 'R',
//     icon: <Icon icon={'emojione-v1:flag-for-south-africa'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'GBP',
//     country: 'Britain',
//     currency: 'British Pounds',
//     symbol: '£',
//     icon: <Icon icon={'emojione-v1:flag-for-united-kingdom'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'CNY',
//     country: 'China',
//     currency: 'Yuan',
//     symbol: '¥',
//     icon: <Icon icon={'emojione-v1:flag-for-china'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'CAD',
//     country: 'Canada',
//     currency: 'Canadian Dollars',
//     symbol: 'C$',
//     icon: <Icon icon={'emojione-v1:flag-for-canada'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'EUR',
//     country: 'European Union',
//     currency: 'Euro',
//     symbol: '€',
//     icon: <Icon icon={'emojione-v1:flag-for-united-kingdom'} className="h-6 w-6 text-2xl" />,
//   },
//   {
//     abv: 'ESP',
//     country: 'Espee',
//     currency: 'Espee',
//     symbol: '£',
//     icon: <Image src={espee} className="h-6 w-6 text-2xl" alt={''} />,
//   },
// ]

// // Type for currency
// export type TCountryCurrency = {
//   abv: string
//   country: string
//   currency: string
//   symbol: string
//   icon: React.JSX.Element
// }
// export type TApiCurrency = {
//   id: number
//   title: string
//   symbol_left: string
//   symbol_right: string
//   code: string
//   decimal_place: number
//   value: number
//   decimal_point: string
//   thousand_point: string
//   status: number
// }
// const currencyFlags: Record<string, string> = {
//   USD: 'emojione-v1:flag-for-united-states',
//   NGN: 'emojione-v1:flag-for-nigeria',
//   ZAR: 'emojione-v1:flag-for-south-africa',
//   GBP: 'emojione-v1:flag-for-united-kingdom',
//   EUR: 'emojione-v1:flag-for-european-union',
//   CNY: 'emojione-v1:flag-for-china',
//   CAD: 'emojione-v1:flag-for-canada',
//   DKK: 'emojione-v1:flag-for-denmark',
// }

// // Props for dropdown
// type TCountryCurrencyDropdownProps = {
//   onChange?: (value: TCountryCurrency) => void
//   className?: string
// }

// // Map lat/lon → currency (simple bounding boxes)
// const latLonToCurrency = (lat: number, lon: number) => {
//   if (lat >= 4 && lat <= 14 && lon >= 2 && lon <= 15) return 'NGN' // Nigeria
//   if (lat >= -35 && lat <= -22 && lon >= 16 && lon <= 33) return 'ZAR' // South Africa
//   if (lat >= 50 && lat <= 60 && lon >= -10 && lon <= 2) return 'GBP' // UK
//   if (lat >= 20 && lat <= 50 && lon >= -130 && lon <= -60) return 'USD' // USA
//   if (lat >= 20 && lat <= 50 && lon >= 100 && lon <= 125) return 'CNY' // China
//   return 'USD' // default fallback
// }

// export default function CountryCurrencyDropdown({
//   onChange,
//   className,
// }: Readonly<TCountryCurrencyDropdownProps>) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedValue, setSelectedValue] = useState<TCountryCurrency>(countryCurrencyList[0])

//   useEffect(() => {
//     const saved = localStorage.getItem('currency')
//     if (saved) {
//       const found = countryCurrencyList.find((c) => c.abv === saved)
//       if (found) {
//         setSelectedValue(found)
//         return
//       }
//     }

//     // Try Intl API timezone
//     try {
//       const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
//       let code = 'USD' // fallback

//       if (tz.startsWith('Africa/Lagos')) code = 'NGN'
//       else if (tz.startsWith('Africa/Johannesburg')) code = 'ZAR'
//       else if (tz.startsWith('Europe/London')) code = 'GBP'
//       else if (tz.startsWith('Asia/Shanghai')) code = 'CNY'

//       const match = countryCurrencyList.find((c) => c.abv === code)
//       if (match) {
//         setSelectedValue(match)
//         localStorage.setItem('currency', match.abv)
//         onChange?.(match)
//         return
//       }
//     } catch {}

//     // Fallback to NGN if primary audience is Nigeria
//     const fallback = countryCurrencyList.find((c) => c.abv === 'NGN')
//     if (fallback) {
//       setSelectedValue(fallback)
//       localStorage.setItem('currency', fallback.abv)
//       onChange?.(fallback)
//     }
//   }, [])
//   return (
//     <div className={`relative flex h-fit w-fit min-w-20 flex-col ${className}`}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-1.5 text-center text-sm font-medium focus:outline-none focus:ring-2"
//       >
//         <p>{selectedValue ? selectedValue.abv : '...'}</p>
//         {selectedValue ? (
//           selectedValue.icon
//         ) : (
//           <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />
//         )}
//         <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />
//       </button>

//       <div
//         className={`absolute -bottom-48 z-20 w-48 divide-y rounded shadow-sm ${
//           isOpen ? 'block' : 'hidden'
//         }`}
//       >
//         <ul className="h-48 overflow-y-auto rounded-md border-2 bg-white p-2 py-1 pb-10 text-sm ring-2">
//           {countryCurrencyList
//             .filter((e) => e.abv !== selectedValue.abv)
//             .map((country) => (
//               <li
//                 onClick={() => {
//                   setSelectedValue(country)
//                   onChange?.(country)
//                   localStorage.setItem('currency', country.abv)
//                   setIsOpen(false)
//                 }}
//                 key={country.abv}
//               >
//                 <button className="inline-flex w-full rounded px-4 py-2 text-sm hover:bg-ghost-white">
//                   <div className="inline-flex items-center gap-2">
//                     {country.icon}
//                     <p>{country.abv}</p>
//                   </div>
//                 </button>
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   )
// }
