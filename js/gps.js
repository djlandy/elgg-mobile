﻿function ShowLocation() {
    navigator.geolocation.getCurrentPosition(function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        $("#lat").text(lat);
        $("#lng").text(lng);
    });
}