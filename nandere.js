'use strict';
// ===== 何デレ診断(スピンオフ、全10問) =====
// メインのMBTI診断(script.js)とは完全に独立したファイル。DOM構造もscript.jsとは別物のため、
// index.htmlとscript.jsには一切触れず、このファイル単体で完結させている。
// カード画像生成のcardRoundRect/cardDrawBackground/cardFitTextMultilineは
// script.js内の同名関数を「色・ラベルを変数化して一般化」した移植版(レビュー方針どおり)。

// ---- 設問データ: 2軸(sunao=素直さ, netsu=熱量)×各5問、4択(weight -2/-1/+1/+2) ----
const NANDERE_QUESTIONS = [
  { axis: 'sunao', text: '好きな人にちょっとした好意を伝えたくなったら、あなたはどうする?', opts: [
    { text: 'つい素っ気ない態度をとってしまう', weight: -2 },
    { text: '本音は言えず、遠回しな態度で示す', weight: -1 },
    { text: '照れながらも、素直に言葉で伝える', weight: 1 },
    { text: '思いついた瞬間、まっすぐ気持ちを伝える', weight: 2 },
  ]},
  { axis: 'netsu', text: '好きな人ができると、あなたの1日はどう変わる?', opts: [
    { text: '普段のペースを崩さず、いつも通り過ごす', weight: -2 },
    { text: 'ふとした瞬間に思い出す程度', weight: -1 },
    { text: '気づけば1日に何度も考えてしまう', weight: 1 },
    { text: '頭の中がその人のことでいっぱいになる', weight: 2 },
  ]},
  { axis: 'sunao', text: '好きな人に「今何してる?」と聞かれたら、本当は嬉しいのに、どう返す?', opts: [
    { text: '「別に」とそっけなく返してしまう', weight: -2 },
    { text: '嬉しさは隠して、普通に返信する', weight: -1 },
    { text: '嬉しさが文面ににじみ出てしまう', weight: 1 },
    { text: '「わーい会いたい!」と全力で喜びを伝える', weight: 2 },
  ]},
  { axis: 'netsu', text: '好きな人のSNSやストーリーズを見る頻度は?', opts: [
    { text: 'そもそもあまりチェックしない', weight: -2 },
    { text: '気が向いたときにたまに見る程度', weight: -1 },
    { text: '気になって1日に何度も見てしまう', weight: 1 },
    { text: '更新のたびに秒速でチェックしてしまう', weight: 2 },
  ]},
  { axis: 'sunao', text: '好きな人が他の人と楽しそうに話しているのを見たとき、あなたの反応は?', opts: [
    { text: '気になるのに、興味ないふりをしてしまう', weight: -2 },
    { text: '何気ない話題のふりをして探りを入れる', weight: -1 },
    { text: '素直に「気になる」と言葉にする', weight: 1 },
    { text: '「私も混ぜて!」とその場に飛び込む', weight: 2 },
  ]},
  { axis: 'netsu', text: '好きな人に会えない日が続くと、どう感じる?', opts: [
    { text: '特にそこまで気にならない', weight: -2 },
    { text: '少し寂しいけど、まあ大丈夫', weight: -1 },
    { text: '会いたい気持ちがどんどん募っていく', weight: 1 },
    { text: '会えないことがつらくてたまらなくなる', weight: 2 },
  ]},
  { axis: 'sunao', text: '好きな人に褒められたとき、どんな反応をする?', opts: [
    { text: '「そんなことないし」と否定してしまう', weight: -2 },
    { text: '照れて、あまり反応できない', weight: -1 },
    { text: '「ありがとう、嬉しい」と素直に喜ぶ', weight: 1 },
    { text: '満面の笑みで大げさに喜びを表現する', weight: 2 },
  ]},
  { axis: 'netsu', text: '好きな人への気持ちを友達に話すとしたら、どんな感じ?', opts: [
    { text: 'そもそもあまり人には話さない', weight: -2 },
    { text: '聞かれたら少しだけ話す程度', weight: -1 },
    { text: '気づけば長々と話してしまう', weight: 1 },
    { text: '友達が引くくらい熱く語ってしまう', weight: 2 },
  ]},
  { axis: 'sunao', text: '好きな人と喧嘩をしたら、仲直りのときどうする?', opts: [
    { text: '謝りたいのに、なかなか素直になれない', weight: -2 },
    { text: '行動で示すけど、言葉にはしない', weight: -1 },
    { text: '自分から「ごめんね」と言葉にする', weight: 1 },
    { text: '泣きながらでも真っ先に気持ちを伝える', weight: 2 },
  ]},
  { axis: 'netsu', text: '好きな人との未来を想像することはある?', opts: [
    { text: 'そんな先のことは考えない', weight: -2 },
    { text: 'たまにふと想像する程度', weight: -1 },
    { text: '気づくと将来のことまで考えてしまう', weight: 1 },
    { text: '四六時中、二人の未来を妄想してしまう', weight: 2 },
  ]},
];

