const modal = document.querySelector('.modal');
const hiddenEl = document.querySelector('#inner');

const button = document.querySelector('.button');

const formTitleEl = document.querySelector('.form-title');
const instagramLikeElement = document.querySelector(
  '.gcard-value--instagram-like'
);
const instagramFollowerElement = document.querySelector(
  '.gcard-value--instagram-followers'
);

const instagramLikeTitleElement = document.querySelector(
  '.gcard-value--instagram-like-title'
);
const instagramFollowerTitleElement = document.querySelector(
  '.gcard-value--instagram-followers-title'
);

const tiktokVideoElement = document.querySelector('.gcard-value--tiktok-likes');
const tiktokFollowersElement = document.querySelector(
  '.gcard-value--tiktok-followers'
);
const tiktokVideoTitleElement = document.querySelector(
  '.gcard-value--tiktok-likes-title'
);
const tiktokFollowersTitleElement = document.querySelector(
  '.gcard-value--tiktok-followers-title'
);

const facebookPostElement = document.querySelector(
  '.gcard-value--facebook-post'
);
const facebookLikesElement = document.querySelector(
  '.gcard-value--facebook-likes'
);
const facebookPostTitleElement = document.querySelector(
  '.gcard-value--facebook-post-title'
);
const facebookLikesTitleElement = document.querySelector(
  '.gcard-value--facebook-likes-title'
);

const youtubeSubscriberElement = document.querySelector(
  '.gcard-value--subscribers'
);
const youtubeViewsTitleElement = document.querySelector(
  '.gcard-value--views-title'
);
const youtubeLikesTitleElement = document.querySelector(
  '.gcard-value--likes-title'
);
const youtubeSubscriberTitleElement = document.querySelector(
  '.gcard-value--subscribers-title'
);
const youtubeViewsElement = document.querySelector('.gcard-value--views');
const youtubeLikesElement = document.querySelector('.gcard-value--likes');

function generateUniqueID(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueID = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueID += characters.charAt(randomIndex);
  }

  return uniqueID;
}

const uniqueID = generateUniqueID(12);
console.log(uniqueID);

// Function that capitalise for word of every word
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

// function that checks for the user input
function formAuth() {
  modal.style.display = 'none';
  document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close-button');
    hiddenEl.style.opacity = 1;

    const authForm = document.getElementById('authForm');

    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
      hiddenEl.style.opacity = 0;
    });

    authForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const usernameInput = document.getElementById('username');
      const amountInput = document.getElementById('amount');
      const message = document.getElementById('message');

      const username = usernameInput.value;
      const amount = amountInput.value;

      if (username.length > 0 && username.length <= 15) {
        message.textContent = 'Your request is sent successfully';
        message.style.textAlign = 'center';
        function sendPostRequest() {
          const postData = {
            orderId: `${uniqueID}`,
            serviceId: `${uniqueID}`,
            link: `${username}`,
            amount: `${amount}`,
          };

          console.log(postData);

          const apiUrl =
            'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/orders'; // Replace with your API endpoint

          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Response:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }

        sendPostRequest();
        setTimeout(() => {
          modal.style.display = 'none';
        }, 2000);
      } else {
        message.textContent = 'Username must be between 1 and 15 characters.';
      }
    });
  });
}

