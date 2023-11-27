import { getApiData } from './api.service.js'
// import { Marquee } from './marquee.js'

const marquee = new Marquee(document.querySelector('.marquee'))
marquee.render()

console.log(marquee);
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
    event.preventDefault()
    searchInput.value = null
})

const debouncedrenderStocks = debounce(renderStocks, 1000)
searchInput.addEventListener('input', () => {
    updateUrl(searchInput.value)
    stocksList.innerHTML = null
    if (searchInput.value) debouncedrenderStocks()

})


async function renderStocks() {
    const ul = document.querySelector('.stocks-list')
    try {
        const stocksList = await getApiData(searchInput.value, 'stocksList')
        const symbolsStr = await symbolArr(stocksList)
        const stocksProfiles = await getApiData(symbolsStr, 'stockData')

        stocksList.forEach((stock, index) => {
            const li = document.createElement('li')
            const img = document.createElement('img')
            const change = document.createElement('span')
            const company = document.createElement('a')
            const button = document.createElement('button')

            li.appendChild(img)
            li.appendChild(company)
            li.appendChild(change)
            li.appendChild(button)

            img.className = `stock-img-${index}`
            change.className = `stock-change-${index}`
            li.className = 'stock-list-item'
            button.className = 'stock-button'

            company.href = `./company.html?symbol=${stock.symbol}`
            company.innerText = `${stock.name} (${stock.symbol})`
            button.innerText = 'compare'
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

// function addSymbolToCompare(strArr) {

// }
//create function button element that push the selected symbol to array.
// 
// button.addEventListener("click", function() {

//     alert("Button clicked!");
// });
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



