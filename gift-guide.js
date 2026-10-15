// プレゼントガイド(gift/*.html)用。ページ本体は静的HTMLで、ここでは季節の一言とGA4計測だけを足す。
// gift.js(giftSeasonLine / giftObserveOnce)と analytics.js(window.gtag)の後に読み込む。
(function () {
  const body = document.body;
  const page = body.dataset.guide || 'hub';

  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  // 季節の一言(日本時間で判定、贈る人向けの言い方)
  document.querySelectorAll('.guide-season').forEach((el) => {
    el.textContent = giftSeasonLine('gift');
  });

  // 商品リンクのクリック。result_typeはページのタイプ(メロい度は節ごと)
  document.querySelectorAll('.lucky-item[data-aff-item]').forEach((a) => {
    a.addEventListener('click', () => {
      track('affiliate_click', {
        quiz_name: 'gift_guide',
        result_type: a.dataset.affType || page,
        placement: a.dataset.affPlacement,
        mode: 'gift',
        item_name: a.dataset.affItem,
      });
    });
  });

  // 予算の帯が半分以上見えたら1回(クリック率の分母)
  document.querySelectorAll('.guide-band[data-placement]').forEach((el) => {
    giftObserveOnce(el, () => {
      track('section_view', {
        quiz_name: 'gift_guide',
        result_type: el.dataset.affType || page,
        placement: el.dataset.placement,
        mode: 'gift',
      });
    });
  });

  // ガイドから診断へ戻るリンク
  document.querySelectorAll('[data-next]').forEach((a) => {
    a.addEventListener('click', () => {
      // 同じタブで遷移するので beacon で送る
      track('next_quiz_click', { quiz_name: 'gift_guide', target: a.dataset.next, placement: 'guide', transport_type: 'beacon' });
    });
  });
})();
