// The fallback email is never written into the page. It is decoded only when the link is
// clicked, so scrapers that render the page and regex the DOM or source don't find it.
// After the click the address is also shown with a copy button, because mailto: does
// nothing on devices without a mail app configured.
(function () {
  var el = document.getElementById('contact');
  if (!el) return;
  var codes = [95, 123, 121, 108, 116, 108, 117, 108, 122, 122, 71, 115, 112, 125, 108, 53, 106, 118, 116];
  el.addEventListener('click', function (event) {
    event.preventDefault();
    var address = String.fromCharCode.apply(null, codes.map(function (c) { return c - 7; }));
    var mailto = 'mailto:' + address + '?subject=' + encodeURIComponent('ShortKit support');

    var reveal = document.createElement('span');
    var link = document.createElement('a');
    link.href = mailto;
    link.textContent = address;
    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy';
    copy.textContent = 'Copy';
    copy.addEventListener('click', function () {
      var done = function () { copy.textContent = 'Copied'; };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(done, function () { copy.textContent = 'Copy failed'; });
      } else {
        copy.textContent = 'Select and copy the address';
      }
    });
    reveal.append(link, ' ', copy);
    el.replaceWith(reveal);

    window.location.href = mailto;
  });
})();
