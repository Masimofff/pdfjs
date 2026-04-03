var kbOvTimer = null;
var kbPendingType = '';
var kbPdfId = '';
var kbEpubId = '';
var kbAdPushed = false;

function kbStartPreview(pdfId, epubId, type) {
  kbPdfId = pdfId;
  kbEpubId = epubId;
  kbPendingType = type;

  var ov = document.getElementById('kb-ov');
  var num = document.getElementById('kb-ov-num');
  var btn = document.getElementById('kb-ov-btn');
  var title = document.getElementById('kb-ov-title');
  var msg = document.getElementById('kb-ov-msg');
  
  if (num) num.style.display = 'block';
  if (btn) btn.style.display = 'none';
  if (num) num.innerText = '10';
  if (title) { title.innerText = 'Bağlantı Hazırlanır'; title.style.color = '#f3ba2f'; }
  if (msg) { msg.innerText = 'Faylınız təhlükəsiz zonada hazırlanır...'; }
  
  if (ov) ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (!kbAdPushed) {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    kbAdPushed = true;
  }

  var c = 10;
  if (kbOvTimer) clearInterval(kbOvTimer);
  
  kbOvTimer = setInterval(function() {
    c = c - 1;
    if (num) num.innerText = c;
    
    if (c <= 0) {
      clearInterval(kbOvTimer);
      kbOvTimer = null;
      
      if (num) num.style.display = 'none';
      if (btn) btn.style.display = 'inline-block';
      if (title) { title.innerText = 'Bağlantı Hazırdır!'; title.style.color = '#2ecc71'; }
      if (msg) { msg.innerText = 'Aşağıdakı düyməyə basaraq kitabın önizləməsinə baxa bilərsiniz.'; }
    }
  }, 1000);
}

function kbOpenLink() {
  kbCloseOv();
  var id = (kbPendingType == 'epub') ? kbEpubId : kbPdfId;
  var url = 'https://drive.google.com/file/d/' + id + '/preview';
  window.open(url, '_blank');
}

function kbCloseOv() {
  if (kbOvTimer) { clearInterval(kbOvTimer); kbOvTimer = null; }
  var ov = document.getElementById('kb-ov');
  if (ov) ov.style.display = 'none';
  document.body.style.overflow = '';
}

function kbShowIframe(type) {}
function kbCloseIframe() {
  var box = document.getElementById('kb-iframe-box');
  if (box) { box.style.display = 'none'; document.getElementById('kb-iframe').src = 'about:blank'; }
}
