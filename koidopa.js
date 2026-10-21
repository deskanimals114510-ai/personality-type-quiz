'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== ここからkoidopa_content.js(診断ツール群/MBTI診断/、文言の正本)の写し。文言を直す時は正本を直してからここへ写す =====
// ===== 恋のドパガキ度診断(新規単発、全10問、2026-10-17。Fable執筆) =====
// 流行語「ドパガキ」をもとにした、恋愛・推しへの「ときめきに飛びつく速さ×冷めるまでの速さ」のノリ診断。
// 競合(ほかの「見すぎ」を測る型)とは別物として、場面はすべて恋愛・推し・恋バナ・デートに限る。
// 書式は meroru_content.js(設問2軸×5問・4択weight)と app/meroi.js・app/frenemy.js(タイプ定義・%・シェア文)に合わせた。
//
// 軸: tobitsuki=飛びつき(+新しいときめきにすぐ飛びつく/-ゆっくり好きになる)
//     samero=冷め(+冷めるのが早い/-なかなか冷めない)
// 判定は meroi.js の computeMeloType と同じ形:
//   |tobitsuki|+|samero|<=1 → hanabi(レア)
//   tobitsuki>=0 かつ samero>0 → surfer(速×早=恋の流行サーファー)
//   tobitsuki>0             → numa(速×冷めない=沼ダイバー)
//   samero>0                → shishoku(ゆっくり×早=ときめき試食家)
//   それ以外                → shokunin(ゆっくり×冷めない=マイペース職人)
//   ※飛びつきがちょうど0で冷めない人は、「沼ダイバー」ではなく「マイペース職人」側に入れる(meroi.jsのmystery扱いと同じ考え方)
//
// 書かないこと: 企画書 新診断3本_企画_2026-10-17.md の「5名概念レビュー後の決定」3(禁止語・禁止場面の一覧)に従う。
// 加えて、実在のサービス名・作品名、性別に寄せた言い方、年齢層の明記もしない。

// ---- 免責文(開始画面と結果画面の両方に置く) ----
const KOIDOPA_DISCLAIMER = '流行語「ドパガキ」をもとにした遊びの診断です。医学的・心理学的な判定ではありません。';

