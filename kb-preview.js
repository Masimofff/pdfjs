var kbOvTimer = null;
var kbPendingType = '';
var kbPdfSrc = '';
var kbEpubSrc = '';
var kbAdPushed = false;

function kbStartPreview(pdfId, epubId, type) {
  kbPdfSrc  = pdfId  ? 'https://drive.google.com/file/d/' + pdfId  + '/preview' : '';
  kbEpubSrc = epubId ? 'https://drive.google.com/file/d/' + epubId + '/preview' : '';
  kbPendingType = type;
  var ov      = document.getElementById('kb-ov');
  var num     = document.getElementById('kb-ov-num');
  var title   = document.getElementById('kb-ov-title');
  var msg     = document.getElementById('kb-ov-msg');
  var counter = document.getElementById('kb-ov-counter');
  var ad      = document.getElementById('kb-ov-ad');
  var sup     = document.getElementById('kb-ov-sup');
  num.innerText = '10';
  title.innerText = 'Bağlantı Hazırlanır';
  title.style.color = '#f3ba2f';
  counter.style.display = 'flex';
  msg.style.display = 'block';
  ad.style.display = 'flex';
  sup.style.display = 'block';
  ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  if (!kbAdPushed) {
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    kbAdPushed = true;
  }
  var c = 10;
  if (kbOvTimer) { clearInterval(kbOvTimer); }
  kbOvTimer = setInterval(function() {
    c = c - 1;
    num.innerText = c;
    if (c < 1) {
      clearInterval(kbOvTimer);
      kbOvTimer = null;
      kbCloseOv();
      kbShowIframe(kbPendingType);
    }
  }, 1000);
}

function kbCloseOv() {
  if (kbOvTimer) { clearInterval(kbOvTimer); kbOvTimer = null; }
  document.getElementById('kb-ov').style.display = 'none';
  document.body.style.overflow = '';
}

function kbShowIframe(type) {
  var src = '';
  if (type == 'epub') { src = kbEpubSrc; } else { src = kbPdfSrc; }
  if (!src) { return; }
  var box    = document.getElementById('kb-iframe-box');
  var iframe = document.getElementById('kb-iframe');
  var label  = document.getElementById('kb-iframe-label');
  if (type == 'epub') { label.innerText = '📚 EPUB Önizləmə'; } else { label.innerText = '📖 PDF Önizləmə'; }
  iframe.src = src;
  box.style.display = 'block';
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function kbCloseIframe() {
  document.getElementById('kb-iframe-box').style.display = 'none';
  document.getElementById('kb-iframe').src = 'about:blank';
}
