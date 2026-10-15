'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== 何すぎて滅?診断(スピンオフ、全10問、2026-10-10) =====
// メロい度診断(meroi.js)と同じ仕組み(2軸×5問・5タイプ・結果カード画像)を流用した独立ファイル。
// DOMのid/classも nandere.html と同じ名前を使い、style.css の何デレ診断用スタイルをそのまま当てている。
// 設問・結果文はFable執筆。
// 軸: toki=滅ぶ瞬間(+不意打ち・ギャップ/-日常・安定感)、hannou=反応(+外に全部出る/-静かに噛みしめる)。
// 結果はすべて楽しい悶絶ネタ。スコアは「滅度」80〜100%で表示する(激レアは「測定不能」)。

// ---- 設問データ: 2軸(toki=滅ぶ瞬間, hannou=反応)×各5問、4択(weight -2/-1/+1/+2) ----
const METSU_QUESTIONS = [
  { axis: 'toki', text: '推しの配信や好きな人との時間。一番「うわ…」って息が止まるのは?', opts: [
    { text: 'いつも通りのテンションで、今日もそこにいてくれると分かった時', weight: -1 },
    { text: '急に見たことない表情をして、知らない一面が出てきた時', weight: 2 },
    { text: 'ふいに「ちゃんと寝てる?」と心配された時', weight: 1 },
    { text: '毎回同じ挨拶・同じクセが、今日も健在だった時', weight: -2 },
  ]},
  { axis: 'hannou', text: '滅んだ直後、体が勝手にやることは?', opts: [
    { text: '「は!?」って声が出る。周りに人がいても出る', weight: 2 },
    { text: '画面を一回伏せて、深呼吸してもう一回見る', weight: -1 },
    { text: '何も言えなくなって、ただ黙って天井を見上げる', weight: -2 },
    { text: 'スマホを握り直して、誰かに送る文を打ち始める', weight: 1 },
  ]},
  { axis: 'toki', text: 'SNSの更新で一番やられるのはどれ?', opts: [
    { text: '普段は見せない、料理とか作業中とかの意外な写真', weight: 1 },
    { text: '何ヶ月も変わらないルーティン投稿が、今日も続いていること', weight: -2 },
    { text: '深夜に予告なしで来る、まったく予想外の投稿', weight: 2 },
    { text: 'いつもの「おはよう」が今日もちゃんと来たこと', weight: -1 },
  ]},
  { axis: 'hannou', text: '滅ネタを友達に話す時のスタイルは?', opts: [
    { text: '聞かれたら話す。でも全部は言わない', weight: -1 },
    { text: '言わない。自分の中だけで味わうのが一番おいしい', weight: -2 },
    { text: '会った瞬間に全部喋る。止まらないし止めない', weight: 2 },
    { text: '別の話の途中で「ちょっと聞いて」って切り出す', weight: 1 },
  ]},
  { axis: 'toki', text: '好きな人・推しの「尊い」を一言にすると?', opts: [
    { text: '「存在してるだけでもう」', weight: -2 },
    { text: '「ここで優しいのは反則」', weight: 1 },
    { text: '「今日も変わらずいてくれた」', weight: -1 },
    { text: '「え、そんな顔もするの?」', weight: 2 },
  ]},
  { axis: 'hannou', text: '滅んだ日のSNS、どうなってる?', opts: [
    { text: '1投稿にまとめて、全力で叫ぶ', weight: 1 },
    { text: '連投。タイムラインが自分の叫びで埋まる', weight: 2 },
    { text: '下書きには書く。でも投稿はしない', weight: -2 },
    { text: 'いいねだけ押して、そっと閉じる', weight: -1 },
  ]},
  { axis: 'toki', text: 'ライブ後や帰り道、頭の中で一番リピートされるシーンは?', opts: [
    { text: '定番の決めポーズが、今日もキレてたこと', weight: -1 },
    { text: '帰り際、さりげなくこっちを気遣う一言をくれた瞬間', weight: 1 },
    { text: 'いつもと同じ笑顔で、いつもと同じように手を振ってくれたこと', weight: -2 },
    { text: '予想してなかったタイミングで、ふっと目が合った(気がした)瞬間', weight: 2 },
  ]},
  { axis: 'hannou', text: '「滅」の表現方法、一番自分らしいのは?', opts: [
    { text: '心の中で静かに手を合わせる', weight: -2 },
    { text: '床に崩れ落ちる。リアルで', weight: 2 },
    { text: '無言で画面を見つめたまま固まる', weight: -1 },
    { text: '友達にスタンプを連打する', weight: 1 },
  ]},
  { axis: 'toki', text: 'もし好きな人・推しが、ある日突然いつもと真逆のキャラになったら?', opts: [
    { text: '新鮮だけど、いつもの方が落ち着いて好きかも', weight: -1 },
    { text: '最高。そのギャップで即滅ぶ', weight: 2 },
    { text: 'いつものあの感じが一番尊い。できれば変わらないでほしい', weight: -2 },
    { text: 'ちょっと嬉しい。でもしばらくしたらいつものに戻ってほしい', weight: 1 },
  ]},
  { axis: 'hannou', text: '滅んだ記憶、どうやって残す?', opts: [
    { text: '誰かに語り倒して、記憶に刻み込む', weight: 2 },
    { text: '何も残さない。心の中で何度も再生する', weight: -2 },
    { text: '友達のグループに「ちょっと聞いて」と即報告', weight: 1 },
    { text: 'スクショして、自分だけのフォルダにしまう', weight: -1 },
  ]},
];

