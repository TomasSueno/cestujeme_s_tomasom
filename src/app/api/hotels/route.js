        import { NextResponse } from "next/server";
        import { GetToken } from "../auth/route"
        import { concreteHotel } from "@/app/components/Uvodna"
        
        export async function GET() {
            const token = await GetToken();
            const res = await fetch("https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=PAR&subType=HOTEL_LEISURE&max=1", {
                headers: {Authorization: "Bearer " + token}
            })
        const data = await res.json()
        return NextResponse.json(data.data)
    }