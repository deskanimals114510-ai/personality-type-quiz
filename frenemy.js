'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== フレネミー度診断(スピンオフ、全10問、2026-10-10) =====
// 何すぎて滅?診断(metsu.js)と同じ仕組み(2軸×5問・5タイプ・結果カード画像)を流用した独立ファイル。
// DOMのid/classも nandere.html と同じ名前を使い、style.css の何デレ診断用スタイルをそのまま当てている。
// 設問・結果文はFable執筆。
// 軸: honne=本音の出し方(+すぐ顔や口に出る/-建前で飲み込む)、kisou=比べ方(+張り合う/-一歩引いて見守る)。
// 自分の中の小さな毒を笑える自虐ネタにする診断。スコアは「フレネミー度」10〜50%(低いほど無毒、激レアは0%)。

// ---- 設問データ: 2軸(honne=本音の出し方, kisou=比べ方)×各5問、4択(weight -2/-1/+1/+2) ----
const FRENEMY_QUESTIONS = [
  { axis: 'honne', text: '友達が「この服どう?」と聞いてきた。正直ちょっと微妙…。あなたは?', opts: [
    { text: '「んー、こっちのほうが似合うと思う」と正直に言う', weight: 1 },
    { text: '「いいじゃん!」と言っておく。本人が気に入ってるのが一番', weight: -2 },
    { text: '顔に出る。「えっ…」と言ってから慌ててフォローする', weight: 2 },
    { text: '「どっちもかわいいよ」とふわっと流す', weight: -1 },
  ]},
  { axis: 'kisou', text: '「全然勉強してないわ〜」と言ってた友達が90点だった。あなたは?', opts: [
    { text: '「すごいね!コツ教えて」と素直に教えてもらう', weight: -2 },
    { text: '「え、うそでしょ。次は本気で勝ちにいく」と燃える', weight: 2 },
    { text: '人は人、自分は自分。いつものペースで勉強を続ける', weight: -1 },
    { text: '悔しいから、次のテストはこっそり対策を始める', weight: 1 },
  ]},
  { axis: 'honne', text: 'グループLINEで「それはちょっと違うんじゃ?」と思う話で盛り上がっている。あなたは?', opts: [
    { text: 'スタンプだけ押して様子を見る', weight: -1 },
    { text: '「個人的にはこう思うかも」とやわらかく一言', weight: 1 },
    { text: '「そうなんだ〜」と合わせておく', weight: -2 },
    { text: '「え、それは違う気がする」とそのまま打ち込む', weight: 2 },
  ]},
  { axis: 'kisou', text: 'プリを撮ったら、友達のほうが明らかに盛れてた。あなたは?', opts: [
    { text: '「ちょっと悔しい、次はポーズ変えてみる」と思う', weight: 1 },
    { text: '「盛れてるね!」と心から思う。自分は自分', weight: -2 },
    { text: '「次は絶対こっちが盛れる角度を研究する」とメラメラ', weight: 2 },
    { text: '「盛れてる〜!」と一緒に笑って、そのまま次の話へ', weight: -1 },
  ]},
  { axis: 'honne', text: '友達の恋バナ。相手の人、正直あんまりいいと思えない…。あなたは?', opts: [
    { text: '「幸せならいいと思う」と当たり障りなく返す', weight: -1 },
    { text: '「へー、いいじゃん!」と言っておく', weight: -2 },
    { text: '口では「いいね」と言うけど、「ふーん」の間が長くなる', weight: 1 },
    { text: '「正直、私はあんまり…」とつい言ってしまう', weight: 2 },
  ]},
  { axis: 'kisou', text: '友達の「恋人できました」報告がストーリーズに流れてきた。あなたは?', opts: [
    { text: '「おめでとう!」と即リプ。自分は自分のペースでいい', weight: -2 },
    { text: '「え、先に行かれた…」と本気で発奮する', weight: 2 },
    { text: 'いいねだけ押して、自分の推しの話に戻る', weight: -1 },
    { text: '「いいな〜、私もがんばろ」とちょっと燃える', weight: 1 },
  ]},
  { axis: 'honne', text: '友達が「ここのカフェ最高じゃない?」と連れてきてくれた。正直あまり好みじゃない。あなたは?', opts: [
    { text: '「いいね!」と写真を撮って合わせる', weight: -2 },
    { text: '顔に出てしまい、「あれ、微妙だった?」と気づかれる', weight: 2 },
    { text: '「でもこの雰囲気は好きだよ」とフォロー寄りで返す', weight: -1 },
    { text: '「んー、私はちょっと違うかも」と素直に言う', weight: 1 },
  ]},
  { axis: 'kisou', text: '推しが友達と被った!あなたは?', opts: [
    { text: '「好きなところはどこ?」と探りつつ、推し知識では負けたくない', weight: 1 },
    { text: '「一緒に推せる仲間ができた!」と純粋にうれしい', weight: -2 },
    { text: '「いや私のほうが先に好きだったから」と(半分冗談で)張り合う', weight: 2 },
    { text: '「好きなところが違うから被ってないよ」と自分のペース', weight: -1 },
  ]},
  { axis: 'honne', text: '友達が「これ絶対ハマるから!」と推してきたものが、正直ピンとこない。あなたは?', opts: [
    { text: '「ここは好きだけど、ここは微妙」と細かく感想を言う', weight: 1 },
    { text: '「へー、おもしろいね」と言っておく', weight: -2 },
    { text: '「ごめん、ちょっとわからなかった」と正直に言う', weight: 2 },
    { text: '「わかる部分もあるかも」とやわらかく返す', weight: -1 },
  ]},
  { axis: 'kisou', text: '仲のいい友達が、受験やオーディションに合格した。あなたは?', opts: [
    { text: '祝いつつ「私も気合い入れないと」と密かに燃える', weight: 1 },
    { text: '「おめでとう!…次は私の番だからね」と堂々と宣言する', weight: 2 },
    { text: '「おめでとう!」と喜んだあと、自分は自分のペースでいいと思い直す', weight: -1 },
    { text: '心から「おめでとう」。自分の道は自分の道、焦らない', weight: -2 },
  ]},
];