// ---- タイプ定義(kei=「〇〇すぎて滅」。結果見出しは「あなたは「{kei}」タイプ」) ----
const METSU_TYPES = {
  gap: {
    emoji: '⚡', kei: 'ギャップすぎて滅', name: '不意打ち崩落型',
    nickname: '予想外の一面に毎回崩れ落ちる人',
    tagline: '油断した瞬間に、叫んで滅',
    color: '#d9480f',
    description: 'あなたが滅ぶのは、油断している時です。いつも元気な推しが配信でふっと真顔になって本音を言った瞬間、普段はクールで無口な好きな人が、犬を見つけた途端に子どもみたいな顔で笑った瞬間。心の準備ゼロのところに不意打ちが来るので、防御が間に合わず「は!?」と声が出ます。しかも出た声はそのまま友達へのLINEとSNSの連投に直結。気づいたらタイムラインが自分の叫びで埋まっている、なんてことも日常茶飯事ですね。あなたの滅は騒がしいけれど、それは相手の「いつも」をちゃんと知っているからこそギャップに気づける、観察眼の裏返しなんです。崩れ落ちた回数だけ、見てきた時間がある。',
  },
  yasashi: {
    emoji: '🫠', kei: '優しすぎて滅', name: 'ふいの無言撃沈型',
    nickname: '不意打ちの優しさに、声もなく沈む人',
    tagline: 'ふいの一言で、声が出なくなる',
    color: '#2b7a78',
    description: 'あなたは不意打ちに弱いのに、やられても叫ばずに沈むタイプ。だからいちばん深く効くのが「ふいの優しさ」です。いつもの流れの中で、何も言っていないのに「無理してない?」と気にかけられた瞬間、身構える前に静かに刺さってきます。普段見せない一面や知らなかった過去がぽろっと出た時も、声は出ないまま胸の奥でじわっとやられる。でも一番長く残るのは、やっぱりあの何気ない気遣いですね。騒がないので周りには「平気そう」に見えますが、実は帰り道に何度も思い返して、布団の中でひとり唸っています。あなたの滅は静かで、しかも長い。それは相手の小さな優しさを、ちゃんと受け取って大事にしまえる人だからです。',
  },
  kawaii: {
    emoji: '🎀', kei: 'かわいすぎて滅', name: '日常絶叫リピート型',
    nickname: '今日も同じかわいさに全力で叫ぶ人',
    tagline: 'いつものかわいさに、毎回大騒ぎ',
    color: '#c2255c',
    description: '推しの配信が始まって、いつもの挨拶が聞こえた瞬間。好きな人から毎朝同じ時間に「おはよ」が届いた瞬間。あなたはこの「いつもの」で、毎回ちゃんと叫びます。一回目で滅んだなら二回目は慣れるはずなのに、百回目でも「かわいすぎる!!」と声が出て、友達からは「またそれ?」と笑われるのが恒例。でも考えてみてください。同じ場面で毎回同じ熱量で騒げるのって、飽きるという機能が壊れているわけじゃなく、相手の変わらない部分を毎日新鮮に受け取り直せる才能です。あなたの騒がしさは、推しや好きな人にとって「今日もちゃんと見てくれている」という何よりの証拠になっています。叫び続けてください、それがあなたの愛の形です。',
  },
  toutoi: {
    emoji: '🙏', kei: '尊すぎて滅', name: '日々合掌の静寂型',
    nickname: '存在に毎日そっと手を合わせる人',
    tagline: '今日もいてくれて、ありがとう',
    color: '#5f3dc4',
    description: '派手な事件は要りません。推しが今日も配信を始めて、いつもの声で「こんばんは」と言った。好きな人が教室のいつもの席で、いつもの姿勢でノートを開いている。それだけであなたの中では静かに何かが崩れて、心の中でそっと手を合わせています。声には出しません。SNSにも書きません。けれど帰り道や寝る前に、今日もあの人が変わらずそこにいたという事実を、ゆっくり何度も再生しているはずです。周りからは「落ち着いてるね」と見えるあなたの滅は、実は誰よりも継続的で、途切れたことが一日もない。毎日存在に感謝できるというのは、恋でも推し活でも、いちばん長く続く愛の持ち方です。拝む日々、どうぞそのまま。',
  },
  rare: {
    emoji: '🌟', kei: '全部すぎて滅', name: '全方位被弾型',
    nickname: 'どの角度から来ても漏れなく滅ぶ人',
    tagline: '弱点は全部、守備範囲はゼロ',
    color: '#9c6b00',
    rare: true,
    description: '診断結果を言いますね。弱点、全部です。不意打ちのギャップにも崩れるし、いつも通りの姿にも崩れる。叫ぶ日もあれば、黙って抱えて帰る日もある。推しが配信で急に真面目な話をしても滅ぶし、翌日いつもの雑談に戻っても滅ぶ。好きな人が珍しく褒めてくれた日も、何もない日にただ隣にいた日も、同じ重さで刺さる。つまりあなたは「どこで滅ぶか」を選んでいないんです。相手を一部分じゃなく全体で受け取っているから、どの角度から来ても被弾してしまう。約20人に1人しかいないこのタイプは、好きになる対象の全てをまるごと肯定できる、いちばん器の広い滅の持ち主です。守備範囲ゼロ、受け入れ範囲は無限。それでいいんです。',
  },
};

