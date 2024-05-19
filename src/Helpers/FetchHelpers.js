const API_KEY = "71719e819c494a0b99e53441241505"

export const urlBuilder = (endpoint, value) => {
    const url = new URL(`https://api.weatherapi.com/v1/${endpoint}.json`)
    url.searchParams.set("key", API_KEY)
    url.searchParams.set("q", value)
    return url
}
