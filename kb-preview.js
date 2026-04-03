var kbOvTimer = null;
var kbPendingType = '';
var kbPdfId = '';
var kbEpubId = '';
var kbAdPushed = false;
var kbNewWin = null;

function kbStartPreview(pdfId, epubId, type) {
  kbPdfId = pdfId;
  kbEpubId = epubId;
  kbPendingType = type;

  // Pəncərəni İNDİ aç — tıklama anında, bloklammır
  kbNewWin = window.open('', '_blank');

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
      var id = '';
      if (kbPendingType == 'epub') { id = kbEpubId; } else { id = kbPdfId; }
      var url = 'https://drive.google.com/file/d/' + id + '/preview';
      if (kbNewWin && !kbNewWin.closed) {
        kbNewWin.location.href = url;
      } else {
        window.open(url, '_blank');
      }
    }
  }, 1000);
}

function kbCloseOv() {
  if (kbOvTimer) { clearInterval(kbOvTimer); kbOvTimer = null; }
  if (kbNewWin && !kbNewWin.closed) { kbNewWin.close(); }
  document.getElementById('kb-ov').style.display = 'none';
  document.body.style.overflow = '';
}

function kbShowIframe(type) {}

function kbCloseIframe() {
  var box = document.getElementById('kb-iframe-box');
  if (box) { box.style.display = 'none'; }
}