// ---- 設問データ: 2軸(tobitsuki=飛びつき, samero=冷め)×各5問、4択(weight -2/-1/+1/+2) ----
const KOIDOPA_QUESTIONS = [
  { axis: 'tobitsuki', text: '友達が「この人めっちゃいいよ」と知らない推し候補を見せてきた。あなたは?', opts: [
    { text: 'その場で名前を覚えて、帰り道にはもう出ている動画を見始めている', weight: 2 },
    { text: '「へー」と聞いておく。何度か名前を見かけたら、そのうち調べるかも', weight: -1 },
    { text: '気になったらその日のうちに少し調べる。ハマるかはそれ次第', weight: 1 },
    { text: '友達が好きなのはわかった。自分の推しは自分で見つけたい', weight: -2 },
  ]},
  { axis: 'samero', text: '半年前に「一生推す」と言っていた相手。今の自分はどうなっている?', opts: [
    { text: '今も毎日ちゃんと追っている。むしろ好きが深くなった', weight: -2 },
    { text: '正直、別の推しの話を熱く語っている。半年前の自分がなつかしい', weight: 2 },
    { text: '熱は少し落ちたけど、新しい情報が出ればちゃんと見る', weight: -1 },
    { text: '好きは好き。でも「一生」はちょっと言い過ぎだったかも、と思っている', weight: 1 },
  ]},
  { axis: 'tobitsuki', text: '初対面で目が合って、少し話した相手。「この人、いいな」と思うのはいつ?', opts: [
    { text: '話した帰り道にはもう、次に会う口実を考えている', weight: 2 },
    { text: '何度か会って、ふだんの様子を見てから。じわじわ気づくタイプ', weight: -1 },
    { text: '二、三回話して「話しやすいな」と思ったあたりから', weight: 1 },
    { text: 'かなり時間がかかる。「あれ、好きかも」に気づくのは周りより遅い', weight: -2 },
  ]},
  { axis: 'samero', text: '好きな人と初めて二人で出かけた。帰ってからの気持ちの動きは?', opts: [
    { text: '帰り道で「次はどこ行く?」と送っている。一週間ずっと楽しい気分', weight: -1 },
    { text: 'その夜は盛り上がる。でも数日たつと「あれ、どうだったっけ」と落ち着いてくる', weight: 1 },
    { text: 'ドキドキは当日だけ。次の予定が決まらないと、わりとすぐ日常に戻る', weight: 2 },
    { text: '帰ってからも、一か月くらいその日のことを思い返している', weight: -2 },
  ]},
  { axis: 'tobitsuki', text: '恋バナで「最近気になる人いる?」と聞かれた。あなたの答えは?', opts: [
    { text: '「います」。先週と違う名前が出てきて、友達が笑っている', weight: 2 },
    { text: '「いないかも」。でも実は、ずっと同じ人のことを考えている', weight: -2 },
    { text: '「気になるというか、話しやすい人はいる」と慎重に言う', weight: -1 },
    { text: '「ちょっといる」。会ったばかりの人の話をしてしまう', weight: 1 },
  ]},
  { axis: 'samero', text: '推しがしばらく表に出てこない期間。あなたはどうしている?', opts: [
    { text: '過去の出番を見返しながら待てる。待つのも推す時間のうち', weight: -2 },
    { text: 'ふと別の人が目に入って、気づいたらそっちの話をしている', weight: 2 },
    { text: '待つけど、そのあいだに別の人も気になり始めている', weight: 1 },
    { text: '少し寂しい。でも戻ってきたら、すぐ元の温度に戻る', weight: -1 },
  ]},
  { axis: 'tobitsuki', text: '友達から新しい作品を勧められた。主役にひと目でひかれた。その後は?', opts: [
    { text: 'その日のうちに最後まで見て、翌朝には友達に感想を送っている', weight: 2 },
    { text: 'とりあえず最初だけ見る。続きは週末にゆっくり', weight: 1 },
    { text: '気になるけど、今追っているものが終わってから', weight: -1 },
    { text: 'ひと目でひかれても、好きになるかは何話か見てから決める', weight: -2 },
  ]},
  { axis: 'samero', text: '長く好きだった相手との関係が、落ち着いたものになってきた。あなたの気持ちは?', opts: [
    { text: 'ドキドキが減ったぶん、安心が増えた。これはこれで好き', weight: -1 },
    { text: 'ときめきが減ると、気持ちも静かに薄れていく感じがする', weight: 2 },
    { text: '落ち着いても、好きの量は変わらない。むしろ落ち着いた関係が一番いい', weight: -2 },
    { text: '少し物足りない。たまに別のときめきがほしくなる', weight: 1 },
  ]},
  { axis: 'tobitsuki', text: 'デートの予定を立てるとき。あなたのやり方は?', opts: [
    { text: '話が出た瞬間に日付を押さえる。候補の店は三つすぐ出てくる', weight: 2 },
    { text: '「いつか行こうね」からが長い。相手に決めてもらうことも多い', weight: -2 },
    { text: '盛り上がったら決める。ノリで決めた予定のほうが楽しい', weight: 1 },
    { text: 'お互いの予定を見てから。急がず、無理のない日を選ぶ', weight: -1 },
  ]},
  { axis: 'samero', text: '告白するか迷っていた相手。気持ちが「終わる」のは、どんなとき?', opts: [
    { text: 'ほかに気になる人ができたら、わりとあっさり切り替わる', weight: 2 },
    { text: '終わらない。向こうに恋人ができても、しばらく好きなまま', weight: -2 },
    { text: '向こうに脈がないとわかれば、少しずつ終わっていく', weight: 1 },
    { text: 'きっかけがないと終わらない。ふと気づくと数年たっている', weight: -1 },
  ]},
];