// ---- タイプ定義 ----
// 動物・絵文字はscript.jsのANIMAL_MAP(🐢🐕🦉🐺🐱🐰🦌🦝🐆🐬🐶🦊🦁🐕‍🦺🦢🦅)、
// WEATHER_MAP(☀️🌤️🌫️🌀🍃🌦️🌇❄️⛈️🏖️🌬️🌳🌈⛅)、
// VEHICLE_MAP(🚃🚌⛵🛥️🏍️🛶🎈🧪🏎️🚗🪂🏁🚄🚙🚍🚢)といずれも重複しない5種を新規選定(2026-08-26)。
const NANDERE_TYPES = {
  tsun: {
    emoji: '🦔', name: 'ツンデレ',
    nickname: 'トゲの下は溶岩なハリネズミ',
    tagline: '「別に」は好きの暗号。',
    color: '#ff8a65',
    description: '好きな人ほど塩対応。LINEの返信は「ふーん」「別に」の二文字なのに、既読だけは光速。相手の投稿は全部チェック済みで、頭の中はその人のことで満員御礼です。素直になれないのは、気持ちが大きすぎて出口で渋滞しているから。周りからはクールに見られがちだけど、本当はかまってほしいし、褒められたら3日は思い出してニヤけるタイプ。そのトゲ、鎧じゃなくて照れ隠しだって、実はみんな薄々気づいてます。たまには「ありがとう」の一言だけでも素直に出してみて。それだけで、あなたの魅力は倍増します。',
  },
  cool: {
    emoji: '🐧', name: 'クーデレ',
    nickname: '氷の下に温泉を隠すペンギン',
    tagline: '静かに、深く、好き。',
    color: '#4fb3d9',
    description: '感情の起伏? 何それおいしいの、という顔で日々を過ごすあなた。デートの誘いには「行けたら行く」、告白されても「そう」。でも実は、心の中の温度計はちゃんと動いています。好きな人の隣では歩くスピードが少しだけ落ちるし、二人の予定は誰よりも正確に覚えている。騒がないだけで、愛はしっかり深いタイプです。ただしそのポーカーフェイス、精度が高すぎて相手には全然伝わっていません。100ある気持ちのうち、せめて10だけでも言葉にしてみて。普段静かなあなたの一言は、そのぶん重みが違います。',
  },
  yan: {
    emoji: '🐙', name: 'ヤンデレ気質',
    nickname: '愛が渋滞中の全力ハグ製造機',
    tagline: '好きの供給量、規定オーバー',
    color: '#c45bff',
    description: '好きになったら一直線どころか八方向から全力。連絡はまめ、記念日は完璧、相手の好物は全部暗記済み。愛情の供給量が常に規定値を超えていて、周りが「ちょっと落ち着け」とツッコむレベルです。でも隠す気ゼロの全力好き好きオーラは、実はいちばん裏表がなくて信頼できる証拠。愛が重い? いいえ、愛が豊作なだけです。あなたのそばにいる人は、愛されているか不安になる暇が1秒もありません。その情熱は間違いなく最強の武器。あとは相手のペースに合わせる余白をちょっとだけ作れば、無敵の愛されキャラの完成です。',
  },
  kenage: {
    emoji: '🐿️', name: '健気デレ',
    nickname: '愛を毎日積み立てるどんぐり係',
    tagline: '小さな好きを、コツコツ積立。',
    color: '#e0a253',
    description: 'ドカンと燃え上がるタイプじゃないけれど、好きな気持ちは毎日ちゃんと言葉にする。おはようのLINE、さりげない差し入れ、疲れてそうな日の気遣い。あなたの愛は一発逆転じゃなくて、コツコツ積み立てる堅実運用型です。派手さはないのに、気づけば相手の生活に欠かせない存在になっているのが最大の強み。ただし、尽くしすぎて自分を後回しにしがちなのが玉にキズ。あなたが積み上げてきた優しさは、ちゃんと受け取ってもらっていいものです。たまには「私も甘えたい」って言っちゃいましょう。それも立派な素直です。',
  },
  nanairo: {
    emoji: '🦄', name: '七色デレ',
    nickname: '出現率5%の七変化ユニコーン',
    tagline: '今日のデレは、何色?',
    color: '#b892ff',
    rare: true,
    description: 'おめでとうございます、あなたは出現率わずか5%程度の激レアタイプ。ツンな日もあれば、全力デレの日もあり、クールに澄ます日もある。デレ方が七色に変わるので、相手は毎日新しいあなたに出会っている状態です。「つかみどころがない」と言われがちだけど、それは相手や状況に合わせて愛し方を選べる、恋愛の万能選手だという証拠。飽きられる心配とは無縁の、伝説級の魅力の持ち主です。唯一の注意点は、変幻自在すぎて本心が伝わりにくいこと。ここぞという場面では、色を一つに絞って伝えてみて。その一色は最強に輝きます。',
  },
};

