'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== 恋の罪診断(スピンオフ、全10問、2026-10-10) =====
// 何デレ診断(nandere.js)と同じ仕組み(2軸×5問・5タイプ・結果カード画像)を流用した独立ファイル。
// DOMのid/classも nandere.html と同じ名前を使い、style.css の何デレ診断用スタイルをそのまま当てている。
// 設問・結果文はFable執筆。
// 軸: oshi=押しの強さ(+自分から動く/-待つ)、kanjo=感情か計算か(+感情/-計算)。

// ---- 設問データ: 2軸(oshi=押しの強さ, kanjo=感情か計算か)×各5問、4択(weight -2/-1/+1/+2) ----
const AKUMA_QUESTIONS = [
  { axis: 'oshi', text: '気になる人とLINEを交換した日の夜、あなたは?', opts: [
    { text: '「今日ありがとう!」って普通に送る', weight: 1 },
    { text: '向こうから来るまで待つ。焦ったら負け', weight: -2 },
    { text: '「次いつ会える?」まで一気に聞いちゃう', weight: 2 },
    { text: 'スタンプだけ送って様子を見る', weight: -1 },
  ]},
  { axis: 'kanjo', text: '好きな人からの返信が半日来ない。頭の中は?', opts: [
    { text: '嫌われた?って不安でスマホ見っぱなし', weight: 2 },
    { text: 'こっちも同じくらい時間を空けて返そう', weight: -1 },
    { text: 'ちょっとモヤるけど、まあ忙しいんだろうな', weight: 1 },
    { text: '既読のついた時間から相手の生活リズムを分析', weight: -2 },
  ]},
  { axis: 'oshi', text: '好きな人がストーリーズで「暇〜」って上げてた。', opts: [
    { text: '見るかどうかで30分悩んで、結局見ない', weight: -2 },
    { text: '速攻で「じゃあ遊ぼ」ってDM', weight: 2 },
    { text: '見たことは隠して、いつも通り過ごす', weight: -1 },
    { text: 'とりあえずリアクションだけ送っておく', weight: 1 },
  ]},
  { axis: 'kanjo', text: '友達から「あの人、あなたのこと気になってるらしいよ」と聞いた。', opts: [
    { text: 'うれしくて顔がにやける、たぶん隠せてない', weight: 1 },
    { text: 'まず相手の予定・距離・交友関係を整理してから考える', weight: -2 },
    { text: 'その日から脳内で告白シーンを100回再生', weight: 2 },
    { text: '本当かどうか、別ルートで裏を取る', weight: -1 },
  ]},
  { axis: 'oshi', text: 'デートの約束を取り付けたい。あなたの手口は?', opts: [
    { text: '相手の好きそうな話題を振ってから、軽く誘う', weight: 1 },
    { text: 'お互いの予定が奇跡的に合う日を待つ', weight: -2 },
    { text: '「行きたい店あるんだけど」で直球', weight: 2 },
    { text: '行きたい場所を匂わせて、向こうから誘うのを待つ', weight: -1 },
  ]},
  { axis: 'kanjo', text: '好きな人が別の人と楽しそうに話してた。', opts: [
    { text: '相手との関係性を冷静に観察して情報収集', weight: -2 },
    { text: '帰ってから友達に長文で相談', weight: 1 },
    { text: 'その場で気持ちが顔に出る、たぶんバレてる', weight: 2 },
    { text: '気にしてないフリをして、こっちも別の人と話す', weight: -1 },
  ]},
  { axis: 'oshi', text: '初デートの帰り道。まだ気持ちは伝えていません。', opts: [
    { text: 'その場で「好きかも」って言っちゃう', weight: 2 },
    { text: '帰宅後、お礼のLINEだけ送って終わり', weight: -1 },
    { text: '何も送らず、相手からのお礼を待つ', weight: -2 },
    { text: '別れ際に「今日めっちゃ楽しかった、また行こ」', weight: 1 },
  ]},
  { axis: 'kanjo', text: '告白するなら、どのタイミング?', opts: [
    { text: '雰囲気が良くなった日の帰り道', weight: 1 },
    { text: '相手の脈ありサインが3つ揃ってから', weight: -1 },
    { text: '気持ちが高まった瞬間、その場で', weight: 2 },
    { text: '成功率を見積もって、勝てると確信した時だけ', weight: -2 },
  ]},
  { axis: 'oshi', text: '気になる人と偶然同じ電車に乗り合わせた。', opts: [
    { text: '気づかれるまで、気づかないフリ', weight: -1 },
    { text: '迷わず隣に行って話しかける', weight: 2 },
    { text: '別の車両に移動して心を落ち着ける', weight: -2 },
    { text: '目が合ったら手を振る。合わなければ、まあ', weight: 1 },
  ]},
  { axis: 'kanjo', text: '恋がうまくいかなかった時、立ち直り方は?', opts: [
    { text: '何がダメだったか分析して、次は同じ手を使わない', weight: -2 },
    { text: 'しばらく引きずるけど、時間が解決してくれる', weight: 1 },
    { text: '泣いて歌って、友達と語り尽くす', weight: 2 },
    { text: '「まあ縁がなかった」と切り替えて次へ', weight: -1 },
  ]},
];

