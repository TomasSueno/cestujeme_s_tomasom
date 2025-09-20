"use client"

import '../styles/homepage.css'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import Image from 'next/image'
import firstPhoto from '../resources/images/main_page_first_photo.jpg'
import Form from "next/form"


export default function Uvodna () {

const [rezervationType, setRezervationType] = useState('accommodation')
const [toggleHotelsInput, setToggleHotelsInput] = useState(false)
const [loading, setLoading] = useState(false)
const [hotelData, setHotelData] = useState([])

const [form, setForm] = useState({
    concreteHotel: "",
    chooseTourPlace: ""
})

function updateForm(field, value) {
    return setForm(prev => ({...prev, [field]: value}))
}

// get top 10 results of hotels by match
    async function fetchHotels(keyword) {
        const res = await fetch("/api/hotels?keyword=" + encodeURIComponent(keyword))
        return res.json()
    }
    
    useEffect(() => {
        if(form.concreteHotel.length < 3) return
        const timeoutId = setTimeout(async () => {
            try {
                setLoading(true)
                const data = await fetchHotels(form.concreteHotel)
                setHotelData(data)
            } catch(error) {
                console.error("Search failed: ", error)
            } finally {
                setLoading(false)
            }
            }, 300)
         return () => clearTimeout(timeoutId)
    }, [form.concreteHotel])

    // check if search places input is focused 
    function checkToggleHotelsInput(isOpen) {
        setToggleHotelsInput(isOpen)
    }

    // get text from div to input(hotel input)
    function changeHotelInputText(name) {
        updateForm("concreteHotel", name)
    }

    // check type of form(accomodation, tours)
    function checkRezervationType(type) {
    setRezervationType(type);
    }

    // Show hotel suggestions dropdown to user
    function HotelSuggestions({ hotels, selectHotel, closeDropdowns, inputValue, loading, inputFocus }) {
        if(!inputFocus) return null
        if(loading) return <p className="announcmentNoHotels">Ta toto sa loadinguje</p>
        if(inputValue.trim().length < 3) return <p className="announcmentNoHotels">Please write here at least 3 characters.</p>
        if(!Array.isArray(hotels) || hotels.length === 0) return <p className="announcmentNoHotels">There is no hotel with that name. <span>Call us and we find what you need <span className="telNumber">+421 940 234 669</span>.</span></p>
            return hotels.map(prop => (
            <div key={prop.id} className="searchPlacesDiv" onMouseDown={() => {
            selectHotel(prop.name);
            closeDropdowns()
            }}>
                <p>{prop.name} <span className="spanShowCityName">( {prop.address.cityName}, {prop.address.countryCode} )</span></p>
            </div>
        ))
    }

// const arrOfQuotes = ["Cestovanie s Tomášom = najlepšie cestovanie", 
//     "Spoznajte zákutia najkrajších miest s Tomášom", 
//     "Máme profesionálny tým odborníkov na cestovanie", 
//     "Kvalitné služby za kvalitný poplatok",
//     "Tý najlepší cestovateľský odborníci pracujú s Tomášom"]
// let quote = arrOfQuotes[Math.floor(Math.random()*arrOfQuotes.length)]

return (
    <>

    <NavBar />

    <main>

    <section className="bookingSection">
        <div className="choosing">
        <button className={rezervationType == "accommodation" ? "accommodation" : ""} onClick={() => checkRezervationType("accommodation")}>Accommodation</button>
        <button className={rezervationType == "tours" ? "tours" : ""} onClick={() => checkRezervationType("tours")}>Tours</button>        
        </div>

            {rezervationType == "accommodation" ? (
            <Form className="rezervation">
                <input maxLength="100" className="searchPlaceInput" type="text" name="accommodation_place" value={form.concreteHotel} placeholder='Where to?' required
                    onFocus={() => checkToggleHotelsInput(true)}
                    onBlur={() => checkToggleHotelsInput(false)}
                    onChange={(event) => { 
                    updateForm("concreteHotel", event.target.value)}
                    }></input>
        {
        <HotelSuggestions hotels={hotelData} selectHotel={changeHotelInputText} closeDropdowns={() => checkToggleHotelsInput(false)} inputValue={form.concreteHotel} loading={loading} inputFocus={toggleHotelsInput} />
        }

                <input placeholder="Departing - Returning" className="chooseDateInput"></input>
                <input placeholder="How many people go with Tomas?" className="choosePeopleInput"></input>
                <button>Find your hotel</button>
            </Form>

            ) : rezervationType == "tours" ? (
                <div className="rezervation">
                <input placeholder="Where to?" name="tours_place" value={form.chooseTourPlace} onChange={(event) => updateForm("chooseTourPlace", event.target.value)}></input>
                <input placeholder="Departing - Returning"></input> 
                <input placeholder="How are you traveling?"></input>
                <input placeholder="How many people go with Tomas?"></input>
                <button>Find your tour</button>
            </div> 
            ) : null }
    </section>

    <section>
        <h1>Another section!</h1>
    </section>

    {/* <section className="home">

    <div className="quoteBox">
    <p className="quote">"{quote}"</p>
    <p className="authorOfQuote">- CST</p>
    </div>

    <Image src={firstPhoto} width={2500} height={2500} className="mainPageFirstPhoto" alt="beach"></Image>
    <div className="titleContent">
    <h1>Create blog for us. It is for free!!!</h1>
    <Link href="own_blogs" className="blogLink"><button className="createBlogButton">Create Blog</button></Link>
    </div>

    </section> */}

    </main>

    </>
    )
}