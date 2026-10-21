'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== ここからreishou_content.js(診断ツール群/MBTI診断/、文言の正本)の写し。文言を直す時は正本を直してからここへ写す =====
// ===== 冷笑系度診断(単発、全10問、2026-10-17。企画書「新診断3本_企画_2026-10-17.md」の決定2に基づく) =====
// 競合の「見下しグセを反省させる型」とは逆に、冷笑系を「冷静な観察眼」「ツッコミ力」として褒め寄りに描く。
// 自己診断のみ(他人を測る機能なし)。タイプ名に「冷笑」は入れない。商品欄なし。設問・結果文はFable執筆。
// 軸: naibu=心の中のツッコミ量(+多い/-少ない)
//     kuchi=口に出す量(+出す/-出さない)
// 判定はmeroi.jsのcomputeMeloTypeと同じ形:
//   |naibu|+|kuchi|<=1 → nekketsu(レア) / naibu>=0かつkuchi>0 → jikkyo / naibu>0 → fukuonsei / kuchi>0 → sunao / それ以外 → tatsukan
//   jikkyo=多×出す(実況解説ツッコミ)、fukuonsei=多×出さない(心の中の副音声)、sunao=少×出す(素直リアクション)、tatsukan=少×出さない(達観スルー)
// 禁止事項(企画書「5名概念レビュー後の決定」2の禁止リストに従う): 見下す語、他人を診断させる文、時事の話題、
//   特定の属性(推し活・職業・地域)を笑う場面、実在の人物・作品・サービス名、専門分野の断定。

// ---- 設問データ: 2軸(naibu=心の中のツッコミ量, kuchi=口に出す量)×各5問、4択(weight -2/-1/+1/+2) ----
// 場面は日常のあるある(教室・バイト・家・SNS・テレビ)。笑う対象は「出来事」か「仲のいい人のかわいいズレ」だけにする。
const REISHOU_QUESTIONS = [
  { axis: 'naibu', text: 'テレビの食レポで、出演者が食べる前に「これは絶対うまい!」と言った。頭の中は?', opts: [
    { text: '「まだ食べてない」とツッコミが脳内で先に流れる', weight: 2 },
    { text: '「まあ番組だしね」と一回だけ思う', weight: 1 },
    { text: 'ふつうに「おいしそう」と思って見ている', weight: -1 },
    { text: '何も考えず、一緒に「うまそ〜」と気分が乗る', weight: -2 },
  ]},
  { axis: 'kuchi', text: '友達と映画を見ていて、途中で犯人が読めた。どうする?', opts: [
    { text: '「これ絶対あの人」とその場で小声で言う', weight: 2 },
    { text: '終わってから「途中で読めてた」と言う', weight: 1 },
    { text: '言わない。当たっていたら心の中でガッツポーズ', weight: -1 },
    { text: '終わっても言わない。まず相手の感想を聞く', weight: -2 },
  ]},
  { axis: 'naibu', text: '教室で友達が「5分だけ寝る」と言って、授業が終わるまで寝ていた。頭の中は?', opts: [
    { text: '「5分の長さ」という見出しが出て、ナレーションが始まる', weight: 2 },
    { text: '「5分じゃなかったな」と一瞬思う', weight: 1 },
    { text: '疲れてたんだな、と思う', weight: -1 },
    { text: '自分もちょっと眠くなる', weight: -2 },
  ]},
  { axis: 'kuchi', text: 'バイト先の先輩のダジャレが、今日3回目。あなたは?', opts: [
    { text: '「3回目です」と笑いながら言う', weight: 2 },
    { text: '「あ、またそれですか」と小声で返す', weight: 1 },
    { text: '何も言わず、ふつうに笑っておく', weight: -1 },
    { text: '何も言わない。言わないほうが場が楽', weight: -2 },
  ]},
  { axis: 'naibu', text: 'バイト中、自分が「今日は暇だね」と言った直後にお客さんが来た。頭の中は?', opts: [
    { text: '「言うと来るやつ」と自分にツッコミが入る', weight: 2 },
    { text: '「あー、言っちゃった」と少し思う', weight: 1 },
    { text: '気にせずレジへ向かう', weight: -1 },
    { text: '「いらっしゃいませ!」と気持ちが切り替わる', weight: -2 },
  ]},
  { axis: 'kuchi', text: '家族がテレビのクイズに自信満々で答えて、外れた。あなたは?', opts: [
    { text: '「違うと思ってた」とすぐ言う', weight: 2 },
    { text: '「惜しい」とだけ言う', weight: 1 },
    { text: '何も言わず、次の問題を一緒に見る', weight: -1 },
    { text: '黙って次へ。思ったことは胸の中', weight: -2 },
  ]},
  { axis: 'naibu', text: 'SNSで「本当に大事なことは3つだけ」という投稿に、8個書いてあった。頭の中は?', opts: [
    { text: '全部数えてしまい、「3つ、どこ行った」と再生される', weight: 2 },
    { text: '「多いな」と思ってスクロール', weight: 1 },
    { text: '内容が良ければ数は気にならない', weight: -1 },
    { text: '数えない。いい話なら保存する', weight: -2 },
  ]},
  { axis: 'kuchi', text: '教室で友達が「全然勉強してない」と言うのに、ノートが真っ黒。あなたは?', opts: [
    { text: '「ノート真っ黒じゃん」と即ツッコむ', weight: 2 },
    { text: '「それ勉強してるって言うんだよ」と笑って言う', weight: 1 },
    { text: '言わない。心の中で「がんばってるね」と思う', weight: -1 },
    { text: '何も言わず、自分のノートを開く', weight: -2 },
  ]},
  { axis: 'naibu', text: '家族が「今日こそ早く寝る」と言った日の深夜、リビングからスマホの光。頭の中は?', opts: [
    { text: '「今週何回目の早く寝る」と心の中でカウンターが回る', weight: 2 },
    { text: '「まあそうなるよね」と一瞬思う', weight: 1 },
    { text: '自分も一緒に夜ふかししたくなる', weight: -1 },
    { text: '特に何も思わない。おやすみ、と言う', weight: -2 },
  ]},
  { axis: 'kuchi', text: 'SNSで友達が「寝る」と投稿した30分後、また投稿していた。あなたは?', opts: [
    { text: '「寝てないじゃん」とリプする', weight: 2 },
    { text: '「寝るって言ってた人がいる」とスタンプ付きで送る', weight: 1 },
    { text: '見なかったことにして、いいねだけ押す', weight: -1 },
    { text: '何もしない。明日「寝れた?」と聞く', weight: -2 },
  ]},
];

