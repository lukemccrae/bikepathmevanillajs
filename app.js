var howMany;
var destinations = [];
var currentLocation;
var string = 'https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=38.8713700,-104.8221310&destination=38.9091780,-104.7828480&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms'

function search() {
    howMany = document.getElementById("number").value
    if (howMany) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
                .done(function(data) {
                    console.log(data);
                })
                .fail(function(error) {
                    console.log(error);
                })
            // console.log(position.coords.latitude + ',' + position.coords.longitude);
            findLocations(position);
        })
    }
}

function findLocations(position) {
    var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 14
    });
    var request = {
        location: position,
        radius: '2000',
        types: ['bar']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, addLocation);
}

//howMany is not deincrementing
function addLocation(results, status) {
    console.log(results);
    howMany - 1;
    console.log(howMany);
    var randomNumber = Math.floor(Math.random() * results.length)
    destinations.push(results[randomNumber])
    search()
}
