//#region 
// Initialize the map, initially centered at Charlotte, NC with latitude and longitude coordinates
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.22, lng: -80.84 },
        zoom: 10,
    });

    const zipcodeInput = document.getElementById("zipcode");
    const searchButton = document.getElementById("search-button");

    service = new google.maps.places.PlacesService(map);

    searchButton.addEventListener("click", () => {
        const zipcode = zipcodeInput.value;

        // Clear the map and markers and clear zipcode input box after button click
        clearMarkers();

        zipcodeInput.value = '';

        // verify zipcode format in basic 5 digit
        if (/^\d{5}$/.test(zipcode)) {
            geocodeZipcode(zipcode);
        } else {
            // Show modal alert is user input an invalid zipcode
            showAlert("Please enter a valid 5-digit zipcode.");
        }
    });
}

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function showAlert(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.querySelector(".close");

    modalMessage.textContent = message;
    modal.style.display = "block";

    // exit when the close button is clicked
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // exit upon click outside box
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// when a user inputs their zipcode, the map is centered to their proper lat and long coordinates
function geocodeZipcode(zipcode) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: zipcode }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            const location = results[0].geometry.location;
            map.setCenter(location);
            searchGyms(zipcode, location);
        } else {
            
            showAlert("Please enter a valid 5 digit zipcode.");

        }
    });
}

//the map will search about 3 miles from the zipcode sent by user
function searchGyms(zipcode, location) {
    const request = {
        location: location,
        radius: 5000, // radius search range
        keyword: "gym",
    };

    //depending on results the list will populate with what is recieved
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const gymsList = document.getElementById("gyms-list");
            gymsList.innerHTML = "";

            for (let i = 0; i < results.length; i++) {
                const place = results[i];
                const gymItem = document.createElement("li");
                gymItem.textContent = place.name;
                gymsList.appendChild(gymItem);

                // list for each gym location
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                });
                markers.push(marker);
            }
        } else {
            // Handle error message to the user
            console.error("Location error:", status);
        }
    });
}
 //#endregion