// ---- タイプ定義(結果見出しは「あなたは「{name}」タイプ」。compat=相性の良いタイプと理由、sharetag=シェア文の2つ目のネタタグ) ----
const REISHOU_TYPES = {
  jikkyo: {
    emoji: '🎙️', name: '実況解説ツッコミ',
    nickname: '思ったことが0.5秒で声になる人',
    tagline: '見てる。言ってる。盛り上げてる。',
    color: '#d9481c',
    description: 'テレビを見ているとき、部屋で一番声が多いのはあなた。出演者が「絶対うまい」と言った瞬間に「まだ食べてない」、クイズで誰かが外した瞬間に「違うと思ってた」。頭の中のツッコミが、ほぼ時差なしで口から出ていくタイプです。友達と映画を見れば犯人を先に言ってしまい、バイトでは「暇だね」の直後に来たお客さんに、笑いをこらえながら接客している。黙っていようと思っても、面白いことを見つけたら言わずにいられない。「静かに見たい」と言われた経験、たぶんあります。でもあなたの実況は、観察が細かいからこそ出てくるもの。みんなが気づかなかった面白さを、その場で言葉にして笑いに変える人です。言っても笑ってくれる相手にだけ、たっぷり使ってください。',
    compat: { partner: 'tatsukan', percent: 94, note: '止まらない実況を、達観スルーの人は「はいはい」と湯のみを持ったまま受け止めてくれます。向こうが流したネタをあなたが拾い、あなたが言いすぎたぶんを向こうが薄める。テレビの前に二人いると、ちょうどいい番組になる組み合わせです。' },
    sharetail: '口に出してるけど愛があるのでセーフ',
    sharetag: '#実況解説ツッコミ',
  },
  fukuonsei: {
    emoji: '🎧', name: '心の中の副音声',
    nickname: '顔は無表情、脳内は大盛り上がりの人',
    tagline: '聞こえてないだけで、ずっと喋ってる',
    color: '#1f5f8b',
    description: '授業中、友達が「5分だけ寝る」と言ってそのまま終業まで寝た。あなたの頭の中では「5分の長さ」という見出しが出て、ナレーションが始まっています。でも口には出さない。顔も動かない。隣の人は、あなたがそんなに面白がっているとは夢にも思っていません。「大事なことは3つ」と言って8個書いてある投稿を見れば、全部数えて心の中で「3つ、どこ行った」とつぶやき、そのままスクロール。ツッコミの量は全タイプで最多なのに、放送されるのは自分の中だけ。だから周りからは、落ち着いた人、聞き上手な人に見られがちです。弱点は、面白すぎて一人で肩が震えるとき、何がおかしいのか説明できないこと。その副音声、信頼できる友達一人にだけ流してみてください。たぶん「わかる」が返ってきて、二人で止まらなくなります。',
    compat: { partner: 'sunao', percent: 96, note: '心の中で「今だ」と思った場面で、素直リアクションの人が先に声を出して笑ってくれる。あなたは「それ!」と初めて口に出せて、向こうは自分の反応が正しかったと安心する。あなたの観察と、相手のまっすぐな一声。どちらが欠けても成立しない名コンビです。' },
    sharetail: '口には出してないからセーフ',
    sharetag: '#心の中の副音声',
  },
  sunao: {
    emoji: '☀️', name: '素直リアクション',
    nickname: '笑うのも驚くのも、全部一拍早い人',
    tagline: 'ツッコむ前に、もう笑ってる',
    color: '#c98a00',
    description: '食レポで出演者が「うまい!」と叫んだら、同じ顔で「うまそ〜」と言っている。クイズは一緒に考えて一緒に外す。友達の「全然勉強してない」には、ノートの黒さを見て「すごいね」と素直に返す。あなたの頭の中には、ツッコミがほとんど浮かびません。浮かぶ前に、感情がそのまま声になっているから。周りからは「反応がいい」「一緒にいると楽しい」と言われることが多いはず。弱点を自分で言うなら、冗談を本気で受け取って1秒後に気づくこと、驚きすぎて映画館で小さく声が出ること。でも、その素直なリアクションがあるから、場の空気が温まります。心の中でツッコんでいる人も、あなたが笑った瞬間に安心して笑える。あなたのまっすぐな反応は、周りの人にとって一番ありがたい「最初の一声」です。',
    compat: { partner: 'fukuonsei', percent: 96, note: 'あなたが笑った場面で、心の中の副音声の人がぽつりと「実はさっきから思ってた」と解説を足してくれます。あなたの反応が相手の口を開かせ、相手の観察があなたの笑いを二倍にする。片方だけでは聞けない番組が、二人そろうと始まります。' },
    sharetail: 'ツッコむ前に笑ってるのでセーフ',
    sharetag: '#素直リアクション',
  },
  tatsukan: {
    emoji: '🍵', name: '達観スルー',
    nickname: '騒がしい部屋でひとり、湯のみを持ってる人',
    tagline: '気づいてる。でも、流す',
    color: '#2f7a5a',
    description: 'テレビの中で誰かが外しても、SNSで数が合わない投稿を見ても、あなたの反応は「ふーん」。ツッコミが浮かばないわけでも、我慢しているわけでもなく、面白いと思ったことをそっと通過させるのが得意なタイプです。バイト先で「暇だね」の直後にお客さんが来ても、「来ましたね」と静かにレジへ向かう。友達が「5分だけ寝る」と言って1時間寝ていても、起きたときに黙ってノートを見せる。そんな人です。周りからは「落ち着いてる」「何があっても動じない」と頼られる反面、「今の、面白くなかった?」と心配されることもあるはず。自分で言うなら、笑うタイミングが半日遅れて、家で思い出し笑いをする人。でも、全部を言葉にしない人がいると、場は不思議と安心します。そのスルーは、相手の失敗を大きくしない優しさでもあります。',
    compat: { partner: 'jikkyo', percent: 94, note: 'あなたが流したネタを、実況解説ツッコミの人が全部拾って言葉にしてくれます。あなたは半日遅れの思い出し笑いをその場でできるようになり、向こうは「聞いてくれる人」を手に入れる。騒がしさと静けさが、同じソファでちょうどよく混ざる組み合わせです。' },
    sharetail: '何も言ってないのでセーフ',
    sharetag: '#達観スルー',
  },
  nekketsu: {
    emoji: '🌋', name: '冷笑のふりした熱血',
    nickname: '冷めた顔で一番前の席に座ってる人',
    tagline: 'クールなふり、3分で崩れる',
    color: '#b5175a',
    rare: true,
    description: 'クールなふりが長続きしない、全体の5%ほどのレアタイプ。ツッコミの多さも口に出す量も、どちらにも寄らなかった人です。普段は「まあどっちでも」と冷めた顔をしているのに、好きな話題になった瞬間に声が大きくなり、気づけばいちばん前で手を叩いている。テレビを「見てないよ」と言いながら、クイズの答えは全問口に出す。友達の「全然勉強してない」に、ツッコむより先に「一緒にやろ」と言ってしまう。冷静に見ているつもりなのに、気持ちのほうが先に動くタイプです。周りからは「クールだと思ってたのに」と驚かれ、本人は「ふりだったの、バレたか」と照れる。弱点は、冷めたキャラを保てる時間が短すぎること。でも、ふりが崩れた瞬間のあなたが、たぶん一番人を集めます。その熱は隠さなくて大丈夫。周りはずっと前から気づいています。',
    compat: { partner: 'sunao', percent: 92, note: '素直リアクションの人の前では、冷めたふりを3秒で手放せます。向こうが先に「うまそ〜」と言ってくれるので、あなたは安心して「だよね!」と続ける。相手はあなたの隠していた熱に気づいて、もっと盛り上がる。ふりを脱いだあなたが、いちばん楽しそうに見える組み合わせです。' },
    sharetail: '冷笑のふりがバレたので判定は熱血',
    sharetag: '#冷笑のふりした熱血',
  },
};

