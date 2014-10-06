//var API;
var SiteName;
var lat;
var lng;
var GUID;
var StartTime;
var EndTime;
var pageList;
var pageName;
var wireReplyTo;

wireReplyTo = '';

if (typeof phoneGap === 'undefined') {
    phoneGap = false;
}

if (phoneGap == true) {
    GUID = window.localStorage.getItem('ActiveSite-GUID');
}

console.log('PhoneGap: ' + phoneGap);
//API = "./api.aspx";


//$(document).ajaxStart(function () {
//    // $.mobile.loading('show');
//});

//$(document).ajaxStop(function () {
//    // $.mobile.loading('hide');
//});

//$(document).on({
//    ajaxStart: function () {
//        $.mobile.loading('show');
//    },
//    ajaxStop: function () {
//        $.mobile.loading('hide');
//    }
//});

//$(document).on('pageinit', '#landing', function (event) {
//    SetSiteTitle();
//    CreateNavBar();
//});

$(document).on('pagebeforecreate', '#home', function (event) {
    setLocation();
});

$(document).on('pageinit', '#newWirePost', function (event) {
    CheckCharacters();
});

$(document).on('pagebeforecreate', '#newWirePost', function (event) {
    getReplyTo();
});

$(document).on('pagebeforecreate', function (event) {

    pageName = $('div[data-role="page"]').attr('id');
    console.log('Pagename: ' + pageName);


    if (pageName != 'login') {
        var version;
        var page;

        console.log('Pagename: ' + pageName);

        version = 'v1.1';
        //pageName = $('div[data-role="page"]').attr('id');
        pageList = ['login', 'index', 'error'];
        //pageName = page.attr('id');

        if (pageList.indexOf(pageName) == -1) {
            //alert(pageName);
            //alert($.connection.hub.url);
            //alert($.support.cors);
            console.log('API: ' + API);
            $.support.cors = false;
            console.log('$.support.cors = ' + $.support.cors);
            if (phoneGap == true) {

                //Uncomment to enable unread push
                var signalRURL = window.localStorage.getItem('ActiveSite-SignalR');
                console.log('signalRURL: ' + signalRURL);
                $.connection.hub.url = signalRURL;

            }

            //getSideBar();

            getSiteWideMessage();
            getPageMessage(pageName);
            getPageMessage('mobile');
            showPageMessages(pageName);
            //if (phoneGap == false) {
            //getUnreadMailCount();
            setupNotificationHandlers();
            //}
            //getMatesCount();
            setFooter(version);
            setDesktopUrl();
            //window.setInterval(function () { getUnreadMailCount() }, 60000);
            //window.setInterval(function () { getMatesCount() }, 60000);
            if (pageName != 'wire') {
                unreadWireCount = parseInt(localStorage.getItem("UnreadWireCount"));
                //alert(unreadWireCount);
                updateUnreadWireCount(unreadWireCount);
                window.addEventListener('storage', nonWireStorageEventHandler, false);
            }
            else {
                localStorage["UnreadWireCount"] = 0;
                localStorage["WireCountOverrideGUID"] = parseInt(localStorage.getItem("LastWireUpdate"))
            }
        }


    }


});

$(document).on('pagebeforecreate', '#wire', function (event) {
    setLocation();
});

$(document).on('pagebeforecreate', '#login', function (event) {
    SetSiteVariables();
    //SetSiteTitle();
    //SetLoginTitle();
    SetLoginPageText();
});

$(document).on('pagebeforecreate', '#gps', function (event) {
    setLocation();
    getMates();
});

$(document).on('pageinit', '#gps', function (event) {

    ShowLocation();
});

$(document).on('pageinit', '#login', function (event) {
    //SetSiteVariables();
    //SetSiteTitle();
    SetLoginTitle();
    //SetLoginPageText();
});

//$(document).on('pageinit', '#landing', function (event) {
//    LoadPage('Welcome', 'landing');
//});

$(document).on('pageinit', '#wire', function (event) {
    //$.mobile.loading('show');
    buildRiverView();
    $.mobile.loading('hide');
});


$(document).on('pageshow', '#wire', function (event, ui) {
    //alert('pagesshow');
    //console.log($('#wireView').html());

    //if ($('#content').html() == "") {
    $.mobile.loading('show');
    getWirePostHandler();
    //alert('div empty');
    //}

    //Uncomment to enable wire push
    //subscribeToWirePush();

    //$(document).on('storage', wireStorageEventHandler );
    window.addEventListener('storage', wireStorageEventHandler, false);

});



$(document).on('pagebeforecreate', '#postdetail', function (event) {
    //$.mobile.loading('show');
    buildPostDetail();

});


$(document).on('pageshow', '#postdetail', function (event, ui) {
    //alert('pagesshow');
    //console.log($('#wireView').html());

    //if ($('#content').html() == "") {
    $.mobile.loading('show');
    getWirePostHandler();
    //alert('div empty');
    //}
});

$(document).on('pageshow', '#profile', function (event, ui) {
    $('#location-grid-li').hide();
    $('#stats-grid-li').hide();
    $('#interests-li').hide();
    $('#about-li').hide();

    $.mobile.loading('show');
});

$(document).on('pagebeforecreate', '#profile', function (event, ui) {
    getProfileDetails();
});

$(document).on('pagebeforecreate', '#mail', function (event, ui) {
    setLocation();
    BuildMessageList();
    //setUpgradeUrl();
    //showPageMessage('mail');

    showPageMessages('mail');
});

$(document).on('pageshow', '#mail', function (event, ui) {
    $.mobile.loading('show');

});

$(document).on('pagebeforecreate', '#viewmessage', function (event) {
    //$.mobile.loading('show');
    var fromGUID;
    var messageToName;
    var replySubject;
    var subject;

    buildMessageDetail();

});


$(document).on('pageshow', '#viewmessage', function (event, ui) {
    //alert('pagesshow');
    //console.log($('#wireView').html());

    //if ($('#content').html() == "") {
    $.mobile.loading('show');
    //prepareMessageHandler();
    //alert('div empty');
    //}
});

$(document).on('pagebeforecreate', '#newMessage', function (event) {
    //$.mobile.loading('show');
    getNewMessageDetails();
    getMessageToName();
});

$(document).on('pageshow', '#gps', function (event, ui) {

    $.mobile.loading('show');

});

$(document).on('pagebeforecreate', '#albumList', function (event) {
    setLocation();
});

$(document).on('pageshow', '#albumList', function (event, ui) {
    $.mobile.loading('show');

});

$(document).on('pageinit', '#albumList', function (event) {
    //buildRiverView();
    buildAlbumList();
    $.mobile.loading('hide');
});

$(document).on('pagebeforecreate', '#albumDisplay', function (event) {
    //setLocation();
});

$(document).on('pageshow', '#albumDisplay', function (event, ui) {
    $.mobile.loading('show');

});

$(document).on('pageinit', '#albumDisplay', function (event) {
    //buildRiverView();
    buildImageList();

    $('#modalGallery').on('click', function () {
        hideGallery();

    });

    $('#galleryContainer').click(function (e) {

        e.stopPropagation();
    });

    $.mobile.loading('hide');
});

$(document).on('pageshow', '#mates', function (event, ui) {
    $.mobile.loading('show');

});

$(document).on('pageinit', '#mates', function (event) {
    //buildRiverView();
    buildFriendRequests();

    $.mobile.loading('hide');
});

$(document).bind("ajaxSend", function () {

}).bind("ajaxComplete", function () {
    var UnAuthenticated;

    UnAuthenticated = readCookie('Unauthenticated');
    if (UnAuthenticated == 'True') {
        //alert(UnAuthenticated);
        window.location.href = '.';
    }

});

$(document).on('pageshow', function (event) {
    if (pageName != 'login') {
        if (pageList.indexOf(pageName) == -1) {
            setSiteTitle();
            buildSideBar();
        }
    }
});

//$(document).on('pageshow', function (event) {

////        var page;
////        var pageName;


////        page = $('div').find('[data-role="page"]');
////        pageName = page.attr('id');

////        alert(pageName);
//    setupNotificationHandlers();
//});

function buildRiverView() {

    var userName;
    var postText;
    var picURL;
    var returnedXML;
    var data;

    var getURL;
    var wireText;
    var thumbnail;
    var wireTable;

    wireTable = "";

    //$.mobile.loading('show');

    Authenticate(getXML);

    //getXML(UserKey);
}
function getXML(userKey) {
    var wireView;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    StartTime = Date.now();

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getwire',
            UserToken: userKey,
            Posts: 5
        },
        dataType: "xml",
        success: function (xml) {
            EndTime = Date.now();

            var duration = (EndTime - StartTime) / 1000;
            console.log('GetXML - Duration: ' + duration + 's');

            //returnedXML = (new XMLSerializer()).serializeToString(xml);
            //logtext = (new XMLSerializer()).serializeToString(xml);

            //console.log(logtext);
            wireView = document.createElement('ul');
            wireView.setAttribute('id', 'wireTable');
            wireView.setAttribute('data-role', 'listview');
            wireView.setAttribute('data-inset', 'true');

            $(xml).find('WirePost').each(function () {
                wirePost = BuildWire($(this), false);
                wireView.appendChild(wirePost);
            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            document.getElementById('wire_display').appendChild(wireView);
            $('#content').trigger('create');
            //$('#wire_display').listview('refresh');

            $.mobile.loading('hide');
            EndTime = Date.now();

            var duration = (EndTime - StartTime) / 1000;
            console.log('BuildWire - Duration: ' + duration + 's');
        }
    });
}

function Authenticate(nextFunction, parm1, parm2, parm3, parm4, parm5) {
    var userKey;
    var userName;
    var password;
    var storedKey;

    storedKey = 'NOT-REQUIRED';
    console.log('API: ' + API);

    //storedKey = readCookie('UserToken');

    //if (storedKey == undefined) {

    //    userName = readCookie('UserName');
    //    password = readCookie('Password');

    //    $.ajax({
    //        type: "GET",
    //        url: API,
    //        cache: false,

    //        data: {
    //            method: 'ReAuthenticate',
    //            username: userName,
    //            password: password
    //        },

    //        success: function (xmlk) {

    //            userKey = $(xmlk).find('UserToken').text();
    //            SetCookie('UserToken', userKey, 0.03125);
    //            nextFunction(userKey, parm1, parm2, parm3, parm4, parm5);
    //        }
    //    });

    //}
    //else {
    //alert(storedKey);
    $.support.cors = true;
    nextFunction(storedKey, parm1, parm2, parm3, parm4, parm5);
    $.support.cors = false;
    //}
}

function testNextFuntion(userKey) {
    alert("TestFunctionCalled");
    alert("UserKey:" + userKey)
}

function LoadPage(PageName, DivName) {
    $.ajax({
        type: 'GET',
        url: './pages/' + PageName + '.html',
        cache: false,
        dataType: 'html',
        success: function (html) {
            $('#' + DivName).html(html);
            $('#main-content').trigger('create')
        }
    })

}

