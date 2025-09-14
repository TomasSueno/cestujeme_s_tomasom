// "use client"

// export default function FavoriteDestinations() {
//     return (
//         <>
//         <div>
//             Slovakia
//         </div>
//         </>
//     )
// }

"use client"

import {useState, useEffect} from 'react'

export default function TestFetch() {
    const [accessToken, setAccessToken] = useState("")
    const [hotelData, setHotelData] = useState([])
    const [choosePlace, setChoosePlace] = useState("")
    // const [chooseHotel, setChooseHotel] = useState("")

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

    console.log(hotelData)

    // useEffect(() => {
    //     const chooseMyHotel = async() => {
    //         const res = await fetch("https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=HVAYTAJX&adults=4&checkInDate=2025-11-22&checkOutDate=2025-11-27&roomQuantity=1&priceRange=200-300&currency=USD&paymentPolicy=NONE&boardType=ROOM_ONLY&includeClosed=true&bestRateOnly=true", {
    //             headers: {Authorization: "Bearer " + accessToken}
    //         })
    //         const data = await res.json()
    //         setChooseHotel(data)
    //     }
    //     chooseMyHotel()
    // }, [accessToken, choosePlace])

    // console.log(chooseHotel)
    
    return (
        <>
        <h1>Search top 10 hotels by search</h1>
        <input placeholder="Choose a hotel" onChange={(event) => setChoosePlace(event.target.value)}></input>
        <p>{choosePlace}</p>
            {
            hotelData && hotelData.length > 0 ? (
            <div>
                <p>We find {hotelData.length} hotels with your paramaters!</p>
                {
            hotelData.map(prop => (
            <div key={prop.id}>
                <p>Hotel ID - {prop.hotelIds} --------- Name - {prop.name} -------- Country - {prop.address.countryCode}</p>
                <p>Town - {prop.address.cityName} ----- iataCode - {prop.iataCode}</p>
            </div>
            ))
        }
            </div>
        ) : ( <p>There is no hotel with your stupid parameters</p> )
            }
        </>
    )
}



// "use client"

// import { useEffect, useState } from "react";

// export default function TestFetch() {

//     const [posts, setPosts] = useState([])

// useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     .then(data => setPosts(data))
// }, [])

// return <>
//         <h1>Posts</h1>

//         {
//             posts.slice(0, 5).map((p) => (
//                 <div key={p.id}>
//                 <h1>{p.title}</h1>
//                 <p>{p.body}</p>
//                 </div>
//             ))

            
//         }
//     </>
// }







// "use client"

// import { useState, useEffect } from 'react'

// export default function TestFetch() {

//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(data => setPosts(data))
//     }, [])

//     return <>
//         <h1>Posts</h1>
//         {
//         posts.slice(1, 76).filter((p) => p.userId == 7)
//         .map(res => (
//             <div key={res.id}>
//                 <h3>{res.title}</h3>
//                 <h5>Author - {res.userId}</h5>
//                 <p>{res.body}</p>
//             </div>
//         ))
//     }
//     </>
// }




// useEffect(() => {
//     fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//         client_id: "JpnSDsTiQyPKOp0pVWGkDmLkXID896IF",
//         client_secret: "oW1BkwbHcXxCMOia",
//         grant_type: "client_credentials"
//     })
// })
// .then(res => res.json())
// .then(data => setAccessToken(data.access_token))
// }, [])

// useEffect(() => {
//     fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//         client_id: "JpnSDsTiQyPKOp0pVWGkDmLkXID896IF",
//         client_secret: "oW1BkwbHcXxCMOia",
//         grant_type: "client_credentials"
//     })
// })
// .then(res => res.json())
// .then(data => console.log(data))
// }, [])




// useEffect(() => {
//     fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
//         method: 'Post',
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams({
//             grant_type: 'client_credentials',
//             client_id: 'JpnSDsTiQyPKOp0pVWGkDmLkXID896IF',
//             client_secret: 'oW1BkwbHcXxCMOia'
//         })
//     })
//     .then(res => res.json())
//     .then(data => setAccessToken(data.access_token))
// }, [])

// useEffect(() => {
//     if(!accessToken) return
//     fetch('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=3&radiusUnit=KM&hotelSource=ALL', {
//     headers: {
//         Authorization: `Bearer ${accessToken}`
//     }
// })
// .then(res => res.json())
// .then(data => console.log(data))
// console.log("oiefnoiewonn")
// }, [accessToken])


// useEffect(() => {
//     fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: new URLSearchParams({
//             grant_type: 'client_credentials',
//             client_id: 'JpnSDsTiQyPKOp0pVWGkDmLkXID896IF',
//             client_secret: 'oW1BkwbHcXxCMOia'
//         })
//     })
//     .then(res => res.json())
//     .then(data => setAccessToken(data.access_token))
// }, [])

// useEffect(() => {
//     if(!accessToken) return
//     fetch('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=3&radiusUnit=KM&hotelSource=ALL', {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     }
//     )
//     .then(res => res.json())
//     .then(data => console.log(data))
// }, [accessToken])



// useEffect(() => {
//     fetch("https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=3&radiusUnit=KM&hotelSource=ALL", {
//   headers: {
//     Authorization: `Bearer ${accessToken}`
//   }
// })
// .then(res => res.json())
// .then(data => console.log(data))
// }, [accessToken])


    // useEffect(() => {
    //     const getToken = async () => {
    //         const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", { 
    //                 method: "POST",
    //                 headers: {"Content-Type": "application/x-www-form-urlencoded"},
    //                 body: new URLSearchParams({
    //                     grant_type: 'client_credentials',
    //                     client_id: 'JpnSDsTiQyPKOp0pVWGkDmLkXID896IF',
    //                     client_secret: 'oW1BkwbHcXxCMOia'
    //                 })
    //             }
    //         )
    //             const data = await res.json()
    //             setAccessToken(data.access_token)
    //     }
    //     getToken()
    // }, [])


    // console.log(accessToken)