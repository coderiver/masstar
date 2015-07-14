ymaps.ready(init);

var map, mapMarker;

function init() {
    map = new ymaps.Map('map-canvas', {
        center: [55.808144, 37.539527],
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl'],
    });

    mapMarker = new ymaps.Placemark([55.808144, 37.539527], {
        // balloonContent: 'улица Черняховского, 19',
        hintContent: 'улица Черняховского, 19'
    });

    map.geoObjects.add(mapMarker);
    map.behaviors.disable('scrollZoom');
}
