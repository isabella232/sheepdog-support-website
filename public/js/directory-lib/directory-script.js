console.log('Directory Script LOADED!')

const locationForm = document.querySelector('form')
const search = document.querySelector('input')
var map;

document.getElementById('Google_Api').innerHTML = 

locationForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const facilityName = search.value

    fetch('/directory?name=' + facilityName).then((response) =>{
        response.json().then((data) => {
            console.log(data)
            //map.setCenter(data)
        })
    })
})

function initMap(){
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        }); 

    const infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // const marker = new google.maps.Marker({
    //     Position:pos,
    //     map:map,
    //     title: 'My position'
    // })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
      // The marker, positioned at Uluru
}

function findLocation(map, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
}