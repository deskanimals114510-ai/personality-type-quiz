'use strict';
// preload+media="print"で読み込んだGoogle Fontsを適用する(CSPでインラインonloadが使えないためJS側で切り替え、script.jsと同じ)
if (typeof document !== 'undefined') {
  const fontLink = document.getElementById('font-link');
  if (fontLink) fontLink.media = 'all';
}
// ===== ここからpresent_content.js(診断ツール群/MBTI診断/、文言の正本)の写し。文言を直す時は正本を直してからここへ写す =====
// ===== もらってうれしいプレゼント診断(全10問、2026-10-17。企画書「新診断3本_企画_2026-10-17.md」の決定1に基づく) =====
// 自分について10問答える→「私がもらってうれしいのは〇〇派」。おねだり型(結果をLINEで恋人・家族・友達に送る)が主。
// シェアされた結果を開いた人=贈る側には、関係(friend/family/partner)で予算帯を切り替えた2帯×2点を出す。
// 設問・結果文・商品文はFable執筆。書式はmeroru_content.js / app/meroi.js / gift_guide_copy.json に合わせた。
// 軸: nokoru=形に残るか(+形に残るもの/-残らないもの)
//     tokimeki=選ぶ物差し(+ときめき・見た瞬間の好き/-実用・使いやすさ)
// 判定はmeroi.jsのcomputeMeloTypeと同じ形:
//   |nokoru|+|tokimeki|<=1 → kotoba(rare) / nokoru>=0かつtokimeki>0 → takara / nokoru>0 → aibou / tokimeki>0 → taiken / それ以外 → kiemono
//   aibou=残る×実用、takara=残る×ときめき、kiemono=残らない×実用、taiken=残らない×ときめき、kotoba=どちらにも寄らない
// 文言の禁止(企画書「5名概念レビュー後の決定」1と共通): 効能の記述、個人の感想風、順位や売れ行きの表現、相手の反応や結果を保証する言い切り、
//   季節の語(季節の一言はJS側で別に出す)、性別への寄せ、価格の断定。descriptionは推量形で言い切らない。

// ---- 設問データ: 2軸(nokoru=残る/残らない, tokimeki=ときめき/実用)×各5問、4択(weight -2/-1/+1/+2) ----
const PRESENT_QUESTIONS = [
  { axis: 'nokoru', text: '旅行先のお土産屋さん。自分用に買って帰るとしたら?', opts: [
    { text: 'マグカップや置物など、家に帰ってからも使う・飾るもの', weight: 2 },
    { text: 'その土地のお菓子。帰ってから数日で食べきる', weight: -1 },
    { text: 'ポストカードやステッカー。かさばらないものを1枚だけ', weight: 1 },
    { text: '買わない。その場で名物を食べて、写真を撮れば十分', weight: -2 },
  ]},
  { axis: 'tokimeki', text: '雑貨屋で、つい手が伸びるのはどんなもの?', opts: [
    { text: '用途は特にないけど、一目で「好き」と思ったもの', weight: 2 },
    { text: '前から買い替えたかった実用品。見た目は二の次', weight: -1 },
    { text: 'かわいい見た目の実用品。使えるし、見ていても楽しい', weight: 1 },
    { text: '切らしていた消耗品。雑貨屋では買い足しがほとんど', weight: -2 },
  ]},
  { axis: 'nokoru', text: '自分へのごほうびに、少しだけお金を使うなら?', opts: [
    { text: '長く使える文房具や小物を、ひとつ買う', weight: 2 },
    { text: '映画やカフェなど、出かけて過ごす時間に使う', weight: -2 },
    { text: '普段は買わない、ちょっといいお菓子や飲みもの', weight: -1 },
    { text: '本や雑誌。読んだあとも手元に置いておく', weight: 1 },
  ]},
  { axis: 'tokimeki', text: '毎日使うもの(財布、ペンケース、水筒など)を新しく選ぶとき、決め手は?', opts: [
    { text: '使いやすさと丈夫さ。見た目はあまり気にしない', weight: -2 },
    { text: 'まず見た目で候補を絞って、そのあと機能を確かめる', weight: 1 },
    { text: '見るたびにうれしくなるかどうか。少し使いにくくても好きなら買う', weight: 2 },
    { text: '機能で選んで、同じくらいならデザインで決める', weight: -1 },
  ]},
  { axis: 'nokoru', text: '部屋を片付けていて、去年の思い出が出てきた。どんな形で残っている?', opts: [
    { text: 'もらった小物や買ったものを、今も使っている・飾っている', weight: 2 },
    { text: '写真だけ。物はほとんど残していない', weight: -1 },
    { text: '箱にまとめてしまってある。たまに開けて見る', weight: 1 },
    { text: '何も残していない。覚えているのは、その日に何をしたか', weight: -2 },
  ]},
  { axis: 'tokimeki', text: 'スマホのメモにある「欲しいものリスト」。中身はどっちが多い?', opts: [
    { text: '「なんで欲しいか説明できないけど欲しい」ものが多い', weight: 2 },
    { text: '日用品の買い足しリストになっている', weight: -2 },
    { text: '「今のが壊れたら買う」と決めている実用品', weight: -1 },
    { text: '気になる雑貨や服。買うかはその時の気分', weight: 1 },
  ]},
  { axis: 'nokoru', text: '友達から「この前のお礼に何かあげたい、何がいい?」と聞かれたら?', opts: [
    { text: '「今度ごはん行こう」と、時間に変えてもらう', weight: -2 },
    { text: '使えるもの。文房具やタオルみたいに、毎日出番があるもの', weight: 2 },
    { text: 'お菓子や飲みもの。残らないものがちょうどいい', weight: -1 },
    { text: '小さい雑貨。机の上に置ける、ちょっとしたもの', weight: 1 },
  ]},
  { axis: 'tokimeki', text: '届いた荷物を開けるとき、いつもどうしてる?', opts: [
    { text: '開ける前からわくわくして、包装もとっておきたくなる', weight: 2 },
    { text: '開けたらすぐ使い始める。箱は畳んで資源ごみへ', weight: -2 },
    { text: 'まず全体を眺めて、どこに置くか考える', weight: 1 },
    { text: 'まず使えるか確かめる。それから片付ける', weight: -1 },
  ]},
  { axis: 'nokoru', text: 'スマホの写真フォルダ、いちばん多いのは?', opts: [
    { text: '出かけた先の景色や、一緒にいた人の写真', weight: -2 },
    { text: '自分の部屋や机、持ち物の写真', weight: 1 },
    { text: '食べたもの・飲んだものの写真', weight: -1 },
    { text: '買ったもの、もらったものを撮った写真', weight: 2 },
  ]},
  { axis: 'tokimeki', text: '誰かから何かをもらって、思い返すといちばんうれしかったのは?', opts: [
    { text: '自分では買わないけど、ずっと好きだったもの', weight: 2 },
    { text: 'ちょうど切れていた消耗品が、ぴったり届いた', weight: -1 },
    { text: '好きな色や柄を覚えていて選んでくれたもの', weight: 1 },
    { text: '必要だったものが、必要なときに来た', weight: -2 },
  ]},
];

