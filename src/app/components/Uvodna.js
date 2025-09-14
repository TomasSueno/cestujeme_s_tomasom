"use client"

import '../styles/homepage.css'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import Image from 'next/image'
import firstPhoto from '../resources/images/main_page_first_photo.jpg'


export default function Uvodna () {

const [choosePlace, setChoosePlace] = useState([])
const [accessToken, setAccessToken] = useState("")
const [hotelData, setHotelData] = useState([])
const [concreteHotel, setConcreteHotel] = useState("")
const [toggleHotelsInput, setToggleHotelsInput] = useState(false)
const [chooseTourPlace, setChooseTourPlace] = useState("")

    // get text from div to input(hotel input)
    function changeHotelInputText(name, town) {
        setConcreteHotel(name + ", " + town)
    }

// get token from amadeus app
    useEffect(() => {
        const getToken = async() => {
            const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: "JpnSDsTiQyPKOp0pVWGkDmLkXID896IF",
                    client_secret: "oW1BkwbHcXxCMOia"  
                })
            })
            const data = await res.json()
            setAccessToken(data.access_token)
        }
        getToken()
    }, [])

    // get top 10 results from searching hotels

        useEffect(() => {
        if(!accessToken) return
        const getHotels = async() => {
            const res = await fetch("https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=" + choosePlace + "&subType=HOTEL_LEISURE&max=10", {
                headers: {Authorization: "Bearer " + accessToken}
            })
        const data = await res.json()
        setHotelData(data.data)
        }
        getHotels()
    }, [accessToken, choosePlace])

    function checkToggleHotelsInput(isOpen) {
        setToggleHotelsInput(isOpen)
    }

// const arrOfQuotes = ["Cestovanie s Tomášom = najlepšie cestovanie", 
//     "Spoznajte zákutia najkrajších miest s Tomášom", 
//     "Máme profesionálny tým odborníkov na cestovanie", 
//     "Kvalitné služby za kvalitný poplatok",
//     "Tý najlepší cestovateľský odborníci pracujú s Tomášom"]
// let quote = arrOfQuotes[Math.floor(Math.random()*arrOfQuotes.length)]

const [rezervationType, setRezervationType] = useState('accommodation');

function checkRezervationType(type) {
    setRezervationType(type);
}

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
            <div className="rezervation">
                <input className="searchPlaceInput" type='text' name="accommodation_place" value={concreteHotel} placeholder='Where to?'
                    onFocus={() => checkToggleHotelsInput(true)} 
                    onChange={(event) => { 
                    setConcreteHotel(event.target.value)
                    setChoosePlace(event.target.value)}
                    }></input>
                {
                toggleHotelsInput ? (
                hotelData ? (
                hotelData.map(prop => (
                    <div key={prop.id} className="searchPlacesDiv" onClick={() => {changeHotelInputText(prop.name, prop.address.cityName);
                    (checkToggleHotelsInput(false))}}>
                        <p>{prop.name}, {prop.address.cityName}</p>
                    </div>
                ))
            ) : choosePlace.length >= 3 ? <p className="announcmentNoHotels">There is no hotel like that one</p> : <></>
        ) : <></>
                }

                <input placeholder="Departing - Returning" className="chooseDateInput"></input>
                <input placeholder="How many people go with Tomas?" className="choosePeopleInput"></input>
                <button>Find your hotel</button>
            </div> 
            ) : rezervationType == "tours" ? (
                <div className="rezervation">
                <input placeholder="Where to?" name="tours_place" value={chooseTourPlace} onChange={(event) => setChooseTourPlace(event.target.value)}></input>
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