// ---- 冷笑系度(0〜100の全域を使う) ----
// frenemy.jsのcomputeFrenemyPurityを参考にした式。ツッコミの量(naibu)を主(7割)、口に出さず心にとどめる量(-kuchi)を従(3割)として
//   冷笑系度 = 50 + naibu×3.5 − kuchi×1.5  を0〜100に収めて四捨五入
// naibu=+10,kuchi=-10(心の中で最多ツッコミ・一切出さない)で100、naibu=-10,kuchi=+10(ツッコミ最少・なんでも声に出す)で0。
// タイプ別の到達範囲: fukuonsei 55〜100 / jikkyo 35〜84 / tatsukan 15〜65 / sunao 0〜45 / nekketsu(レア) 47〜54(全組み合わせ総当たりで確認)
function computeReishouPurity(naibu, kuchi) {
  const p = 50 + naibu * 3.5 - kuchi * 1.5;
  return Math.round(Math.max(0, Math.min(100, p)));
}

// ---- 段階ラベル(5段階。低い人にも別の褒め方をする。min以上で該当、上から順に判定) ----
// 境目は総当たり(4^10通り)で各段階が約18〜22%になる値。noteは「冷笑系度の高さ」だけを言い、口に出す/出さない・ツッコミ量の多少には触れない(タイプ説明と矛盾させない)。
const REISHOU_LEVELS = [
  { min: 63, label: '名解説者クラス',         note: '冷笑系度はトップ層。場面の面白さを見つける力がいちばん強い人' },
  { min: 54, label: '観察眼キレッキレ',       note: '冷笑系度は高め。面白いポイントに気づく回数が多い人' },
  { min: 47, label: 'ツッコミと素直の黄金比', note: '冷笑系度は真ん中。ツッコミと素直さがちょうど半々の人' },
  { min: 38, label: 'ノリよしリアクション',   note: '冷笑系度は低め。ツッコミより、一緒に楽しむほうが先に来る人' },
  { min: 0,  label: '素直さ満点',             note: '冷笑系度は最少。ツッコむより先に笑える、場を温める人' },
];