// ---- 判定(meroi.jsのcomputeMeloTypeと同じ形。表示側で同じ計算をするなら未使用でよい) ----
function presentTypeId(nokoru, tokimeki) {
  if (Math.abs(nokoru) + Math.abs(tokimeki) <= 1) return 'kotoba';
  if (nokoru >= 0 && tokimeki > 0) return 'takara';
  if (nokoru > 0) return 'aibou';
  if (tokimeki > 0) return 'taiken';
  return 'kiemono';
}

// ---- タイプ定義(結果見出しは「私がもらってうれしいのは「{name}」」) ----
// wishline=おねだりシェア用の一文(LINEで送る本文)。viewerline=シェアされた結果を開いた贈る側に見せる一文(主語は「この人」)。compat=相性の良い贈り手タイプ(同じ5タイプの中から)と理由。
const PRESENT_TYPES = {
  aibou: {
    emoji: '🖊️', name: '毎日使う相棒派',
    nickname: '壊れるまで同じものを使い続ける人',
    tagline: 'ずっと手元で、使い込みたい',
    color: '#2f6f8f',
    description: 'お気に入りのペンが1本決まっていて、それ以外だとなんとなく書きづらい。そんな人かもしれません。カバンの中身はだいたい同じ顔ぶれで、スマホケースも財布も、壊れるまで替えないことが多そうです。新しいものを買うときは「今のより良いか」をけっこうまじめに考えて、買ったあとは何年も当たり前のように使い続ける。だからもらってうれしいのは、飾るものより、朝から夜まで手が触れるもののようです。使い込んで角が丸くなったころに「これ、もらったやつだ」と思い出す。その長さが、あなたにとっての贈り物の価値なのかもしれません。欲しいものを聞かれたら、「今使ってるこれの、ちょっといいやつ」と答えると伝わりやすいと思います。',
    wishline: 'これ見といて。私がもらってうれしいのは「毎日使う相棒派」みたい🎁 今使ってるものの、ちょっといいやつが好き',
    viewerline: 'この人がもらってうれしいのは「毎日使う相棒派」らしい。飾るものより、毎日手に触れるものを',
    compat: { partner: 'kiemono', note: 'ちょっといい消えもの派は、使い切るものを選び慣れている人。だから「毎日何を使っているか」をよく見ていて、机の上のペンや水筒が替わったことにも気づきやすいようです。「今の、どこが気に入ってる?」と聞いてから選んでくれる組み合わせかもしれません。' },
    gifts: {
      friend: [
        { label: '〜¥1,500', min: 0, max: 1500, items: [
          { emoji: '🖊️', name: '多機能ボールペン', keyword: '多機能ボールペン 黒 赤 シャープ', reason: 'ペンが1本決まっている人の、その1本の隣に置けるもの。授業や仕事で毎日手に取る道具なので、出番は多そうです。', safe: '消耗品の芯は買い足せる' },
          { emoji: '📓', name: 'ハードカバーのノート(方眼)', keyword: 'ノート 方眼 A6 ハードカバー', reason: 'カバンの中身が毎日同じ人の、その中に入る一冊。書き終わるまで何か月も持ち歩くものなので、表紙が少しくたびれたころに「もらったやつだ」と思い出しそうです。', safe: '使い道を限定しない' },
        ]},
        { label: '¥1,500〜3,000', min: 1500, max: 3000, items: [
          { emoji: '🥤', name: 'ステンレスボトル(小さめ)', keyword: 'ステンレスボトル 350ml 直飲み', reason: '毎日カバンに入れるものの中で、いちばん使う回数が多い部類。今使っているボトルより少し軽い、少し洗いやすい、が伝わると長く使われそうです。', safe: 'サイズが小さめで持ち歩きやすい' },
          { emoji: '📱', name: 'スマホショルダーストラップ', keyword: 'スマホショルダー ストラップ 紐', reason: 'スマホケースを壊れるまで替えない人には、ケースごと変えずに足せるもの。今のケースに合う色を聞いてから選ぶと使い続けてもらえそうです。', safe: 'ケースを替えずに付けられる' },
        ]},
      ],
      family: [
        { label: '¥1,000〜3,000', min: 1000, max: 3000, items: [
          { emoji: '🧺', name: 'ハンドタオル(今治)', keyword: 'ハンドタオル 今治 無地 セット', reason: '毎日使うものを長く使う人には、毎日使って毎日洗えるものを。無地で枚数のあるセットなら、ローテーションに自然に入っていきそうです。', safe: '好みが分かれにくい無地' },
          { emoji: '☂️', name: '折りたたみ傘(軽量)', keyword: '折りたたみ傘 軽量 コンパクト 自動開閉', reason: 'カバンの中身が決まっている人の、カバンの「いつも入っているもの」のひとつになる道具。軽さを基準に選ぶと、入れ替えてもらいやすいかもしれません。', safe: '誰のカバンにも入る' },
        ]},
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🔋', name: 'モバイルバッテリー(小型)', keyword: 'モバイルバッテリー 小型 軽量 10000mAh', reason: '持ち歩くものを増やしたくない人でも、電池だけは毎日の出番があるもの。今持っているものより軽い・小さい、が選ぶ目安になりそうです。', safe: '使う場面を選ばない' },
          { emoji: '🧣', name: 'ひざ掛けブランケット', keyword: 'ブランケット ひざ掛け 無地 オフィス', reason: '机に向かう時間が長い人の、椅子の背にずっとかかっているもの。使い込んで毛が少し寝てきたころに、もらったことを思い出す品かもしれません。', safe: 'サイズを選ばない' },
        ]},
      ],
      partner: [
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🔑', name: '本革キーケース', keyword: 'キーケース 本革 スリム', reason: '毎日ポケットから出して、毎日しまうもの。革は使い込んだ分だけ色が変わるので、同じものを長く使う人の手元に合いそうです。', safe: '鍵の本数を選ばないスリム型' },
          { emoji: '✒️', name: '名入れボールペン', keyword: '名入れ ボールペン ギフト', reason: 'ペンが1本決まっている人の、次の1本になれるかもしれないもの。名前が入っていると「もらったやつだ」と思い出す回数が増えそうです。', safe: '替え芯で長く使える' },
        ]},
        { label: '¥5,000〜10,000', min: 5000, max: 10000, items: [
          { emoji: '🎧', name: 'ワイヤレスイヤホン', keyword: 'ワイヤレスイヤホン 完全ワイヤレス', reason: '通学や通勤で毎日耳に入るもの。今使っているものの不満(電池、つけ心地)を聞いておくと、使い続けてもらえる一品になりそうです。', safe: '毎日出番がある' },
          { emoji: '👛', name: 'ミニ財布(本革)', keyword: 'ミニ財布 本革 コンパクト', reason: '財布を壊れるまで替えない人は、次を自分で選ぶ機会が少ない人でもあります。今の財布の使い方(カード枚数、小銭の有無)を聞いてから選ぶと長く使われそうです。', safe: '使い方に合わせて型を選べる' },
        ]},
      ],
    },
  },
  takara: {
    emoji: '🖼️', name: '飾って眺める宝物派',
    nickname: '用途のないものを棚に並べていく人',
    tagline: '見るたびに、ちょっとうれしい',
    color: '#8a3fa8',
    description: '雑貨屋で用途のないものを手に取って、しばらく棚に戻せなくなることがありませんか。机の端や棚の一角に、使わないけど好きなものが並んでいる。そういう人かもしれません。買ったものはまず置き場所を決めて、角度を少し直して、眺めて満足する。日々の中でふと目に入って、そのたびに小さくうれしくなる。そのくり返しが、あなたにとっての「もらったもの」の使い方のようです。だから実用性より、見た瞬間に「これ好き」と言えるかどうかが大事になりやすいと思います。写真に撮って誰かに見せたくなるのも、たぶんその延長です。欲しいものを聞かれたら、好きな色や形、好きな世界観をそのまま伝えてみると、選ぶ側のヒントになるかもしれません。',
    wishline: 'これ見といて。私がもらってうれしいのは「飾って眺める宝物派」みたい🎁 使えなくていい、見て好きなやつがいい',
    viewerline: 'この人がもらってうれしいのは「飾って眺める宝物派」らしい。使えなくていい、見た瞬間に好きと言えるものを',
    compat: { partner: 'taiken', note: '思い出づくり体験派は、その場の空気や相手の表情を覚えている人。宝物派が店先で「これ好き」と小さく言った瞬間を、意外とちゃんと記録しているようです。あとから「あのとき見てたやつ」を手渡してくれる組み合わせかもしれません。' },
    gifts: {
      friend: [
        { label: '〜¥1,500', min: 0, max: 1500, items: [
          { emoji: '💐', name: 'ドライフラワーのミニブーケ', keyword: 'ドライフラワー ミニブーケ スワッグ', reason: '水やりがいらず、置くだけで棚の一角ができる小さな束。用途のないものを並べていく人の棚に、ひとつ足す感覚で選べそうです。', safe: '小さいので置き場所に困らない' },
          { emoji: '🖼️', name: 'アートポストカードのセット', keyword: 'アート ポストカード セット おしゃれ', reason: '壁や机の前に貼り替えて眺めるもの。相手の好きな色や世界観に寄せて選べるので、「見てたやつ」を当てやすい部類かもしれません。', safe: '好きな1枚だけ飾れる' },
        ]},
        { label: '¥1,500〜3,000', min: 1500, max: 3000, items: [
          { emoji: '🔮', name: 'ガラスの小さな置物', keyword: 'ガラス 置物 小さい 動物', reason: '光が当たると机の上の見え方が変わる、手のひらサイズのもの。角度を直して眺める人の机に、定位置ができそうです。', safe: '手のひらサイズ' },
          { emoji: '🪵', name: '木製フォトフレーム(卓上)', keyword: 'フォトフレーム 木製 卓上 2L', reason: '写真を撮って誰かに見せたくなる人には、その写真の置き場所を。写真を入れずに渡して、中身は本人に選んでもらうのも手です。', safe: '中身を選ばなくていい' },
        ]},
      ],
      family: [
        { label: '¥1,000〜3,000', min: 1000, max: 3000, items: [
          { emoji: '🫙', name: 'ハーバリウムの小瓶', keyword: 'ハーバリウム 小瓶 ギフト', reason: '手入れがいらず、窓辺でも棚でも光を受けて見え方が変わる瓶。眺める時間が多い人の、目線の高さに置けそうです。', safe: '手入れがいらない' },
          { emoji: '🌷', name: 'ガラスの一輪挿し', keyword: '一輪挿し ガラス 小さい', reason: '花を1本だけ入れても、何も入れなくても形になる器。帰り道に1本買って飾る、という楽しみ方がひとつ増えそうです。', safe: '空でも置ける' },
        ]},
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🌹', name: 'プリザーブドフラワー(ケース入り)', keyword: 'プリザーブドフラワー ギフト ケース入り', reason: '長く形が残る花。ケース入りならほこりの心配が少なく、置いたままで眺め続けられる部類のものです。', safe: 'ケース入りで手入れ不要' },
          { emoji: '🖼️', name: 'アートポスター(フレーム付き)', keyword: 'アートポスター A4 フレーム付き', reason: '部屋の一角の見え方を変えるもの。相手の部屋の色味や、机の上に並んでいるものの系統から選ぶと合わせやすそうです。', safe: 'フレーム付きですぐ飾れる' },
        ]},
      ],
      partner: [
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🎶', name: '木製オルゴール', keyword: 'オルゴール 木製 ギフト', reason: 'ふだんは置物、ネジを巻いた時だけ鳴るもの。眺めて満足する人の棚に、たまに動く一点を足す形です。曲は相手の好きな一曲で選べます。', safe: '曲を選べる' },
          { emoji: '🟤', name: '真鍮の小物トレイ', keyword: '真鍮 トレイ 小物置き', reason: '鍵や指輪を置くだけで、机の一角が小さな展示台になるもの。使うほど色が深くなるので、眺める回数が多い人の手元で表情が変わっていきそうです。', safe: '何を置いても形になる' },
        ]},
        { label: '¥5,000〜10,000', min: 5000, max: 10000, items: [
          { emoji: '🌙', name: '月のランプ(間接照明)', keyword: '月 ランプ 間接照明 充電式', reason: '昼は置物、夜は灯り。机の上の見え方が時間で変わるので、眺める回数が多い人の部屋に合いそうです。', safe: '充電式で置き場所を選ばない' },
          { emoji: '🌿', name: 'ガラスのテラリウム', keyword: 'テラリウム ガラス 完成品 ギフト', reason: 'ガラスの中に小さな景色が入っているもの。角度を変えるたびに見え方が変わるので、置き場所を決めて眺める人の机に、長く居場所ができそうです。', safe: '手入れが少ない完成品を選べる' },
        ]},
      ],
    },
  },
  kiemono: {
    emoji: '🍫', name: 'ちょっといい消えもの派',
    nickname: '普段より一段上のおいしいものに弱い人',
    tagline: '残らないから、ちょっといいものを',
    color: '#b8651a',
    description: 'いつも買うものより、少しだけ上の段にあるものに弱いのではないでしょうか。コーヒーも、お菓子も、調味料も、自分では毎日は選ばないけれど、もらったら「これ、いいやつだ」とすぐ分かる。使い切ったときに、瓶や箱だけ残っていると、少し寂しいような、でも物は増えなくてすっきりしたような。そういう感覚を知っている人かもしれません。部屋の物を増やしたくない気持ちと、おいしいものや上質なものは好きという気持ちが、同時にあるのだと思います。だからもらってうれしいのは、形に残らないけれど、味や香りや手触りで「ちょっといい」が分かるもの。欲しいものを聞かれたら、「普段買わないけど気になってる食べもの・飲みもの」をひとつ挙げると伝わりやすそうです。',
    wishline: 'これ見といて。私がもらってうれしいのは「ちょっといい消えもの派」みたい🎁 物は増やさず、おいしいのがいい',
    viewerline: 'この人がもらってうれしいのは「ちょっといい消えもの派」らしい。残らないもので、普段より一段上を',
    compat: { partner: 'aibou', note: '毎日使う相棒派は、日用品の良し悪しに詳しい人。だから「いつもの」と「ちょっといい」の線引きがうまく、消えもの派が普段買っているものの一段上を見つけやすいようです。「いつも何飲んでる?」から選んでくれる組み合わせかもしれません。' },
    gifts: {
      friend: [
        { label: '〜¥1,500', min: 0, max: 1500, items: [
          { emoji: '☕', name: 'ドリップコーヒーの小さなセット', keyword: 'ドリップコーヒー ギフト 小 詰め合わせ', reason: '普段は同じ豆を買う人に、何種類か試せる袋を。飲み終わったら残らないので、物を増やしたくない人にも渡しやすい部類です。', safe: '消えもの' },
          { emoji: '🍫', name: '個包装のチョコレート', keyword: 'チョコレート ギフト 個包装 おしゃれ', reason: '自分では買わない価格帯の一粒を、少しずつ食べられる形で。「いいやつだ」と分かる人には、個包装の方が味の違いを楽しんでもらえそうです。', safe: '少量ずつ食べられる' },
        ]},
        { label: '¥1,500〜3,000', min: 1500, max: 3000, items: [
          { emoji: '🫧', name: 'クラフトコーラのシロップ', keyword: 'クラフトコーラ シロップ 瓶', reason: '炭酸水で割るだけの一瓶。普段買うものの一段上を、自分で作る楽しさ付きで渡せます。瓶は使い切ったら処分できる大きさです。', safe: '割るだけで手間がない' },
          { emoji: '🍵', name: 'フレーバーティーのティーバッグセット', keyword: 'フレーバーティー ティーバッグ ギフト アソート', reason: '何種類か入っているものなら、毎回違う香りを選ぶ時間がおまけに付く形。飲み切ったら箱ごとなくなるので、物が増えません。', safe: '消えもの' },
        ]},
      ],
      family: [
        { label: '¥1,000〜3,000', min: 1000, max: 3000, items: [
          { emoji: '🍯', name: 'ジャムの詰め合わせ', keyword: 'ジャム 詰め合わせ ギフト 小瓶', reason: '朝のパンが少し変わる、小瓶のセット。普段は買わない果物の味を試せるので、「ちょっといい」が毎朝分かる形です。', safe: '小瓶で使い切れる' },
          { emoji: '🧁', name: 'フィナンシェの詰め合わせ', keyword: 'フィナンシェ 詰め合わせ ギフト', reason: 'お茶の時間に一つずつ。家族で分けられる個数のものなら、残らない贈り物を一緒に食べる時間に変えられそうです。', safe: '個包装で分けられる' },
        ]},
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🍚', name: 'お茶漬けの詰め合わせ', keyword: 'お茶漬け 高級 ギフト 詰め合わせ', reason: '普段のごはんが一段変わる形の消えもの。鯛や鮭など、いつもは買わない具のものを選ぶと「いいやつだ」が伝わりそうです。', safe: '常温で日持ちする' },
          { emoji: '🫒', name: 'オリーブオイルのギフト', keyword: 'オリーブオイル ギフト エキストラバージン', reason: '台所で毎日少しずつ減っていくもの。使い切ったら瓶ひとつ残るだけなので、料理をする家族への「物を増やさない」贈り物になりそうです。', safe: '料理に使う場面が多い' },
        ]},
      ],
      partner: [
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🍬', name: 'ボンボンショコラの詰め合わせ', keyword: 'ボンボンショコラ 詰め合わせ ギフト', reason: '一粒ずつ味が違う箱。自分では買わない価格帯のものを、ふたりで一粒ずつ開けていく時間ごと渡せる形です。', safe: '消えもの' },
          { emoji: '🫘', name: 'スペシャルティコーヒー豆のセット', keyword: 'スペシャルティコーヒー 豆 セット ギフト', reason: 'いつも同じ豆を買っている人に、産地違いを飲み比べる袋を。「どれがいちばんだった?」の話題が、飲み終わるまで続きそうです。', safe: '飲み終わったら残らない' },
        ]},
        { label: '¥5,000〜10,000', min: 5000, max: 10000, items: [
          { emoji: '🍰', name: 'ホテルやパティスリーのお取り寄せケーキ', keyword: 'お取り寄せ ケーキ 冷凍 ギフト', reason: '店まで行かないと買えないものを、家で開ける形に。相手の好きな味(チョコ、チーズ、果物)を聞いてから選ぶのが近道です。', safe: '好きな味で選べる' },
          { emoji: '📖', name: 'グルメのカタログギフト', keyword: 'カタログギフト グルメ 5000円', reason: '何を選ぶか、本人に任せる消えもの。ちょっといいものの好みがはっきりしている人ほど、ページをめくる時間も楽しんでもらえそうです。', safe: '本人が選べる' },
        ]},
      ],
    },
  },
  taiken: {
    emoji: '🎟️', name: '思い出づくり体験派',
    nickname: '何をもらったかより、どこに行ったかを覚えている人',
    tagline: '箱じゃなくて、予定がほしい',
    color: '#1f8a5a',
    description: 'ものをもらった記憶より、「あの日どこに行ったか」の記憶のほうが、たくさん残っているのではないでしょうか。写真フォルダは景色と人の顔が多めで、買ったものの写真は少なめ。部屋に飾るものは少ないのに、スマホの中には思い出が山ほどある。そういう人かもしれません。誕生日もお礼も、品物の中身より「一緒に過ごした時間」を覚えていて、何をもらったかは思い出せないことがありそうです。だからもらってうれしいのは、箱に入ったものより、予定や時間のような、あとで語れるもの。カードゲームでも、地図でも、カタログでも、「次にやること」が生まれる贈り物に気持ちが動くようです。欲しいものを聞かれたら、「行きたい場所」や「やってみたいこと」をそのまま言うと、相手も計画しやすいと思います。',
    wishline: 'これ見といて。私がもらってうれしいのは「思い出づくり体験派」みたい🎁 箱より予定、どこか行こ',
    viewerline: 'この人がもらってうれしいのは「思い出づくり体験派」らしい。箱に入ったものより、あとで語れる予定を',
    compat: { partner: 'kotoba', note: 'ことばがいちばん派は、予定を立てるときに相手の話をよく聞く人。「行きたい」とこぼした場所を覚えていて、計画そのものを贈り物にしてくれるようです。体験派にとっては、当日より前の「どこ行く?」のやりとりから楽しみが始まる組み合わせかもしれません。' },
    gifts: {
      friend: [
        { label: '〜¥1,500', min: 0, max: 1500, items: [
          { emoji: '🃏', name: '小さなカードゲーム', keyword: 'カードゲーム 2人 から 小型', reason: '渡したその場で「やってみる?」が始まるもの。箱は小さいのに、遊んだ時間の方が残る形です。人数の少ない集まりでも遊べるものを。', safe: '少人数でも遊べる' },
          { emoji: '📷', name: 'ポケットアルバム(小)', keyword: 'ポケットアルバム 小さい おしゃれ', reason: 'スマホの中の思い出を、何枚かだけ紙にして入れる場所。アルバムだけ渡して、中身は一緒に選ぶ、という使い方もできます。', safe: '中身は本人が選べる' },
        ]},
        { label: '¥1,500〜3,000', min: 1500, max: 3000, items: [
          { emoji: '🗾', name: 'スクラッチマップ(日本)', keyword: 'スクラッチマップ 日本 地図', reason: '行った場所を削っていく地図。「次はここ」の話が自然に始まるので、どこに行ったかを覚えている人の壁に合いそうです。', safe: '壁に貼るだけ' },
          { emoji: '🍪', name: 'お菓子作りのキット', keyword: 'お菓子作り キット 手作り セット', reason: '食べる前に「作る時間」が付いてくる消えもの。ふたりで作るのもひとりで作るのも、写真が増える部類の贈り物です。', safe: '材料がそろっている' },
        ]},
      ],
      family: [
        { label: '¥1,000〜3,000', min: 1000, max: 3000, items: [
          { emoji: '🎲', name: '家族で遊べるボードゲーム', keyword: 'ボードゲーム 家族 簡単 みんなで', reason: '箱を開けたらその日の予定になるもの。ルールが短いものを選ぶと、年齢の違う家族でも同じテーブルにつきやすそうです。', safe: 'ルールが短いものを選べる' },
          { emoji: '🧩', name: 'ジグソーパズル', keyword: 'ジグソーパズル 1000ピース 風景', reason: '何日かかけて少しずつ進める時間が、そのまま贈り物になる形。行ったことのある場所の風景なら、思い出の話もついてきます。', safe: '完成後は飾れる' },
        ]},
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🎁', name: '体験のカタログギフト', keyword: '体験 カタログギフト', reason: '品物ではなく「行き先」を選ぶカタログ。何を選ぶかの相談から始まるので、予定が好きな人にはページをめくる時間も含めて渡せます。', safe: '本人が行き先を選べる' },
          { emoji: '🌌', name: '家庭用プラネタリウム', keyword: 'プラネタリウム 家庭用 投影', reason: '部屋の電気を消すだけで、その夜が少し特別な予定になるもの。残るのは本体より、見上げた時間の方かもしれません。', safe: '部屋で使える' },
        ]},
      ],
      partner: [
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '♟️', name: 'ふたりで遊べるボードゲーム', keyword: 'ボードゲーム 2人用 対戦', reason: '何回でも遊べる予定を箱に入れて渡す形。「次はいつやる?」が自然に出るので、会う理由がひとつ増えそうです。', safe: '2人専用で人数を気にしない' },
          { emoji: '🍿', name: 'ポップコーンメーカー', keyword: 'ポップコーンメーカー 家庭用', reason: '家での映画の夜を、少し「出かけた感じ」にする道具。何を観るかの相談ごと渡せるので、予定を作る人に合いそうです。', safe: '使い方が簡単' },
        ]},
        { label: '¥5,000〜10,000', min: 5000, max: 10000, items: [
          { emoji: '📸', name: 'インスタントカメラ', keyword: 'インスタントカメラ チェキ 本体', reason: '撮ったその場で紙になるカメラ。スマホの中の思い出が多い人に、手渡しできる形の写真を増やす道具です。', safe: '使い方が簡単' },
          { emoji: '🎫', name: 'ペアの体験カタログギフト', keyword: 'カタログギフト 体験 ペア', reason: 'ふたりで行く前提の行き先を選ぶカタログ。「どこにする?」の相談から当日まで、ひとつの贈り物が何週間かぶん続きます。', safe: 'ふたりで行き先を選べる' },
        ]},
      ],
    },
  },
  kotoba: {
    emoji: '💌', name: 'ことばがいちばん派',
    nickname: '箱の前に、カードを先に読む人',
    tagline: '中身より、一行がほしい',
    color: '#c7345a',
    rare: true,
    description: '残るか残らないか、実用かときめきか。どの問いにも「どっちでもいい」と答えたくなった人かもしれません。もらうものの中身より、「なんでこれを選んだか」のほうを覚えているタイプかもしれません。箱を開ける前にカードがあれば、まずそれを読む。中身がお菓子ひとつでも、添えられた一言が自分のことをちゃんと見てくれたものなら、そのカードを何年も捨てられずにいる。そんな経験がありそうです。実用でもときめきでもなく、残るか残らないかでもなく、「自分のことを考えて選んでくれた時間」が、あなたにとっての贈り物なのだと思います。だから高価なものより、短くても手書きの一行が添えられたもの。欲しいものを聞かれたら、「何でもいいけど、ひとこと書いてほしい」と伝えてみてください。それがいちばん具体的なリクエストになるかもしれません。',
    wishline: 'これ見といて。私がもらってうれしいのは「ことばがいちばん派」みたい🎁 中身は何でもいい、一行書いて',
    viewerline: 'この人がもらってうれしいのは「ことばがいちばん派」らしい。中身は小さくていい、手書きの一行を添えて',
    compat: { partner: 'takara', note: '飾って眺める宝物派は、品物に意味をつけるのが得意な人。「なぜこれを選んだか」を自然に言葉にする習慣があるので、ことば派がいちばん読みたい一行を、頼まなくても添えてくれるようです。カードの方が長くなる組み合わせかもしれません。' },
    gifts: {
      friend: [
        { label: '〜¥1,500', min: 0, max: 1500, items: [
          { emoji: '💌', name: 'メッセージカード付きクッキー', keyword: 'メッセージカード付き クッキー ギフト', reason: 'カードを先に読む人には、カードが主役でお菓子が添えもの、の順で。クッキーは食べ終わっても、一行は残ります。', safe: 'カードは手書きで足せる' },
          { emoji: '🍬', name: 'ポップアップカードと小さなお菓子', keyword: 'ポップアップ メッセージカード 立体', reason: '開いた瞬間に形が立ち上がるカードに、個包装の飴やチョコを一つ添える組み合わせ。中身より「開ける時間」を渡す形です。', safe: 'カードが残る' },
        ]},
        { label: '¥1,500〜3,000', min: 1500, max: 3000, items: [
          { emoji: '☕', name: 'メッセージカード付きドリップコーヒー', keyword: 'ドリップコーヒー ギフト メッセージカード付き', reason: '一杯ずつ飲むコーヒーに、一行を添える形。飲み終わるまで何日かあるので、そのあいだカードが机に置かれている時間が長めです。', safe: '消えもの+カード' },
          { emoji: '🍪', name: 'メッセージ入りのクッキー缶', keyword: 'メッセージクッキー 缶 名入れ', reason: 'クッキーそのものに文字が焼かれているもの。食べる前に読む、という順番がそのまま贈り物になる人に合いそうです。缶は小物入れとして残せます。', safe: '缶が残る' },
        ]},
      ],
      family: [
        { label: '¥1,000〜3,000', min: 1000, max: 3000, items: [
          { emoji: '🍡', name: 'メッセージ入りどら焼き', keyword: 'メッセージ入り どら焼き ギフト', reason: '皮に一言が焼き印されたどら焼き。家族で分けて食べる前に、まず文字を読む時間ができる形です。短い言葉ほどよく残ります。', safe: '消えもの' },
          { emoji: '🍵', name: 'メッセージカード付きの紅茶ギフト', keyword: '紅茶 ギフト メッセージカード付き', reason: 'お茶の時間に読み返せるカードを添える形。日常の中に「読む時間」を置けるので、言葉を覚えている人の家に合いそうです。', safe: '消えもの+カード' },
        ]},
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🎂', name: 'メッセージ入りバウムクーヘン', keyword: 'メッセージ入り バウムクーヘン ギフト', reason: '切り分ける前に、まず文字を囲む時間ができるお菓子。家族みんなで読んでから食べる、という順番がそのまま思い出になりそうです。', safe: '家族で分けられる' },
          { emoji: '🍮', name: '名入れ・メッセージ入りカステラ', keyword: '名入れ カステラ ギフト メッセージ', reason: '焼き印やパッケージに言葉が入るカステラ。切り分ける前に家族で文字を読む時間ができるので、言葉を覚えている人には読む回数の多い消えものです。', safe: '常温で日持ちする' },
        ]},
      ],
      partner: [
        { label: '¥3,000〜5,000', min: 3000, max: 5000, items: [
          { emoji: '🍫', name: 'メッセージカード付きチョコレートギフト', keyword: 'チョコレート ギフト メッセージカード付き 高級', reason: '箱を開ける前に読む一行を、いちばん読んでもらいたい相手に。チョコは消えても、カードは手帳にはさんで残せます。', safe: 'カードは手書きで足せる' },
          { emoji: '🫖', name: '名入れ・メッセージ入りのお茶ギフト', keyword: 'お茶 ギフト 名入れ メッセージ', reason: 'パッケージに名前や短い言葉が入るもの。飲み切るまで何度も目に入るので、言葉を覚えている人には読む回数が多い贈り物になりそうです。', safe: '消えもの' },
        ]},
        { label: '¥5,000〜10,000', min: 5000, max: 10000, items: [
          { emoji: '🧁', name: 'メッセージプレート付きのお取り寄せケーキ', keyword: 'お取り寄せ ケーキ メッセージプレート 付き', reason: 'プレートに書いた一行を、ふたりで読んでから切り分ける形。何を書くかを考える時間も、贈り物の一部にできます。', safe: '文面を自分で決められる' },
          { emoji: '🍇', name: 'メッセージカード付きのフルーツギフト', keyword: 'フルーツ ギフト メッセージカード付き', reason: '箱を開けた瞬間の香りと、ふたを開ける前に読む一行をいっしょに。果物は数日で食べ終わりますが、カードはそのあとも手元に残せる形です。', safe: '消えもの+カード' },
        ]},
      ],
    },
  },
};

