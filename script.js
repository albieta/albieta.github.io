window.onload = function () {
    var filters = [];

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

    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const categoryDiv = document.getElementById(button.dataset.category);
            if (button.classList.contains('active')) {
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
                });                        button.classList.add('active');
                categoryDiv.classList.remove('hidden');
            }
        });
    });

    document.querySelectorAll('.subcategory-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                document.getElementById('pressupost').classList.add('hidden');
            } else {
                document.querySelectorAll('.subcategory-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.pressupost-btn').forEach(btn => {btn.classList.remove('active');});
                document.getElementById('pressupost').classList.remove('hidden');
                button.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.pressupost-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            } else {
                document.querySelectorAll('.pressupost-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });
};