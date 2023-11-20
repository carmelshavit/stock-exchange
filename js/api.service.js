export async function getApiData(symbol, type) {

    const endpoints = {
        stockData: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`,
        stockHistory: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`,
        stocksList: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`
    }

    const endpoint = endpoints[type]

    try {
        const response = await fetch(endpoint)
        const data = await response.json()
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        return data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}


// export const endpoints = {
//     stockData: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`,
//     stockHistory: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`,
//     stocksList: `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${symbol}&limit=10&exchange=NASDAQ`
// }


// export const getEndpointByType = (type) => {
//     return endpoints[type]

// }