// ---- タイプ定義(結果見出しは「あなたは「{name}」」) ----
// description は「当たりすぎ」と思わせる日常の具体描写(300〜400字)。長所として読める書き方にし、直し方の助言は書かない。
// sharetag はシェア文の2つ目(ネタ)タグ、shareline はシェア文の名前の後ろに続く一言。
const KOIDOPA_TYPES = {
  surfer: {
    emoji: '🏄', name: '恋の流行サーファー',
    nickname: '新しい波を誰より早く見つける人',
    tagline: '見つけるのも早い。次に行くのも早い',
    color: '#1f8fbf',
    description: '友達に「最近なにハマってるの?」と聞かれるたび、答えが変わっている人。新しい推しを見つけた夜は、出ている動画を一気に追いかけて、翌朝には友達に「見て」と送っている。好きな人ができるのも早くて、目が合って三回話したあたりで「あ、好きかも」が始まる。ただ、その熱が一か月後も同じ温度かというと、本人も自信がない。恋バナでは「先週と名前ちがうじゃん」と笑われるのが定番です。でもこれは、面白いものを見つける速さが人より段違いなだけ。あなたが「これ良い」と言ったものを、半年後に周りが追いかけ始めることがよくあるはず。流行の先頭を走る人は、同じ場所に立ち止まらないのが普通。新しいときめきを人より多く味わえるのは、サーファーだけの特権です。',
    shareline: '飽きるのも早いけど見つけるのも早い',
    sharetag: '#先週と名前ちがうじゃん',
  },
  numa: {
    emoji: '🌊', name: '沼ダイバー',
    nickname: '飛び込んだら底まで行く人',
    tagline: '落ちるのは一瞬。浮上する予定はない',
    color: '#2b4f9e',
    description: '友達から新しい作品を勧められて、主役をひと目見た瞬間に「終わった」と思う人。その夜のうちに最後まで見て、翌日には過去の出番まで全部さかのぼっている。好きな人ができるのも早い。初対面で少し話した帰り道には、もう次に会う口実を考えている。そして、そこからが長い。半年たっても毎日ちゃんと追っているし、相手がしばらく表に出てこなくても、過去の場面を見返しながら平気で待てる。恋バナで出てくる名前が、ずっと同じ。友達は「まだ好きなの?」と聞くけれど、あなたにとっては「まだ」ではなく「ずっと」です。飛び込むのが早いのに、浅いところで引き返さない。見つけた瞬間から本気で、その本気が長く続く。ひとつの好きを深く掘れる人は、好きになった相手にとって、いちばん心強い味方です。',
    shareline: '落ちたら戻ってこない',
    sharetag: '#まだじゃなくてずっと',
  },
  shishoku: {
    emoji: '🍰', name: 'ときめき試食家',
    nickname: 'ひと口ずつ、ちゃんと味わう人',
    tagline: 'じっくり選んで、さっと次へ',
    color: '#c9704a',
    description: '友達に推しを勧められても、その場では飛びつかない。何度か名前を見かけて、気になったら自分のペースで調べる。好きな人ができるのも、周りよりゆっくり。二、三回話して「話しやすいな」と思ったあたりから、そっと気持ちが動き始めるタイプ。ところが、好きになったあとの切り替えは意外と早い。初めて二人で出かけた夜は盛り上がるのに、数日たつと「あれ、どうだったっけ」と気持ちが落ち着いている。恋バナで「で、どうなったの?」と聞かれて「もういいかな」と答え、友達に「早くない?」と言われたことがあるはず。でもこれは、自分の気持ちを確かめるのが上手いということ。好きになる前も、好きになったあとも、ちゃんと味わって判断している。流されて好きになったことがほとんどない人。その目の確かさは、ときめきをたくさん試してきた人だけのものです。',
    shareline: 'じっくり選んでさっと次へ',
    sharetag: '#ひと口で見極める',
  },
  shokunin: {
    emoji: '🪵', name: 'マイペース職人',
    nickname: '好きになるまでが長い、好きでいるのも長い人',
    tagline: 'ゆっくり火がついて、ずっと消えない',
    color: '#6b7a3a',
    description: '周りが「新しい推しできた!」と盛り上がっていても、あなたは自分の推しの話を変わらぬ温度でしている人。新しい作品を勧められても、「今追っているものが終わってから」とお気に入りを先に大事にする。好きな人ができるのも、かなりゆっくり。「あれ、好きかも」に気づくのが周りより遅くて、気づいたときには数か月たっている。そして気づいてしまったら、終わらない。向こうに恋人ができても、しばらく好きなまま。関係が落ち着いてドキドキが減っても、好きの量は変わらないどころか、落ち着いた関係こそ一番いいと思っている。恋バナで出す名前は数年前から同じで、友達は「あの人まだ推してるの?」ではなく「あの人といえばこの人」で覚えている。火がつくまでは長いけれど、ついた火はなかなか消えない。ひとつの好きを、何年もかけて育てていける人です。',
    shareline: '火がつくまで長いけど消えない',
    sharetag: '#あの人といえばこの人',
  },
  hanabi: {
    emoji: '🎆', name: '全部楽しい花火師',
    nickname: '速さも長さも、その日の気分で決める人',
    tagline: 'どっちでもない。だから全部楽しい',
    color: '#b5175a',
    rare: true,
    description: '速さも長さも、どちらにも針が振れなかった人。かなり少数派です。新しい推しを見つけた日は、その夜のうちに動画を一気に追いかけることもあるし、「そのうち調べるか」と寝ることもある。好きな人への気持ちも、一週間で静かに終わる恋と、数年続く恋の両方を知っている。恋バナで「どっちのタイプ?」と聞かれると、少し考えて「その時による」と答えて、友達に「ずるい」と言われるのが定番。でもこれは、ときめきの速さや長さに正解を決めていないということ。すぐ飛びつく自分も、じっくり好きになる自分も、どちらも本物として楽しめる。短く終わった好きを「無駄だった」と思わないし、長く続く好きを「重い」とも思わない。打ち上がる花火も、長く灯る花火も、どちらもきれいだと知っている人。恋と推しの楽しみ方が、いちばん広い人です。',
    shareline: '速いも長いも全部楽しい',
    sharetag: '#その時による',
  },
};

