// Function to select HTML elements
function elementsSelect() {
  const hiddenEl = document.querySelector('#inner');
  const instagramLikeElement = document.querySelector(
    '.gcard-value--instagram-like'
  );
  const instagramFollowerElement = document.querySelector(
    '.gcard-value--instagram-followers'
  );
  const instagramFollowerTitle = document.querySelector(
    '.gcard-value--instagram-followers-title'
  );
  const instagramLikeTitle = document.querySelector(
    '.gcard-value--instagram-like-title'
  );

  const tiktokVideoElement = document.querySelector(
    '.gcard-value--tiktok-likes'
  );
  const tiktokFollowersElement = document.querySelector(
    '.gcard-value--tiktok-followers'
  );
  const tiktokFollowerTitle = document.querySelector(
    '.gcard-value--tiktok-followers-title'
  );
  const tiktokLikeTitle = document.querySelector(
    '.gcard-value--tiktok-likes-title'
  );
  const facebookPostElement = document.querySelector(
    '.gcard-value--facebook-post'
  );
  const facebookLikesElement = document.querySelector(
    '.gcard-value--facebook-likes'
  );
  const facebookPostTitle = document.querySelector(
    '.gcard-value--facebook-post-title'
  );
  const facebookLikesTitle = document.querySelector(
    '.gcard-value--facebook-likes-title'
  );
  const youtubeSubscriberElement = document.querySelector(
    '.gcard-value--subscribers'
  );

  const youtubeSubscriberTitle = document.querySelector(
    '.gcard-value--subscribers-title'
  );

  const cardsEl = document.querySelectorAll('.gcard');
  const youtubeViewTitle = document.querySelector('.gcard-value--views-title');
  const youtubeLikesTitle = document.querySelector('.gcard-value--likes-title');

  const youtubeViewsElement = document.querySelector('.gcard-value--views');
  const youtubeLikesElement = document.querySelector('.gcard-value--likes');

  return {
    hiddenEl,
    facebookLikesElement,
    facebookPostElement,
    facebookPostTitle,
    facebookLikesTitle,
    tiktokVideoElement,
    tiktokFollowersElement,
    tiktokFollowerTitle,
    tiktokLikeTitle,
    instagramLikeElement,
    instagramLikeTitle,
    instagramFollowerTitle,
    instagramFollowerElement,
    youtubeSubscriberElement,
    youtubeViewsElement,
    youtubeLikesElement,
    youtubeSubscriberTitle,
    youtubeViewTitle,
    youtubeLikesTitle,
    cardsEl,
  };
}

// Destructure the selected elements
const {
  facebookLikesElement,
  facebookPostElement,
  facebookPostTitle,
  facebookLikesTitle,
  tiktokVideoElement,
  tiktokFollowersElement,
  tiktokFollowerTitle,
  tiktokLikeTitle,
  instagramLikeElement,
  instagramFollowerElement,
  instagramLikeTitle,
  instagramFollowerTitle,
  youtubeSubscriberElement,
  youtubeViewsElement,
  youtubeLikesElement,
  youtubeSubscriberTitle,
  youtubeViewTitle,
  youtubeLikesTitle,
  cardsEl,
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
  return productData.map((data) => data);
}

// Function to filter card information
function filterCardInfo(cardData) {
  const PER_1000 = ' per 1k';
  const MINIMUM_ORDER = 'Minimum order 1000.';

  // Update the card information here
  const facebookData = filterProducts(cardData, 'facebook');
  const [facebookPost, facebookPage] = loopData(facebookData);

  if (checkProductElement(facebookLikesElement, facebookPostElement)) {
    updateCardDetail(
      facebookPost,
      facebookPostElement,
      PER_1000,
      facebookPostTitle
    );
    updateCardDetail(
      facebookPage,
      facebookLikesElement,
      PER_1000,
      facebookLikesTitle
    );

    updateCardUrl('.gcard-facebook-post', facebookPost?.paymentUrl);
    updateCardUrl('.gcard-facebook-page', facebookPage?.paymentUrl);
  }

  const tiktokData = filterProducts(cardData, 'tiktok');
  const [tiktokLikes, tiktokFollowers] = loopData(tiktokData);

  if (checkProductElement(tiktokVideoElement, tiktokFollowersElement)) {
    updateCardDetail(
      tiktokLikes,
      tiktokVideoElement,
      PER_1000,
      tiktokLikeTitle
    );
    updateCardDetail(
      tiktokFollowers,
      tiktokFollowersElement,
      PER_1000,
      tiktokFollowerTitle
    );

    updateCardUrl('.gcard-tiktok-likes', tiktokLikes.paymentUrl);
    updateCardUrl('.gcard-tiktok-followers', tiktokFollowers.paymentUrl);
  }

  const instagramData = filterProducts(cardData, 'instagram');
  const [instagramLikes, instagramFollowers] = loopData(instagramData);

  if (checkProductElement(instagramLikeElement, instagramFollowerElement)) {
    updateCardDetail(
      instagramLikes,
      instagramLikeElement,
      PER_1000,
      instagramLikeTitle
    );
    updateCardDetail(
      instagramFollowers,
      instagramFollowerElement,
      PER_1000,
      instagramFollowerTitle
    );

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
    updateCardDetail(
      youtubeSubscribers,
      youtubeSubscriberElement,
      PER_1000,
      youtubeSubscriberTitle
    );
    updateCardDetail(
      youtubeLikes,
      youtubeLikesElement,
      PER_1000,
      youtubeLikesTitle
    );
    updateCardDetail(
      youtubeViews,
      youtubeViewsElement,
      PER_1000,
      youtubeViewTitle
    );

    updateCardUrl('.gcard-youtube-likes', youtubeLikes?.paymentUrl);
    updateCardUrl('.gcard-youtube-views', youtubeViews?.paymentUrl);
    updateCardUrl('.gcard-youtube-subscribers', youtubeSubscribers?.paymentUrl);
  }
}

// Function to update card URL
function updateCardUrl(className, cardURL) {
  document.querySelector(className)?.addEventListener('click', function (e) {
    cardURL && window.open(cardURL, '_blank');
    e.preventDefault();
  });
}

// Function to update card detail
function updateCardDetail(productType, productEl, pricePer, titleEL = '') {
  productEl.textContent = productType
    ? productType?.pricePer1000 + pricePer
    : capitalize(`not available`);
  titleEL.textContent = capitalize(productType?.type);
}

// Function to check if product elements exist
function checkProductElement(productEl, productEl1, productEl2 = '') {
  return (productEl && productEl1) || productEl2;
}

// Function to filter cards by visibility
function filterCards(data) {
  return data?.visible;
}

// Function to filter products by platform
function filterProducts(data, platform) {
  return data?.services
    ?.filter((data) => data?.platform === platform)
    ?.filter((data) => data?.visible);
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
