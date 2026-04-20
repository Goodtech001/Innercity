/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useTopnavbar, { leftMenu, rightMenu } from './useTopnavbar'
import CountryCurrencyDropdown from '@/components/country-currency-dropdown'
import Logo from '@/components/logo'
import { Icon } from '@iconify/react'
import UserProfileDropdown from '@/components/user-profile-dropdown'
import { useRouter } from 'next/navigation'

export default function TopNavbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  /* ================================
     LOAD USER FROM SESSION STORAGE
  ================================= */
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = sessionStorage.getItem('course-training-profile')
        if (!stored) return setUser(null)

        const parsed = JSON.parse(stored)

        if (parsed?.token) {
          setUser(parsed.user || parsed)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Navbar auth parse error:', err)
        setUser(null)
      }
    }
    console.log('Navbar user:', user)

    loadUser()
    window.addEventListener('storage', loadUser)

    return () => window.removeEventListener('storage', loadUser)
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

  const handleSubMenuClick = (path: string) => {
    router.push(path)
    setSubMenuClicked(path)
  }

  return (
    <>
      {/* ===================== DESKTOP NAV ===================== */}
      <nav className="fixed left-0 top-0 z-20 w-full border-b-2 bg-light/25 py-2 text-dark/75 backdrop-blur-sm">
        <div className="wrapper flex items-center justify-between gap-3 lg:container">
          {/* LEFT */}
          <span className="block md:hidden">
            {user ? <UserProfileDropdown direction="left" /> : <CountryCurrencyDropdown />}
          </span>

          <ul className="hidden items-center gap-10 text-sm md:flex">
            <CountryCurrencyDropdown />

            {leftMenu.map((menu, index) => (
              <li
                key={index}
                onMouseEnter={() => setSubMenuClicked(menu.subPath || '')}
                onMouseLeave={() => setSubMenuClicked('')}
                className="relative"
              >
                <Link
                  href={menu.path || ''}
                  className="flex items-center gap-2 font-medium hover:underline"
                >
                  {menu.title}
                  {menu.subMenus && <Icon icon="mynaui:chevron-down-solid" className="h-4 w-4" />}
                </Link>

                {menu.subMenus && (
                  <ol
                    className={`absolute left-0 h-0 min-w-60 overflow-hidden rounded-md bg-light shadow ${
                      subMenuClicked === menu.subPath && '!h-fit'
                    }`}
                  >
                    {menu.subMenus.map((subMenu, i) => (
                      <li key={i}>
                        <Link
                          href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                          target={subMenu.external ? '_blank' : '_self'}
                          className="block px-3 py-2 hover:bg-secondary/50 hover:text-primary"
                        >
                          {subMenu.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>

          {/* LOGO */}
          <Link href="/">
            <Logo className="w-20 h-20" variant="alt" />
          </Link>

          {/* RIGHT */}
          <ul className="hidden items-center gap-8 text-sm md:flex">
            {rightMenu.map((menu, index) => (
              <li
                key={index}
                onMouseEnter={() => setSubMenuClicked(menu.subPath || '')}
                onMouseLeave={() => setSubMenuClicked('')}
                className="relative"
              >
                <Link
                  href={menu.path || ''}
                  className="flex items-center gap-2 font-medium hover:underline"
                >
                  {menu.title}
                  {menu.subMenus && <Icon icon="mynaui:chevron-down-solid" className="h-4 w-4" />}
                </Link>

                {menu.subMenus && (
                  <ol
                     className={`absolute left-0 h-0 min-w-60 overflow-hidden rounded-md bg-light text-sm shadow ${subMenuClicked == menu.subPath && '!h-fit'}`}
                  >
                    {menu.subMenus.map((subMenu, i) => (
                      <li key={i}>
                        <Link
                          href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                          target={subMenu.external ? '_blank' : '_self'}
                          className="flex w-full items-center justify-between border-4 border-transparent px-3 py-2 text-textcolor hover:border-l-primary hover:bg-blue-100 hover:font-semibold hover:text-primary"
                        >
                          {subMenu.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}

            {user ? (
              <>
                <Link className="btn-primary" href="/campaigns/create">
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

          {/* MOBILE MENU BTN */}
          <button onClick={() => setNavOpen((p) => !p)} className="md:hidden">
            <Icon icon="eva:menu-fill" className="text-4xl" />
          </button>
        </div>
      </nav>

      {/* SPACER */}
      <div className="pb-16" />

      {/* ===================== MOBILE SLIDE ===================== */}
      <div
        className={`fixed inset-0 z-20 bg-dark/50 text-textcolor backdrop-blur-sm transition-all duration-500 ease-in-out md:hidden ${navOpen ? 'visible clip-path-slide-top-down' : 'invisible delay-200 clip-path-close'}`}
      >
        <div
          className={`${navOpen ? 'delay-200 clip-path-slide-top-down' : 'clip-path-close'} h-full w-full bg-light px-2 py-3 duration-500`}
        >
          <div className="flex items-center justify-between">
            <Logo variant="alt" className="w-24" />
            <button onClick={() => setNavOpen(false)}>
              <Icon icon="eva:close-fill" className="text-3xl" />
            </button>
          </div>

          <ul ref={navListRef} className="mt-8 space-y-4">
            {[...leftMenu, ...rightMenu].map((menu, index) => (
              <li
                key={index}
                onMouseEnter={() => setSubMenuClicked(menu.subPath || '')}
                onMouseLeave={() => setSubMenuClicked('')}
                className="relative"
              >
                <Link
                  href={menu.path || ''}
                  className="flex items-center gap-2 font-medium hover:underline"
                >
                  {menu.title}
                  {menu.subMenus && <Icon icon="mynaui:chevron-down-solid" className="h-4 w-4" />}
                </Link>

                {menu.subMenus && (
                  <ol
                    className={`absolute left-0 h-0 min-w-60 overflow-hidden rounded-md bg-light text-sm shadow ${subMenuClicked == menu.subPath && '!h-fit'}`}
                  >
                    {menu.subMenus.map((subMenu, i) => (
                      <li key={i}>
                        <Link
                          href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                          target={subMenu.external ? '_blank' : '_self'}
                          className="flex w-full items-center justify-between border-4 border-transparent px-3 py-2 text-textcolor hover:border-l-primary hover:bg-blue-100 hover:font-semibold hover:text-primary"
                        >
                          {subMenu.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}

            {user ? (
              <div className="border-t pt-6">
                <CountryCurrencyDropdown />
              </div>
            ) : (
              <Link href="/sign-in" className="btn-primary mt-6 block text-center">
                Sign in
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}
