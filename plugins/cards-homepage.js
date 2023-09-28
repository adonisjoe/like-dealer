async function fetchData(fetchUrl) {
    try {
        return await (await fetch(fetchUrl)).json();
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}
const { createApp, ref } = Vue

createApp({
    setup() {
        const URL = 'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/services';
        const servicesCards = ref([])
        const isLoading = ref(true)

        const uniquePlatformCards = ref([])

        fetchData(URL).then(cardsData => {
            servicesCards.value = cardsData.services;

            for (const value of servicesCards.value) {
                if (uniquePlatformCards.value.filter(card => card.platform === value.platform).length < 1 && value.visible) {
                    uniquePlatformCards.value.push(value);
                }
            }

            for (const card of uniquePlatformCards.value) {
                card.svgUrl = `./assets/cardLogos/${card.platform}.svg`;
                card.url = `./${card.platform}`;
            }
            isLoading.value = false;
        })

        // fetch static texts
        const texts = ref([])
        fetchData("https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/texts").then((response) => {
            texts.value = response.texts[0];
        })

        return {
            uniquePlatformCards,
            texts,
        }
    }
}).mount('#page')