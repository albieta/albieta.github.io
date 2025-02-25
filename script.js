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
                (subCategory === '' || place.subCategory.includes(subCategory)) && 
                (pressupost === '' || pressupost === place.pressupost)
            ) {
                let markerColor;
                switch (place.category) {
                    case 'menjar': markerColor = '#84b4b1'; break;
                    case 'supermercat': markerColor = '#969ac0'; break;
                    case 'botigues': markerColor = '#b3b68b'; break;
                    case 'turisme': markerColor = '#bd9090'; break;
                    case 'oci': markerColor = '#b48db2'; break;
                }
    
                var marker = L.circleMarker([place.lat, place.lon], {
                    radius: 12,
                    fillColor: markerColor,
                    color: '#555',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);
    
                marker.bindPopup(`<b>${place.name}</b><br>${place.description}`);
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
        name: 'El Mirallet', 
        description: 'Cuina tradicional de Granollers de fa més de 40 anys. Aprox. 15€/persona',
        lat: 41.60789052615172, lon: 2.2867331049050317,
        category: 'menjar',
        subCategory: ['dinar', 'sopar'],
        pressupost: 'baix'
    },
    { 
        name: 'Tolino Gastro Bar', 
        description: 'Hamburgueses i entrepans. Aprox. 15€/persona',
        lat: 41.60758945709514, lon: 2.286202566114203,
        category: 'menjar',
        subCategory: ['esmorzar', 'dinar', 'berenar', 'sopar'],
        pressupost: 'baix'
    },
    { 
        name: 'Fonda Europa', 
        description: 'Restaurant tradicional amb més de 300 anys de recorregut. Aprox. 30€/persona',
        lat: 41.60829041108993, lon: 2.2894273165048857,
        category: 'menjar',
        subCategory: ['esmorzar', 'dinar', 'berenar', 'sopar'],
        pressupost: 'alt'
    },

];
