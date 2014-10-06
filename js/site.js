var localJSRequest = new XMLHttpRequest;

var localJSScript;

var scriptURL;

scriptURL = window.localStorage.getItem('ActiveSite-SiteJS');

//alert(scriptURL);

localJSRequest.open('GET', scriptURL, false);
localJSRequest.send();
localJSScript = localJSRequest.responseText;
eval(localJSScript);


//function SetSiteCSS() {

//    $('#headerbar').setAttribute('class', 'NM-header');
//}

//function SetSiteVariables() {
//    //API = './api.aspx';
//    API = 'http://m.nakedfest.co.uk/api.aspx';
//}

//function SetLoginTitle() {
//    var LoginTitle;
//    LoginTitle = "NM Mobile";
//    document.title = LoginTitle;
//}

//function SetSiteTitle() {
//    var NakedText;
//    var MatesText;

//    $('#sitetitle').html('');

//    NakedText = document.createElement('span');
//    NakedText.setAttribute('class', 'nakedtext');
//    NakedText.innerHTML = 'NAKED';

//    MatesText = document.createElement('span');
//    MatesText.setAttribute('class', 'matestext');
//    MatesText.innerHTML = 'MATES';

//    $('#sitetitle').append(NakedText);
//    $('#sitetitle').append(MatesText);
//}

//function CreateNavBar() {
//    var NavBar;
//    var NavButton1;
//    var NavButton2;
//    var NavButton3;
//    var NavButton4;
//    var NavButton1link;
//    var NavButton2link;
//    var NavButton3link;
//    var NavButton4link;

//    document.getElementById('NavBarDiv').innerHTML = "";

//    if (document.getElementById('NavBarDiv').innerHTML == "") {
//        NavBar = document.createElement('ul');
//        NavButton1 = document.createElement('li');
//        NavButton2 = document.createElement('li');
//        NavButton3 = document.createElement('li');
//        NavButton4 = document.createElement('li');
//        NavButton5 = document.createElement('li');

//        NavButton1link = document.createElement('a');
//        NavButton2link = document.createElement('a');
//        NavButton3link = document.createElement('a');
//        NavButton4link = document.createElement('a');
//        NavButton5link = document.createElement('a');

//        NavBar.setAttribute('id', 'NavButtons');
//        NavButton1link.setAttribute('href', './home.html');
//        NavButton1link.setAttribute('data-transition', 'slide');
//        NavButton2link.setAttribute('href', './wire.html');
//        NavButton2link.setAttribute('data-transition', 'slide');
//        NavButton3link.setAttribute('href', 'javascript:LoadPage("Test1", "Mail");');
//        NavButton3link.setAttribute('data-transition', 'slide');
//        NavButton4link.setAttribute('href', 'javascript:LoadPage("Test1", "Mates");');
//        NavButton4link.setAttribute('data-transition', 'slide');
//        NavButton5link.setAttribute('href', 'javascript:LoadPage("Test1", "GPS");');
//        NavButton5link.setAttribute('data-transition', 'slide');

//        NavButton1link.innerHTML = 'Home';
//        NavButton2link.innerHTML = 'Wire';
//        NavButton3link.innerHTML = 'Mail';
//        NavButton4link.innerHTML = 'Mates';
//        NavButton5link.innerHTML = 'GPS';


//        NavButton1.appendChild(NavButton1link);
//        NavButton2.appendChild(NavButton2link);
//        NavButton3.appendChild(NavButton3link);
//        NavButton4.appendChild(NavButton4link);
//        NavButton5.appendChild(NavButton5link);

//        NavBar.appendChild(NavButton1);
//        NavBar.appendChild(NavButton2);
//        NavBar.appendChild(NavButton3);
//        NavBar.appendChild(NavButton4);
//        NavBar.appendChild(NavButton5);

//        document.getElementById('NavBarDiv').appendChild(NavBar);
//        //$('#NavBarDiv').navbar();
//        //$('#NavBarDiv').appendChild(NavBar);
//    }
//}

//function SetUpPageDivs() {

//    var Pages = new Array();

//    Pages[0] = 'Home';
//    Pages[1] = 'Wire';
//    Pages[2] = 'Mail';
//    Pages[3] = 'Mates';
//    Pages[4] = 'GPS';
//    Pages[5] = 'Profile';
//    Pages[6] = 'Gallery';

//    for (var i = 0; i < Pages.length; i++) {
//        var PageDiv;

//        PageDiv = document.createElement('div');
//        PageDiv.setAttribute('id', Pages[i]);
//        //PageDiv.setAttribute('date-role', 'page');
//        //PageDiv.setAttribute('data-add-back-btn', 'true');
//        //PageDiv.setAttribute('class', 'ui-page-theme-b');
//        $('#content').append(PageDiv);
//        //document.getElementById('body').appendChild(PageDiv);
//    }
//}

//function SetLoginPageText() {
//    var NakedText;
//    var MatesText;

//    NakedText = document.createElement('span');
//    NakedText.setAttribute('class', 'nakedtext');
//    NakedText.innerHTML = 'NAKED';

//    MatesText = document.createElement('span');
//    MatesText.setAttribute('class', 'matestext');
//    MatesText.innerHTML = 'MATES';

//    $('#loginsitetitle').append(NakedText);
//    $('#loginsitetitle').append(MatesText);
//}

//function GetAbsoluteURL(relURL, LinkID) {
//    var docURL = $.mobile.path.parseUrl(document.URL);
//    docURL.hrefNoSearch;
//    var absURL = $.mobile.path.makeUrlAbsolute(relURL, docURL);
//    //alert(absURL);
//    return absURL;
//}

//function ShowLocation() {
//    navigator.geolocation.getCurrentPosition(function (pos) {
//        var lat = pos.coords.latitude;
//        var lng = pos.coords.longitude;
//        $("#lat").text(lat);
//        $("#lng").text(lng);
//    });
//}

//function setDesktopUrl() {
//    var desktopURL;
//    var desktopURLElement;

//    desktopURL = GetAbsoluteURL('members/pg/dashboard/');
//    desktopURLElement = document.getElementById('desktoplink');
//    if (desktopURLElement != undefined) {
//        desktopURLElement.setAttribute('href', desktopURL);
//    }
//}

//function setUpgradeUrl() {
//    var upgradeURL;
//    var upgradeElement;

//    upgradeURL = 'http://www.nakedmates.co.uk/members/pg/ticket/toomanymessages';
//    //alert (upgradeURL);
//    upgradeElement = document.getElementById('upgradelink');

//    upgradeElement.setAttribute('href', upgradeURL);

//}

