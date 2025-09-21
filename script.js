const map = L.map('map').setView([49.627260, 41.724760], 13);

// слой карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// функция для иконок
function createIcon(emoji, color) {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="
        background:${color};
        border-radius:50%;
        width:34px;
        height:34px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:20px;
        border:2px solid white;
        box-shadow:0 0 4px rgba(0,0,0,0.4);
    ">${emoji}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
    });
}

// места
const places = [
    {
        name: "Набережная Вёшенская",
        coords: [49.626346, 41.724429],
        icon: "🌊",
        color: "#4CAF50",
        description: "Живописная набережная на берегу Дона — одно из любимых мест отдыха жителей и гостей станицы.",
        image: "img/Nabereznaiy.jpeg",
    },
    {
        name: "Отрог",
        coords: [49.619795, 41.763376],
        icon: "⛰️",
        color: "#4CAF50",
        description: "Природный уголок на Дону, связанный с пейзажами, описанными Михаилом Шолоховым.",
        image: "img/Otrog.jpg",
    },
    {
        name: "Крутояр",
        coords: [49.602637, 41.892925],
        icon: "🏞️",
        color: "#4CAF50",
        description: "Крутой высокий берег Дона, место, воспетое в произведениях Шолохова.",
        image: "img/lebyzhiyYar.jpg",
    },
    {
        name: "Станица Еланская",
        coords: [49.615674, 42.040307],
        icon: "🏘️",
        color: "#4CAF50",
        description: "Старинная донская станица, соседка Вёшенской, богатая историей и культурными традициями.",
        image: "img/Elan.jpeg",
    },
    {
        name: "Дом-музей Шолохова",
        coords: [49.626469231805515, 41.728781985388565],
        icon: "🏛️",
        color: "#2196F3",
        description: "Мемориальный дом-музей, где писатель жил и работал. Здесь сохранились личные вещи и атмосфера его времени.",
        image: "img/domSholoxov.jpeg",
    },
    {
        name: "Музейная экспозиция «Ремесла»",
        coords: [49.626965299364166, 41.72978371616804],
        icon: "📚",
        color: "#2196F3",
        description: "Выставка, посвящённая донским ремёслам: предметы быта, утварь и традиционные изделия казаков.",
        image: "img/Remesla.jpeg",
    },
    {
        name: "Памятник «Донским казакам»",
        coords: [49.4278794791057, 41.68234895443895],
        icon: "⚔️",
        color: "#FFC107",
        description: "Памятник, установленный в честь донских казаков, защищавших Родину и хранивших традиции Дона.",
        image: "img/KazakDon.jpeg",
    },
    {
        name: "Памятник «Орел»",
        coords: [49.60673695030413, 41.691143969913426],
        icon: "🦅",
        color: "#FFC107",
        description: "Символический памятник-орёл, посвящённый силе, свободе и духу донского края.",
        image: "img/orel.jpeg",
    },
    {
        name: "Хутор Кружилинский (дом, где родился Шолохов)",
        coords: [49.439399, 41.752883],
        icon: "🏠",
        color: "#9C27B0",
        description: "Исторический дом, где родился Михаил Шолохов. Сегодня — музейный комплекс с сохранившейся обстановкой начала XX века.",
        image: "img/Kruzilinskiy.jpg",
    },
];

// добавляем маркеры
places.forEach(place => {
    const marker = L.marker(place.coords, {
        icon: createIcon(place.icon, place.color)
    }).addTo(map);

    marker.bindTooltip(place.name);

    marker.on('click', () => {
        const mapDiv = document.getElementById('map');
        const infoBox = document.getElementById('info');
        const overlay = document.getElementById('map-overlay');

        mapDiv.classList.add("shrink");
        infoBox.classList.add("active");
        overlay.classList.add("active");

        infoBox.innerHTML = `
          <img src="${place.image}" alt="${place.name}">
          <h2>${place.name}</h2>
          <p><b>Координаты:</b> ${place.coords[0].toFixed(6)}, ${place.coords[1].toFixed(6)}</p>
          <p>${place.description}</p>
          <button onclick="hideInfo()">Назад к карте</button>
        `;
        map.invalidateSize();
    });
});

// скрыть инфо и вернуть карту
function hideInfo() {
    const mapDiv = document.getElementById('map');
    const infoBox = document.getElementById('info');
    const overlay = document.getElementById('map-overlay');

    mapDiv.classList.remove("shrink");
    infoBox.classList.remove("active");
    overlay.classList.remove("active");

    infoBox.innerHTML = "";
    map.invalidateSize();
}