function BuildDiv(html, DivName) {
    $('#' + DivName).html(html);
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function LockScroll() {
    $("#NavBarDiv").bind("touchmove", function (event) {
        event.preventDefault();
    })
}

function BuildWire(xml, wireAdd) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    //var wireBodyDiv;

    if (wireAdd == null) {
        wireAdd = false;
    }

    postGUID = xml.find('GUID').text();
    postAuthor = xml.find('Author').text();
    postTitleText = xml.find('Title').text();
    postBodyText = xml.find('Body').text();
    thumbnailLink = xml.find('Avatar').text();
    timeCreatedText = xml.find('DateTime').text();

    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(userName);
    //returnedXML = $(xml).text;

    showMoreUrl = 'ShowMoreWire(' + postGUID + ')';
    postLink = document.createElement('a');
    profileLink = document.createElement('a');
    wirePost = document.createElement('li');
    postTitle = document.createElement('div');
    postBody = document.createElement('div');
    thumbnail = document.createElement('img');
    profileLink = document.createElement('a');
    timeCreated = document.createElement('div');
    //wireBodyDiv = document.createElement('div');

    //wireBodyDiv.setAttribute('class', 'vertical-centre');

    //profileLink.setAttribute('href', './profile.html?' + postAuthor);
    //profileLink.setAttribute('data-enhance', 'false');

    postLink.setAttribute('href', './postdetail.html?post=' + postGUID);
    //wirePost.setAttribute('class', 'wire-post');
    postBody.setAttribute('class', 'wire-body-text wire-post');
    postTitle.setAttribute('class', 'wire-post');
    timeCreated.setAttribute('class', 'wire-post');

    postTitle.innerHTML = postTitleText;
    postBody.innerHTML = postBodyText;
    thumbnail.setAttribute('src', thumbnailLink);
    //thumbnail.setAttribute('onclick', 'viewProfile(' + postAuthor + ')');

    //thumbnail.setAttribute('class', 'ui-li-thumb');

    //timeCreated.setAttribute('class', 'ui-li-aside wireDateText');
    timeCreated.innerHTML = timeCreatedText;

    profileLink.appendChild(thumbnail);

    //wirePost.appendChild(profileLink);
    postLink.appendChild(profileLink);
    postLink.appendChild(thumbnail);
    postLink.appendChild(postTitle);
    postLink.appendChild(postBody);
    postLink.appendChild(timeCreated);

    wirePost.appendChild(postLink);
    wirePost.setAttribute('id', postGUID);

    if (wireAdd != true) {
        document.getElementById('show_more_btn').setAttribute('onclick', showMoreUrl);
    }



    return wirePost;
}

function ShowMoreWire(offset_guid) {
    $.mobile.loading('show');
    Authenticate(GetMoreWire, offset_guid);
}

function GetMoreWire(userKey, offsetGUID) {
    //alert('user key: ' + userKey);
    //alert('offset: ' + offsetGUID);
    //$.mobile.loading('hide');

    var wireView;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getmorewire',
            UserToken: userKey,
            Posts: 5,
            OffsetGUID: offsetGUID
        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            //wireView = document.createElement('ul');
            //wireView.setAttribute('id', 'wireTable');
            //wireView.setAttribute('data-role', 'listview');
            //wireView.setAttribute('data-inset', 'true');

            $(xml).find('WirePost').each(function () {
                wirePost = BuildWire($(this), false);
                $('#wireTable').append(wirePost);
            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            //document.getElementById('wire_display').appendChild(wireView);
            $('#wireTable').listview('refresh');

            $.mobile.loading('hide');
        }
    });
}
function refreshWire() {
    $.mobile.loading('show');
    $('#wire_display').html('');
    Authenticate(getXML);
}

function buildPostDetail() {
    var qs = GetQueryString();
    var postGUID;

    postGUID = qs["post"];

    //alert(queyString);
    //alert(postGUID);

    Authenticate(getSinglePost, postGUID);
}

function GetQueryString() {
    var assoc = {};
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');

    for (var i in keyValues) {
        var key = keyValues[i].split('=');
        if (key.length > 1) {
            assoc[decode(key[0])] = decode(key[1]);
        }
    }

    return assoc;
}

function getSinglePost(userKey, guid) {
    //alert('user key: ' + userKey);
    //alert('offset: ' + offsetGUID);
    //$.mobile.loading('hide');

    var wireView;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getsinglewirepost',
            UserToken: userKey,
            PostGUID: guid
        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            //wireView = document.createElement('ul');
            //wireView.setAttribute('id', 'wireTable');
            //wireView.setAttribute('data-role', 'listview');
            //wireView.setAttribute('data-inset', 'true');

            $(xml).find('WirePost').each(function () {
                //alert('got post');
                BuildSingleWire($(this));
                //$('#wireTable').append(wirePost);
                //alert(wirePost);
            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            //document.getElementById('wire_display').appendChild(wireView);
            //$('#wireTable').listview('refresh');

            $.mobile.loading('hide');
        }
    });
}

function BuildSingleWire(xml) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    var authorGUID;
    //var wireBodyDiv;

    postGUID = xml.find('GUID').text();
    postAuthor = xml.find('Author').text();
    postTitleText = xml.find('Title').text();
    postBodyText = xml.find('Body').text();
    thumbnailLink = xml.find('Avatar').text();
    timeCreatedText = xml.find('DateTime').text();
    authorGUID = xml.find('AuthorGUID').text()

    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(userName);
    //returnedXML = $(xml).text;

    //showMoreUrl = 'ShowMoreWire(' + postGUID + ')';
    //postLink = document.createElement('a');
    //profileLink = document.createElement('a');
    //wirePost = document.createElement('li');
    //postTitle = document.createElement('div');
    //postBody = document.createElement('div');
    thumbnail = document.createElement('img');
    profileLink = document.createElement('a');
    //timeCreated = document.createElement('div');
    //wireBodyDiv = document.createElement('div');

    //wireBodyDiv.setAttribute('class', 'vertical-centre');

    profileLink.setAttribute('href', './profile.html?guid=' + authorGUID);
    //profileLink.setAttribute('data-enhance', 'false');

    //postLink.setAttribute('href', './postdetail.html?' + postGUID);
    //wirePost.setAttribute('class', 'wire-post');
    //postBody.setAttribute('class', 'wire-body-text wire-post');
    //postTitle.setAttribute('class', 'wire-post');
    //timeCreated.setAttribute('class', 'wire-post');

    //postTitle.innerHTML = postTitleText;
    //postBody.innerHTML = postBodyText;
    thumbnail.setAttribute('src', thumbnailLink);

    //thumbnail.setAttribute('class', 'ui-li-thumb');

    //timeCreated.setAttribute('class', 'ui-li-aside wireDateText');
    //timeCreated.innerHTML = timeCreatedText;

    profileLink.appendChild(thumbnail);

    //wirePost.appendChild(profileLink);
    //postLink.appendChild(profileLink);
    //postLink.appendChild(thumbnail);
    //postLink.appendChild(postTitle);
    //postLink.appendChild(postBody);
    //postLink.appendChild(timeCreated);

    //wirePost.appendChild(postLink);

    //document.getElementById('show_more_btn').setAttribute('onclick', showMoreUrl);

    //$('#detailPic').append(thumbnail);
    $('#detailPic').append(profileLink);
    $('#detailPic').addClass('wire-detail-pic');
    $('#detailBodyText').html(postBodyText);
    $('#detailPostTimeText').html(timeCreatedText);
    $('#detailTitleText').html(postTitleText);
    //document.getElementById('reply_wire_btn').setAttribute('href', './newWirePost.html?replyto=' + postAuthor);
    wireReplyTo = postAuthor;

    var postText = document.getElementById('wirePostText');

    if (postText != null) {
        postText.value = '@' + wireReplyTo + ' ';
    }

    $('#Post_ul').listview('refresh');

    //return wirePost;
}

function postWire() {
    var PostBody;

    PostBody = document.getElementById('wirePostText').value;
    //PostBody = $('#wirePostText').html();
    //alert(PostBody);

    if (PostBody == '') {
        document.getElementById('errorText').innerText = "Your post can't be blank";
        return;

    }
    Authenticate(postWirePost, PostBody)
    //postWirePost(PostBody)
}

function postWirePost(userKey, wirePostText) {
    var Username;

    Username = readCookie('UserName');

    //alert('Key ' + userKey);
    //alert('Post Text ' + wirePostText);
    //alert('UserName ' + Username);

    $.ajax({
        type: "POST",
        url: API,
        cache: false,

        data: {
            method: 'postwire',
            username: Username,
            post: wirePostText,
            usertoken: userKey

        },

        success: function (xmlk) {
            //$.mobile.changePage("./wire.html");
            window.location.replace("./wire.html");
            //userKey = $(xmlk).find('UserToken').text();

            //nextFunction(userKey, parms);
        }
    });

}

function getUnreadMailCount() {
    Authenticate(unreadCount);
}

function unreadCount(userKey) {
    var unreadMessages;

    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'getunreadmessagecount',
            usertoken: userKey

        },

        success: function (xmlk) {
            //$.mobile.changePage("./wire.html");
            unreadMessages = $(xmlk).find('UnreadMessages').text();
            //alert (unreadMessages);

            if (unreadMessages > 0) {
                $('#unreadMessageCount').html(' ' + unreadMessages);
            }

            else {
                $('#unreadMessageCount').html();
            }
            //nextFunction(userKey, parms);
        }
    });
}

function getReplyTo() {

    var qs = GetQueryString();
    var replyTo;

    replyTo = qs["replyto"];
    if (replyTo != undefined) {
        document.getElementById('wirePostText').value = '@' + replyTo + ' ';
    }

}

function CheckCharacters() {
    var post;
    var limit;
    var currentLength;
    var remaining;

    post = document.getElementById('wirePostText');
    limit = post.attributes.maxLength.value;
    currentLength = post.value.length;
    remaining = limit - currentLength;
    if (remaining > -1) {
        $('#characters_remaining').html(remaining);
        if (remaining < 40) {
            $('#characters_remaining').addClass('red-highlight');
        }
        else {
            $('#characters_remaining').removeClass('red-highlight');
        }
    }
}

function viewProfile(guid) {
    var guid;

    if (guid == undefined) {
        guid = document.getElementById('profile-view').value;
    }
    else {
        guid = passedProfile;
    }

    window.location.replace('./profile.html?guid=' + guid);

}

function getProfileDetails() {
    var qs = GetQueryString();
    var guid;

    guid = qs["guid"];

    //alert(profile);

    Authenticate(getProfile, guid);
}

