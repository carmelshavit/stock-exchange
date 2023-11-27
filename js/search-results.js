// import { SearchResults } from './search-results.js'
import { getApiData } from './api.service.js'; // Import necessary functions from your API module

export class SearchResults {
    constructor(containerElement) {
        this.containerElement = containerElement
    }
    async renderStocks() {
        try {
            // Assuming searchInput is defined somewhere in your code
            const stocksList = await getApiData(searchInput.value, 'stocksList');
            const symbolsStr = await symbolArr(stocksList);
            const stocksProfiles = await getApiData(symbolsStr, 'stockData');

            // Create the ul dynamically inside the specified container element
            const ul = document.createElement('ul');
            ul.className = 'stocks-list'; // Assuming you still want to assign this class

            stocksList.forEach((stock, index) => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                const change = document.createElement('span');
                const company = document.createElement('a');
                const button = document.createElement('button');

                li.appendChild(img);
                li.appendChild(company);
                li.appendChild(change);
                li.appendChild(button);

                img.className = `stock-img-${index}`;
                change.className = `stock-change-${index}`;
                li.className = 'stock-list-item';
                button.className = 'stock-button';

                company.href = `./company.html?symbol=${stock.symbol}`;
                company.innerText = `${stock.name} (${stock.symbol})`;
                button.innerText = 'compare';
                ul.appendChild(li);
            });

            stocksProfiles.companyProfiles.forEach((stock, index) => {
                const img = document.querySelector(`.stock-img-${index}`);
                const change = document.querySelector(`.stock-change-${index}`);
                if (stock.profile.changes) change.innerText = `(${stock.profile.changes}%)`;
                img.src = stock.profile.image;
                img.onerror = () => (img.src = 'https://www.freeiconspng.com/uploads/stock-exchange-icon-png-11.png');
                change.innerText.includes('-') ? (change.style.color = 'red') : (change.style.color = 'green');
            });

            // Append the dynamically created ul to the container element
            this.containerElement.appendChild(ul);
        } catch (error) {
            console.log(error);
        }
    }
}
async function symbolArr(stocksList) {
    const symbolArr = stocksList.map(stock => {
        return stock.symbol
    })
    const symbolsString = symbolArr.join()
    return symbolsString
}