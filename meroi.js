'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== メロい度診断(スピンオフ、全10問、2026-10-10) =====
// 恋の罪診断(koi-tsumi.js)と同じ仕組み(2軸×5問・5タイプ・結果カード画像)を流用した独立ファイル。
// DOMのid/classも nandere.html と同じ名前を使い、style.css の何デレ診断用スタイルをそのまま当てている。
// 設問・結果文はFable執筆。
// 軸: kyori=距離感(+自分から距離を縮める/-適度な距離)、hyogen=表現(+全力で表に出す/-さりげない)。
// 結果は全員「褒め」になる設計のため、スコアは「メロい度」80〜100%で表示する(激レアは「測定不能」)。

// ---- 設問データ: 2軸(kyori=距離感, hyogen=表現)×各5問、4択(weight -2/-1/+1/+2) ----
const MELO_QUESTIONS = [
  { axis: 'kyori', text: '初対面の人と同じグループになった。最初の5分、あなたは?', opts: [
    { text: '自分から軽く話しかけて、様子を見ながら距離を詰める', weight: 1 },
    { text: 'まずは黙って観察。どんな人かわかってから話すほうが楽しい', weight: -2 },
    { text: 'とりあえず名前を聞いて、推しとか好きなものを探りにいく', weight: 2 },
    { text: '話しかけられたらちゃんと返す。無理に詰めなくても大丈夫', weight: -1 },
  ]},
  { axis: 'hyogen', text: '推しの新しい写真が出た。あなたのリアクションは?', opts: [
    { text: '無言で保存。顔には出さないけど、壁紙はもう替えてる', weight: -2 },
    { text: '「待って、これはヤバい」と一言添えて即シェア', weight: 1 },
    { text: '心の中で噛みしめて、あとで一人でじっくり見る', weight: -1 },
    { text: '叫ぶ。その場で友達に連投して、語彙が「無理」だけになる', weight: 2 },
  ]},
  { axis: 'kyori', text: '仲良くなりたい人がいる。LINEのやりとりは?', opts: [
    { text: '用事がなくても「今日これ見た?」って気軽に送る', weight: 2 },
    { text: '相手から来たら丁寧に返す。頻度はほどほどが心地いい', weight: -1 },
    { text: 'あまり送らない。会ったときに話せばいいと思ってる', weight: -2 },
    { text: 'きっかけを見つけたら自分から送る。返事が来たら続ける', weight: 1 },
  ]},
  { axis: 'hyogen', text: '友達が髪型を変えてきた。気づいた瞬間どうする?', opts: [
    { text: '気づいてるけど、話の流れでさらっと触れる', weight: -1 },
    { text: '「えっ!?似合う!誰にやってもらったの!?」と声が出る', weight: 2 },
    { text: '言わない。でもその日、ちょっと長めに目で追ってる', weight: -2 },
    { text: '「髪変えた?いいじゃん」とすぐ口に出す', weight: 1 },
  ]},
  { axis: 'kyori', text: '休み時間や休憩中、あなたの定位置は?', opts: [
    { text: 'ちょっと離れた場所で一人時間。それが充電', weight: -2 },
    { text: 'みんなの輪の真ん中。誰かの席にふらっと行って話してる', weight: 2 },
    { text: '仲のいい数人のそば。気が向けば他の輪にも混ざる', weight: 1 },
    { text: '自分の席でゆるくスマホ。声をかけられたら乗る', weight: -1 },
  ]},
  { axis: 'hyogen', text: 'デートや遊びの約束が決まった。前日の夜は?', opts: [
    { text: 'ストーリーズか友達に「明日楽しみ」とこぼす', weight: 1 },
    { text: '楽しみだけど、特に言わない。当日ちょっとだけ早く着く', weight: -1 },
    { text: '「明日楽しみすぎて寝れない」と本人に送る', weight: 2 },
    { text: '普通に寝る。でも服はこっそり3回着替えて決めてる', weight: -2 },
  ]},
  { axis: 'kyori', text: '新しいバイト先・教室・職場。1週間後のあなたは?', opts: [
    { text: 'まだ様子見。でも、やることはちゃんとやる人だと思われてる', weight: -1 },
    { text: '話しやすい人が何人かできて、挨拶が増えてきた', weight: 1 },
    { text: '静かにしてるのに、なぜか「気になる人」として認識されてる', weight: -2 },
    { text: 'もう全員の名前を覚えて、あだ名で呼び合ってる', weight: 2 },
  ]},
  { axis: 'hyogen', text: '好きな人やお気に入りの友達に会えた日。その日の自分を表すなら?', opts: [
    { text: 'テンションが顔に出すぎて、周りに「わかりやすっ」と言われる', weight: 2 },
    { text: '表情は変わらない。帰ってから一人でニヤける', weight: -2 },
    { text: '機嫌がいいのがなんとなく伝わる。歌とか口ずさんでる', weight: 1 },
    { text: 'いつも通りに見せてるつもり。でも返信は早くなってる', weight: -1 },
  ]},
  { axis: 'kyori', text: '相手が落ち込んでいるみたい。あなたのアプローチは?', opts: [
    { text: '何も言わず、ただ近くにいる。向こうが話すまで待てる', weight: -2 },
    { text: 'そっとしておく。でも「いつでも聞くよ」とだけ伝える', weight: -1 },
    { text: '隣に座って「どうした?」と即聞きにいく', weight: 2 },
    { text: '「なんかあった?話せるときでいいよ」と声をかける', weight: 1 },
  ]},
  { axis: 'hyogen', text: '「ありがとう」を伝えたい。あなたの伝え方は?', opts: [
    { text: '「マジで助かった、ありがとう!」と顔を見て言う', weight: 1 },
    { text: '長文LINEか手紙。感謝が多すぎてまとまらない', weight: 2 },
    { text: 'さらっと「ありがと」と言って、あとで何かお返しする', weight: -1 },
    { text: '言葉より行動。気づいたら相手の好きな物が置いてある', weight: -2 },
  ]},
];

