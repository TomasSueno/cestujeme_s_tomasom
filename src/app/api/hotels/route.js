// import { NextResponse } from "next/server"
// import { getAccessToken, searchHotels } from "@/app/lib/amadeus"

// export async function GET(request) {


//     const { searchParams } = new URL(request.url)
//     const keyword = searchParams.get("keyword")

//     if(!keyword) {
//         return NextResponse.json({error: "Keyword required", status: 400})
//     }

//         try {
//     const token = await getAccessToken()
//     const hotels = await searchHotels(token, keyword)
//     return NextResponse.json(hotels)
// } catch(error) {
//     return NextResponse.json({error: error.message}, {status: 500})}
// }

// export async function POST(request) {
   
// }







// import { NextResponse } from "next/server"

// export async function GET() {
//     const hotels = [
//     {name: "Hotel grande", city: "Paris"},
//     {name: "Hotel grandelele", city: "Moscow"}
//     ]

//     return NextResponse.json(hotels)
// }






// import { NextResponse } from "next/server";

// export async function GET(res) {
//     const { searchParams } = new URL(res.url)
//     const word = searchParams.get("word") || "default"
//     const money = searchParams.get("money") || "default"
//     return NextResponse.json([word, money])
// }






// import { NextResponse } from "next/server";

// export async function GetToken() {
//     const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
//         method: "POST",
//         headers: {"Content-Type": "application/x-www-form-urlencoded"},
//         body: new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: "JpnSDsTiQyPKOp0pVWGkDmLkXID896IF",
//         client_secret: "oW1BkwbHcXxCMOia"  
//         })
//     })
//     const data = await res.json()
//     return data
// }

// export async function GET(req) {
//     const { searchParams } = new URL(req.url)
//     const keyword = searchParams.get("keyword") || "default"
//     const tokenData = await GetToken()
//     const token = tokenData.access_token
//     const res = await fetch("https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=" + keyword + "&subType=HOTEL_LEISURE&max=10", {
//         headers: { Authorization: "Bearer " + token }
//     })
//     const data = await res.json()
//     return NextResponse.json(data)
// }



import { NextResponse } from "next/server"
import { searchHotels, getAccessToken } from "@/lib/amadeus"

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const keyword = searchParams.get("keyword") || "default"
    try {
        const token = await getAccessToken();
        const hotels = await searchHotels(token, keyword);
        return NextResponse.json(hotels);
    } catch(err) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}