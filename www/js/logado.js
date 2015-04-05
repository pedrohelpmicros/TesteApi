/**
 * Created by ADM on 05/04/2015.
 */
$(document).ready(function(){
    var gets = devolve_gets();
    $('#token').val(gets['token']);
});
function checkin(){
    var x = 0;
    $('#butt').hide();
    $('#latitude').val('');
    $('#longitude').val('');
    getLocation();
    setInterval(function(){
        if($('#latitude').val() != "" && x == 0) {
            x=1;
            $.ajax({
                type: "POST",
                data: {token: $('#token').val(), latitude: $('#latitude').val(), longitude: $('#longitude').val()},
                url: "http://192.168.1.110/api/public/user/checkin",
                dataType: "json",
                success: function (result) {
                    if (result.resp == 1) {
                        alert(result.menssagem);
                    }
                    if (result.resp == false) {
                        alert(result.menssagem);
                    }
                }
            });
            $('#butt').show();
        }
    },3000);
}
function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position){
        $('#latitude').val(position.coords.latitude);
        $('#longitude').val(position.coords.longitude);
    });

    //if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function(position) {
    //        $('#latitude').val(position.coords.latitude);
    //        $('#longitude').val(position.coords.longitude);
    //    });
    //} else {
    //    x.innerHTML = "Geolocation is not supported by this browser.";
    //}
}
function devolve_gets(){
    var resp = new Array();
    var url = window.location.href;
    var params = url.split('?');
    var v = params[1].split('&');
    var x = 0;
    while(v[x]){
        var part = v[x].split("=");
        resp[part[0]] = part[1];
        x = x + 1;
    }
    return resp;
}