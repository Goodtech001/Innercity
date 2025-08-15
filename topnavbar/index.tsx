"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo-white.png";
import logoBlue from "../public/logo-black-text.png";
import mission from "../public/inner-black-text.png"

// import {
//   ChevronDownIcon,
//   CloseXIcon,
//   MenuFriesIcon,
//   SearchMagnifierIcon,
// } from "../svgs;"
import useTopnavbar, { menus as defaultmenu } from "./useTopnavbar";
import { ChevronDownIcon, MenuIcon, SearchIcon, User2Icon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../components/ui/navigation-menu";
import CustomCountryDropdownSelect from "@/currency";

export default function TopNavbar({ menus = defaultmenu }) {
  const {
    setNavOpen,
    getActiveUrl,
    setSubMenuClicked,
    subMenuClicked,
    navOpen,
    pathName,
    navListRef,
  } = useTopnavbar();

  return (
    <>
      <nav className="relative pb-16 md:pb-16 bg-white gap-5">
        <div className="fixed left-0 right-0 top-0 z-20 w-full bg-white border-b-2 py-2 px-10">
          <div className="wrapper flex items-center justify-between gap-3">

            <div className="hidden md:inline-block ">
              <ul className="flex items-center text-sm text-light gap-10 ">
                <CustomCountryDropdownSelect/>
                {menus.map((menu, index) => (
                  <li
                    onMouseEnter={() => setSubMenuClicked(menu.subPath || "")}
                    onMouseLeave={() => setSubMenuClicked("")}
                    key={index}
                    className="relative"
                  >
                    <Link
                      className="flex items-center gap-10 font-medium hover:underline ml-"
                      href={menu.path || ""}
                    >
                      <p className="space-x-5">{menu.title}</p>
                      {menu.subMenus && <ChevronDownIcon />}
                    </Link>
                    
                    {menu.subMenus && (
                      <ol
                        className={`absolute left-0 h-0 min-w-60 overflow-hidden rounded-md bg-light text-sm shadow gap-4 ${
                          subMenuClicked == menu.subPath && "!h-fit"
                        }`}
                      >
                        {menu.subMenus.map((subMenu, index) => (
                          <li key={index}>
                            <Link
                              className="flex w-full items-center justify-between border-4 border-transparent px-3 py-2 text-textcolor hover:border-l-primary hover:bg-secondary/50 hover:font-semibold hover:text-primary"
                              // href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                              href={subMenu.path}
                              target={subMenu.external ? "_blank" : "_self"}
                            >
                              <p>{subMenu.title}</p>
                              <small className="ml-10 text-xs font-bold text-primary">
                                {subMenu.external && "◹"}
                              </small>
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
            </div>
             <Link href={"/"}>
              <Image
                src={mission.src}
                alt="logo"
                className="w-24 md:w-28"
                width={100}
                height={50}
              />
            </Link>

            <div className="flex items-center justify-between gap-10 mr-0">
              <NavigationMenu viewport={false}>
              <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Campaign</NavigationMenuTrigger>
          <NavigationMenuContent className="z-99">
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-99 relative">
              <li className="row-span-3 relative z-1 ">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md z-1"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </Link>
              <Link href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </Link>
              <Link href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
              </NavigationMenuList>
              </NavigationMenu>
              <Link href="/" >
                      <Button  className="bg-blue-700 p-4 rounded"> Create Campaign</Button>
                     </Link>
                    <Link href="">
                     <User2Icon />
                     </Link>
              <button
                onClick={() => setNavOpen((p) => !p)}
                className="inline-block md:hidden"
              >
                <MenuIcon className="btn h-12 w-12 rotate-180 px-2 text-5xl font-bold text-light ring-light" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* _____________ Slide navbar for mobile _____________ */}
      <div
        className={`fixed inset-0 z-20 bg-dark/50 text-textcolor backdrop-blur-sm transition-all duration-500 ease-in-out md:hidden ${
          navOpen
            ? "visible clip-path-slide-top-down"
            : "invisible delay-200 clip-path-close"
        }`}
      >
        <div
          className={`${
            navOpen ? "delay-200 clip-path-slide-top-down" : "clip-path-close"
          } h-full w-full bg-light px-2 py-3 duration-500`}
        >
          <div className="flex items-center justify-between">
            <Image
              src={logoBlue.src}
              alt="logo"
              className="w-24 md:w-28"
              width={100}
              height={50}
            />
            <button
              onClick={() => setNavOpen((p) => !p)}
              className="ml-auto block md:hidden"
            >
              <XIcon className="btn h-12 w-12 rotate-180 px-2 font-bold text-textcolor ring-textcolor" />
            </button>
          </div>

          <div className="mt-10 h-[calc(100vh-100px)] overflow-scroll py-6 pb-20">
            <ul ref={navListRef} className="h-fit space-y-3">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className={`overflow-hidden rounded-md border border-textcolor/50 hover:border-primary hover:bg-primary/20 hover:text-primary ${
                    getActiveUrl(menu.path || "", menu.subPath || "") &&
                    "border-primary bg-primary/15 text-primary"
                  }`}
                >
                  <Link
                    onClick={() => setSubMenuClicked(menu.subPath || "")}
                    className="flex w-full items-center justify-between px-3 py-2 font-semibold"
                    href={menu.path || ""}
                  >
                    <p>{menu.title}</p>
                    {menu.subMenus && <ChevronDownIcon />}
                  </Link>

                  {menu.subMenus && (
                    <ul
                      className={`mb-0 h-0 w-full overflow-hidden bg-white px-3 transition-all ${
                        subMenuClicked == menu.subPath && "mb-2 h-auto"
                      }`}
                    >
                      {menu.subMenus.map((subMenu, index) => (
                        <li key={index}>
                          <Link
                            className={`flex w-full items-center justify-between border-2 border-transparent px-3 py-2 hover:border-l-primary hover:bg-secondary/50 hover:font-semibold ${
                              pathName === menu.subPath + subMenu.path &&
                              "border-l-primary bg-secondary/50 font-semibold"
                            }`}
                            // href={subMenu.external ? subMenu.path : menu.subPath + subMenu.path}
                            href={subMenu.path}
                            target={subMenu.external ? "_blank" : "_self"}
                          >
                            <p>{subMenu.title}</p>
                            <small className="ml-10 text-xs font-bold text-primary">
                              {subMenu.external && "◹"}
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
  );
}
