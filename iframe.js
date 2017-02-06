function createIframe(name, src, debug) {
  src = src || 'javascript:false'; // пустой src

  var tmpElem = document.createElement('div');

  // в старых IE нельзя присвоить name после создания iframe, поэтому создаём через innerHTML
  tmpElem.innerHTML = '<iframe name="' + name + '" id="' + name + '" src="' + src + '">';
  var iframe = tmpElem.firstChild;

  if (!debug) {
    iframe.style.display = 'none';
  }

  document.body.appendChild(iframe);

  return iframe;
}

// функция постит объект-хэш content в виде формы с нужным url , target
// напр. postToIframe('/count.php', {a:5,b:6}, 'frame1')

function postToIframe(url, target) {
  var phonyForm = document.getElementById('phonyForm');
  if (!phonyForm) {
    // временную форму создаем, если нет
    phonyForm = document.createElement("form");
    phonyForm.id = 'phonyForm';
    phonyForm.style.display = "none";
    phonyForm.method = "POST";
    phonyForm.enctype = "multipart/form-data";
    document.body.appendChild(phonyForm);
  }

  phonyForm.action = url;
  phonyForm.target = target;  
  phonyForm.innerHTML = '';

  phonyForm.submit();
}

// аналогично iframeGet, но в postToIframe передаются данные data
function iframePost(url, callback) {

  var iframeName = Math.random();
  var iframe = createIframe(iframeName);
  
  iframe.onload = function() {
    iframe.parentNode.removeChild(iframe); // очистка
    
    callback();
  }

  postToIframe(url, iframeName);
}