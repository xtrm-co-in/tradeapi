var g_auth = localStorage.getItem("auth");
// if(g_auth == null) {
//     g_auth = sessionStorage.getItem("auth");
// }

if(g_auth) {
    try {
        g_auth = JSON.parse(g_auth);
    } catch(error) {
        g_auth = null;
    }
}

 var getCookie = function(name) {
     var cookieValue = null;
     if (document.cookie && document.cookie !== '') {
         var cookies = document.cookie.split(';');
         for (var i = 0; i < cookies.length; i++) {
             var cookie = jQuery.trim(cookies[i]);
             // Does this cookie string begin with the name we want?
             if (cookie.substring(0, name.length + 1) === (name + '=')) {
                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break;
             }
         }
     }
     return cookieValue;
 };

var g_csrftoken = getCookie('csrftoken');
 
function removeLocal()
{
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    localStorage.setItem('logout-event', 'logout' + Math.random());
}

var initLogin = function() {
    if(g_auth) {
        localStorage.setItem("auth", JSON.stringify(g_auth));
        window.location.replace(rooturl);
    } else {
        removeLocal();
        window.location.replace(rooturl + g_urls.login);
    }
     
};
window.addEventListener('storage', function(event){
    if (event.key == 'logout-event') { 
        window.location.replace(rooturl + g_urls.login);
    }    
});