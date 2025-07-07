export function addPieLegend(map) {
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<h4>Cancer Factors</h4>';
        div.innerHTML += '<i style="background: #ff0000"></i> Eso<br>';
        div.innerHTML += '<i style="background: #00ff00"></i> Kidney<br>';
        div.innerHTML += '<i style="background: #0000ff"></i> Liver<br>';
        div.innerHTML += '<i style="background: #ffff00"></i> Lung<br>';
        div.innerHTML += '<i style="background: #ff00ff"></i> Pancreatic<br>';
        div.innerHTML += '<i style="background: #00ffff"></i> Prostate<br>';
        div.innerHTML += '<i style="background: #ffffff"></i> Skin<br>';
        return div;
    };

    legend.addTo(map);
}
