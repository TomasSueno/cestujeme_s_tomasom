"use client"

import '../styles/homepage.css'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import Image from 'next/image'
import firstPhoto from '../resources/images/main_page_first_photo.jpg'
import Form from "next/form"

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default function Uvodna () {

// const [selectedDate, setSelectedDate] = useState(null);
const [rezervationType, setRezervationType] = useState('accommodation')
const [toggleHotelsInput, setToggleHotelsInput] = useState(false)
const [loading, setLoading] = useState(false)
const [hotelData, setHotelData] = useState([])
const [showPeoplePicker, setShowPeoplePicker] = useState(false)
const [submitErrors, setSubmitErrors] = useState({})

const [form, setForm] = useState({
    concreteHotel: "",
    chooseTourPlace: "",
    dateRange: [null, null],
    adults: 2,
    children: 0,
    ageOfChild: [null, null, null, null, null]
})

// Min and max dates in dates input
const today = new Date()
const twoYearsLater = new Date()
twoYearsLater.setFullYear(today.getFullYear() + 2)

function updateForm(field, value) {
    return setForm(prev => ({...prev, [field]: value}))
}

function updateFormArray(field, index, value) {
    setForm(prev => {
        const arr = [...(prev[field] || [])]
        arr[index] = value
        return { ...prev, [field]: arr }
    })
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

    console.log(hotelData)

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

    // People picker UI
    function PeoplePicker({ children, adults }) {
        if (showPeoplePicker === false) return null
        return (
        <div className="peoplePickerBox">
            <div className="adultsPicker">
                <label>Adults</label>
                <button type='button' onClick={() => updateForm("adults", Math.max(1, form.adults - 1))}>-</button>
                <p>{adults}</p>
                <button type='button' onClick={() => updateForm("adults", Math.min(8, form.adults + 1))}>+</button>
            </div>

            <div className="childrenPicker">
                <label>Children</label>
                <button type='button' onClick={() => {
                    if(form.children > 0) {
                    updateForm("children", form.children - 1)
                    updateFormArray("ageOfChild", form.children - 1, null)}
                    }}>-</button>
                <p>{children}</p>
                <button type='button' onClick={() => updateForm("children", Math.min(5, form.children + 1))}>+</button>
            </div>

            {
                [...Array(form.children)].map((_, count) => (
                <div className="ageOfChild" key={count}>
                    <label>Age of child {count + 1}</label>
                    <select value={form.ageOfChild[count] || "Choose age"} 
                    onChange={(e) => updateFormArray("ageOfChild", count, (e.target.value == "Choose age" ? null : e.target.value))}>
                        
                    <option>Choose age</option>
                    {/* <option value={null}>Choose age</option> */}
                    <option key={0} value={0}>0 years</option>
                    {[...Array(17).keys()].map(age => (
                        <option key={age+1} value={age+1}>{(age + 1) + (age + 1 != 1 ? " years" : " year")}</option> 
                    ))}
                    
                    </select>
                </div>
                ))
            }
            <button className="peoplePickerSubmitButton" onClick={() => setShowPeoplePicker(false)}>Done</button>
            </div>
        )
    }

    function handleSubmit(e) {
        const errors = {}
        if(form.concreteHotel.length < 3) {errors.concreteHotelError = "Write at least 3 characters in the hotel search."}
        else if(!Array.isArray(hotelData) || hotelData.length === 0) errors.concreteHotelError = "That text doesn't match destination. Please try to find some other destination."
        if(form.dateRange[0] === null || form.dateRange[1] === null) errors.dateError = "Choose complete date."
        if(form.ageOfChild.slice(0, form.children).some((el) => el === null)) errors.ageOfChildError = "Add how old are your youngsters."
        setSubmitErrors(errors)
        if(Object.keys(errors).length > 0) {
            e.preventDefault();
        }
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
                <input maxLength="100" minLength="0" className="searchPlaceInput" type="text" name="accommodation_place" value={form.concreteHotel} placeholder='Where to?'
                    onFocus={() => checkToggleHotelsInput(true)}
                    onBlur={() => checkToggleHotelsInput(false)}
                    onChange={(event) => { 
                    updateForm("concreteHotel", event.target.value)}
                    }></input>
                {submitErrors.concreteHotelError && <p className="submitErrorAnnouncment">{submitErrors.concreteHotelError}</p>}
                {
                <HotelSuggestions hotels={hotelData} selectHotel={changeHotelInputText} closeDropdowns={() => checkToggleHotelsInput(false)} inputValue={form.concreteHotel} loading={loading} inputFocus={toggleHotelsInput} />
                }

                <DatePicker placeholderText="Departing - Returning" className="datePicker" name="date_picker"
                monthsShown={2} selected={form.dateRange[0]} onChange={(update) => updateForm("dateRange", update)}
                startDate={form.dateRange[0]} endDate={form.dateRange[1]} selectsRange minDate={today} maxDate={twoYearsLater}/>
                {submitErrors.dateError && <p className="submitErrorAnnouncment">{submitErrors.dateError}</p>}

                <input value={"Adults = " + form.adults + " and " + "Children = " + form.children} className="choosePeopleInput" 
                onFocus={() => setShowPeoplePicker(true)} readOnly name="people_count"></input>
                <PeoplePicker children={form.children} adults={form.adults}/>
                {submitErrors.ageOfChildError && <p className="submitErrorAnnouncment">{submitErrors.ageOfChildError}</p>}
                <button type='submit' className="rezervation_button" onClick={handleSubmit}>Find your hotel</button>
            </Form>

            ) : rezervationType == "tours" ? (
                <div className="rezervation">
                <input placeholder="Where to?" name="tours_place" value={form.chooseTourPlace} onChange={(event) => updateForm("chooseTourPlace", event.target.value)}></input>
                <input placeholder="Departing - Returning"></input> 
                <input placeholder="How are you traveling?"></input>
                <input placeholder="How many people go with Tomas?"></input>
                <button className="rezervation_button">Find your tour</button>
            </div> 
            ) : null }
    </section>

    {/* <section>
        <h1>Another section!</h1>
        <p>There is actually new section about us. We are so good. Or there can be some divs with top 90 on the world, real count of users and so on.</p>
    </section> */}

    {/* <section>
        <h1>Hoooola hej</h1>
        <p>Hola hej Slovensko</p>
        <p>Ja programujeeeem konečneee!!!!</p>
        <p>Už naozaj ale do práce potom</p>
    </section> */}

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