// ---- タイプ定義(kei=タイプ見出し。結果見出しは「あなたは「{kei}」」) ----
const FRENEMY_TYPES = {
  rival: {
    emoji: '🔥', kei: '正面ライバル型', name: '宣戦布告おめでとう屋',
    nickname: 'おめでとう、で、次は勝つからね',
    tagline: '祝う。けど負けない。',
    color: '#d6453a',
    description: '友達が「合格した!」と報告してきた瞬間、あなたの口から出るのは「おめでとう!」と、ほぼ同時に「次は私の番だから」。グループLINEで誰かが高得点を見せたら、スタンプより先に「次のテスト勝負ね」と打ち込んでいるはずです。隠す気がまったくないので、友達も「出た、フレネミー」と笑って受け止めてくれる。思ったことがすぐ口に出るうえに、人の活躍を見るとメラメラしてしまう体質なんですよね。でも裏返せば、友達の成功をちゃんと見ていて、陰でこそこそしない正直者ということ。あなたの「負けない」は、相手を本気で認めている証拠です。宣戦布告はそのままで、たまに「教えて」と言えたら最強の友達になれますよ。',
  },
  karakuchi: {
    emoji: '🌶️', kei: '辛口ご意見番型', name: '正論ズバッと係',
    nickname: '悪気ゼロで正論を投げる友達思い',
    tagline: '正直すぎるのは愛です',
    color: '#b85c12',
    description: '「その人、やめたほうがいいと思う」。友達の恋バナで、場が一瞬止まるこの一言を言った経験があるなら、あなたはこのタイプです。悪気はゼロ、むしろ本気で心配しているだけなのに、言い方が直球すぎて「それ言う?」と笑われがち。カフェ選びでも服選びでも、「いいじゃん」で済ませられず、つい本音の感想が出てしまいます。ただ、友達と自分を比べる気持ちはほとんどなくて、張り合うより一歩引いて見ているから、感想が妙に的確なんです。裏返すと、場の空気より友達そのものを優先できる人。あなたの辛口は、本当に大事な場面でいちばん頼られます。言う前に「私はこう思うけど」とクッションを一言置くだけで、辛口は信頼されるご意見番の優しさになりますよ。',
  },
  nikoniko: {
    emoji: '🎭', kei: '笑顔ライバル型', name: '笑顔の裏メラメラさん',
    nickname: '笑顔ですごーい、心の中はメラメラ',
    tagline: '笑顔の裏で燃えてる',
    color: '#b4387f',
    description: 'ストーリーズに友達の恋人報告が流れてきた。あなたは即「すごーい!おめでとう」とリプを送る。送ったあと、スマホを伏せて「…私もがんばろ」と小さく燃える。これが笑顔ライバル型の日常です。プリで友達のほうが盛れていても「かわいい!」と言いながら、帰り道で盛れる角度の研究を始めてしまう。本音を表に出すのは苦手で、場を壊さないように笑顔で合わせるのが癖。でも心の中には、ちゃんと競争心の火がついているんですよね。周りからは「天然」に見えつつ、実はいちばん成長が早いタイプです。裏返すと、友達の活躍を自分のエンジンに変えられる人。たまに「悔しい!」と口に出してみると、友達はむしろ喜んで一緒に燃えてくれますよ。',
  },
  zenkoutei: {
    emoji: '🫧', kei: '全肯定スルー型', name: 'いいじゃん製造機',
    nickname: 'いいじゃんで全部流す、本音は非公開',
    tagline: '否定しない、本音も出さない',
    color: '#1f7f93',
    description: '「いいじゃん」「わかる」「それもあり」。あなたの返信履歴を見返すと、この3つで半分くらい埋まっているかもしれません。友達が微妙な服を選んでも、ピンとこない曲を推してきても、全部「いいね」で受け止める。張り合う気持ちもなく、友達の合格報告には心から「おめでとう」と言えます。ただそのぶん、友達から「で、本音はどう思ってるの?」と聞かれることがあるはず。優しいのに本音が見えないのが、このタイプの唯一の毒です。本音は飲み込みがちで、人と比べることにも興味がない、おだやかな平和主義者。裏返すと、誰の味方にもなれる最強の安心感を持った人なんです。たまに「私はこっちが好き」と、小さな本音を添えてみてください。その一言で、全肯定が本物の信頼になります。',
  },
  rare: {
    emoji: '😇', kei: '天使フレンド型', name: '悔しがって祝える人',
    nickname: '悔しさも祝福も、どっちも本物の人',
    tagline: '悔しさは隠さず、毒にはしない',
    color: '#6b4fd1',
    rare: true,
    description: '友達の推しがバズった時、「いや私の方が先に見つけてたんだけど」と一言だけ言って、そのあと普通に一緒に喜べる。友達の合格報告には「くっそ〜、先越された!」と顔に出しつつ、気づけば祝いのご飯を予約している。試験や査定で負けても、その晩はちょっとだけ悔しがって、翌朝には「で、どう勉強したの?」と素直に聞けるタイプです。本音を飲み込みすぎず、出しすぎもしない。悔しさをちゃんと味わってから祝うから、祝福に嘘がない。だから、小さな毒が出かけてもフレネミー度0%判定です。本人は「普通にしてるだけ」と思っていますが、本音を言われても嫌な気がしない人って、実はかなり貴重。周りが安心して自慢話をできるのは、あなたのその塩梅のおかげです。',
  },
};