function getProfile(userKey, guid) {
    var userName;
    var picURL;
    var age;
    var smoke;
    var cock;
    var ethnicity;
    var height;
    var role;
    var cut;
    var about;
    var interests;
    var category;
    var iam;
    var ican;
    var lookingfor;
    var location;
    var largePicURL;
    var hasAlbums;
    var isMe;
    var relationshipType;
    var profileBtns;
    var detailItems;
    var i;

    i = 1;



    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'getprofiledetails',
            usertoken: userKey,
            guid: guid

        },

        success: function (xmlk) {

            detailItems = parseInt($(xmlk).find('DetailItems').text());
            console.log('Deatil Items: ' + detailItems);

            GUID = $(xmlk).find('GUID').text();
            userName = $(xmlk).find('UserName').text();
            picURL = $(xmlk).find('Avatar').text();
            //category = $(xmlk).find('Category').text();
            interests = $(xmlk).find('Interests').text();
            largePicURL = picURL.replace('medium', 'large');
            hasAlbums = $(xmlk).find('HasAlbums').text();
            about = $(xmlk).find('About').text();
            isMe = $(xmlk).find('IsMe').text();
            relationshipType = $(xmlk).find('RelationshipType').text();

            //iam = $(xmlk).find('Iam').text();
            //ican = $(xmlk).find('Ican').text();
            //lookingfor = $(xmlk).find('LookingFor').text();
            //location = $(xmlk).find('Location').text();
            //age = $(xmlk).find('Age').text();
            //smoke = $(xmlk).find('Smoke').text();
            //cock = $(xmlk).find('Cock').text();
            //ethnicity = $(xmlk).find('Ethnicity').text();
            //height = $(xmlk).find('Height').text();
            //role = $(xmlk).find('Role').text();
            //cut = $(xmlk).find('Cut').text();



            //ican = ican.replace(/([a-z])([A-Z])/g, '$1 $2');
            //lookingfor = lookingfor.replace(/([a-z])([A-Z])/g, '$1 $2');


            document.getElementById('profile-name').innerText = userName;
            //document.getElementById('category').innerText = category;
            //document.getElementById('iam').innerText = iam;
            //document.getElementById('ican').innerText = ican;
            //document.getElementById('lookingfor').innerText = lookingfor;
            //document.getElementById('location').innerText = location;
            document.getElementById('profile-picture').setAttribute('src', picURL);
            document.getElementById('profile-picture').setAttribute('onclick', 'showLargeProfilePic();')
            document.getElementById('large-profile-pic').setAttribute('src', largePicURL);
            //document.getElementById('age').innerText = age;
            //document.getElementById('smoke').innerText = smoke;
            //document.getElementById('size').innerText = cock;
            //document.getElementById('eth').innerText = ethnicity;
            //document.getElementById('height').innerText = height;
            //document.getElementById('role').innerText = role;
            //document.getElementById('cut').innerText = cut;
            document.getElementById('about-content').innerText = about;
            document.getElementById('interests-content').innerText = interests;
            //document.getElementById('large-pic-header').innerText = userName;



            while (i < (detailItems + 1)) {
                var detailItemName;
                var detailItemDetail;
                var detailItemNameSpan;
                var detailItemDetailSpan;

                detailItemNameSpan = 'detailItem' + i + 'Name';
                detailItemDetailSpan = 'detailItem' + i + 'Detail';

                detailItemName = $(xmlk).find('DetailItem' + i + 'Name').text() + ': ';
                detailItemDetail = $(xmlk).find('DetailItem' + i + 'Detail').text();

                //console.log('i: ' + detailItemNameSpan);

                //this should be server server side
                //if (detailItemName.toUpperCase() == 'I CAN') {
                //    detailItemDetail = detailItemDetail.replace(/([a-z])([A-Z])/g, '$1 $2');
                //}
                //if (detailItemName.toUpperCase() == 'LOOKING FOR') {
                //    detailItemDetail = detailItemDetail.replace(/([a-z])([A-Z])/g, '$1 $2');;
                //}


                document.getElementById(detailItemNameSpan).innerText = detailItemName;
                document.getElementById(detailItemDetailSpan).innerText = detailItemDetail;

                //console.log(i);
                i++;
            }



            //document.getElementById('messageBtn').setAttribute('href', './newmessage.html?to=' + GUID);
            //document.getElementById('pokeBtn').setAttribute('onClick', 'poke(' + GUID + ')');

            //add code to detect if already a friend

            //document.getElementById('friendBtn').setAttribute('onClick', 'friend(\'create\', ' + GUID + ')');

            //if (hasAlbums == 0) {
            //    $('.albumsBtn').css('display', 'hidden');
            //}

            //else {
            //    //document.getElementById('messageBtnIfAlbums').setAttribute('href', './newmessage.html?to=' + GUID);
            //    document.getElementById('albumsBtn').setAttribute('href', './albumList.html?guid=' + GUID);
            //    //alert();
            //    $('.albumsBtn').css('display', 'block');
            //}

            profileBtns = buildProfileBtns(isMe, relationshipType, hasAlbums, GUID);

            document.getElementById('profileBtnContainer').appendChild(profileBtns);

            $('#content').trigger('create');

            $('#location-grid-li').slideDown();
            $('#stats-grid-li').slideDown();
            $('#interests-li').slideDown();
            $('#about-li').slideDown();

            $.mobile.loading('hide');
            prepareMessageHandler(GUID, userName);

        }
    });
}

function SetCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays == null || nDays == 0) nDays = 1;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie = cookieName + "=" + escape(cookieValue)
                    + ";expires=" + expire.toGMTString() + '; path=/';
}


function BuildMessageList(firstmsg) {
    if (firstmsg != undefined) {
        $.mobile.loading('show');
    }
    Authenticate(getMessages, firstmsg);
}

function getMessages(userKey, firstmsg) {
    var wireView;
    var offset;

    if (firstmsg == undefined) {
        offset = 0;
    }
    else {
        offset = firstmsg;
    }
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getinbox',
            UserToken: userKey,
            Offset: offset
        },
        dataType: "xml",
        success: function (xml) {

            var read;
            var prevUnread;
            var showMoreUrl;

            showMoreUrl = 'BuildMessageList(' + (offset + 5) + ');';
            //alert(showMoreUrl);

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            //alert(returnedXML);


            if (offset == 0) {

                messageView = document.createElement('ul');
                messageView.setAttribute('id', 'messageTable');
                messageView.setAttribute('data-role', 'listview');
                messageView.setAttribute('data-inset', 'true');

            }

            $(xml).find('Message').each(function () {

                //alert(prevUnread);

                message = BuildMessage($(this));

                if (prevUnread == true) {
                    //messageView.lastChild.setAttribute('class', 'prevUnread');
                    $(message).addClass('prev-unread');
                    //alert($('#messageView').last().attributes);
                }

                messageView.appendChild(message);

                read = $(this).find('Read').text();
                //alert(read);

                if (read == 'False') {
                    prevUnread = true;
                }
                else {
                    prevUnread = false;
                }

            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            document.getElementById('message_list').appendChild(messageView);

            if (offset == 0) {
                $('#content').trigger('create');
            }
            else {
                $('#messageTable').listview('refresh');
            }
            document.getElementById('show_more_btn').setAttribute('onclick', showMoreUrl);

            $('li').on("swipe", function () {
                var messageGUID = this.id;
                //alert(messageGUID);
                showDeletePopup(messageGUID);
            });

            $.mobile.loading('hide');
        }
    });
}

function BuildMessage(xml) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    var read;
    var fromGUID;
    //var wireBodyDiv;

    postGUID = xml.find('GUID').text();
    postAuthor = xml.find('From_Username').text();
    postTitleText = xml.find('Subject').text();
    postBodyText = xml.find('Body').text();
    thumbnailLink = xml.find('From_Avatar').text();
    timeCreatedText = xml.find('Sent').text();
    read = xml.find('Read').text();
    fromGUID = xml.find('From_GUID').text();

    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(userName);
    //returnedXML = $(xml).text;

    //showMoreUrl = 'BuildMessageList(5)';
    postLink = document.createElement('a');
    profileLink = document.createElement('a');
    wirePost = document.createElement('li');
    postTitle = document.createElement('div');
    postBody = document.createElement('div');
    thumbnail = document.createElement('img');
    profileLink = document.createElement('a');
    timeCreated = document.createElement('div');
    //wireBodyDiv = document.createElement('div');

    //wireBodyDiv.setAttribute('class', 'vertical-centre');

    //profileLink.setAttribute('href', './profile.html?' + postAuthor);
    //profileLink.setAttribute('data-enhance', 'false');

    //if (phoneGap == false) {
        postLink.setAttribute('href', './viewMessage.html?message=' + postGUID);
    //}
    //else {
    //    window.localStorage.setItem('ActiveSite-ViewMessage', postGUID);
    //    postLink.setAttribute('href', './viewMessage.html');
    //}

    //wirePost.setAttribute('class', 'wire-post');
    postBody.setAttribute('class', 'wire-body-text wire-post');
    postTitle.setAttribute('class', 'wire-post');
    timeCreated.setAttribute('class', 'wire-post');

    postTitle.innerHTML = postAuthor;
    postBody.innerHTML = postTitleText;
    thumbnail.setAttribute('src', thumbnailLink);
    //thumbnail.setAttribute('onclick', 'viewProfile(' + postAuthor + ')');

    //thumbnail.setAttribute('class', 'ui-li-thumb');

    //timeCreated.setAttribute('class', 'ui-li-aside wireDateText');
    timeCreated.innerHTML = timeCreatedText;

    if (fromGUID != 1) {
        profileLink.appendChild(thumbnail);
    }

    //wirePost.appendChild(profileLink);
    postLink.appendChild(profileLink);
    if (fromGUID != 1) {
        postLink.appendChild(thumbnail);
    }
    postLink.appendChild(postTitle);
    postLink.appendChild(postBody);
    postLink.appendChild(timeCreated);

    //alert(read);

    wirePost.appendChild(postLink);
    wirePost.setAttribute('id', postGUID)

    if (read == 'False') {
        wirePost.setAttribute('class', 'unread');
    }

    return wirePost;
}

function buildMessageDetail() {
    var qs = GetQueryString();
    var postGUID;

    //if (phoneGap == false) {
        postGUID = qs["message"];
    //}
    //else {
    //    postGUID = window.localStorage.getItem('ActiveSite-ViewMessage');
    //    window.localStorage.removeItem('ActiveSite-ViewMessage');
    //}
    //alert(queyString);
    //alert(postGUID);

    Authenticate(getSingleMessage, postGUID);
}

function getSingleMessage(userKey, guid) {
    //alert('user key: ' + userKey);
    //alert('offset: ' + offsetGUID);
    //$.mobile.loading('hide');

    var wireView;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getmessage',
            UserToken: userKey,
            Message_GUID: guid
        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            //wireView = document.createElement('ul');
            //wireView.setAttribute('id', 'wireTable');
            //wireView.setAttribute('data-role', 'listview');
            //wireView.setAttribute('data-inset', 'true');

            $(xml).find('Message').each(function () {
                //alert('got post');
                BuildSingleMessage($(this));
                //$('#wireTable').append(wirePost);
                //alert(wirePost);
            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            //document.getElementById('wire_display').appendChild(wireView);
            //$('#wireTable').listview('refresh');

            $.mobile.loading('hide');
            prepareMessageHandler(fromGUID, messageToName, subject);
        }
    });
}

