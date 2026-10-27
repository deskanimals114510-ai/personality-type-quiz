'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== 何系にメロる?診断(メロい度診断のスピンオフ、全10問、2026-10-14) =====
// メロい度診断(app/meroi.js)が「自分が何系のメロさを持つか」なのに対し、こちらは
// 「自分がどの系統の相手にメロってしまうか(好きになる・ドキッとする相手)」を判定する。
// 結果の5系統はメロい度と同じ名前・同じ動物(イラスト共用)。設問・結果文はFable執筆。
// 軸: kyori=相手の距離感(+自分から距離を詰めてくる人に弱い/-適度な距離を保つ・待ってくれる人に弱い)
//     hyogen=相手の表現(+気持ちをストレートに出す人に弱い/-さりげなく・行動で見せる人に弱い)
// 判定はmeroi.jsのcomputeMeloTypeと同じ:
//   |kyori|+|hyogen|<=1 → rare / kyori>=0かつhyogen>0 → wanko / kyori>0 → anshin / hyogen>0 → gap / それ以外 → mystery
//   wanko=詰めてくる×ストレート、anshin=そばにいるけど騒がない、gap=距離があるのにふいに全開、mystery=距離があってさりげない

// ---- 設問データ: 2軸(kyori=距離感, hyogen=表現)×各5問、4択(weight -2/-1/+1/+2) ----
const MERORU_QUESTIONS = [
  { axis: 'kyori', text: '新しいクラス・バイト先で初めて会った人。どんなふるまいにドキッとする?', opts: [
    { text: '目が合うと軽く話しかけてくれて、話す回数が少しずつ増えていく', weight: 1 },
    { text: '気づいたら毎回、自分の近くの席にいる。話すのが自然になっていた', weight: 2 },
    { text: '必要以上に近づいてこない。困ったときだけ、静かに手を貸してくれる', weight: -2 },
    { text: 'こっちが話しかけるまで待ってる。けど、話した内容はちゃんと覚えてる', weight: -1 },
  ]},
  { axis: 'hyogen', text: '自分の推しの話をしたとき、相手のどんな反応に心をつかまれる?', opts: [
    { text: '口数は少ないけど、ちゃんと聞いてくれているのが伝わる', weight: -1 },
    { text: 'ふだん静かな人なのに、この話題だけ「それ好き!わかる!」と声が大きくなる', weight: 2 },
    { text: '言葉は少ないまま、推しの名前をいつのまにか覚えてくれている', weight: -2 },
    { text: '「どこが好きなの?」と聞いて、自分の感想もちゃんと返してくれる', weight: 1 },
  ]},
  { axis: 'kyori', text: '仲良くなりかけの相手とのLINE。「この人いいな」と思う距離感は?', opts: [
    { text: 'あまり送ってこない。そのぶん会ったときは、ちゃんと目を見て話す', weight: -2 },
    { text: 'きっかけがあれば向こうから送ってくる。流れが自然に続く', weight: 1 },
    { text: '用事がなくても、毎日なにかしら送ってくる。やりとりが途切れない', weight: 2 },
    { text: 'こっちが送ると丁寧に返す。頻度はほどほどで、返事を急かさない', weight: -1 },
  ]},
  { axis: 'hyogen', text: '初めて作った料理やイラストを見せたとき、相手のどんな反応にやられる?', opts: [
    { text: '「いいね、ここ好き」と、気に入った場所をすぐ口に出す', weight: 1 },
    { text: '「いいと思う」と短く一言。言葉は少ないけど、ちゃんと見てくれている', weight: -1 },
    { text: '「えっ、すごい!」と声が出て、細かいところまで褒め続ける', weight: 2 },
    { text: '感想は言わない。かわりに、長いあいだ黙って眺めている', weight: -2 },
  ]},
  { axis: 'kyori', text: '遊びの約束。相手のどんな誘い方にときめく?', opts: [
    { text: '「来週空いてる?行こ!」と向こうから予定を押さえてくる', weight: 2 },
    { text: '「いつか行きたいね」と言って、こっちのペースを待ってくれる', weight: -1 },
    { text: '話の流れで「じゃあ今度行く?」と自然に提案してくれる', weight: 1 },
    { text: '自分からは誘ってこない。でも誘うと、予定を空けて来てくれる', weight: -2 },
  ]},
  { axis: 'hyogen', text: '遊んだ帰り、別れ際。相手のどんな一言やふるまいが残る?', opts: [
    { text: '「今日めっちゃ楽しかった!また行こ!」と全身で言ってくる', weight: 2 },
    { text: 'いつも通りの顔で解散。楽しかったことは、別の人から伝わってくる', weight: -2 },
    { text: '「楽しかった、ありがとう」と顔を見て言ってくれる', weight: 1 },
    { text: '言葉は「またね」だけ。角を曲がるまで、振り返って手を振っている', weight: -1 },
  ]},
  { axis: 'kyori', text: '自分がへこんでいる日。相手のどんな寄り添い方が刺さる?', opts: [
    { text: '距離はそのまま。「いつでも聞くよ」とだけ伝えてくる', weight: -1 },
    { text: '近くの席に移動してきて、普段どおりの話をしてくれる', weight: 1 },
    { text: '何も聞かずに隣に座って、帰る時間までずっと一緒にいてくれる', weight: 2 },
    { text: 'いつもと同じ態度で接してくれる。何があったかは聞いてこない', weight: -2 },
  ]},
  { axis: 'hyogen', text: '相手にうれしいことがあったらしい。どんな姿にドキッとする?', opts: [
    { text: '言葉にはしないけど、鼻歌が出ていて、歩くのが少し速い', weight: -1 },
    { text: 'ふだんはクールなのに、その日は自分から「聞いて!」と駆け寄ってくる', weight: 2 },
    { text: '「今日いいことあった」と報告して、ずっとにこにこしてる', weight: 1 },
    { text: '口にはしない。机の上の小物が、ひとつ新しくなっている', weight: -2 },
  ]},
  { axis: 'kyori', text: '休み時間や休憩中。相手がどこにいると気になる?', opts: [
    { text: '自分の場所で過ごしてる。目が合うと、小さく手を振ってくれる', weight: -1 },
    { text: '毎回、当たり前のように隣にいる。特別な話がなくても一緒に過ごす', weight: 2 },
    { text: '少し離れた場所で、自分の時間を過ごしている。呼べばすぐ来る', weight: -2 },
    { text: 'なんとなく近くにいることが多い。話したいときにすぐ話せる距離', weight: 1 },
  ]},
  { axis: 'hyogen', text: '自分が相手を助けた。どんな「ありがとう」に落ちる?', opts: [
    { text: '「マジで助かった、ありがとう!」と顔を見て言ってくる', weight: 1 },
    { text: '「ありがと」とさらっと一言。後日、お返しが机に置いてある', weight: -1 },
    { text: '普段は言葉が少ないのに、このときだけ「本当に助かった!」と何度も言ってくる', weight: 2 },
    { text: '言葉にはしない。こっちの好きなものを覚えていて、差し入れてくる', weight: -2 },
  ]},
];

