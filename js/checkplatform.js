var phoneGap = false;
var API;
var emulator = false;
//var siteJS;
//var siteCSS;

window.onerror = function (msg, url, linenumber) {
    var message;

    message = String(msg);
    //message = msg.toSource();
    alert('API: ' + API + '\nError message: ' + message + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
}

if (document.location.protocol == "file:") {
    phoneGap = true;


}

if (location.host == 'localhost:4400') {
    phoneGap = true;
    emulator = true;
}



if (phoneGap == true) {
    //injectPhoneGapScripts();
    setPhoneGapVariables();
    //var activeSiteURL = 'http://m.nakedfest.co.uk/';

    //window.localStorage.setItem('ActiveSite-API', activeSiteURL + 'api.aspx');
    //window.localStorage.setItem('ActiveSite-SiteJS', activeSiteURL + 'js/site.js')
    //window.localstorage.setItem('ActiveSite-URL', activeSiteURL);
    //window.localStorage.setItem('ActiveSite-SiteCSS', activeSiteURL + 'css/site.css')

    //API = window.localStorage.getItem('ActiveSite-API');
    //siteJS = window.localStorage.getItem('ActiveSite-SiteJS');
    //siteCSS = window.localStorage.getItem('ActiveSite-SiteCSS');
    
}
else {
    API = './api.aspx';
    siteJS = './js/site.js';
    siteCSS = './css/site.css';
}

//injectSiteJS(siteJS);
//injectScripts();



function injectPhoneGapScripts() {
    //var cordovaScript = document.createElement('script');
    //var indexJSScript = document.createElement('script');

    ////var cordovaRequest = new XMLHttpRequest;
    ////var indexJSRequest = new XMLHttpRequest;

    ////var cordovaScript;
    ////var indexJSScript;

    ////cordovaRequest.open('GET', 'cordova.js', false);
    ////cordovaRequest.send();
    ////cordovaScript = cordovaRequest.responseText;
    ////eval(cordovaScript);

    ////indexJSRequest.open('GET', 'scripts/index.js', false);
    ////indexJSRequest.send();
    ////indexJSRequest = indexJSRequest.responseText;
    ////eval(indexJSRequest);

    //var head = document.getElementsByTagName('head')[0];

    //cordovaScript.type = 'text/javascript';
    //indexJSScript.type = 'text/javascript';

    //cordovaScript.src = "cordova.js";
    //indexJSScript.src = "scripts/index.js";

    //head.appendChild(cordovaScript);
    //head.appendChild(indexJSScript);

    //document.addEventListener("deviceready",
    //   function () {
           
    //       siteJS = window.localStorage.getItem('ActiveSite-SiteJS');
    //       siteCSS = window.localStorage.getItem('ActiveSite-SiteCSS');

    //       app.initialize();
    //       alert(API);
    //   }
    //   , false);
}

function injectSiteJS(url) {
    //var head = document.getElementsByTagName('head')[0];
    //var siteJSScript = document.createElement('script');

    //siteJSScript.type = 'text/javascript';
    //siteJSScript.src = url;

    //head.appendChild(siteJSScript);

    var siteJSSRequest = new XMLHttpRequest;
    
    var siteJSScript;

    siteJSSRequest.open('GET', url, false);
    siteJSSRequest.send();
    siteJSScript = siteJSSRequest.responseText;
    eval(siteJSScript);

}

function injectScripts() {
    var customTag = document.getElementById('customTag');
    var siteTag = document.getElementById('siteTag');

    if (phoneGap == false) {
        customTag.src = './js/custom.js';
        siteTag.src = './js/site.js';
    }
}

function setPhoneGapVariables() {
    //var activeSiteURL = 'http://m.nakedfest.co.uk/';

    //window.localStorage.setItem('ActiveSite-API', activeSiteURL + 'api.aspx');
    //window.localStorage.setItem('ActiveSite-SiteJS', activeSiteURL + 'js/site.js');
    //window.localStorage.setItem('ActiveSite-URL', activeSiteURL);
    //window.localStorage.setItem('ActiveSite-SiteCSS', activeSiteURL + 'css/site.css');
    //window.localStorage.setItem('ActiveSite-SignalR', activeSiteURL + 'signalr');
    //window.localStorage.setItem('ActiveSite-HubsJS', activeSiteURL + 'signalr/hubs');
    //window.localStorage.setItem('ActiveSite-GUID', 744724);

    API = window.localStorage.getItem('ActiveSite-API');
    console.log('API: ' + API);
}
