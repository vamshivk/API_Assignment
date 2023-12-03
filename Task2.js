var myMap1 = tt.map({
    key: "rkYAGAsQSAgYJdBKWKbg0I3mUduyNqEN",
    container: "map-container-1",
    center: [-74.0060152, 40.7127281],
    zoom: 10,
  });
  
  var myMap2 = tt.map({
    key: "rkYAGAsQSAgYJdBKWKbg0I3mUduyNqEN",
    container: "map-container-2",
    center: [-74.0060152, 40.7127281],
    zoom: 10,
  });
  
  const apiKey = 'rkYAGAsQSAgYJdBKWKbg0I3mUduyNqEN';
  const waypoints = '37.7790262,-122.419906:34.0536909,-118.242766'; 
  const apiUrl = `https://api.tomtom.com/routing/1/calculateRoute/${waypoints}/json?routeType=short&travelMode=car&avoid=unpavedRoads&key=${apiKey}`;
  

fetch(apiUrl)
.then(response => response.json())
.then(data => {
  if (data.routes && data.routes.length > 0) {
    const route = data.routes[0];
    console.log('Route Calculation Response:', data);
    if (route.legs[0] && route.legs[0].points) {
      const coordinates = route.legs[0].points.map(point => [point.longitude, point.latitude]);

      console.log(coordinates);
      const routeFeature = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      };

      myMap2.addSource('route-source', {
        type: 'geojson',
        data: routeFeature,
      });

      myMap2.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route-source',
        paint: {
          'line-color': 'blue',
          'line-width': 2,
        },
      });

      myMap2.fitBounds(new tt.LngLatBounds(coordinates), { padding: 100 });
    } else {
      console.error('Error calculating route: Invalid route data format');
    }
  } else {
    console.error('Error calculating route: No routes found');
  }
})
.catch(error => {
  console.error('Error calculating route:', error);
});