// ---- タイプ定義(kei=メロる相手の系統。結果見出しは「あなたは「{kei}」にメロる人」) ----
const MERORU_TYPES = {
  wanko: {
    emoji: '🐶', kei: 'わんこ系', name: '全力わんこにメロる人',
    nickname: 'まっすぐな好意にいちばん弱い人',
    tagline: '好きを隠さない人に、弱い',
    color: '#d9481c',
    description: '会った瞬間に「来た!」と顔に出る人。あなたがドキッとするのは、好意を出し惜しみしない相手です。送った写真に、頼んでもいないのに感想が3つ返ってくる。約束の日は、向こうのほうが先に着いている。遠回しな駆け引きより、「会えてうれしい」をそのまま言ってくれる人に、気持ちが動く。理由はたぶん、相手の気持ちを探らなくていいから。安心して、自分も正直になれる。もちろん連絡のペースは、自分が心地いいところでいい。ただ、好意をまっすぐ受け取って、まっすぐ返せるのは、あなた自身の素直さです。それ、けっこう強みです。',
    howto: '気持ちは同じ速度で返す。「うれしい」をそのまま言葉にするだけ',
  },
  anshin: {
    emoji: '🐻', kei: 'ゆるくま系', name: 'ほっこり安心にメロる人',
    nickname: '騒がない人のそばで息がしやすい人',
    tagline: '騒がないのに、そばにいる人に弱い',
    color: '#8a5a1e',
    description: 'にぎやかな場所で、ひとりだけテンションが変わらない人がいる。あなたの目が止まるのは、そういう相手です。いつも近くにいるのに、無理に話題を作らない。こっちが黙っていても、気を遣わせない。帰り道、たいした話をしなかったのに「今日はよかったな」と思える。派手なアプローチより、「一緒にいる時間が楽」という感覚で気持ちが動くタイプ。だからあなたは、一発の盛り上がりに流されにくい。相手の落ち着きを心地よさとして受け取れるのは、関係を長く育てていける人の感覚です。急がなくていい。その感覚は、信じていいと思います。',
    howto: '盛り上げなくていい。同じ場所で、同じ時間をゆっくり過ごす',
  },
  gap: {
    emoji: '🐱', kei: 'ツンねこ系', name: 'ギャップ全開にメロる人',
    nickname: 'クールが崩れる瞬間を見逃さない人',
    tagline: 'ふいの全開に、やられる',
    color: '#6a3fa0',
    description: 'いつも一歩引いた場所にいて、必要なこと以外はあまり話さない人。それが、好きなものの話になった途端に目の色が変わる。身を乗り出して、声が大きくなって、言い終わってから「しゃべりすぎた」と照れる。あなたが落ちるのは、その数十秒です。普段が静かだからこそ、全開になった瞬間の熱がまっすぐ届く。気持ちを隠しているわけではなく、出す場面を選んでいる人。その「選ばれた場面」に立ち会えたとき、あなたは一番ドキッとする。見た目の印象で人を決めず、変化する瞬間に気づける。それは観察力というより、人を面白がる才能です。',
    howto: '全開になった瞬間を笑わない。「もっと聞かせて」とだけ言う',
  },
  mystery: {
    emoji: '🦊', kei: 'きつね系', name: '読めない余韻にメロる人',
    nickname: '語られなかった部分が気になる人',
    tagline: '全部は見せない人に、弱い',
    color: '#1f5f8b',
    description: '話の途中で、ふっと別のことを考えているような表情をする人。あなたが気になってしまうのは、全部を言葉にしない相手です。質問には答えるけれど、自分からはあまり語らない。たまに出てくる一言が、どこで考えたのか分からないほど深い。こっちの冗談に、笑うかわりに少し間を置いて「それ、いいね」と返す。あなたは、その「間」に気持ちを動かされるタイプ。知りたい、でも全部知ったら終わる気もする。その感覚を楽しめるのは、相手を急いで分類しない人だけです。分からない部分を、分からないまま大切にできる。余白を楽しむ力、ちゃんと持っています。',
    howto: '全部聞き出そうとしない。相手の一言を覚えておいて、あとで返す',
  },
  rare: {
    emoji: '🦦', kei: 'カワウソ系', name: '系統にない一点にメロる人',
    nickname: '説明できない一点で落ちる激レア',
    tagline: '何系でもない。その人だから',
    color: '#b5175a',
    rare: true,
    description: '診断上、どの系統にも寄らなかった人。珍しいです。カワウソ系とは、わんこでもくまでも猫でもきつねでもない、「説明できない一点」を持っている人のこと。あなたがメロるのは、そういう人です。「どこが好きなの?」と聞かれると、うまく答えられない。でも自分の中では、はっきりしている。考えるときに窓の外を見る間とか、笑ったあとに一回だけうなずくところとか。型に当てはまらない部分を、欠点ではなく魅力として受け取れる。これは好みが広いのではなく、人を型で見ていないということ。その一点をずっと見ていられる誠実さが、あなたの持ち味です。',
    howto: 'その一点を、褒め言葉として本人に伝えてみる。たぶん初めて言われる',
  },
};

