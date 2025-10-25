"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SearchedHotels() {
    const searchParams = useSearchParams()

    const place = searchParams.get("place")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const adultsCount = searchParams.get("adultsCount")
    const childCount = searchParams.get("childCount")
    const childAge = searchParams.get("childAge")

    return (
        <>
            <p>{place}</p>
            <p>{startDate}</p>
            <p>{endDate}</p>
            <p>{adultsCount}</p>
            <p>{childCount}</p>
            <p>{childAge}</p> 
            <Link href="/">Lets find the hotel with these parameters</Link>          
        </>
    )
}