// ---- 滅トークが一番盛り上がる相手(固定) ----
const METSU_COMPAT = {
  gap:     { partner: 'kawaii',  percent: 93, note: '不意打ちで叫ぶあなたと、いつもので叫ぶかわいすぎて滅タイプ。滅ぶ場所が違うので話題が尽きず、片方が叫べばもう片方が追い叫ぶ。滅トークは夜通し、翌朝は二人とも声が枯れます。' },
  yasashi: { partner: 'toutoi',  percent: 91, note: 'どちらも叫ばない組み合わせですが、だからこそ会話が深い。あなたが「あの一言がね…」とぽつり言えば、尊すぎて滅タイプが「わかる、存在がもう」と静かに頷く。沈黙が気まずくならない、貴重な滅仲間です。' },
  kawaii:  { partner: 'gap',     percent: 93, note: '毎日の定番で叫ぶあなたに、ギャップすぎて滅タイプは「そこ気づかなかった!」と新しい滅ポイントを持ってきます。あなたは逆に「あの瞬間、毎回尊いよね」を布教。お互いの弱点が増えていく最高のループです。' },
  toutoi:  { partner: 'yasashi', percent: 91, note: '静かに拝むあなたと、ふいの優しさに無言で沈む優しすぎて滅タイプ。盛り上がり方は穏やかなのに、帰る頃には二人ともじんわり泣いている。語り合った翌日、推しや好きな人をもう少しだけ大切に見られるようになります。' },
  rare:    { partner: 'gap',     percent: 97, note: 'どこからでも滅ぶあなたの話は情報量が多すぎて、普通の人だと追いつけません。でもギャップすぎて滅タイプは全部に「は!?」で反応してくれる。あなたが語り、相手が叫ぶ。役割分担が完璧な滅トークの最強ペアです。' },
};

const METSU_LUCKY_BRIDGE = {
  gap:     '不意打ちで崩れ落ちるあなたには、滅んだ瞬間にすぐ手が届く「受け止めグッズ」を。叫んだ後に体勢を立て直せるものを選びました。',
  yasashi: '無言で撃沈したあと、ひとりで静かに回復する時間にそっと寄り添うものを。黙って噛みしめる夜のお供です。',
  kawaii:  '毎日の「かわいすぎる!!」を、毎日ちゃんと盛り上げるための道具を。推し活の日常がもう少し楽しくなるものを集めました。',
  toutoi:  '存在に手を合わせる日々に、静かな彩りを足すものを。騒がず、でも毎日ちゃんと推しや好きな人を感じられる雑貨です。',
  rare:    '全方位から滅ぶあなたには、どの滅にも対応できる万能選手を。叫ぶ日も黙る日も、どっちでも使えるものを選びました。',
};