// ---- その系統の相手をメロらせやすいのは何系か(メロい度診断への導線) ----
// キー=メロる相手の系統(左)、文中の系統=メロらせやすい「自分」の系統(右)。右が左をメロらせる向きで書く。
// 対応: wanko←gap、anshin←wanko、gap←anshin、mystery←rare、rare←mystery
const MERORU_COMPAT_NOTE = {
  wanko:   'わんこ系をメロらせやすいのは、ツンねこ系かも。クールな相手がたまに見せる本気に、わんこは照れてしまう。あなたは何系?',
  anshin:  'ゆるくま系をメロらせやすいのは、わんこ系かも。静かな隣に全力の好意が飛び込むと、くまの顔がほどける。あなたは何系?',
  gap:     'ツンねこ系をメロらせやすいのは、ゆるくま系かも。安心できる相手の前でだけ、猫は全開になりやすい。さて、あなたは何系?',
  mystery: 'きつね系をメロらせやすいのは、カワウソ系かも。型に当てはまらない相手の前では、きつねも余韻を残しきれない。あなたは何系?',
  rare:    'カワウソ系をメロらせやすいのは、きつね系かも。何でも受け止める人が、余韻を残す相手の前だけ言葉に迷う。あなたは何系?',
};

// ---- おすすめ欄の理由文(商品はmeroi.jsのMELO_GIFTSと同じ各タイプ2品。視点は「あなたがメロる系統の人へ贈る」、2026-10-28 Fable) ----
// 配列の順序はMELO_GIFTSの品目順(wanko: 缶バッジカバー/スマホショルダー、anshin: もこもこルームソックス/ひざ掛けブランケット、
// gap: トレカケースとスリーブ/クリアショルダーバッグ、mystery: 大きめバンスクリップ/揺れるイヤーカフ、rare: フレークシールセット/シール帳バインダー)
const MERORU_GIFT_REASON = {
  wanko:   ['好きを胸に付けて歩く人の、その一つひとつに透明な守りを。', 'すぐ返したい人の両手を、スマホごと自由にしてあげる。'],
  anshin:  ['何も言わずに隣にいる人の足元へ、やわらかい温度を。', '同じ部屋で過ごす時間ごと、ふわりと包んでおく。'],
  gap:     ['普段は素っ気ない人が、唯一ゆるめない場所を一枚ずつ守る。', '推しの前でだけ全開になる人に、好きが透けて見える鞄を。'],
  mystery: ['全部は見せない人の髪を、ひと動作で軽くまとめる余裕を。', '読めない人の横顔に、ふと目で追いたくなる揺れをひとつ。'],
  rare:    ['型に収まらない人の日々を、気ままに貼って彩る小さな一枚。', '誰とも違うその人の好きを、増やして並べ替えられる一冊に。'],
};

