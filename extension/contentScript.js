function isInRange(address, min, max) {
    return fetch("https://lexa.realestate.com.au/graphql", {
        "body": JSON.stringify({
            "operationName": "searchByQuery",
            "variables": {
                "query": JSON.stringify({
                    "channel": "buy",
                    "page": 1,
                    "pageSize": 25,
                    "localities": [
                        {
                            "searchLocation": address
                        }
                    ],
                    "filters": {
                        "priceRange": {
                            "minimum": String(min),
                            "maximum": String(max)
                        },
                        "surroundingSuburbs": false,
                        "excludeNoSalePrice": false,
                        "ex-under-contract": false,
                        "furnished": false,
                        "petsAllowed": false
                    }
                }),
                "testListings": false,
                "nullifyOptionals": false
            },
            "extensions": {
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": "99d4de6f3eb9820682a7e02eaf125cfd2d5b90a10109daf4daa3b87267f5fde3"
                }
            }
        }),
        "method": "POST",
        "credentials": "include"
    })
    .then(result => result.json())
    .then(response => {
        console.log(response.data.buySearch.results.exact.items)
        return response.data.buySearch.results.exact.items && response.data.buySearch.results.exact.items.length >= 1;
    });
}

function closestThousand(number) {
    return Math.round(number / 1000) * 1000;
}

function findPrice(address, min=0, max=15000000) {
    const halfway = Math.ceil((min + max) / 2);
    if (max - min < 1000) {
        return Promise.resolve(closestThousand(halfway));
    }
    return isInRange(address, min, halfway)
    .then(inRange => inRange
        ? findPrice(address, min, halfway)
        : findPrice(address, halfway, max));
}

function onGetPrice(button, listingElement, address, event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Fetching price for ' + address);
    button.textContent = 'Fetching...';
    findPrice(address)
    .then((price) => {
        const formatted = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            maximumSignificantDigits: 3
        }).format(price);
        button.textContent = formatted;
    })
    .catch(() => {
        button.textContent = 'Failed to fetch';
    });
}

function addButtonToSearchResult(listingElement) {
    const address = listingElement.querySelector('.residential-card__address-heading').textContent;
    button = document.createElement('button');
    button.textContent = 'Get Real Price';
    button.setAttribute('class', 'realPriceButton');
    button.addEventListener('click', onGetPrice.bind(null, button, listingElement, address));
    listingElement.appendChild(button);
}

function addButtonToListingPage(listingElement) {
    const address = listingElement.querySelector('.property-info-address').textContent;
    button = document.createElement('button');
    button.textContent = 'Get Real Price';
    button.setAttribute('class', 'realPriceButton');
    button.addEventListener('click', onGetPrice.bind(null, button, listingElement, address));
    listingElement.appendChild(button);
}

function clearButtons() {
    document.querySelectorAll('.realPriceButton').forEach(e => e.parentNode.removeChild(e));;
}

function drawButtons() {
    clearButtons();

    // search results
    const elements = document.querySelectorAll('.residential-card__content');
    elements.forEach(element => {
        addButtonToSearchResult(element);
    });

    // individual page
    const element = document.querySelector('.property-info__header');
    if (element) {
        addButtonToListingPage(element);
    }
}

window.addEventListener('load', function() {
    drawButtons();

    const updateButton = document.querySelector('button[type="submit"]');
    if (updateButton.textContent === "Update") {
        updateButton.addEventListener('click', () => {
            clearButtons();
            setTimeout(() => {
                drawButtons();
            }, 2000);
        });
    }
});