function reishouLevel(purity) {
  return REISHOU_LEVELS.find((l) => purity >= l.min) || REISHOU_LEVELS[REISHOU_LEVELS.length - 1];
}

// ---- シェア文(企画書の型: 「私は〇〇!みんなは? #診断名 #ネタタグ」を本診断向けに調整) ----
// 例: 私の冷笑系度は72%、『心の中の副音声』タイプでした。口には出してないからセーフ(改行)みんなは何%? #冷笑系度診断 #心の中の副音声
// レア(nekketsu)も%は通常どおり計算した値を出す(50%前後に集まる。「ふり」が崩れた演出はsharetailで表現)。
function reishouShareText(id, purity) {
  const t = REISHOU_TYPES[id];
  return `私の冷笑系度は${purity}%、『${t.name}』タイプでした。${t.sharetail}
みんなは何%? #冷笑系度診断 ${t.sharetag}`;
}

// ===== ここまでreishou_content.jsの写し。ここから下はreishou.js独自 =====

// ---- 画面の文字に使う濃い色(タイプ名・%表示。白背景で4.5:1以上)。バーとカード画像は t.color のまま ----
const REISHOU_TEXT_COLORS = { jikkyo: '#b83a14', fukuonsei: '#1f5f8b', sunao: '#8a5f00', tatsukan: '#2f7a5a', nekketsu: '#b5175a' };

