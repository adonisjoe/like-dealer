const { createApp, ref } = Vue


async function fetchCardData(fetchUrl) {
    try {
        return await (await fetch(fetchUrl)).json();
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}

createApp({
    setup() {
        const message = ref('Hello vue!')
        const URL = 'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/services';
        const platformCards = ref([])
        const uniquePlatformCards = ref([])

        fetchCardData(URL).then(cardsData => {
            platformCards.value = cardsData.services;

            for (const value of platformCards.value) {
                if (uniquePlatformCards.value.filter(card => card.platform === value.platform).length < 1) {
                    uniquePlatformCards.value.push(value);
                }
            }

            for (const card of uniquePlatformCards.value) {
                card.svgUrl = `./assets/cardLogos/${card.platform}.svg`;
                card.url = `./${card.platform}`;
            }
        })





        return {
            message,
            platformCards,
            uniquePlatformCards
        }
    }
}).mount('#home')