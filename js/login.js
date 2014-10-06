//getSiteURLs();
$(document).on('pagebeforecreate', function (event) {
    var persistent;

    persistent = checkPersistent();

});

$(document).on('pageshow', function (event) {
    
    setSiteTitle();

});

function appLoginSubmit() {
    //alert('appLoginSubmit called');
    var userName;
    var password;
    var userKey;
    var API;

    API = window.localStorage.getItem('ActiveSite-API')

    $.mobile.loading('show');

    userName = document.getElementById('username').value;
    password = document.getElementById('password').value;

    //alert(userName);
    //alert(password);

    $.ajax({
        type: "POST",
        url: API,
        cache: false,

        data: {
            method: 'authenticate',
            username: userName,
            password: password,
            appauth: true

        },

        success: function (xmlk) {
            //$.mobile.changePage("./wire.html");
            userKey = $(xmlk).find('UserToken').text();
            //alert(userKey);
            if (userKey == undefined) {
                userKey = '';
            }

            if (userKey != '') {
                window.location.replace("./wire.html");
            }
            else {
                alert('No');
            }
            //userKey = $(xmlk).find('UserToken').text();

            //nextFunction(userKey, parms);
        }
    });
}

function getSiteURLs() {
    //localStorage.clear();

    //var currentSiteAPI = 'http://m.nakedfest.co.uk/api.aspx'

    //$.ajax({
    //    type: "GET",
    //    url: currentSiteAPI,
    //    cache: false,
    //    data: {
    //        method: 'getapidetails',
            
    //    },
    //    dataType: "xml",
    //    success: function (xml) {

    //        returnedXML = (new XMLSerializer()).serializeToString(xml);
    //        logtext = (new XMLSerializer()).serializeToString(xml);

    //        console.log(logtext);
    //        //wireView = document.createElement('ul');
    //        //wireView.setAttribute('id', 'wireTable');
    //        //wireView.setAttribute('data-role', 'listview');
    //        //wireView.setAttribute('data-inset', 'true');

    //        //$(xml).find('WirePost').each(function () {
    //        //    wirePost = BuildWire($(this), false);
    //        //    wireView.appendChild(wirePost);
    //        //});

            
    //    }
    //});

}

function checkPersistent() {
    var persist;
    var userName;
    var password;

    persist = window.localStorage.getItem('ActiveSite-Persist');

    if (persist == 'Y')
    {
        userName = window.localStorage.getItem('ActiveSite-UserName');
        password = window.localStorage.getItem('ActiveSite-Password');

        document.getElementById('username').value = userName;
        document.getElementById('password').value = password;
    }

    return persist;
}