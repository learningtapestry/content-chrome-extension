import constants from './constants.js';
import jQuery from 'jquery';
import 'imports?jQuery=jquery!../vendor/featherlight.min.js';

let $ = jQuery;

function iconClicked() {
  $(() => {
    let iframeUrl = chrome.runtime.getURL('app_iframe.html');
    let iFrameWidth = (80.0/100) * $(window).width();
    let iFrameHeight = (80.0/100) * $(window).height();
    
    $.featherlight({
      iframe: iframeUrl,
      iframeWidth: iFrameWidth,
      iframeHeight: iFrameHeight
    });
  });
}

function fillForm(document) {
  $.featherlight.current().close();

  $('.gMIble.QKgkS').click();

  window.setTimeout(() => {
    $('div[jsaction=addLinkIconAction]').click();
    let titleElement = $('div[guidedhelpid=assignmentTitle]');
    titleElement.text(document.title);
    $('div.LsqTRb.Lzdwhd-AyKMt.tgNIJf-Wvd9Cc.Yiql6e.editable').html(document.description);
    $('input.O98Lj.Jr7RB.KOgDdb.RJRdDb.tgNIJf-Wvd9Cc').val(document.url);
    titleElement.focus();
  }, 500);
}

chrome.runtime.onMessage.addListener(message => {
  if (!constants.classroomRegex.test(document.URL)) return;
  if ($.featherlight.current()) return;

  if (message === 'ICON_CLICKED') {
    iconClicked();
  }
});

$(window).on('message', function(e) {
  if (!constants.classroomRegex.test(document.URL)) return;
  if (!e.originalEvent) return;
  if (!e.originalEvent.data) return;
  
  e = e.originalEvent;
  
  let message = e.data;
  let extensionUri = `chrome-extension://${chrome.runtime.id}`;
  if (e.origin === extensionUri && message.name === 'FILL_FORM') {
    fillForm(message.data);
  }
});
