window.IS_EMBEDDED = false;
window.___gcfg = {
  parsetags: 'explicit'
};

let script = document.createElement('script');
script.async = true;
script.defeder = true;
script.type = 'text/javascript';
script.src = 'https://apis.google.com/js/platform.js';
document.body.appendChild(script);

import searchApp from 'search-app';
searchApp.mount(document.getElementById('app'));
