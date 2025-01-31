import { getApiData } from './api.service.js'

export class Marquee {
    constructor(containerElement) {
        this.containerElement = containerElement
    }

    async render() {
        try {
            const marquee = await getApiData('', 'marquee')
            const slicedMarquee = marquee.slice(0, 200)

            const marquee1 = document.createElement('ul')
            const marquee2 = document.createElement('ul')
            marquee1.classList.add('marquee-content-1')
            marquee2.classList.add('marquee-content-2')

            let strHTML = ''
            slicedMarquee.map((stock) => {
                strHTML += `<li>${stock.symbol} - ${stock.price}</li>`
            })

            marquee1.innerHTML = strHTML
            marquee2.innerHTML = strHTML
            this.containerElement.appendChild(marquee1)
            this.containerElement.appendChild(marquee2)

        } catch (error) {
            console.error('Error fetching or rendering data:', error)
        }
    }
}