// ---- 相性のいいタイプ(序列は作らない: %は出さず、どの組み合わせも「いいところが噛み合う」書き方にする) ----
// 対応: surfer↔shishoku、numa↔shokunin、hanabi→surfer(花火師は相手の速さに合わせられるため、動きの大きいサーファーと組む)
const KOIDOPA_COMPAT = {
  surfer:   { partner: 'shishoku', note: 'ときめき試食家と組むと楽しい。あなたが見つけてきた新しい波を、試食家がひと口ずつ味わって「これは当たり」と教えてくれる。見つける速さと、見極める目。二人で回すと、推し探しも恋バナも一気に濃くなります。' },
  numa:     { partner: 'shokunin', note: 'マイペース職人と組むと落ち着く。飛び込む速さは違っても、好きが長く続くところが同じ。「まだ好きなの?」と聞いてこない相手は貴重です。お互いの推しの話を、何年も同じ温度で聞き合える関係になれます。' },
  shishoku: { partner: 'surfer',   note: '恋の流行サーファーと組むと退屈しない。サーファーが次々持ってくる新しい話題を、あなたが「それは好き、それは違う」と仕分ける。恋バナが止まらない二人です。あなたの「もういいかな」も、サーファーなら笑って受け止めてくれます。' },
  shokunin: { partner: 'numa',     note: '沼ダイバーと組むと安心する。あなたがゆっくり育ててきた好きを、ダイバーは「わかる、深いよね」と即答してくれる人。入り口の速さは違っても、着いている場所は同じ深さ。長く推す人同士の、静かで熱い会話ができます。' },
  hanabi:   { partner: 'surfer',   note: '恋の流行サーファーと組むと盛り上がる。サーファーが見つけてきた新しいときめきに、あなたはその日の気分で飛び込んだり眺めたりできる。どちらでも楽しめる人と、見つけるのが早い人。恋バナの話題が尽きない組み合わせです。' },
};