function BuildSingleMessage(xml) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    //var postAuthor;
    //var fromGUID;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    //var subject;
    //var authorGUID;
    //var wireBodyDiv;

    postGUID = xml.find('GUID').text();
    postAuthor = xml.find('From_Username').text();
    messageToName = postAuthor;
    fromGUID = xml.find('From_GUID').text();
    postTitleText = xml.find('Subject').text();
    postBodyText = xml.find('Body').text();
    thumbnailLink = xml.find('From_Avatar').text();
    timeCreatedText = xml.find('Sent').text();
    replySubject = escape(postTitleText);
    subject = postTitleText;
    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(userName);
    //returnedXML = $(xml).text;

    //showMoreUrl = 'ShowMoreWire(' + postGUID + ')';
    //postLink = document.createElement('a');
    //profileLink = document.createElement('a');
    //wirePost = document.createElement('li');
    //postTitle = document.createElement('div');
    //postBody = document.createElement('div');
    thumbnail = document.createElement('img');
    profileLink = document.createElement('a');
    //timeCreated = document.createElement('div');
    //wireBodyDiv = document.createElement('div');

    //wireBodyDiv.setAttribute('class', 'vertical-centre');

    profileLink.setAttribute('href', './profile.html?guid=' + fromGUID);
    //profileLink.setAttribute('data-enhance', 'false');

    //postLink.setAttribute('href', './postdetail.html?' + postGUID);
    //wirePost.setAttribute('class', 'wire-post');
    //postBody.setAttribute('class', 'wire-body-text wire-post');
    //postTitle.setAttribute('class', 'wire-post');
    //timeCreated.setAttribute('class', 'wire-post');

    //postTitle.innerHTML = postTitleText;
    //postBody.innerHTML = postBodyText;
    thumbnail.setAttribute('src', thumbnailLink);

    //thumbnail.setAttribute('class', 'ui-li-thumb');

    //timeCreated.setAttribute('class', 'ui-li-aside wireDateText');
    //timeCreated.innerHTML = timeCreatedText;

    profileLink.appendChild(thumbnail);

    //wirePost.appendChild(profileLink);
    //postLink.appendChild(profileLink);
    //postLink.appendChild(thumbnail);
    //postLink.appendChild(postTitle);
    //postLink.appendChild(postBody);
    //postLink.appendChild(timeCreated);

    //wirePost.appendChild(postLink);

    //document.getElementById('show_more_btn').setAttribute('onclick', showMoreUrl);

    //$('#detailPic').append(thumbnail);
    $('#detailPic').append(profileLink);
    $('#detailPic').addClass('wire-detail-pic');
    $('#detailFrom').html(postAuthor);
    $('#detailBodyText').html(postBodyText);
    $('#detailPostTimeText').html(timeCreatedText);
    $('#detailTitleText').html(postTitleText);
    //document.getElementById('reply_wire_btn').setAttribute('href', './newMessage.html?to=' + fromGUID + '&subject=' + replySubject);
    $('#Post_ul').listview('refresh');

    //return wirePost;
}

function getNewMessageDetails(toGUID, subject) {
    //var qs = GetQueryString();
    //var toGUID;
    //var subject;
    var prepend;

    //toGUID = qs["to"];
    //subject = qs["subject"];

    //alert(toGUID);
    //alert(subject);

    document.getElementById('messageTo_GUID').value = toGUID;
    //alert(document.getElementById('messageTo_GUID').value);

    if (subject != undefined) {
        if (subject.substring(0, 12) == 'RE: RE: RE: ') {
            prepend = '';
        }
        else {
            prepend = 'RE: ';
        }


        document.getElementById('messageSubject').value = prepend + subject;
    }
}

function getMessageToName() {
    GUID = document.getElementById('messageTo_GUID').value;
    //alert('GUID ' + GUID);

    Authenticate(getToNameRequest, GUID);
}

function getToNameRequest(userKey, guid) {
    var Name;

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getnamefromguid',
            UserToken: userKey,
            GUID: guid
        },
        dataType: "xml",
        success: function (xml) {

            Name = $(xml).find('Name').text();
            document.getElementById('messageTo').innerText = Name;

        }
    });
}

function sendMessage() {
    var to_GUID;
    var subject;
    var body;

    to_GUID = document.getElementById('messageTo_GUID').value;
    subject = document.getElementById('messageSubject').value;
    body = document.getElementById('messagePostText').value;

    //alert(to_GUID);
    //alert(subject);
    //alert(body);

    if (subject == '') {
        document.getElementById('errorText').innerText = "Subject required";
        return;
    }

    if (body == '') {
        document.getElementById('errorText').innerText = "Message can't be blank";
        return;
    }

    $("#sendMessage").popup("close");
    $("#messagePostText").val('');

    $.mobile.loading('show');

    Authenticate(sendMessageRequest, to_GUID, subject, body)


}

function sendMessageRequest(userKey, to, subject, body) {

    $.ajax({
        type: "POST",
        url: API,
        cache: false,

        data: {
            method: 'sendmessage',
            to_GUID: to,
            subject: subject,
            usertoken: userKey,
            message: body
        },

        success: function (xmlk) {
            var sendStatus;

            sendStatus = $(xmlk).find('Success').text();

            $.mobile.loading('hide');

            if (sendStatus == 0) {
                $("#upgradePopup").popup("open");
            }
            else {
                $("#successPopup").popup("open");
            }


        }
    });

}

function getMatesCount() {
    Authenticate(getMatesCountRequest);
}

function getMatesCountRequest(userKey) {
    var newMates;

    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'getmaterequestcount',
            usertoken: userKey

        },

        success: function (xmlk) {
            //$.mobile.changePage("./wire.html");
            newMates = $(xmlk).find('MateRequests').text();
            //alert (newMates);

            if (newMates > 0) {
                $('#matesRequestCount').html(' ' + newMates);
            }

            else {
                $('#matesRequestCount').html();
            }
            //nextFunction(userKey, parms);
        }
    });
}

function getMates() {

    pos = navigator.geolocation.getCurrentPosition(getMatesLocationHandler);

}

function getMatesLocationHandler(pos, limit, offset) {


    if (limit == undefined) {
        limit = 15;
    }

    if (offset == undefined) {
        offset = 0;
    }

    lat = pos.coords.latitude;
    lng = pos.coords.longitude;

    Authenticate(getMatesRequest, lat, lng, limit, offset);
}

function getMatesRequest(userKey, lat, lng, limit, offset) {

    var userCount;
    var divClass;

    userCount = 0;

    divClass = 'a'

    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'getclosestmates',
            usertoken: userKey,
            lng: lng,
            lat: lat,
            limit: limit,
            offset: offset

        },

        success: function (xml) {

            $(xml).find('User').each(function () {

                userCount += 1;
                user = buildGPSUserDetails($(this), userCount, divClass);
                document.getElementById('GPSGrid').appendChild(user);

                if (divClass == "a") {
                    divClass = "b";
                }
                else if (divClass == "b") {
                    divClass = "c";
                }
                else if (divClass == "c") {
                    divClass = "a";
                }
                document.getElementById('show_more_gps').setAttribute('onclick', 'showMoreGPS(' + (offset + limit) + ', ' + limit + ')')

            })

            $.mobile.loading('hide');
        }
    });
}

function buildGPSUserDetails(xml, userCount, divClass) {
    var Name;
    var GUID;
    var Distance;
    var Icon;
    var NameDiv;
    var DistanceDiv;
    var ProfileLink;
    var Thumbnail;
    var UserDetails;
    var User;
    var onMob;
    var onMobIconSpan;
    var onMobIconImg;
    var onLine;
    var OnLineSpan;
    var OnLineImg;

    Name = $(xml).find('UserName').text();
    GUID = $(xml).find('GUID').text();
    Distance = $(xml).find('Distance').text();
    Icon = $(xml).find('Avatar').text();

    if ($(xml).find('Mobile').text() == 'True') {
        onMob = true;
    }
    else {
        onMob = false;
    }

    if ($(xml).find('Online').text() == 'True') {
        onLine = true;
    }
    else {
        onLine = false;
    }

    User = document.createElement('div');
    User.setAttribute('id', 'GPS' + userCount);
    User.setAttribute('class', 'ui-block-' + divClass + ' gpsUser');

    UserDetails = document.createElement('div');
    UserDetails.setAttribute('id', 'UserDetails' + userCount);
    UserDetails.setAttribute('class', 'userDetails');

    NameDiv = document.createElement('div');
    NameDiv.setAttribute('id', 'Name' + userCount);

    NameDiv.innerText = Name;

    DistanceDiv = document.createElement('div');
    DistanceDiv.setAttribute('id', 'Distance' + userCount);
    if (Distance == 1) {
        DistanceDiv.innerText = Distance + ' mile away';
    }
    else {
        DistanceDiv.innerText = Distance + ' miles away';
    }

    Thumbnail = document.createElement('img');
    Thumbnail.setAttribute('id', 'Thumbnail' + userCount);
    Thumbnail.setAttribute('src', Icon);

    ProfileLink = document.createElement('a');
    ProfileLink.setAttribute('id', 'ThumbnailLink' + userCount);
    ProfileLink.setAttribute('href', './profile.html?guid=' + GUID);
    ProfileLink.setAttribute('class', 'gpsPic');

    onMobIconSpan = document.createElement('div');
    onMobIconSpan.setAttribute('class', 'onMobIcon');

    onLineSpan = document.createElement('div');
    onLineSpan.setAttribute('class', 'onMobLineGPSIcon');

    if (onMob == true) {
        onMobIconImg = document.createElement('img');
        onMobIconImg.setAttribute('src', './graphics/on-mob-icon-orange.png');
        onMobIconSpan.appendChild(onMobIconImg);
    }

    if (onLine == true) {
        onLineImg = document.createElement('img');
        onLineImg.setAttribute('src', './graphics/small-online.png');
        onLineSpan.appendChild(onLineImg);
    }

    ProfileLink.appendChild(Thumbnail);
    ProfileLink.appendChild(onMobIconSpan);
    ProfileLink.appendChild(onLineSpan);

    UserDetails.appendChild(ProfileLink);
    UserDetails.appendChild(NameDiv);
    UserDetails.appendChild(DistanceDiv);

    User.appendChild(UserDetails);

    return User;
}

function setLocation() {

    pos = navigator.geolocation.getCurrentPosition(setLocationLocationHandler);

}

function setLocationLocationHandler(pos) {
    var lat;
    var lng;

    lat = pos.coords.latitude;
    lng = pos.coords.longitude;

    Authenticate(setLocationRequest, lat, lng);
}

function setLocationRequest(userKey, lat, lng) {
    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'updatemylocation',
            usertoken: userKey,
            lng: lng,
            lat: lat


        },

        success: function (xml) {

            //$(xml).find('User').each(function () {

            //    userCount += 1;
            //    userDetails = buildGPSUserDetails($(this), userCount);
            //    document.getElementById('GPS' + userCount).appendChild(userDetails);
            //    //if (userCount == 1) {
            //    //console.log(userDetails);
            //    //}

            //    //document.getElementById('GPS' + userCount).innerText = userCount;
            //    //alert(userCount);

            //})

            //$.mobile.loading('hide');
        }
    });

}

function showMoreGPS(offset, limit) {
    $.mobile.loading('show');
    Authenticate(getMatesRequest, lat, lng, limit, offset);
}

function showLargeProfilePic() {
    document.getElementById('largeProfileImg').style.opacity = '1';
    document.getElementById('largeProfileImg').style.pointerEvents = 'auto';
}

function hideLargeProfilePic() {
    document.getElementById('largeProfileImg').style.opacity = '0';
    document.getElementById('largeProfileImg').style.pointerEvents = 'none';

}

function buildAlbumList() {
    var qs = GetQueryString();
    var userGUID;

    userGUID = qs["guid"];

    //alert(userGUID);

    Authenticate(getAlbumList, userGUID);
}

function getAlbumList(userKey, userGUID) {
    //alert(userGUID);

    var albumList;
    var OwnerUserName;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getalbums',
            UserToken: userKey,
            Guid: userGUID
        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            albumList = document.createElement('ul');
            albumList.setAttribute('id', 'albumTable');
            albumList.setAttribute('data-role', 'listview');
            albumList.setAttribute('data-inset', 'true');

            //OwnerUserName = $(xml).find('OwnerUserName').text;

            $(xml).find('Album').each(function () {
                albumListEntry = buildAlbumListEntry($(this));
                albumList.appendChild(albumListEntry);
            });

            $(xml).find('OwnerUserName').each(function () {
                OwnerUserName = getAlbumOwnerUserName($(this));

            });

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            document.getElementById('album_listdisplay').appendChild(albumList);
            document.getElementById('ownerSpan').innerHTML = OwnerUserName + ' albums';

            $('#content').trigger('create');

            $.mobile.loading('hide');
        }
    });
}