// Assuming you have a function to update the card information
function filterCardInfo(cardData) {
  // Update the card information here
  const facebookData = cardData?.services?.filter(
    (data) => data?.platform?.toLowerCase?.() == 'facebook'
  );
  const [facebookPost, facebookPage] = facebookData;

  if (
    facebookLikesElement ||
    facebookPostElement ||
    facebookPostTitleElement ||
    facebookLikesTitleElement
  ) {
    facebookPostElement.textContent = facebookPost?.pricePer1000;
    facebookLikesElement.textContent = facebookPage?.pricePer1000;
    facebookPostTitleElement.textContent = capitalize(facebookPost?.name);
    facebookLikesTitleElement.textContent = capitalize(facebookPage?.name);
  }

  const tiktokData = cardData?.services?.filter(
    (data) => data?.platform === 'tiktok'
  );

  const [tiktokLikes, tiktokFollowers] = tiktokData;

  if (
    tiktokVideoElement ||
    tiktokFollowersElement ||
    tiktokVideoTitleElement ||
    tiktokFollowersTitleElement
  ) {
    tiktokVideoElement.textContent = tiktokLikes.pricePer1000;
    tiktokFollowersElement.textContent = tiktokFollowers.pricePer1000;
    tiktokVideoTitleElement.textContent = capitalize(tiktokLikes.name);
    tiktokFollowersTitleElement.textContent = capitalize(tiktokFollowers.name);
  }

  const instagramData = cardData?.services?.filter(
    (data) => data?.platform?.toLowerCase?.() == 'instagram'
  );
  const [instagramLikes, instagramFollowers] = instagramData;

  if (
    instagramLikeElement ||
    instagramFollowerElement ||
    instagramLikeTitleElement ||
    instagramFollowerTitleElement
  ) {
    instagramLikeElement.textContent = instagramLikes.pricePer1000;
    instagramFollowerElement.textContent = instagramFollowers.pricePer1000;
    instagramLikeTitleElement.textContent = capitalize(instagramLikes.name);
    instagramFollowerTitleElement.textContent = capitalize(
      instagramFollowers.name
    );
  }

  const youtubeData = cardData?.services?.filter(
    (data) => data?.platform?.toLowerCase?.() == 'youtube'
  );

  const [youtubeSubscribers, youtubeViews, youtubeLikes] = youtubeData;

  if (
    youtubeSubscriberElement ||
    youtubeViewsElement ||
    youtubeLikesElement ||
    youtubeViewsTitleElement ||
    youtubeLikesTitleElement ||
    youtubeSubscriberTitleElement
  ) {
    youtubeSubscriberElement.textContent = youtubeSubscribers.pricePer1000;
    youtubeViewsElement.textContent = capitalize(youtubeViews.pricePer1000);
    youtubeLikesElement.textContent = capitalize(youtubeLikes.pricePer1000);
    youtubeViewsTitleElement.textContent = capitalize(youtubeSubscribers.name);
    youtubeLikesTitleElement.textContent = capitalize(youtubeViews.name);
    youtubeSubscriberTitleElement.textContent = capitalize(youtubeLikes.name);
  }

  cards.addEventListener('click', (e) => {
    const clickedElement = e.target.closest('.gcard');

    function renderFormUI(className, pageType, formBtnTheme, formTitleTheme) {
      if (clickedElement.classList.contains(className)) {
        formTitleEl.textContent = capitalize(pageType.name);
        formTitleEl.classList.add(formTitleTheme);
        button.classList.add(formBtnTheme);
        modal.style.display = 'block';
      }
    }

    renderFormUI(
      'gcard-instagram-likes',
      instagramLikes,
      'button--instagram',
      'form-title--gradient-bg'
    );

    renderFormUI(
      'gcard-instagram-follower',
      instagramFollowers,
      'button--instagram',
      'form-title--gradient-bg'
    );

    renderFormUI(
      'gcard-tiktok-likes',
      tiktokLikes,
      'button--tiktok',
      'form-title--gradient-bg'
    );
    renderFormUI(
      'gcard-tiktok-followers',
      tiktokFollowers,
      'button--tiktok',
      'form-title--gradient-bg'
    );
    renderFormUI(
      'gcard-youtube-likes',
      youtubeLikes,
      'button--youtube',
      'form-title-youtube--gradient-bg'
    );
    renderFormUI(
      'gcard-youtube-subscribers',
      youtubeSubscribers,
      'button--youtube',
      'form-title-youtube--gradient-bg'
    );
    renderFormUI(
      'gcard-youtube-views',
      youtubeViews,
      'button--youtube',
      'form-title-youtube--gradient-bg'
    );
    renderFormUI(
      'gcard-facebook-post',
      facebookPost,
      'button--facebook',
      'form-title-facebook--gradient-bg'
    );
    renderFormUI(
      'gcard-facebook-page',
      facebookPage,
      'button--facebook',
      'form-title-facebook--gradient-bg'
    );
  });
}

// Fetch card data from the API
async function fetchCardData() {
  try {
    const response = await fetch(
      'https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/ldServices/services'
    );
    if (!response?.ok) {
      throw new Error('Network response was not ok');
    }
    const cardData = await response?.json();

    // Update card information
    filterCardInfo(cardData);
  } catch (error) {
    console.error('Error fetching card data:', error);
  }
}

// Call the fetchCardData function to update card information
fetchCardData();
formAuth();
const newId = nanoid();
console.log(newId);