// ---- タイプ定義(sin=恋の罪。結果見出しは「{sin}の罪|{name}」) ----
const AKUMA_TYPES = {
  shitto: {
    emoji: '👿', sin: '嫉妬', name: 'ヤキモチ即出し悪魔',
    nickname: 'ヤキモチが顔と口に出る直球タイプ',
    tagline: '気になったら即聞く、即会いに行く',
    color: '#c2185b',
    description: '気になる人ができた瞬間、もう体が動いてるタイプ。DMは即送る、誘うのも自分から、「好きかも」もその場で言っちゃう。問題はヤキモチの方で、相手が誰かと楽しそうに話していただけで顔が一気に曇ります。しかも隠せない。「さっきの誰?」とその日のうちに本人へ直接聞いちゃうので、周りからは「わかりやすすぎ」と笑われがち。でも裏を返せば、嘘も駆け引きもゼロの超ストレート。相手からすると「何を考えてるか分かる人」はけっこう安心なんです。ヤキモチを口にする時は「不安だった」と気持ちの方を添えると、ただの直球が最強の正直さに変わります。',
  },
  gouyoku: {
    emoji: '😈', sin: '強欲', name: '全方位お誘い悪魔',
    nickname: '本命未定で全員に声をかける戦略家',
    tagline: '全員誘って、本命は後で決める',
    color: '#6a1b9a',
    description: '気になる人がいたら即誘う、しかも一人に絞らない。Aさんとランチ、Bさんとカフェ、Cさんとは映画の約束。気づけばカレンダーが候補者で埋まってる、恋の戦略家タイプです。本人いわく「まだ本命を決める段階じゃない」。冷静に比べて一番いい人を選びたい、だから全員に保険をかけておく。合理的ではあるんですけど、誘われた側は「え、他にもいるの?」と気づいた瞬間にちょっと戸惑います。でも、自分から動けて選択肢を広げられるのは立派な才能。恋愛を運まかせにしないのは強いです。「この人かも」と思えた相手が一人出てきたら、保険をたたんで一点集中。そこからが本当の強さです。',
  },
  taida: {
    emoji: '🌙', sin: '怠惰', name: '脳内デート完結悪魔',
    nickname: '頭の中では3回付き合って別れてる人',
    tagline: '告白はまだ、妄想はもう最終回',
    color: '#3949ab',
    description: '告白はまだなのに、脳内では付き合って、ケンカして、仲直りまで済んでいる。それがあなたです。好きな人の何気ない「おつかれ」のLINEを三日は反芻し、送る文面は下書きで五回書き直して、結局スタンプひとつ。デート前夜は当日の会話をシミュレーションしすぎて寝不足、本番は妄想のほうが盛り上がっていた、という経験もあるのでは。でも裏を返せば、相手を見る解像度が異常に高く、ひとつのやりとりを大事にできる人。これは本当に貴重です。妄想の中で言えた台詞を、ひとつでいいので現実に持ち出してみてください。たいてい妄想より短く済みます。',
  },
  gouman: {
    emoji: '🖤', sin: '傲慢', name: '追われ待ち専門悪魔',
    nickname: '好きだけど絶対に自分からは言わない人',
    tagline: '先に動いたら負け、だと思ってる',
    color: '#37474f',
    description: '「向こうから来ないってことは、そういうことでしょ」。そう言いながら、相手のプロフィール更新だけは見逃さないのが傲慢の罪です。自分からは誘わない、先に好きとは言わない、既読は少し置いてから。追わせているつもりで、実は相手も同じ作戦を取っていて、お互い待ち続けて自然消滅、という経験が一度くらいはあるはず。これはプライドが高いというより、「断られる姿を見られたくない」という繊細さが鎧を着ているだけ。一度心を決めたらブレない安定感と、軽々しく言わないからこそ重みのある言葉は、あなたの強みです。鎧を全部脱ぐ必要はありません。「次いつ空いてる?」の一言だけ、先手を取ってみてください。',
  },
  rare: {
    emoji: '🔮', sin: '全部盛り', name: '気まぐれ七変化小悪魔',
    nickname: '日替わりで罪が変わる気分屋の小悪魔',
    tagline: '全部の罪をちょっとずつ、天然で',
    color: '#d84315',
    rare: true,
    description: '嫉妬も強欲も怠惰も傲慢も、どれも「ちょっとだけ」持っている。そんなあなたは、この診断で約5%しか出ない天然の小悪魔です。昨日は相手の返信を待ちきれず連投したのに、今日は既読をつけずに放置。先週は脳内デートで満足していたのに、今週は自分から誘っている。本人に作戦はなく、ただその時の気分に正直なだけなのですが、相手からすると読めなさすぎて、気づけば目が離せなくなっています。つかみどころのなさは欠点ではなく、飽きさせない魅力そのもの。ただし気まぐれが「雑」に見える瞬間だけは要注意。相手が不安そうな顔をした時は、いつもより一言多めに本音を添えてあげてください。',
  },
};

