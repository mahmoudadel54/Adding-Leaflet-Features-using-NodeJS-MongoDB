//1- esri baemap
let esriBaseMap = L.tileLayer(
    //url of tile layer from provider
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
    //then enter some options
    , {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
       //to remoeve the dublicate world many times 
        noWrap: true,
        bounds:L.latLngBounds(L.latLng(-90,-180), L.latLng(90,180))
});

//intialize the map 
let map = L.map("map",
            // map options
            {
                center:[27.819644755099446, 30.585937500000004],
                zoom:6,
                minZoom:3,
                maxZoom:12,
                layers:[esriBaseMap],
                //related to remoeve the dublicate world many times
                maxBounds:L.latLngBounds(L.latLng(-90,-180), L.latLng(90,180)),
                //map interaction options
                // dragging:false,
                // doubleClickZoom:false
                // boxZoom:false
                zoomDelta:0.6,      //if <= 0.5 it doesn't work in zoom out. I don't know why!! 
                worldCopyJump:true,
                //to remove the attribution below
                // attributionControl:false
        });
//edit in attribution that shown in the bottom-right side of map
map.attributionControl.setPrefix("Leaflet App With node");


//geomap draw toolbar
// // add leaflet-geoman controls with some options to the map  
map.pm.addControls({  
    position: 'topleft',  
    drawCircle: true,  
  });  

//fetch data from db using API with nodeJS
// creating function to fetch data 
async function getDataFromDB (apiURL){
    await fetch(apiURL)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        //data --> msg, status, polygons
       let dataInGeoJsonFormat = {
           type:"FeatureCollection",
           features:data.polygons
       }
        L.geoJson(dataInGeoJsonFormat).addTo(map);
    }).catch(err=>console.log(err))
}

let allPolygonsAPIURL = "http://localhost:7000/polygon"

getDataFromDB(allPolygonsAPIURL)


map.on('pm:create', async(shape, layer) => {  
    console.log(shape);     //shape.layer._latlngs
    console.log(layer);
    let createdGeom = shape.layer.toGeoJSON();
    console.log(createdGeom);
    // let createdGeom = {
    //     "properties":{
    //         "name": "Cairo",
    //         "population":5000000
    //     },
    // "geometry": {
    //         "type": "Polygon",
    //         "coordinates": [
    //           [
    //             [
    //               30.871582031249996,
    //               30.4297295750316
    //             ],
    //             [
    //               30.805664062500004,
    //               29.84064389983441
    //             ],
    //             [
    //               30.8935546875,
    //               29.592565403314087
    //             ],
    //             [
    //               31.92626953125,
    //               29.668962525992505
    //             ],
    //             [
    //               31.8603515625,
    //               30.35391637229704
    //             ],
    //             [
    //               30.871582031249996,
    //               30.4297295750316
    //             ]
    //           ]
    //         ]
    //       }
    // }
     
    let response = await fetch('http://localhost:7000/polygon/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(createdGeom)
      });
   });
