var howMany;
var destinations = [];
var home;
var current;
var string = 'https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=38.8713700,-104.8221310&destination=38.9091780,-104.7828480&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms'

function buttonClick() {
    howMany = parseInt(document.getElementById("number").value)
    findCurrent()
}

function findCurrent() {
    console.log(howMany);
    navigator.geolocation.getCurrentPosition(function(position) {
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data);
            })
            .fail(function(error) {
                console.log(error);
            })
        home = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        findLocations(home)
    })
}

function findLocations(location) {
    console.log(location);
    var position = new google.maps.LatLng(location.lat, location.lng);
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

function addLocation(results, status) {
    if (results) {
        var randomNumber = Math.floor(Math.random() * results.length)
        var currentLoc = results[randomNumber]
        var currentLatLng = {
            lat: results[randomNumber].geometry.location.lat(),
            lng: results[randomNumber].geometry.location.lng()
        }
        if (alreadyAdded(currentLoc.name)) {
            destinations.push(currentLoc)
            howMany += -1
            console.log(destinations);
            searchAgain(currentLatLng)
        } else {
            searchAgain(currentLatLng)
        }
    }
}

function searchAgain(currentLatLng) {
    if (howMany) {
        findLocations(currentLatLng)
    }
}

function alreadyAdded(loc) {
    for (var i = 0; i < destinations.length; i++) {
        if (destinations[i].name === loc) {
            console.log('duplicate');
            return false;
        }
    }
    return true;
}
