// Случайная выжимка в карточку. Данные: /data/quotes.json (только тизеры).
(function () {
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function render(q) {
    document.querySelectorAll('[data-quote-card]').forEach(function (card) {
      var s = card.querySelector('[data-q-section]');
      var t = card.querySelector('[data-q-topic]');
      var l = card.querySelector('[data-q-link]');
      if (s && q.section) s.textContent = q.section;
      if (t && q.topic) t.textContent = q.topic;
      if (l && q.url) l.setAttribute('href', q.url);
    });
  }

  fetch('/data/quotes.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (list) {
      if (Array.isArray(list) && list.length) render(pick(list));
    })
    .catch(function (e) {
      console.warn('quotes.json недоступен:', e);
    });
})();
