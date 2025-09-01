"use client"

import '../styles/homepage.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import Image from 'next/image'
import firstPhoto from '../resources/images/main_page_first_photo.jpg'


export default function Uvodna () {

const arrOfQuotes = ["Cestovanie s Tomášom = najlepšie cestovanie", 
    "Spoznajte zákutia najkrajších miest s Tomášom", 
    "Máme profesionálny tým odborníkov na cestovanie", 
    "Kvalitné služby za kvalitný poplatok",
    "Tý najlepší cestovateľský odborníci pracujú s Tomášom"]
let quote = arrOfQuotes[Math.floor(Math.random()*arrOfQuotes.length)]

return (
    <>

    <NavBar />

    <main>

    <section className="home">

    <div className="quoteBox">
    <p className="quote">"{quote}"</p>
    <p className="authorOfQuote">- CST</p>
    </div>

    <Image src={firstPhoto} width={2500} height={2500} className="mainPageFirstPhoto" alt="beach"></Image>
    <div className="titleContent">
    <h1>Create blog for us. It is for free!!!</h1>
    <Link href="own_blogs" className="blogLink"><button className="createBlogButton">Create Blog</button></Link>
    </div>

    </section>

    {/* section. */}

    </main>

    </>
    )
}