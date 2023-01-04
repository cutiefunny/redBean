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
var selected = "";

//페이지 시작 시 수행되는 함수
window.onload = function(){
    
    //기존의 값들을 배열에 담는다
    name2.forEach(val =>{
        nameVal.push(val.getAttribute("value"));
    });
    sugar.forEach(val =>{
        sugarVal.push(val.getAttribute("value"));
    });
    taste.forEach(val =>{
        tasteVal.push(val.getAttribute("value"));
    });
    ice.forEach(val =>{
        iceVal.push(val.getAttribute("value"));
    });
    memo.forEach(val =>{
        memoVal.push(val.getAttribute("value"));
    });
    address.forEach(val =>{
        addressVal.push(val.getAttribute("value"));
    });
    createTm.forEach(val =>{
        createTmVal.push(val.getAttribute("value"));
    });
};

function selecting(key){ selected=key; }

function save(){
    var cnt=0;
    var nameValAfter = [];
    var sugarValAfter = [];
    var tasteValAfter = [];
    var iceValAfter = [];
    var memoValAfter = [];
    var addressValAfter = [];
    name2 = document.getElementsByName("name");
    sugar = document.getElementsByName("sugar");
    taste = document.getElementsByName("taste");
    ice = document.getElementsByName("ice");
    memo = document.getElementsByName("memo");
    address = document.getElementsByName("address");

    //변경된 입력값을 배열에 담는다
    name2.forEach(val =>{
        nameValAfter.push(val.getAttribute("value"));
    });
    sugar.forEach(val =>{
        sugarValAfter.push(val.getAttribute("value"));
    });
    taste.forEach(val =>{
        tasteValAfter.push(val.getAttribute("value"));
    });
    ice.forEach(val =>{
        iceValAfter.push(val.getAttribute("value"));
    });
    memo.forEach(val =>{
        memoValAfter.push(val.getAttribute("value"));
    });
    address.forEach(val =>{
        addressValAfter.push(val.getAttribute("value"));
    });

    //기존값과 입력값을 비교하여 차이가 있을 시 update
    for(i=0;i<name2.length;i++){
        console.log(nameVal[i]+","+nameValAfter[i]);
        if(nameVal[i]!=nameValAfter[i] || sugarVal[i]!=sugarValAfter[i] || tasteVal[i]!=tasteValAfter[i] || iceVal[i]!=iceValAfter[i] || memoVal[i]!=memoValAfter[i] || addressVal[i]!=addressValAfter[i]) {
            update(createTmVal[i],nameValAfter[i],sugarValAfter[i],tasteValAfter[i],iceValAfter[i],memoValAfter[i],addressValAfter[i]);
            cnt++;
        }
    }

    if(cnt>0) alert("updated "+cnt+"rows");
    else alert("there are no modified values");
}

function update(createTm,name,sugar,taste,ice,memo,address){
    callAjaxManage("updateManage",{createTm:createTm,name:name,sugar:sugar,taste:taste,ice:ice,memo:memo,address:address});
}

function change(obj){
    obj.setAttribute("value",obj.value);
}

function create(){
    $('#newName').val("");
    $('#newSugar').val("");
    $('#newTaste').val("");
    $('#newIce').val("");
    $('#newMemo').val("");
    $('#newAddress').val("");
    $('.ui.modal').modal('show');
}

function del(){
    if(confirm("삭제하시겠습니까?")) callAjaxManage("deleteManage",{createTm:selected});
}

function saveNew(){
    var d1 = $('#newName').val();
    var d2 = $('#newSugar').val();
    var d3 = $('#newTaste').val();
    var d4 = $('#newIce').val();
    var d5 = $('#newMemo').val();
    var d6 = $('#newAddress').val();
    var time = new Date().YYYYMMDDHHMMSS();
    var cnt=0;
    var exist=false;
    name2.forEach(obj => {
        if(obj.getAttribute("value") == d1) {
            exist=true;
        }
        cnt++;
    });
    if(exist) alert("already exist!");
    else {
        callAjaxManage("createManage",{name:d1,sugar:d2,taste:d3,ice:d4,memo:d5,address:d6,createTm:time});
    }
}

//Date format 정리 함수
Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
  
    return yyyy +  MM + dd+  hh + mm + ss;
  };
  
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }