// 結果画面の「おすすめ」欄(Amazonアソシエイト)の共通部品。本体script.jsと単発5本で共有する。
// 2026-10-13: 「今日のラッキーアイテム」(占いの小ネタ)から、タイプに合わせた推薦+贈り物の場面へ変更。
// 価格は断定せず検索条件として書く・効能や品薄はうたわない・PR表記をブロック内に置く(5名レビューの法務指摘)。

// 日本時間の月日で季節の一言を返す(端末のタイムゾーンに依存しないようAsia/Tokyoで判定)。
// mode='gift'(友達に贈る人向け)では年末年始も「贈り物」の言い方にする
function giftSeasonLine(mode, date) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', month: '2-digit', day: '2-digit' })
    .formatToParts(date || new Date());
  const md = Number(parts.find((p) => p.type === 'month').value) * 100 + Number(parts.find((p) => p.type === 'day').value);
  if (md >= 1101 && md <= 1225) return 'クリスマスの贈り物にも';
  if (md >= 1226 || md <= 110) return mode === 'gift' ? '年末年始のちょっとした贈り物にも' : '年末年始の自分へのご褒美にも';
  if (md >= 201 && md <= 214) return 'バレンタインの贈り物にも';
  if (md >= 301 && md <= 314) return 'ホワイトデーのお返しにも';
  return '誕生日やちょっとしたお礼にも';
}

// data属性・HTMLに入れる文字列のエスケープ(商品名に&や"が入っても壊れないように)
function giftEsc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function giftIconHtml(iconMap, emoji) {
  return iconMap && iconMap[emoji]
    ? `<img src="img/lucky-icons/${iconMap[emoji]}.jpg" alt="" width="42" height="42" loading="lazy">`
    : emoji;
}

// 商品リンク1件。data-aff-*はクリック計測(GA4 affiliate_click)で読む
// o.priceLabel(任意、2026-10-17〜プレゼント診断): 価格表示の文言。未指定なら従来どおり「¥1,000〜3,000の価格帯で検索」
// o.safe(任意): 外しにくい理由の小さなタグ(gift/ の .guide-safe と同じ見た目)。未指定なら出さない
// o.nameFirst(任意、2026-10-17〜プレゼント診断): trueなら商品名を理由文より上に出す。未指定なら従来どおり理由文→商品名
// o.pill(任意、2026-10-18〜メロい度): trueなら「PR+商品名」を太字の見出しにし、理由文→価格と「Amazonで見てみる ›」の小さなボタンの順。
// 右端の矢印は出さない。未指定なら従来どおり
function giftLinkHtml(o) {
  if (o.pill) {
    return `
    <a class="lucky-item gift-item-pill" href="${o.href}" target="_blank" rel="noopener sponsored"
       data-aff-placement="${o.placement}" data-aff-mode="${o.mode}" data-aff-item="${giftEsc(o.name)}">
      <span class="lucky-emoji" aria-hidden="true">${o.icon}</span>
      <span class="lucky-text">
        <span class="lucky-name gift-name-head"><span class="lucky-pr-tag" aria-hidden="true">PR</span>${giftEsc(o.name)}<span class="sr-only">(広告)</span></span>
        ${o.reason ? `<span class="gift-reason">${giftEsc(o.reason)}</span>` : ''}
        <span class="gift-meta"><span class="lucky-price">${o.priceLabel ? giftEsc(o.priceLabel) : '¥1,000〜3,000の価格帯で検索'}</span><span class="gift-pill">Amazonで見てみる<span aria-hidden="true"> ›</span></span></span>
      </span>
      <span class="sr-only">(新しいタブで開きます)</span>
    </a>`;
  }
  const reasonHtml = o.reason ? `<span class="gift-reason">${giftEsc(o.reason)}</span>` : '';
  const nameHtml = `<span class="lucky-name">${giftEsc(o.name)}をAmazonで見る</span>`;
  const prHtml = '<span class="lucky-pr-tag">PR</span><span class="sr-only">(広告)</span>';
  const bodyHtml = o.nameFirst
    ? `<span class="lucky-label">${prHtml}</span>
        ${nameHtml}${reasonHtml}`
    : `<span class="lucky-label">${prHtml}${reasonHtml}</span>
        ${nameHtml}`;
  return `
    <a class="lucky-item" href="${o.href}" target="_blank" rel="noopener sponsored"
       data-aff-placement="${o.placement}" data-aff-mode="${o.mode}" data-aff-item="${giftEsc(o.name)}">
      <span class="lucky-emoji" aria-hidden="true">${o.icon}</span>
      <span class="lucky-text">
        ${bodyHtml}
        <span class="lucky-price">${o.priceLabel ? giftEsc(o.priceLabel) : '¥1,000〜3,000の価格帯で検索'}</span>${o.safe ? `<span class="guide-safe">${giftEsc(o.safe)}</span>` : ''}
      </span>
      <span class="lucky-arrow" aria-hidden="true">›</span><span class="sr-only">(新しいタブで開きます)</span>
    </a>`;
}

