async function fetchData(fetchUrl) {
    try {
        return await (await fetch(fetchUrl)).json();
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}
const { createApp, ref, computed } = Vue

createApp({
    setup() {
        const FILTER = 'instagram';
        const URL = 'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/services';
        const isLoading = ref(true)
        const servicesCards = ref([])
        const specificServiceCards = ref([])

        fetchData(URL).then(cardsData => {
            servicesCards.value = cardsData.services;

            for (const value of servicesCards.value) {
                if (value.platform === FILTER && value.visible) {
                    specificServiceCards.value.push(value);
                }
            }

            for (const card of specificServiceCards.value) {
                card.svgUrl = `../assets/cardLogos/${card.platform}.svg`;
            }

            isLoading.value = false;
        })

        const isCardsArrayEmpty = computed(() => {
            return specificServiceCards.value.length === 0;
        })

        // fetch static texts
        const texts = ref([])
        fetchData("https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/texts").then((response) => {
            texts.value = response.texts[0];
        })

        // fetch social media profiles
        // const profiles = ref([])
        // fetchData("https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/profiles").then((response) => {
        // profiles.value = response.profiles;

        // display social media profile with icons at the bottom of the page, below disclaimer
        // })

        return {
            texts,
            // profiles,
            isCardsArrayEmpty,
            specificServiceCards
        }
    }
}).mount('#page')

