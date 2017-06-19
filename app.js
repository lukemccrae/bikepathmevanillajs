var howMany;
var destinations = [];
var home;
var current;
var path;
var waypoint = []
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

function buttonClick() {
    howMany = parseInt(document.getElementById("number").value)
    findCurrent()
}

function findCurrent() {
    navigator.geolocation.getCurrentPosition(function(position) {
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {})
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
    var position = new google.maps.LatLng(location.lat, location.lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 14
    });
    var request = {
        location: position,
        radius: '4000',
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
            //string method of pushing to waypoint
            waypoint.push({
                location: currentLatLng.lat + ',' + currentLatLng.lng
            })
            console.log(currentLoc.name);
            //variable method of adding waypoints
            // waypoint.push(currentLatLng)

            //google maps object waypoints
            // waypoints.push(new google.maps.LatLng(currentLatLng.lat, currentLatLng.lng))
            howMany += -1
            searchAgain(currentLatLng)
        } else {
            searchAgain(currentLatLng)
        }
    }
    if (!results || !howMany) {
        finishedSearching(currentLatLng)
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
            return false;
        }
    }
    return true;
}

function finishedSearching(end) {
    path = `https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=${home.lat},${home.lng}&destination=${home.lat},${home.lng}&waypoint=${waypoint}&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms`
    // $.get(path).done(function(data) {
    //     console.log(data);
    // })
    initialize()
}

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(home.lat, home.lng);
    var mapOptions = {
        zoom: 15,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay)
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = home
    var end = home
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'BICYCLING',
        waypoints: waypoint,
        optimizeWaypoints: true
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function calcRoute() {
    var request = {
        origin: start,
        destination: start,
        travelMode: 'BICYCLING',
        waypoints: waypoints
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}
