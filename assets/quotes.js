// Случайная выжимка в карточку. Данные: /data/quotes.json (только тизеры).
(function () {
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  var BADGE = {
    2: { text: "Полный",  bg: "rgba(31,214,255,.14)",  fg: "#1fd6ff" },
    1: { text: "Базовый", bg: "rgba(125,108,240,.16)", fg: "#a99bff" }
  };

  function render(q) {
    document.querySelectorAll('[data-quote-card]').forEach(function (card) {
      var sec = card.querySelector('[data-q-section]');
      var top = card.querySelector('[data-q-topic]');
      var tea = card.querySelector('[data-q-teaser]');
      var lnk = card.querySelector('[data-q-link]');
      var cta = card.querySelector('[data-q-cta]');
      var bdg = card.querySelector('[data-q-badge]');

      if (sec && q.section) sec.textContent = q.section;
      if (top && q.topic)   top.textContent = q.topic;

      if (tea) tea.textContent = (q.teaser && q.teaser.trim())
        ? q.teaser.trim()
        : "Тема разобрана внутри — по делу, без воды.";

      if (lnk && q.url) lnk.setAttribute('href', q.url);

      if (cta) cta.textContent = (q.tier === 0)
        ? "читать в боте →"
        : "[ полный текст — по подписке ]";

      if (bdg) {
        var b = BADGE[q.tier];
        if (b) {
          bdg.textContent = b.text;
          bdg.style.background = b.bg;
          bdg.style.color = b.fg;
          bdg.style.display = "inline-block";
        } else {
          bdg.style.display = "none";
        }
      }
    });
  }

  fetch('/data/quotes.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (list) { if (Array.isArray(list) && list.length) render(pick(list)); })
    .catch(function (e) { console.warn('quotes.json недоступен:', e); });
})();
