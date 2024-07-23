import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { Image } from 'react-bootstrap'

export default function NavBar() {

  return (
    <nav className="nav-container">
        <Image className='nav-logo' src='/images/bird.jpg'></Image>
        <Link href="/" className="navigation-main-title">Bird Atlas</Link>
        <Link href="/" className="navigation-title">Home
        </Link>
        <Link href="/about" className="navigation-title">Explore birds near you
        </Link>
        <Link href="/contact" className="navigation-title">Your Account
        </Link>
    </nav>
  )
}