// ---- ドパガキ度% の段階ラベル(0〜100を5段階。病気になぞらえず「ときめきの勢い」で言い表す) ----
// %は2軸の合計なので、caption は勢い全体だけを言い、飛びつく速さ・冷める速さを個別に断定しない(タイプ文と矛盾させないため)。
// 境界(62/54/47/39/0)は全441組み合わせの総当たりで各段階が約19〜23%になる値。computeKoidopaLevel の順に判定する。
const KOIDOPA_LEVELS = [
  { min: 62, label: 'ときめき全開型',   caption: 'ときめきの勢いが、ぐんと強め' },
  { min: 54, label: 'ときめき活発型',   caption: 'ときめきの勢いが、やや強め' },
  { min: 47, label: 'ときめき中庸型',   caption: 'ときめきの勢いは、ちょうど真ん中' },
  { min: 39, label: 'ときめきおだやか型', caption: 'ときめきの勢いは、やや控えめ' },
  { min: 0,  label: 'ときめきしずか型',  caption: 'ときめきの勢いは、静かで落ち着きめ' },
];

// ---- 計算(meroi.js / frenemy.js の computeXxxScores / Type / Purity に対応) ----
function computeKoidopaScores(answers) {
  let tobitsuki = 0, samero = 0;
  answers.forEach((a) => {
    if (a.axis === 'tobitsuki') tobitsuki += a.weight;
    else samero += a.weight;
  });
  return { tobitsuki, samero };
}

function computeKoidopaType(tobitsuki, samero) {
  if (Math.abs(tobitsuki) + Math.abs(samero) <= 1) return 'hanabi';
  if (tobitsuki >= 0 && samero > 0) return 'surfer';
  if (tobitsuki > 0) return 'numa';
  if (samero > 0) return 'shishoku';
  // 飛びつきがちょうど0で冷めない人は、「沼ダイバー」ではなく「マイペース職人」側に入れる
  return 'shokunin';
}

// ドパガキ度(0〜100)は「飛びつく速さ」と「冷める速さ」の両方を足し合わせる。
// 各軸は -10〜+10 なので、(値+10)/20 で 0〜1 に直し、それぞれ50点ずつ配分する。
//   飛びつき+10・冷め+10(サーファーの極) → 100%
//   飛びつき-10・冷め-10(職人の極)       →   0%
//   沼ダイバー・試食家の極(片方だけ+10) →  50%前後、花火師(両軸0付近) → 50%前後
// frenemy.js の computeFrenemyPurity と同じく、四捨五入後に 0〜100 に収める。
function computeKoidopaPercent(tobitsuki, samero) {
  const p = ((tobitsuki + 10) / 20) * 50 + ((samero + 10) / 20) * 50;
  return Math.max(0, Math.min(100, Math.round(p)));
}

function computeKoidopaLevel(percent) {
  return KOIDOPA_LEVELS.find((lv) => percent >= lv.min) || KOIDOPA_LEVELS[KOIDOPA_LEVELS.length - 1];
}

// ---- シェア文(X / LINE 共通。meroi.js・frenemy.js の shareText と同じ役割) ----
// 型: 「恋のドパガキ度88%『恋の流行サーファー』でした🏄 飽きるのも早いけど見つけるのも早い #恋のドパガキ度診断 #ドパガキ #ネタタグ」
function koidopaShareText(typeId, percent) {
  const t = KOIDOPA_TYPES[typeId];
  return `恋のドパガキ度${percent}%『${t.name}』でした${t.emoji} ${t.shareline}\nみんなは何%? #恋のドパガキ度診断 #ドパガキ ${t.sharetag}`;
}

// ===== ここまでkoidopa_content.jsの写し。ここから下はkoidopa.js独自 =====

// ---- 画面の文字に使う濃い色(タイプ名・%表示。白背景で4.5:1以上)。バーとカード画像は t.color のまま ----
const KOIDOPA_TEXT_COLORS = { surfer: '#16698f', numa: '#2b4f9e', shishoku: '#a3532f', shokunin: '#5e6b30', hanabi: '#b5175a' };