// ---- 一番いい友達になれる相手(固定) ----
const FRENEMY_COMPAT = {
  rival:     { partner: 'nikoniko',  percent: 93, note: '笑顔ライバル型と組むと最強。あなたが堂々と「次は勝つ」と言うことで、相手の隠れた闘志も表に出てきて、ふたりで一緒に成長できる関係になります。' },
  karakuchi: { partner: 'zenkoutei', percent: 91, note: '全肯定スルー型があなたの直球をふんわり受け止めてくれるので、言いすぎを気にしなくて済みます。逆にあなたの辛口が、相手の隠れた本音を引き出すきっかけに。' },
  nikoniko:  { partner: 'rival',     percent: 93, note: '正面ライバル型は、あなたが笑顔の裏に隠した「悔しい」を先に口に出してくれる人。張り合いが隠し事じゃなくなって、堂々と一緒に燃えられる相棒です。' },
  zenkoutei: { partner: 'karakuchi', percent: 91, note: '辛口ご意見番型は、あなたの「いいじゃん」の奥にある本音を「で、ほんとは?」と聞いてくれる人。無理に出さなくても本音が伝わる、楽な関係になります。' },
  rare:      { partner: 'rival',     percent: 88, note: '正面ライバル型のまっすぐな闘志を、あなたの天使っぷりがやさしく中和。相手は安心して燃えられるし、あなたは少しだけ刺激をもらえる、ちょうどいい組み合わせです。' },
};

