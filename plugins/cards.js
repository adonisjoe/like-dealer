// Function to select HTML elements
function elementsSelect() {
  const hiddenEl = document.querySelector('#inner');
  const instagramLikeElement = document.querySelector(
    '.gcard-value--instagram-like'
  );
  const instagramFollowerElement = document.querySelector(
    '.gcard-value--instagram-followers'
  );
  const tiktokVideoElement = document.querySelector(
    '.gcard-value--tiktok-likes'
  );
  const tiktokFollowersElement = document.querySelector(
    '.gcard-value--tiktok-followers'
  );
  const facebookPostElement = document.querySelector(
    '.gcard-value--facebook-post'
  );
  const facebookLikesElement = document.querySelector(
    '.gcard-value--facebook-likes'
  );
  const youtubeSubscriberElement = document.querySelector(
    '.gcard-value--subscribers'
  );
  const youtubeViewsElement = document.querySelector('.gcard-value--views');
  const youtubeLikesElement = document.querySelector('.gcard-value--likes');

  return {
    hiddenEl,
    facebookLikesElement,
    facebookPostElement,
    tiktokVideoElement,
    tiktokFollowersElement,
    instagramLikeElement,
    instagramFollowerElement,
    youtubeSubscriberElement,
    youtubeViewsElement,
    youtubeLikesElement,
  };
}

// Destructure the selected elements
const {
  facebookLikesElement,
  facebookPostElement,
  tiktokVideoElement,
  tiktokFollowersElement,
  instagramLikeElement,
  instagramFollowerElement,
  youtubeSubscriberElement,
  youtubeViewsElement,
  youtubeLikesElement,
} = elementsSelect();

// Function to capitalize a string
function capitalize(inputString) {
  if (!inputString) {
    return '';
  }
  return inputString
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Function to get cards by platform
function getCardsByPlatform(cards, platform) {
  return cards.filter((card) => card?.platform === platform);
}

// Function to loop through data
function loopData(productData) {
  return productData?.map((data) => data);
}

// Function to filter card information
function filterCardInfo(cardData) {
  const PER_1000 = ' per 1k';
  const MINIMUM_ORDER = 'Minimum order 1000.';

  // Update the card information here
  const facebookData = filterProducts(cardData, 'facebook');
  const [facebookPost, facebookPage] = loopData(facebookData);

  if (checkProductElement(facebookLikesElement, facebookPostElement)) {
    updateCardDetail(facebookPost, facebookPostElement, PER_1000);
    updateCardDetail(facebookPage, facebookLikesElement, PER_1000);

    updateCardUrl('.gcard-facebook-post', facebookPost.paymentUrl);
    updateCardUrl('.gcard-facebook-page', facebookPage.paymentUrl);
  }

  const tiktokData = filterProducts(cardData, 'tiktok');
  const [tiktokLikes, tiktokFollowers] = loopData(tiktokData);

  if (checkProductElement(tiktokVideoElement, tiktokFollowersElement)) {
    updateCardDetail(tiktokLikes, tiktokVideoElement, PER_1000);
    updateCardDetail(tiktokFollowers, tiktokFollowersElement, PER_1000);

    updateCardUrl('.gcard-tiktok-likes', tiktokLikes.paymentUrl);
    updateCardUrl('.gcard-tiktok-followers', tiktokFollowers.paymentUrl);
  }

  const instagramData = filterProducts(cardData, 'instagram');
  const [instagramLikes, instagramFollowers] = loopData(instagramData);

  if (checkProductElement(instagramLikeElement, instagramFollowerElement)) {
    updateCardDetail(instagramLikes, instagramLikeElement, PER_1000);
    updateCardDetail(instagramFollowers, instagramFollowerElement, PER_1000);

    updateCardUrl('.gcard-instagram-likes', instagramLikes.paymentUrl);
    updateCardUrl('.gcard-instagram-follower', instagramFollowers.paymentUrl);
  }

  const youtubeData = filterProducts(cardData, 'youtube');
  const [youtubeSubscribers, youtubeViews, youtubeLikes] =
    loopData(youtubeData);

  if (
    checkProductElement(
      youtubeSubscriberElement,
      youtubeViewsElement,
      youtubeLikesElement
    )
  ) {
    updateCardDetail(youtubeSubscribers, youtubeSubscriberElement, PER_1000);
    updateCardDetail(youtubeLikes, youtubeLikesElement, PER_1000);
    updateCardDetail(youtubeViews, youtubeViewsElement, PER_1000);

    updateCardUrl('.gcard-youtube-likes', youtubeLikes.paymentUrl);
    updateCardUrl('.gcard-youtube-views', youtubeViews.paymentUrl);
    updateCardUrl('.gcard-youtube-subscribers', youtubeSubscribers.paymentUrl);
  }
}

// Function to update card URL
function updateCardUrl(className, cardURL) {
  document.querySelector(className).addEventListener('click', function (e) {
    window.open(cardURL, '_blank');
    e.preventDefault();
  });
}

// Function to update card detail
function updateCardDetail(productType, productEl, pricePer) {
  return (productEl.textContent = productType?.pricePer1000 + pricePer);
}

// Function to check if product elements exist
function checkProductElement(productEl, productEl1, productEl2 = '') {
  return productEl || productEl1 || productEl2;
}

// Function to filter products by platform
function filterProducts(data, platform) {
  return data?.services?.filter((data) => data?.platform === platform);
}

// Function to fetch card data from an API
async function fetchCardData(fetchUrl) {
  try {
    await fetch(fetchUrl).then((response) =>
      response?.json()?.then((cardData) => {
        if (!cardData) {
          throw new Error('Network response was not ok');
        }
        // Update card information
        filterCardInfo(cardData);
      })
    );
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
}

// Example usage: Fetch card data from the API
fetchCardData(
  'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/services'
);
