var defaultSite;
var switchSite;
var savedSites;
var elggMobileAPI;

elggMobileAPI = 'http://elgg-mobile.azurewebsites.net/api.aspx';

$(document).on('pagebeforecreate', function (event) {

    //window.localStorage.clear();

    //setTestDefaults();
        
    defaultSite = window.localStorage.getItem('DefaultSite');
    switchSite = window.localStorage.getItem('SwitchSite');
    savedSites = window.localStorage.getItem('SavedSites');
    
    if (savedSites != null) {
        savedSites = parseInt(savedSites);
    }
    else {
        savedSites = 0;
    }

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

    for (i = sitesPlusOne; i < 11; i++){
        $('#site' + i).addClass('ui-screen-hidden');
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
    var LocalStorageKey;

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
    LocalStorageKey = window.localStorage.getItem(savedSite + '-LocalStorageKey');

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
    window.localStorage.setItem('ActiveSite-LocalStorageKey', LocalStorageKey);

    //window.location.href = "./login.html";
    //the v1.4 way to do things
    //$(":mobile-pagecontainer").pagecontainer("load", "./login.html");

    //the v1.3 way
    $.mobile.changePage('./login.html', { transition: "slide" });
}


function enterEditMode() {
    $('.elggMobile-site-item').each(function () {
        $(this).removeClass('ui-btn-up-c').addClass('ui-btn-up-b');
        //$(this).switchClass('ui-btn-up-c', 'ui-btn-up-b', 1000);
        //$(this).removeClass('ui-btn-down-c').addClass('ui-btn-down-b');
        $(this).attr('data-theme', 'b');
    });

    $('#editButton').attr('onclick', 'exitEditMode()');
    setSavedSiteLink('Y');

}

function exitEditMode() {
    $('.elggMobile-site-item').each(function () {
        $(this).removeClass('ui-btn-up-b').addClass('ui-btn-up-c');
        //$(this).removeClass('ui-btn-down-b').addClass('ui-btn-down-c');
        $(this).attr('data-theme', 'c');
    });
    $('#editButton').attr('onclick', 'enterEditMode()');
    setSavedSiteLink('N');
}

function editSite(siteIndex) {

    var siteLocalStorageKey;
    var siteIcon;
    var siteName;
    var siteDescription;
    var siteSiteAPI;

    siteLocalStorageKey = window.localStorage.getItem('SavedSite-' + siteIndex);
    siteName = window.localStorage.getItem(siteLocalStorageKey + '-SiteName');
    siteIcon = window.localStorage.getItem(siteLocalStorageKey + '-Icon');
    siteDescription = window.localStorage.getItem(siteLocalStorageKey + '-Description');
    siteSiteAPI = window.localStorage.getItem(siteLocalStorageKey + '-API');

    //$('#elggMobile-editPage-header-sitename').html(siteName);
    setEditPageSiteName(siteName);
    $('#elggMobile-deleteSite-popup-deleteBtn').attr('onclick', 'elggMobileDeleteSite("' + siteLocalStorageKey + '",' + siteIndex + ');');

    $('#siteNameInput').val(siteName);
    $('#siteDescriptionInput').val(siteDescription);
    $('#siteAPIInput').val(siteSiteAPI);


    $('.edit-site-list-icon').each(function () {
        $(this).attr('src', siteIcon);
    });
    //document.getElementById('editSiteImg1').src = siteIcon;
    //document.getElementById('editSiteImg2').src = './graphics/elgg.ico';
    //document.getElementById('editSiteImg3').src = './graphics/elgg.ico';

    $('#elggMobileEditSiteSave').attr('onclick', 'editSiteSaveChanges("' + siteLocalStorageKey + '")');

    $.mobile.changePage('#elggMobile-editPage', { transition: "slide" });
    exitEditMode();

}

function setSavedSiteLink(setEdit) {
    var linkToSet = 'selectSite(';

    if (setEdit == 'Y') {
        linkToSet = 'editSite(';
    }

    sitesPlusOne = parseInt(savedSites) + 1;

    for (i = 1; i < sitesPlusOne ; i++) {

        document.getElementById('site' + i + 'Link').href = 'javascript:' + linkToSet + i + ');';

    }

}

function editSiteSaveChanges(siteKey) {
    //alert(siteKey);
    var savedSiteName;
    var savedSiteDescription;
    var savedSiteAPI;

    savedSiteName = document.getElementById('siteNameInput').value;
    savedSiteDescription = document.getElementById('siteDescriptionInput').value;
    savedSiteAPI = document.getElementById('siteAPIInput').value;

    window.localStorage.setItem(siteKey + '-SiteName', savedSiteName);
    window.localStorage.setItem(siteKey + '-Description', savedSiteDescription);
    window.localStorage.setItem(siteKey + '-API', savedSiteAPI);

    setEditPageSiteName(savedSiteName);

}

function elggMobileEditPageBack() {
    $.mobile.changePage('#elggMobile-Setup', { reverse: true, transition: "slide" });
    //$('#siteNameInput').attr('value', '');
    //$('#siteDescriptionInput').attr('value', '');
    //$('#siteAPIInput').attr('value', '');
}

function setEditPageSiteName(siteName) {
    $('.elggMobile-editPage-sitename-class').each(function () {
        $(this).html(siteName);
    });
}

function elggMobileDeleteSite(siteKey, siteIndex) {
    //alert('Key: ' + siteKey + ' Index: ' + siteIndex);
    var sitesPlusOne = parseInt(savedSites) + 1;
    var currentItteration = 1;

    window.localStorage.removeItem(siteKey + '-SiteName');
    window.localStorage.removeItem(siteKey + '-Description');
    window.localStorage.removeItem(siteKey + '-API');
    window.localStorage.removeItem(siteKey + '-SiteJS');
    window.localStorage.removeItem(siteKey + '-URL');
    window.localStorage.removeItem(siteKey + '-SiteCSS');
    window.localStorage.removeItem(siteKey + '-SignalR');
    window.localStorage.removeItem(siteKey + '-HubsJS');
    window.localStorage.removeItem(siteKey + '-GUID');
    window.localStorage.removeItem(siteKey + '-UserName');
    window.localStorage.removeItem(siteKey + '-Password');
    window.localStorage.removeItem(siteKey + '-Persist');
    window.localStorage.removeItem(siteKey + '-Icon');
    window.localStorage.removeItem(siteKey + '-LocalStorageKey');


    for (i = (siteIndex + 1) ; i < sitesPlusOne ; i++) {

        var currentItterationKey;

        currentItterationKey = window.localStorage.getItem('SavedSite-' + i);
        window.localStorage.setItem('SavedSite-' + (i - 1), currentItterationKey);
    };

    window.localStorage.removeItem('SavedSite-' + savedSites);
    savedSites = savedSites - 1;
    window.localStorage.setItem('SavedSites', savedSites);
    //$('#site' + i).addClass('ui-screen-hidden');
    //document.getElementById('site' + i + 'Link').href = 'javascript:' + linkToSet + i + ');';

    //$('#welcomeMsg').hide();
    $('#returnMsg').hide();
    $.mobile.changePage('#elggMobile-Setup', { reverse: true, transition: "slide" });
}

function addKnownSiteSetup() {
    var knownSiteName;
    knownSiteName = document.getElementById('knownSiteInput').value;
    addKnownSite(knownSiteName);
}

function addKnownSiteAddPage() {
    var knownSiteName;
    knownSiteName = document.getElementById('elggMobile-addPage-knownSiteInput').value;
    addKnownSite(knownSiteName);
}

function addKnownSite(knownSiteName) {
    
    var localStorageKey;
    var siteName;
    var description;
    var api;
    var siteJS;
    var url;
    var siteCSS;
    var signalR;
    var hubsJS;
    var icon;



    if (knownSiteName == '') {
        alert('You need to enter a site name, silly');
    }
    else {
        $.mobile.loading('show');
        $.ajax({
            type: "GET",
            url: elggMobileAPI,
            cache: false,
            data: {
                method: 'getknownsitedetails',
                Site: knownSiteName
            },
            dataType: "xml",
            success: function (xml) {
               //logtext = (new XMLSerializer()).serializeToString(xml);
               //console.log(logtext);
               //error = $(xml).find('Error').text();
               //console.log(error);
                if ($(xml).find('Error').text() != '') {
                    $.mobile.loading('hide');
                    alert('Sorry, ' + knownSiteName + " isn't a known site, check with your site admin to make sure of the proper name to use");
                }
                else {
                    localStorageKey = $(xml).find('LocalStorageKey').text();
                    siteName = $(xml).find('SiteName').text();
                    description = $(xml).find('Description').text();
                    api = $(xml).find('API').text();
                    siteJS = $(xml).find('SiteJS').text();
                    url = $(xml).find('URL').text();
                    siteCSS = $(xml).find('SiteCSS').text();
                    signalR = $(xml).find('SignalR').text();
                    hubsJS = $(xml).find('HubsJS').text();
                    icon = $(xml).find('Icon').text();

                    window.localStorage.setItem(localStorageKey + '-LocalStorageKey', localStorageKey);
                    window.localStorage.setItem(localStorageKey + '-SiteName', siteName);
                    window.localStorage.setItem(localStorageKey + '-Description', description);
                    window.localStorage.setItem(localStorageKey + '-API', api);
                    window.localStorage.setItem(localStorageKey + '-SiteJS', siteJS);
                    window.localStorage.setItem(localStorageKey + '-URL', url);
                    window.localStorage.setItem(localStorageKey + '-SiteCSS', siteCSS);
                    window.localStorage.setItem(localStorageKey + '-SignalR', signalR);
                    window.localStorage.setItem(localStorageKey + '-HubsJS', hubsJS);
                    window.localStorage.setItem(localStorageKey + '-Icon', icon);

                    savedSites = parseInt(savedSites) + 1;

                    window.localStorage.setItem('SavedSites', savedSites);
                    window.localStorage.setItem('SavedSite-' + savedSites, localStorageKey);

                    $.mobile.loading('hide');
                    $('#welcomeMsg').hide();
                    
                    $('#returnMsg').show();
                    populateSavedSiteDetails();
                    $('#currentSites').show();
                    
                }

               
            }
        });
    }


}