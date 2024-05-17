import { checkIfLoggedIn } from "./src/js/loggedIn.js";
import { landingListings } from "./src/js/generate/landingListing.js";

landingListings();
checkIfLoggedIn();

/* Change the API call to have each listing displayed be an anchor tag that directs to listing specific page */
