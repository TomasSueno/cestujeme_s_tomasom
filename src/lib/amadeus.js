export async function getAccessToken() {
            const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: "jdNob3qfgGCiJj59LYF41D8fZHB1cV9r",
                    client_secret: "X7BrgojrQFwblS75"  
                })
            })
            if(!res.ok) throw new Error("Token fetch failed: " + res.status + " " + await res.text())

            const data = await res.json();
            return data.access_token;
    }

        export async function searchHotels(token, keyword) {
            const res = await fetch("https://test.api.amadeus.com/v1/reference-data/locations/hotel?keyword=" + encodeURIComponent(keyword) + "&subType=HOTEL_LEISURE&max=10", {
                headers: {Authorization: "Bearer " + token}
            })

            if(!res.ok) throw new Error("Hotel search failed: " + res.status + " " + await res.text())

        const data = await res.json()
        return data.data
    }
