loadSiteCSS();

function loadSiteCSS() {
    //var siteJS;
    var siteCSS;
    //var siteURL;
    //var siteJSScript = document.createElement('script');
    var siteCSSLink = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];

    //siteJS = window.localStorage.getItem('ActiveSite-SiteJS');
    //siteCSS = window.localStorage.getItem('ActiveSite-SiteCSS');

    if (phoneGap == true) {
        //siteURL = localStorage.getItem('ActiveSite-URL');
        siteCSS = window.localStorage.getItem('ActiveSite-SiteCSS');
    }
    else {
        //siteURL = '.';
        siteCSS = './css/site.css';
    }

    //siteJSScript.src = siteURL + '/js/site.js';
    siteCSSLink.rel = 'stylesheet';
    siteCSSLink.href = siteCSS;
    //siteJSScript.src = siteJS;

    head.appendChild(siteCSSLink);
    //head.appendChild(siteJSScript);

    //if (phoneGap == true) {

    //    var azureMobileServices = document.createElement('script');
    //    var azureNotificationHub = document.createElement('script');

    //    azureMobileServices.src = 'js/MobileServices.Web-1.1.3.min.js';
    //    azureNotificationHub.src = 'js/NotificationHub.js';

    //    head.appendChild(azureMobileServices);
    //    head.appendChild(azureNotificationHub);

    //}
}



