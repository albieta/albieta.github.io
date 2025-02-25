window.onload = function () {
    var category = '';
    var subCategory = '';
    var pressupost = '';

    let markers = [];

    var map = L.map('map', {
        center: [41.607950, 2.287336],
        zoom: 13,
        maxZoom: 18,
        minZoom: 14
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    function updateMapCenter(city) {
        var centerCoordinates;
        if (city === 'GRANOLLERS') {
            centerCoordinates = [41.607950, 2.287336]; 
        } else if (city === 'CASTELLDEFELS') {
            centerCoordinates = [41.279842, 1.979169]; 
        } else if (city === 'BARCELONA') {
            centerCoordinates = [41.393805, 2.166297]; 
        }
        map.setView(centerCoordinates, 13); 
    }

    updateMapCenter('GRANOLLERS');

    document.querySelectorAll('.city-tab').forEach(button => {
        button.addEventListener('click', () => {
            const city = button.dataset.city;
            const categoryDivCities = document.getElementsByClassName('city-tab');
            for (let i = 0; i < categoryDivCities.length; i++) {
                categoryDivCities[i].classList.remove('active');
            }
            document.getElementById('city-title').textContent = city;
            button.classList.add('active');
            
            updateMapCenter(city);
        });
    });

    function updateMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = []; 
    
        places.forEach(place => {
            if (
                (category === '' || category === place.category) && 
                (subCategory === '' || subCategory === place.subCategory) && 
                (pressupost === '' || pressupost === place.pressupost)
            ) {
                let markerColor;
                switch (place.category) {
                    case 'menjar': markerColor = 'green'; break;
                    case 'supermercat': markerColor = 'blue'; break;
                    case 'botigues': markerColor = 'yellow'; break;
                    case 'turisme': markerColor = 'red'; break;
                    case 'oci': markerColor = 'purple'; break;
                }
    
                var marker = L.circleMarker([place.lat, place.lon], {
                    radius: 8,
                    fillColor: markerColor,
                    color: markerColor,
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);
    
                marker.bindPopup(`<b>${place.name}</b><br>${place.category}`);
                markers.push(marker); 
            }
        });
    }

    updateMarkers();

    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const categoryDiv = document.getElementById(button.dataset.category);
            if (button.classList.contains('active')) {
                category = '';
                button.classList.remove('active');
                categoryDiv.classList.add('hidden');
                document.getElementById('pressupost').classList.add('hidden');
                document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.pressupost-btn').forEach(btn => {
                    btn.classList.remove('active'); 
                    btn.classList.remove('menjar');
                    btn.classList.remove('supermercat');
                    btn.classList.remove('botigues');
                    btn.classList.remove('turisme');
                    btn.classList.remove('oci');
                    btn.classList.add(button.dataset.category);
                });
            } else {
                category = button.dataset.category;
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('#menjar, #supermercat, #botigues, #turisme, #oci, #pressupost').forEach(div => {div.classList.add('hidden');});
                document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.pressupost-btn').forEach(btn => {
                    btn.classList.remove('active'); 
                    btn.classList.remove('menjar');
                    btn.classList.remove('supermercat');
                    btn.classList.remove('botigues');
                    btn.classList.remove('turisme');
                    btn.classList.remove('oci');
                    btn.classList.add(button.dataset.category);
                });                        
                button.classList.add('active');
                categoryDiv.classList.remove('hidden');
            }

            updateMarkers();
        });
    });

    document.querySelectorAll('.subcategory-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                subCategory = '';
                button.classList.remove('active');
                document.getElementById('pressupost').classList.add('hidden');
            } else {
                subCategory = button.dataset.subcategory;
                document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.pressupost-btn').forEach(btn => {btn.classList.remove('active');});
                document.getElementById('pressupost').classList.remove('hidden');
                button.classList.add('active');
            }

            updateMarkers();
        });
    });

    document.querySelectorAll('.pressupost-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                pressupost = '';
                button.classList.remove('active');
            } else {
                pressupost = button.dataset.pressupost;
                document.querySelectorAll('.pressupost-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }

            updateMarkers();
        });
    });
};

const places = [
    { 
        name: 'Restaurant 1', 
        description: 'Restaurant 1 description',
        lat: 41.6080, lon: 2.2873, 
        category: 'menjar',
        subCategory: 'esmorzar',
        pressupost: 'baix'
    },

];