function buildAlbumListEntry(xml) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    //var wireBodyDiv;

    albumGUID = xml.find('AlbumGUID').text();
    albumTitleText = xml.find('Title').text();
    albumDescriptionText = xml.find('Description').text();
    //thumbnailLink = xml.find('ThumbURL').text() + '&size=small';
    timeCreatedText = xml.find('Created').text();
    timeUpdatedText = xml.find('Updated').text();
    thumbnailBase64 = xml.find('ThumbBase64').text();
    thumbnailLink = 'data:image/gif;base64,' + thumbnailBase64;
    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(thumbnailBase64);
    //returnedXML = $(xml).text;


    albumLink = document.createElement('a');
    albumDetails = document.createElement('li');
    albumTitle = document.createElement('div');
    albumDescription = document.createElement('div');
    thumbnail = document.createElement('img');
    timeCreatedandUpdated = document.createElement('div');
    //timeUpdated = document.createElement('div');

    albumLink.setAttribute('href', 'showAlbum.html?guid=' + albumGUID);
    albumTitle.setAttribute('class', 'wire-post');
    albumDescription.setAttribute('class', 'wire-post');
    timeCreatedandUpdated.setAttribute('class', 'wire-post');
    //timeUpdated.setAttribute('class', 'wire-post');

    albumTitle.innerHTML = albumTitleText;
    albumDescription.innerHTML = albumDescriptionText;
    thumbnail.setAttribute('src', thumbnailLink);
    if (timeCreatedText != timeUpdatedText) {
        timeCreatedandUpdatedText = 'Updated: ' + timeUpdatedText;
    }
    else {
        timeCreatedandUpdatedText = 'Created: ' + timeCreatedText;
    }

    timeCreatedandUpdated.innerHTML = timeCreatedandUpdatedText;

    //timeUpdated.innerHTML = timeUpdatedText;

    albumLink.appendChild(thumbnail);
    albumLink.appendChild(albumTitle);
    if (albumDescriptionText != '') {
        albumLink.appendChild(albumDescription);
    }
    albumLink.appendChild(timeCreatedandUpdated);
    //albumLink.appendChild(timeUpdated);

    albumDetails.appendChild(albumLink);

    return albumDetails;
}

function getAlbumOwnerUserName(xml) {
    var OwnerName;
    var OwnerNameDisplay;
    var LastCharacter;

    OwnerName = xml.text();
    LastCharacter = OwnerName.slice(-1);

    if (LastCharacter == 's') {
        OwnerNameDisplay = OwnerName + '\'';
    }
    else {
        OwnerNameDisplay = OwnerName + '\'s';
    }

    return OwnerNameDisplay;
}

function buildImageList() {
    var qs = GetQueryString();
    var albumGUID;

    albumGUID = qs["guid"];

    //alert(albumGUID);

    Authenticate(getImageList, albumGUID);
}

function getImageList(userKey, albumGUID) {
    //alert(albumGUID);

    var imageList;
    var gridType;
    var index;

    //var OwnerUserName;
    //console.log('userKey = ' + userKey);

    //getURL = ('http://www.nakedfest.co.uk/members/services/api/rest/xml/?method=wire.show&auth_token=' + userKey);

    //console.log('getURL = ' + getURL);
    //alert(userKey);

    gridType = 0;
    index = 0;

    $.ajax({
        type: "GET",
        url: API,
        cache: false,
        data: {
            method: 'getalbum',
            UserToken: userKey,
            Guid: albumGUID
        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            imageList = document.createElement('div');
            imageList.setAttribute('id', 'imageListDisplay');            //imageList.setAttribute('data-role', 'listview');
            imageList.setAttribute('class', 'ui-page-theme-b content-text ui-grid-b');


            //OwnerUserName = $(xml).find('OwnerUserName').text;

            //albumTitle = $(xml).find('AlbumTitle').text;

            $(xml).find('Image').each(function () {
                gridType += 1;
                if (gridType == 4) {
                    gridType = 1;
                }
                imageListEntry = buildImageListEntry($(this), gridType, index);
                imageList.appendChild(imageListEntry);
                index += 1;
                //alert(gridType);
            });

            //$(xml).find('AlbumTitle').each(function () {
            //    albumTitle = $(this).text;

            //});

            albumTitle = $(xml).find('AlbumTitle').text();

            //alert(returnedXML);
            //console.log('wireTable');

            //console.log(wireView);

            document.getElementById('image_container').appendChild(imageList);
            document.getElementById('albumTitleSpan').innerHTML = albumTitle;

            $('#content').trigger('create');

            $.mobile.loading('hide');
        }
    });
}

function buildImageListEntry(xml, gridType, index) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;
    var elementClass;
    //var wireBodyDiv;

    if (gridType == 1) {
        elementClass = "ui-block-a";
    }
    else if (gridType == 2) {
        elementClass = "ui-block-b";
    }
    else if (gridType == 3) {
        elementClass = "ui-block-c";
    }

    //alert(elementClass);

    //albumGUID = xml.find('AlbumGUID').text();
    imageTitleText = xml.find('Title').text();
    imageDescriptionText = xml.find('Description').text();
    //thumbnailLink = xml.find('ThumbURL').text() + '&size=small';
    timeCreatedText = xml.find('Created').text();
    timeUpdatedText = xml.find('Updated').text();
    thumbnailBase64 = xml.find('ThumbBase64').text();
    largeImgBase64 = xml.find('ImageBase64').text();
    thumbnailImg = 'data:image/jpeg;base64,' + thumbnailBase64;
    largeImg = 'data:image/jpeg;base64,' + largeImgBase64;
    //console.log(userName);
    //console.log(wireText);
    //console.log(thumbnail);

    //alert(thumbnailBase64);
    //returnedXML = $(xml).text;

    //imageContainerElement =
    //albumLink = document.createElement('a');
    imageDetails = document.createElement('div');
    imageTitle = document.createElement('div');
    imageDescription = document.createElement('div');
    galleriaLink = document.createElement('a');
    thumbnailLink = document.createElement('a');
    thumbnail = document.createElement('img');
    timeCreatedandUpdated = document.createElement('div');
    largeImgImg = document.createElement('img');
    //timeUpdated = document.createElement('div');

    galleriaLink.setAttribute('href', largeImg);
    thumbnailLink.setAttribute('href', 'javascript:openGallery(' + index + ')');
    //thumbnailLink.setAttribute('class', 'galleria');
    //thumbnailLink.setAttribute('onclick', 'openGallery();');
    imageTitle.setAttribute('class', 'wire-post');
    imageDescription.setAttribute('class', 'wire-post');
    timeCreatedandUpdated.setAttribute('class', 'wire-post');
    largeImgImg.setAttribute('src', largeImg);
    largeImgImg.setAttribute('data-title', imageTitleText);
    largeImgImg.setAttribute('data-description', imageDescriptionText);
    //timeUpdated.setAttribute('class', 'wire-post');

    imageTitle.innerHTML = imageTitleText;
    imageDescription.innerHTML = imageDescriptionText;
    thumbnail.setAttribute('src', thumbnailImg);
    //if (timeCreatedText != timeUpdatedText) {
    //    timeCreatedandUpdatedText = 'Created: ' + timeCreatedText + ' Updated: ' + timeUpdatedText;
    //}
    //else {
    //    timeCreatedandUpdatedText = 'Created: ' + timeCreatedText;
    //}

    //timeCreatedandUpdated.innerHTML = timeCreatedandUpdatedText;

    //timeUpdated.innerHTML = timeUpdatedText;
    //galleriaLink.appendChild(thumbnail);

    galleriaImage = thumbnail;

    thumbnailLink.appendChild(thumbnail);

    imageDetails.appendChild(thumbnailLink);


    if (imageTitleText != 'image') {
        imageDetails.appendChild(imageTitle);
    }

    if (imageDescriptionText != '') {
        imageDetails.appendChild(imageDescription);
    }
    imageDetails.appendChild(timeCreatedandUpdated);
    //albumLink.appendChild(timeUpdated);

    //imageDetails.appendChild(albumLink);
    //alert(galleriaLink);
    document.getElementById('galleryContainer').appendChild(largeImgImg);

    imageDetails.setAttribute('class', elementClass + ' gpsPic' + ' userDetails');

    return imageDetails;
}

function openGallery(index) {
    //alert(index);

    if (index == undefined) {
        index = 0;
    }

    //alert(index);

    Galleria.loadTheme('galleria/themes/classic/galleria.classic.min.js');
    $('.galleria').css('display', 'block');
    Galleria.run('.galleria', { show: index });
    $('.galleryDialog').css('opacity', '1');
    $('.galleryDialog').css('pointerEvents', 'auto');
    //Galleria.show(index);
}

function hideGallery() {

    $('.galleryDialog').css('opacity', '0');
    $('.galleryDialog').css('pointerEvents', 'none');
}

function logOut() {
    var cookieName;

    cookieName = '.ASPXFORMSAUTH';
    alert(cookieName);
    document.cookie = cookieName + '=' + '' + '";expires=Thu, 01 Jan 1970 00:00:01 GMT' + '; path=/';
}

function buildFriendRequests() {
    Authenticate(getFriendRequests);
}

function getFriendRequests(userKey) {
    var receivedRequests;
    var sentRequests;
    var sentRequestsCount;
    var receivedRequestsCount;
    var receivedRequestsContent;
    var sentRequestsContent;
    var requestType;
    var ReceivedRequestsUl;
    var SentRequestsUl;
    var ReceivedRequestsTitle;
    var SentRequestsTitle;

    ReceivedRequestsUl = document.createElement('ul');
    ReceivedRequestsUl.setAttribute('id', 'ReceivedRequestsUl');
    ReceivedRequestsUl.setAttribute('data-role', 'listview');
    ReceivedRequestsUl.setAttribute('data-inset', 'true');

    ReceivedRequestsTitle = document.createElement('span');
    ReceivedRequestsTitle.innerHTML = 'Received Friend Requests';
    ReceivedRequestsTitle.setAttribute('class', 'title-text')

    receivedRequestsCount = 0;

    SentRequestsUl = document.createElement('ul');
    SentRequestsUl.setAttribute('id', 'SentRequestsUl');
    SentRequestsUl.setAttribute('data-role', 'listview');
    SentRequestsUl.setAttribute('data-inset', 'true');

    SentRequestsTitle = document.createElement('span');
    SentRequestsTitle.innerHTML = 'Sent Friend Requests';
    SentRequestsTitle.setAttribute('class', 'title-text')

    sentRequestsCount = 0;

    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'getfriendrequests',
            usertoken: userKey

        },

        success: function (xmlk) {
            //$.mobile.changePage("./wire.html");
            //newMates = $(xmlk).find('MateRequests').text();
            //alert (newMates);

            receivedRequests = $(xmlk).find('Received');
            sentRequests = $(xmlk).find('Sent');

            $(receivedRequests).find('Request').each(function () {
                requestType = 'received';
                requestDetails = parseFriendRequest($(this), requestType);
                //document.getElementById('ReceivedRequestsUl').appendChild(requestDetails);
                ReceivedRequestsUl.appendChild(requestDetails);
                //$('#content').trigger('create');
                //wireView.appendChild(wirePost);
                receivedRequestsCount += 1;
            });

            $(sentRequests).find('Request').each(function () {
                requestType = 'sent';
                requestDetails = parseFriendRequest($(this), requestType);
                //document.getElementById('SentRequestsUl').appendChild(requestDetails);
                SentRequestsUl.appendChild(requestDetails);
                //$('#content').trigger('create');
                //wireView.appendChild(wirePost);
                sentRequestsCount += 1;
            });

            //alert(receivedRequestsCount);
            //alert(sentRequestsCount);

            if (receivedRequestsCount == 0) {
                defaultReceivedRequestMessage = noRequests('received');
                ReceivedRequestsUl.appendChild(defaultReceivedRequestMessage);
            }

            if (sentRequestsCount == 0) {
                defaultSentRequestMessage = noRequests('sent');
                SentRequestsUl.appendChild(defaultSentRequestMessage);
            }

            document.getElementById('RequestsTable').appendChild(ReceivedRequestsTitle);
            document.getElementById('RequestsTable').appendChild(ReceivedRequestsUl);
            document.getElementById('RequestsTable').appendChild(SentRequestsTitle);
            document.getElementById('RequestsTable').appendChild(SentRequestsUl);

            //alert(receivedRequests);
            //alert(sentRequests);

            //nextFunction(userKey, parms);

            $('#content').trigger('create');
            $.mobile.loading('hide');
        }

    });
}