// ---- 相性ペア(固定) ----
const AKUMA_COMPAT = {
  shitto:  { partner: 'gouman',  percent: 93, note: '自分から絶対に動かない追われ待ち専門悪魔に、あなたの直球が刺さります。向こうが澄ました顔で待っている間に、こっちは「好きかも」まで言い切る。プライドの壁を正面突破できるのは、感情全開のあなただけ。' },
  gouyoku: { partner: 'taida',   percent: 91, note: '妄想だけで満足しがちな脳内デート完結悪魔を、あなたが現実に引っ張り出します。向こうは誘われる前に妄想で3回デート済み。そこへ「今度の土曜あいてる?」の一言。候補者リストの中で、いちばん嬉しそうにうなずくのがこの人です。' },
  taida:   { partner: 'gouyoku', percent: 96, note: '妄想の中では100回デートしたのに現実では一歩も出てないあなたを、全方位お誘い悪魔がさらっと誘ってくれます。向こうは自分から動く人なので、あなたは首を縦に振るだけ。候補者の一人からのスタートでも、脳内の予行演習が本番で活きます。' },
  gouman:  { partner: 'shitto',  percent: 89, note: '自分からは絶対に動かないあなたの前に、感情全開で押してくるヤキモチ即出し悪魔が現れます。こっちが澄ましていても、向こうは「好きかも」を先に言い、ヤキモチまで顔に出してくる。追われたい願望がここまで満たされる相手、他にいません。' },
  rare:    { partner: 'rare',    percent: 99, note: '同じ激レア同士、気分の波が読めない者どうしで、なぜか波長が合う奇跡の組み合わせ。計算も駆け引きもない分、どちらかが本音を言えば一瞬で話がまとまります。出会えたら離さないで。' },
};

const AKUMA_LUCKY_BRIDGE = {
  shitto: '気になった瞬間に動けるあなたには、口から出る前のひと呼吸を助けてくれるアイテムを。直球はそのままに、言葉の角だけ少し丸くなります。',
  gouyoku: '予定を埋めるのが得意なあなたには、候補者を比べる前に「自分が本当にほしいもの」を思い出させてくれるアイテムを。保険をたたむ日が来たとき、迷わず一点集中できます。',
  taida:   '妄想を現実に持ち出す第一歩は、まず自分の部屋を「誰かを呼べる状態」にしておくこと。',
  gouman:  '先手を取るのが苦手なら、まず自分を少しだけ甘やかして、鎧を軽くするところから。',
  rare:    '気分の波とうまく付き合うなら、その日の気分を受け止めてくれる小物をそばに置いておくと楽になります。',
};