// ---- 参考: meroi.js MELO_COMPAT の note 修正案(gap・rareの2件は「左(本人)が右(partner)をメロらせる」向きと逆になっているため) ----
// percentは変えない。meroi.js側へ反映するかは別途判断。
// ---- いちばんメロメロにしやすい相手: メロい度診断のMELO_COMPAT(左が右をメロらせやすい)の逆引き。
// 「あなたがメロる系統」を、どの系統の人がメロらせやすいか(=あなたは何系?→メロい度診断へ)
const MERORU_MELTER = { wanko: 'gap', anshin: 'wanko', gap: 'anshin', mystery: 'rare', rare: 'mystery' };

const AFFILIATE_TAG = 'tinywonders-22';

// meroi.jsと同じ価格帯(band 1=〜¥1,500・2=¥1,500〜3,000)+レビュー評価順の検索URL(2026-10-28、メロい度の10/18新版に同期)
const MELO_BANDS = {
  1: { range: '100-150000', label: '〜¥1,500で検索' },
  2: { range: '150000-300000', label: '¥1,500〜3,000で検索' },
};
function affiliateUrl(keyword, band) {
  const b = MELO_BANDS[band] || MELO_BANDS[2];
  let base = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  base += `&rh=p_36%3A${b.range}&s=review-rank`;
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

// メロい度診断と同じタイプ別おすすめ2点(meroi.jsのMELO_GIFTSの写し、2026-10-28同期。正本はmeroi.js)。
// ここでは「あなたがメロる系統の人に贈るなら」として出す(理由文だけMERORU_GIFT_REASONに差し替える)
const MELO_GIFTS = {
  wanko: [
    { emoji: '📌', name: '缶バッジカバー', keyword: '缶バッジカバー 大容量', band: 1, reason: '好きを全部胸につけて走る日も、推しの顔だけは守っておきたい。' },
    { emoji: '📱', name: 'スマホショルダー', keyword: 'スマホショルダー ストラップ 全機種対応', band: 2, reason: '返事はいつも全力。だからスマホは、手の届く胸元に。' },
  ],
  anshin: [
    { emoji: '🧦', name: 'もこもこルームソックス', keyword: 'ルームソックス もこもこ ユニセックス', band: 1, reason: 'ここにいると、足元から先に今日がほどけていく。' },
    { emoji: '🛋️', name: 'ひざ掛けブランケット', keyword: 'ひざ掛け ブランケット かわいい', band: 2, reason: 'ひざにひとつ掛けた瞬間、そこがいちばん落ち着く場所になる。' },
  ],
  gap: [
    { emoji: '🃏', name: 'トレカケースとスリーブ', keyword: 'トレカケース 硬質 推し活 スリーブ', band: 1, reason: '返信はスタンプ1個。でも推しのカードは、二重に守ってから持ち歩く。' },
    { emoji: '👜', name: 'クリアショルダーバッグ', keyword: 'クリアバッグ ショルダー 推し活', band: 2, reason: '素っ気ない顔のまま、肩から下げた推しだけが、全部を言ってしまう。' },
  ],
  mystery: [
    { emoji: '🎀', name: '大きめバンスクリップ', keyword: 'バンスクリップ 大きめ', band: 1, reason: '無造作にまとめた髪が、ほどける瞬間だけ予告なし。目が離せない理由がひとつ増える。' },
    { emoji: '✨', name: '揺れるイヤーカフ', keyword: 'イヤーカフ 揺れる シルバー', band: 2, reason: '「じゃあね」で振り返った横顔に、ひとつだけ揺れるものを。' },
  ],
  rare: [
    { emoji: '🌸', name: 'フレークシールセット', keyword: 'フレークシール 大容量 セット', band: 1, reason: '手帳の端にひとつ、何気なく貼る。その何気なさが、周りには全部見えてる。' },
    { emoji: '📒', name: 'シール帳バインダー', keyword: 'シール帳 バインダー A5', band: 2, reason: '集めたつもりはないのに、気づけば1冊。かわいいが勝手に増えていく。' },
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

// 各軸の絶対値(最大10)を0-100に正規化し、傾向がはっきりしているほどメロり度を高くする。
function computeMeloPurity(kyori, hyogen) {
  // 傾向の強さ(0〜100)を80〜100%の「メロり度」に変換(メロい度診断と同じ演出)
  const p = (Math.abs(kyori) / 10) * 50 + (Math.abs(hyogen) / 10) * 50;
  return 80 + Math.round(Math.max(0, Math.min(100, p)) * 0.2);
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MERORU_QUESTIONS, MERORU_TYPES, MERORU_MELTER,
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
      track('quiz_start', { quiz_name: 'meroru' });
      currentIndex = 0;
      answers = [];
      chatLog.innerHTML = '';
      showScreen('chat');
      askNext();
    }

    function askNext() {
      if (currentIndex >= MERORU_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = MERORU_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / MERORU_QUESTIONS.length) * 100}%`;
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(MERORU_QUESTIONS.length));
      progressText.textContent = `${currentIndex + 1} / ${MERORU_QUESTIONS.length}`;
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
      track('quiz_complete', { quiz_name: 'meroru', result_type: id, score: `${kyori},${hyogen}` });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // 結果に切り替わったことを読み上げで伝える(選択肢ボタンが消えてフォーカスが迷子にならないように)
      document.querySelector('#screen-result .result-title').focus();
    }

    function renderResult(result) {
      const t = MERORU_TYPES[result.id];
      const melterId = MERORU_MELTER[result.id];
      const melter = MERORU_TYPES[melterId];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = t.rare
        ? 'あなたがメロるのは<wbr><span class="grad-text" style="white-space:nowrap">「系統にない一点」</span>'
        : `あなたがメロるのは<wbr><span class="grad-text" style="white-space:nowrap">「${t.kei}」</span>`;
      document.getElementById('nandere-nickname').textContent = t.nickname;
      document.getElementById('nandere-tagline').textContent = t.tagline;
      document.getElementById('nandere-desc').textContent = t.description;
      document.getElementById('meroru-howto').textContent = t.howto;

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
        document.getElementById('nandere-purity-label').textContent = `メロり度 ${result.purity}%`;
      }

      // 「この系統をメロメロにしやすいのは」= メロい度診断の系統。メロい度診断へ送る
      setTypeIllust(document.getElementById('compat-emoji'), melterId, melter, 'compat-illust');
      document.getElementById('compat-name').textContent = `${melter.kei}のメロさを持つ人`;
      document.getElementById('compat-note').textContent = MERORU_COMPAT_NOTE[result.id];

      // 商品は「あなたがメロる系統の人」向け(メロい度診断の同じ系統のおすすめ)。贈る場面なのでmodeはgift
      renderGiftList(document.getElementById('nandere-lucky'), {
        mode: 'gift', heading: t.rare ? 'その一人に贈るなら' : `${t.kei}の人に贈るなら`,
        items: MELO_GIFTS[result.id].map((g, i) => ({ ...g, reason: MERORU_GIFT_REASON[result.id][i], priceLabel: (MELO_BANDS[g.band] || MELO_BANDS[2]).label })),
        href: (kw, it) => affiliateUrl(kw, it && it.band), pill: true,
        onClick: (p) => track('affiliate_click', { quiz_name: 'meroru', result_type: result.id, ...p }),
        onView: () => track('section_view', { quiz_name: 'meroru', result_type: result.id, placement: 'result_card', mode: 'gift' }),
      });
      // 「次はこれ」欄の表示計測(next_quiz_clickの分母)。結果を出すたびに数え直す
      giftObserveOnce(document.querySelector('.next-quiz'), () => {
        track('section_view', { quiz_name: 'meroru', result_type: result.id, placement: 'next_card', mode: sharedView ? 'gift' : 'self' });
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
        track('copy_url', { quiz_name: 'meroru', result_type: lastResult.id });
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
      const t = MERORU_TYPES[result.id];
      const melter = MERORU_TYPES[MERORU_MELTER[result.id]];
      const head = t.rare ? `私がメロるのは${t.emoji}系統にない一点を持つ人` : `私がメロるのは${t.emoji}${t.kei}`;
      return `${head}「${t.tagline}」
私をメロらせやすいのは${melter.emoji}${melter.kei}の人らしい。あなたは何系?
#何系にメロる診断`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'meroru', content_type: 'meroru', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'meroru', content_type: 'meroru', item_id: lastResult.id });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    // 「次はこれ」カードのクリック計測(どの診断へ回せているか)
    // カード(next_card)と下の文字リンク(follow_links)を同じイベントで数え、placementで区別する。
    // 同じタブで遷移するので beacon で送り、遷移で送信が消えないようにする
    document.querySelectorAll('.next-quiz-card, .follow-links a[data-next]').forEach((el) => {
      el.addEventListener('click', () => {
        track('next_quiz_click', {
          quiz_name: 'meroru', target: el.dataset.next, mode: sharedView ? 'gift' : 'self',
          placement: el.classList.contains('compat-cta') ? 'compat_card' : el.classList.contains('next-quiz-card') ? 'next_card' : 'follow_links', transport_type: 'beacon',
        });
      });
    });

    // 結果ではなく「診断の入口」を友達にLINEで送る(タイプ名は出さない)
    function inviteFriendLine() {
      const url = `${location.origin}${location.pathname}?utm_source=line&utm_medium=social&utm_campaign=meroru_invite`;
      const text = '何系にメロる?診断やってみて!10問1分。結果見せ合お👀';
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      track('invite_send', { quiz_name: 'meroru', result_type: lastResult ? lastResult.id : undefined, mode: sharedView ? 'gift' : 'self' });
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
      const sendWrap = document.getElementById('send-quiz-wrap');
      if (sendWrap) shareBtn.after(sendWrap);
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
      const t = MERORU_TYPES[result.id];
      const melter = MERORU_TYPES[MERORU_MELTER[result.id]];
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
      ctx.fillText(`何系にメロる?診断 RESULT|${t.rare ? '系統にない一点' : t.kei}にメロる`, W / 2, y);
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
      const badgeText = t.rare ? 'メロり度 測定不能(出現率 約5%)' : `メロり度 ${result.purity}%`;
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
      ctx.fillText(`この系統をメロらせやすいのは ${melter.emoji} ${melter.kei}`, W / 2, y);
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
      ctx.fillText('あなたは何系にメロる? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 「何系にメロる診断」で検索', W / 2, y + opts.brandOffset);
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
        img.alt = `何系にメロる?診断の結果カード:${MERORU_TYPES[result.id].kei}にメロる`;
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
      track('save_card', { quiz_name: 'meroru', card_format: mode });
      try {
        const canvas = buildMeloCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('toBlobがnullを返しました')); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `meroru-shindan-${lastResult.id}-${mode}.png`;
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
    const inviteBtn = document.getElementById('btn-invite-line');
    if (inviteBtn) inviteBtn.addEventListener('click', inviteFriendLine);
    document.getElementById('btn-restart').addEventListener('click', restartQuiz);
    // LINE絵文字の入口(古いHTMLのキャッシュに新しいJSが当たっても止まらないよう、要素がある時だけ紐づける)
    const emojiLink = document.getElementById('meroru-emoji-link');
    if (emojiLink) emojiLink.addEventListener('click', () => {
      track('emoji_store_click', {
        quiz_name: 'meroru', result_type: lastResult ? lastResult.id : '',
        placement: 'result_extra', mode: sharedView ? 'gift' : 'self', transport_type: 'beacon',
      });
    });
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
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされたのは<wbr><span class="grad-text" style="white-space:nowrap">「${MERORU_TYPES[id].name}」</span>`;
      document.getElementById('btn-restart').textContent = '自分は何系にメロるか診断する 💗';
      // 他人の結果を「私は〜」とシェアしないよう、自分で診断するボタンを先頭・主ボタンにする
      const restartBtn = document.getElementById('btn-restart');
      const shareBtn = document.getElementById('btn-share');
      restartBtn.className = 'btn-primary';
      shareBtn.className = 'btn-secondary';
      restartBtn.parentNode.prepend(restartBtn);
      const sendWrap = document.getElementById('send-quiz-wrap');
      if (sendWrap) restartBtn.parentNode.appendChild(sendWrap);
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
