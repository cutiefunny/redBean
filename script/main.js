//#region 엘리먼트를 변수로 선언
var deviceID = document.getElementById("deviceID").getAttribute('value');
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    } else {
        var center = map.getCenter();
        infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
        infowindow.open(map, center);
    }
    
    
    setMarkers("독막로 61-4 1");
    // naver.maps.Service.geocode({
    //     address: '독막로 61-4 1'
    // }, function(status, response) {
    //     if (status !== naver.maps.Service.Status.OK) {
    //         return alert('Something wrong!');
    //     }

    //     var result = response.result, // 검색 결과의 컨테이너
    //         items = result.items; // 검색 결과의 배열

    //     // do Something
    //     alert(items[0].point.x);
    // });
    
};

//메뉴 클릭

let markers = new Array();

var HOME_PATH = window.HOME_PATH || '.';

var infowindow = new naver.maps.InfoWindow();

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

function onSuccessGeolocation(position) {
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(10); // 지도의 줌 레벨을 변경합니다.

    //infowindow.setContent('<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>');

    //infowindow.open(map, location);
    console.log('Coordinates: ' + location.toString());
}

function onErrorGeolocation() {
    var center = map.getCenter();

    infowindow.setContent('<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

    infowindow.open(map, center);
}

function setMarkers(address){

        // naver.maps.Service.geocode({
        //     address: address
        // }, function(status, response) {
        //     if (status !== naver.maps.Service.Status.OK) {
        //         return alert('Something wrong!');
        //     }

        //     var result = response.result, // 검색 결과의 컨테이너
        //         items = result.items; // 검색 결과의 배열

            //position = new naver.maps.LatLng(items[0].point.x, items[0].point.y);
            position = new naver.maps.LatLng(37.5666805, 126.9784147);

            var markerOptions = {
                position: position.destinationPoint(0, 0),
                map: map,
                icon: {
                    url: 'image/marker.png',
                    scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26)
                }
            };
            
            var marker = new naver.maps.Marker(markerOptions);
            
            markers.push(marker);
        //});
}