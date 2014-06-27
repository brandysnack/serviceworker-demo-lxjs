/**
 * UTILITIES
 */

function make(type) {
    return document.createElement(type);
}

function fail(err) {
    console.error(err.stack);
}

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

/**
 * CODE
 */

// force https
if ((!location.port || location.port == "80") && location.protocol != 'https:') {
    location.protocol = 'https:';
  }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker-demo-lxjs/worker.js', {
      scope: '/serviceworker-demo-lxjs/*'
    }).then(function () {
        console.log('sw installed');
    }, fail)
}

var $members = $('.members');
function addMembersToPage(members) {
    $members.innerHTML = '';
    members.forEach(function (member) {
        var $elem = make('li');
        $elem.classList.add('member');
        $elem.textContent = member.login;
        var $img = make('img');
        $img.src = member.avatar_url;
        $img.classList.add('avatar');
        $elem.insertBefore($img, $elem.firstChild);
        $members.appendChild($elem);
    });
}

get('https://api.github.com/orgs/twitter/members?access_token=c84583ea6d470a256519c1901835f43789bb9ce8')
    .then(addMembersToPage)
    .catch(fail);
