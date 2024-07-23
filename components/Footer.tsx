import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-bootstrap'

export default function Footer() {

  return (
    <footer className="footer-container" >
        <Image className='nav-logo' src='/images/bird.jpg'></Image>
        <Link href="/" className="navigation-main-title">Bird Atlas</Link>
        <Link href="/" className="navigation-title">About </Link>
        <Link href="/" className="navigation-title">Learn more about the project </Link>
        <Link href="/" className="navigation-title">How to bird </Link>
    </footer>
  )
}