// ---- 相性ペア(固定) ----
const NANDERE_COMPAT = {
  tsun: { partner: 'kenage', percent: 92, note: 'ツンデレの「別に」を、健気デレは「はいはい、照れてるんだね」と笑顔で受け止めて、コツコツ愛を注ぎ続ける。安心してツンできる関係は、実はいちばんの癒しです。' },
  kenage: { partner: 'tsun', percent: 92, note: 'ツンデレの「別に」を、健気デレは「はいはい、照れてるんだね」と笑顔で受け止めて、コツコツ愛を注ぎ続ける。安心してツンできる関係は、実はいちばんの癒しです。' },
  cool: { partner: 'yan', percent: 88, note: 'ヤンデレ気質の全力すぎる愛を、クーデレは涼しい顔でさらりと受け流す。でも内心はまんざらでもない。熱と冷のバランスが絶妙な、実は最強の温度差ペアです。' },
  yan: { partner: 'cool', percent: 88, note: 'ヤンデレ気質の全力すぎる愛を、クーデレは涼しい顔でさらりと受け流す。でも内心はまんざらでもない。熱と冷のバランスが絶妙な、実は最強の温度差ペアです。' },
  nanairo: { partner: 'nanairo', percent: 99, note: '出現率5%同士が出会う確率、もはや奇跡。毎日違うデレが飛び交うから、一生飽きが来ません。伝説の生き物同士、今日も新しい二人を更新中。' },
};

// ---- ラッキーアイテム(Amazonアソシエイト。script.jsの仕組みを踏襲した独立実装) ----
// AFFILIATE_TAG: script.jsと同じ'tinywonders-22'(取得済みJAタグ)を流用。何デレ診断は
// JA単独ページ(LANG切り替えなし)なのでUS向けタグ分岐は持たない。
const AFFILIATE_TAG = 'tinywonders-22';