const AKUMA_LUCKY_ITEMS = {
  shitto: [
    { emoji: '🕯️', name: 'アロマキャンドル', keyword: 'アロマキャンドル ギフト' },
    { emoji: '⏳', name: '砂時計', keyword: '砂時計 インテリア' },
    { emoji: '🍵', name: 'ハーブティーセット', keyword: 'ハーブティー 詰め合わせ' },
  ],
  gouyoku: [
    { emoji: '🖋️', name: 'ガラスペン', keyword: 'ガラスペン セット' },
    { emoji: '☕', name: 'マグカップ', keyword: 'マグカップ おしゃれ' },
    { emoji: '🌵', name: 'ミニ観葉植物', keyword: '観葉植物 ミニ 卓上' },
  ],
  taida: [
    { emoji: '💡', name: '間接照明', keyword: '間接照明 ルームライト' },
    { emoji: '🌫️', name: 'アロマディフューザー', keyword: 'アロマディフューザー 卓上' },
    { emoji: '🛋️', name: 'クッションカバー', keyword: 'クッションカバー 北欧' },
  ],
  gouman: [
    { emoji: '🛁', name: 'バスソルト', keyword: 'バスソルト ギフト' },
    { emoji: '🧴', name: 'ハンドクリーム', keyword: 'ハンドクリーム ギフト' },
    { emoji: '🧦', name: 'ルームソックス', keyword: 'ルームソックス もこもこ' },
  ],
  rare: [
    { emoji: '📓', name: '3年日記帳', keyword: '日記帳 3年' },
    { emoji: '🌈', name: 'ムードランプ', keyword: 'ムードランプ 調光' },
    { emoji: '🪨', name: 'アロマストーン', keyword: 'アロマストーン セット' },
  ],
};

// ---- ラッキーアイテム(Amazonアソシエイト。script.jsの仕組みを踏襲した独立実装) ----
// JA単独ページ(LANG切り替えなし)なのでUS向けタグ分岐は持たない。
const AFFILIATE_TAG = 'tinywonders-22';

