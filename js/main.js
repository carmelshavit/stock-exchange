import { getApiData } from './api.service.js'
var urlParams = new URLSearchParams(window.location.search)
const query = urlParams.get('query')

const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const stocksList = document.querySelector('.stocks-list')

if (query) {
    searchInput.value = query
    renderStocks()
}

searchBtn.addEventListener('click', async event => {
    stocksList.innerHTML = null
    renderStocks()
    event.preventDefault()
    searchInput.value = null
})

const debouncedrenderStocks = debounce(renderStocks, 1000)
searchInput.addEventListener('input', () => {
    updateUrl(searchInput.value)
    stocksList.innerHTML = null
    debouncedrenderStocks()
})


async function renderStocks() {
    const ul = document.querySelector('.stocks-list')
    try {
        const stocksList = await getApiData(searchInput.value, 'stocksList')
        const symbolsStr = await symbolArr(stocksList)
        const stocksProfiles = await getApiData(symbolsStr, 'stockData')
        console.log(stocksProfiles.companyProfiles);


        stocksList.forEach((stock, index) => {
            const li = document.createElement('li')
            const img = document.createElement('img')
            const change = document.createElement('span')
            const company = document.createElement('a')

            li.appendChild(img)
            li.appendChild(company)
            li.appendChild(change)

            img.className = `stock-img-${index}`
            change.className = `stock-change-${index}`
            li.className = 'stock-list-item'

            company.href = `./company.html?symbol=${stock.symbol}`
            company.innerText = `${stock.name} (${stock.symbol})`
            ul.appendChild(li)
        })

        stocksProfiles.companyProfiles.forEach((stock, index) => {
            const img = document.querySelector(`.stock-img-${index}`)
            const change = document.querySelector(`.stock-change-${index}`)
            if (stock.profile.changes) change.innerText = `(${stock.profile.changes}%)`
            img.src = stock.profile.image
            img.onerror = () => img.src = 'https://www.freeiconspng.com/uploads/stock-exchange-icon-png-11.png'
            change.innerText.includes('-') ? change.style.color = 'red' : change.style.color = 'green'

        });
    }
    catch (error) {
        console.log(error)
    }
}
async function symbolArr(stocksList) {
    const symbolArr = stocksList.map(stock => {
        return stock.symbol
    })
    const symbolsString = symbolArr.join()
    return symbolsString
}



function debounce(func, delay) {
    let timeoutId

    return function (...args) {
        const context = this

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args)
        }, delay)
    }
}

function updateUrl(searchQuery) {
    var currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set('query', searchQuery);

    window.history.replaceState({}, '', currentUrl.href);
}