function parseFriendRequest(xml, type) {
    var Guid;
    var Name;
    var Image;
    var RequestContainer;
    var ImageContainer;
    var NameContainer;
    var ButtonContainer;
    var AcceptButton;
    var DeclineButton;
    var RevokeButton;
    var AcceptContainer;
    var DeclineContainer;

    Guid = xml.find('Guid').text();
    Name = xml.find('Name').text();
    Image = xml.find('Image').text();

    ProfileLink = document.createElement('a');
    RequestContainer = document.createElement('li');
    ImageContainer = document.createElement('img');
    NameContainer = document.createElement('span');
    ButtonContainer = document.createElement('div');

    ButtonContainer.setAttribute('class', 'friend-action-button-container');
    ProfileLink.setAttribute('href', './profile.html?guid=' + Guid);
    ImageContainer.setAttribute('onclick', 'location.href="./profile.html?guid=' + Guid + '"');

    RequestContainer.setAttribute('class', 'WelcomeTextLi');

    if (type == 'received') {
        RequestContainer.setAttribute('id', 'R' + Guid);

        AcceptContainer = document.createElement('div');
        AcceptContainer.setAttribute('id', 'AcceptContainer-' + Guid);
        AcceptContainer.setAttribute('class', 'friend-action-container');

        DeclineContainer = document.createElement('div');
        DeclineContainer.setAttribute('id', 'DeclineContainer-' + Guid);
        DeclineContainer.setAttribute('class', 'friend-action-container');

        AcceptButton = document.createElement('button');
        AcceptButton.innerHTML = 'Accept';
        AcceptButton.setAttribute('data-inline', 'true');
        AcceptButton.setAttribute('data-iconpos', 'notext');
        AcceptButton.setAttribute('data-icon', 'check');
        AcceptButton.setAttribute('onClick', 'friend(\'accept\', ' + Guid + ')');
        AcceptButton.setAttribute('class', 'friendActionBtn');

        AcceptContainer.appendChild(AcceptButton);

        DeclineButton = document.createElement('button');
        DeclineButton.innerHTML = 'Decline';
        DeclineButton.setAttribute('data-inline', 'true');
        DeclineButton.setAttribute('data-iconpos', 'notext');
        DeclineButton.setAttribute('data-icon', 'delete');
        DeclineButton.setAttribute('onClick', 'friend(\'decline\', ' + Guid + ')');
        DeclineButton.setAttribute('class', 'friendActionBtn');

        DeclineContainer.appendChild(DeclineButton);

        ButtonContainer.setAttribute('id', 'ButtonContainer-R' + Guid);
        ButtonContainer.appendChild(AcceptContainer);
        ButtonContainer.appendChild(DeclineContainer);
    }
    else {
        RequestContainer.setAttribute('id', 'S' + Guid);
        RevokeButton = document.createElement('button');
        RevokeButton.setAttribute('data-inline', 'true');
        RevokeButton.setAttribute('data-iconpos', 'notext');
        RevokeButton.setAttribute('data-icon', 'delete');
        RevokeButton.setAttribute('onClick', 'friend(\'revoke\', ' + Guid + ')');
        RevokeButton.setAttribute('class', 'friendActionBtn');
        RevokeButton.innerHTML = 'Revoke';
        ButtonContainer.setAttribute('id', 'ButtonContainer-S' + Guid);
        ButtonContainer.appendChild(RevokeButton);
    }

    ImageContainer.setAttribute('src', Image);
    ImageContainer.setAttribute('class', 'friendImg');
    NameContainer.innerHTML = Name;

    //ProfileLink.appendChild(ImageContainer);

    //RequestContainer.appendChild(ProfileLink);
    RequestContainer.appendChild(ImageContainer);
    RequestContainer.appendChild(NameContainer);
    RequestContainer.appendChild(ButtonContainer);

    return RequestContainer;
}

function friend(action, guid) {
    //alert('action=' + action + ' guid=' + guid);
    $.mobile.loading('show');
    Authenticate(friendAction, action, guid);
}

function friendAction(userKey, action, guid) {
    var friendMethod;
    var requestType;
    var resultCde;
    var elementID;

    requestType = 'none';

    if (action == 'accept') {
        friendMethod = 'ApproveFriendRequest';
        requestType = 'R';
    }
    else if (action == 'decline') {
        friendMethod = 'DeclineFriendRequest';
        requestType = 'R';
    }
    else if (action == 'revoke') {
        friendMethod = 'RevokeFriendRequest';
        requestType = 'S';
    }
    else if (action == 'create') {
        friendMethod = 'CreateFriendRequest';
    }
    else if (action == 'remove') {
        friendMethod = 'RemoveFriend';
    }

    $.ajax({
        type: "POST",
        url: API,
        cache: false,

        data: {
            method: friendMethod,
            usertoken: userKey,
            GUID: guid

        },

        success: function (xmlk) {
            if (requestType != 'none') {
                elementID = '#' + requestType + guid;

                if (requestType == 'R') {
                    remainingCount = $("#ReceivedRequestsUl li").length;
                    if (remainingCount == 1) {
                        defaultMsg = noRequests('received');
                        document.getElementById('ReceivedRequestsUl').appendChild(defaultMsg);
                    }
                    $(elementID).remove();
                    $('#ReceivedRequestsUl').listview('refresh');
                }

                if (requestType == 'S') {
                    remainingCount = $("#SentRequestsUl li").length;
                    if (remainingCount == 1) {
                        defaultMsg = noRequests('sent');
                        document.getElementById('SentRequestsUl').appendChild(defaultMsg);
                    }
                    $(elementID).remove();
                    $('#SentRequestsUl').listview('refresh');
                }

                //getMatesCount();
            }
            $('#content').trigger('create');
            $.mobile.loading('hide');
        }
    });
}

function poke(guid) {
    //alert('action=' + action + ' guid=' + guid);
    Authenticate(sendPoke, guid);
}

function sendPoke(userKey, guid) {

    $.ajax({
        type: "POST",
        url: API,
        cache: false,

        data: {
            method: 'SendPoke',
            usertoken: userKey,
            GUID: guid

        },

        success: function (xmlk) {
            //alert('Poked!');

        }
    });
}

function noRequests(type) {
    var RequestContainer;
    var RequestContent;

    RequestContainer = document.createElement('li');
    RequestContent = document.createElement('div');

    RequestContent.innerHTML = 'You have no pending ' + type + ' friend requests';

    RequestContainer.appendChild(RequestContent);

    return RequestContainer;
}

function buildProfileBtns(isMe, relationshipType, hasAlbums, guid) {
    var btnTable;
    var testBtn;
    var btnCount;
    var btn1;
    var btn2;
    var btn3;
    var btn4;
    var btn1container;
    var btn2container;
    var btn3container;
    var btn4container;
    var row1;
    var row2;
    var albumAction;
    var acceptAction;
    var declineAction;
    var revokeAction;
    var createAction;
    var removeAction;
    var messageAction;
    var pokeAction;

    albumAction = 'location.href=\'./albumList.html?guid=' + guid + '\'';
    acceptAction = 'friend(\'accept\', ' + guid + ')';
    declineAction = 'friend(\'decline\', ' + guid + ')';
    revokeAction = 'friend(\'revoke\', ' + guid + ')';
    createAction = 'friend(\'create\', ' + guid + ')';
    removeAction = 'friend(\'remove\', ' + guid + ')';
    pokeAction = 'poke(' + guid + ')';
    messageAction = 'location.href=\'/newmessage.html?to=' + guid + '\'';

    btnCount = 0;

    btn1 = document.createElement('button');
    btn2 = document.createElement('a');
    btn3 = document.createElement('button');
    btn4 = document.createElement('button');

    btn1container = document.createElement('div');
    btn2container = document.createElement('div');
    btn3container = document.createElement('div');
    btn4container = document.createElement('div');

    row1 = document.createElement('div');
    row2 = document.createElement('div');

    //testBtn = document.createElement('button');
    //testBtn.setAttribute('type', 'button');
    //testBtn.innerText = 'Test Btn';

    //return testBtn;



    btnTable = document.createElement('div');
    btnTable.setAttribute('id', 'btnTable');

    if (isMe == 1) {
        if (hasAlbums == 1) {
            btnCount += 1;
            btn1.innerText = 'Albums';
            btn1.setAttribute('onclick', albumAction);
            //btnTable.appendChild(btn1);
        }

    }
    else {
        //btnTable.appendChild(testBtn);
        btn1.innerText = 'Poke';
        btn1.setAttribute('onClick', pokeAction);
        btnCount += 1;

        btn2.innerText = 'Message';

        btn2.setAttribute('href', "#sendMessage");
        btn2.setAttribute('data-theme', "a");
        btn2.setAttribute('data-role', "button");
        btn2.setAttribute('data-rel', "popup");
        btn2.setAttribute('data-position-to', "window");
        btnCount += 1;

        if (relationshipType == 'N') {
            btn3.innerText = 'Add Friend';
            btn3.setAttribute('onClick', createAction);
            btnCount += 1;
        }
        else if (relationshipType == 'RR') {
            btn3.innerText = 'Accept Friend Request';
            btn3.setAttribute('onClick', acceptAction);
            btnCount += 1;
        }
        else if (relationshipType == 'RS') {
            btn3.innerText = 'Revoke Friend Request';
            btn3.setAttribute('onClick', revokeAction);
            btnCount += 1;
        }
        else if (relationshipType == 'F') {
            btn3.innerText = 'Remove Friend';
            btn3.setAttribute('onClick', removeAction);
            btnCount += 1;
        }
        if (hasAlbums == 1) {
            btnCount += 1;
            btn4.innerText = 'Albums';
            btn4.setAttribute('onclick', albumAction);
            //btnTable.appendChild(btn1);
        }
    }

    if (btnCount == 1) {
        row1.setAttribute('class', 'ui-grid-solo');
        row1.appendChild(btn1);
        btnTable.appendChild(row1);
    }
    else if (btnCount == 2) {
        row1.setAttribute('class', 'ui-grid-a');
        btn1container.setAttribute('class', 'ui-block-a');
        btn1container.appendChild(btn1);
        btn2container.setAttribute('class', 'ui-block-b');
        btn2container.appendChild(btn2);
        row1.appendChild(btn1container);
        row1.appendChild(btn2container);
        btnTable.appendChild(row1);
    }
    else if (btnCount == 3) {
        row1.setAttribute('class', 'ui-grid-a');
        btn1container.setAttribute('class', 'ui-block-a');
        btn1container.appendChild(btn1);
        btn2container.setAttribute('class', 'ui-block-b');
        btn2container.appendChild(btn2);
        row1.appendChild(btn1container);
        row1.appendChild(btn2container);
        row2.setAttribute('class', 'ui-grid-solo');
        btn3container.setAttribute('class', 'ui-block-a');
        btn3container.appendChild(btn3);
        row2.appendChild(btn3container);
        btnTable.appendChild(row1);
        btnTable.appendChild(row2);

    }
    else if (btnCount == 4) {
        row1.setAttribute('class', 'ui-grid-a');
        btn1container.setAttribute('class', 'ui-block-a');
        btn1container.appendChild(btn1);
        btn2container.setAttribute('class', 'ui-block-b');
        btn2container.appendChild(btn2);
        row1.appendChild(btn1container);
        row1.appendChild(btn2container);
        row2.setAttribute('class', 'ui-grid-a');
        btn3container.setAttribute('class', 'ui-block-a');
        btn3container.appendChild(btn3);
        btn4container.setAttribute('class', 'ui-block-b');
        btn4container.appendChild(btn4);
        row2.appendChild(btn3container);
        row2.appendChild(btn4container);
        btnTable.appendChild(row1);
        btnTable.appendChild(row2);
    }

    return btnTable;
}

