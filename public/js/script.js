const socket = io();
const map = L.map("map").setView([0,0],16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers = {};

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude} = position.coords;
        socket.emit("sendLocation",{latitude,longitude})
        
        if(markers[socket.id]){
            markers[socket.id].setLatLng([latitude,longitude]);
        } else {
            markers[socket.id] = L.marker([latitude,longitude]).addTo(map);
        }
        
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

socket.on("receiveLocation",(data)=>{
    const {id,latitude,longitude} = data;
    
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    } else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on("userDisconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})