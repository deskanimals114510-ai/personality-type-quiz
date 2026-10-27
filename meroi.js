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
    nickname: '本人だけ気づいてない全方位メロ',
    tagline: 'どこを切ってもメロい、隠しレア',
    color: '#b5175a',
    rare: true,
    description: '診断上、どの系統にも寄らなかった人。かなり珍しいです。LINEでは全力で喜んだかと思えば、次の日は一言で場を落ち着かせ、教室や職場では距離の詰め方が相手に合わせて変わる。本人は「普通にしてるだけ」なのに、周りからは「あの人のメロさ、説明できない」と言われている可能性が高い。これはブレてるんじゃなくて、相手が一番ほしいメロさを無意識に出せているということ。わんこ系の全力も、きつね系の余韻も、気づいたら全部使ってます。ただしご本人、ほぼ自覚なし。だから「なんで自分なの?」と首をかしげるし、褒められても信じない。今日からは少しだけ信じてみてください。無自覚なのが一番メロいという事実、周りはとっくに知っています。',
  },
};

// ---- 12タイプ化(2026-10-29〜): 4系統×3通り(距離型/バランス型/表現型)の名前と文面。カワウソ(rare)は分けない隠しレア ----
// 正本は ../meroi_subtypes_draft.json(Fable作・2026-10-25)。キーは `${系統ID}_${computeMeloSub()}`
const MELO_SUBTYPES = {
  wanko_kyori: {
    sub_name: "寄ってく側",
    name: "まっしぐらわんこメロ",
    nickname: "気づいたら隣の席に来てる人",
    tagline: "距離ゼロが、いちばん効く",
    share_line: "隣に来るわんこ側だった",
    description: "休み時間、気づけばもう隣にいる。「ちょっと話そ」も言わずに自然と輪に入ってきて、転校生でも初対面の後輩でも、1週間後にはあだ名で呼び合ってる。LINEは用事がなくても「今これ見た?」が飛んでくるし、友達が落ち込んでると、何も聞かずにまず隣に座る。同じわんこ系の「顔に出る側」が気持ちから先、「寄って伝える側」が両方同時なら、あなたは体が先に動く人。言葉より前に、そばに来ちゃう。周りがメロメロになるのは、その「来てくれる」が特別扱いに感じるから。本人は「しつこいかな」と心配しがちだけど、その距離の近さは、相手にとって「ここに居場所がある」というサインになってます。今日もいつもの勢いで、隣に行っちゃおう。",
  },
  wanko_balance: {
    sub_name: "寄って伝える側",
    name: "まるごとわんこメロ",
    nickname: "隣に来て、そのまま顔がゆるんでる人",
    tagline: "来るし、出る。だから迷わない",
    share_line: "来て顔に出るわんこ側",
    description: "友達が教室に入ってきた瞬間、立って手を振りながらそっちへ歩いていく。近づくのと、うれしいのが顔に出るのが、ほぼ同時。修学旅行の班決めでは「一緒になろ」と最初に言い出して、決まった瞬間に小さくガッツポーズまで出てる。LINEは自分から送るし、返事が来たら絵文字が3つ増える。同じわんこ系の「寄ってく側」が体から先、「顔に出る側」が気持ちから先だとしたら、あなたはその両方が同時に動く人。来てくれて、しかも喜んでるのが見える。周りがメロメロになるのは、「会えてうれしい」が足と顔のどっちからも伝わってきて、疑いようがないから。本人は「落ち着きがない」と言われて気にしがちだけど、距離も気持ちも隠さない人は、相手の緊張を一気にほどける人です。今日もその足で近づいて、その顔で笑っちゃおう。",
  },
  wanko_hyogen: {
    sub_name: "顔に出る側",
    name: "だだ漏れわんこメロ",
    nickname: "感情が全部顔と文字に出てる人",
    tagline: "隠せてないのが、かわいい",
    share_line: "顔に全部出るわんこ側",
    description: "推しの新ビジュが出た瞬間、語彙が「無理」だけになる。友達が髪型を変えたら「えっ!?似合う!」が教室の端まで届くし、LINEは絵文字と「!」がいつも多め。うれしい日は歌を口ずさんでるし、楽しみな前日は「寝れない」をストーリーズに上げてる。同じわんこ系の「寄ってく側」が体から先、「寄って伝える側」が両方同時なら、あなたは気持ちが先に届く人。離れた席からでも、顔を見ればだいたいわかる。周りがメロメロになるのは、その素直さがうそをつかないから。「うれしい」と言われた側は、そのまま信じられる。本人は「わかりやすすぎ」と言われて気にしがちだけど、感情を隠さない人は、相手の感情も引き出せる人です。今日もその顔のまま、好きを好きって言っちゃおう。",
  },
  anshin_kyori: {
    sub_name: "そばにいる側",
    name: "となりで安心メロ",
    nickname: "隣が空いてると座りに来る人",
    tagline: "来てくれるだけで、ほっとする",
    share_line: "黙って隣にいるくま側",
    description: "疲れた顔をしてると、何も聞かずに隣の席に来て、自分のスマホをいじりながら一緒にいてくれる。グループLINEでは静かなのに、個別には「今日いる?」と気軽に送ってくる。推し活でも、遠征の待ち時間をなんとなく一緒に過ごしてくれる人。同じゆるくま系の「さりげない側」が言わずに置く人、「そばで気づく側」が隣で差し出す人なら、あなたはとりあえず隣に来る人。口数は少ないのに、席が隣だと空気が軽くなる。周りがメロメロになるのは、自分から寄ってくるのに、ぜんぜん圧がないから。本人は「何もしてない」と思いがちですが、「黙って隣にいる」を自然にできる人はめったにいません。たまには「一緒にいて楽しかった」と言葉にしてみて。そばにいる時間が、もっと特別になります。",
  },
  anshin_balance: {
    sub_name: "そばで気づく側",
    name: "そばで気づく安心メロ",
    nickname: "隣にいて、欲しいものが先に出てくる人",
    tagline: "隣にいて、ちょうどよく気づく",
    share_line: "隣で気づくくま側だった",
    description: "体育の見学で一人になってる子がいたら、隣に腰を下ろして「寒くない?」とだけ聞いて、ひざ掛けを半分渡す。そばに来るのも、気づいて動くのも、どっちも自然に出てくる。LINEは短いけど、「今日の体調どう?」が必要な日にちょうど届く。同じゆるくま系の「そばにいる側」が隣に来るところまで、「さりげない側」が気づいて置くところまでなら、あなたは隣に来たうえで、要るものを差し出す人。周りがメロメロになるのは、そこにいてくれる安心と、見てくれてる安心が、同時に来るから。本人は「おせっかいかも」と心配しがちだけど、隣にいる人が気づいてくれるのは、相手にとって一番楽な形の優しさです。たまには「今日はこっちが頼っていい?」と言ってみて。両方向になると、もっとあたたかくなります。",
  },
  anshin_hyogen: {
    sub_name: "さりげない側",
    name: "さりげなく安心メロ",
    nickname: "気づいてるのを言わない人",
    tagline: "言わないけど、見てくれてる",
    share_line: "言わずに気づくくま側",
    description: "友達が机に伏せてると、声はかけない。でも帰るころには、その子のカバンの横にのど飴が置いてある。LINEの返信は短めで、顔もあまり変わらない。だけど推しの話をしたら、次に会ったとき「これ、好きそうだったから」と写真を見せてくる。同じゆるくま系の「そばにいる側」がまず隣に来る人、「そばで気づく側」が隣で差し出す人なら、あなたは気づいたことを行動にだけ出す人。そばにはいる、でも言葉にはしない。周りがメロメロになるのは、そのさりげなさが「ちゃんと見てくれてた」とあとから気づく形で効くから。じわじわ来るタイプの安心感です。本人は「地味で損してる」と思いがちだけど、言わずにやる優しさは、言ったら減ってしまうやつ。だから今のままでいい。でも1回くらい「気づいてたよ」と言ってみても、損はしません。",
  },
  gap_kyori: {
    sub_name: "遠くてツン側",
    name: "寄らないギャップメロ",
    nickname: "近づかないのに、話すと全開の人",
    tagline: "遠いのに、たまに近い",
    share_line: "寄らないのに全開のねこ側",
    description: "休み時間は自分の席から動かないし、グループLINEもほぼ既読だけ。初対面では黙って観察して、相手がどんな人かわかるまで口を開かない。なのに、誰かが好きなアニメの話を振った瞬間、目が開いて早口でしゃべり出す。同じツンねこ系の「顔に出てる側」が反応で全部バレる人、「遠いのに出る側」が遠いまま漏れる人なら、あなたは寄ってこないのに、話せば全開の人。距離の遠さそのものがクールな土台で、たまに開く入口が狭いぶん、入れた人の特別感がすごい。周りがメロメロになるのは、「あの人が自分には話してくれる」が宝物になるから。本人は「人付き合いが下手」と思いがちだけど、距離を取るのは慎重なだけ。開くときに全力で開けるなら、それはもう十分すぎる持ち味です。",
  },
  gap_balance: {
    sub_name: "遠いのに出る側",
    name: "遠いままギャップメロ",
    nickname: "席は遠いのに、反応だけ毎回届く人",
    tagline: "遠い席から、全部バレてる",
    share_line: "遠いのに出てるねこ側",
    description: "クラスの出し物の話し合い、自分は後ろの席で腕を組んで聞いてるだけ。なのに友達の案が通った瞬間、こっそり拳を握ってるのを見られてる。LINEは自分から送らないし、返信も短い。でも推しの出演が発表された日は、その短い返信のあとに、同じスクショを3回送り直してくる。同じツンねこ系の「遠くてツン側」が話すと全開、「顔に出てる側」が隠すのに失敗してる人だとしたら、あなたは遠い場所にいながら、うれしさが同じ量で漏れてる人。周りがメロメロになるのは、近づいてこない人の感情が見えると、見つけた側が「自分だけ気づいた」と思えるから。本人は「もっとサラッとしてたい」と悩みがちだけど、距離を保ったまま気持ちが伝わるのは、めったにないいい場所取りです。遠い席のまま、たまに手を振ってみてもいい。",
  },
  gap_hyogen: {
    sub_name: "顔に出てる側",
    name: "バレバレギャップメロ",
    nickname: "そっけないふりが全然できてない人",
    tagline: "ツンのつもりが、全部出てる",
    share_line: "隠せてないねこ側だった",
    description: "LINEは「おけ」の2文字で終わらせるし、自分からはあまり誘わない。なのに友達の髪型が変わった瞬間、「えっ!?」が先に出る。推しの話になれば顔がゆるむのを隠せなくて、「ツンのつもりだったのに」と周りに笑われてる。同じツンねこ系の「遠くてツン側」が話すと全開の人、「遠いのに出る側」が遠いまま漏れる人なら、あなたは寄ってはこないのに、顔と声が全部言ってる人。自分からは動かない、でも反応はわかりやすい。周りがメロメロになるのは、クールにしようとして失敗してる感じが、見てる側にはいちばん愛おしいから。本人は「もっと落ち着いた人に見られたい」と悩みがちですが、隠しきれない気持ちって、隠そうとしてるからこそ刺さるんです。たまには「隠せてないな」と自分で笑っちゃって大丈夫。それが、このタイプの一番の持ち味。",
  },
  mystery_kyori: {
    sub_name: "遠くで見てる側",
    name: "遠巻き余韻メロ",
    nickname: "たまに現れて、ひとこと置いて消える人",
    tagline: "いない時間が、効いてる",
    share_line: "たまに現れるきつね側",
    description: "教室でも推し活の集まりでも、輪の少し外にいる。自分から話しかけることは少なくて、グループLINEにも滅多に出てこない。でも、たまに顔を出した日に言った一言を、みんな翌日まで覚えてる。ストーリーズは月に1回あるかないか、だから上がった瞬間、全員が見にいく。同じきつね系の「読めない側」が近くても読めない人、「遠くて読めない側」が両方の人なら、あなたはそもそもあまり現れない人。距離そのものが余韻をつくっていて、会えない時間に相手の中であなたが育っていく。周りがメロメロになるのは、「次いつ話せるかわからない」が、話せた日の価値を上げるから。本人は「輪に入れてない」と気にしがちだけど、全員と等しく仲良くする必要はありません。たまに現れて、ひとこと置いて帰る。それでちゃんと、残ってます。",
  },
  mystery_balance: {
    sub_name: "遠くて読めない側",
    name: "霧の中の余韻メロ",
    nickname: "いつ来るかも、何考えてるかも読めない人",
    tagline: "遠くて、読めなくて、残る",
    share_line: "遠くて読めないきつね側",
    description: "文化祭の準備で、ふらっと来て看板の文字だけ直して帰っていった人がいる。その顔は最初から最後まで変わらなくて、何を思って直したのか誰もわからない。グループLINEは月に数回、返事は一行、絵文字なし。推しについて聞かれても「いいよね」で終わるのに、その推しの誕生日だけはちゃんと覚えてる。同じきつね系の「遠くで見てる側」が現れないことで、「読めない側」が表情を見せないことで余韻を残すなら、あなたはいつ来るかも、来たときに何を考えてるかも読めない人。周りがメロメロになるのは、手がかりが二重に少ないぶん、残った一言やひとつの行動を、相手がずっと大事に持ち続けるから。本人は「存在感がない」と気にしがちだけど、少ししか出さないものほど、受け取った側は忘れません。来た日に一言だけ、誰かの名前を呼んでみて。",
  },
  mystery_hyogen: {
    sub_name: "読めない側",
    name: "涼しい顔余韻メロ",
    nickname: "隣にいるのに何考えてるかわからない人",
    tagline: "顔に出ないから、気になる",
    share_line: "顔に出ないきつね側",
    description: "席は近いし、話しかければ普通に返してくれる。でも、推しの新情報が出ても表情は変わらず、無言で保存して壁紙だけ替わってる。「ありがとう」は言葉じゃなくて、気づいたら相手の好きなお菓子が机にある形。同じきつね系の「遠くで見てる側」があまり現れない人、「遠くて読めない側」が両方の人なら、あなたは近くにいるのに、感情だけ読めない人。距離は普通、でも中身が見えない。周りがメロメロになるのは、「本当はどう思ってるんだろう」を考える時間が、そのまま気になる時間になるから。笑った瞬間を見た人は、たぶんその日の日記に書きたくなってます。本人は「冷めてると思われてる」と心配しがちだけど、感情を外に出さないのは、雑に扱わないということ。1日1回、「それ好き」とだけ口に出してみて。少ないからこそ、その一言はちゃんと届きます。",
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

// script.jsのaffiliateUrl()と同仕様: 価格帯フィルタ+レビュー評価順ソートを
// URLパラメータで強制する(amazon.co.jpで動作確認済み)。
// 2026-10-18〜 品ごとの予算帯(band 1=〜¥1,500、2=¥1,500〜3,000)。p_36は円×100、下限0円は1円として扱う
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

// タイプ別おすすめ2点+理由1行(2026-10-14、Fable執筆。正本は診断ツール群/MBTI診断/meroi_gift_copy.json)。
// 2026-10-18 新版: 10代向けに入れ替え、band 1=〜¥1,500・2=¥1,500〜3,000(ガイドと同じ帯)。meroru.jsの写しは10/28判定まで旧版
// 理由文は主語を「あなた」にしない形なので、シェア閲覧者(友達に贈る人)にもそのまま出す
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

// 各軸の絶対値(最大10)を0-100に正規化し、傾向がはっきりしているほどメロい度を高くする。
function computeMeloPurity(kyori, hyogen) {
  // 傾向の強さ(0〜100)を80〜100%の「メロい度」に変換(全員を褒める演出)
  const p = (Math.abs(kyori) / 10) * 50 + (Math.abs(hyogen) / 10) * 50;
  return 80 + Math.round(Math.max(0, Math.min(100, p)) * 0.2);
}

// 12タイプ化(2026-10-29〜): 系統の中の3通り。距離と表現の強さの差が2以上ならその軸の側、1以内ならバランス型。
// カワウソ(rare)は分けないのでnull。全回答で各タイプ5.7〜9.0%・カワウソ5.1%になる境目(企画書の試算)
function computeMeloSub(kyori, hyogen) {
  if (computeMeloType(kyori, hyogen) === 'rare') return null;
  const d = Math.abs(kyori) - Math.abs(hyogen);
  if (d >= 2) return 'kyori';
  if (d <= -2) return 'hyogen';
  return 'balance';
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MELO_QUESTIONS, MELO_TYPES, MELO_COMPAT,
    computeMeloScores, computeMeloType, computeMeloPurity, computeMeloSub, MELO_SUBTYPES,
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

    // 12タイプ化(2026-10-29〜): 系統(MELO_TYPES)に3通りの名前・文面(MELO_SUBTYPES)を重ねた表示用の型。
    // 相性・商品・イラスト・計測のresult_typeは系統IDのまま(5値)で、3通りはsub_typeで別に数える
    function meloView(result) {
      const t = MELO_TYPES[result.id];
      const st = result.sub ? MELO_SUBTYPES[`${result.id}_${result.sub}`] : null;
      return st ? { ...t, ...st } : { ...t, sub_name: '' };
    }
    function subTypeParam(result) {
      return result.sub || 'rare';
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
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(MELO_QUESTIONS.length));
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
      lastResult = { id, sub: computeMeloSub(kyori, hyogen), kyori, hyogen, purity };
      // 自分の結果URLを開き直した時にシェア閲覧画面にしないよう、このタブで出た自分の結果を覚えておく(2026-10-18〜)
      try { sessionStorage.setItem('meroi_own', `${kyori},${hyogen}`); } catch (e) { /* 保存できなくても動作は続ける */ }
      track('quiz_complete', { quiz_name: 'meroi', result_type: id, sub_type: subTypeParam(lastResult) });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      document.querySelector('#screen-result .result-title').focus();
    }

    function renderResult(result) {
      const t = meloView(result);
      const compat = MELO_COMPAT[result.id];
      const partner = MELO_TYPES[compat.partner];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML = t.sub_name
        ? `あなたは<wbr><span class="grad-text" style="white-space:nowrap">「${t.kei}」</span><wbr>の<span class="grad-text" style="white-space:nowrap">「${t.sub_name}」</span>`
        : `あなたは<wbr><span class="grad-text" style="white-space:nowrap">「${t.kei}」</span><wbr><span style="white-space:nowrap">の隠しレア</span>`;
      // 同じ系統の3通りを並べて、友達と「どっち側?」を比べやすくする(カワウソは隠しレアなので出さない)
      const siblings = document.getElementById('meroi-siblings');
      if (siblings && t.sub_name) {
        // 名前は自前の固定データなのでinnerHTMLで組む(語の途中で折り返さないよう1つずつnowrap、自分の側は太字)
        const names = ['kyori', 'balance', 'hyogen'].map((k) => {
          const n = MELO_SUBTYPES[`${result.id}_${k}`].sub_name;
          return k === result.sub ? `<strong class="nowrap">${n}${sharedView ? '(この結果)' : '(あなた)'}</strong>` : `<span class="nowrap">${n}</span>`;
        });
        siblings.innerHTML = `${t.kei}は3タイプ: ${names.join(' / ')}<br><span class="nowrap">全12タイプ+隠しレア</span>`;
        siblings.hidden = false;
      } else if (siblings) {
        siblings.textContent = '';
        siblings.hidden = true;
      }
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
      document.getElementById('compat-name').textContent = `${partner.kei}`;
      document.getElementById('compat-percent').textContent = `相性 ${compat.percent}%`;
      document.getElementById('compat-note').textContent = compat.note;

      renderGiftList(document.getElementById('nandere-lucky'), {
        mode: sharedView ? 'gift' : 'self', typeName: t.name, items: MELO_GIFTS[result.id].map((it) => ({ ...it, priceLabel: (MELO_BANDS[it.band] || MELO_BANDS[2]).label })),
        href: (kw, it) => affiliateUrl(kw, it && it.band), pill: true,
        onClick: (p) => track('affiliate_click', { quiz_name: 'meroi', result_type: result.id, sub_type: subTypeParam(result), ...p }),
        onView: () => track('section_view', { quiz_name: 'meroi', result_type: result.id, sub_type: subTypeParam(result), placement: 'result_card', mode: sharedView ? 'gift' : 'self' }),
      });
      // 本人画面だけ、商品の下に「この結果、LINEで友達に見せる」(2026-10-18〜)。中身はシェア閲覧画面(mode=gift)のURL+目印w=1
      // (GA4ではpage_locationのw=1で見分ける)。本文は結果が主で、商品・「買って」等・Amazonのリンクは入れない。計測はshareと混ぜず wishlist_share
      // 商品欄(#nandere-lucky)の外に置く=商品欄の表示計測(section_view)の範囲を変えない
      document.getElementById('gift-wish').hidden = sharedView || !(MELO_GIFTS[result.id] || []).length;
      // プレゼントガイドへの入口(2026-10-16〜)。シェアされた結果を見ている人(贈る側)にだけ出す。
      // 商品欄の外に置き、計測も別イベントにする(本人画面は10/18に購買導線改修で品・カードの見た目を変えた)
      const guideEntry = document.getElementById('gift-guide-entry');
      guideEntry.hidden = !sharedView;
      if (sharedView) {
        const guideLink = document.getElementById('gift-guide-link');
        guideLink.href = `gift/meroi.html#${result.id}`;
        guideLink.textContent = `🎁 ${t.kei}の友達へのプレゼント、予算別にもっと見る ›`;
      }
      // 「次はこれ」欄の表示計測(next_quiz_clickの分母)。結果を出すたびに数え直す
      giftObserveOnce(document.querySelector('.next-quiz'), () => {
        track('section_view', { quiz_name: 'meroi', result_type: result.id, sub_type: subTypeParam(result), placement: 'next_card', mode: sharedView ? 'gift' : 'self' });
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
        track('copy_url', { quiz_name: 'meroi', result_type: lastResult.id, sub_type: subTypeParam(lastResult) });
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
      const t = meloView(result);
      if (t.rare) {
        return `私のメロい度は測定不能!${t.emoji}${t.kei}の隠しレア「${t.name}」でした\n12タイプ+隠しレア、みんなはどれ?\n#メロい度診断 #あなたは何メロ`;
      }
      return `私は${t.emoji}${t.kei}の「${t.sub_name}」=${t.name}、メロい度${result.purity}%。同じ${t.kei}でも3つに分かれるらしい\n12タイプ中、みんなはどれ?\n#メロい度診断 #あなたは何メロ`;
    }

    function shareResultX() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: 'meroi', content_type: 'meroi', item_id: lastResult.id, sub_type: subTypeParam(lastResult) });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareResultLine() {
      if (!lastResult) return;
      const text = shareText(lastResult);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: 'meroi', content_type: 'meroi', item_id: lastResult.id, sub_type: subTypeParam(lastResult) });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    function shareGiftWish() {
      if (!lastResult) return;
      const t = meloView(lastResult);
      const text = t.sub_name ? `私は${t.kei}の「${t.sub_name}」だった!結果見て👀` : `私は${t.kei}だった!結果見て👀`;
      const url = encodeURIComponent(`${resultUrl(lastResult)}&w=1`);
      track('wishlist_share', { quiz_name: 'meroi', result_type: lastResult.id, sub_type: subTypeParam(lastResult), method: 'line', placement: 'result_card', mode: 'self' });
      window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
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

    document.getElementById('gift-guide-link').addEventListener('click', () => {
      if (!lastResult) return;
      track('gift_guide_click', { quiz_name: 'meroi', result_type: lastResult.id, placement: 'result_card', mode: 'gift', transport_type: 'beacon' });
    });

    document.getElementById('btn-gift-wish').addEventListener('click', shareGiftWish);

    // 絵文字の入口(LINE STORE、新しいタブ)とプレゼント診断への1行(2026-10-27〜)。
    // Amazonのaffiliate_clickや「次はこれ」のnext_cardとは混ぜず、それぞれ別に数える
    const emojiLink = document.getElementById('meroi-emoji-link');
    const presentLink = document.getElementById('meroi-present-link');
    // 古いHTMLのキャッシュに新しいJSが当たっても初期化が止まらないよう、要素がある時だけ紐づける
    if (emojiLink) emojiLink.addEventListener('click', () => {
      track('emoji_store_click', {
        quiz_name: 'meroi', result_type: lastResult ? lastResult.id : '', sub_type: lastResult ? subTypeParam(lastResult) : '',
        placement: 'result_extra', mode: sharedView ? 'gift' : 'self', transport_type: 'beacon',
      });
    });
    if (presentLink) presentLink.addEventListener('click', () => {
      track('next_quiz_click', {
        quiz_name: 'meroi', target: 'present', mode: sharedView ? 'gift' : 'self', placement: 'present_line', transport_type: 'beacon',
      });
    });
    // 推しと荷づくり(別サイト)への1行。診断間の回遊(next_quiz_click)とは分けて数える
    const oshiLink = document.getElementById('meroi-oshi-link');
    if (oshiLink) oshiLink.addEventListener('click', () => {
      track('cross_site_click', {
        quiz_name: 'meroi', target: 'oshi_nizukuri', result_type: lastResult ? lastResult.id : '', sub_type: lastResult ? subTypeParam(lastResult) : '', mode: sharedView ? 'gift' : 'self', placement: 'result_extra',
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
      const t = meloView(result);
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
      ctx.fillText(t.sub_name ? `メロい度診断 RESULT|${t.kei}・${t.sub_name}` : `メロい度診断 RESULT|${t.kei}・隠しレア`, W / 2, y);
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
      ctx.fillText(`相性◎ ${partner.emoji} ${partner.kei}(${compat.percent}%)`, W / 2, y);
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
      ctx.fillText('Desk Animals | 「メロい度診断」で検索', W / 2, y + opts.brandOffset);
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
      track('save_card', { quiz_name: 'meroi', card_format: mode, result_type: lastResult.id, sub_type: subTypeParam(lastResult) });
      try {
        const canvas = buildMeloCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('toBlobがnullを返しました')); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `meroi-shindan-${lastResult.id}${lastResult.sub ? `-${lastResult.sub}` : ''}-${mode}.png`;
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
      lastResult = { id, sub: computeMeloSub(kyori, hyogen), kyori, hyogen, purity };
      let own = false;
      try { own = sessionStorage.getItem('meroi_own') === `${kyori},${hyogen}`; } catch (e) { own = false; }
      if (own) {
        // 自分の結果を開き直した(再読み込みなど)時は本人画面のまま出す
        showScreen('result');
        renderResult(lastResult);
        renderCardPreview(lastResult);
        return;
      }
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // シェアされたURLから来た人向けに、見出しとボタンを「自分も診断する」導線にする
      const sv = meloView(lastResult);
      document.querySelector('#screen-result .result-title').innerHTML = `シェアされたメロさは<wbr><span class="grad-text" style="white-space:nowrap">「${sv.kei}${sv.sub_name ? `・${sv.sub_name}` : '・隠しレア'}」</span>`;
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
