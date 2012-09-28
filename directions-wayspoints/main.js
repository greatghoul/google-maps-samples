/**
 * References:
 *   https://google-developers.appspot.com/maps/documentation/javascript/examples/directions-waypoints
 */

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map, geocoder;

// 格式化字符串
//
// 用法：
//
// var s1 = '%{1} and %{2}!';
// console.log('source: ' + s1);
// console.log('target: ' + fmt(s1, 'ask', 'learn'));
//
// var s2 = "%{name} is %{age} years old, his son's name is %{sons[0].name}";
// console.log('source: ' + s2);
// console.log('target: ' + fmt(s2, { name: 'Lao Ming', age: 32, sons: [{ name: 'Xiao Ming' }]}));
function fmt() {
    var args = arguments;
    return args[0].replace(/%\{(.*?)}/g, function(match, prop) {
        return function(obj, props) {
            var prop = /\d+/.test(props[0]) ? parseInt(props[0]) : props[0];
            if (props.length > 1) {
                return arguments.callee(obj[prop], props.slice(1));
            } else {
                return obj[prop] || '';
            }
        }(typeof args[1] === 'object' ? args[1] : args, prop.split(/\.|\[|\]\[|\]\./));
    });
}

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

var TPL_STOP = ''
    + '<li class="location-wrap"><label>经过</label>'
    + '  <input type="text" class="location" name="waypoint" />'
    + '  <button type="button" class="close">×</button>'
    + '</li>';

$(function() {
    function bind_typeahead($node) {
        return $node.typeahead({
            source: function (query, process) {
                geocoder.geocode({ address: query }, function(results, status) {
                    var addressList = $.map(results, function(result) {
                        return result.formatted_address.replace(/\s*邮政编码\:.*/ig, '');
                    });
                    return process(addressList);
                });
            },

            // matcher 返回 true 以支持带空格的模糊查询
            matcher: function(item) {
                return true; 
            }
        });
    }
    bind_typeahead($('.location'));

    $('#add-stop-location').click(function() {
        $stop = $(TPL_STOP); 
        $('#stop-locations').append($stop);
        bind_typeahead($stop.find('.location'));
        $stop.find('.close').click(function() {
            $(this).parents('.location-wrap').fadeOut('fast', function() {
                $(this).remove();
            });
        });
    });
});

