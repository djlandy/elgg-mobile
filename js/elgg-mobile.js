var defaultSite;
var switchSite;
var savedSites;

$(document).on('pagebeforecreate', function (event) {
    setTestDefaults();

    defaultSite = window.localStorage.getItem('DefaultSite');
    switchSite = window.localStorage.getItem('SwitchSite');
    savedSites = window.localStorage.getItem('SavedSites');

    if (defaultSite != null && switchSite == 'N') {
        var SiteName;
        var API;
        var SiteJS;
        var URL;
        var SiteCSS;
        var SignalR;
        var HubsJS;
        var GUID;
        var UserName;
        var Password;
        var Persist;
        var Description;

        SiteName = window.localStorage.getItem(defaultSite + '-SiteName');
        Description = window.localStorage.getItem(defaultSite + '-Description');
        API = window.localStorage.getItem(defaultSite + '-API');
        SiteJS = window.localStorage.getItem(defaultSite + '-SiteJS');
        URL = window.localStorage.getItem(defaultSite + '-URL');
        SiteCSS = window.localStorage.getItem(defaultSite + '-SiteCSS');
        SignalR = window.localStorage.getItem(defaultSite + '-SignalR');
        HubsJS = window.localStorage.getItem(defaultSite + '-HubsJS');
        GUID = window.localStorage.getItem(defaultSite + '-GUID');
        UserName = window.localStorage.getItem(defaultSite + '-UserName');
        Password = window.localStorage.getItem(defaultSite + '-Password');
        Persist = window.localStorage.getItem(defaultSite + '-Persist');

        console.log('DefaultSite-SiteName: ' + SiteName);
        console.log('DefaultSite-Description: ' + Description);
        console.log('DefaultSite-API: ' + API);
        console.log('DefaultSite-SiteJS: ' + SiteJS);
        console.log('DefaultSite-URL: ' + URL);
        console.log('DefaultSite-SiteCSS: ' + SiteCSS);
        console.log('DefaultSite-SignalR: ' + SignalR);
        console.log('DefaultSite-HubsJS: ' + HubsJS);
        console.log('DefaultSite-GUID: ' + GUID);
        console.log('DefaultSite-UserName: ' + UserName);
        console.log('DefaultSite-Password: ' + Password);
        console.log('DefaultSite-Persist: ' + Persist);

        window.localStorage.setItem('ActiveSite-SiteName', SiteName);
        window.localStorage.setItem('ActiveSite-Description', Description);
        window.localStorage.setItem('ActiveSite-API', API);
        //console.log('ActiveSite-API:' + window.localStorage.getItem('ActiveSite-API'));
        window.localStorage.setItem('ActiveSite-SiteJS', SiteJS);
        window.localStorage.setItem('ActiveSite-URL', URL);
        window.localStorage.setItem('ActiveSite-SiteCSS', SiteCSS);
        window.localStorage.setItem('ActiveSite-SignalR', SignalR);
        window.localStorage.setItem('ActiveSite-HubsJS', HubsJS);
        window.localStorage.setItem('ActiveSite-GUID', GUID);
        window.localStorage.setItem('ActiveSite-UserName', UserName);
        window.localStorage.setItem('ActiveSite-Password', Password);
        window.localStorage.setItem('ActiveSite-Persist', Persist);

        //document.getElementById('mainContent').innerText = SiteName + ' set as current site, see log for details';

        window.location.href = "./login.html";


    }

});

$(document).on('pageshow', function (event) {
    console.log('SavedSites: ' + savedSites);
    if (savedSites < 1) {
        //$('#returnMsg').hide();
        $('#welcomeMsg').show();
        //$('#welcomeMsg').trigger('create');

    }
    else {
        //$('#welcomeMsg').hide();
        $('#returnMsg').show();
        //$('#returnMsg').trigger('create');
        populateSavedSiteDetails();
        $('#currentSites').show();
        //$('#currentSites').trigger('create');
    }
});

