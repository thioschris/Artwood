// Interactive workshop map — shared site footer
document.addEventListener('DOMContentLoaded', function() {
  const mapEl = document.getElementById('contactMap');
  if (!mapEl || typeof L === 'undefined') return;

  const workshopCoords = [34.7347176, 32.9439674];

  const map = L.map('contactMap', {
    center: workshopCoords,
    zoom: 15,
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: 'artwood-map-marker',
    html: '<span class="artwood-map-pin" aria-hidden="true"></span>',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -38],
  });

  L.marker(workshopCoords, { icon: markerIcon })
    .addTo(map)
    .bindPopup('<strong>Artwood</strong><br>Iakovou Katsounotou 15<br>Limassol 4193, Cyprus')
    .openPopup();

  setTimeout(function() {
    map.invalidateSize();
  }, 100);
});