// script.jsのaffiliateUrl()と同仕様: ¥1,000〜3,000の価格帯フィルタ+レビュー評価順ソートを
// URLパラメータで強制する(amazon.co.jpで動作確認済み)。
function affiliateUrl(keyword) {
  let base = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  base += '&rh=p_36%3A100000-300000&s=review-rank';
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

// script.jsのLUCKY_ICON_MAP(img/lucky-icons/、9カテゴリ)を再利用。何デレ側で新規に使う
// 絵文字だけを最小限マッピングしている(該当なしの絵文字はそのまま素の絵文字で表示される)。
const NANDERE_LUCKY_ICON_MAP = {
  '🌿': 'bath', '☕': 'mug', '🥤': 'mug', '🍀': 'candle', '💫': 'jewelry',
  '🌸': 'plant', '💅': 'cosmetics', '🧦': 'textile', '💄': 'cosmetics',
  '💼': 'jewelry', '🌟': 'jewelry', '💧': 'cosmetics', '🔑': 'pouch',
};

// 診断結果とラッキーアイテムをつなぐ一言(script.jsのLUCKY_BRIDGE相当)。タイプの気質ごとに固定。
const NANDERE_LUCKY_BRIDGE = {
  tsun: 'そのトゲ、誰にも見せない不器用な優しさですね。今日はその手に、ちょっとだけご褒美を。',
  cool: '静かなあなたの奥に眠る熱は、案外近くにあるもので温まるかもしれません。',
  yan: 'あふれる愛情表現、たまには自分自身にも向けてみませんか。',
  kenage: 'コツコツ積み上げてきた優しさに、今日はあなたがご褒美をもらう番です。',
  nanairo: '出現率5%のあなたには、同じくらいレアな特別感のある一品を。',
};

// 20〜30代女性向け・¥1,000〜3,000のギフトを想定し、タイプの気質に合わせて1〜3候補を用意。
// 結果画面のたびランダムに1つ選ぶ(script.jsのpickLuckyItemと同じ2段構成)。
// 2026-08-27、全キーワードをAmazon.co.jpで実際に検索して目視確認済み(価格帯¥1,000〜3,000・
// レビュー評価順フィルタ適用の上、宗教モチーフ・追悼グッズ・子供向け商品等の不適切な混入がないことを確認。
// 検証時に「ハートモチーフ」系キーワードで宗教ジュエリーが、「レターセット」「ひざ掛け」系キーワードで
// 子供・ベビー向け商品が混入したため、それらは避けて別カテゴリに差し替え済み)。
const NANDERE_LUCKY_ITEMS = {
  tsun: [
    { emoji: '🌿', name: 'SHIROのハンドクリーム', keyword: 'SHIRO ハンドクリーム ギフト' },
    { emoji: '☕', name: '波佐見焼のマグカップ', keyword: 'マグカップ 波佐見焼 シンプル' },
    { emoji: '🔑', name: '本革のキーホルダー', keyword: 'キーホルダー 本革 シンプル' },
  ],
  cool: [
    { emoji: '🍀', name: '無香のアロマストーン', keyword: 'アロマストーン 卓上 無香' },
    { emoji: '🥤', name: 'KINTOの保冷保温タンブラー', keyword: 'KINTO タンブラー 保冷保温' },
    { emoji: '💫', name: 'シルバーの華奢ブレスレット', keyword: 'ブレスレット シルバー シンプル' },
  ],
  yan: [
    { emoji: '🌸', name: 'プリザーブドフラワーのミニブーケ', keyword: 'プリザーブドフラワー ミニブーケ ギフト' },
    { emoji: '💅', name: 'デパコスの赤いネイルポリッシュ', keyword: 'ネイルポリッシュ レッド デパコス' },
  ],
  kenage: [
    { emoji: '🧦', name: 'あったかルームソックス', keyword: 'ルームソックス あったか 可愛い' },
    { emoji: '☕', name: '保温マグカップ', keyword: '保温マグカップ おしゃれ シンプル' },
    { emoji: '💄', name: 'ハンドクリーム&リップのギフトセット', keyword: 'ハンドクリーム リップ ギフトセット' },
  ],
  nanairo: [
    { emoji: '💼', name: 'コスメのコフレギフト', keyword: 'コスメ コフレ ギフト 限定' },
    { emoji: '🌟', name: '華奢リング', keyword: 'リング レディース 華奢 ギフト' },
    { emoji: '💧', name: 'デパコスのミニ香水', keyword: 'デパコス 香水 ミニ ギフトセット' },
  ],
};

function pickNandereLuckyItem(id) {
  const candidates = NANDERE_LUCKY_ITEMS[id];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ---- スコア計算(純粋関数。Node側でも brute-force 検証できるよう副作用なしにしている) ----
function computeNandereScores(answers) {
  let sunao = 0, netsu = 0;
  answers.forEach((a) => {
    if (a.axis === 'sunao') sunao += a.weight;
    else netsu += a.weight;
  });
  return { sunao, netsu };
}

// 両軸とも中間(|sunao|+|netsu| <= 1)に収まったときだけ「七色デレ」を出す設計。
// 全4^10通りのブルートフォース検証で出現率 約5.15%(実測)。「出現率4〜5%程度」の演出と整合。
function computeNandereType(sunao, netsu) {
  if (Math.abs(sunao) + Math.abs(netsu) <= 1) return 'nanairo';
  if (sunao < 0 && netsu > 0) return 'tsun';
  if (sunao < 0 && netsu <= 0) return 'cool';
  if (sunao >= 0 && netsu <= 0) return 'kenage';
  return 'yan';
}

// 各軸の絶対値(最大10)を0-100に正規化し、平均を「純度」とする。
// 端に寄っているほど(=はっきりした傾向が出るほど)純度が高くなる。
function computeNanderePurity(sunao, netsu) {
  const p = (Math.abs(sunao) / 10) * 50 + (Math.abs(netsu) / 10) * 50;
  return Math.max(0, Math.min(100, Math.round(p)));
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NANDERE_QUESTIONS, NANDERE_TYPES, NANDERE_COMPAT,
    computeNandereScores, computeNandereType, computeNanderePurity,
  };
}

// ===== ここから先はブラウザ実行のみ(DOM操作) =====
if (typeof document !== 'undefined') {
  (function () {
    const screens = {
      start: document.getElementById('screen-start'),
      chat: document.getElementById('screen-chat'),
      result: document.getElementById('screen-result'),
    };
    const chatLog = document.getElementById('chat-log');
    const chatOptions = document.getElementById('chat-options');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    let currentIndex = 0;
    let answers = [];
    let lastResult = null; // { id, sunao, netsu, purity }

    function showScreen(name) {
      Object.values(screens).forEach((s) => s.classList.remove('active'));
      screens[name].classList.add('active');
    }

    function startQuiz() {
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= NANDERE_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = NANDERE_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / NANDERE_QUESTIONS.length) * 100}%`;
      progressText.textContent = `${currentIndex + 1} / ${NANDERE_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">💘</div><div class="bubble ai">${text}</div>`;
      } else {
        wrap.innerHTML = `<div class="bubble user">${text}</div>`;
      }
      chatLog.appendChild(wrap);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    function renderOptions(q) {
      chatOptions.innerHTML = '';
      q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-num">${i + 1}</span><span class="option-text">${opt.text}</span>`;
        btn.addEventListener('click', () => selectOption(q, opt));
        chatOptions.appendChild(btn);
      });
    }

    function selectOption(q, opt) {
      addBubble(opt.text, 'user');
      answers.push({ axis: q.axis, weight: opt.weight });
      chatOptions.innerHTML = '';
      currentIndex++;
      setTimeout(askNext, 320);
    }

    function showResult() {
      const { sunao, netsu } = computeNandereScores(answers);
      const id = computeNandereType(sunao, netsu);
      const purity = computeNanderePurity(sunao, netsu);
      lastResult = { id, sunao, netsu, purity };
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
    }

    function renderResult(result) {
      const t = NANDERE_TYPES[result.id];
      const compat = NANDERE_COMPAT[result.id];
      const partner = NANDERE_TYPES[compat.partner];

      document.getElementById('nandere-emoji').textContent = t.emoji;
      document.getElementById('nandere-name').textContent = t.name;
      document.getElementById('nandere-nickname').textContent = t.nickname;
      document.getElementById('nandere-tagline').textContent = t.tagline;
      document.getElementById('nandere-desc').textContent = t.description;

      const card = document.getElementById('nandere-card');
      card.style.setProperty('--accent', t.color);

      const purityWrap = document.getElementById('nandere-purity-wrap');
      const rarityWrap = document.getElementById('nandere-rarity-wrap');
      if (t.rare) {
        purityWrap.style.display = 'none';
        rarityWrap.style.display = 'block';
      } else {
        rarityWrap.style.display = 'none';
        purityWrap.style.display = 'block';
        document.getElementById('nandere-purity-fill').style.width = `${result.purity}%`;
        document.getElementById('nandere-purity-label').textContent = `${t.name}純度 ${result.purity}%`;
      }

      document.getElementById('compat-emoji').textContent = partner.emoji;
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      const lucky = pickNandereLuckyItem(result.id);
      const luckyIcon = NANDERE_LUCKY_ICON_MAP[lucky.emoji]
        ? `<img src="img/lucky-icons/${NANDERE_LUCKY_ICON_MAP[lucky.emoji]}.jpg" alt="" width="42" height="42" loading="lazy">`
        : lucky.emoji;
      document.getElementById('nandere-lucky').innerHTML = `
        <div class="lucky-bridge">${NANDERE_LUCKY_BRIDGE[result.id]}</div>
        <a class="lucky-item" href="${affiliateUrl(lucky.keyword)}" target="_blank" rel="noopener sponsored">
          <span class="lucky-emoji">${luckyIcon}</span>
          <span class="lucky-text"><span class="lucky-label">🍀 今日のラッキーアイテム<span class="lucky-pr-tag">PR</span></span><span class="lucky-name">${lucky.name}を見てみる</span><span class="lucky-price">¥1,000〜3,000で買えるプチギフト</span></span>
          <span class="lucky-arrow">›</span>
        </a>
      `;
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?s=${result.sunao}&n=${result.netsu}`;
    }

    function copyResultUrl() {
      if (!lastResult) return;
      const btn = document.getElementById('btn-copy-url');
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        const original = btn.textContent;
        btn.textContent = 'コピーしました!';
        setTimeout(() => { btn.textContent = original; }, 2000);
      });
    }

    function shareText(result) {
      const t = NANDERE_TYPES[result.id];
      return `【何デレ診断】私は「${t.emoji}${t.name}」でした!(${t.nickname})\n#何デレ診断 #deskanimals`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function restartQuiz() {
      lastResult = null;
      history.replaceState(null, '', location.pathname);
      startQuiz();
    }

    // ===== 結果カード画像生成(script.jsのcardRoundRect/cardDrawBackground/cardFitTextMultilineを
    // 「3ブロック構成の性格タイプ用」から「単一タイプ+純度スコア+相性」向けに一般化して移植) =====
    const CARD_PAL = {
      bg1: '#ffe9f3', bg2: '#f4e9ff', bg3: '#fff6e9',
      primaryDark: '#ef6b96', text: '#55404f', sub: '#a3899e',
    };

    function cardRoundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function cardDrawBackground(ctx, w, h) {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, CARD_PAL.bg1);
      g.addColorStop(0.55, CARD_PAL.bg2);
      g.addColorStop(1, CARD_PAL.bg3);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      const blobs = [
        [w * 0.85, h * 0.15, w * 0.30, '#ffd8e8'],
        [w * 0.15, h * 0.92, w * 0.28, '#e2d4ff'],
        [w * 0.65, h * 0.88, w * 0.22, '#fff0d8'],
      ];
      blobs.forEach(([x, y, r, c]) => {
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, c);
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function cardWrapAtSize(ctx, text, maxWidth, weight, family, size) {
      ctx.font = `${weight} ${size}px ${family}`;
      const hasSpaces = /\s/.test(text);
      const units = hasSpaces ? text.split(' ') : text.split('');
      const sep = hasSpaces ? ' ' : '';
      const lines = [];
      let cur = '';
      units.forEach((u) => {
        const trial = cur ? cur + sep + u : u;
        if (!cur || ctx.measureText(trial).width <= maxWidth) {
          cur = trial;
        } else {
          lines.push(cur);
          cur = u;
        }
      });
      if (cur) lines.push(cur);
      return lines;
    }

    function cardFitTextMultiline(ctx, text, maxWidth, weight, family, maxSize, minSize, maxLines) {
      let size = maxSize;
      let lines = cardWrapAtSize(ctx, text, maxWidth, weight, family, size);
      while (lines.length > maxLines && size > minSize) {
        size -= 1;
        lines = cardWrapAtSize(ctx, text, maxWidth, weight, family, size);
      }
      if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        ctx.font = `${weight} ${size}px ${family}`;
        let last = lines[maxLines - 1];
        while (last.length > 1 && ctx.measureText(last + '…').width > maxWidth) {
          last = last.slice(0, -1);
        }
        lines[maxLines - 1] = last + '…';
      }
      return { size, lines };
    }

    function cardPill(ctx, x, y, text, color, fontSize) {
      ctx.font = `700 ${fontSize}px 'Zen Maru Gothic', sans-serif`;
      const tw = ctx.measureText(text).width;
      const pw = tw + fontSize * 1.6, ph = fontSize * 1.9;
      ctx.fillStyle = color;
      cardRoundRect(ctx, x, y, pw, ph, ph / 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText(text, x + fontSize * 0.8, y + ph / 2 + 1);
      return pw;
    }

    function drawNandereCard(ctx, W, H, result, opts) {
      const t = NANDERE_TYPES[result.id];
      const compat = NANDERE_COMPAT[result.id];
      const partner = NANDERE_TYPES[compat.partner];
      cardDrawBackground(ctx, W, H);
      ctx.textBaseline = 'middle';

      // 中央上部の大きな絵文字サークル
      const circleY = opts.circleY, circleR = opts.circleR;
      ctx.save();
      ctx.shadowColor = 'rgba(120,90,130,0.28)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 8;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(W / 2, circleY, circleR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.font = `${circleR * 1.15}px 'Segoe UI Emoji', sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(t.emoji, W / 2, circleY + circleR * 0.06);

      let y = circleY + circleR + opts.gapAfterCircle;

      ctx.font = "700 26px 'Zen Maru Gothic', sans-serif";
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText('何デレ診断 RESULT', W / 2, y);
      y += opts.eyebrowGap;

      const fit = cardFitTextMultiline(ctx, t.name, W - 140, '900', "'Zen Maru Gothic', sans-serif", opts.nameSize, opts.nameMinSize, 1);
      ctx.font = `900 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(fit.lines[0], W / 2, y);
      y += opts.nameGap;

      ctx.font = `700 ${opts.nicknameSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.text;
      const nickFit = cardFitTextMultiline(ctx, t.nickname, W - 160, '700', "'Zen Maru Gothic', sans-serif", opts.nicknameSize, opts.nicknameSize - 8, 1);
      ctx.font = `700 ${nickFit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillText(nickFit.lines[0], W / 2, y);
      y += opts.nicknameGap;

      // 純度 or レアバッジ
      const badgeText = t.rare ? '出現率 約5%(激レア)' : `${t.name}純度 ${result.purity}%`;
      ctx.font = `700 ${opts.badgeFont}px 'Zen Maru Gothic', sans-serif`;
      const bw = ctx.measureText(badgeText).width + opts.badgeFont * 2;
      const bh = opts.badgeFont * 2;
      ctx.fillStyle = t.color;
      cardRoundRect(ctx, W / 2 - bw / 2, y - bh / 2, bw, bh, bh / 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(badgeText, W / 2, y + 2);
      y += opts.badgeGap;

      // 相性
      ctx.font = `600 ${opts.compatFont}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText(`相性◎ ${partner.emoji} ${partner.name}(${compat.percent}%)`, W / 2, y);
      y += opts.compatGap;

      ctx.strokeStyle = 'rgba(160,130,175,0.28)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - opts.lineHalf, y);
      ctx.lineTo(W / 2 + opts.lineHalf, y);
      ctx.stroke();
      y += opts.ctaGap;

      ctx.fillStyle = CARD_PAL.primaryDark;
      ctx.font = `700 ${opts.ctaSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillText('あなたは何デレ? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 何デレ診断', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildNandereCardCanvas(result, mode) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawNandereCard(canvas.getContext('2d'), 1080, 1920, result, {
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowGap: 60,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 28, brandOffset: 46,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawNandereCard(canvas.getContext('2d'), 1200, 630, result, {
          circleY: 175, circleR: 110, gapAfterCircle: 55, eyebrowGap: 42,
          nameSize: 52, nameMinSize: 32, nameGap: 62,
          nicknameSize: 26, nicknameGap: 56,
          badgeFont: 22, badgeGap: 58,
          compatFont: 21, compatGap: 40,
          lineHalf: 300, ctaGap: 44, ctaSize: 26, brandSize: 18, brandOffset: 30,
        });
      }
      return canvas;
    }

    async function renderCardPreview(result) {
      const preview = document.getElementById('result-card-preview');
      preview.innerHTML = '';
      try {
        if (document.fonts && document.fonts.ready) {
          try { await document.fonts.ready; } catch (e) { /* フォント待ち失敗時は既定フォントで続行 */ }
        }
        const canvas = buildNandereCardCanvas(result, 'x');
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = 'nandere result card preview';
        img.width = 1200;
        img.height = 630;
        preview.appendChild(img);
      } catch (e) {
        console.error('結果カードプレビューの生成に失敗しました', e);
        preview.remove();
      }
    }

    async function downloadResultCard(mode) {
      if (!lastResult) return;
      const btnId = mode === 'story' ? 'btn-save-card-story' : 'btn-save-card';
      const btn = document.getElementById(btnId);
      const original = btn.textContent;
      btn.textContent = '生成中…';
      btn.disabled = true;
      try {
        const canvas = buildNandereCardCanvas(lastResult, mode);
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `nandere-shindan-${lastResult.id}-${mode}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 4000);
            resolve();
          }, 'image/png');
        });
      } catch (e) {
        console.error('結果カード生成に失敗しました', e);
      } finally {
        btn.textContent = original;
        btn.disabled = false;
      }
    }

    // ===== 初期化 =====
    document.getElementById('btn-start').addEventListener('click', startQuiz);
    document.getElementById('btn-share').addEventListener('click', shareResultX);
    document.getElementById('btn-share-line').addEventListener('click', shareResultLine);
    document.getElementById('btn-copy-url').addEventListener('click', copyResultUrl);
    document.getElementById('btn-restart').addEventListener('click', restartQuiz);
    document.getElementById('btn-save-card').addEventListener('click', () => downloadResultCard('x'));
    document.getElementById('btn-save-card-story').addEventListener('click', () => downloadResultCard('story'));

    // 結果URL(?s=&n=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const sRaw = params.get('s');
      const nRaw = params.get('n');
      if (sRaw === null || nRaw === null) return;
      const sunao = parseInt(sRaw, 10);
      const netsu = parseInt(nRaw, 10);
      if (!Number.isFinite(sunao) || !Number.isFinite(netsu)) return;
      if (Math.abs(sunao) > 10 || Math.abs(netsu) > 10) return;
      const id = computeNandereType(sunao, netsu);
      const purity = computeNanderePurity(sunao, netsu);
      lastResult = { id, sunao, netsu, purity };
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
    })();

    // ===== アクセス解析(メインサイトと同一GA4プロパティ) =====
    const GA_MEASUREMENT_ID = 'G-GH850PJWLP';
    if (GA_MEASUREMENT_ID && !document.getElementById('ga-gtag-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-gtag-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);
    }
  })();
}