const FRENEMY_LUCKY_BRIDGE = {
  rival:     '燃えるのはいいけど、燃えっぱなしは疲れます。友達と一緒に使えて、ちょっと気持ちをクールダウンできるアイテムを選びました。',
  karakuchi: '直球の感想のあとに、ひとつやさしさを添えるだけで印象が変わります。言葉のクッションになるようなアイテムを集めました。',
  nikoniko:  '笑顔の裏でがんばるあなたは、自分へのごほうびを忘れがち。こっそり自分を整えられるアイテムをおすすめします。',
  zenkoutei: '誰にでも優しいあなたには、自分の「好き」を小さく表せるものを。友達とシェアしながら、本音のきっかけになるアイテムです。',
  rare:      '天使のままでいるためには、自分のご機嫌も大事。ゆるっと自分を整えられるアイテムを選びました。',
};

const FRENEMY_LUCKY_ITEMS = {
  rival: [
    { emoji: '🏅', name: 'ペアキーホルダー', keyword: 'ペア キーホルダー 友達' },
    { emoji: '⏱️', name: '勉強タイマー', keyword: '学習タイマー 勉強用' },
    { emoji: '🍫', name: 'ごほうびチョコ', keyword: 'チョコレート ギフト 個包装 プチギフト' },
  ],
  karakuchi: [
    { emoji: '☕', name: 'ペアマグカップ', keyword: 'ペアマグカップ おしゃれ' },
    { emoji: '💌', name: 'メッセージカード', keyword: 'メッセージカード おしゃれ セット' },
    { emoji: '🫖', name: 'ハーブティー', keyword: 'ハーブティー ティーバッグ アソート' },
  ],
  nikoniko: [
    { emoji: '🪞', name: 'ミラー付きスマホリング', keyword: 'スマホリング ミラー付き' },
    { emoji: '💄', name: 'リップバーム', keyword: 'リップバーム 保湿' },
    { emoji: '🧴', name: 'ハンドクリームセット', keyword: 'ハンドクリーム ギフト セット' },
  ],
  zenkoutei: [
    { emoji: '🧦', name: 'ふわふわルームソックス', keyword: 'ルームソックス ふわふわ' },
    { emoji: '🕯️', name: 'アロマキャンドル', keyword: 'アロマキャンドル おしゃれ' },
    { emoji: '📔', name: 'おしゃれノート', keyword: 'ノート 日記 おしゃれ' },
  ],
  rare: [
    { emoji: '🌿', name: '卓上フェイクグリーン', keyword: 'フェイクグリーン 卓上 小さめ' },
    { emoji: '🫧', name: '入浴剤セット', keyword: '入浴剤 ギフト セット' },
    { emoji: '🎀', name: 'シュシュセット', keyword: 'シュシュ セット おしゃれ' },
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

// ラッキーアイテムは全て絵文字で表示する(写真アイコン対応表は使っていない)
const FRENEMY_LUCKY_ICON_MAP = {};

function pickFrenemyLuckyItem(id) {
  const candidates = FRENEMY_LUCKY_ITEMS[id];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ---- スコア計算(純粋関数。Node側でも brute-force 検証できるよう副作用なしにしている) ----
function computeFrenemyScores(answers) {
  let honne = 0, kisou = 0;
  answers.forEach((a) => {
    if (a.axis === 'honne') honne += a.weight;
    else kisou += a.weight;
  });
  return { honne, kisou };
}

function computeFrenemyType(honne, kisou) {
  if (Math.abs(honne) + Math.abs(kisou) <= 1) return 'rare';
  if (honne >= 0 && kisou > 0) return 'rival';
  if (honne > 0) return 'karakuchi';
  if (kisou > 0) return 'nikoniko';
  // 本音軸がちょうど0で張り合わない人は、直球の「辛口」ではなく「全肯定スルー」側に入れる
  return 'zenkoutei';
}

// フレネミー度は「毒の向き」で決める: 本音は出しすぎ・隠しすぎのどちらも毒として数え(絶対値)、
// 比べ方は張り合う側(+)だけを数える。→ 全肯定スルー型は最大30%、正面ライバル型は最大50%。
function computeFrenemyPurity(honne, kisou) {
  const p = (Math.abs(honne) / 10) * 50 + (Math.max(0, kisou) / 10) * 50;
  return 10 + Math.round(Math.max(0, Math.min(100, p)) * 0.4);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FRENEMY_QUESTIONS, FRENEMY_TYPES, FRENEMY_COMPAT,
    computeFrenemyScores, computeFrenemyType, computeFrenemyPurity,
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
    let lastResult = null; // { id, honne, kisou, purity }
    // シェアされた結果URLから開いた時はtrue(おすすめ欄を「友達に贈るなら」に切り替える)
    let sharedView = false;

    // GA4イベント送信(ローカル開発時・GA未読込時は何もしない)
    function track(name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    }

    function showScreen(name) {
      Object.values(screens).forEach((s) => s.classList.remove('active'));
      screens[name].classList.add('active');
    }

    function startQuiz() {
      track('quiz_start', { quiz_name: 'frenemy' });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= FRENEMY_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = FRENEMY_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / FRENEMY_QUESTIONS.length) * 100}%`;
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(FRENEMY_QUESTIONS.length));
      progressText.textContent = `${currentIndex + 1} / ${FRENEMY_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">🤝</div><div class="bubble ai">${text}</div>`;
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
      const { honne, kisou } = computeFrenemyScores(answers);
      const id = computeFrenemyType(honne, kisou);
      const purity = computeFrenemyPurity(honne, kisou);
      lastResult = { id, honne, kisou, purity };
      track('quiz_complete', { quiz_name: 'frenemy', result_type: id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      document.querySelector('#screen-result .result-title').focus();
    }

    function renderResult(result) {
      const t = FRENEMY_TYPES[result.id];
      const compat = FRENEMY_COMPAT[result.id];
      const partner = FRENEMY_TYPES[compat.partner];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = `あなたは<wbr><span style="white-space:nowrap"><span class="grad-text">「${t.kei}」</span></span>`;
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
        document.getElementById('nandere-purity-fill').style.width = `${result.purity * 2}%`; // 最大50%で満タン
        document.getElementById('nandere-purity-label').textContent = `フレネミー度 ${result.purity}%(低いほど無毒)`;
      }

      setTypeIllust(document.getElementById('compat-emoji'), compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = partner.kei;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      const lucky = pickFrenemyLuckyItem(result.id);
      renderGiftBox(document.getElementById('nandere-lucky'), {
        mode: sharedView ? 'gift' : 'self', typeName: t.name, item: lucky,
        iconMap: FRENEMY_LUCKY_ICON_MAP, bridge: FRENEMY_LUCKY_BRIDGE[result.id], href: affiliateUrl(lucky.keyword),
        onClick: (p) => track('affiliate_click', { quiz_name: 'frenemy', result_type: result.id, ...p }),
        onView: () => track('section_view', { quiz_name: 'frenemy', result_type: result.id, placement: 'result_card', mode: sharedView ? 'gift' : 'self' }),
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?n=${result.honne}&k=${result.kisou}`;
    }

    let copyTimer = null;
    function copyResultUrl() {
      if (!lastResult || !navigator.clipboard) return;
      const btn = document.getElementById('btn-copy-url');
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        track('copy_url', { quiz_name: 'frenemy', result_type: lastResult.id });
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
      const t = FRENEMY_TYPES[result.id];
      const score = t.rare ? '0%' : `${result.purity}%`;
      return `私のフレネミー度は${score}!${t.emoji}「${t.kei}」(${t.name})でした\nあなたは何%?\n#フレネミー度診断 #それフレネミーじゃん`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'frenemy', content_type: 'frenemy', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'frenemy', content_type: 'frenemy', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function restartQuiz() {
      lastResult = null;
      sharedView = false;
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
      bg1: '#eefaf6', bg2: '#f3efff', bg3: '#fff4ea',
      primaryDark: '#1f8a7a', text: '#3f4a4f', sub: '#8a97a0',
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
        [w * 0.85, h * 0.15, w * 0.30, '#cdeee5'],
        [w * 0.15, h * 0.92, w * 0.28, '#e2dbff'],
        [w * 0.65, h * 0.88, w * 0.22, '#ffe2cc'],
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

    // タイプ別イラスト(Midjourney生成、img/types/)。読み込めない時は絵文字のまま
    function typeImgSrc(id) {
      return `img/types/frenemy-${id}.jpg`;
    }

    const typeImgCache = {};
    function loadTypeImage(id) {
      // file://で開くとcanvasが汚染されて書き出せないので、その時は絵文字で描く
      if (location.protocol === 'file:') return Promise.resolve(null);
      if (!typeImgCache[id]) {
        typeImgCache[id] = new Promise((resolve) => {
          const img = new Image();
          const timer = setTimeout(() => resolve(null), 3000);
          img.onload = () => { clearTimeout(timer); resolve(img); };
          img.onerror = () => {
            clearTimeout(timer);
            delete typeImgCache[id];
            resolve(null);
          };
          img.src = typeImgSrc(id);
        });
      }
      return typeImgCache[id];
    }

    function setTypeIllust(el, id, t, cls) {
      // 読み込み中は空の丸のまま待ち、読めなかった時だけ絵文字を出す
      el.textContent = '';
      el.dataset.illust = id;
      loadTypeImage(id).then((img) => {
        // 読み込み中に別の結果へ切り替わっていたら差し替えない
        if (el.dataset.illust !== id) return;
        if (!img) { el.textContent = t.emoji; return; }
        const c = img.cloneNode();
        c.className = cls;
        c.alt = '';
        el.replaceChildren(c);
      });
    }

    function drawFrenemyCard(ctx, W, H, result, opts) {
      const t = FRENEMY_TYPES[result.id];
      const compat = FRENEMY_COMPAT[result.id];
      const partner = FRENEMY_TYPES[compat.partner];
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
      ctx.textAlign = 'center';
      if (opts.illust) {
        const r = circleR - 6;
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, circleY, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(opts.illust, W / 2 - r, circleY - r, r * 2, r * 2);
        ctx.restore();
      } else {
        ctx.font = `${circleR * 1.15}px 'Segoe UI Emoji', sans-serif`;
        ctx.fillText(t.emoji, W / 2, circleY + circleR * 0.06);
      }

      let y = circleY + circleR + opts.gapAfterCircle;

      ctx.font = "700 26px 'Zen Maru Gothic', sans-serif";
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText('フレネミー度診断 RESULT', W / 2, y);
      y += opts.eyebrowGap;

      const fit = cardFitTextMultiline(ctx, t.kei, W - 140, '900', "'Zen Maru Gothic', sans-serif", opts.nameSize, opts.nameMinSize, 1);
      ctx.font = `900 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(fit.lines[0], W / 2, y);
      y += opts.nameGap;

      ctx.font = `700 ${opts.nicknameSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.text;
      const nickFit = cardFitTextMultiline(ctx, `${t.emoji} ${t.name}|${t.nickname}`, W - 160, '700', "'Zen Maru Gothic', sans-serif", opts.nicknameSize, opts.nicknameSize - 8, 1);
      ctx.font = `700 ${nickFit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillText(nickFit.lines[0], W / 2, y);
      y += opts.nicknameGap;

      // フレネミー度 or レアバッジ
      const badgeText = t.rare ? 'フレネミー度 0%(出現率 約5%)' : `フレネミー度 ${result.purity}%`;
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
      ctx.fillText(`仲良し相性◎ ${partner.emoji} ${partner.kei}(${compat.percent}%)`, W / 2, y);
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
      ctx.fillText('あなたのフレネミー度は? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | フレネミー度診断', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildFrenemyCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawFrenemyCard(canvas.getContext('2d'), 1080, 1920, result, {
          illust,
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowGap: 60,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 28, brandOffset: 46,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawFrenemyCard(canvas.getContext('2d'), 1200, 630, result, {
          illust,
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
      if (!preview) return; // 前回の生成失敗で要素ごと外した後は描かない
      preview.innerHTML = '';
      try {
        const illust = loadTypeImage(result.id);
        if (document.fonts && document.fonts.ready) {
          try { await document.fonts.ready; } catch (e) { /* フォント待ち失敗時は既定フォントで続行 */ }
        }
        const canvas = buildFrenemyCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = 'フレネミー度診断の結果カード';
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
      track('save_card', { quiz_name: 'frenemy', card_format: mode });
      try {
        const canvas = buildFrenemyCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('toBlobがnullを返しました')); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `frenemy-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?n=&k=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const nRaw = params.get('n');
      const kRaw = params.get('k');
      if (!/^-?\d{1,2}$/.test(nRaw || '') || !/^-?\d{1,2}$/.test(kRaw || '')) return;
      const honne = parseInt(nRaw, 10);
      const kisou = parseInt(kRaw, 10);
      if (!Number.isFinite(honne) || !Number.isFinite(kisou)) return;
      if (Math.abs(honne) > 10 || Math.abs(kisou) > 10) return;
      const id = computeFrenemyType(honne, kisou);
      const purity = computeFrenemyPurity(honne, kisou);
      lastResult = { id, honne, kisou, purity };
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // シェアされたURLから来た人向けに、見出しとボタンを「自分も診断する」導線にする
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされたのは<wbr><span class="grad-text" style="white-space:nowrap">「${FRENEMY_TYPES[id].kei}」</span>`;
      document.getElementById('btn-restart').textContent = '自分のフレネミー度も診断する 🤝';
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