const METSU_LUCKY_ITEMS = {
  gap: [
    { emoji: '🧸', name: 'もちもちクッション', keyword: 'もちもち クッション ぬいぐるみ' },
    { emoji: '📱', name: 'スマホリング', keyword: 'スマホリング 落下防止' },
    { emoji: '🔦', name: '推し色ペンライト', keyword: '推し活 ペンライト 15色' },
  ],
  yasashi: [
    { emoji: '🫖', name: '蓋付きマグカップ', keyword: 'マグカップ 蓋付き 保温' },
    { emoji: '📓', name: 'シンプル日記帳', keyword: '日記帳 シンプル A5' },
    { emoji: '🌿', name: 'リードディフューザー', keyword: 'リードディフューザー ルームフレグランス' },
  ],
  kawaii: [
    { emoji: '🖼️', name: 'アクスタケース', keyword: 'アクスタ ケース 推し活' },
    { emoji: '🎨', name: '推し色マスキングテープ', keyword: 'マスキングテープ セット かわいい' },
    { emoji: '👜', name: 'スマホショルダー', keyword: 'スマホショルダー ストラップ' },
  ],
  toutoi: [
    { emoji: '🪟', name: '卓上フォトフレーム', keyword: 'フォトフレーム 卓上 シンプル' },
    { emoji: '💡', name: '卓上ルームライト', keyword: '間接照明 ルームライト 卓上' },
    { emoji: '📔', name: '推し活手帳', keyword: '推し活 手帳 スケジュール' },
  ],
  rare: [
    { emoji: '👝', name: '推し活ポーチ', keyword: '推し活 ポーチ 透明' },
    { emoji: '🔋', name: '小型モバイルバッテリー', keyword: 'モバイルバッテリー 小型 軽量' },
    { emoji: '🧣', name: 'ミニタオル', keyword: 'ミニタオル ハンカチ 無地' },
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
const METSU_LUCKY_ICON_MAP = {};

function pickMetsuLuckyItem(id) {
  const candidates = METSU_LUCKY_ITEMS[id];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// ---- スコア計算(純粋関数。Node側でも brute-force 検証できるよう副作用なしにしている) ----
function computeMetsuScores(answers) {
  let toki = 0, hannou = 0;
  answers.forEach((a) => {
    if (a.axis === 'toki') toki += a.weight;
    else hannou += a.weight;
  });
  return { toki, hannou };
}

function computeMetsuType(toki, hannou) {
  if (Math.abs(toki) + Math.abs(hannou) <= 1) return 'rare';
  if (toki >= 0 && hannou > 0) return 'gap';
  if (toki > 0) return 'yasashi';
  if (hannou > 0) return 'kawaii';
  // 滅ぶ瞬間の軸がちょうど0で静かな人は、不意打ち型の「優しすぎて滅」ではなく「尊すぎて滅」側に入れる
  return 'toutoi';
}

// 各軸の絶対値(最大10)を0-100に正規化し、傾向がはっきりしているほど滅度を高くする。
function computeMetsuPurity(toki, hannou) {
  // 傾向の強さ(0〜100)を80〜100%の「滅度」に変換
  const p = (Math.abs(toki) / 10) * 50 + (Math.abs(hannou) / 10) * 50;
  return 80 + Math.round(Math.max(0, Math.min(100, p)) * 0.2);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    METSU_QUESTIONS, METSU_TYPES, METSU_COMPAT,
    computeMetsuScores, computeMetsuType, computeMetsuPurity,
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
    let lastResult = null; // { id, toki, hannou, purity }
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
      track('quiz_start', { quiz_name: 'metsu' });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= METSU_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = METSU_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / METSU_QUESTIONS.length) * 100}%`;
      progressText.textContent = `${currentIndex + 1} / ${METSU_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">💥</div><div class="bubble ai">${text}</div>`;
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
      const { toki, hannou } = computeMetsuScores(answers);
      const id = computeMetsuType(toki, hannou);
      const purity = computeMetsuPurity(toki, hannou);
      lastResult = { id, toki, hannou, purity };
      track('quiz_complete', { quiz_name: 'metsu', result_type: id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
    }

    function renderResult(result) {
      const t = METSU_TYPES[result.id];
      const compat = METSU_COMPAT[result.id];
      const partner = METSU_TYPES[compat.partner];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = `あなたは<wbr><span style="white-space:nowrap"><span class="grad-text">「${t.kei}」</span>タイプ</span>`;
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
        document.getElementById('nandere-purity-label').textContent = `滅度 ${result.purity}%`;
      }

      setTypeIllust(document.getElementById('compat-emoji'), compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = `${partner.kei}タイプ`;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      const lucky = pickMetsuLuckyItem(result.id);
      renderGiftBox(document.getElementById('nandere-lucky'), {
        mode: sharedView ? 'gift' : 'self', typeName: t.name, item: lucky,
        iconMap: METSU_LUCKY_ICON_MAP, bridge: METSU_LUCKY_BRIDGE[result.id], href: affiliateUrl(lucky.keyword),
        onClick: (p) => track('affiliate_click', { quiz_name: 'metsu', result_type: result.id, ...p }),
        onView: () => track('section_view', { quiz_name: 'metsu', result_type: result.id, placement: 'result_card', mode: sharedView ? 'gift' : 'self' }),
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?t=${result.toki}&h=${result.hannou}`;
    }

    let copyTimer = null;
    function copyResultUrl() {
      if (!lastResult || !navigator.clipboard) return;
      const btn = document.getElementById('btn-copy-url');
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        track('copy_url', { quiz_name: 'metsu', result_type: lastResult.id });
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
      const t = METSU_TYPES[result.id];
      const score = t.rare ? '測定不能' : `${result.purity}%`;
      return `私は「${t.kei}」タイプでした!滅度${score} ${t.emoji}${t.name}(${t.nickname})\nあなたは何すぎて滅?\n#何すぎて滅診断 #滅ぼされ方診断`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'metsu', content_type: 'metsu', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'metsu', content_type: 'metsu', item_id: lastResult.id });
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
      bg1: '#fff1ec', bg2: '#ffe9f1', bg3: '#f3ebff',
      primaryDark: '#d6336c', text: '#55404f', sub: '#a3899e',
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
        [w * 0.85, h * 0.15, w * 0.30, '#ffd6c9'],
        [w * 0.15, h * 0.92, w * 0.28, '#e6d8ff'],
        [w * 0.65, h * 0.88, w * 0.22, '#ffd3e6'],
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
      return `img/types/metsu-${id}.jpg`;
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

    function drawMetsuCard(ctx, W, H, result, opts) {
      const t = METSU_TYPES[result.id];
      const compat = METSU_COMPAT[result.id];
      const partner = METSU_TYPES[compat.partner];
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
      ctx.fillText('何すぎて滅?診断 RESULT', W / 2, y);
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

      // 滅度 or レアバッジ
      const badgeText = t.rare ? '滅度 測定不能(出現率 約5%)' : `滅度 ${result.purity}%`;
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
      ctx.fillText(`滅トーク相性◎ ${partner.emoji} ${partner.kei}(${compat.percent}%)`, W / 2, y);
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
      ctx.fillText('あなたは何すぎて滅? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 何すぎて滅?診断', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildMetsuCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawMetsuCard(canvas.getContext('2d'), 1080, 1920, result, {
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
        drawMetsuCard(canvas.getContext('2d'), 1200, 630, result, {
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
      preview.innerHTML = '';
      try {
        const illust = loadTypeImage(result.id);
        if (document.fonts && document.fonts.ready) {
          try { await document.fonts.ready; } catch (e) { /* フォント待ち失敗時は既定フォントで続行 */ }
        }
        const canvas = buildMetsuCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = '何すぎて滅?診断の結果カード';
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
      track('save_card', { quiz_name: 'metsu', card_format: mode });
      try {
        const canvas = buildMetsuCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `metsu-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?t=&h=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const tRaw = params.get('t');
      const hRaw = params.get('h');
      if (!/^-?\d{1,2}$/.test(tRaw || '') || !/^-?\d{1,2}$/.test(hRaw || '')) return;
      const toki = parseInt(tRaw, 10);
      const hannou = parseInt(hRaw, 10);
      if (!Number.isFinite(toki) || !Number.isFinite(hannou)) return;
      if (Math.abs(toki) > 10 || Math.abs(hannou) > 10) return;
      const id = computeMetsuType(toki, hannou);
      const purity = computeMetsuPurity(toki, hannou);
      lastResult = { id, toki, hannou, purity };
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // シェアされたURLから来た人向けに、見出しとボタンを「自分も診断する」導線にする
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされたのは<wbr><span class="grad-text" style="white-space:nowrap">「${METSU_TYPES[id].kei}」</span>`;
      document.getElementById('btn-restart').textContent = '自分は何すぎて滅か診断する 💥';
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
