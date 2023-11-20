import { getApiData } from './api.service.js'

const symbol = getQueryParams()
renderCompany()
renderChart()

function getQueryParams() {
    var urlParams = new URLSearchParams(window.location.search)
    const symbol = urlParams.get('symbol')
    return symbol
}

async function renderCompany() {
    const elName = document.querySelector('.stock-name')
    const elImage = document.querySelector('.stock-img')
    const elDesc = document.querySelector('.stock-desc')
    const elLink = document.querySelector('.stock-link')
    const elPrice = document.querySelector('.stock-price')
    const elChange = document.querySelector('.stock-change')

    try {
        const stock = await getApiData(symbol, 'stockData')
        elName.innerText = stock.profile.companyName
        elImage.src = stock.profile.image
        elDesc.innerText = stock.profile.description
        elLink.href = stock.profile.website


        elPrice.innerText = `stock price: ${stock.profile.price}$`
        elChange.innerText = `(${stock.profile.changes}%)`
        elChange.innerText.includes('-') ? elChange.style.color = 'red' : elChange.style.color = 'green'
    } catch (error) {
        console.log('unable to get data', error)
    }
}

async function renderChart() {
    try {
        const history = await getApiData(symbol, 'stockHistory')

        const labels = history.historical.map(entry => entry.date).reverse()
        const data = history.historical.map(entry => entry.close).reverse()
        const ctx = document.getElementById('myChart')

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock Price',
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    } catch (error) {
        console.log('unable to get data', error)
    }
    finally {
        document.querySelector('.spinner-border').style.display = 'none'
    }
}