// ---- タイプ定義(kei=メロの系統。結果見出しは「あなたは「{kei}」のメロい人」) ----
const MELO_TYPES = {
  wanko: {
    emoji: '🐶', kei: 'わんこ系', name: '全力わんこメロ',
    nickname: '尻尾ぶんぶんが止まらない人たらし',
    tagline: 'その全力、反則級にメロい',
    color: '#d9481c',
    description: 'LINEの返信、早すぎて相手が追いつかないでしょ。既読と同時に「えっ待って、それ最高じゃん!」が飛んでいく。友達のストーリーズには必ず反応するし、推しのライブ後は語彙が「やばい」しか残らない。教室や職場でも、誰かが来た瞬間にパッと顔が上がる。そのまっすぐさが、周りには反則級に効いてます。駆け引きゼロで「会えてうれしい」を全身で出されたら、どんなにクールぶってる人でも照れるしかない。本人は「重いかな」と心配しがちだけど、あなたの全力は圧じゃなくて「安心して好きでいていい」という許可証みたいなもの。だからみんな、つい尻尾を振り返しちゃうんです。今日もその勢いのまま、好きを好きって言っちゃおう。',
  },
  anshin: {
    emoji: '🐻', kei: 'ゆるくま系', name: 'ほっこり安心メロ',
    nickname: 'そばにいると帰りたくなくなる人',
    tagline: '何もしてないのに、落ち着く',
    color: '#8a5a1e',
    description: '「なんか今日疲れたー」って言うと、何も聞かずに「おつかれ」とジュースを置いてくれる。その一言で、その日が全部チャラになる。自分から送ってくるLINEが、なぜか妙に安心する文面。デートでも友達との帰り道でも、沈黙が気まずくならないのはあなたの隣だけ、と言われたこと、ありません?周りがメロメロになる理由は、派手な一撃じゃなくて「そばにいる時間の居心地」です。頑張って盛り上げなくても、呼吸が合う。だから気づいたら帰りたくなくなってる。本人は「自分は地味」と思いがちですが、それは逆で、落ち着きって一番真似できないメロさです。たまには「今日も一緒で楽しかった」と口に出してみて。安心に言葉が乗ると、効き目が倍になります。',
  },
  gap: {
    emoji: '🐱', kei: 'ツンねこ系', name: 'ギャップ全開メロ',
    nickname: 'クールの仮面が3秒で剥がれる人',
    tagline: '普段との差で、心臓もたない',
    color: '#6a3fa0',
    description: 'ふだんは返信もそっけなくて、スタンプ1個で会話が終わる。なのに推しの話題になった瞬間、早口で3分しゃべり続ける。教室でも職場でも「あの人、笑うとこんな顔するんだ」と誰かが心の中でひっくり返ってる、たぶん週1で。デートで急に「今日めっちゃ楽しい」と素で言われた側は、しばらく回復できません。周りがメロメロになるのは、クールな土台があるからこそ、たまに開く全開モードの破壊力が倍になるため。落差そのものが魅力なんです。本人は「冷たいと思われてる」と気にしがちですが、その無防備な瞬間を見た人は、もう誰にも言わずに独り占めしたくなってます。スイッチが入った自分を隠さなくて大丈夫。そこが一番ずるいんです。',
  },
  mystery: {
    emoji: '🦊', kei: 'きつね系', name: '読めない余韻メロ',
    nickname: '去り際が一番メロいと噂されてる人',
    tagline: '読めないから、目が離せない',
    color: '#1f5f8b',
    description: '「じゃあね」の言い方が、なぜか記憶に残る。グループLINEでは発言少なめなのに、たまに置いていく一言が妙に刺さって、既読したみんなが数秒止まる。ストーリーズは滅多に上げないぶん、上がった日は全員見にいく。デートでも友達との帰り道でも、別れ際にひとつだけ「今日の話、面白かった」と言って去る。相手はその夜ずっと考えてます。周りがメロメロになっている理由は、あなたが全部を見せないから。想像の余地が残ると、人はそこを勝手に埋めて、勝手に好きになる。本人は「盛り上げ役じゃないし」と遠慮しがちだけど、言葉を選ぶ静けさこそ、真似しようとしてできるものじゃありません。たまにでいいので、その刺さる一言を少しだけ多めに置いてみて。',
  },
  rare: {
    emoji: '🦦', kei: 'カワウソ系', name: '無自覚オールメロ',
    nickname: '本人だけ気づいてない全方位たらし',
    tagline: 'どこを切ってもメロい、激レア',
    color: '#b5175a',
    rare: true,
    description: '診断上、どの系統にも寄らなかった人。かなり珍しいです。LINEでは全力で喜んだかと思えば、次の日は一言で場を落ち着かせ、教室や職場では距離の詰め方が相手に合わせて変わる。本人は「普通にしてるだけ」なのに、周りからは「あの人のメロさ、説明できない」と言われている可能性が高い。これはブレてるんじゃなくて、相手が一番ほしいメロさを無意識に出せているということ。わんこ系の全力も、きつね系の余韻も、気づいたら全部使ってます。ただしご本人、ほぼ自覚なし。だから「なんで自分なの?」と首をかしげるし、褒められても信じない。今日からは少しだけ信じてみてください。無自覚なのが一番メロいという事実、周りはとっくに知っています。',
  },
};