function setFooter(version, URL) {
    var versionText;
    var footerText;
    var desktopLink;

    versionText = document.createElement('div');
    versionText.setAttribute('class', 'version-text-class');
    versionText.innerHTML = version;

    footerText = document.createElement('div');
    footerText.setAttribute('id', 'linkText');
    footerText.setAttribute('class', 'desktop-link-text');
    footerText.innerHTML = 'Switch to the ';

    desktopLink = document.createElement('a');
    desktopLink.setAttribute('id', 'desktoplink');
    desktopLink.innerHTML = 'Desktop Site';

    footerText.appendChild(desktopLink);

    document.getElementById('footer').appendChild(footerText);
    document.getElementById('footer').appendChild(versionText);
}

function logOut() {
    $.ajax({
        url: './logout.aspx',
        success: function () {
            window.location.href = '.';
            //alert('success');
        },
        error: function () {
            //alert('failed');
        }
    });

}

function prepareMessageHandler(toGUID, toName, subject) {
    $.ajax({
        type: "GET",
        url: './messageHandler.html',
        cache: false,
        data: {},
        dataType: "html",
        success: function (retrivedHtml) {

            //Name = $(xml).find('Name').text();
            //document.getElementById('messageTo').innerText = Name;
            //alert(retrivedHtml);
            document.getElementById('messagePopupHolder').innerHTML = retrivedHtml;
            getNewMessageDetails(toGUID, subject);
            document.getElementById('messageTo').innerText = toName;
            document.getElementById('successUserName').innerText = toName
            setUpgradeUrl();
            $('#messagePopupHolder').trigger('create');

        }
    });
}

function showDeletePopup(messageGUID) {
    document.getElementById('deleteButton').href = 'javascript:deleteMessage(' + messageGUID + ');';

    $("#deletePopup").popup("open");
}

function deleteMessage(messageGUID) {
    var userKey = '';

    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'deletemessage',
            usertoken: userKey,
            messageguid: messageGUID

        },

        success: function (xmlk) {
            refreshMail();
        }

    });
}

function refreshMail() {
    $("#deletePopup").popup("close");
    $.mobile.loading('show');
    $('#message_list').html('');
    //getUnreadMailCount();
    Authenticate(getMessages);

}

function hidePageMessage(page) {
    var pageMessageVersion;

    $('#page_message_bar').slideUp();

    pageMessageVersion = document.getElementById('page_message_bar').dataset.pagemessageversion;

    hideMessageVersion(page, pageMessageVersion);

}

function showPageMessage(page) {
    var pageMessageVersion;
    var hideValue;

    pageMessageVersion = document.getElementById('page_message_bar').dataset.pagemessageversion;
    hideValue = localStorage.getItem(page + '-message-hide-' + pageMessageVersion);

    //alert(document.getElementById('page_message_bar_text').innerHTML);

    if (document.getElementById('page_message_bar_text').innerHTML == "") {
        hideValue = 1;
    }

    //alert(hideValue);

    //alert('hidevalue=' + hideValue + ' version=' + mailMessageVersion);

    if (hideValue == 1) {

        $('#page_message_bar').hide();

    }
    else {
        $('#page_message_bar').slideDown();
    }
}

//function hidePageMessageVersion(messageVersion, page) {
//    var removeCount = 1;
//    localStorage['mail-message-hide-' + messageVersion] = 1;

//    while (removeCount < messageVersion) {
//        localStorage.removeItem('mail-message-hide-' + removeCount);
//        removeCount += 1;
//    }
//}

function showSiteWideMessage() {
    var siteWideMessageGUID;
    var hideValue;

    siteWideMessageGUID = document.getElementById('sitewide_message_bar').dataset.sitewidemessageguid;
    hideValue = localStorage.getItem('sitewide-message-hide-' + siteWideMessageGUID);

    if (document.getElementById('sitewide_message_bar_text').innerHTML == "") {
        hideValue = 1;
    }

    //alert('hidevalue=' + hideValue + ' version=' + mailMessageVersion);

    if (hideValue == 1) {

        $('#sitewide_message_bar').hide();

    }
    else {
        $('#sitewide_message_bar').slideDown();
    }


}

function showMobileMessage() {
    var mobileMessageVersion;
    var hideValue;

    mobileMessageVersion = document.getElementById('mobile_message_bar').dataset.mobilemessageversion;
    hideValue = localStorage.getItem('mobile-message-hide-' + mobileMessageVersion);

    if (document.getElementById('mobile_message_bar_text').innerHTML == "") {
        hideValue = 1;
    }

    //alert('hidevalue=' + hideValue + ' version=' + mailMessageVersion);

    if (hideValue == 1) {

        $('#mobile_message_bar').hide();

    }
    else {
        $('#mobile_message_bar').slideDown();
    }
}

function hideSiteWideMessage() {
    var siteWideMessageGUID;

    $('#sitewide_message_bar').slideUp();

    siteWideMessageGUID = document.getElementById('sitewide_message_bar').dataset.sitewidemessageguid;

    hideMessageVersion('sitewide', siteWideMessageGUID);

}

//function hideSiteWideMessageVersion(messageVersion) {
//    var removeCount = 1;
//    localStorage['sitewide-message-hide-' + messageVersion] = 1;

//    while (removeCount < messageVersion) {
//        localStorage.removeItem('sitewide-message-hide-' + removeCount);
//        removeCount += 1;
//    }
//}

function hideMobileMessage() {
    var mobileMessageVersion;

    $('#mobile_message_bar').slideUp();

    mobileMessageVersion = document.getElementById('mobile_message_bar').dataset.mobilemessageversion;

    hideMessageVersion('mobile', mobileMessageVersion);

}

//function hideMobileMessageVersion(messageVersion) {
//    var removeCount = 1;
//    localStorage['mobile-message-hide-' + messageVersion] = 1;

//    while (removeCount < messageVersion) {
//        localStorage.removeItem('mobile-message-hide-' + removeCount);
//        removeCount += 1;
//    }
//}

function showPageMessages(page) {
    showSiteWideMessage();
    showMobileMessage();
    showPageMessage(page);
}

function hideMessageVersion(type, version) {
    var localStorageKey;
    var keyLength;

    localStorageKey = type + '-message-hide-';
    keyLength = localStorageKey.length;


    Object.keys(localStorage)
        .forEach(function (key) {
            if (key.substring(0, keyLength) == localStorageKey) {
                localStorage.removeItem(key);
            }
        });

    localStorage[type + '-message-hide-' + version] = 1;

    //$('#headerbar').toolbar("updatePagePadding");

}

function getSiteWideMessage() {
    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'GetSiteWideMessage',
            usertoken: 'UNDEFINED',


        },

        success: function (xmlk) {
            //alert(xmlk);
            var siteWideMessageContent;
            var siteWideMessageGUID;
            //var returnedXML;

            //returnedXML = new XMLSerializer().serializeToString(xmlk);

            //alert(returnedXML);

            siteWideMessageGUID = $(xmlk).find('SiteWideGUID').text();
            siteWideMessageContent = $(xmlk).find('SiteWideMessage').text();

            //document.getElementById('profile-name').innerText = userName;

            //alert(siteWideMessageGUID);
            //alert(siteWideMessageContent);

            document.getElementById('sitewide_message_bar_text').innerHTML = siteWideMessageContent;
            document.getElementById('sitewide_message_bar').dataset.sitewidemessageguid = siteWideMessageGUID;
            showSiteWideMessage();

        }
    });
}

function getPageMessage(page) {
    $.ajax({
        type: "GET",
        url: API,
        cache: false,

        data: {
            method: 'GetPageMessage',
            page: page,

        },

        success: function (xmlk) {
            //alert(xmlk);
            var pageMessageContent;
            var pageMessageVersion;
            var returnedXML;

            //returnedXML = new XMLSerializer().serializeToString(xmlk);

            //alert(returnedXML);

            pageMessageVersion = $(xmlk).find('Version').text();
            pageMessageContent = $(xmlk).find('Message').text();

            //alert(returnedXML);
            //alert('Page: ' + page + ' Message: ' + pageMessageContent + ' Version: ' + pageMessageVersion);
            //alert(pageMessageVersion);
            //alert(pageMessageContent);
            //document.getElementById('profile-name').innerText = userName;

            //alert(siteWideMessageGUID);
            //alert(siteWideMessageContent);

            if (pageMessageVersion != 0) {
                if (page != 'mobile') {
                    document.getElementById('page_message_bar_text').innerHTML = pageMessageContent;
                    document.getElementById('page_message_bar').dataset.pagemessageversion = pageMessageVersion;
                    showPageMessage(page);
                }
                else {
                    document.getElementById('mobile_message_bar_text').innerHTML = pageMessageContent;
                    document.getElementById('mobile_message_bar').dataset.mobilemessageversion = pageMessageVersion;
                    showMobileMessage();
                }
            }



        }
    });
}

function subscribeToWirePush() {
    //if (phoneGap == false) {
    var wirePush = $.connection.wirePool;
    // Create a function that the hub can call to broadcast messages.
    //alert($.support.cors);
    $.connection.hub.start().done(function () {
        //alert('In wire push');
        //wirePush.server.newWire(744724);
    });

    wirePush.client.newWire = function (guid, authorGUID, author, title, body, avatar, dateTime) {
        //alert(guid);
        updateWire(guid, authorGUID, author, title, body, avatar, dateTime);
    };
    //}
}

