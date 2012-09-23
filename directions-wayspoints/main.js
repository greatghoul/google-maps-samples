/**
 * References:
 *   https://google-developers.appspot.com/maps/documentation/javascript/examples/directions-waypoints
 */

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map, geocoder;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(34.198564,108.895614);
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    geocoder = new google.maps.Geocoder();
    directionsDisplay.setMap(map);
}

function calcRoute() {
    var start = document.getElementById('start-location').value;
    var end = document.getElementById('end-location').value;
    var waypts = [];
    var waypoints = document.getElementsByName('waypoint');
    for (var i = 0; i < waypoints.length; i++) {
        if (/^\s*$/ig.test(waypoints[i].value)) continue;
        waypts.push({location: waypoints[i].value, stopover:true});
    }

    var request = {
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        console.log(response, status);
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions_panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        }
    });
}

$(function() {
    $('.location').typeahead({
        source: function (query, process) {
            geocoder.geocode({ address: query }, function(results, status) {
                var addressList = $.map(results, function(result) {
                    return result.formatted_address;
                });
                return process(addressList);
            });
        },
        // matcher 返回 true 以支持带空格的模糊查询
        matcher: function(item) {
            return true; 
        }
    });
});