// ---- 判定(正本冒頭コメントの式。meroi.jsのcomputeMeloTypeと同じ形) ----
function reishouTypeId(naibu, kuchi) {
  if (Math.abs(naibu) + Math.abs(kuchi) <= 1) return 'nekketsu';
  if (naibu >= 0 && kuchi > 0) return 'jikkyo';
  if (naibu > 0) return 'fukuonsei';
  if (kuchi > 0) return 'sunao';
  return 'tatsukan';
}

// ---- スコア計算(純粋関数) ----
function computeReishouScores(answers) {
  let naibu = 0, kuchi = 0;
  answers.forEach((a) => {
    if (a.axis === 'naibu') naibu += a.weight;
    else kuchi += a.weight;
  });
  return { naibu, kuchi };
}

// ---- 「次はこれ」の季節切替: 日本時間の11/1〜12/25だけプレゼント診断、それ以外はメロい度 ----
function isPresentSeason(now) {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const m = jst.getUTCMonth() + 1;
  const d = jst.getUTCDate();
  return m === 11 || (m === 12 && d <= 25);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    REISHOU_QUESTIONS, REISHOU_TYPES, REISHOU_LEVELS, computeReishouPurity, reishouLevel, reishouShareText,
    reishouTypeId, computeReishouScores, isPresentSeason,
  };
}

