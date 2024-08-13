import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image';

export default function NavBar() {

  return (
    <nav className="nav-container">
        <Image 
        width={75}
        height={75}
        className='nav-logo' src='/images/bird.jpg' alt={''}></Image>
        <Link href="/" className="navigation-main-title">Bird Atlas</Link>
        <Link href="/birds/nearby-birds" className="navigation-title">Explore birds near you</Link>
        <Link href="/account/login" className="navigation-title">Your Account</Link>
    </nav>
  )
}
