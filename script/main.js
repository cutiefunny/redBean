//#region 엘리먼트를 변수로 선언
var name2 = document.getElementsByName("name");
var sugar = document.getElementsByName("sugar");
var taste = document.getElementsByName("taste");
var ice = document.getElementsByName("ice");
var memo = document.getElementsByName("memo");
var address = document.getElementsByName("address");
var createTm = document.getElementsByName("createTm");
var nameVal = [];
var sugarVal = [];
var tasteVal = [];
var iceVal = [];
var memoVal = [];
var addressVal = [];
var createTmVal = [];
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
    
    var cnt=0;
    address.forEach(addr => {
        setMarkers(addr.getAttribute('value'),[name2[cnt].getAttribute('value'),sugar[cnt].getAttribute('value'),taste[cnt].getAttribute('value'),ice[cnt].getAttribute('value'),memo[cnt].getAttribute('value')]);
        cnt++;
    });
    
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

function setMarkers(address,info){

        naver.maps.Service.geocode({
            address: address
        }, function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Something wrong!');
            }

            var result = response.result, // 검색 결과의 컨테이너
                items = result.items; // 검색 결과의 배열

            position = new naver.maps.LatLng(items[0].point.y, items[0].point.x);

            var markerOptions = {
                position: position.destinationPoint(0, 0),
                address: address,
                name: info[0],
                sugar: info[1],
                taste: info[2],
                ice: info[3],
                memo: info[4],
                map: map,
                icon: {
                    url: 'image/marker.png',
                    scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(22, 28)
                }
            };
            
            var marker = new naver.maps.Marker(markerOptions);
            
            markers.push(marker);

            contentString = "<H3>"+marker.name+"<H3>";

            var infowindow = new naver.maps.InfoWindow({
                content: contentString
            });
            
            naver.maps.Event.addListener(marker, "click", function(e) {
                if (infowindow.getMap()) {
                    infowindow.close();
                } else {
                    infowindow.open(map, marker);
                    document.getElementById("selectedName").setAttribute("value",marker.name);
                    document.getElementById("selectedSugar").setAttribute("value",marker.sugar);
                    document.getElementById("selectedIce").setAttribute("value",marker.ice);
                }
            });
        });
}