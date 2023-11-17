import { getApiData } from './api.service.js'

const searchBtn = document.querySelector('.search-btn')

searchBtn.addEventListener('click', async event => {
    document.querySelector('.stocks-list').innerHTML = null
    renderStock()
    event.preventDefault()
    document.querySelector('.searchInput').value = null
})

async function renderStock() {
    const searchInput = document.querySelector('.searchInput').value
    const ul = document.querySelector('.stocks-list')

    try {
        const stocksList = await getApiData(searchInput, 'stocksList')
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