// ---- シェア文(本人用。結果画面のX/LINEボタン用。おねだり送信にはPRESENT_TYPES[id].wishlineを使う) ----
// 型: 「私がもらってうれしいプレゼントは『〇〇派』でした🎁 参考にしてくれてもいいよ #もらってうれしいプレゼント診断 #これ見といて」
function presentShareText(typeId) {
  const t = PRESENT_TYPES[typeId];
  return `私がもらってうれしいプレゼントは『${t.name}』でした${t.emoji}🎁\n参考にしてくれてもいいよ\n#もらってうれしいプレゼント診断 #これ見といて`;
}

// ---- 贈る側(シェアされた結果を開いた人)向けの関係ラベル。gifts のキーと対応 ----
const PRESENT_RELATIONS = [
  { id: 'friend',  label: '友達に贈る' },
  { id: 'family',  label: '家族に贈る' },
  { id: 'partner', label: '恋人に贈る' },
];

// ===== ここまでpresent_content.jsの写し。ここから下はpresent.js独自 =====

const AFFILIATE_TAG = 'tinywonders-22';

// 帯ごとのAmazon検索URL。p_36は「円×100」で指定する(下限0円は1円=100として扱う)。並び順パラメータは付けない
function presentAffiliateUrl(keyword, min, max) {
  const lo = Math.max(1, min) * 100;
  const hi = max * 100;
  const base = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&rh=p_36%3A${lo}-${hi}`;
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

// 帯の価格表示ラベル(gift.jsのgiftLinkHtmlのpriceLabelに渡す)
function presentPriceLabel(min, max) {
  const fmt = (n) => n.toLocaleString('ja-JP');
  if (!min) return `¥${fmt(max)}以下で検索`;
  return `¥${fmt(min)}〜${fmt(max)}の価格帯で検索`;
}

// ---- スコア計算(純粋関数) ----
function computePresentScores(answers) {
  let nokoru = 0, tokimeki = 0;
  answers.forEach((a) => {
    if (a.axis === 'nokoru') nokoru += a.weight;
    else tokimeki += a.weight;
  });
  return { nokoru, tokimeki };
}

// Node(検証スクリプト)からも読み込めるようにエクスポート(ブラウザでは無視される)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRESENT_QUESTIONS, PRESENT_TYPES, PRESENT_RELATIONS, presentTypeId, presentShareText,
    computePresentScores, presentAffiliateUrl, presentPriceLabel,
  };
}

// ===== ここから先はブラウザ実行のみ(DOM操作) =====
if (typeof document !== 'undefined') {
  (function () {
    const QUIZ = 'present';
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
    let lastResult = null; // { id, nokoru, tokimeki }
    // シェアされた結果URLから開いた時はtrue(商品欄を「この人に贈るなら」に切り替える)
    let sharedView = false;
    let currentRelation = 'friend';
    let bandEls = [];

    // GA4イベント送信(ローカル開発時・GA未読込時は何もしない)
    function track(name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    }

    // スタート画面のバナーが無い(まだ用意していない)時は枠ごと隠す
    (function hideMissingBanner() {
      const img = document.querySelector('.start-banner img');
      if (!img) return;
      const hide = () => { img.parentElement.hidden = true; };
      if (img.complete && !img.naturalWidth) hide();
      else img.addEventListener('error', hide);
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
      if (currentIndex >= PRESENT_QUESTIONS.length) {
        showResult();
        return;
      }
      const q = PRESENT_QUESTIONS[currentIndex];
      progressFill.style.width = `${(currentIndex / PRESENT_QUESTIONS.length) * 100}%`;
      progressFill.parentElement.setAttribute('aria-valuenow', String(currentIndex + 1));
      progressFill.parentElement.setAttribute('aria-valuemax', String(PRESENT_QUESTIONS.length));
      progressText.textContent = `${currentIndex + 1} / ${PRESENT_QUESTIONS.length}`;
      addBubble(q.text, 'ai');
      renderOptions(q);
    }

    function addBubble(text, who) {
      const wrap = document.createElement('div');
      wrap.className = `bubble-row ${who}`;
      if (who === 'ai') {
        wrap.innerHTML = `<div class="avatar">🎁</div><div class="bubble ai">${text}</div>`;
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
      const { nokoru, tokimeki } = computePresentScores(answers);
      const id = presentTypeId(nokoru, tokimeki);
      lastResult = { id, nokoru, tokimeki };
      track('quiz_complete', { quiz_name: QUIZ, result_type: id });
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      // 結果に切り替わったことを読み上げで伝える(選択肢ボタンが消えてフォーカスが迷子にならないように)
      document.querySelector('#screen-result .result-title').focus();
    }

    function renderResult(result) {
      const t = PRESENT_TYPES[result.id];
      const partner = PRESENT_TYPES[t.compat.partner];

      setTypeIllust(document.getElementById('nandere-emoji'), result.id, t, 'type-illust');
      document.getElementById('nandere-name').textContent = t.name;
      document.querySelector('#screen-result .result-title').innerHTML =
        `私がもらってうれしいのは<wbr><span class="grad-text" style="white-space:nowrap">「${t.name}」</span>`;
      document.getElementById('nandere-nickname').textContent = t.nickname;
      document.getElementById('nandere-tagline').textContent = t.tagline;
      document.getElementById('nandere-desc').textContent = t.description;
      document.getElementById('nandere-card').style.setProperty('--accent', t.color);
      document.getElementById('nandere-rarity-wrap').style.display = t.rare ? 'block' : 'none';

      // 相性のいい贈り手タイプ
      setTypeIllust(document.getElementById('compat-emoji'), t.compat.partner, partner, 'compat-illust');
      document.getElementById('compat-name').textContent = partner.name;
      document.getElementById('compat-note').textContent = t.compat.note;

      // 商品欄(結果の主役)。関係の既定は友達
      currentRelation = 'friend';
      renderRelationButtons();
      renderPresentGifts(result);

      // 「次はこれ」欄の表示計測(next_quiz_clickの分母)。結果を出すたびに数え直す
      giftObserveOnce(document.querySelector('.next-quiz'), () => {
        track('section_view', { quiz_name: QUIZ, result_type: result.id, placement: 'next_card', mode: sharedView ? 'gift' : 'self' });
      });
    }

    // ---- 関係の切り替え(友達/家族/恋人) ----
    const RELATION_SHORT = { friend: '友達', family: '家族', partner: '恋人' };
    function renderRelationButtons() {
      const wrap = document.getElementById('present-relations');
      wrap.setAttribute('aria-label', sharedView ? '贈る相手との関係' : 'くれる相手との関係');
      wrap.innerHTML = PRESENT_RELATIONS.map((r) => {
        // 本人画面は「〇〇から」(もらう側)、シェア閲覧者は「〇〇に贈る」(贈る側)
        const label = sharedView ? r.label : `${RELATION_SHORT[r.id]}から`;
        return `<button type="button" class="present-relation-btn" data-relation="${r.id}" aria-pressed="${r.id === currentRelation}">${giftEsc(label)}</button>`;
      }).join('');
      wrap.querySelectorAll('.present-relation-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!lastResult || btn.dataset.relation === currentRelation) return;
          currentRelation = btn.dataset.relation;
          wrap.querySelectorAll('.present-relation-btn').forEach((b) => {
            b.setAttribute('aria-pressed', String(b.dataset.relation === currentRelation));
          });
          renderPresentGifts(lastResult);
        });
      });
    }

    // 2帯×2点。gift.jsのgiftLinkHtml(価格ラベル・safeタグ付き)で描く
    function renderPresentGifts(result) {
      const t = PRESENT_TYPES[result.id];
      const mode = sharedView ? 'gift' : 'self';
      const relation = currentRelation;
      const bands = t.gifts[relation];
      const el = document.getElementById('present-gifts');
      document.getElementById('present-gift-heading').textContent = sharedView
        ? `「${t.name}」のこの人に贈るなら`
        : `「${t.name}」のあなたへ、もらってうれしい候補`;
      document.getElementById('present-gift-season').textContent = giftSeasonLine(mode);
      el.innerHTML = bands.map((band, bi) => `
        <div class="guide-band present-band">
          <p class="guide-band-title">${giftEsc(band.label)}</p>
          ${bi === 0 ? '<p class="guide-band-note">Amazonの検索結果には、この価格帯の外の商品も出ることがあります</p>' : ''}
          ${band.items.map((it) => giftLinkHtml({
            href: presentAffiliateUrl(it.keyword, band.min, band.max), icon: it.emoji, name: it.name, reason: it.reason,
            priceLabel: presentPriceLabel(band.min, band.max), safe: it.safe,
            placement: `present_band${bi + 1}`, mode, nameFirst: true,
          })).join('')}
        </div>`).join('');
      el.querySelectorAll('.lucky-item').forEach((a) => {
        a.addEventListener('click', () => {
          track('affiliate_click', {
            quiz_name: QUIZ, result_type: result.id, relation,
            placement: a.dataset.affPlacement, mode, item_name: a.dataset.affItem,
          });
        });
      });
      // 帯ごとに表示計測(affiliate_clickの分母)。関係を切り替えるたびに描き直すので、関係ごとに一度ずつ数える
      bandEls.forEach((b) => { if (b._giftObs) { b._giftObs.disconnect(); b._giftObs = null; } });
      bandEls = Array.from(el.querySelectorAll('.present-band'));
      bandEls.forEach((b, bi) => {
        giftObserveOnce(b, () => {
          track('section_view', { quiz_name: QUIZ, result_type: result.id, relation, placement: `present_band${bi + 1}`, mode });
        });
      });
    }

    function resultUrl(result) {
      return `${location.origin}${location.pathname}?n=${result.nokoru}&t=${result.tokimeki}`;
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
      const text = presentShareText(lastResult.id);
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
      track('share', { method: 'x', quiz_name: QUIZ, content_type: QUIZ, item_id: lastResult.id, mode: sharedView ? 'gift' : 'self' });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    // LINEが主(おねだり型: 恋人・家族・友達に「これ見といて」と送る)。本文はwishline
    function shareResultLine() {
      if (!lastResult) return;
      const text = PRESENT_TYPES[lastResult.id].wishline;
      const url = encodeURIComponent(resultUrl(lastResult));
      const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
      track('share', { method: 'line', quiz_name: QUIZ, content_type: QUIZ, item_id: lastResult.id, mode: sharedView ? 'gift' : 'self' });
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    // 「次はこれ」カードと文字リンクのクリック計測(同じタブで遷移するのでbeacon)
    document.querySelectorAll('.next-quiz-card, .follow-links a[data-next]').forEach((el) => {
      el.addEventListener('click', () => {
        track('next_quiz_click', {
          quiz_name: QUIZ, target: el.dataset.next, mode: sharedView ? 'gift' : 'self',
          placement: el.classList.contains('next-quiz-card') ? 'next_card' : 'follow_links', transport_type: 'beacon',
        });
      });
    });

    // 最下部のタイプ別プレゼントガイドへの1行
    document.getElementById('present-guide-link').addEventListener('click', () => {
      track('gift_guide_click', {
        quiz_name: QUIZ, result_type: lastResult ? lastResult.id : '', placement: 'present_footer',
        mode: sharedView ? 'gift' : 'self', transport_type: 'beacon',
      });
    });

    // 主ボタンの入れ替え(sharedViewでは「自分も診断する」を先頭・主ボタンにし、X/LINEのシェアは隠してURLコピーだけ残す。
    // 他人の結果を本人の言葉「私がもらってうれしいのは」のままシェアさせないため)
    function setPrimaryButtons(shared) {
      const restartBtn = document.getElementById('btn-restart');
      const lineBtn = document.getElementById('btn-share-line');
      lineBtn.style.display = shared ? 'none' : '';
      document.getElementById('btn-share').style.display = shared ? 'none' : '';
      if (shared) {
        restartBtn.className = 'btn-primary';
        lineBtn.className = 'btn-secondary btn-line';
        restartBtn.textContent = '自分も診断する 🎁';
        restartBtn.parentNode.prepend(restartBtn);
      } else {
        lineBtn.className = 'btn-primary';
        restartBtn.className = 'btn-secondary';
        restartBtn.textContent = 'もう一度診断する';
        lineBtn.parentNode.prepend(lineBtn);
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

    // ===== 結果カード画像生成(meroru.jsと同じ描き方を、%なし・相性の贈り手つきに置き換え) =====
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

    // タイプ別イラスト(img/types/present-<id>.jpg)。読み込めない時は絵文字のまま
    function typeImgSrc(id) {
      return `img/types/present-${id}.jpg`;
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

    function drawPresentCard(ctx, W, H, result, opts) {
      const t = PRESENT_TYPES[result.id];
      const partner = PRESENT_TYPES[t.compat.partner];
      cardDrawBackground(ctx, W, H);
      ctx.textBaseline = 'middle';

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

      ctx.font = `700 ${opts.eyebrowSize}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      // シェアされた結果を開いた人の画面では、主語を「この人」にする(viewerlineと同じ言い方)
      ctx.fillText(`もらってうれしいプレゼント診断 RESULT|${sharedView ? 'この人' : '私'}がもらってうれしいのは`, W / 2, y, W - 80);
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

      if (sharedView) {
        // 閲覧者向け: 本人の言葉のタグラインの代わりに viewerline(「この人が〜らしい」)を出す
        // 縦長は「。」の後で2行に分ける(文字数で折ると「。」が行頭に来るため)。横長は1行
        const segs = opts.viewerLines > 1 ? t.viewerline.split(/(?<=。)/) : [t.viewerline];
        const size = Math.min(...segs.map((sg) => cardFitTextMultiline(ctx, sg, W - 160, '700', "'Zen Maru Gothic', sans-serif", opts.badgeFont, opts.viewerMinSize, 1).size));
        ctx.font = `700 ${size}px 'Zen Maru Gothic', sans-serif`;
        ctx.fillStyle = CARD_PAL.text;
        const lh = size * 1.45;
        segs.forEach((line, i) => ctx.fillText(line, W / 2, y + i * lh, W - 80));
        y += opts.badgeGap + (segs.length - 1) * lh;
      } else {
        // タグライン or レアバッジ
        const badgeText = t.rare ? `${t.tagline}(出現率 約5%)` : t.tagline;
        ctx.font = `700 ${opts.badgeFont}px 'Zen Maru Gothic', sans-serif`;
        const bw = ctx.measureText(badgeText).width + opts.badgeFont * 2;
        const bh = opts.badgeFont * 2;
        ctx.fillStyle = t.color;
        cardRoundRect(ctx, W / 2 - bw / 2, y - bh / 2, bw, bh, bh / 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText(badgeText, W / 2, y + 2);
        y += opts.badgeGap;
      }

      ctx.font = `600 ${opts.compatFont}px 'Zen Maru Gothic', sans-serif`;
      ctx.fillStyle = CARD_PAL.sub;
      ctx.fillText(`相性のいい贈り手は ${partner.emoji} ${partner.name}`, W / 2, y);
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
      ctx.fillText('あなたは何派? 無料1分診断', W / 2, y);
      ctx.fillStyle = CARD_PAL.sub;
      ctx.font = `600 ${opts.brandSize}px Poppins, sans-serif`;
      ctx.fillText('Desk Animals | 「もらってうれしいプレゼント診断」で検索', W / 2, y + opts.brandOffset);
      ctx.textAlign = 'left';
    }

    function buildPresentCardCanvas(result, mode, illust) {
      const canvas = document.createElement('canvas');
      if (mode === 'story') {
        canvas.width = 1080; canvas.height = 1920;
        drawPresentCard(canvas.getContext('2d'), 1080, 1920, result, {
          illust,
          circleY: 480, circleR: 230, gapAfterCircle: 110, eyebrowSize: 30, eyebrowGap: 90,
          nameSize: 84, nameMinSize: 50, nameGap: 100,
          nicknameSize: 40, nicknameGap: 90,
          badgeFont: 32, badgeGap: 90, viewerMinSize: 26, viewerLines: 2,
          compatFont: 32, compatGap: 60,
          lineHalf: 360, ctaGap: 70, ctaSize: 40, brandSize: 26, brandOffset: 46,
        });
      } else {
        canvas.width = 1200; canvas.height = 630;
        drawPresentCard(canvas.getContext('2d'), 1200, 630, result, {
          illust,
          circleY: 130, circleR: 85, gapAfterCircle: 44, eyebrowSize: 22, eyebrowGap: 52,
          nameSize: 52, nameMinSize: 32, nameGap: 56,
          nicknameSize: 26, nicknameGap: 48,
          badgeFont: 22, badgeGap: 50, viewerMinSize: 16, viewerLines: 1,
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
        const canvas = buildPresentCardCanvas(result, 'x', await illust);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.alt = `もらってうれしいプレゼント診断の結果カード:${PRESENT_TYPES[result.id].name}`;
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
      track('save_card', { quiz_name: QUIZ, card_format: mode });
      try {
        const canvas = buildPresentCardCanvas(lastResult, mode, await loadTypeImage(lastResult.id));
        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            if (!blob) { resolve(); return; }
            const a = document.createElement('a');
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `present-shindan-${lastResult.id}-${mode}.png`;
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

    // 結果URL(?n=&t=)から直接開かれた場合は、その場で同じ結果を再現する(贈る側の表示)
    (function loadFromResultParams() {
      const params = new URLSearchParams(location.search);
      const nRaw = params.get('n');
      const tRaw = params.get('t');
      if (!/^-?\d{1,2}$/.test(nRaw || '') || !/^-?\d{1,2}$/.test(tRaw || '')) return;
      const nokoru = parseInt(nRaw, 10);
      const tokimeki = parseInt(tRaw, 10);
      if (!Number.isFinite(nokoru) || !Number.isFinite(tokimeki)) return;
      if (Math.abs(nokoru) > 10 || Math.abs(tokimeki) > 10) return;
      const id = presentTypeId(nokoru, tokimeki);
      lastResult = { id, nokoru, tokimeki };
      sharedView = true;
      showScreen('result');
      renderResult(lastResult);
      renderCardPreview(lastResult);
      document.querySelector('#screen-result .result-title').innerHTML =
        `この人がもらってうれしいのは<wbr><span class="grad-text" style="white-space:nowrap">「${PRESENT_TYPES[id].name}」</span>`;
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
