export async function GetToken() {
            const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: "JpnSDsTiQyPKOp0pVWGkDmLkXID896IF",
                    client_secret: "oW1BkwbHcXxCMOia"  
                })
            })
            const data = await res.json();
            return data.access_token;
    }