// ===== ここから先はブラウザ実行のみ(DOM操作) =====
if (typeof document !== 'undefined') {
  (function () {
    const QUIZ = 'reishou';
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
    let lastResult = null; // { id, naibu, kuchi, purity }
    // シェアされた結果URLから開いた時はtrue(主ボタンを「自分も診断する」にする)
    let sharedView = false;

    // GA4イベント送信(ローカル開発時・GA未読込時は何もしない)
    function track(name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    }
    // 計測のmodeは既存診断と同じ値(シェアURL経由='gift'、本人='self')にそろえる
    function viewMode() { return sharedView ? 'gift' : 'self'; }

    // 画面に半分以上入ったら一度だけcbを呼ぶ(gift.jsのgiftObserveOnceと同じ動き。本ページはgift.jsを読み込まない)
    function observeOnce(el, cb) {
      if (!el || !cb || typeof IntersectionObserver === 'undefined') return;
      if (el._reishouObs) el._reishouObs.disconnect();
      const obs = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { obs.disconnect(); el._reishouObs = null; cb(); }
      }, { threshold: 0.5 });
      el._reishouObs = obs;
      obs.observe(el);
    }

    // スタート画面のバナーが無い(まだ用意していない)時は枠ごと隠す
    (function hideMissingBanner() {
      const img = document.querySelector('.start-banner img');
      if (!img) return;
      const hide = () => { img.parentElement.hidden = true; };
      if (img.complete && !img.naturalWidth) hide();
      else img.addEventListener('error', hide);
    })();

    // 「次はこれ」の2枚目を期間で切り替える(フレネミー度は常に表示)
    const presentSeason = isPresentSeason(new Date());
    (function setupNextQuiz() {
      const show = presentSeason ? 'present' : 'meroi';
      document.querySelectorAll('.next-quiz-card[data-season]').forEach((el) => {
        el.hidden = el.dataset.next !== show;
      });
    })();

    function showScreen(name) {
      Object.values(screens).forEach((s) => s.classList.remove('active'));
      screens[name].classList.add('active');
    }

    function startQuiz() {
      track('quiz_start', { quiz_name: QUIZ });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= REISHOU_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = REISHOU_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / REISHOU_QUESTIONS.length) * 100}%`;
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(REISHOU_QUESTIONS.length));
      progressText.textContent = `${currentIndex + 1} / ${REISHOU_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        const av = document.createElement('div');
        av.className = 'avatar';
        av.textContent = '🎙️';
        wrap.appendChild(av);
      }
      const b = document.createElement('div');
      b.className = `bubble ${who}`;
      b.textContent = text;
      wrap.appendChild(b);
      chatLog.appendChild(wrap);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    function renderOptions(q) {
      chatOptions.innerHTML = '';
      q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        const num = document.createElement('span');
        num.className = 'option-num';
        num.textContent = String(i + 1);
        const txt = document.createElement('span');
        txt.className = 'option-text';
        txt.textContent = opt.text;
        btn.append(num, txt);
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

    function makeResult(naibu, kuchi) {
      return { id: reishouTypeId(naibu, kuchi), naibu, kuchi, purity: computeReishouPurity(naibu, kuchi) };
    }

    function showResult() {
      const { naibu, kuchi } = computeReishouScores(answers);
      lastResult = makeResult(naibu, kuchi);
      track('quiz_complete', { quiz_name: QUIZ, result_type: lastResult.id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // 結果に切り替わったことを読み上げで伝える(選択肢ボタンが消えてフォーカスが迷子にならないように)
      document.querySelector('#screen-result .result-title').focus();
    }

    function setResultTitle(t) {
      const title = document.querySelector('#screen-result .result-title');
      title.textContent = sharedView ? 'この人は' : 'あなたは';
      title.appendChild(document.createElement('wbr'));
      const span = document.createElement('span');
      span.className = 'grad-text';
      span.style.whiteSpace = 'nowrap';
      span.textContent = `「${t.name}」`;
      title.appendChild(span);
      title.appendChild(document.createTextNode('タイプ'));
    }

    function renderResult(result) {
      const t = REISHOU_TYPES[result.id];
      const partner = REISHOU_TYPES[t.compat.partner];
      const level = reishouLevel(result.purity);

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      setResultTitle(t);
      document.getElementById('nandere-name').textContent = t.name;
      document.getElementById('nandere-nickname').textContent = t.nickname;
      document.getElementById('nandere-tagline').textContent = t.tagline;
      document.getElementById('nandere-desc').textContent = t.description;
      document.getElementById('nandere-card').style.setProperty('--accent', t.color);
      document.getElementById('nandere-card').style.setProperty('--accent-text', REISHOU_TEXT_COLORS[result.id] || t.color);
      document.getElementById('nandere-rarity-wrap').style.display = t.rare ? 'block' : 'none';

      // 冷笑系度(0〜100の全域)と段階ラベル。レアも通常どおり計算した%を出す
      document.getElementById('nandere-purity-fill').style.width = `${result.purity}%`;
      document.getElementById('nandere-purity-label').textContent = `冷笑系度 ${result.purity}%`;
      document.getElementById('reishou-level-label').textContent = level.label;
      document.getElementById('reishou-level-note').textContent = level.note;

      // 相性
      setTypeIllust(document.getElementById('compat-emoji'), t.compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-percent').textContent = `相性 ${t.compat.percent}%`;
      document.getElementById('compat-note').textContent = t.compat.note;

      // 「次はこれ」欄の表示計測(next_quiz_clickの分母)。結果を出すたびに数え直す
      observeOnce(document.querySelector('.next-quiz'), () => {
        track('section_view', {
          quiz_name: QUIZ, result_type: result.id, placement: 'next_card', mode: viewMode(),
          season: presentSeason ? 'present' : 'normal',
        });
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?n=${result.naibu}&k=${result.kuchi}`;
    }

    const COPY_LABEL = '結果URLをコピー 🔗';
    let copyTimer = null;
    function setCopyLabel(btn, text) {
      btn.textContent = text;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { btn.textContent = COPY_LABEL; }, 2000);
    }
    function copyResultUrl() {
      if (!lastResult) return;
      const btn = document.getElementById('btn-copy-url');
      if (!navigator.clipboard) { setCopyLabel(btn, 'コピーできませんでした'); return; }
      navigator.clipboard.writeText(resultUrl(lastResult)).then(() => {
        track('copy_url', { quiz_name: QUIZ, result_type: lastResult.id });
        setCopyLabel(btn, 'コピーしました!');
      }).catch(() => {
        setCopyLabel(btn, 'コピーできませんでした');
      });
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = reishouShareText(lastResult.id, lastResult.purity);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: QUIZ, content_type: QUIZ, item_id: lastResult.id, mode: sharedView ? 'gift' : 'self' });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = reishouShareText(lastResult.id, lastResult.purity);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: QUIZ, content_type: QUIZ, item_id: lastResult.id, mode: sharedView ? 'gift' : 'self' });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    // 「次はこれ」カードと文字リンクのクリック計測(同じタブで遷移するのでbeacon)。targetで行き先を区別する
    document.querySelectorAll('.next-quiz-card, .follow-links a[data-next]').forEach((el) => {
      el.addEventListener('click', () => {
        track('next_quiz_click', {
          quiz_name: QUIZ, target: el.dataset.next, mode: viewMode(),
          placement: el.classList.contains('next-quiz-card') ? 'next_card' : 'follow_links', transport_type: 'beacon',
        });
      });
    });

    // 主ボタンの入れ替え(sharedViewでは「自分も診断する」を先頭・主ボタンにする)
    function setPrimaryButtons(shared) {
      const restartBtn = document.getElementById('btn-restart');
      const xBtn = document.getElementById('btn-share');
      if (shared) {
        restartBtn.className = 'btn-primary';
        xBtn.className = 'btn-secondary';
        restartBtn.textContent = '自分も診断する 🎙️';
        restartBtn.parentNode.prepend(restartBtn);
      } else {
        xBtn.className = 'btn-primary';
        restartBtn.className = 'btn-secondary';
        restartBtn.textContent = 'もう一度診断する';
        xBtn.parentNode.prepend(xBtn);
        restartBtn.parentNode.appendChild(restartBtn);
      }
    }

    function restartQuiz() {
      lastResult = null;
      sharedView = false;
      setPrimaryButtons(false);
      history.replaceState(null, '', location.pathname);
      startQuiz();
    }

    // ===== 結果カード画像生成(present.js/frenemy.jsと同じ描き方。冷笑系度%+段階ラベル+相性つき) =====
    const CARD_PAL = {
      bg1: '#eef3ff', bg2: '#f4efff', bg3: '#fff4ea',
      primaryDark: '#3a56b0', text: '#3f4554', sub: '#8790a6',
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
        [w * 0.85, h * 0.15, w * 0.30, '#d8e2ff'],
        [w * 0.15, h * 0.92, w * 0.28, '#ffe3cc'],
        [w * 0.65, h * 0.88, w * 0.22, '#e6dcff'],
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

    // タイプ別イラスト(img/types/reishou-<id>.jpg)。読み込めない時は絵文字のまま
    function typeImgSrc(id) {
      return `img/types/reishou-${id}.jpg`;
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
        if (el.dataset.illust !== id) return;
        if (!img) { el.textContent = t.emoji; return; }
        const c = img.cloneNode();
        c.className = cls;
        c.alt = '';
        el.replaceChildren(c);
      });
    }

    function drawReishouCard(ctx, W, H, result, opts) {
      const t = REISHOU_TYPES[result.id];
      const partner = REISHOU_TYPES[t.compat.partner];
      const level = reishouLevel(result.purity);
      cardDrawBackground(ctx, W, H);
      ctx.textBaseline = 'middle';

      const circleY = opts.circleY, circleR = opts.circleR;
      ctx.save();
      ctx.shadowColor = 'rgba(90,100,140,0.28)';
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

      ctx.font = `700 ${opts.eyebrowSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText('冷笑系度診断 RESULT', W / 2, y);
      y += opts.eyebrowGap;

      const fit = cardFitTextMultiline(ctx, `「${t.name}」`, W - 140, '900', "'Zen Maru Gothic', sans-serif", opts.nameSize, opts.nameMinSize, 1);
      ctx.font = `900 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(fit.lines[0], W / 2, y);
      y += opts.nameGap;

      const nickFit = cardFitTextMultiline(ctx, t.nickname, W - 160, '700', "'Zen Maru Gothic', sans-serif", opts.nicknameSize, opts.nicknameSize - 8, 1);
      ctx.font = `700 ${nickFit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.text;
      ctx.fillText(nickFit.lines[0], W / 2, y);
      y += opts.nicknameGap;

      // 冷笑系度+段階ラベル(レアは出現率も添える)
      const badgeText = t.rare
        ? `冷笑系度 ${result.purity}%|${level.label}(出現率 約5%)`
        : `冷笑系度 ${result.purity}%|${level.label}`;
      ctx.font = `700 ${opts.badgeFont}px 'Zen Maru Gothic', sans-serif`;
      const bw = Math.min(ctx.measureText(badgeText).width + opts.badgeFont * 2, W - 80);
      const bh = opts.badgeFont * 2;
      ctx.fillStyle = t.color;
      cardRoundRect(ctx, W / 2 - bw / 2, y - bh / 2, bw, bh, bh / 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(badgeText, W / 2, y + 2, W - 120);
      y += opts.badgeGap;

      ctx.font = `600 ${opts.compatFont}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText(`相性◎ ${partner.emoji} ${partner.name}(${t.compat.percent}%)`, W / 2, y);
      y += opts.compatGap;

      ctx.strokeStyle = 'rgba(130,140,175,0.28)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - opts.lineHalf, y);
      ctx.lineTo(W / 2 + opts.lineHalf, y);
      ctx.stroke();
      y += opts.ctaGap;

      ctx.fillStyle = CARD_PAL.primaryDark;
      ctx.font = `700 ${opts.ctaSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillText('あなたの冷笑系度は? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 「冷笑系度診断」で検索', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildReishouCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawReishouCard(canvas.getContext('2d'), 1080, 1920, result, {
          illust,
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowSize: 30, eyebrowGap: 90,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 26, brandOffset: 46,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawReishouCard(canvas.getContext('2d'), 1200, 630, result, {
          illust,
          circleY: 130, circleR: 85, gapAfterCircle: 44, eyebrowSize: 22, eyebrowGap: 52,
          nameSize: 52, nameMinSize: 32, nameGap: 56,
          nicknameSize: 26, nicknameGap: 48,
          badgeFont: 22, badgeGap: 50,
          compatFont: 21, compatGap: 34,
          lineHalf: 300, ctaGap: 38, ctaSize: 26, brandSize: 18, brandOffset: 28,
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
        const canvas = buildReishouCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = `冷笑系度診断の結果カード:${REISHOU_TYPES[result.id].name}、冷笑系度${result.purity}%`;
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
      if (btn.disabled) return;
      const original = btn.textContent;
      btn.textContent = '生成中…';
      btn.disabled = true;
      track('save_card', { quiz_name: QUIZ, card_format: mode });
      try {
        const canvas = buildReishouCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `reishou-shindan-${lastResult.id}-${mode}.png`;
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
      const naibu = parseInt(nRaw, 10);
      const kuchi = parseInt(kRaw, 10);
      if (!Number.isFinite(naibu) || !Number.isFinite(kuchi)) return;
      if (Math.abs(naibu) > 10 || Math.abs(kuchi) > 10) return;
      lastResult = makeResult(naibu, kuchi);
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      setPrimaryButtons(true);
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
