
    // create  map object at zero cordinates
     const mymap = L.map('mapid').setView([0,0], 2);

     //setting icon space station
     var myIcon = L.icon({
    iconUrl: 'space_station.png',
    iconSize: [30, 30],
    iconAnchor: [25, 16]
    });

    //Tiles from openstreetmap and add to map
    const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);
    const  marker = L.marker([0, 0],{icon: myIcon, rotationAngle:45 }).addTo(mymap);


// call an api to get json formatted data and set marker
    //const api_url = 'http://api.open-notify.org/iss-now.json';
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    let firstTime = true;
     async function getISS() {
        const response =  await fetch(api_url);
        const data =  await response.json();
        console.log(data);
        document.getElementById("lat").textContent = data.latitude.toFixed(2);
        document.getElementById("lng").textContent = data.longitude.toFixed(2);


        // set the marker to a specific location as per api
        marker.setLatLng([data.latitude,data.longitude]);
    
        //initially  loading time view this loaction in center
        if (firstTime){
         mymap.setView([data.latitude,data.longitude], 2); 
         firstTime = false;
        }
    }

    var customControl =  L.Control.extend({        
      options: {
        position: 'topleft'
      },

      onAdd: function () {
         const div = L.DomUtil.create('div');
         const container = L.DomUtil.create('div');


        container.style.width = '25px';
        container.style.height = '25px';
        container.style.backgroundColor = '#fff'; 
        container.style.borderRadius = '50%';

        container.style.display = 'grid';
        container.style.alignItems = 'center';
        container.style.transform = 'rotate(-90deg)';
        container.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px';
        

        container.style.cursor = 'pointer';
        container.style.marginRight = '6px';
        container.style.textAlign = 'center';
        container.title = 'Click to recenter on the truck';
        div.appendChild(container);

// Set CSS for the control interior.
const controlText = L.DomUtil.create('div');
  controlText.style.color = '#29336f';
  controlText.style.fontSize = '16px';
  controlText.style.userSelect = 'none';
  controlText.innerHTML = '➤';
  container.appendChild(controlText);

  container.addEventListener('click', () => console.log('buttonClicked'));
     return container;
      }
    });
    mymap.addControl(new customControl());

    getISS();
    setInterval(getISS,5000);