// 単発診断の結果欄。mode='self'は本人の結果、'gift'はシェアされた結果を見ている人向け
function renderGiftBox(el, o) {
  const heading = o.mode === 'gift'
    ? `「${o.typeName}」の友達に贈るなら`
    : `「${o.typeName}」のあなたに`;
  el.innerHTML = `
    <p class="gift-heading">${heading}</p>
    <p class="gift-season">${giftSeasonLine(o.mode)}</p>
    ${giftLinkHtml({
      href: o.href, icon: giftIconHtml(o.iconMap, o.item.emoji), name: o.item.name,
      // 本人向けの一言(bridge)は「あなた」宛てなので、シェア閲覧者には出さない
      reason: o.mode === 'gift' ? '' : o.bridge,
      placement: 'result_card', mode: o.mode,
    })}`;
  el.querySelector('.lucky-item').addEventListener('click', () => {
    o.onClick({ placement: 'result_card', mode: o.mode, item_name: o.item.name });
  });
  giftObserveOnce(el, o.onView);
}

// 2点+理由つきの結果欄(2026-10-14、メロい度から)。理由文は主語なしなので本人にもシェア閲覧者にも同じ文を出す
function renderGiftList(el, o) {
  if (!o.items || !o.items.length) {
    el.innerHTML = '';
    if (el._giftObs) { el._giftObs.disconnect(); el._giftObs = null; }
    return;
  }
  const heading = o.heading ? o.heading : o.mode === 'gift'
    ? `「${o.typeName}」の友達に贈るなら`
    : `「${o.typeName}」のあなたに`;
  el.innerHTML = `
    <p class="gift-heading">${heading}</p>
    <p class="gift-season">${giftSeasonLine(o.mode)}</p>
    ${o.items.map((it) => giftLinkHtml({
      href: o.href(it.keyword, it), icon: it.emoji, name: it.name, reason: it.reason,
      placement: 'result_card', mode: o.mode, priceLabel: it.priceLabel, pill: o.pill,
    })).join('')}`;
  el.querySelectorAll('.lucky-item').forEach((a, i) => {
    a.addEventListener('click', () => {
      o.onClick({ placement: 'result_card', mode: o.mode, item_name: o.items[i].name });
    });
  });
  giftObserveOnce(el, o.onView);
}

// 欄が画面に半分以上入ったら一度だけcbを呼ぶ(商品欄・次はこれの表示計測。クリック率の分母)。
// 描き直すたびに前の監視を止めて付け直す
function giftObserveOnce(el, cb) {
  if (!el || !cb || typeof IntersectionObserver === 'undefined') return;
  if (el._giftObs) el._giftObs.disconnect();
  const obs = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { obs.disconnect(); el._giftObs = null; cb(); }
  }, { threshold: 0.5 });
  el._giftObs = obs;
  obs.observe(el);
}
