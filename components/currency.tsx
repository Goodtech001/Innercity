import { Icon } from '@iconify/react'
import { useState } from 'react'

const countryCurrencyList: TCountryCurrency[] = [
  {
    abv: 'NGN',
    country: 'Nigeria',
    currency: 'Naira',
    symbol: '₦',
    icon: <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />,
  },
  {
    abv: 'USD',
    country: 'USA',
    currency: 'US Dollars',
    symbol: '$',
    icon: <Icon icon={'emojione-v1:flag-for-united-states'} className="h-6 w-6 text-2xl" />,
  },
  {
    abv: 'RND',
    country: 'South Afrcia',
    currency: 'Rand',
    symbol: 'R',
    icon: <Icon icon={'emojione-v1:flag-for-south-africa'} className="h-6 w-6 text-2xl" />,
  },
  {
    abv: 'YEN',
    country: 'China',
    currency: 'Yen',
    symbol: '¥',
    icon: <Icon icon={'emojione-v1:flag-for-china'} className="h-6 w-6 text-2xl" />,
  },
  {
    abv: 'CAD',
    country: 'Canada',
    currency: 'Canadian Dollars',
    symbol: 'C$',
    icon: <Icon icon={'emojione-v1:flag-for-canada'} className="h-6 w-6 text-2xl" />,
  },
  {
    abv: 'GBP',
    country: 'Britain',
    currency: 'British Pounds',
    symbol: '£',
    icon: <Icon icon={'emojione-v1:flag-for-united-kingdom'} className="h-6 w-6 text-2xl" />,
  },
]

type TCountryCurrency = {
  abv: string
  country: string
  currency: string
  symbol: string
  icon: React.JSX.Element
}

type TCustomCountryDropdownSelectProps = {
  onChange?: (value: TCountryCurrency) => void
  className?: string
}

export default function CustomCountryDropdownSelect({
  onChange,
  className,
}: Readonly<TCustomCountryDropdownSelectProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<TCountryCurrency>(countryCurrencyList[0])

  return (
    <div className={`relative flex h-fit w-fit min-w-24 flex-col ${className}`}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          console.log(isOpen)
        }}
        className="z-10 inline-flex items-center gap-1 rounded-full px-1.5 py-1.5 text-center text-sm font-medium focus:outline-none focus:ring-2"
      >
        <p>{selectedValue ? selectedValue.abv : 'Choose Currency'}</p>
        {selectedValue ? (
          selectedValue.icon
        ) : (
          <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />
        )}
        <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />
      </button>
      {/*  */}

      <div
        className={`absolute -bottom-48 z-20 w-48 divide-y rounded shadow-sm ${isOpen ? 'block' : 'hidden'} `}
      >
        <ul className="h-48 overflow-y-auto rounded-md border-2 bg-white p-2 py-1 pb-10 text-sm ring-2">
          {countryCurrencyList
            .filter((e) => e.abv !== selectedValue.abv)
            .map((country) => (
              <li
                onClick={() => {
                  setSelectedValue(country)
                  onChange?.(country)
                  setIsOpen(false)
                }}
                key={country.abv}
              >
                <button className="inline-flex w-full rounded px-4 py-2 text-sm hover:bg-ghost-white">
                  <div className="inline-flex items-center gap-2">
                    {country.icon ? (
                      country.icon
                    ) : (
                      <Icon icon={'emojione-v1:flag-for-nigeria'} className="h-6 w-6 text-2xl" />
                    )}
                    <p>{country.abv}</p>
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