// script.jsのaffiliateUrl()と同仕様: ¥1,000〜3,000の価格帯フィルタ+レビュー評価順ソートを
// URLパラメータで強制する(amazon.co.jpで動作確認済み)。
function affiliateUrl(keyword) {
  let base = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  base += '&rh=p_36%3A100000-300000&s=review-rank';
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

const AKUMA_LUCKY_ICON_MAP = {};

// 診断結果とラッキーアイテムをつなぐ一言(script.jsのLUCKY_BRIDGE相当)。タイプの気質ごとに固定。
function pickAkumaLuckyItem(id) {
  const candidates = AKUMA_LUCKY_ITEMS[id];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ---- スコア計算(純粋関数。Node側でも brute-force 検証できるよう副作用なしにしている) ----
function computeAkumaScores(answers) {
  let oshi = 0, kanjo = 0;
  answers.forEach((a) => {
    if (a.axis === 'oshi') oshi += a.weight;
    else kanjo += a.weight;
  });
  return { oshi, kanjo };
}

function computeAkumaType(oshi, kanjo) {
  if (Math.abs(oshi) + Math.abs(kanjo) <= 1) return 'rare';
  if (oshi >= 0 && kanjo > 0) return 'shitto';
  if (oshi >= 0) return 'gouyoku';
  if (kanjo > 0) return 'taida';
  return 'gouman';
}

// 各軸の絶対値(最大10)を0-100に正規化し、平均を「純度」とする。
// 端に寄っているほど(=はっきりした傾向が出るほど)純度が高くなる。
function computeAkumaPurity(oshi, kanjo) {
  const p = (Math.abs(oshi) / 10) * 50 + (Math.abs(kanjo) / 10) * 50;
  return Math.max(0, Math.min(100, Math.round(p)));
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AKUMA_QUESTIONS, AKUMA_TYPES, AKUMA_COMPAT,
    computeAkumaScores, computeAkumaType, computeAkumaPurity,
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
    let lastResult = null; // { id, oshi, kanjo, purity }

    // GA4イベント送信(ローカル開発時・GA未読込時は何もしない)
    function track(name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    }

    function showScreen(name) {
      Object.values(screens).forEach((s) => s.classList.remove('active'));
      screens[name].classList.add('active');
    }

    function startQuiz() {
      track('quiz_start', { quiz_name: 'koi_tsumi' });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= AKUMA_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = AKUMA_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / AKUMA_QUESTIONS.length) * 100}%`;
      progressText.textContent = `${currentIndex + 1} / ${AKUMA_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">😈</div><div class="bubble ai">${text}</div>`;
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
      const first = chatOptions.querySelector('.option-btn');
      if (first) first.focus({ preventScroll: true });
    }

    function selectOption(q, opt) {
      addBubble(opt.text, 'user');
      answers.push({ axis: q.axis, weight: opt.weight });
      chatOptions.innerHTML = '';
      currentIndex++;
      setTimeout(askNext, 320);
    }

    function showResult() {
      const { oshi, kanjo } = computeAkumaScores(answers);
      const id = computeAkumaType(oshi, kanjo);
      const purity = computeAkumaPurity(oshi, kanjo);
      lastResult = { id, oshi, kanjo, purity };
      track('quiz_complete', { quiz_name: 'koi_tsumi', result_type: id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
    }

    function renderResult(result) {
      const t = AKUMA_TYPES[result.id];
      const compat = AKUMA_COMPAT[result.id];
      const partner = AKUMA_TYPES[compat.partner];

      document.getElementById('nandere-emoji').textContent = t.emoji;
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = `あなたの恋の罪は<span class="grad-text">「${t.sin}」</span>`;
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
        document.getElementById('nandere-purity-label').textContent = `${t.sin}の罪 濃度 ${result.purity}%`;
      }

      document.getElementById('compat-emoji').textContent = partner.emoji;
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      const lucky = pickAkumaLuckyItem(result.id);
      const luckyIcon = AKUMA_LUCKY_ICON_MAP[lucky.emoji]
        ? `<img src="img/lucky-icons/${AKUMA_LUCKY_ICON_MAP[lucky.emoji]}.jpg" alt="" width="42" height="42" loading="lazy">`
        : lucky.emoji;
      document.getElementById('nandere-lucky').innerHTML = `
        <div class="lucky-bridge">${AKUMA_LUCKY_BRIDGE[result.id]}</div>
        <a class="lucky-item" href="${affiliateUrl(lucky.keyword)}" target="_blank" rel="noopener sponsored">
          <span class="lucky-emoji">${luckyIcon}</span>
          <span class="lucky-text"><span class="lucky-label">🍀 今日のラッキーアイテム<span class="lucky-pr-tag">PR</span></span><span class="lucky-name">${lucky.name}を見てみる</span><span class="lucky-price">¥1,000〜3,000で買えるプチギフト</span></span>
          <span class="lucky-arrow">›</span>
        </a>
      `;
      document.querySelector('#nandere-lucky .lucky-item').addEventListener('click', () => {
        track('affiliate_click', { quiz_name: 'koi_tsumi', result_type: result.id, item_name: lucky.name });
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?o=${result.oshi}&k=${result.kanjo}`;
    }

    let copyTimer = null;
    function copyResultUrl() {
      if (!lastResult || !navigator.clipboard) return;
      const btn = document.getElementById('btn-copy-url');
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        track('copy_url', { quiz_name: 'koi_tsumi', result_type: lastResult.id });
        btn.textContent = 'コピーしました!';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { btn.textContent = '結果URLをコピー 🔗'; }, 2000);
      }).catch(() => {
        btn.textContent = 'コピーできませんでした';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { btn.textContent = '結果URLをコピー 🔗'; }, 2000);
      });
    }

    function shareText(result) {
      const t = AKUMA_TYPES[result.id];
      return `私の恋の罪は「${t.sin}」…${t.emoji}${t.name}でした(${t.nickname})\nみんなの悪魔は?\n#恋の罪診断 #恋の罪状発表`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'koi_tsumi', content_type: 'koi_tsumi', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'koi_tsumi', content_type: 'koi_tsumi', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function restartQuiz() {
      lastResult = null;
      // シェアURL経由で入れ替えたボタンの並び・役割を元に戻す
      const restartBtn = document.getElementById('btn-restart');
      const shareBtn = document.getElementById('btn-share');
      shareBtn.className = 'btn-primary';
      restartBtn.className = 'btn-secondary';
      shareBtn.parentNode.prepend(shareBtn);
      restartBtn.parentNode.appendChild(restartBtn);
      document.getElementById('btn-restart').textContent = 'もう一度診断する';
      history.replaceState(null, '', location.pathname);
      startQuiz();
    }

    // ===== 結果カード画像生成(script.jsのcardRoundRect/cardDrawBackground/cardFitTextMultilineを
    // 「3ブロック構成の性格タイプ用」から「単一タイプ+純度スコア+相性」向けに一般化して移植) =====
    const CARD_PAL = {
      bg1: '#f1e6ff', bg2: '#ffe6f0', bg3: '#ece4ff',
      primaryDark: '#8a3fc7', text: '#45334f', sub: '#8f7ba0',
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
        [w * 0.85, h * 0.15, w * 0.30, '#e3cdff'],
        [w * 0.15, h * 0.92, w * 0.28, '#ffd3e4'],
        [w * 0.65, h * 0.88, w * 0.22, '#d9ccff'],
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

    function drawAkumaCard(ctx, W, H, result, opts) {
      const t = AKUMA_TYPES[result.id];
      const compat = AKUMA_COMPAT[result.id];
      const partner = AKUMA_TYPES[compat.partner];
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
      ctx.fillText(`恋の罪診断 RESULT|${t.sin}の罪`, W / 2, y);
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
      const badgeText = t.rare ? '出現率 約5%(激レア)' : `${t.sin}の罪 濃度 ${result.purity}%`;
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
      ctx.fillText('あなたの恋の罪は? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 恋の罪診断', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildAkumaCardCanvas(result, mode) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawAkumaCard(canvas.getContext('2d'), 1080, 1920, result, {
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowGap: 60,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 28, brandOffset: 46,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawAkumaCard(canvas.getContext('2d'), 1200, 630, result, {
          // 下端のCTA・ブランド行が630px内に収まるよう詰めた値(2026-10-10、旧値ではy=642/672で見切れていた)
          circleY: 140, circleR: 90, gapAfterCircle: 48, eyebrowGap: 40,
          nameSize: 52, nameMinSize: 32, nameGap: 58,
          nicknameSize: 26, nicknameGap: 50,
          badgeFont: 22, badgeGap: 52,
          compatFont: 21, compatGap: 34,
          lineHalf: 300, ctaGap: 40, ctaSize: 26, brandSize: 18, brandOffset: 28,
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
        const canvas = buildAkumaCardCanvas(result, 'x');
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = '恋の罪診断の結果カード';
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
      track('save_card', { quiz_name: 'koi_tsumi', mode });
      try {
        const canvas = buildAkumaCardCanvas(lastResult, mode);
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `koi-tsumi-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?o=&k=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const oRaw = params.get('o');
      const kRaw = params.get('k');
      if (!/^-?\d{1,2}$/.test(oRaw || '') || !/^-?\d{1,2}$/.test(kRaw || '')) return;
      const oshi = parseInt(oRaw, 10);
      const kanjo = parseInt(kRaw, 10);
      if (!Number.isFinite(oshi) || !Number.isFinite(kanjo)) return;
      if (Math.abs(oshi) > 10 || Math.abs(kanjo) > 10) return;
      const id = computeAkumaType(oshi, kanjo);
      const purity = computeAkumaPurity(oshi, kanjo);
      lastResult = { id, oshi, kanjo, purity };
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // シェアされたURLから来た人向けに、見出しとボタンを「自分も診断する」導線にする
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされた恋の罪は<span class="grad-text">「${AKUMA_TYPES[id].sin}」</span>`;
      document.getElementById('btn-restart').textContent = '自分の恋の罪も診断する 😈';
      // 他人の結果を「私は〜」とシェアしないよう、自分で診断するボタンを先頭・主ボタンにする
      const restartBtn = document.getElementById('btn-restart');
      const shareBtn = document.getElementById('btn-share');
      restartBtn.className = 'btn-primary';
      shareBtn.className = 'btn-secondary';
      restartBtn.parentNode.prepend(restartBtn);
    })();

    // ===== アクセス解析(メインサイトと同一GA4プロパティ) =====
    const GA_MEASUREMENT_ID = 'G-GH850PJWLP';
    const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
    if (GA_MEASUREMENT_ID && !isLocalDev && !document.getElementById('ga-gtag-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-gtag-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    }
  })();
}