// ---- 「次はこれ」の季節切替: 日本時間の11/1〜12/25だけプレゼント診断、それ以外は何系にメロる? ----
function isPresentSeason(now) {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const m = jst.getUTCMonth() + 1;
  const d = jst.getUTCDate();
  return m === 11 || (m === 12 && d <= 25);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KOIDOPA_DISCLAIMER, KOIDOPA_QUESTIONS, KOIDOPA_TYPES, KOIDOPA_COMPAT, KOIDOPA_LEVELS,
    computeKoidopaScores, computeKoidopaType, computeKoidopaPercent, computeKoidopaLevel, koidopaShareText,
    isPresentSeason,
  };
}

// ===== ここから先はブラウザ実行のみ(DOM操作) =====
if (typeof document !== 'undefined') {
  (function () {
    const QUIZ = 'koi_dopa';
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
    let lastResult = null; // { id, tobitsuki, samero, percent }
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
      if (el._koidopaObs) el._koidopaObs.disconnect();
      const obs = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { obs.disconnect(); el._koidopaObs = null; cb(); }
      }, { threshold: 0.5 });
      el._koidopaObs = obs;
      obs.observe(el);
    }

    // 免責文は正本の定数から入れる(HTMLにも同じ文を置いてあるのでJSが止まっても表示される)
    document.querySelectorAll('[data-koidopa-disclaimer]').forEach((el) => { el.textContent = KOIDOPA_DISCLAIMER; });

    // スタート画面のバナーが無い(まだ用意していない)時は枠ごと隠す
    (function hideMissingBanner() {
      const img = document.querySelector('.start-banner img');
      if (!img) return;
      const hide = () => { img.parentElement.hidden = true; };
      if (img.complete && !img.naturalWidth) hide();
      else img.addEventListener('error', hide);
    })();

    // 「次はこれ」の2枚目を期間で切り替える(メロい度は常に表示)
    const presentSeason = isPresentSeason(new Date());
    (function setupNextQuiz() {
      const show = presentSeason ? 'present' : 'meroru';
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
      if (currentIndex >= KOIDOPA_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = KOIDOPA_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / KOIDOPA_QUESTIONS.length) * 100}%`;
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(KOIDOPA_QUESTIONS.length));
      progressText.textContent = `${currentIndex + 1} / ${KOIDOPA_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        const av = document.createElement('div');
        av.className = 'avatar';
        av.textContent = '💓';
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

    // レア(花火師)も%は通常どおり計算した値を出す
    function makeResult(tobitsuki, samero) {
      return {
        id: computeKoidopaType(tobitsuki, samero), tobitsuki, samero,
        percent: computeKoidopaPercent(tobitsuki, samero),
      };
    }

    function showResult() {
      const { tobitsuki, samero } = computeKoidopaScores(answers);
      lastResult = makeResult(tobitsuki, samero);
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
    }

    function renderResult(result) {
      const t = KOIDOPA_TYPES[result.id];
      const compat = KOIDOPA_COMPAT[result.id];
      const partner = KOIDOPA_TYPES[compat.partner];
      const level = computeKoidopaLevel(result.percent);

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      setResultTitle(t);
      document.getElementById('nandere-name').textContent = t.name;
      document.getElementById('nandere-nickname').textContent = t.nickname;
      document.getElementById('nandere-tagline').textContent = t.tagline;
      document.getElementById('nandere-desc').textContent = t.description;
      document.getElementById('nandere-card').style.setProperty('--accent', t.color);
      document.getElementById('nandere-card').style.setProperty('--accent-text', KOIDOPA_TEXT_COLORS[result.id] || t.color);
      document.getElementById('nandere-rarity-wrap').style.display = t.rare ? 'block' : 'none';

      // 恋のドパガキ度(0〜100)と段階ラベル
      document.getElementById('nandere-purity-fill').style.width = `${result.percent}%`;
      document.getElementById('nandere-purity-label').textContent = `恋のドパガキ度 ${result.percent}%`;
      document.getElementById('koidopa-level-label').textContent = level.label;
      document.getElementById('koidopa-level-caption').textContent = level.caption;

      // 相性(%も序列も出さない)
      setTypeIllust(document.getElementById('compat-emoji'), compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-note').textContent = compat.note;

      // 「次はこれ」欄の表示計測(next_quiz_clickの分母)。結果を出すたびに数え直す
      observeOnce(document.querySelector('.next-quiz'), () => {
        track('section_view', {
          quiz_name: QUIZ, result_type: result.id, placement: 'next_card', mode: viewMode(),
          season: presentSeason ? 'present' : 'normal',
        });
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?t=${result.tobitsuki}&s=${result.samero}`;
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
      const text = koidopaShareText(lastResult.id, lastResult.percent);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: QUIZ, content_type: QUIZ, item_id: lastResult.id, mode: sharedView ? 'gift' : 'self' });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = koidopaShareText(lastResult.id, lastResult.percent);
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

    // 主ボタンの入れ替え
    //   本人: 縦長保存(主)→ヒント→X→LINE→URL→もう一度
    //   シェアURL経由: 「自分も診断する」(主)→縦長保存→ヒント→X→LINE→URL
    function setPrimaryButtons(shared) {
      const box = document.getElementById('koidopa-actions');
      const restartBtn = document.getElementById('btn-restart');
      const storyBtn = document.getElementById('btn-save-card-story');
      if (shared) {
        restartBtn.className = 'btn-primary';
        storyBtn.className = 'btn-secondary koidopa-story-btn';
        restartBtn.textContent = '自分も診断する 💓';
        box.prepend(restartBtn);
      } else {
        storyBtn.className = 'btn-primary koidopa-story-btn';
        restartBtn.className = 'btn-secondary';
        restartBtn.textContent = 'もう一度診断する';
        box.appendChild(restartBtn);
      }
    }

    function restartQuiz() {
      lastResult = null;
      sharedView = false;
      setPrimaryButtons(false);
      history.replaceState(null, '', location.pathname);
      startQuiz();
    }

    // ===== 結果カード画像生成(reishou.jsと同じ描き方。恋のドパガキ度%+段階ラベル+相性つき、相性に%は出さない) =====
    const CARD_PAL = {
      bg1: '#fff0f6', bg2: '#f4efff', bg3: '#eef6ff',
      primaryDark: '#b5175a', text: '#3f4554', sub: '#8790a6',
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
        [w * 0.85, h * 0.15, w * 0.30, '#ffd6e6'],
        [w * 0.15, h * 0.92, w * 0.28, '#d8eaff'],
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

    // タイプ別イラスト(img/types/koidopa-<id>.jpg)。読み込めない時は絵文字のまま
    function typeImgSrc(id) {
      return `img/types/koidopa-${id}.jpg`;
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

    function drawKoidopaCard(ctx, W, H, result, opts) {
      const t = KOIDOPA_TYPES[result.id];
      const partner = KOIDOPA_TYPES[KOIDOPA_COMPAT[result.id].partner];
      const level = computeKoidopaLevel(result.percent);
      cardDrawBackground(ctx, W, H);
      ctx.textBaseline = 'middle';

      const circleY = opts.circleY, circleR = opts.circleR;
      ctx.save();
      ctx.shadowColor = 'rgba(140,90,120,0.28)';
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
      ctx.fillText('恋のドパガキ度診断 RESULT', W / 2, y);
      y += opts.eyebrowGap;

      const fit = cardFitTextMultiline(ctx, `「${t.name}」`, W - 140, '900', "'Zen Maru Gothic', sans-serif", opts.nameSize, opts.nameMinSize, 1);
      ctx.font = `900 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(fit.lines[0], W / 2, y);
      y += opts.nameGap;

      const nickFit = cardFitTextMultiline(ctx, t.nickname, W - 160, '700', "'Zen Maru Gothic', sans-serif", opts.nicknameSize, opts.nicknameSize - 10, 1);
      ctx.font = `700 ${nickFit.size}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.text;
      ctx.fillText(nickFit.lines[0], W / 2, y);
      y += opts.nicknameGap;

      // 恋のドパガキ度+段階ラベル(レアは出現率も添える)
      const badgeText = t.rare
        ? `恋のドパガキ度 ${result.percent}%|${level.label}(出現率 約5%)`
        : `恋のドパガキ度 ${result.percent}%|${level.label}`;
      ctx.font = `700 ${opts.badgeFont}px 'Zen Maru Gothic', sans-serif`;
      const bw = Math.min(ctx.measureText(badgeText).width + opts.badgeFont * 2, W - 80);
      const bh = opts.badgeFont * 2;
      ctx.fillStyle = t.color;
      cardRoundRect(ctx, W / 2 - bw / 2, y - bh / 2, bw, bh, bh / 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(badgeText, W / 2, y + 2, W - 120);
      y += opts.badgeGap;

      // 相性(%は出さない)
      ctx.font = `600 ${opts.compatFont}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText(`相性◎ ${partner.emoji} ${partner.name}`, W / 2, y);
      y += opts.compatGap;

      ctx.strokeStyle = 'rgba(160,130,160,0.28)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - opts.lineHalf, y);
      ctx.lineTo(W / 2 + opts.lineHalf, y);
      ctx.stroke();
      y += opts.ctaGap;

      ctx.fillStyle = CARD_PAL.primaryDark;
      ctx.font = `700 ${opts.ctaSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillText('あなたの恋のドパガキ度は? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 「恋のドパガキ度診断」で検索', W / 2, y + opts.brandOffset);
      // 画像だけが出回ることがあるので、縦長・横長とも免責文を小さく添える(横長は1行)
      if (opts.disclaimerSize) {
        ctx.font = `600 ${opts.disclaimerSize}px 'Zen Maru Gothic', sans-serif`;
        const dl = cardFitTextMultiline(ctx, KOIDOPA_DISCLAIMER, W - 160, '600', "'Zen Maru Gothic', sans-serif", opts.disclaimerSize, opts.disclaimerSize - 4, opts.disclaimerLines || 2);
        ctx.font = `600 ${dl.size}px 'Zen Maru Gothic', sans-serif`;
        dl.lines.forEach((ln, i) => ctx.fillText(ln, W / 2, opts.disclaimerY + i * dl.size * 1.5));
      }
      ctx.textAlign = 'left';
    }

    function buildKoidopaCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawKoidopaCard(canvas.getContext('2d'), 1080, 1920, result, {
          illust,
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowSize: 30, eyebrowGap: 90,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 26, brandOffset: 46,
          disclaimerSize: 24, disclaimerY: 1800,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawKoidopaCard(canvas.getContext('2d'), 1200, 630, result, {
          illust,
          circleY: 130, circleR: 85, gapAfterCircle: 44, eyebrowSize: 22, eyebrowGap: 52,
          nameSize: 52, nameMinSize: 32, nameGap: 56,
          nicknameSize: 26, nicknameGap: 48,
          badgeFont: 22, badgeGap: 50,
          compatFont: 21, compatGap: 34,
          lineHalf: 300, ctaGap: 38, ctaSize: 26, brandSize: 18, brandOffset: 28,
          disclaimerSize: 15, disclaimerY: 602, disclaimerLines: 1,
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
        const canvas = buildKoidopaCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = `恋のドパガキ度診断の結果カード:${KOIDOPA_TYPES[result.id].name}、恋のドパガキ度${result.percent}%`;
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
        const canvas = buildKoidopaCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `koidopa-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?t=&s=)から直接開かれた場合は、その場で同じ結果を再現する
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const tRaw = params.get('t');
      const sRaw = params.get('s');
      if (!/^-?\d{1,2}$/.test(tRaw || '') || !/^-?\d{1,2}$/.test(sRaw || '')) return;
      const tobitsuki = parseInt(tRaw, 10);
      const samero = parseInt(sRaw, 10);
      if (!Number.isFinite(tobitsuki) || !Number.isFinite(samero)) return;
      if (Math.abs(tobitsuki) > 10 || Math.abs(samero) > 10) return;
      lastResult = makeResult(tobitsuki, samero);
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
