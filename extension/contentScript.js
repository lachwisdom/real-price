function isInRange(address, min, max) {
    return fetch("https://lexa.realestate.com.au/graphql", {
        "body": JSON.stringify({
            "operationName": "searchByQuery",
            "variables": {
                "query": JSON.stringify({
                    "channel": "sold",
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
            "query": "query searchByQuery($query:SearchQueryJson!,$testListings:Boolean!)@debug(testListings:$testListings){soldSearch(query:$query){leadGen{...LeadGenData __typename}marketInsights{...ResultsMarketInsightsData __typename}exclusiveShowcase{...CommonExclusiveShowcaseData __typename}...SoldResultsMetaData resolvedQuery{...SearchMetadata...ResultsHeading...SeoFooterLinks...Preferences...SearchResultsBreadcrumb...ResultsLocalities __typename}results{...SearchResultsTotalCount...ResultsPagination...ResultsSummary...ResultsTracking...ResultsSetHeader...SoldResultsSet exact{items{listing{...ResidentialListingCache...PropertyCard...SoldDetailsAboveTheFold __typename}__typename}__typename}surrounding{items{listing{...ResidentialListingCache...PropertyCard...SoldDetailsAboveTheFold __typename}__typename}__typename}trackingData __typename}__typename}}fragment LeadGenData on LeadGen{actionUrl data{listingCompany{id name branding{primaryColour __typename}media{logo{templatedUrl __typename}__typename}__typename}__typename}__typename}fragment ResultsMarketInsightsData on MarketInsights{title suburbProfileUrl{href __typename}__typename}fragment CommonExclusiveShowcaseData on ExclusiveShowcase{listings{title id listingCompany{id name media{logo{templatedUrl __typename}__typename}branding{primaryColour textColour __typename}__typename}media{mainImage{templatedUrl __typename}images{templatedUrl __typename}__typename}address{suburb display{shortAddress __typename}__typename}listers{name photo{templatedUrl __typename}__typename}_links{trackedCanonical{path __typename}__typename}...PrimaryFeatures __typename}bookingId __typename}fragment PrimaryFeatures on ResidentialListing{...GeneralFeatures...PropertySize __typename}fragment GeneralFeatures on ResidentialListing{generalFeatures{bedrooms{value __typename}bathrooms{value __typename}parkingSpaces{value __typename}__typename}__typename}fragment PropertySize on ResidentialListing{propertySizes{building{displayValue sizeUnit{displayValue __typename}__typename}land{displayValue sizeUnit{displayValue __typename}__typename}preferred{sizeType size{displayValue sizeUnit{displayValue __typename}__typename}__typename}__typename}__typename}fragment SoldResultsMetaData on SoldResolvedSearch{resolvedQuery{localities{display __typename}__typename}results{__typename totalResultsCount pagination{moreResultsAvailable __typename}exact{items{listing{__typename...on SoldResidentialListing{_links{canonical{href __typename}__typename}__typename}...ResidentialListingAddressMetaData}__typename}__typename}}__typename}fragment ResidentialListingAddressMetaData on ResidentialListing{address{display{shortAddress fullAddress __typename}suburb state postcode __typename}__typename}fragment SearchMetadata on ResolvedQuery{metadata{canonicalSearchId savedSearchQuery __typename}__typename}fragment ResultsHeading on ResolvedQuery{localities{display __typename}__typename}fragment SeoFooterLinks on ResolvedQuery{localities{display atlasId urlValue precision name __typename}__typename}fragment Preferences on ResolvedQuery{localities{state __typename}__typename}fragment SearchResultsBreadcrumb on ResolvedQuery{localities{atlasId display name urlValue precision state parents{display name urlValue precision __typename}__typename}__typename}fragment ResultsLocalities on ResolvedQuery{localities{display precision __typename}__typename}fragment SearchResultsTotalCount on SearchResults{totalResultsCount __typename}fragment ResultsPagination on SearchResults{pagination{maxPageNumberAvailable __typename}__typename}fragment ResultsSummary on SearchResults{totalResultsCount pagination{page pageSize __typename}__typename}fragment ResultsTracking on SearchResults{trackingData __typename}fragment ResultsSetHeader on SearchResults{totalResultsCount __typename}fragment SoldResultsSet on SoldSearchResults{exact{items{listing{__typename}__typename}__typename}surrounding{totalCount items{listing{__typename}__typename}__typename}pagination{page __typename}__typename}fragment ResidentialListingCache on ResidentialListing{id __typename}fragment PropertyCard on Listing{__typename...ResidentialPropertyCard...ProjectProfile}fragment ResidentialPropertyCard on ResidentialListing{...PropertyCardLayout...BrandingOnSearchResultsConfig...BrandingResidential badge{...Badge __typename}...ResidentialListingCardHero...Price...ResidentialListingCardAddress...PropertyCardPropertyType...PropertyCardDetailsLink...PropertyCardAgentInfo...ResidentialLaunchButtons...ResidentialMediaViewerForResults...ResidentialListingBookmark...PrimaryFeatures...PropertySize...ResidentialListingCardInspection...InspectionAuction...DateSold...ResidentialListingMoreButton...ResidentialShareListing __typename}fragment PropertyCardLayout on ResidentialListing{productDepth __typename}fragment BrandingOnSearchResultsConfig on ResidentialListing{viewConfiguration{searchResults{agencyBranding __typename}__typename}productDepth __typename}fragment BrandingResidential on ResidentialListing{listingCompany{...Branding __typename}__typename}fragment Branding on ListingCompany{id name branding{primaryColour __typename}media{logo{templatedUrl __typename}__typename}__typename}fragment Badge on ListingBadge{colour label __typename}fragment ResidentialListingCardHero on ResidentialListing{...PowerProfileSlide productDepth address{display{fullAddress __typename}__typename}media{mainImage{templatedUrl __typename}images{templatedUrl __typename}floorplans{templatedUrl __typename}__typename}__typename}fragment PowerProfileSlide on ResidentialListing{media{mainImage{templatedUrl __typename}__typename}_links{canonical{path __typename}__typename}listingCompany{name media{logo{templatedUrl __typename}__typename}branding{primaryColour __typename}_links{canonical{href __typename}__typename}__typename}listers{id agentId name jobTitle photo{templatedUrl __typename}_links{canonical{href __typename}__typename}showInMediaViewer __typename}__typename}fragment Price on ResidentialListing{price{display __typename}__typename}fragment ResidentialListingCardAddress on ResidentialListing{address{suburb display{shortAddress __typename}__typename}__typename}fragment PropertyCardPropertyType on ResidentialListing{propertyType{display __typename}__typename}fragment PropertyCardDetailsLink on ResidentialListing{_links{canonical{path __typename}__typename}__typename}fragment PropertyCardAgentInfo on ResidentialListing{viewConfiguration{searchResults{agentPhoto agentName __typename}__typename}listers{name photo{templatedUrl __typename}__typename}listingCompany{branding{textColour __typename}__typename}__typename}fragment ResidentialLaunchButtons on ResidentialListing{media{threeDimensionalTours{href __typename}videos{...on YouTubeVideo{id __typename}...on ExternalVideo{href __typename}__typename}__typename}__typename}fragment ResidentialMediaViewerForResults on ResidentialListing{...ResultsAdConfiguration...ResidentialSlides __typename}fragment ResultsAdConfiguration on ResidentialListing{viewConfiguration{searchResults{adverts{photoGallery __typename}__typename}__typename}__typename}fragment ResidentialSlides on ResidentialListing{...PowerProfileSlide...MediaViewerEventTracking...ThreeDimensionalTourSlide...VideoSlide...PhotoOverlayWithGallerySlide media{images{templatedUrl __typename}floorplans{templatedUrl __typename}__typename}__typename}fragment MediaViewerEventTracking on ResidentialListing{listers{id agentId __typename}__typename}fragment ThreeDimensionalTourSlide on ResidentialListing{media{threeDimensionalTours{href __typename}__typename}__typename}fragment VideoSlide on ResidentialListing{media{videos{...on YouTubeVideo{__typename id}__typename}__typename}__typename}fragment PhotoOverlayWithGallerySlide on ResidentialListing{...BuilderProfile...ParentAndSiblings __typename}fragment BuilderProfile on ResidentialListing{media{mainImage{templatedUrl __typename}__typename}listingCompany{...on Builder{name _links{canonical{templated href __typename}__typename}homeDesigns{totalCount designs{name price houseSizeRange{min{displayValue value __typename}max{displayValue value __typename}__typename}generalFeaturesDisplay{bedrooms bathrooms parkingSpaces __typename}_links{canonical{href templated __typename}__typename}media{mainImage{templatedUrl __typename}__typename}__typename}__typename}__typename}__typename}__typename}fragment ParentAndSiblings on BuyResidentialListing{id media{mainImage{templatedUrl __typename}__typename}parent{name _links{canonical{path __typename}__typename}childListings{totalCount results{id media{mainImage{templatedUrl __typename}__typename}title price{display __typename}propertyType{display __typename}_links{canonical{path __typename}__typename}propertySizes{land{displayValue sizeUnit{id displayValue __typename}__typename}__typename}...PrimaryFeatures __typename}__typename}__typename}__typename}fragment ResidentialListingBookmark on ResidentialListing{id __typename}fragment ResidentialListingCardInspection on ResidentialListing{...on BuyResidentialListing{inspections{display{shortLabel longLabel __typename}__typename}__typename}...on RentResidentialListing{inspections{display{shortLabel longLabel __typename}__typename}__typename}__typename}fragment InspectionAuction on ResidentialListing{...AuctionDate...ResidentialListingCardInspection __typename}fragment AuctionDate on BuyResidentialListing{auction{dateTime{value display{shortLabel __typename}__typename}onlineLinks{href __typename}__typename}__typename}fragment DateSold on ResidentialListing{...on SoldResidentialListing{dateSold{display __typename}__typename}__typename}fragment ResidentialListingMoreButton on ResidentialListing{id __typename}fragment ResidentialShareListing on ResidentialListing{_links{canonical{href __typename}__typename}address{display{fullAddress __typename}__typename}__typename}fragment ProjectProfile on ProjectProfile{badge{...Badge __typename}...ProjectProfileCardParentListing...ProjectProfileCardAddress...ProjectProfileCardHero...ProjectProfileAgency...ProjectProfileBranding...ProjectProfileBookmark...PropertyCardChildListings...ProjectLaunchButtons...ProjectProfileNextOpenTime __typename}fragment ProjectProfileCardParentListing on ProjectProfile{name title productDepth _links{canonical{path __typename}__typename}__typename}fragment ProjectProfileCardAddress on ProjectProfile{address{suburb display{shortAddress __typename}__typename}__typename}fragment ProjectProfileCardHero on ProjectProfile{productDepth address{display{fullAddress __typename}__typename}media{mainImage{templatedUrl __typename}images{templatedUrl __typename}__typename}__typename}fragment ProjectProfileAgency on ProjectProfile{listingCompany{id name media{logo{templatedUrl __typename}__typename}__typename}viewConfiguration{searchResults{agencyBranding __typename}__typename}__typename}fragment ProjectProfileBranding on ProjectProfile{name productDepth media{logo{templatedUrl __typename}__typename}branding{primaryColour __typename}__typename}fragment ProjectProfileBookmark on ProjectProfile{id __typename}fragment PropertyCardChildListings on ProjectProfile{productDepth _links{canonical{path __typename}__typename}childListings{totalCount results{id price{display __typename}media{mainImage{templatedUrl __typename}__typename}address{display{fullAddress __typename}__typename}title _links{canonical{path __typename}__typename}...PrimaryFeatures __typename}__typename}__typename}fragment ProjectLaunchButtons on ProjectProfile{media{videos{...on YouTubeVideo{id __typename}...on ExternalVideo{href __typename}__typename}__typename}__typename}fragment ProjectProfileNextOpenTime on ProjectProfile{displayLocation{nextAvailableOpeningHours{nextAvailable{display{shortLabel longLabel __typename}__typename}__typename}__typename}__typename}fragment SoldDetailsAboveTheFold on SoldResidentialListing{aboveTheFoldId:id id badge{...Badge __typename}...Hero...Price...Address...ResidentialShareListing...Breadcrumb_ResidentialListing...PrimaryFeatures...PropertyCardPropertyType...PropertyInfoPosterBoard...DateSold...BrandingOnContactAgentPanelConfig...ResidentialContactAgentBranding...AgentInfo...AgencyInfo...HeaderLeaderboard...ListingCompanyHeaderBranding...ResidentialListingMetaData...Disclaimer __typename}fragment Hero on ResidentialListing{...HeroImage...ResidentialMediaTypeBar __typename}fragment HeroImage on ResidentialListing{address{display{fullAddress __typename}__typename}viewConfiguration{details{posterBoard __typename}__typename}media{mainImage{templatedUrl __typename}images{templatedUrl __typename}floorplans{templatedUrl __typename}threeDimensionalTours{href __typename}videos{...on YouTubeVideo{id __typename}...on ExternalVideo{href __typename}__typename}__typename}__typename}fragment ResidentialMediaTypeBar on ResidentialListing{media{images{templatedUrl __typename}floorplans{templatedUrl __typename}threeDimensionalTours{href __typename}videos{...on YouTubeVideo{id __typename}...on ExternalVideo{href __typename}__typename}__typename}__typename}fragment Address on ResidentialListing{address{suburb postcode state display{shortAddress __typename}__typename}__typename}fragment Breadcrumb_ResidentialListing on ResidentialListing{__typename id address{suburb state postcode display{shortAddress __typename}__typename}propertyType{id display __typename}_links{canonical{path __typename}__typename}}fragment PropertyInfoPosterBoard on ResidentialListing{viewConfiguration{details{posterBoard __typename}__typename}__typename}fragment BrandingOnContactAgentPanelConfig on ResidentialListing{viewConfiguration{details{agencyBrandingOnSidePanel __typename}__typename}__typename}fragment ResidentialContactAgentBranding on ResidentialListing{productDepth listingCompany{name branding{primaryColour __typename}media{logo{templatedUrl __typename}__typename}_links{canonical{href __typename}__typename}__typename}__typename}fragment AgentInfo on ResidentialListing{listers{name photo{templatedUrl __typename}phoneNumber{display showDisclaimer __typename}_links{canonical{href __typename}__typename}__typename}listingCompany{id businessPhone __typename}__typename}fragment AgencyInfo on ResidentialListing{viewConfiguration{details{agencyInfo __typename}__typename}listingCompany{...on Agency{name __typename address{display{fullAddress __typename}__typename}_links{canonical{href __typename}__typename}}__typename}__typename}fragment HeaderLeaderboard on ResidentialListing{viewConfiguration{details{adverts{headerLeaderboard __typename}__typename}__typename}__typename}fragment ListingCompanyHeaderBranding on ResidentialListing{viewConfiguration{details{branding{header{size __typename}__typename}__typename}__typename}listingCompany{name branding{primaryColour __typename}_links{canonical{href __typename}__typename}media{logo{templatedUrl __typename}__typename}__typename}__typename}fragment ResidentialListingMetaData on ResidentialListing{__typename id description media{mainImage{templatedUrl __typename}images{__typename}__typename}_links{canonical{href path __typename}__typename}propertyType{id display __typename}address{display{shortAddress fullAddress __typename}suburb state postcode __typename}price{display __typename}generalFeatures{bedrooms{value __typename}__typename}propertySizes{land{displayValue sizeUnit{displayValue __typename}__typename}__typename}}fragment Disclaimer on SoldResidentialListing{price{disclaimerType __typename}__typename}"
        }),
        "method": "POST"
    })
    .then(result => result.json())
    .then(response => {
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
    .catch((error) => {
        console.error(error);
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