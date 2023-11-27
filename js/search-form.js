
export class SearchForm {
    constructor(containerElement) {
        this.containerElement = containerElement
    }

    async createInput() {
        // const form = document.querySelector(".form")
        const searchInput = document.createElement("input")
        searchInput.className = "search-input"
        searchInput.type = "text"
        searchInput.placeholder = "Search stocks"
        this.containerElement.appendChild(searchInput)
        // form.appendChild(searchInput)
        // const button = document.createElement("button")
        // button.className = "search-btn"
        // button.innerText = "Search"
        // form.appendChild(button)


        button.addEventListener('click', async event => {
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
        // var urlParams = new URLSearchParams(window.location.search)
        // const query = urlParams.get('query')

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
    }
}