// ---- いちばんメロメロにしやすい相手(固定) ----
const MELO_COMPAT = {
  wanko:   { partner: 'anshin',  percent: 97, note: '全力で尻尾を振るあなたを、ゆるくま系は「はいはい」と受け止めつつ、実は一番照れてます。あなたの勢いが相手の落ち着きを引き出し、相手の安心があなたを守る、最強の凸凹コンビ。' },
  anshin:  { partner: 'gap',     percent: 93, note: '普段クールなツンねこ系は、安心できる場所でしか全開になりません。あなたの隣でだけ緩む顔を、周りは見たことがない。「この人の前だけ」を独占できるのは、ゆるくま系の特権です。' },
  gap:     { partner: 'wanko',   percent: 95, note: 'あなたがたまに見せる全開モードに、わんこ系はまっすぐ反応します。クールな顔の裏を知った瞬間、尻尾の振り方が変わる。相手の素直さに、落差がいちばん効く組み合わせです。' },
  mystery: { partner: 'rare',    percent: 96, note: 'どの系統も出せるカワウソ系は、読めない人に出会うと本気で興味を持ちます。全方位にメロい相手が、唯一「わからない」と感じるのがあなた。謎が謎を呼ぶ、見応えのある組み合わせ。' },
  rare:    { partner: 'mystery', percent: 96, note: 'どの系統も出せるあなたは、余韻を残すきつね系を唯一読み切れる相手になれます。全部を見せない人が、あなたの前だけ言葉を足してしまう。謎を解く側に立てる、珍しい組み合わせです。' },
};

// ---- おすすめ欄(Amazonアソシエイト。script.jsの仕組みを踏襲した独立実装) ----
// JA単独ページ(LANG切り替えなし)なのでUS向けタグ分岐は持たない。
const AFFILIATE_TAG = 'tinywonders-22';

