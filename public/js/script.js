const socket = io();
const map = L.map("map").setView([0,0],16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


const markers = {};
let lastLocation = null;

function isMainTab() {
    return localStorage.getItem('trackerio-main-tab') === window.name;
}
if (!localStorage.getItem('trackerio-main-tab')) {
    window.name = 'main-' + Math.random();
    localStorage.setItem('trackerio-main-tab', window.name);
} else if (!window.name) {
    window.name = 'tab-' + Math.random();
}
window.addEventListener('storage', (e) => {
    if (e.key === 'trackerio-main-tab' && e.oldValue && !e.newValue) {
        localStorage.setItem('trackerio-main-tab', window.name);
    }
});
window.addEventListener('beforeunload', () => {
    if (isMainTab()) {
        localStorage.removeItem('trackerio-main-tab');
    }
});

function emitLocation() {
    if (lastLocation) {
        socket.emit("sendLocation", lastLocation);
    }
}

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} = position.coords;
        lastLocation = {latitude,longitude};
        emitLocation();
        map.setView([latitude,longitude],16);
    }, (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    }
    )
}

socket.on("connect", () => {
    emitLocation();
});

socket.on("receiveLocation",(data)=>{
    const {id,latitude,longitude} = data;
    let lat = latitude;
    let lng = longitude;
    if (!markers[id]) {
        lat += (Math.random() - 0.5) * 0.0005;
        lng += (Math.random() - 0.5) * 0.0005;
    }
    if (isMainTab() || id === socket.id) {
        if(markers[id]){
            markers[id].setLatLng([lat,lng]);
        } else{
            markers[id] = L.marker([lat,lng]).addTo(map);
            markers[id].bindPopup("User: " + id).openPopup();
        }
    } else if (markers[id] && id !== socket.id) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});

socket.on("userDisconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})