function updateWire(guid, authorGUID, author, title, body, avatar, dateTime) {
    //alert('user key: ' + userKey);
    //alert('offset: ' + offsetGUID);
    //$.mobile.loading('hide');

    var wireView;
    var wirePost;

    wirePost = buildWireUpdate(guid, authorGUID, author, title, body, avatar, dateTime);

    $('#wireTable').prepend(wirePost);
    $('#wireTable').listview('refresh');
    $('#' + guid).hide();
    $('#' + guid).slideDown('slow');


}
function getUserGUID() {
    var UserGuid;

    $.ajax({
        type: "POST",
        url: API,
        cache: false,
        data: {
            method: 'GetUserGUID',
            UserToken: 1

        },
        dataType: "xml",
        success: function (xml) {

            //returnedXML = (new XMLSerializer()).serializeToString(xml);

            //wireView = document.createElement('ul');
            //wireView.setAttribute('id', 'wireTable');
            //wireView.setAttribute('data-role', 'listview');
            //wireView.setAttribute('data-inset', 'true');

            UserGUID = $(xml).find('ReturnedGUID').text();
            //alert(UserGuid);
            return UserGuid;
        }
    });


}

function joinNotificationPool() {
    //$.ajax({
    //    type: "POST",
    //    url: API,
    //    cache: false,
    //    data: {
    //        method: 'GetUserGUID',
    //        UserToken: 1

    //    },
    //    dataType: "xml",
    //    success: function (xml) {
    //        var notifications = $.connection.notificationPool;
    //        //returnedXML = (new XMLSerializer()).serializeToString(xml);

    //        //wireView = document.createElement('ul');
    //        //wireView.setAttribute('id', 'wireTable');
    //        //wireView.setAttribute('data-role', 'listview');
    //        //wireView.setAttribute('data-inset', 'true');

    //        UserGUID = $(xml).find('ReturnedGUID').text();
    //        //alert(UserGUID);
    //        notifications.server.joinGroup(UserGUID);
    //    }
    //});
    //console.log('Attempting to join notification pool ...');
    var notifications = $.connection.notificationPool;
    if (phoneGap == true) {
        notifications.server.joinGroupApp(GUID);
    }
    else {
        notifications.server.joinGroup();
    }
}

function buildWireUpdate(guid, authorGUID, author, title, body, avatar, dateTime) {
    var wirePost;
    var postTitle;
    var postBody;
    var thumbnail;
    var timeCreated;
    var postTitleText;
    var postBodyText;
    var thumbnailLink;
    var timeCreatedText;
    var postLink;
    var postAuthor;
    var postGUID;
    var profileLink;
    var showMoreUrl;

    //var wireBodyDiv;

    postGUID = guid;
    postAuthor = author;
    postTitleText = title;
    postBodyText = body;
    thumbnailLink = avatar;
    timeCreatedText = dateTime;
    authorGUID = authorGUID;

    postLink = document.createElement('a');
    profileLink = document.createElement('a');
    wirePost = document.createElement('li');
    postTitle = document.createElement('div');
    postBody = document.createElement('div');
    thumbnail = document.createElement('img');
    profileLink = document.createElement('a');
    timeCreated = document.createElement('div');
    //wireBodyDiv = document.createElement('div');

    //wireBodyDiv.setAttribute('class', 'vertical-centre');

    //profileLink.setAttribute('href', './profile.html?' + postAuthor);
    //profileLink.setAttribute('data-enhance', 'false');

    postLink.setAttribute('href', './postdetail.html?post=' + postGUID);
    //wirePost.setAttribute('class', 'wire-post');
    postBody.setAttribute('class', 'wire-body-text wire-post');
    postTitle.setAttribute('class', 'wire-post');
    timeCreated.setAttribute('class', 'wire-post');

    postTitle.innerHTML = postTitleText;
    postBody.innerHTML = postBodyText;
    thumbnail.setAttribute('src', thumbnailLink);
    //thumbnail.setAttribute('onclick', 'viewProfile(' + postAuthor + ')');

    //thumbnail.setAttribute('class', 'ui-li-thumb');

    //timeCreated.setAttribute('class', 'ui-li-aside wireDateText');
    timeCreated.innerHTML = timeCreatedText;

    profileLink.appendChild(thumbnail);

    //wirePost.appendChild(profileLink);
    postLink.appendChild(profileLink);
    postLink.appendChild(thumbnail);
    postLink.appendChild(postTitle);
    postLink.appendChild(postBody);
    postLink.appendChild(timeCreated);

    wirePost.appendChild(postLink);
    wirePost.setAttribute('id', postGUID);

    return wirePost;
}

function setupNotificationHandlers() {
    //if (phoneGap == false) {
    console.log('Setting up notification handlers');
    var notifications = $.connection.notificationPool;
    notifications.client.newNotification = function (guid) {
        console.log(guid);
    }
    notifications.client.updateUnread = function (count) {
        if (count > 0) {
            $('#unreadMessageCount').html(' ' + count);
            $('#unreadMessageCount-SideBar').html(' ' + count);
            $('#unreadMessageCount').show();
            $('#unreadMessageCount-SideBar').show();
            $('#hearderBar_mailCount').html(' ' + count + ' ');
            $('#headerBar_mail').show();
            console.log('Unread: ' + count);
        }

        else {
            $('#unreadMessageCount').html('');
            $('#unreadMessageCount').hide();
            $('#unreadMessageCount-SideBar').html('');
            $('#unreadMessageCount-SideBar').hide();
            $('#hearderBar_mailCount').html('');
            $('#headerBar_mail').hide();
            console.log('Unread: ' + count);
        }
    };
    notifications.client.updateMates = function (newMates) {
        if (newMates > 0) {
            $('#matesRequestCount').html(' ' + newMates);
            $('#matesRequestCount').show();
            $('#matesRequestCount-SideBar').html(' ' + newMates);
            $('#matesRequestCount-SideBar').show();
            $('#hearderBar_matesCount').html(' ' + newMates + ' ');
            $('#headerBar_mates').show();
            console.log('NewMates: ' + newMates);

        }

        else {
            $('#matesRequestCount').html('');
            $('#matesRequestCount').hide();
            $('#matesRequestCount-SideBar').html('');
            $('#matesRequestCount-SideBar').hide();
            $('#hearderBar_matesCount').html('');
            $('#headerBar_mates').hide();
            console.log('NewMates: ' + newMates);
        }
    };
    notifications.client.wireCount = function (GUID) {
        var pageName;
        console.log('NewWireGUID: ' + GUID);

        pageName = $('div[data-role="page"]').attr('id')

        if (pageName == 'wire') {
            localStorage["WireCountOverrideGUID"] = GUID;
            localStorage["UnreadWireCount"] = 0;

            localStorage["LastWireUpdate"] = GUID;


        }
        else {
            updateUnreadWire(GUID);
        }

        //alert(GUID);
        //if (count > 0) {
        //    $('#unreadMessageCount').html(' ' + count);
        //}

        //else {
        //    $('#unreadMessageCount').html('');
        //}
    };
    $.connection.hub.start().done(function () {
        //var UserGUID = getUserGUID();
        joinNotificationPool();
        console.log('Joining Notification Pool ...');
    });
    //}
}

function updateUnreadWire(GUID) {
    var lastUpdate;
    var updating;
    var unreadWireCount;
    var wireOverrideGUID;

    updating = localStorage.getItem("UpdatingWireCount");

    //alert(updating);

    if (updating == 0 || updating == null || updating == undefined) {
        //localStorage.setItem("UpdatingWireCount") = 1;
        localStorage["UpdatingWireCount"] = 1;
        lastUpdate = localStorage.getItem("LastWireUpdate");
        unreadWireCount = parseInt(localStorage.getItem("UnreadWireCount"));
        wireOverrideGUID = parseInt(localStorage.getItem("WireCountOverrideGUID"))

        //alert(unreadWireCount);

        //alert(isNaN(unreadWireCount));

        if (unreadWireCount === null || unreadWireCount === undefined || isNaN(unreadWireCount) == true) {
            unreadWireCount = 0;
        }

        //alert(unreadWireCount);

        if (lastUpdate === null || lastUpdate === undefined) {
            lastUpdate = 0;
        }

        if (GUID != wireOverrideGUID) {
            unreadWireCount = unreadWireCount + 1;
        }
        else {
            unreadWireCount = 0;
        }

        //alert(unreadWireCount);

        if (lastUpdate != GUID || lastUpdate == null) {

            updateUnreadWireCount(unreadWireCount, GUID);

        }
        //localStorage.setItem("UpdatingWireCount") = 0;

        localStorage["UpdatingWireCount"] = 0;

    }

}

function wireStorageEventHandler(storageEvent) {
    //alert('Storage Event: ' + storageEvent.url + ' Key: ' + storageEvent.key);
}

function updateUnreadWireCount(unreadWireCount, GUID) {
    if (unreadWireCount > 0) {
        //alert(GUID);
        $('#unreadWireCount').html(' ' + unreadWireCount);
        $('#unreadWireCount').show();

        if (isNaN(GUID) == false) {
            localStorage["LastWireUpdate"] = GUID;
        }
    }

    else {
        $('#unreadWireCount').html('');
        $('#unreadWireCount').hide();
    }
    localStorage["UnreadWireCount"] = unreadWireCount;
}

function nonWireStorageEventHandler(storageEvent) {
    if (storageEvent.key == 'WireCountOverrideGUID') {
        updateUnreadWireCount(0);
    }
}

function getSideBar() {
    //var sideBarContainer = document.getElementById('sidebarContainer');
    var startGet = Date.now();
    var duration;
    console.log("Retriving Sidebar");

    $.ajax({
        type: "GET",
        url: "./sideBar.html",
        cache: false,
        data: {},
        dataType: "html",
        success: function (retrivedHtml) {

            //console.log('Sidebar HTML: ' + retrivedHtml);

            //Name = $(xml).find('Name').text();
            //document.getElementById('messageTo').innerText = Name;
            //alert(retrivedHtml);
            //sideBarContainer.innerHTML = retrivedHtml;
            $('#sidebarContainer').html(retrivedHtml);
            if (phoneGap == false) {
                $('#settingsSpacerSidebar').hide();
                $('#settingsSidebar').hide();
            }
            $('#sidebarContainer').trigger('create');
            console.log("Sidebar Created");
            duration = (Date.now() - startGet) / 1000;
            console.log('Sidebar Create - Duration: ' + duration + 's');
        }
    });
}

function buildSideBar() {
    var startSetUp = Date.now();
    var duration;
    console.log('Start SideBar Setup');

    setupSideBar();

    //$('#sidebarContainer').trigger('create');
    //$('#PanelNavButtons').trigger('create');

    $('#PanelNavButtons').listview('refresh');
    $('#PanelNavButtons').trigger('create');
    $('#sidebarContainer').trigger('create');

    $('#navPanel').trigger('create');

    //$('#navPanel').trigger('create');
    duration = (Date.now() - startSetUp) / 1000;
    console.log('SideBar Setup Complete');
    console.log('Sidebar Setup - Duration: ' + duration + 's');
}

function getWirePostHandler() {
    $.ajax({
        type: "GET",
        url: './wirePostHandler.html',
        cache: false,
        data: {},
        dataType: "html",
        success: function (retrivedHtml) {

            //Name = $(xml).find('Name').text();
            //document.getElementById('messageTo').innerText = Name;
            //alert(retrivedHtml);
            //console.log(retrivedHtml);
            //document.getElementById('wirePostHolder').innerHTML = retrivedHtml;
            $('#wirePostHolder').html(retrivedHtml);
            //getNewMessageDetails(toGUID, subject);
            //document.getElementById('messageTo').innerText = toName;
            //document.getElementById('successUserName').innerText = toName
            //setUpgradeUrl();
            $('#wirePostHolder').trigger('create');

            if (wireReplyTo != '') {
                document.getElementById('wirePostText').value = '@' + wireReplyTo + ' ';
                CheckCharacters();
            }

        }
    });
}