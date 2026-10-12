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
function giftLinkHtml(o) {
  return `
    <a class="lucky-item" href="${o.href}" target="_blank" rel="noopener sponsored"
       data-aff-placement="${o.placement}" data-aff-mode="${o.mode}" data-aff-item="${giftEsc(o.name)}">
      <span class="lucky-emoji" aria-hidden="true">${o.icon}</span>
      <span class="lucky-text">
        <span class="lucky-label"><span class="lucky-pr-tag">PR</span><span class="sr-only">(広告)</span>${o.reason ? `<span class="gift-reason">${giftEsc(o.reason)}</span>` : ''}</span>
        <span class="lucky-name">${giftEsc(o.name)}をAmazonで見る</span>
        <span class="lucky-price">¥1,000〜3,000の価格帯で検索</span>
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
}
