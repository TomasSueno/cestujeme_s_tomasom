"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
// import { useRef } from 'react'
import Image from 'next/image'
import registration_icon from "../resources/images/registration_icon.png"



export default function NavBar () {

    // const data_of_places = await fetch('https://github.com/dr5hn/countries-states-cities-database/blob/master/sql/cities.sql')
    // const arr_of_places = data_of_places


    const arr_of_places = [
        // {
        //     id: 0,
        //     place: "Paris, France",
        //     description: "Place with a million of beautiful places",
        //     link: ""
        // },
        "Rome, Italy",
        "London, UK",
        "Barcelona, Spain",
        "Santorini, Greece",
        "Venice, Italy",
        "Berlin, Germany",
        "Amsterdam, Netherlands",
        "Prague, Czech Republic",
        "Florence, Italy",
        "Tokyo, Japan",
        "Kyoto, Japan",
        "Bangkok, Thailand",
        "Beijing, China",
        "Bali, Indonesia",
        "Singapore",
        "Seoul, South Korea",
        "Jaipur, India",
        "Hanoi, Vietnam",
        "Phuket, Thailand",
        "New York City, USA",
        "Los Angeles, USA",
        "San Francisco, USA",
        "Toronto, Canada",
        "Vancouver, Canada",
        "Las Vegas, USA",
        "Mexico City, Mexico",
        "Havana, Cuba",
        "Orlando, USA",
        "Quebec City, Canada",
        "Cape Town, South Africa",
        "Marrakech, Morocco",
        "Cairo, Egypt",
        "Victoria Falls, Zambia/Zimbabwe",
        "Nairobi, Kenya",
        "Tunis, Tunisia",
        "Zanzibar, Tanzania",
        "Fez, Morocco",
        "Maasai Mara, Kenya",
        "Mount Kilimanjaro, Tanzania",
        "Sydney, Australia",
        "Melbourne, Australia",
        "Auckland, New Zealand",
        "Queenstown, New Zealand",
        "Fiji",
        "Great Barrier Reef, Australia",
        "Tasmania, Australia",
        "Bora Bora, French Polynesia",
        "Rotorua, New Zealand",
        "Palau",
        "Dubai, UAE",
        "Petra, Jordan",
        "Jerusalem, Israel",
        "Doha, Qatar",
        "Abu Dhabi, UAE",
        "Istanbul, Turkey",
        "Muscat, Oman",
        "Tel Aviv, Israel",
        "Riyadh, Saudi Arabia",
        "Cappadocia, Turkey",
        "Rio de Janeiro, Brazil",
        "Buenos Aires, Argentina",
        "Machu Picchu, Peru",
        "Cartagena, Colombia",
        "Santiago, Chile",
        "Galápagos Islands, Ecuador",
        "Cusco, Peru",
        "Patagonia, Argentina/Chile",
        "Lima, Peru",
        "Salvador, Brazil",
        "San Juan, Puerto Rico",
        "Montego Bay, Jamaica",
        "Panama City, Panama",
        "Antigua, Guatemala",
        "Tulum, Mexico",
        "San José, Costa Rica",
        "Belize City, Belize",
        "Roatán, Honduras",
        "Punta Cana, Dominican Republic",
        "Maldives",
        "Hawaii (Big Island), USA",
        "Maui, Hawaii",
        "Seychelles",
        "Santorini, Greece",
        "Ibiza, Spain",
        "Corsica, France",
        "Malta",
        "Mykonos, Greece",
        "Sardinia, Italy",
        "Ljubljana, Slovenia",
        "Reykjavik, Iceland",
        "Dubrovnik, Croatia",
        "Bruges, Belgium",
        "Tallinn, Estonia",
        "Vilnius, Lithuania",
        "Bled, Slovenia",
        "Ghent, Belgium",
        "Mostar, Bosnia and Herzegovina",
        "Brasov, Romania"
        ]

const [valueInput, setValueInput] = useState("")
const [focusedSearchInput, setFocusedSearchInput] = useState(false)

function checkFocusedSearchInput() {
    setFocusedSearchInput(!focusedSearchInput)
}

let result = arr_of_places.filter((word) => word.toLowerCase().includes(valueInput.toLowerCase()))
result = result.slice(0, 10)

const [hamburgerMenuBool, setHamburgerMenuBool] = useState(false)

function HamburgerMenuPressed() {
    setHamburgerMenuBool(!hamburgerMenuBool)
}

    return (
<>

<nav className="navbar">

<ul className="navbar_ul">

<Link href="/">
<div className="logo">
<p className="text_logo">C s T</p>
</div>
</Link>

<div className="search">
<input className="search_input_nav" placeholder='Where you want to go'
onChange = {(event) => setValueInput(event.target.value)}
onFocus={checkFocusedSearchInput} onBlur={checkFocusedSearchInput}></input>
<div className="search_button_div">

<button className="search_button">
<svg id="Search--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height="25" width="25"><desc>Search Streamline Icon: https://streamlinehq.com</desc><defs></defs><path d="m13.59375 12.930890625 -3.5400468750000003 -3.5400468750000003a5.164546875 5.164546875 0 1 0 -0.6628593749999999 0.6628593749999999L12.930890625 13.59375ZM1.875 6.09375a4.21875 4.21875 0 1 1 4.21875 4.21875 4.2234375 4.2234375 0 0 1 -4.21875 -4.21875Z" strokeWidth="1"></path><path id="_Transparent_Rectangle_" d="M0 0h15v15H0Z" fill="none" strokeWidth="1"></path></svg>
</button>
</div>

<div className="div_search_places">
{Array.isArray([]) && result.length && focusedSearchInput === true ? (
    result.map((place) => {
          return <button className="search_places" key={0}>{place}</button>
      })
) : focusedSearchInput === true ? (
    <p className="not_found_location">Destination Was Not Found</p>
) : null
}
</div>

</div>

<li className="about_us_li">

<Link href="/about_us" className="about_us">
About as
</Link>

</li>

<li className="faq_li">

<Link href="/faq" className="faq">
FAQ
</Link>

</li>

<li className="favoriteDestinations_li">

<Link href="/favorite_destinations" className="favoriteDestinations">
Favorite Destinations
</Link>

</li>

<li className="contact_li">

<Link href="/contact" className="contact">
Contact
</Link>

</li>


<li className="registration_li">

<Link href="/registration" className="registration_link">
<Image src={registration_icon} width={40} height={40} className="registration_icon" alt="Registration icon"></Image>
</Link>
</li>

<div onClick={HamburgerMenuPressed} className="around_hamburger_menu">
<div className="hamburger_menu"></div>
</div>
</ul>

</nav>

{
hamburgerMenuBool === true ? (

    <div className="after_menu_clicked">

    <div>
 <Link href="/about_us" className="about_us about_us_menu">
    About as
 </Link>

<Link href="/faq" className="faq faq_menu">
    FAQ
</Link>

<Link href="/favorite_destinations" className=" favoriteDestinations favoriteDestinations_menu">
    Favorite Destinations
</Link>

<Link href="/contact" className="contact contact_menu">
    Contact
</Link>
</div>

<div className="search_menu">
<input className="search_input_nav" placeholder='Where you want to go'
onChange = {(event) => setValueInput(event.target.value)}
onFocus={checkFocusedSearchInput} onBlur={checkFocusedSearchInput}></input>
<div className="search_button_div">

<button className="search_button">
<svg id="Search--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height="25" width="25"><desc>Search Streamline Icon: https://streamlinehq.com</desc><defs></defs><path d="m13.59375 12.930890625 -3.5400468750000003 -3.5400468750000003a5.164546875 5.164546875 0 1 0 -0.6628593749999999 0.6628593749999999L12.930890625 13.59375ZM1.875 6.09375a4.21875 4.21875 0 1 1 4.21875 4.21875 4.2234375 4.2234375 0 0 1 -4.21875 -4.21875Z" strokeWidth="1"></path><path id="_Transparent_Rectangle_" d="M0 0h15v15H0Z" fill="none" strokeWidth="1"></path></svg>
</button>
</div>

<div className="div_search_places">
{Array.isArray([]) && result.length && focusedSearchInput === true ? (
    result.map((place) => {
          return <button className="search_places" key={0}>{place}</button>
      })
) : focusedSearchInput === true ? (
    <p className="not_found_location">Destination Was Not Found</p>
) : null
}
</div>

</div>
    </div>
) : null

}
</>

    )
}