function setTestDefaults() {
    var activeSiteURL = 'http://m.nakedfest.co.uk/';

    window.localStorage.setItem('NakedFest-SiteName', 'Naked Fest');
    window.localStorage.setItem('NakedFest-Description', 'Test site for Naked Mates');
    window.localStorage.setItem('NakedFest-API', activeSiteURL + 'api.aspx');
    window.localStorage.setItem('NakedFest-SiteJS', activeSiteURL + 'js/site.js');
    window.localStorage.setItem('NakedFest-URL', activeSiteURL);
    window.localStorage.setItem('NakedFest-SiteCSS', activeSiteURL + 'css/site.css');
    window.localStorage.setItem('NakedFest-SignalR', activeSiteURL + 'signalr');
    window.localStorage.setItem('NakedFest-HubsJS', activeSiteURL + 'signalr/hubs');
    window.localStorage.setItem('NakedFest-GUID', 744724);
    window.localStorage.setItem('NakedFest-UserName', 'stacks');
    window.localStorage.setItem('NakedFest-Password', 'trainspotting');
    window.localStorage.setItem('NakedFest-Persist', 'Y');
    window.localStorage.setItem('NakedFest-Icon', activeSiteURL + 'graphics/icon.png');

    //out of interest ..
    var matesURL = 'http://m.nakedmates.co.uk/';

    window.localStorage.setItem('NakedMates-SiteName', 'Naked Mates');
    window.localStorage.setItem('NakedMates-Description', 'My reason to get up in the morining');
    window.localStorage.setItem('NakedMates-API', matesURL + 'api.aspx');
    window.localStorage.setItem('NakedMates-SiteJS', matesURL + 'js/site.js');
    window.localStorage.setItem('NakedMates-URL', matesURL);
    window.localStorage.setItem('NakedMates-SiteCSS', matesURL + 'css/site.css');
    window.localStorage.setItem('NakedMates-SignalR', matesURL + 'signalr');
    window.localStorage.setItem('NakedMates-HubsJS', matesURL + 'signalr/hubs');
    window.localStorage.setItem('NakedMates-GUID', 744724);
    window.localStorage.setItem('NakedMates-UserName', 'stacks');
    window.localStorage.setItem('NakedMates-Password', 'trainspotting');
    window.localStorage.setItem('NakedMates-Persist', 'Y');
    window.localStorage.setItem('NakedMates-Icon', matesURL + 'graphics/icon.png');

    //Elgg Mobile
    var elggMobileURL = 'http://elgg-mobile.azurewebsites.net/';

    window.localStorage.setItem('ElggMobile-SiteName', 'Elgg Mobile');
    window.localStorage.setItem('ElggMobile-Description', 'Demo site for mobile app');
    window.localStorage.setItem('ElggMobile-API', elggMobileURL + 'api.aspx');
    window.localStorage.setItem('ElggMobile-SiteJS', elggMobileURL + 'js/site.js');
    window.localStorage.setItem('ElggMobile-URL', elggMobileURL);
    window.localStorage.setItem('ElggMobile-SiteCSS', elggMobileURL + 'css/site.css');
    window.localStorage.setItem('ElggMobile-SignalR', elggMobileURL + 'signalr');
    window.localStorage.setItem('ElggMobile-HubsJS', elggMobileURL + 'signalr/hubs');
    window.localStorage.setItem('ElggMobile-GUID', elggMobileURL);
    window.localStorage.setItem('ElggMobile-UserName', 'david');
    window.localStorage.setItem('ElggMobile-Password', 'trainspotting');
    window.localStorage.setItem('ElggMobile-Persist', 'Y');
    window.localStorage.setItem('ElggMobile-Icon', elggMobileURL + 'graphics/elgg.ico');

    window.localStorage.setItem('DefaultSite', 'NakedFest');
    window.localStorage.setItem('SwitchSite', 'Y');
    //window.localStorage.setItem('SavedSites', 0);

    //window.localStorage.setItem('NakedMates-Description', 'Like mates, but naked');

    window.localStorage.setItem('SavedSites', 3);
    window.localStorage.setItem('SavedSite-1', 'NakedFest');
    window.localStorage.setItem('SavedSite-2', 'NakedMates');
    window.localStorage.setItem('SavedSite-3', 'ElggMobile');
}

