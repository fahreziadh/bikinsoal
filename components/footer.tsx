"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathName = usePathname()

  if (pathName === '/login') {
    return null
  }

  return (
    <footer className="mt-20 bg-white dark:bg-gray-800">
      <div className="container w-full p-4 md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Bikinsoal™</a>. All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/privacyandpolicy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>

  )
}

export default Footer