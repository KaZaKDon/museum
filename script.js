// Центр карты - станица Вёшенская
var map = L.map('map').setView([49.627260, 41.724760], 13);

// Слой карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Объекты 49.627260, 41.724760
var places = [{
        name: "Набережная Вёшенская",
        coords: [49.626346, 41.724429],
        icon: "🌊",
        description: "Живописная набережная на берегу Дона, любимое место прогулок.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Don_River_Veshenskaya.jpg"
    },
    {
        name: "Отрог",
        coords: [49.619795, 41.763376],
        icon: "⛰️",
        description: "Место на Дону, связанное с творчеством Шолохова.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Don_river.jpg"
    },
    {
        name: "Крутояр",
        coords: [49.602637, 41.892925],
        icon: "🏞️",
        description: "Крутой берег Дона, часто упоминаемый в произведениях писателя.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Steep_bank_of_Don.jpg"
    },
    {
        name: "Станица Еланская",
        coords: [49.615674, 42.040307],
        icon: "🏘️",
        description: "Старинная донская станица, соседствующая с Вёшенской.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Yelanskaya_Don.jpg"
    },
    {
        name: "Хутор Кружилинский (дом, где родился Шолохов)",
        coords: [49.439399, 41.752883],
        icon: "🏠",
        description: "Место рождения Михаила Шолохова, сохранившееся как музейный комплекс.",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Sholokhov_house_Kruzhilinsky.jpg"
    }
];

// Создание иконок
function createIcon(emoji) {
    return L.divIcon({
        className: 'custom-icon',
        html: `<span style="font-size:24px;">${emoji}</span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
}

// Метки
places.forEach(place => {
    var marker = L.marker(place.coords, {
        icon: createIcon(place.icon)
    }).addTo(map);
    marker.bindTooltip(place.name);

    marker.on('click', function () {
        var infoBox = document.getElementById('info');
        infoBox.classList.add("active");
        infoBox.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <h2>${place.name}</h2>
            <p><b>Координаты:</b> ${place.coords[0].toFixed(4)}, ${place.coords[1].toFixed(4)}</p>
            <p>${place.description}</p>
            <button onclick="hideInfo()">Назад к карте</button>
        `;
    });
});

// Скрыть панель
function hideInfo() {
    var infoBox = document.getElementById('info');
    infoBox.classList.remove("active");
    infoBox.innerHTML = "";
}