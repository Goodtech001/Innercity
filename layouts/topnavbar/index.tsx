'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useTopnavbar, { leftMenu, rightMenu } from './useTopnavbar'
import CountryCurrencyDropdown from '@/components/country-currency-dropdown'
import Logo from '@/components/logo'
import { Icon } from '@iconify/react'
import UserProfileDropdown from '@/components/user-profile-dropdown'

export default function TopNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsSignedIn(true)
    }
  }, [])

  const {
    setNavOpen,
    getActiveUrl,
    setSubMenuClicked,
    subMenuClicked,
    navOpen,
    pathName,
    navListRef,
  } = useTopnavbar()

  return (
    <>
      <nav className="fixed left-0 top-0 z-20 w-full border-b-2 bg-light/25 py-2 text-dark/75 backdrop-blur-sm">
        <div className="wrapper flex items-center justify-between gap-3 lg:container">
          <span className="block md:hidden">
            <UserProfileDropdown direction="left" />
          </span>

          <ul className="hidden items-center gap-10 text-sm md:flex">
            <CountryCurrencyDropdown />
            {leftMenu.map((menu, index) => (
              <li
                onMouseEnter={() => setSubMenuClicked(menu.subPath || '')}
                onMouseLeave={() => setSubMenuClicked('')}
                key={index}
                className="relative"
              >
                <Link
                  className="ml- flex items-center gap-10 font-medium hover:underline"
                  href={menu.path || ''}
                >
                  <p className="space-x-2">{menu.title}</p>
                  {menu.subMenus && <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />}
                </Link>

                {menu.subMenus && (
                  <ol
                    className={`absolute left-0 h-0 min-w-60 gap-4 overflow-hidden rounded-md bg-light text-sm shadow ${
                      subMenuClicked == menu.subPath && '!h-fit'
                    }`}
                  >
                    {menu.subMenus.map((subMenu, index) => (
                      <li key={index}>
                        <Link
                          className="flex w-full items-center justify-between border-4 border-transparent px-3 py-2 text-textcolor hover:border-l-primary hover:bg-secondary/50 hover:font-semibold hover:text-primary"
                          href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                          // href={subMenu.path}
                          target={subMenu.external ? '_blank' : '_self'}
                        >
                          <p>{subMenu.title}</p>
                          <small className="ml-10 text-xs font-bold text-primary">
                            {subMenu.external && '◹'}
                          </small>
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>

          <Link href={'/'}>
            <Logo className="w-24" variant="alt" />
          </Link>

          <ul className="hidden items-center gap-10 text-sm md:flex">
            {rightMenu.map((menu, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setSubMenuClicked(menu.subPath || '')}
                onClick={() => setSubMenuClicked(subMenuClicked ? '' : menu.subPath || '')}
              >
                <Link
                  className="flex items-center gap-2 font-medium hover:underline"
                  href={menu.path || ''}
                >
                  <p className="space-x-5">{menu.title}</p>
                  {menu.subMenus && (
                    <Icon
                      icon={'mynaui:chevron-down-solid'}
                      className={`h-4 w-4 ${subMenuClicked && 'rotate-180'}`}
                    />
                  )}
                </Link>

                {menu.subMenus && (
                  <ol
                    // right-0 if the menu is more on the right side
                    className={`absolute right-0 mt-4 h-0 min-w-96 gap-4 divide-y overflow-hidden rounded-md bg-white text-sm shadow ${
                      subMenuClicked == menu.subPath && '!h-fit'
                    }`}
                  >
                    {menu.subMenus.map((subMenu, index) => (
                      <li key={index}>
                        <Link
                          className="flex w-full flex-col gap-1.5 border-transparent px-3 py-2 hover:border-b-primary hover:bg-textcolor/10 hover:text-primary"
                          href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                          target={subMenu.external ? '_blank' : '_self'}
                        >
                          <h4 className="text-dark/75">{subMenu.title}</h4>
                          <small className="ellipsis rounded-md bg-ghost-white/50 p-1 pt-1 text-xs text-textcolor">
                            {subMenu.description}
                          </small>
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}

            {isSignedIn ? (
              <>
                <Link className="btn-primary" href={'/campaigns/create'}>
                  Create campaign
                </Link>
                <UserProfileDropdown />
              </>
            ) : (
              <Link href="/sign-in" className="btn-primary px-8">
                Sign in
              </Link>
            )}
          </ul>

          <button onClick={() => setNavOpen((p) => !p)} className="inline-block md:hidden">
            <Icon
              icon={'eva:menu-fill'}
              className="btn size-11 border border-textcolor/25 px-2 text-5xl"
            />
          </button>
        </div>
      </nav>
      {/*?? THISLINE BELOW JUST HELPS TO MAKE THE LOWER SECTION OF THE PAGE NOT CLASH WOTH THE FIXED TOP NAVBAR */}
      <div className="pb-16" />

      {/* _____________ Slide navbar for mobile _____________ */}
      <div
        className={`fixed inset-0 z-20 bg-dark/50 text-textcolor backdrop-blur-sm transition-all duration-500 ease-in-out md:hidden ${
          navOpen ? 'visible clip-path-slide-top-down' : 'invisible delay-200 clip-path-close'
        }`}
      >
        <div
          className={`${
            navOpen ? 'delay-200 clip-path-slide-top-down' : 'clip-path-close'
          } h-full w-full bg-light px-2 py-3 duration-500`}
        >
          <div className="flex items-center justify-between">
            <CountryCurrencyDropdown />
            <Logo variant="alt" className="w-24 md:w-28" />
            <button onClick={() => setNavOpen((p) => !p)} className="inline-block md:hidden">
              <Icon
                icon={'eva:menu-fill'}
                className="btn size-11 border border-textcolor/25 px-2 text-5xl"
              />
            </button>
          </div>

          <div className="mt-10 h-[calc(100vh-100px)] overflow-scroll py-6 pb-20">
            <ul ref={navListRef} className="h-fit space-y-3">
              {[...leftMenu, ...rightMenu].map((menu, index) => (
                <li
                  key={index}
                  className={`overflow-hidden border-b hover:border-primary hover:bg-primary/20 hover:text-primary ${
                    getActiveUrl(menu.path || '', menu.subPath || '') &&
                    'border-primary bg-primary/15 text-primary'
                  }`}
                >
                  <Link
                    onClick={() => setSubMenuClicked(menu.subPath || '')}
                    className="flex w-full items-center justify-between px-3 py-2 font-semibold"
                    href={menu.path || ''}
                  >
                    <p>{menu.title}</p>
                    {menu.subMenus && (
                      <Icon icon={'mynaui:chevron-down-solid'} className="h-4 w-4" />
                    )}
                  </Link>

                  {menu.subMenus && (
                    <ul
                      className={`mb-0 h-0 w-full overflow-hidden bg-white px-3 transition-all ${
                        subMenuClicked == menu.subPath && 'mb-2 h-auto'
                      }`}
                    >
                      {menu.subMenus.map((subMenu, index) => (
                        <li key={index}>
                          <Link
                            className={`flex w-full items-center justify-between border-2 border-transparent px-3 py-2 hover:border-l-primary hover:bg-secondary/50 hover:font-semibold ${
                              pathName === menu.subPath + subMenu.path &&
                              'border-l-primary bg-secondary/50 font-semibold'
                            }`}
                            // href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                            href={subMenu.path}
                            target={subMenu.external ? '_blank' : '_self'}
                          >
                            <p>{subMenu.title}</p>
                            <small className="ml-10 text-xs font-bold text-primary">
                              {subMenu.external && '◹'}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
