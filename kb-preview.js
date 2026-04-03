/* ════════════════════════════════════════
   KİTABBUL PREVIEW və LİNK YÖNLƏNDİRMƏ JS
   ════════════════════════════════════════ */
var kbOvTimer = null;
var kbPendingType = '';
var kbPdfId = '';
var kbEpubId = '';
var kbAdPushed = false;

function kbStartPreview(pdfId, epubId, type) {
  kbPdfId = pdfId;
  kbEpubId = epubId;
  kbPendingType = type;

  var ov      = document.getElementById('kb-ov');
  var num     = document.getElementById('kb-ov-num');
  var btn     = document.getElementById('kb-ov-btn');
  var title   = document.getElementById('kb-ov-title');
  var msg     = document.getElementById('kb-ov-msg');
  
  // İlkin görünüşü bərpa et
  num.style.display = 'block';
  btn.style.display = 'none';
  num.innerText = '10';
  title.innerText = 'Bağlantı Hazırlanır';
  title.style.color = '#f3ba2f';
  msg.innerText = 'Faylınız təhlükəsiz zonada hazırlanır...';
  
  // Ekranı aç və arxanı sürüşdürməyi blokla
  ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Reklamı məcbur işə sal (Yalnız 1 dəfə yüklənir)
  if (!kbAdPushed) {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    kbAdPushed = true;
  }

  var c = 10;
  if (kbOvTimer) { clearInterval(kbOvTimer); }
  
  // 10 Saniyəlik geri sayım
  kbOvTimer = setInterval(function() {
    c = c - 1;
    num.innerText = c;
    
    // Saniyə sıfır olunca 
    if (c <= 0) {
      clearInterval(kbOvTimer);
      kbOvTimer = null;
      
      // Rəqəmi gizlət, 'Linkə Keç' düyməsini göstər!
      num.style.display = 'none';
      btn.style.display = 'inline-block';
      title.innerText = 'Bağlantı Hazırdır!';
      title.style.color = '#2ecc71';
      msg.innerText = 'Aşağıdakı düyməyə basaraq kitabın önizləməsinə baxa bilərsiniz.';
    }
  }, 1000);
}

// "Linkə Keç" düyməsinə basılanda işləyən funksiya
function kbOpenLink() {
  kbCloseOv(); // Qara ekranı (reklam overlayını) bağla
  
  var id = (kbPendingType == 'epub') ? kbEpubId : kbPdfId;
  var url = 'https://drive.google.com/file/d/' + id + '/preview';
  
  // Pop-up blocker-ə taxılmamaq üçün təmiz yönləndirmə (yeni tab-da açır)
  window.open(url, '_blank');
}

// X-lə bağlayan funksiya
function kbCloseOv() {
  if (kbOvTimer) { clearInterval(kbOvTimer); kbOvTimer = null; }
  var ov = document.getElementById('kb-ov');
  if (ov) { ov.style.display = 'none'; }
  document.body.style.overflow = '';
}

// Iframe funksiyaları 
function kbShowIframe(type) {}
function kbCloseIframe() {
  var box = document.getElementById('kb-iframe-box');
  if (box) { box.style.display = 'none'; document.getElementById('kb-iframe').src = 'about:blank'; }
}
