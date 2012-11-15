驾车路线搜索，支持查询多个途经点

**使用到的API**

 * [google.maps.places.Autocomplete][api-ac]
 * [google.maps.LatLngBounds][api-llb]

**参考资料**

 * [Google Maps JavaScript API v3 Example: Directions Waypoints][1]
 * [Google Maps Geocoding Service API][2]
 * [Google Maps Directions Service API][3]
 * [Google Maps Places Library :: Adding Autocomplete][4]
 * [在线查询经纬度 google map查询地名返回经纬度 geocode geocoder的完整实例 代码下载][5]

**注意**

1. 使用LatLngBounds需要注意一点，构造方法的参数为地图左下到右上角的坐标, 与我们平常的使用习惯不同

> LatLngBounds(sw?:LatLng, ne?:LatLng)	Constructs a rectangle from the points at its **south-west** and **north-east** corners.

2. 与GDG大会宣传的不同，即便使用国内版本的 javascript api 源，在特殊时刻，依然会被封杀，所以墙内商用的话，需要谨慎

3. 

[1]: https://google-developers.appspot.com/maps/documentation/javascript/examples/directions-Waypoints
[2]: https://developers.google.com/maps/documentation/javascript/Geocoding
[3]: https://developers.google.com/maps/documentation/javascript/Directions
[4]: https://developers.google.com/maps/documentation/javascript/places#adding_autocomplete
[5]: http://yanue.net/archives/32.html
[api-ac]: https://developers.google.com/maps/documentation/javascript/places#places_autocomplete
[api-llb]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
