import "./scss/reset.scss";
import "./scss/main.scss";
import View from "./resoucers/view";
import Controller from "./resoucers/controller";
import Model from "./resoucers/model";

const app = new Controller(new Model(), new View());
window.addEventListener('load', () => {
  setTimeout(() => {
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
    ym(70547467, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, 0);
});