function populateSavedSiteDetails() {
    var sitesPlusOne;

    sitesPlusOne = parseInt(savedSites) + 1;

    //alert('Saved Sites: ' + savedSites);
    //alert('Saved Sites + 1: ' + sitesPlusOne);

    //$('li').hide();

    for (i = 1; i < sitesPlusOne ; i++) {
        var savedSite;
        var savedSiteName;
        var savedSiteDescription;
        var savedSiteImg;

        //alert('i = ' + i + '\nSaved Sites : ' +  savedSites);
        savedSite = window.localStorage.getItem('SavedSite-' + i);
        savedSiteName = window.localStorage.getItem(savedSite + '-SiteName');
        savedSiteDescription = window.localStorage.getItem(savedSite + '-Description');
        savedSiteImg = window.localStorage.getItem(savedSite + '-Icon');
        document.getElementById('site' + i + 'Name').innerText = savedSiteName;
        document.getElementById('site' + i + 'Description').innerText = savedSiteDescription;
        document.getElementById('site' + i + 'Img').src = savedSiteImg;
        $('#site' + i).removeClass('ui-screen-hidden');

    }


    $('#currentSites').listview('refresh');

}

function selectSite(site) {
    //alert(site);
    var SavedSite;
    var SiteName;
    var API;
    var SiteJS;
    var URL;
    var SiteCSS;
    var SignalR;
    var HubsJS;
    var GUID;
    var UserName;
    var Password;
    var Persist;
    var Description;

    savedSite = window.localStorage.getItem('SavedSite-' + site);
    //alert(savedSite);

    SiteName = window.localStorage.getItem(savedSite + '-SiteName');
    Description = window.localStorage.getItem(savedSite + '-Description');
    API = window.localStorage.getItem(savedSite + '-API');
    SiteJS = window.localStorage.getItem(savedSite + '-SiteJS');
    URL = window.localStorage.getItem(savedSite + '-URL');
    SiteCSS = window.localStorage.getItem(savedSite + '-SiteCSS');
    SignalR = window.localStorage.getItem(savedSite + '-SignalR');
    HubsJS = window.localStorage.getItem(savedSite + '-HubsJS');
    GUID = window.localStorage.getItem(savedSite + '-GUID');
    UserName = window.localStorage.getItem(savedSite + '-UserName');
    Password = window.localStorage.getItem(savedSite + '-Password');
    Persist = window.localStorage.getItem(savedSite + '-Persist');

    window.localStorage.setItem('ActiveSite-SiteName', SiteName);
    window.localStorage.setItem('ActiveSite-Description', Description);
    window.localStorage.setItem('ActiveSite-API', API);
    window.localStorage.setItem('ActiveSite-SiteJS', SiteJS);
    window.localStorage.setItem('ActiveSite-URL', URL);
    window.localStorage.setItem('ActiveSite-SiteCSS', SiteCSS);
    window.localStorage.setItem('ActiveSite-SignalR', SignalR);
    window.localStorage.setItem('ActiveSite-HubsJS', HubsJS);
    window.localStorage.setItem('ActiveSite-GUID', GUID);
    window.localStorage.setItem('ActiveSite-UserName', UserName);
    window.localStorage.setItem('ActiveSite-Password', Password);
    window.localStorage.setItem('ActiveSite-Persist', Persist);

    //window.location.href = "./login.html";
    //the v1.4 way to do things
    //$(":mobile-pagecontainer").pagecontainer("load", "./login.html");

    //the v1.3 way
    $.mobile.changePage('./login.html', { transition: "slide" } );
}