// script.jsのaffiliateUrl()と同仕様: ¥1,000〜3,000の価格帯フィルタ+レビュー評価順ソートを
// URLパラメータで強制する(amazon.co.jpで動作確認済み)。
function affiliateUrl(keyword) {
  let base = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  base += '&rh=p_36%3A100000-300000&s=review-rank';
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

// タイプ別おすすめ2点+理由1行(2026-10-14、Fable執筆。正本は診断ツール群/MBTI診断/meroi_gift_copy.json)。
// 理由文は主語を「あなた」にしない形なので、シェア閲覧者(友達に贈る人)にもそのまま出す
const MELO_GIFTS = {
  wanko: [
    { emoji: '🎤', name: 'アクスタ収納ケース', keyword: 'アクリルスタンド 収納ケース 推し活', reason: 'ライブ後に「やばい」しか残らない夜も、推しだけは無事に持ち帰る。' },
    { emoji: '📱', name: '折りたたみスマホスタンド', keyword: 'スマホスタンド 卓上 折りたたみ', reason: '既読と同時に返信が飛んでいく人の、机の上の定位置に。' },
  ],
  anshin: [
    { emoji: '🥃', name: 'ダブルウォールグラス', keyword: 'ダブルウォールグラス 耐熱 おしゃれ', reason: '何も聞かずに「おつかれ」と差し出す、その一杯の置き場に。' },
    { emoji: '🧦', name: 'もこもこルームソックス', keyword: 'ルームソックス もこもこ ユニセックス', reason: '沈黙が気まずくならない隣。足元までゆるむと、長居が始まる。' },
  ],
  gap: [
    { emoji: '🃏', name: 'トレカ用ケース', keyword: 'トレカケース 推し活 硬質', reason: 'スタンプ1個で終わる人も、推しの話では早口。その推しを守る一枚。' },
    { emoji: '👜', name: 'リバーシブルトート', keyword: 'トートバッグ リバーシブル キャンバス', reason: '表はクール、裏返すと別の顔。週1で誰かを驚かせる落差を持ち歩く。' },
  ],
  mystery: [
    { emoji: '✉️', name: '一筆箋', keyword: '一筆箋 おしゃれ シンプル', reason: 'グループLINEに置いていく一言と同じ、短くて残る紙を一枚。' },
    { emoji: '✨', name: '揺れるイヤーカフ', keyword: 'イヤーカフ 揺れる シルバー', reason: '「じゃあね」で振り返った横顔に、ひとつだけ揺れるものを。' },
  ],
  rare: [
    { emoji: '🎞️', name: 'マスキングテープセット', keyword: 'マスキングテープ セット 和紙 おしゃれ', reason: 'どの系統にも寄らない人の手帳は、その日の気分で柄を変えればいい。' },
    { emoji: '🔤', name: '卓上レターボード', keyword: 'レターボード 卓上 インテリア', reason: '褒められても信じない人の机に、言われた言葉を一週間貼っておく板。' },
  ],
};

// ---- スコア計算(純粋関数。Node側でも brute-force 検証できるよう副作用なしにしている) ----
function computeMeloScores(answers) {
  let kyori = 0, hyogen = 0;
  answers.forEach((a) => {
    if (a.axis === 'kyori') kyori += a.weight;
    else hyogen += a.weight;
  });
  return { kyori, hyogen };
}

function computeMeloType(kyori, hyogen) {
  if (Math.abs(kyori) + Math.abs(hyogen) <= 1) return 'rare';
  if (kyori >= 0 && hyogen > 0) return 'wanko';
  if (kyori > 0) return 'anshin';
  if (hyogen > 0) return 'gap';
  // 距離感がちょうど0でさりげない人は、自分から寄っていく「安心系」ではなく「きつね系」側に入れる
  return 'mystery';
}

// 各軸の絶対値(最大10)を0-100に正規化し、傾向がはっきりしているほどメロい度を高くする。
function computeMeloPurity(kyori, hyogen) {
  // 傾向の強さ(0〜100)を80〜100%の「メロい度」に変換(全員を褒める演出)
  const p = (Math.abs(kyori) / 10) * 50 + (Math.abs(hyogen) / 10) * 50;
  return 80 + Math.round(Math.max(0, Math.min(100, p)) * 0.2);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MELO_QUESTIONS, MELO_TYPES, MELO_COMPAT,
    computeMeloScores, computeMeloType, computeMeloPurity,
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
    let lastResult = null; // { id, kyori, hyogen, purity }
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
      track('quiz_start', { quiz_name: 'meroi' });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= MELO_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = MELO_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / MELO_QUESTIONS.length) * 100}%`;
      progressText.textContent = `${currentIndex + 1} / ${MELO_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">💗</div><div class="bubble ai">${text}</div>`;
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
      const { kyori, hyogen } = computeMeloScores(answers);
      const id = computeMeloType(kyori, hyogen);
      const purity = computeMeloPurity(kyori, hyogen);
      lastResult = { id, kyori, hyogen, purity };
      track('quiz_complete', { quiz_name: 'meroi', result_type: id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
    }

    function renderResult(result) {
      const t = MELO_TYPES[result.id];
      const compat = MELO_COMPAT[result.id];
      const partner = MELO_TYPES[compat.partner];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = `あなたは<wbr><span class="grad-text" style="white-space:nowrap">「${t.kei}」</span><wbr><span style="white-space:nowrap">のメロい人</span>`;
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
        document.getElementById('nandere-purity-label').textContent = `メロい度 ${result.purity}%`;
      }

      setTypeIllust(document.getElementById('compat-emoji'), compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      renderGiftList(document.getElementById('nandere-lucky'), {
        mode: sharedView ? 'gift' : 'self', typeName: t.name, items: MELO_GIFTS[result.id], href: affiliateUrl,
        onClick: (p) => track('affiliate_click', { quiz_name: 'meroi', result_type: result.id, ...p }),
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?d=${result.kyori}&h=${result.hyogen}`;
    }

    let copyTimer = null;
    function copyResultUrl() {
      if (!lastResult || !navigator.clipboard) return;
      const btn = document.getElementById('btn-copy-url');
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        track('copy_url', { quiz_name: 'meroi', result_type: lastResult.id });
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
      const t = MELO_TYPES[result.id];
      const score = t.rare ? '測定不能' : `${result.purity}%`;
      return `私のメロい度は${score}!${t.emoji}${t.kei}の「${t.name}」でした(${t.nickname})\nみんなのメロさは?\n#メロい度診断 #あなたは何メロ`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'meroi', content_type: 'meroi', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'meroi', content_type: 'meroi', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    // 「次はこれ」カードのクリック計測(どの診断へ回せているか)
    // カード(next_card)と下の文字リンク(follow_links)を同じイベントで数え、placementで区別する。
    // 同じタブで遷移するので beacon で送り、遷移で送信が消えないようにする
    document.querySelectorAll('.next-quiz-card, .follow-links a[data-next]').forEach((el) => {
      el.addEventListener('click', () => {
        track('next_quiz_click', {
          quiz_name: 'meroi', target: el.dataset.next, mode: sharedView ? 'gift' : 'self',
          placement: el.classList.contains('next-quiz-card') ? 'next_card' : 'follow_links', transport_type: 'beacon',
        });
      });
    });

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
      bg1: '#fff0f5', bg2: '#ffe8ef', bg3: '#fff3e6',
      primaryDark: '#e0507e', text: '#55404f', sub: '#a3899e',
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
        [w * 0.85, h * 0.15, w * 0.30, '#ffd3e2'],
        [w * 0.15, h * 0.92, w * 0.28, '#ffe3cc'],
        [w * 0.65, h * 0.88, w * 0.22, '#ffd8ec'],
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
      return `img/types/meroi-${id}.jpg`;
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

    function drawMeloCard(ctx, W, H, result, opts) {
      const t = MELO_TYPES[result.id];
      const compat = MELO_COMPAT[result.id];
      const partner = MELO_TYPES[compat.partner];
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
      ctx.fillText(`メロい度診断 RESULT|${t.kei}`, W / 2, y);
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
      const badgeText = t.rare ? 'メロい度 測定不能(出現率 約5%)' : `メロい度 ${result.purity}%`;
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
      ctx.fillText('あなたのメロい度は? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | メロい度診断', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildMeloCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawMeloCard(canvas.getContext('2d'), 1080, 1920, result, {
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
        drawMeloCard(canvas.getContext('2d'), 1200, 630, result, {
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
        const canvas = buildMeloCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = 'メロい度診断の結果カード';
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
      track('save_card', { quiz_name: 'meroi', mode });
      try {
        const canvas = buildMeloCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `meroi-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?d=&h=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const dRaw = params.get('d');
      const hRaw = params.get('h');
      if (!/^-?\d{1,2}$/.test(dRaw || '') || !/^-?\d{1,2}$/.test(hRaw || '')) return;
      const kyori = parseInt(dRaw, 10);
      const hyogen = parseInt(hRaw, 10);
      if (!Number.isFinite(kyori) || !Number.isFinite(hyogen)) return;
      if (Math.abs(kyori) > 10 || Math.abs(hyogen) > 10) return;
      const id = computeMeloType(kyori, hyogen);
      const purity = computeMeloPurity(kyori, hyogen);
      lastResult = { id, kyori, hyogen, purity };
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // シェアされたURLから来た人向けに、見出しとボタンを「自分も診断する」導線にする
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされたメロさは<wbr><span class="grad-text" style="white-space:nowrap">「${MELO_TYPES[id].kei}」</span>`;
      document.getElementById('btn-restart').textContent = '自分のメロい度も診断する 💗';
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
