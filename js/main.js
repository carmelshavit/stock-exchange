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
        stocksList.forEach(stock => {
            const li = document.createElement('li')
            const company = document.createElement('a')
            li.className = 'stock-list-item'
            li.appendChild(company)
            company.href = `./company.html?symbol=${stock.symbol}`
            company.innerText = `${stock.name} (${stock.symbol})`
            ul.appendChild(li)
        })
    }
    catch (error) {
        console.log(error)
    }
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



