// ===== 設問データ(2026-08-09 改訂: 丁寧な文体+4択すべて異なる内容) =====
// opts: 4つの選択肢。各軸2つずつ(strong=weight2, weak=weight1)を含むが、
// 見た目上は全て独立した文章として提示する(強弱ラベルは表示しない)
const QUESTIONS = [
  // ---- 性格編 ----
  { block: 'personality', text: 'あなたは、休日に誰からも予定を誘われなかったとき、どのように過ごすことが多いですか?', opts: [
    { text: '一人の時間を大切にして、家でゆっくり過ごす', axis: 'I', weight: 2 },
    { text: '気心の知れた一人か二人だけを誘って会う', axis: 'I', weight: 1 },
    { text: 'SNSやグループに声をかけて、誰かと予定を作る', axis: 'E', weight: 1 },
    { text: '自分から積極的に人を集めて、賑やかに過ごす', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、初対面の人と話すとき、どのように振る舞うことが多いですか?', opts: [
    { text: '相手の話をじっくり聞く側に徹する', axis: 'I', weight: 2 },
    { text: '聞かれたことには答えるが、自分からはあまり話さない', axis: 'I', weight: 1 },
    { text: '相手に質問を投げかけながら会話を広げる', axis: 'E', weight: 1 },
    { text: '自分から積極的に話しかけ、場を盛り上げる', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、新しい物事を考えるとき、どのようなアプローチを取りますか?', opts: [
    { text: 'これまでの経験や具体的な事実をもとに考える', axis: 'S', weight: 2 },
    { text: 'まず実例やデータがないか確認してから考える', axis: 'S', weight: 1 },
    { text: 'まずはアイデアやイメージを膨らませてみる', axis: 'N', weight: 1 },
    { text: '可能性や本質的な意味を直感的に捉えようとする', axis: 'N', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、読む本を選ぶとしたら、どちらのジャンルに惹かれますか?', opts: [
    { text: '実生活にすぐ役立つ実用書やノウハウ本', axis: 'S', weight: 2 },
    { text: '事実に基づいたノンフィクションや伝記', axis: 'S', weight: 1 },
    { text: '想像力をかき立てられるファンタジーや文学', axis: 'N', weight: 1 },
    { text: '世界観や概念を深く考えさせられる哲学書やSF', axis: 'N', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、友人から悩みを相談されたとき、どのように対応しますか?', opts: [
    { text: '原因を整理して、具体的な解決策を提示する', axis: 'T', weight: 2 },
    { text: 'まず状況を客観的に分析しようとする', axis: 'T', weight: 1 },
    { text: '相手の話にじっくり耳を傾けようとする', axis: 'F', weight: 1 },
    { text: 'まず気持ちに寄り添い、共感することを優先する', axis: 'F', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、誰かと意見が対立したとき、何を優先しますか?', opts: [
    { text: '感情よりも論理的な正しさを優先する', axis: 'T', weight: 2 },
    { text: '事実やデータに基づいて話を進めようとする', axis: 'T', weight: 1 },
    { text: '相手の立場や気持ちも考慮しようとする', axis: 'F', weight: 1 },
    { text: 'その場の空気や人間関係を何より優先する', axis: 'F', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、旅行に行くとき、計画をどのように立てますか?', opts: [
    { text: '行程やスケジュールを事前にきっちり決めておく', axis: 'J', weight: 2 },
    { text: '大まかな予定は決めておきたいと思う', axis: 'J', weight: 1 },
    { text: '現地で状況を見ながら決めたいと思う', axis: 'P', weight: 1 },
    { text: '計画はほとんど立てず、行き当たりばったりを楽しむ', axis: 'P', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたの普段の部屋は、どのような状態であることが多いですか?', opts: [
    { text: '常に整理整頓されていないと落ち着かない', axis: 'J', weight: 2 },
    { text: 'ある程度は片付いた状態を保つようにしている', axis: 'J', weight: 1 },
    { text: '多少散らかっていても、あまり気にならない', axis: 'P', weight: 1 },
    { text: '必要なものが出しっぱなしでも平気なタイプだ', axis: 'P', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、大人数の集まりに参加すると、どのように過ごすことが多いですか?', opts: [
    { text: '気づけば静かな隅の方で過ごしている', axis: 'I', weight: 2 },
    { text: '話しかけられれば応じるが、自分からは動かない', axis: 'I', weight: 1 },
    { text: '気になる相手には自分から話しかけに行く', axis: 'E', weight: 1 },
    { text: '気づけば輪の中心で場を盛り上げている', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'あなたは、締め切りのある作業に対して、どのように取り組みますか?', opts: [
    { text: '早めに終わらせて、余裕を持って安心したい', axis: 'J', weight: 2 },
    { text: '余裕を持って進めたいと思っている', axis: 'J', weight: 1 },
    { text: '追い込まれてから本気を出すことが多い', axis: 'P', weight: 1 },
    { text: '直前になるほど集中力が高まり、力を発揮する', axis: 'P', weight: 2 },
  ]},

  // ---- 恋愛編 ----
  { block: 'love', text: 'あなたは、好きな人をデートに誘うとしたら、どのようなスタイルを好みますか?', opts: [
    { text: '友人グループも交えて、みんなでワイワイ楽しみたい', axis: 'E', weight: 2 },
    { text: '気心の知れた数人を交えつつ楽しみたい', axis: 'E', weight: 1 },
    { text: '気の合う友人1人くらいを交えるのも悪くないと思う', axis: 'I', weight: 1 },
    { text: '二人きりで、じっくり静かな時間を過ごしたい', axis: 'I', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、相手の気持ちがわからず不安になったとき、どうしますか?', opts: [
    { text: '相手の言葉や行動など、具体的な根拠を探そうとする', axis: 'S', weight: 2 },
    { text: '過去のやり取りを振り返って手がかりを探す', axis: 'S', weight: 1 },
    { text: 'なんとなく漂う空気から察しようとする', axis: 'N', weight: 1 },
    { text: '言葉にならない直感で相手の本心を読み取ろうとする', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、好きな人ができたとき、まず何を考えますか?', opts: [
    { text: 'まず現実的に自分と釣り合うかどうかを考える', axis: 'S', weight: 2 },
    { text: 'まずは相手の生活や状況を知ろうとする', axis: 'S', weight: 1 },
    { text: '一緒にいる場面をなんとなく想像してみる', axis: 'N', weight: 1 },
    { text: 'まず相手と築く未来のイメージを思い描く', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人とケンカをしたとき、まずどう考えますか?', opts: [
    { text: 'まず何が悪かったのか、論理的に整理しようとする', axis: 'T', weight: 2 },
    { text: '原因をはっきりさせてから仲直りしたいと思う', axis: 'T', weight: 1 },
    { text: '相手がどんな気持ちだったか想像しようとする', axis: 'F', weight: 1 },
    { text: 'まず相手の気持ちに寄り添うことを最優先する', axis: 'F', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人との記念日について、どのように考えていますか?', opts: [
    { text: '日付そのものに、あまり特別な意味は感じない', axis: 'T', weight: 2 },
    { text: '覚えてはいるが、大げさに祝う必要はないと思う', axis: 'T', weight: 1 },
    { text: 'できれば覚えていて、ささやかにでも祝いたい', axis: 'F', weight: 1 },
    { text: '絶対に忘れず、しっかりお祝いしたいと思う', axis: 'F', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人との将来について、どのように考えていますか?', opts: [
    { text: 'できるだけ早く、具体的な計画を決めておきたい', axis: 'J', weight: 2 },
    { text: 'ある程度は将来の方向性を話し合っておきたい', axis: 'J', weight: 1 },
    { text: 'その時々の状況に応じて柔軟に考えたい', axis: 'P', weight: 1 },
    { text: '将来のことは、自然な流れに任せたいと思う', axis: 'P', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人との連絡の頻度について、どう感じますか?', opts: [
    { text: '毎日決まった時間にやり取りできると安心する', axis: 'J', weight: 2 },
    { text: 'ある程度決まったペースがあると落ち着く', axis: 'J', weight: 1 },
    { text: '連絡は気が向いたときにできればいいと思う', axis: 'P', weight: 1 },
    { text: '頻度を決めず、自然な間隔でのやり取りを好む', axis: 'P', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人との時間の過ごし方について、何を求めますか?', opts: [
    { text: '二人きりで、静かに過ごす時間に満たされる', axis: 'I', weight: 2 },
    { text: '基本は二人で、たまに誰かを交えるのもいいと思う', axis: 'I', weight: 1 },
    { text: '友人を交えた集まりも一緒に楽しみたい', axis: 'E', weight: 1 },
    { text: '色んな場所や人と一緒に、活動的に過ごしたい', axis: 'E', weight: 2 },
  ]},
  { block: 'love', text: 'あなたが誰かを好きになる決め手は、どちらに近いですか?', opts: [
    { text: '一緒にいて安心できる、積み重ねてきた実績', axis: 'S', weight: 2 },
    { text: '日々の些細な優しさや気遣い', axis: 'S', weight: 1 },
    { text: '一緒にいるときの、なんとなく心地よい空気感', axis: 'N', weight: 1 },
    { text: '言葉では説明できない、直感的な相性', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'あなたは、恋人と将来の約束をするとき、どうしたいですか?', opts: [
    { text: 'タイミングも段取りも、きっちり考えてから進めたい', axis: 'J', weight: 2 },
    { text: '大事な約束は、ある程度計画的に進めたい', axis: 'J', weight: 1 },
    { text: 'タイミングが来たら自然に決まればいいと思う', axis: 'P', weight: 1 },
    { text: '約束ごとは、流れに身を任せたいと思う', axis: 'P', weight: 2 },
  ]},

  // ---- 仕事編 ----
  { block: 'work', text: 'あなたは、会議に参加するとき、どのような役回りになりがちですか?', opts: [
    { text: '発言は控えめで、聞いてまとめる側に回る', axis: 'I', weight: 2 },
    { text: '求められれば発言するが、基本は聞き役に回る', axis: 'I', weight: 1 },
    { text: '意見があれば積極的に発言するようにしている', axis: 'E', weight: 1 },
    { text: '自分から発言し、議論を引っ張っていく', axis: 'E', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、新しいプロジェクトが始まるとき、最初に何をしますか?', opts: [
    { text: 'まず過去の実績や前例をしっかり確認する', axis: 'S', weight: 2 },
    { text: '参考になりそうな事例がないか調べる', axis: 'S', weight: 1 },
    { text: 'まずどんな可能性があるか考えてみる', axis: 'N', weight: 1 },
    { text: '前例にとらわれず、新しい発想を優先する', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、仕事のマニュアルについて、どのように考えていますか?', opts: [
    { text: '基本のやり方は、きちんと守った方が安心できる', axis: 'S', weight: 2 },
    { text: '大きく外れない範囲で工夫を加えたい', axis: 'S', weight: 1 },
    { text: 'もっと良い方法があれば、積極的に取り入れたい', axis: 'N', weight: 1 },
    { text: 'マニュアルよりも、自分なりの改善案を優先したい', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、同僚が仕事で失敗したのを見たとき、どうしますか?', opts: [
    { text: 'まず原因を客観的に分析しようとする', axis: 'T', weight: 2 },
    { text: '再発防止のために状況を整理しようとする', axis: 'T', weight: 1 },
    { text: 'まず声をかけて、様子を気にかける', axis: 'F', weight: 1 },
    { text: 'まず励まして、気持ちのフォローを優先する', axis: 'F', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、仕事の評価について、どちらを重視してほしいですか?', opts: [
    { text: '成果や実績を、正当に評価してほしい', axis: 'T', weight: 2 },
    { text: '結果につながったプロセスも見てほしい', axis: 'T', weight: 1 },
    { text: '努力している姿勢も汲み取ってほしい', axis: 'F', weight: 1 },
    { text: '結果だけでなく、頑張りそのものを見てほしい', axis: 'F', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、日々の仕事のタスク管理を、どのように行っていますか?', opts: [
    { text: 'リストやスケジュールで、きっちり管理したい', axis: 'J', weight: 2 },
    { text: 'ある程度計画を立てて進めたい', axis: 'J', weight: 1 },
    { text: '状況に応じて、その都度柔軟に対応したい', axis: 'P', weight: 1 },
    { text: '細かく管理せず、臨機応変に進めたい', axis: 'P', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、仕事で急な予定変更が入ったとき、どう感じますか?', opts: [
    { text: '正直、かなりストレスを感じてしまう', axis: 'J', weight: 2 },
    { text: '少し戸惑いつつも、なんとか対応しようとする', axis: 'J', weight: 1 },
    { text: '多少の変更は、あまり気にせず対応できる', axis: 'P', weight: 1 },
    { text: '予定外の展開も、むしろ楽しめるタイプだ', axis: 'P', weight: 2 },
  ]},
  { block: 'work', text: 'あなたにとって、理想の働き方はどちらに近いですか?', opts: [
    { text: '一人で集中して取り組める環境', axis: 'I', weight: 2 },
    { text: '基本は個人作業で、時々連携するくらいがいい', axis: 'I', weight: 1 },
    { text: '適度にチームで協力しながら進めたい', axis: 'E', weight: 1 },
    { text: 'チームでワイワイ協力しながら進める環境', axis: 'E', weight: 2 },
  ]},
  { block: 'work', text: 'あなたにとって、仕事のやりがいはどこにありますか?', opts: [
    { text: '着実に実績を積み上げていくことにある', axis: 'S', weight: 2 },
    { text: '経験を活かして確実に成果を出すことにある', axis: 'S', weight: 1 },
    { text: '新しいやり方を試すことにある', axis: 'N', weight: 1 },
    { text: '未知の課題に挑戦することにある', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'あなたは、大事なプレゼンの準備を、どのように進めますか?', opts: [
    { text: '入念にリハーサルをしてから本番に臨みたい', axis: 'J', weight: 2 },
    { text: 'ある程度は準備を固めてから臨みたい', axis: 'J', weight: 1 },
    { text: '準備はほどほどに、当日の流れを大事にしたい', axis: 'P', weight: 1 },
    { text: '本番のライブ感を大事にして、その場で組み立てたい', axis: 'P', weight: 2 },
  ]},
];

// ===== English version of QUESTIONS (same block/axis/weight structure) =====
const QUESTIONS_EN = [
  // ---- Personality ----
  { block: 'personality', text: 'When you have no plans on a day off and nobody invites you out, what do you usually do?', opts: [
    { text: 'I treasure the alone time and relax at home', axis: 'I', weight: 2 },
    { text: 'I invite just one or two close friends to hang out', axis: 'I', weight: 1 },
    { text: 'I reach out on social media or a group chat to make plans', axis: 'E', weight: 1 },
    { text: 'I actively gather people and make it a lively day', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'When talking to someone for the first time, how do you usually act?', opts: [
    { text: 'I mostly just listen to what they have to say', axis: 'I', weight: 2 },
    { text: 'I answer when asked but rarely bring things up myself', axis: 'I', weight: 1 },
    { text: 'I ask questions to keep the conversation going', axis: 'E', weight: 1 },
    { text: 'I start conversations myself and energize the room', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'When thinking through something new, what\'s your approach?', opts: [
    { text: 'I base it on past experience and concrete facts', axis: 'S', weight: 2 },
    { text: 'I check for real examples or data first', axis: 'S', weight: 1 },
    { text: 'I start by letting ideas and images take shape', axis: 'N', weight: 1 },
    { text: 'I try to intuitively grasp the possibilities and deeper meaning', axis: 'N', weight: 2 },
  ]},
  { block: 'personality', text: 'If you were picking a book to read, which genre draws you in?', opts: [
    { text: 'Practical how-to books I can use in real life', axis: 'S', weight: 2 },
    { text: 'Fact-based nonfiction or biographies', axis: 'S', weight: 1 },
    { text: 'Fantasy or literary fiction that sparks the imagination', axis: 'N', weight: 1 },
    { text: 'Philosophy or sci-fi that makes me think about the nature of things', axis: 'N', weight: 2 },
  ]},
  { block: 'personality', text: 'When a friend comes to you with a problem, how do you respond?', opts: [
    { text: 'I sort out the cause and offer a concrete solution', axis: 'T', weight: 2 },
    { text: 'I try to look at the situation objectively first', axis: 'T', weight: 1 },
    { text: 'I try to really listen to what they\'re saying', axis: 'F', weight: 1 },
    { text: 'I focus on empathizing with their feelings first', axis: 'F', weight: 2 },
  ]},
  { block: 'personality', text: 'When you disagree with someone, what do you prioritize?', opts: [
    { text: 'Being logically correct, over emotion', axis: 'T', weight: 2 },
    { text: 'Working things out based on facts and data', axis: 'T', weight: 1 },
    { text: 'Considering the other person\'s position and feelings', axis: 'F', weight: 1 },
    { text: 'The mood in the room and the relationship, above all', axis: 'F', weight: 2 },
  ]},
  { block: 'personality', text: 'When you go on a trip, how do you plan it?', opts: [
    { text: 'I lock down the itinerary and schedule in advance', axis: 'J', weight: 2 },
    { text: 'I like to have a rough plan set beforehand', axis: 'J', weight: 1 },
    { text: 'I\'d rather decide as I go, once I\'m there', axis: 'P', weight: 1 },
    { text: 'I barely plan at all and enjoy winging it', axis: 'P', weight: 2 },
  ]},
  { block: 'personality', text: 'What\'s your room usually like?', opts: [
    { text: 'I can\'t relax unless everything is neatly organized', axis: 'J', weight: 2 },
    { text: 'I try to keep things reasonably tidy', axis: 'J', weight: 1 },
    { text: 'A little clutter doesn\'t really bother me', axis: 'P', weight: 1 },
    { text: 'I\'m fine leaving things out wherever I last used them', axis: 'P', weight: 2 },
  ]},
  { block: 'personality', text: 'At a big gathering, how do you usually spend your time?', opts: [
    { text: 'I end up quietly off in a corner somewhere', axis: 'I', weight: 2 },
    { text: 'I respond if someone talks to me, but don\'t approach first', axis: 'I', weight: 1 },
    { text: 'I go talk to whoever catches my interest', axis: 'E', weight: 1 },
    { text: 'I end up at the center of the group, livening things up', axis: 'E', weight: 2 },
  ]},
  { block: 'personality', text: 'How do you approach work with a deadline?', opts: [
    { text: 'I finish early so I can relax with time to spare', axis: 'J', weight: 2 },
    { text: 'I like to leave myself some breathing room', axis: 'J', weight: 1 },
    { text: 'I usually don\'t get serious until I\'m under pressure', axis: 'P', weight: 1 },
    { text: 'The closer the deadline, the more I focus and perform', axis: 'P', weight: 2 },
  ]},

  // ---- Love ----
  { block: 'love', text: 'If you were asking someone you like out on a date, what style would you go for?', opts: [
    { text: 'Bringing friends along for a big, lively group hangout', axis: 'E', weight: 2 },
    { text: 'A smaller group of close friends could be fun too', axis: 'E', weight: 1 },
    { text: 'Maybe one close friend along wouldn\'t be bad', axis: 'I', weight: 1 },
    { text: 'Just the two of us, somewhere quiet and unhurried', axis: 'I', weight: 2 },
  ]},
  { block: 'love', text: 'When you\'re anxious because you can\'t read the other person\'s feelings, what do you do?', opts: [
    { text: 'I look for concrete evidence in their words and actions', axis: 'S', weight: 2 },
    { text: 'I look back at past exchanges for clues', axis: 'S', weight: 1 },
    { text: 'I try to sense it from the general vibe', axis: 'N', weight: 1 },
    { text: 'I try to read their true feelings through pure intuition', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'When you develop a crush on someone, what\'s the first thing you think about?', opts: [
    { text: 'Whether we\'re realistically well-matched', axis: 'S', weight: 2 },
    { text: 'I try to learn about their life and situation first', axis: 'S', weight: 1 },
    { text: 'I casually picture what being together would be like', axis: 'N', weight: 1 },
    { text: 'I imagine the future we could build together', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'When you have a fight with your partner, what\'s your first instinct?', opts: [
    { text: 'Logically sort out exactly what went wrong', axis: 'T', weight: 2 },
    { text: 'Figure out the cause before making up', axis: 'T', weight: 1 },
    { text: 'Try to imagine how they were feeling', axis: 'F', weight: 1 },
    { text: 'Prioritize being there for their feelings, above all', axis: 'F', weight: 2 },
  ]},
  { block: 'love', text: 'How do you feel about anniversaries with your partner?', opts: [
    { text: 'The date itself doesn\'t feel that special to me', axis: 'T', weight: 2 },
    { text: 'I remember it, but don\'t think it needs a big celebration', axis: 'T', weight: 1 },
    { text: 'I\'d like to remember it and celebrate, even modestly', axis: 'F', weight: 1 },
    { text: 'I\'d never forget it and want to celebrate it properly', axis: 'F', weight: 2 },
  ]},
  { block: 'love', text: 'How do you think about the future with your partner?', opts: [
    { text: 'I want to nail down concrete plans as soon as possible', axis: 'J', weight: 2 },
    { text: 'I\'d like to at least discuss the general direction', axis: 'J', weight: 1 },
    { text: 'I\'d rather stay flexible and adjust as things go', axis: 'P', weight: 1 },
    { text: 'I want to just let the future unfold naturally', axis: 'P', weight: 2 },
  ]},
  { block: 'love', text: 'How do you feel about how often you contact your partner?', opts: [
    { text: 'I feel safe knowing we\'ll talk at a set time every day', axis: 'J', weight: 2 },
    { text: 'Having a rough regular rhythm is reassuring', axis: 'J', weight: 1 },
    { text: 'I\'m fine texting whenever the mood strikes', axis: 'P', weight: 1 },
    { text: 'I prefer no set frequency, just a natural rhythm', axis: 'P', weight: 2 },
  ]},
  { block: 'love', text: 'What do you want out of time spent with your partner?', opts: [
    { text: 'Quiet time with just the two of us is enough for me', axis: 'I', weight: 2 },
    { text: 'Mostly just us, but bringing others in sometimes is nice', axis: 'I', weight: 1 },
    { text: 'I want to enjoy get-togethers with friends together too', axis: 'E', weight: 1 },
    { text: 'I want to stay active, going out with lots of people and places', axis: 'E', weight: 2 },
  ]},
  { block: 'love', text: 'What\'s more likely to make you fall for someone?', opts: [
    { text: 'A track record of feeling safe and comfortable together', axis: 'S', weight: 2 },
    { text: 'Small everyday moments of kindness and thoughtfulness', axis: 'S', weight: 1 },
    { text: 'A hard-to-describe, comfortable atmosphere together', axis: 'N', weight: 1 },
    { text: 'A chemistry you can\'t put into words', axis: 'N', weight: 2 },
  ]},
  { block: 'love', text: 'When making future promises with your partner, what\'s your preference?', opts: [
    { text: 'Plan out both the timing and the details carefully', axis: 'J', weight: 2 },
    { text: 'Big promises should be made with at least some planning', axis: 'J', weight: 1 },
    { text: 'I\'d rather it just come together naturally when the time is right', axis: 'P', weight: 1 },
    { text: 'I want to leave promises to however things flow', axis: 'P', weight: 2 },
  ]},

  // ---- Career ----
  { block: 'work', text: 'In meetings, what role do you usually end up playing?', opts: [
    { text: 'I stay quiet and end up the one summarizing everything', axis: 'I', weight: 2 },
    { text: 'I speak up when asked, but mostly just listen', axis: 'I', weight: 1 },
    { text: 'I speak up whenever I have an opinion', axis: 'E', weight: 1 },
    { text: 'I speak up on my own and drive the discussion', axis: 'E', weight: 2 },
  ]},
  { block: 'work', text: 'When a new project kicks off, what\'s the first thing you do?', opts: [
    { text: 'Thoroughly check past results and precedents', axis: 'S', weight: 2 },
    { text: 'Look for any relevant case studies', axis: 'S', weight: 1 },
    { text: 'Start by thinking through the possibilities', axis: 'N', weight: 1 },
    { text: 'Prioritize a fresh idea over precedent', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'What\'s your take on workplace manuals and procedures?', opts: [
    { text: 'Sticking to the established way feels safest', axis: 'S', weight: 2 },
    { text: 'I\'ll add small tweaks, as long as I don\'t stray too far', axis: 'S', weight: 1 },
    { text: 'I\'ll gladly adopt a better method if I find one', axis: 'N', weight: 1 },
    { text: 'I\'d rather prioritize my own improvements over the manual', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'When you see a coworker make a mistake at work, what do you do?', opts: [
    { text: 'Analyze the cause as objectively as possible', axis: 'T', weight: 2 },
    { text: 'Sort out the situation to prevent it happening again', axis: 'T', weight: 1 },
    { text: 'Check in with them and see how they\'re doing', axis: 'F', weight: 1 },
    { text: 'Encourage them and prioritize emotional support first', axis: 'F', weight: 2 },
  ]},
  { block: 'work', text: 'When it comes to being evaluated at work, what matters more to you?', opts: [
    { text: 'Being fairly judged on results and achievements', axis: 'T', weight: 2 },
    { text: 'Having the process behind the results acknowledged too', axis: 'T', weight: 1 },
    { text: 'Having my effort and attitude recognized', axis: 'F', weight: 1 },
    { text: 'Being seen for the effort itself, not just the outcome', axis: 'F', weight: 2 },
  ]},
  { block: 'work', text: 'How do you manage your day-to-day work tasks?', opts: [
    { text: 'Strictly, with lists and schedules', axis: 'J', weight: 2 },
    { text: 'I like to plan things out to some degree', axis: 'J', weight: 1 },
    { text: 'I adapt flexibly to the situation as it comes', axis: 'P', weight: 1 },
    { text: 'I don\'t manage closely — I just adapt on the fly', axis: 'P', weight: 2 },
  ]},
  { block: 'work', text: 'How do you feel when a sudden change of plans hits at work?', opts: [
    { text: 'Honestly, it stresses me out quite a bit', axis: 'J', weight: 2 },
    { text: 'A bit thrown off, but I find a way to manage', axis: 'J', weight: 1 },
    { text: 'Minor changes don\'t really bother me', axis: 'P', weight: 1 },
    { text: 'I actually enjoy the unexpected twist', axis: 'P', weight: 2 },
  ]},
  { block: 'work', text: 'Which is closer to your ideal way of working?', opts: [
    { text: 'An environment where I can focus alone', axis: 'I', weight: 2 },
    { text: 'Mostly solo work, with occasional check-ins', axis: 'I', weight: 1 },
    { text: 'A moderate amount of teamwork', axis: 'E', weight: 1 },
    { text: 'An environment where the whole team works together energetically', axis: 'E', weight: 2 },
  ]},
  { block: 'work', text: 'Where do you find fulfillment in your work?', opts: [
    { text: 'In steadily building up a track record', axis: 'S', weight: 2 },
    { text: 'In using experience to reliably deliver results', axis: 'S', weight: 1 },
    { text: 'In trying out new ways of doing things', axis: 'N', weight: 1 },
    { text: 'In taking on unfamiliar challenges', axis: 'N', weight: 2 },
  ]},
  { block: 'work', text: 'How do you prepare for an important presentation?', opts: [
    { text: 'Rehearse thoroughly before the big day', axis: 'J', weight: 2 },
    { text: 'Get reasonably prepared beforehand', axis: 'J', weight: 1 },
    { text: 'Keep prep light and focus on the moment itself', axis: 'P', weight: 1 },
    { text: 'Value the live energy of the moment and build it on the spot', axis: 'P', weight: 2 },
  ]},
];

const BLOCK_META = {
  personality: { label: '性格編', catName: '性格タイプ', icon: '✨', color: '#b892ff' },
  love:        { label: '恋愛編', catName: '恋愛タイプ', icon: '💌', color: '#ff8fb3' },
  work:        { label: '仕事編', catName: '仕事タイプ', icon: '💼', color: '#5bc8b5' },
};
const BLOCK_META_EN = {
  personality: { label: 'Personality', catName: 'Personality Type', icon: '✨', color: '#b892ff' },
  love:        { label: 'Love', catName: 'Love Type', icon: '💌', color: '#ff8fb3' },
  work:        { label: 'Career', catName: 'Career Type', icon: '💼', color: '#5bc8b5' },
};

// ===== 結果マッピング(絵文字 / ひねりを加えたタイプ名 / 詳細説明+占い要素+アドバイス) =====
// [絵文字, タイプ名, 詳細説明(五行占いの要素→【意識するといいこと】まで含む)]
const ANIMAL_MAP = {
  ISTJ: ['🐢', '石橋を叩きすぎる亀', '一度決めたことは最後まで、地味でもコツコツやり抜ける人です。派手さより「昨日より一歩前進してるか」を大事にしていて、周りが見ていないところでも手を抜きません。約束や締め切りに関してはかなり律儀なタイプで、「あの人に頼めば絶対大丈夫」と思われがちです。新しいことより実績のあるやり方を好むので、変化はゆっくりでいいと感じています。信頼を積み重ねる生き方そのものが、あなたの何よりの財産です。占いの視点では、あなたは五行(木・火・土・金・水)でいう「土」の気質を持つタイプ。安定と信頼を象徴する属性で、どっしりと周りを支える力があります。ラッキーカラーは黄土色。【意識するといいこと】たまには非効率に見える新しいやり方も試してみると、視野が広がり、思わぬ発見があるはずです。'],
  ISFJ: ['🐕', '気づいたら支えてる柴犬', '気づいたら誰かのフォローをしている、縁の下の力持ちタイプです。自分から目立とうとはしませんが、困っている人を放っておけない世話焼きな一面があります。一度心を開いた相手にはとことん誠実で、地味に記念日や約束をちゃんと覚えているタイプです。頼まれると断れず、気づけばキャパオーバーになっていることも。それでも周りからの信頼は厚く、「困ったときはあの人」と真っ先に名前が挙がる存在です。占いの視点では、あなたは五行でいう「土」の気質を持つタイプ。安定と信頼を象徴する属性で、周りをしっかり支える力があります。ラッキーカラーは黄土色。【意識するといいこと】自分の気持ちや希望も、もっと言葉にして周りに伝えてみましょう。断る練習も、自分を守るためには必要です。'],
  INFJ: ['🦉', '全部お見通しのフクロウ', '物静かだけど、実は人の何倍も物事を深く見ている観察者タイプです。表面的な会話より、本音で語り合える少人数の関係を大事にします。理想や意味を大切にする一方で、感情の起伏は内側にしまい込みがちなので、「何を考えているかわからない」と言われることも。一度信じたものにはとことん誠実に向き合い、静かな覚悟を持って物事にあたります。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。知性と柔軟さを象徴する属性で、状況に応じて形を変えながら進む力があります。ラッキーカラーは藍色。【意識するといいこと】考えすぎて抱え込む前に、信頼できる誰かに話してみると、気持ちがぐっと軽くなります。'],
  INTJ: ['🐺', '頭の中はすでに勝ってる狼', '頭の中に常に長期的な戦略や計画を描いている一匹狼タイプです。無駄な社交や表面的な雑談より、意味のある会話や成果を重視します。一度こうと決めたら誰に何を言われてもブレない芯の強さがあり、独立心が強い分、他人に頼るのはやや苦手です。効率が悪いものを見ると、つい改善したくなってしまいます。頭の中では既にいくつも先の展開まで見えていることも珍しくありません。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。決断力と鋭さを象徴する属性で、物事の本質を見抜く力があります。ラッキーカラーは白金色。【意識するといいこと】たまには計画を手放し、周りに頼ったり任せたりしてみると、新しい可能性が見えてきます。'],
  ISTP: ['🐱', 'やる気スイッチ気まぐれ猫', 'マイペースを何よりも大事にする、自由な実践派です。理屈より「実際にやってみてどうか」で判断するタイプで、手を動かしながら物事を理解していきます。感情より合理性を優先しがちですが、興味のあることに対しては驚くほど集中力を発揮します。束縛されるのが苦手で、自分のペースを乱されるとスッと距離を取ります。いざという時の判断力と対応力は、周りが驚くほど頼りになります。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。決断力と鋭さを象徴する属性で、物事の本質を瞬時に見抜く力があります。ラッキーカラーは白金色。【意識するといいこと】気持ちを言葉にする練習をしてみると、周りとの誤解が減り、もっと楽に付き合えるようになります。'],
  ISFP: ['🐰', '静かに全部感じてるうさぎ', '繊細な感受性を持ち、穏やかに自分の世界を大事にしているタイプです。争いごとは苦手で、無理に自己主張するより、自分のペースで心地よく過ごすことを優先します。美しいものや心が動く瞬間にとても敏感で、実は内側に強いこだわりや美意識を持っています。信頼できる相手には少しずつ心を開いていき、一度懐に入れた相手はとても大切にします。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。成長と柔軟性を象徴する属性で、時間をかけてじっくり自分の世界を育てる力があります。ラッキーカラーは若草色。【意識するといいこと】自分の意見をもっと前に出しても大丈夫です。あなたの感性は、思っている以上に価値があります。'],
  INFP: ['🦌', '傷つきやすいけど譲れない鹿', '繊細で理想主義、自分の中に大切な価値観をしっかり持っているタイプです。表面的な損得より「自分が納得できるかどうか」で動くので、周りに流されにくい一面があります。人の気持ちには敏感で共感力が高い反面、傷つきやすくもあります。心を許した相手には、驚くほど深い優しさを見せ、静かな情熱を燃やし続けます。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。成長と柔軟性を象徴する属性で、理想に向かってじっくり育っていく力があります。ラッキーカラーは若草色。【意識するといいこと】理想と現実のギャップに落ち込みすぎず、小さな一歩を積み重ねることを大事にしましょう。'],
  INTP: ['🦝', '気づいたら早口になるタヌキ', '飄々としていて、何を考えているのか掴みどころがないタイプです。物事の仕組みや理屈を突き詰めて考えるのが好きで、興味があることには驚くほどの集中力を見せます。効率よりもまず「なぜそうなるのか」が気になってしまう探究派です。マイペースに見えて、頭の中は常にフル回転しており、誰も気づかない視点をふと口にすることがあります。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。決断力と鋭さを象徴する属性で、物事の本質を見抜く分析力があります。ラッキーカラーは白金色。【意識するといいこと】考えを言葉にして周りと共有する習慣をつけると、あなたの発想がもっと正しく評価されます。'],
  ESTP: ['🐆', '考える前に動いてるチーター', '考えるより先に動く、瞬発力と行動力が武器のタイプです。じっとしているより、実際に体を動かしたり現場で判断したりする方が得意です。リスクを恐れずチャレンジできる度胸があり、周りを盛り上げるムードメーカーになることも多めです。じっくり計画を練るより、その場のノリと勢いを大事にし、行動しながら答えを見つけていきます。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。情熱と行動力を象徴する属性で、周りを明るく照らしながら前へ進む力があります。ラッキーカラーは朱色。【意識するといいこと】勢いだけでなく、たまには一呼吸おいて振り返る時間を作ると、成長がさらに加速します。'],
  ESFP: ['🐬', 'その場のノリを生きるイルカ', '場を明るくするのが得意な、生まれついてのエンターテイナータイプです。誰とでもすぐ打ち解けられる社交性があり、みんなが楽しそうにしているのを見るのが好きです。今この瞬間を思いっきり楽しむタイプで、先のことをあれこれ心配するより「まずやってみよう」の精神です。周りを笑顔にする才能があり、その場の空気を一瞬で明るくします。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。知性と柔軟さを象徴する属性で、どんな場にも自然に馴染んでいく力があります。ラッキーカラーは藍色。【意識するといいこと】楽しい時間の後に、少し振り返る習慣をつけると、その経験がもっと力になります。'],
  ENFP: ['🐶', '今日も新しい沼にハマる子犬', '好奇心旺盛でエネルギッシュ、新しいことにワクワクが止まらないタイプです。人との出会いや新しいアイデアに目がなく、思いついたら即行動に移す瞬発力があります。感情表現が豊かで、周りを自然と巻き込んでしまう明るさが魅力です。ただしやりたいことが多すぎて、気づくと手が広がりすぎていることも。それでもその熱量に惹きつけられて、自然と人が集まってきます。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。成長と柔軟性を象徴する属性で、どんどん新しい方向へ伸びていく力があります。ラッキーカラーは若草色。【意識するといいこと】やりたいことを少し絞り込む練習をすると、成果につながりやすくなります。'],
  ENTP: ['🦊', 'あえて反対意見を言いたいキツネ', '機転が利いて、議論やディベートを楽しめる頭の回転が速いタイプです。常識や前例に「本当にそうなのか?」と疑いを持ち、新しい視点を投げ込むのが得意です。退屈が何より苦手で、刺激的な会話や新しいアイデアには目がありません。人を煙に巻くこともありますが、根っこには純粋な知的好奇心があり、話しているうちに周りも新しい発見をさせられます。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。知性と柔軟さを象徴する属性で、状況に応じて自在に発想を変える力があります。ラッキーカラーは藍色。【意識するといいこと】議論に勝つことより、相手の納得感を意識してみると、あなたの提案がもっと通りやすくなります。'],
  ESTJ: ['🦁', '仕切りたがりの生まれ変わりライオン', '統率力があり、周りを引っ張っていくリーダー気質のタイプです。物事を効率よく・きっちり進めることにこだわりがあり、決めたルールや計画はしっかり守ります。責任感が強く、頼られると全力で応えようとする一方、曖昧なまま進むことにはストレスを感じやすいタイプです。集団をまとめる場面になると、自然と先頭に立っていることが多いはずです。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。情熱と行動力を象徴する属性で、周りを牽引しながら前へ進む力があります。ラッキーカラーは朱色。【意識するといいこと】効率だけでなく、周りの気持ちやペースにも耳を傾けてみると、チームがもっとついてきます。'],
  ESFJ: ['🐕‍🦺', '頼まれると断れないゴールデン', '場の空気を大事にし、みんなが気持ちよく過ごせるよう気を配る世話好きタイプです。周りの人の変化によく気づき、さりげないフォローが得意です。人間関係の調和をとても大切にしていて、揉め事が起きるとつい仲裁役になりがちです。感謝されると素直に嬉しくなる、温かい人柄の持ち主で、気づけば場の中心的な存在になっています。占いの視点では、あなたは五行でいう「土」の気質を持つタイプ。安定と信頼を象徴する属性で、周りとの調和を築く力があります。ラッキーカラーは黄土色。【意識するといいこと】自分の希望も後回しにせず、たまには一番に優先してあげてください。'],
  ENFJ: ['🦢', 'みんなの応援団長・白鳥', '優雅な物腰で、自然と人を惹きつけ導いていくタイプです。周りの可能性や成長に強い関心があり、人を励ましたりサポートしたりすることに喜びを感じます。共感力が高く、場の空気を読むのも得意です。人のために動きすぎて、自分のことは後回しになりがちな一面もありますが、その包容力に多くの人が助けられています。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。成長と柔軟性を象徴する属性で、周りの成長も一緒に育てていく力があります。ラッキーカラーは若草色。【意識するといいこと】人のために動く前に、自分を労わる時間もしっかり確保しましょう。'],
  ENTJ: ['🦅', 'もう次のこと考えてる鷲', '大局を見据え、迷いなく突き進む生まれながらの指揮官タイプです。目標を定めたら、そこに向かって最短ルートで進もうとする効率志向の持ち主です。リーダーシップがあり、周りを巻き込んで物事を動かすのが得意です。曖昧さや非効率を嫌い、決断は早く、行動もスピーディーで、周りが追いつく頃には次の一手を考えています。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。情熱と行動力を象徴する属性で、大きな目標に向かって突き進む力があります。ラッキーカラーは朱色。【意識するといいこと】結果を急ぎすぎず、周りのペースに合わせる余裕を持つと、チーム全体の力がもっと引き出せます。'],
};

const ANIMAL_MAP_EN = {
  ISTJ: ['🐢', 'The Turtle Who Triple-Checks the Bridge', 'You\'re the kind of person who sees things through to the end, quietly and steadily, no matter how unglamorous the work. What matters to you isn\'t flash — it\'s whether you moved one step forward from yesterday, even when nobody\'s watching. You take deadlines and promises seriously, and people know that if they hand something to you, it\'ll get done. You\'d rather stick with a method that\'s proven to work than chase something new just because it\'s shiny. In Five Element terms, you carry the energy of Earth — steady, grounding, the kind of presence others build on. Lucky color: ochre. Tip: try a genuinely inefficient new approach once in a while — it might open a door you didn\'t know was there.'],
  ISFJ: ['🐕', 'The Golden Retriever Who\'s Already Got You Covered', 'You\'re the one quietly holding things together before anyone even notices something needs fixing. You\'re not one to seek the spotlight, but you can\'t walk past someone who\'s struggling. Once you let someone in, you\'re fiercely loyal — remembering anniversaries and small promises long after everyone else has forgotten. The trouble is, you find it hard to say no, and you can end up carrying more than your share. Your element is Earth — steady and trustworthy, the kind people quietly lean on. Lucky color: ochre. Tip: put your own wants into words more often — learning to say no is part of taking care of yourself, too.'],
  INFJ: ['🦉', 'The Owl Who Sees Right Through You', 'Quiet on the surface, but you\'re actually reading the room — and the people in it — more deeply than almost anyone realizes. You\'d take one real conversation over ten shallow ones, and you keep your emotional highs and lows mostly to yourself. Once you commit to something you believe in, you commit completely. Your element is Water — intelligence and adaptability, the ability to take whatever shape a situation demands. Lucky color: indigo. Tip: before you carry too much on your own, try talking it through with someone you trust — it\'ll lighten the load more than you expect.'],
  INTJ: ['🐺', 'The Wolf Who\'s Already Won the Argument in Their Head', 'There\'s always a longer game running in your head — a strategy several steps ahead of where everyone else currently is. Small talk holds little appeal; you\'d rather spend your energy on conversations that actually mean something. Once you decide on something, you rarely budge, and while that independence is a real strength, it can make it hard to lean on other people. Your element is Metal — sharp, decisive, able to cut straight to the heart of a matter. Lucky color: platinum. Tip: every now and then, hand the plan over to someone else and see what happens — you might be surprised by what opens up.'],
  ISTP: ['🐱', 'The Cat With the Mood-Dependent \'Go\' Switch', 'You live by your own rhythm above almost anything else, and you\'re a hands-on problem-solver — you trust what actually works over what merely sounds right in theory. Reason usually wins out over emotion, but give you something you\'re genuinely curious about and your focus becomes almost frightening. You don\'t love being boxed in, and if someone crowds your space, you\'ll quietly put some distance between you. Your element is Metal — decisive and sharp, cutting straight to what actually matters. Lucky color: platinum. Tip: practice putting feelings into words now and then — it clears up more misunderstandings than you\'d expect.'],
  ISFP: ['🐰', 'The Rabbit Quietly Feeling Everything', 'You carry a gentle, sensitive inner world and you\'re careful to protect it. Conflict isn\'t really your scene — you\'d rather move at your own pace than force your opinion on anyone. Beauty and small, moving moments catch you off guard more often than people realize. You open up slowly, but once someone earns your trust, you treasure them completely. Your element is Wood — growth and flexibility, the patient strength to nurture something over time. Lucky color: fresh green. Tip: it\'s okay to voice your opinion more — your sense of things is worth more than you give it credit for.'],
  INFP: ['🦌', 'The Deer Who\'s Easily Hurt but Never Bends', 'You\'re a sensitive idealist with a set of values you hold onto no matter what — you\'d rather act on what feels right than chase surface-level gain. You feel deeply and empathize easily, which also means you bruise easily, but for anyone who earns your trust, you show a surprising depth of warmth. Your element is Wood — growth and flexibility, quietly building toward the ideals you carry. Lucky color: fresh green. Tip: don\'t let the gap between your ideals and reality weigh you down too much — small steps forward count more than they feel like they do.'],
  INTP: ['🦝', 'The Raccoon Who Suddenly Starts Talking Fast', 'You come across breezy and hard to pin down, but you\'re happiest untangling how something actually works, and when a topic catches your interest, your focus is genuinely impressive. \'Why does this happen\' matters more to you than \'is this efficient.\' Your mind is constantly running, and every so often you\'ll casually drop an observation nobody else in the room had thought of. Your element is Metal — sharp and decisive, cutting to the core of a problem. Lucky color: platinum. Tip: build a habit of putting your ideas into words and sharing them — it\'s the fastest way to get properly credited for how good they are.'],
  ESTP: ['🐆', 'The Cheetah Who Moves Before Thinking', 'You move first and think later, and that instinct, plus real physical follow-through, is your biggest asset. You\'d rather be out doing something and reading the room in real time than sitting still theorizing. You\'ve got the nerve to take real risks, and you\'re often the one who ends up energizing everyone else. Your element is Fire — passion and drive, the kind of energy that lights up a room and pushes everyone forward. Lucky color: vermillion. Tip: build in the occasional pause to reflect — it\'ll make your momentum go even further.'],
  ESFP: ['🐬', 'The Dolphin Riding the Vibe of the Room', 'You\'re a natural-born entertainer who brightens up whatever room you\'re in. You warm up to almost anyone instantly, and there\'s nothing quite like the feeling of watching people around you have a genuinely good time. You live fully in the present — \'let\'s just try it\' beats \'let\'s worry about it\' every time. Your element is Water — intelligence and adaptability, the ease with which you fit into any room you walk into. Lucky color: indigo. Tip: after the fun winds down, take a beat to reflect — it\'ll turn a good time into something that sticks with you.'],
  ENFP: ['🐶', 'The Puppy Falling Down a New Rabbit Hole Today', 'You\'re endlessly curious and full of energy, genuinely excited by anything new — new people, new ideas, you\'re drawn to all of it, and once something catches your interest you move on it fast. The catch is you tend to want to do everything at once, and before you know it your plate is overflowing. Your element is Wood — growth and flexibility, always reaching for the next new direction. Lucky color: fresh green. Tip: try narrowing your focus down a bit — it\'ll make it much easier to actually finish what you start, and the results will follow.'],
  ENTP: ['🦊', 'The Fox Who Just Has to Play Devil\'s Advocate', 'Quick-witted and genuinely energized by a good debate, you\'re the one poking at the assumption everyone else took for granted, asking \'but is that actually true?\' Boredom is basically your one true enemy. You can talk circles around people sometimes, but underneath it all is real, honest intellectual curiosity. Your element is Water — intelligence and adaptability, endlessly reshaping your ideas to fit the moment. Lucky color: indigo. Tip: winning the argument matters less than whether the other person actually feels heard — keep that in mind and your ideas will land a lot better.'],
  ESTJ: ['🦁', 'The Lion Born to Run the Show', 'You\'re a natural leader with real command presence, and you take real pride in running things efficiently and by the book. Once rules or a plan are set, you stick to them, and your strong sense of responsibility means you\'ll go all-out for anyone who\'s counting on you. Your element is Fire — passion and drive, the force that pulls a team forward. Lucky color: vermillion. Tip: efficiency matters, but pay attention to people\'s feelings and pace too — it\'ll bring the whole team further along with you.'],
  ESFJ: ['🐕‍🦺', 'The Golden Who Can Never Say No', 'You care deeply about the mood in the room, and you\'re the one quietly making sure everyone\'s comfortable. You pick up on small changes in the people around you and step in to help before anyone even has to ask. Being thanked genuinely makes your day, and warmth like that tends to make you the center of the group without you even trying. Your element is Earth — steady and trustworthy, the kind of presence that builds real harmony around it. Lucky color: ochre. Tip: don\'t push your own wants to the back of the line so often — put yourself first once in a while too.'],
  ENFJ: ['🦢', 'Everyone\'s Head Cheerleader, the Swan', 'You carry yourself with real grace, and people naturally gravitate toward you and let you lead. You\'re genuinely invested in other people\'s potential and growth, and encouraging or supporting someone brings you real joy. Your empathy runs high, though you tend to give so much to others that your own needs quietly slide down the list. Your element is Wood — growth and flexibility, nurturing everyone else\'s growth right alongside your own. Lucky color: fresh green. Tip: before you rush to help someone else, carve out real time to take care of yourself too.'],
  ENTJ: ['🦅', 'The Eagle Already Three Moves Ahead', 'You see the big picture and move toward it without hesitation — a natural-born commander. Once you set a goal, you take the most direct route there. You\'ve got the leadership to rally people around you and actually get things moving. Ambiguity and inefficiency genuinely bother you, and your decisions come fast, often leaving everyone else two steps behind. Your element is Fire — passion and drive, propelling you toward whatever big goal is next. Lucky color: vermillion. Tip: don\'t rush the outcome so hard — leaving room for everyone else\'s pace will pull even more out of the whole team.'],
};

const WEATHER_MAP = {
  ISTJ: ['☀️', '絶対に崩れない快晴', '恋愛でも「安定」を何より大事にするタイプです。派手なサプライズより、毎日同じペースで会える・連絡が取れる安心感を重視します。浮気や気まぐれとは無縁で、一度好きになった相手には驚くほど一途です。ただし気持ちを言葉にするのは少し照れくさく、態度や行動で示すタイプです。恋愛運の面では、「土」のエネルギーが安定した関係を育む暗示。じっくり信頼を積み重ねるほど、絆が強くなっていきます。開運アクションは、公園など土や緑に近い場所で過ごす時間を増やすこと。【意識するといいこと】たまには言葉にして気持ちを伝えると、相手はもっと安心できます。'],
  ISFJ: ['🌤️', '気づいたら側にいる陽だまり', '相手をじんわり温かく包み込むような愛情表現をするタイプです。記念日や相手の好きなものを細かく覚えていて、さりげない気遣いで愛情を示します。自分の気持ちより相手の気持ちを優先しがちで、尽くしすぎて疲れてしまうことも。安心できる関係を築くのがとても上手です。恋愛運の面では、「土」のエネルギーが安定した関係を育む暗示。じっくり信頼を積み重ねるほど、絆が強くなっていきます。開運アクションは、公園など土や緑に近い場所で過ごす時間を増やすこと。【意識するといいこと】尽くしすぎて疲れる前に、自分の気持ちも素直に伝えてみましょう。'],
  INFJ: ['🌫️', '一筋縄ではいかない霧', '簡単には本心を見せない、静かで奥の深い恋愛観の持ち主です。表面的な付き合いより、心の奥まで理解し合える深いつながりを求めます。一度心を開くととことん一途ですが、そこに至るまでには時間が必要です。相手の些細な変化にも敏感に気づく観察力があります。恋愛運の面では、「水」のエネルギーが相手に合わせて柔軟に形を変えられる暗示。その柔軟さが良縁を引き寄せます。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】本音を話すタイミングを少し早めてみると、関係がぐっと深まりやすくなります。'],
  INTJ: ['🌀', '静かなのに目が離せない台風の目', '恋愛でも中心はいつも冷静沈着、でも内側には強い意志を秘めているタイプです。好きになった相手には長期的な視点で真剣に向き合い、思いつきの恋愛はしません。感情表現は控えめですが、「この人だ」と決めたら驚くほどまっすぐです。効率の悪い駆け引きは苦手です。恋愛運の面では、「金」のエネルギーが自分の芯を大切にする恋を後押しする暗示。無理に自分を曲げない方が良い縁に恵まれます。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】気持ちを言葉にする練習をすると、相手との距離がもっと縮まります。'],
  ISTP: ['🍃', '捕まえようとすると逃げるそよ風', 'サラッとしていて、あまり束縛や干渉を好まないタイプです。距離感が近すぎる恋愛より、お互いの自由を尊重できる関係を心地よく感じます。言葉で気持ちを伝えるのは得意ではありませんが、行動で示すタイプです。追いかけられるより、自分のペースで近づいていきたい派です。恋愛運の面では、「金」のエネルギーが自分の芯を大切にする恋を後押しする暗示。無理に自分を曲げない方が良い縁に恵まれます。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】距離を置きすぎず、たまには自分から積極的に関わる姿勢も見せてみましょう。'],
  ISFP: ['🌦️', 'そっと降ってそっと止む小雨', '繊細でしっとりとした愛情表現をするタイプです。大きな言葉より、さりげない優しさや思いやりで気持ちを伝えます。争いや衝突を避けたいので、自分の気持ちを飲み込んでしまうことも。相手の感情の機微によく気づき、静かに寄り添う恋愛が得意です。恋愛運の面では、「木」のエネルギーが恋をゆっくり時間をかけて育てていく暗示。焦らず関係を深めていくほど、良い流れが続きます。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】我慢せず、思っていることを少しずつ言葉にする練習をしてみてください。'],
  INFP: ['🌇', '理由もなく泣きたくなる夕焼け', '感傷的でロマンチック、恋愛に理想を求めるタイプです。「運命」や「特別な瞬間」に弱く、感情の振れ幅も大きめです。相手のことを深く想う分、期待とのギャップに傷つきやすい一面もあります。一途で誠実、心を開いた相手にはとことん尽くします。恋愛運の面では、「木」のエネルギーが恋をゆっくり時間をかけて育てていく暗示。焦らず関係を深めていくほど、良い流れが続きます。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】理想を追いすぎず、目の前の相手をそのまま受け止めてあげましょう。'],
  INTP: ['❄️', '触れるとちょっと冷たい霜', '一見クールで恋愛に興味なさそうに見えて、実は内側にじっくりと独自の世界を育てているタイプです。好きな相手のことは分析するように理解しようとします。感情表現は控えめですが、信頼した相手には驚くほど素直な一面を見せることも。マイペースな距離感を好みます。恋愛運の面では、「金」のエネルギーが自分の芯を大切にする恋を後押しする暗示。無理に自分を曲げない方が良い縁に恵まれます。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】分析より先に、素直な気持ちをそのまま伝える瞬間も大切にしてみましょう。'],
  ESTP: ['⛈️', '来る時は来る、夕立', '出会いも告白も突然でエネルギッシュ、恋愛でも行動力が武器のタイプです。駆け引きより直球勝負が好きで、気になったらすぐアプローチします。情熱的な反面、気持ちの切り替えも早めです。過ぎたことをいつまでも引きずらず、カラッとした関係を好みます。恋愛運の面では、「火」のエネルギーが情熱的な恋を後押しする暗示。ただし燃え上がるスピードには注意が必要です。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】勢いだけでなく、相手の気持ちのペースにも合わせてみましょう。'],
  ESFP: ['🏖️', '今日も絶好調な真夏の青空', '一緒にいるだけで場が明るくなる、開放的な恋愛をするタイプです。デートはとにかく楽しく盛り上がることを重視し、感情表現もストレートです。今この瞬間を大事にするので、将来の心配より「今どれだけ楽しいか」を優先しがちです。恋愛運の面では、「水」のエネルギーが相手に合わせて柔軟に形を変えられる暗示。その柔軟さが良縁を引き寄せます。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】楽しい時間の裏にある相手の本音にも、少し耳を傾けてみてください。'],
  ENFP: ['🌦️', '読めない、にわか雨', '予測不能で刺激的、感情表現が豊かな恋愛をするタイプです。好きになるとまっすぐ気持ちをぶつけますが、興味の対象が変わりやすい一面も。マンネリを嫌い、常に関係にときめきや新しい発見を求めます。一緒にいて飽きさせない存在です。恋愛運の面では、「木」のエネルギーが恋をゆっくり時間をかけて育てていく暗示。焦らず関係を深めていくほど、良い流れが続きます。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】気持ちが移ろいやすい分、大事な相手には言葉で「続けたい」気持ちを伝えましょう。'],
  ENTP: ['🌬️', '急に空気を変える春一番', '恋愛にも刺激と変化を求めるタイプです。会話のキャッチボールや知的な駆け引きを楽しみ、退屈な関係はすぐに飽きてしまいます。素直な愛情表現より、からかいや冗談で気持ちを表すことも。一緒にいると新しい発見が絶えない相手です。恋愛運の面では、「水」のエネルギーが相手に合わせて柔軟に形を変えられる暗示。その柔軟さが良縁を引き寄せます。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】からかいすぎず、素直な言葉で気持ちを伝える瞬間も意識して作ってみましょう。'],
  ESTJ: ['☀️', '頼れる、晴天続き', '恋愛でも「頼れる存在」でありたいタイプです。将来の計画やお互いの役割をしっかり決めたい派で、曖昧な関係はあまり好みません。誠実で責任感が強く、一度パートナーと決めたら全力でサポートします。愛情表現はやや不器用ですが、行動で示すタイプです。恋愛運の面では、「火」のエネルギーが情熱的な恋を後押しする暗示。ただし燃え上がるスピードには注意が必要です。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】計画だけでなく、ふとしたロマンチックな瞬間も大切にしてみてください。'],
  ESFJ: ['🌳', '気づけば癒される木漏れ日', '相手を優しく照らすように支える、献身的な恋愛をするタイプです。記念日やちょっとした変化を大事にし、気配りを欠かしません。周りからの評価も気にしつつ、パートナーとの調和をとても大切にします。尽くすことに幸せを感じるタイプです。恋愛運の面では、「土」のエネルギーが安定した関係を育む暗示。じっくり信頼を積み重ねるほど、絆が強くなっていきます。開運アクションは、公園など土や緑に近い場所で過ごす時間を増やすこと。【意識するといいこと】尽くすばかりでなく、自分も甘えていいのだと知ってください。'],
  ENFJ: ['🌈', 'みんなが見上げる虹', 'みんなを惹きつける魅力があり、恋愛でも自然と相手をリードするタイプです。相手の成長や幸せを自分のことのように喜べる、包容力のある愛情表現が持ち味です。共感力が高く、相手の気持ちにとても敏感です。ただし尽くしすぎて自分を見失わないよう注意が必要です。恋愛運の面では、「木」のエネルギーが恋をゆっくり時間をかけて育てていく暗示。焦らず関係を深めていくほど、良い流れが続きます。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】相手のために動く前に、自分の本音にも気づいてあげましょう。'],
  ENTJ: ['⛅', '存在感だけで空を占める入道雲', 'スケールが大きく、恋愛にも本気で向き合う圧倒的な存在感のタイプです。将来のビジョンを明確に持っていて、パートナーとも真剣な話を早い段階でしたいタイプです。頼りがいがある一方、効率や合理性を恋愛にも求めがちです。恋愛運の面では、「火」のエネルギーが情熱的な恋を後押しする暗示。ただし燃え上がるスピードには注意が必要です。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】効率を求めすぎず、何もしない時間を一緒に楽しむ余裕も持ってみてください。'],
};

const WEATHER_MAP_EN = {
  ISTJ: ['☀️', 'The Clear Sky That Never Clouds Over', 'In love, \'stability\' matters to you more than almost anything. You\'re not chasing grand gestures — what you want is the reassurance of a steady rhythm. Once you fall for someone, you\'re remarkably faithful, with zero interest in games. You\'re just a little shy about saying how you feel out loud, so you tend to show it through actions instead. Your Earth energy favors a relationship that grows more solid the more patiently you build trust. Lucky action: spend more time somewhere close to nature, like a park. Tip: try putting your feelings into words sometimes — it\'ll help your partner feel even more secure.'],
  ISFJ: ['🌤️', 'The Sunbeam You Didn\'t Notice Warming You', 'You express love by quietly, warmly wrapping the other person up in care. You remember anniversaries and their little preferences down to the detail. You tend to put their feelings ahead of your own, which is generous but can wear you down if you\'re not careful. Your Earth energy favors patiently building trust into something solid. Lucky action: spend time somewhere close to nature, like a park. Tip: before you give too much of yourself away, make sure you\'re voicing your own feelings honestly too.'],
  INFJ: ['🌫️', 'The Fog That\'s Hard to Pin Down', 'You don\'t show your true feelings easily — your approach to love is quiet and runs deep. Surface-level dating holds little appeal; you\'re after a real, deep connection with someone who understands you at your core. Once you open up, you\'re completely devoted, but getting there takes time. Your Water energy is about flexibly meeting the other person where they are. Lucky action: spend more time near water. Tip: try opening up about how you really feel a little earlier than you\'re used to — it\'ll deepen the connection faster than you\'d expect.'],
  INTJ: ['🌀', 'The Calm Eye of a Very Focused Storm', 'In relationships, you stay composed on the surface while holding real conviction underneath. You take a long view with anyone you fall for — no impulsive romances here. You\'re not big on outward displays of emotion, but once you\'ve decided \'this is the one,\' you\'re unwavering. Your Metal energy favors staying true to who you are in love — not bending yourself out of shape tends to attract the right connection. Lucky action: wear a piece of silver or gold jewelry. Tip: practice putting your feelings into words — it\'ll close the distance between you faster than you expect.'],
  ISTP: ['🍃', 'The Breeze That Slips Away If You Chase It', 'You keep things easygoing and don\'t love being smothered or overly managed. A relationship that respects both people\'s independence feels more comfortable than one built on constant closeness. Words aren\'t really your love language — you show it through action instead. Your Metal energy favors staying true to yourself in love, which tends to draw the right person toward you. Lucky action: wear a piece of silver or gold jewelry. Tip: don\'t keep too much distance — every so often, make the first move and show you\'re actually invested.'],
  ISFP: ['🌦️', 'The Soft Rain That Falls and Fades Quietly', 'Your way of showing love is delicate and quiet — small gestures of kindness say more to you than grand declarations ever could. You avoid conflict, which sometimes means swallowing your own feelings rather than voicing them. You\'re finely attuned to your partner\'s emotional shifts. Your Wood energy favors letting love grow slowly, in its own time. Lucky action: keep a houseplant nearby. Tip: practice putting your feelings into words, little by little — you don\'t have to hold everything in.'],
  INFP: ['🌇', 'The Sunset That Makes You Want to Cry for No Reason', 'You\'re sentimental and romantic, and you hold real ideals about love. You\'re drawn to the idea of fate and special moments, and your emotions run deep and wide. Because you care so intensely, the gap between hope and reality can hit hard sometimes. Your Wood energy favors letting love grow slowly and steadily. Lucky action: keep a houseplant nearby. Tip: try not to chase the ideal too hard — let yourself really see the person in front of you, as they are.'],
  INTP: ['❄️', 'The Frost That\'s a Little Cold to the Touch', 'You might come across cool and uninterested in romance at first, but there\'s actually a whole rich inner world quietly taking shape underneath. You tend to try to understand the person you like almost analytically. With someone you trust, you can surprise people with how open you become. Your Metal energy favors staying true to yourself, which draws the right connection your way. Lucky action: wear a piece of silver or gold jewelry. Tip: before you analyze it too much, try just saying how you honestly feel — that moment matters too.'],
  ESTP: ['⛈️', 'The Sudden Downpour That Comes When It Comes', 'Both meeting someone and confessing your feelings tend to happen suddenly and with real energy — action is your love language. You go for it directly rather than playing games, and once you\'re interested, you move fast. You\'re passionate, but you also move on quickly, and you don\'t dwell on the past. Your Fire energy fuels a passionate romance, though it\'s worth watching how fast things heat up. Lucky action: wear something red. Tip: match your partner\'s pace sometimes, not just your own momentum.'],
  ESFP: ['🏖️', 'The Blue Summer Sky, Always in Top Form', 'Just being around you brightens the mood — your love life tends to be open and full of energy. You care most about dates actually being fun, and your emotional expression is refreshingly direct. You live in the moment, prioritizing how much fun you\'re having right now. Your Water energy favors flexibly adapting to your partner, and that adaptability is what draws good connections toward you. Lucky action: spend more time near water. Tip: underneath all the fun, take a moment to really listen to what your partner is actually feeling.'],
  ENFP: ['🌦️', 'The Unpredictable Passing Shower', 'Unpredictable and exciting, your love life is full of expressive emotion. When you fall for someone, you go all-in honestly and directly — though your interests can shift quickly too. You hate a relationship going stale, and you\'re always chasing that spark of something new. Your Wood energy favors love that grows slowly and steadily. Lucky action: keep a houseplant nearby. Tip: since your feelings shift easily, make a point of telling the people who matter that you want things to last.'],
  ENTP: ['🌬️', 'The First Spring Wind That Changes the Whole Mood', 'You want stimulation and change in love, too. You enjoy the back-and-forth of a good conversation and a bit of intellectual push and pull, and a relationship that goes stale bores you fast. You\'re more likely to show affection through teasing and jokes than sincere declarations. Your Water energy favors adapting freely to your partner, drawing good connections your way. Lucky action: spend more time near water. Tip: ease up on the teasing sometimes and make room for an honestly sincere moment too.'],
  ESTJ: ['☀️', 'The Reliable Stretch of Clear Skies', 'In love, you want to be someone your partner can rely on. You\'re the type to want plans and roles clearly settled, and you\'re not big on ambiguous relationships. You\'re sincere and responsible, and once you\'ve committed to a partner, you support them fully. Your Fire energy fuels a passionate approach to love. Lucky action: wear something red. Tip: alongside all the planning, make room for a spontaneous romantic moment now and then.'],
  ESFJ: ['🌳', 'The Dappled Sunlight You Didn\'t Know You Needed', 'You love in a devoted way, gently lighting up your partner\'s life. You never forget anniversaries or small changes, and you\'re consistently attentive. Above all you value harmony with your partner, and giving of yourself is genuinely where your happiness lies. Your Earth energy favors patiently building a solid, trusting relationship. Lucky action: spend time somewhere close to nature, like a park. Tip: it\'s not just about giving — let yourself lean on your partner sometimes too.'],
  ENFJ: ['🌈', 'The Rainbow Everyone Looks Up At', 'You have a natural charm that draws people in, and in love you tend to take the lead just as naturally. You genuinely delight in your partner\'s growth and happiness as if it were your own. Your empathy runs high and you\'re very attuned to your partner\'s feelings, though giving too much of yourself can mean losing sight of your own needs. Your Wood energy favors nurturing love slowly and steadily. Lucky action: keep a houseplant nearby. Tip: before you act for your partner\'s sake, check in with your own honest feelings too.'],
  ENTJ: ['⛅', 'The Towering Cloud That Owns the Whole Sky', 'You bring real scale and a commanding presence to love, approaching it every bit as seriously as everything else you do. You have a clear vision for the future and want to have the real conversations with your partner early on. You\'re dependable, though you tend to bring the same efficiency and logic you apply elsewhere into romance too. Your Fire energy fuels a bold, passionate approach to love. Lucky action: wear something red. Tip: ease off the efficiency drive occasionally — make room to just enjoy doing nothing together.'],
};

const VEHICLE_MAP = {
  ISTJ: ['🚃', '1分も遅れない電車', '決められたダイヤ通りに正確に進む、信頼度抜群のタイプです。ルールや手順を守ることに安心感を覚え、コツコツ積み上げた実績で評価されるのを好みます。急な変更にはやや戸惑いますが、一度こなしたタスクの再現性は非常に高く、「あの人に任せれば間違いない」と信頼される存在です。仕事運の面では、「土」のエネルギーが着実な信頼構築を後押しする暗示。地道な積み重ねが、やがて確かな評価に変わります。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】時には非効率に見える提案にも、一度は耳を傾けてみましょう。'],
  ISFJ: ['🚌', '気づけば全員乗せてる路線バス', 'みんなの生活を静かに支える、縁の下の力持ちタイプです。チームの中で困っている人にすぐ気づき、さりげなくフォローに回ります。目立つポジションより、周りが円滑に回るよう支える役割にやりがいを感じるタイプです。頼まれごとを断れず、気づけば仕事量が増えがちです。仕事運の面では、「土」のエネルギーが着実な信頼構築を後押しする暗示。地道な積み重ねが、やがて確かな評価に変わります。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】頼まれごとを断る練習も、自分を守るために大切にしてみてください。'],
  INFJ: ['⛵', '静かに舵を切る帆船', '静かに、しかし着実に目的地へ向かっていくタイプです。表立って主張はしませんが、仕事に対して強い意味や目的意識を持っています。周囲の人間関係の機微にも敏感で、チームの空気を読みながら動くのが得意です。一人で集中できる時間も大切にします。仕事運の面では、「水」のエネルギーが臨機応変な対応力を後押しする暗示。柔軟に流れを読む力が、思わぬチャンスを引き寄せます。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】一人で抱え込まず、早めに周りに相談する習慣をつけてみましょう。'],
  INTJ: ['🛥️', '見えないところで進む潜水艦', '表舞台にはあまり出ず、戦略的に深く物事を進めるタイプです。長期的な視点で計画を立てるのが得意で、非効率なプロセスを見るとつい改善したくなります。感情より合理性を優先するため、時にドライに見られることも。一度狙いを定めたら、着実に目標へ近づいていきます。仕事運の面では、「金」のエネルギーが決断力と実行力を後押しする暗示。迷ったときほど、直感を信じて動くと良い結果につながります。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】完璧を求めすぎず、途中経過をこまめに周りと共有してみましょう。'],
  ISTP: ['🏍️', '状況見て即対応するバイク', '身軽さとフットワークの軽さが武器のタイプです。マニュアル通りより、その場の状況に応じて素早く対応する実践力があります。トラブルが起きても冷静に対処できる問題解決能力の持ち主です。細かい管理や長い会議は苦手で、手を動かしている方が力を発揮します。仕事運の面では、「金」のエネルギーが決断力と実行力を後押しする暗示。迷ったときほど、直感を信じて動くと良い結果につながります。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】その場対応だけでなく、たまには先の見通しを立てる時間も作ってみましょう。'],
  ISFP: ['🛶', '自分のペースを崩さないカヌー', '自分のペースで、景色を楽しみながら着実に進んでいくタイプです。派手な成果よりも、丁寧な仕事ぶりや美意識にこだわりを持っています。争いを好まず、マイペースに自分の役割をこなすタイプです。プレッシャーの強い環境よりも、落ち着いた環境で力を発揮します。仕事運の面では、「木」のエネルギーがコツコツ積み上げる努力を後押しする暗示。焦らず育てた実績が、いずれ大きな信頼につながります。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】自分の実力をもっとアピールしても、きっと正当に評価されます。'],
  INFP: ['🎈', '風向き任せの熱気球', '理想やビジョンを追い風にして進んでいくタイプです。目の前の作業よりも「何のためにやるのか」という意味づけを大事にします。共感力が高く、チームの雰囲気づくりにも一役買うタイプです。ただしモチベーションの波があり、腑に落ちない仕事には力が入りにくい一面も。仕事運の面では、「木」のエネルギーがコツコツ積み上げる努力を後押しする暗示。焦らず育てた実績が、いずれ大きな信頼につながります。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】意味を感じにくい作業にも、小さな意義を見つける工夫をしてみましょう。'],
  INTP: ['🧪', '目的地よりエンジンが気になる実験車両', 'ルートそのものより、仕組みや理屈を突き詰めることに興味があるタイプです。既存のやり方に疑問を持ち、「もっと良い方法があるはず」と独自の視点で仕事に取り組みます。単調な作業の繰り返しよりも、考える余地のある仕事で本領を発揮するタイプです。仕事運の面では、「金」のエネルギーが決断力と実行力を後押しする暗示。迷ったときほど、直感を信じて動くと良い結果につながります。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】考えるだけでなく、早めに形にして周りと共有すると、もっと評価されやすくなります。'],
  ESTP: ['🏎️', 'アクセル全開スポーツカー', 'スピードと瞬発力で勝負するタイプです。じっくり計画を練るより、まず動いて現場で判断していくスタイルが得意です。トラブルやアクシデントにも動じず、その場で最適な一手を打てる行動力の持ち主です。停滞した状況より、変化の多い現場で輝きます。仕事運の面では、「火」のエネルギーが推進力と情熱を後押しする暗示。勢いに乗っている時ほど、大きな成果につながりやすいでしょう。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】勢いだけでなく、振り返りの時間を作ると、成長がさらに加速します。'],
  ESFP: ['🚗', 'みんなを乗せて走るオープンカー', '周りを盛り上げながら軽快に仕事を進めるタイプです。チームの雰囲気を明るくするムードメーカー的存在で、人と接する仕事で特に力を発揮します。臨機応変な対応が得意な一方、地道なルーティンワークはやや苦手です。楽しみながら成果を出すのが得意です。仕事運の面では、「水」のエネルギーが臨機応変な対応力を後押しする暗示。柔軟に流れを読む力が、思わぬチャンスを引き寄せます。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】楽しさだけでなく、地道な積み重ねも意識してみましょう。'],
  ENFP: ['🪂', '気流次第で行き先が変わるグライダー', '自由に風向きを変えながら、新しいアイデアを追いかけていくタイプです。ブレインストーミングや新規プロジェクトの立ち上げで特に力を発揮します。好奇心が旺盛な分、興味の対象が移りやすく、地道な継続作業はやや苦手です。周りを自然と巻き込むエネルギーがあります。仕事運の面では、「木」のエネルギーがコツコツ積み上げる努力を後押しする暗示。焦らず育てた実績が、いずれ大きな信頼につながります。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】やりたいことを絞り込む練習をすると、周りからの信頼もさらに高まります。'],
  ENTP: ['🏁', 'コース取りで語りたいレーシングカート', '議論というコース取りを楽しみながら仕事を進めるタイプです。前例や常識に疑問を投げかけ、新しいやり方を提案するのが得意です。単調な仕事より、頭を使う課題解決を好みます。人を説得したり議論を盛り上げたりする場面で本領を発揮するタイプです。仕事運の面では、「水」のエネルギーが臨機応変な対応力を後押しする暗示。柔軟に流れを読む力が、思わぬチャンスを引き寄せます。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】アイデアを出すだけでなく、最後までやり切る意識を持つと成果につながります。'],
  ESTJ: ['🚄', '遅延を許さない新幹線', '効率重視で一直線に目標へ突き進むタイプです。計画立案から実行管理まで、きっちりこなす実務能力の高さが持ち味です。責任感が強く、リーダーやマネジメントの役割で力を発揮します。曖昧な指示や非効率なプロセスには強いストレスを感じるタイプです。仕事運の面では、「火」のエネルギーが推進力と情熱を後押しする暗示。勢いに乗っている時ほど、大きな成果につながりやすいでしょう。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】結果だけでなく、過程にいる人の気持ちにも目を向けてみましょう。'],
  ESFJ: ['🚙', '全員のシートベルトを確認するファミリーカー', 'チーム全員が快適に過ごせるよう気を配る、調整役タイプです。周りの状況によく気を配り、円滑な人間関係を築くのが得意です。頼まれた仕事は責任を持ってやり遂げる誠実さがあり、感謝されることに大きなやりがいを感じます。仕事運の面では、「土」のエネルギーが着実な信頼構築を後押しする暗示。地道な積み重ねが、やがて確かな評価に変わります。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】気配りだけでなく、自分の意見ももっと発信してみましょう。'],
  ENFJ: ['🚍', '気づけば全員案内してる観光バス', 'チームを導きながら、みんなのモチベーションを高めていくタイプです。人の成長や可能性に強い関心があり、後輩や同僚のサポートに熱心です。共感力の高さを活かしたコミュニケーションが得意な一方、周りに気を配りすぎて自分の負担が増えがちです。仕事運の面では、「木」のエネルギーがコツコツ積み上げる努力を後押しする暗示。焦らず育てた実績が、いずれ大きな信頼につながります。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】人を支えるだけでなく、自分の成果も正当にアピールしましょう。'],
  ENTJ: ['🚢', '艦隊を率いるフラッグシップ', '全体を見渡し、迷いなく指揮していくリーダータイプです。目標達成のためなら大胆な決断もいとわず、チームを牽引する力があります。効率と成果を強く求めるため、周りにも高い基準を課しがちです。困難なプロジェクトほど燃えるタイプです。仕事運の面では、「火」のエネルギーが推進力と情熱を後押しする暗示。勢いに乗っている時ほど、大きな成果につながりやすいでしょう。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】スピード重視だけでなく、周りの納得感も大事にしてみましょう。'],
};

const VEHICLE_MAP_EN = {
  ISTJ: ['🚃', 'The Train That\'s Never a Minute Late', 'You move like a train that runs exactly on schedule — reliability is your calling card. You find real comfort in rules and process, and you\'d rather be recognized for results built up steadily over time. Sudden changes throw you off a little, but once you\'ve mastered a task, you can repeat it flawlessly. Your Earth energy at work favors steady trust-building; consistent effort eventually turns into solid recognition. Lucky action: keep your desk organized. Tip: give an inefficient-looking idea a fair hearing every once in a while.'],
  ISFJ: ['🚌', 'The Local Bus Quietly Carrying Everyone', 'You quietly hold the team together, the reliable support everyone counts on. You notice when a coworker is struggling before they say anything, and you step in without making a thing of it. You find it hard to say no, and your workload tends to creep up as a result. Your Earth energy favors steady trust-building at work. Lucky action: keep your desk organized. Tip: practice turning down requests sometimes — it\'s part of protecting yourself.'],
  INFJ: ['⛵', 'The Sailboat Steering Quietly Toward Its Goal', 'You move toward your goals quietly but with real conviction. You don\'t push your opinions loudly, but you carry a genuine sense of purpose in your work. You\'re sensitive to the dynamics on your team while still valuing time to focus alone. Your Water energy favors adaptability at work — reading the flow of a situation is what opens up unexpected opportunities for you. Lucky action: stay hydrated throughout the day. Tip: build the habit of asking for help early, rather than carrying it all yourself.'],
  INTJ: ['🛥️', 'The Submarine Moving Unseen Beneath the Surface', 'You rarely take center stage, preferring to move strategically and deeply. You\'re good at long-term planning, and inefficient processes practically beg to be fixed in your head. You lean on logic over emotion, but once you\'ve locked onto a target, you close in on it steadily. Your Metal energy favors decisive action at work — trusting your instincts when you\'re unsure tends to lead to good outcomes. Lucky action: use white or gold stationery. Tip: don\'t chase perfection so hard — share your progress along the way, not just the finished product.'],
  ISTP: ['🏍️', 'The Motorcycle That Reads the Situation and Reacts', 'Your lightness on your feet is your biggest asset. You\'d rather read the situation and react in real time than follow the manual to the letter, and your composure under pressure makes you genuinely good at solving problems as they come up. Detailed management and long meetings aren\'t really your thing. Your Metal energy favors decisive action — trusting your gut when it counts tends to pay off. Lucky action: use white or gold stationery. Tip: alongside reacting in the moment, carve out time to think a step or two ahead sometimes.'],
  ISFP: ['🛶', 'The Canoe That Never Breaks Its Own Pace', 'You move at your own pace, taking in the scenery as you steadily make progress. You care more about doing careful, thoughtful work than about flashy results. You avoid conflict and quietly go about your role at your own pace, doing your best work in a calm environment. Your Wood energy favors patient, steady effort at work. Lucky action: keep a small houseplant on your desk. Tip: don\'t be afraid to show off your ability more — you deserve to be properly recognized for it.'],
  INFP: ['🎈', 'The Hot-Air Balloon Riding the Wind of an Idea', 'You move forward on the strength of your ideals and vision — the \'why\' behind the work matters more to you than the task itself. You\'re highly empathetic and often end up shaping the mood of the team. Your motivation ebbs and flows, and work that doesn\'t feel meaningful is genuinely hard to push through. Your Wood energy favors patient, steady effort. Lucky action: keep a small houseplant on your desk. Tip: try finding a small sense of meaning even in the tasks that don\'t naturally excite you.'],
  INTP: ['🧪', 'The Experimental Vehicle More Interested in the Engine Than the Destination', 'You\'re more interested in the mechanics than the destination. You question the established way of doing things and bring your own independent perspective to the table. Repetitive, routine work bores you; you\'re at your best on problems that actually make you think. Your Metal energy favors decisive action, trusting your instincts when the path isn\'t clear. Lucky action: use white or gold stationery. Tip: don\'t just think it through — put your ideas into a shareable form early, so people can actually recognize how good they are.'],
  ESTP: ['🏎️', 'The Sports Car with the Pedal Always Down', 'You compete on speed and instinct. You\'d rather move and read the situation live than sit around planning it out in advance. Trouble and sudden curveballs don\'t rattle you; you\'re the one who finds the right move on the spot. Your Fire energy fuels momentum and passion at work — ride the wave when you\'re on a roll, and big results tend to follow. Lucky action: catch the morning sun before starting your day. Tip: build in real time to reflect, not just keep moving — it\'ll accelerate your growth even further.'],
  ESFP: ['🚗', 'The Convertible Giving Everyone a Ride', 'You bring the energy up wherever you go, working best in roles where you\'re actually interacting with people. You\'re a natural mood-lifter for the team, adaptable and quick on your feet, though routine work that needs steady grinding isn\'t your strong suit. Your Water energy favors adaptability at work — reading the flow of the moment tends to open up unexpected chances. Lucky action: stay hydrated throughout the day. Tip: alongside the fun, make room for the slow, steady work too.'],
  ENFP: ['🪂', 'The Glider Whose Destination Changes With the Wind', 'You chase new ideas freely, changing direction with the wind. You\'re especially strong in brainstorming and kicking off new projects. Your curiosity runs wide, so your interests shift easily and long, steady follow-through isn\'t your natural strength. Your Wood energy favors patient, steady effort at work. Lucky action: keep a small houseplant on your desk. Tip: narrowing your focus will earn you even more trust from the people around you.'],
  ENTP: ['🏁', 'The Go-Kart That Wants to Talk Racing Lines', 'You enjoy the debate as much as the destination. You question precedent and common assumptions, proposing new approaches, and you\'re much happier solving a thought-provoking problem than doing routine work. Your Water energy favors adaptability — reading the flow of a situation opens up unexpected chances. Lucky action: stay hydrated throughout the day. Tip: don\'t just pitch ideas — follow through and see them all the way to the end, and the results will follow.'],
  ESTJ: ['🚄', 'The Bullet Train That Refuses to Run Late', 'You drive straight toward the goal with real efficiency. Your execution — from planning to management — is genuinely strong, and your sense of responsibility means you thrive in leadership and management roles. Vague instructions and inefficient processes genuinely stress you out. Your Fire energy fuels momentum — ride your own drive at the right moment, and the results follow. Lucky action: catch the morning sun before starting your day. Tip: look beyond the results to the people going through the process with you.'],
  ESFJ: ['🚙', 'The Family Car Checking Everyone\'s Seatbelt', 'You\'re the coordinator making sure the whole team stays comfortable. You\'re attentive to the people around you and genuinely skilled at building smooth relationships. You take real ownership of whatever\'s handed to you, and there\'s real fulfillment for you in being appreciated. Your Earth energy favors steady trust-building at work. Lucky action: keep your desk organized. Tip: alongside all the consideration for others, speak up with your own opinions more too.'],
  ENFJ: ['🚍', 'The Tour Bus Guide Who Somehow Guides Everyone', 'You lead by lifting everyone\'s spirits along the way. You\'re genuinely invested in the growth and potential of your teammates, and supporting juniors and colleagues brings you real energy. Your empathy makes you a strong communicator, though giving so much attention to others can mean your own workload quietly piles up. Your Wood energy favors patient, steady growth at work. Lucky action: keep a small houseplant on your desk. Tip: don\'t just support others — make sure your own achievements get properly recognized too.'],
  ENTJ: ['🚢', 'The Flagship Commanding the Whole Fleet', 'You survey the whole field and lead without hesitation. You\'re not afraid of bold decisions in pursuit of a goal, and you have the leadership to pull a whole team along with you. Your drive for efficiency and results means you set the bar high for everyone around you too, and the harder the project, the more you come alive. Your Fire energy fuels momentum toward big goals. Lucky action: catch the morning sun before starting your day. Tip: alongside the speed, make sure everyone around you is actually on board with where you\'re heading.'],
};

const BLOCK_MAP = { personality: ANIMAL_MAP, love: WEATHER_MAP, work: VEHICLE_MAP };
const BLOCK_MAP_NAME = { personality: '動物', love: '天気', work: '乗り物' };
const BLOCK_MAP_EN = { personality: ANIMAL_MAP_EN, love: WEATHER_MAP_EN, work: VEHICLE_MAP_EN };
const BLOCK_MAP_NAME_EN = { personality: 'Animal', love: 'Weather', work: 'Vehicle' };

// ===== 五行(占い要素)とラッキーアイテム =====
// MBTIタイプごとの五行属性(3つのマップ全てで共通の属性を使用)
const TYPE_ELEMENT = {
  ISTJ: '土', ISFJ: '土', ESFJ: '土',
  INFJ: '水', ESFP: '水', ENTP: '水',
  INTJ: '金', ISTP: '金', INTP: '金',
  ISFP: '木', INFP: '木', ENFP: '木', ENFJ: '木',
  ESTP: '火', ESTJ: '火', ENTJ: '火',
};

// アフィリエイトタグ未設定の間は通常の商品検索リンクとして機能する
// (Amazonアソシエイト等のタグが決まったら AFFILIATE_TAG に設定してください)
const AFFILIATE_TAG = ''; // 例: 'yourtag-22'

// カテゴリ×五行属性でラッキーアイテムを分ける(同じ属性が複数カテゴリで重なっても被らないように)
const LUCKY_ITEM_MAP = {
  personality: {
    '木': { emoji: '🪴', name: '観葉植物', keyword: '観葉植物 卓上 ミニ' },
    '火': { emoji: '🌸', name: '香水・フレグランス', keyword: '香水 フレグランス' },
    '土': { emoji: '☕', name: '陶器のマグカップ', keyword: '陶器 マグカップ' },
    '金': { emoji: '💼', name: 'アクセサリーケース', keyword: 'アクセサリーケース' },
    '水': { emoji: '🕯️', name: 'アロマディフューザー', keyword: 'アロマディフューザー' },
  },
  love: {
    '木': { emoji: '🍵', name: 'ハーブティーセット', keyword: 'ハーブティー ギフトセット' },
    '火': { emoji: '💍', name: '赤いアクセサリー', keyword: 'アクセサリー レッド' },
    '土': { emoji: '🍶', name: 'ペアマグカップ', keyword: 'ペアマグカップ' },
    '金': { emoji: '✨', name: 'シルバー・ゴールドのネックレス', keyword: 'ネックレス シルバー ゴールド' },
    '水': { emoji: '🌊', name: '水辺で使えるタンブラー', keyword: 'タンブラー おしゃれ' },
  },
  work: {
    '木': { emoji: '🌱', name: 'デスク用ミニ観葉植物', keyword: 'デスク 観葉植物 ミニ' },
    '火': { emoji: '⏰', name: 'モーニングライト(光目覚まし)', keyword: '光目覚まし時計' },
    '土': { emoji: '🗂️', name: 'デスクオーガナイザー', keyword: 'デスクオーガナイザー 収納' },
    '金': { emoji: '🖋️', name: '高級文房具セット', keyword: '高級 文房具 ギフト' },
    '水': { emoji: '🍶', name: 'おしゃれな水筒', keyword: '水筒 おしゃれ' },
  },
};

// 英語版: 要素名の英訳とラッキーアイテム(Amazon.com向けキーワード)
const ELEMENT_NAME_EN = { '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water' };
const LUCKY_ITEM_MAP_EN = {
  personality: {
    '木': { emoji: '🪴', name: 'a small potted plant', keyword: 'small desk plant' },
    '火': { emoji: '🌸', name: 'a signature fragrance', keyword: 'perfume fragrance' },
    '土': { emoji: '☕', name: 'a ceramic mug', keyword: 'ceramic mug' },
    '金': { emoji: '💼', name: 'a jewelry case', keyword: 'jewelry case accessory' },
    '水': { emoji: '🕯️', name: 'an aroma diffuser', keyword: 'aroma diffuser' },
  },
  love: {
    '木': { emoji: '🍵', name: 'a herbal tea gift set', keyword: 'herbal tea gift set' },
    '火': { emoji: '💍', name: 'a red accessory', keyword: 'red jewelry accessory' },
    '土': { emoji: '🍶', name: 'matching couple mugs', keyword: 'matching couple mugs' },
    '金': { emoji: '✨', name: 'a silver or gold necklace', keyword: 'silver gold necklace' },
    '水': { emoji: '🌊', name: 'a stylish tumbler', keyword: 'stylish tumbler' },
  },
  work: {
    '木': { emoji: '🌱', name: 'a small desk plant', keyword: 'small desk plant' },
    '火': { emoji: '⏰', name: 'a sunrise alarm clock', keyword: 'sunrise light alarm clock' },
    '土': { emoji: '🗂️', name: 'a desk organizer', keyword: 'desk organizer' },
    '金': { emoji: '🖋️', name: 'a premium stationery set', keyword: 'premium stationery gift set' },
    '水': { emoji: '🍶', name: 'a stylish water bottle', keyword: 'stylish water bottle tumbler' },
  },
};

function affiliateUrl(keyword) {
  const domain = LANG === 'en' ? 'www.amazon.com' : 'www.amazon.co.jp';
  const base = `https://${domain}/s?k=${encodeURIComponent(keyword)}`;
  return AFFILIATE_TAG ? `${base}&tag=${encodeURIComponent(AFFILIATE_TAG)}` : base;
}

// ===== 言語 =====
let LANG = 'ja';
function getQuestions() { return LANG === 'en' ? QUESTIONS_EN : QUESTIONS; }
function getBlockMeta() { return LANG === 'en' ? BLOCK_META_EN : BLOCK_META; }
function getBlockMap() { return LANG === 'en' ? BLOCK_MAP_EN : BLOCK_MAP; }
function getBlockMapName() { return LANG === 'en' ? BLOCK_MAP_NAME_EN : BLOCK_MAP_NAME; }
function getLuckyMap() { return LANG === 'en' ? LUCKY_ITEM_MAP_EN : LUCKY_ITEM_MAP; }
function getElementName(el) { return LANG === 'en' ? ELEMENT_NAME_EN[el] : el; }

const UI_TEXT = {
  ja: {
    eyebrow: 'FREE PERSONALITY TEST',
    titleHtml: 'あなたの<span class="grad-text">3つの顔</span>、診断します',
    lead: 'AIとチャットしながら答えるだけ。<br>「性格」「恋愛」「仕事」でタイプが変わる、<br>ちょっと不思議な診断です。',
    badges: ['🐢 動物', '☀️ 天気', '🚃 乗り物', 'でたとえます'],
    startBtn: '診断をはじめる ✨',
    sub: '全30問・所要時間 約3分',
    resultEyebrow: 'RESULT',
    resultTitleHtml: '診断結果 <span class="grad-text">できました</span>',
    shareBtn: '結果をXでシェア 🚀',
    restartBtn: 'もう一度診断する',
    luckyLabel: '🍀 今日のラッキーアイテム',
    prTag: 'PR',
    luckySeeMore: (name) => `${name}を見てみる`,
    mbtiElementLine: (type, element) => `MBTI: ${type} ・ 五行: ${element}`,
    catLine: (catName, mapName) => `${catName}(${mapName}にたとえると)`,
    shareText: (p, l, w) => `性格・恋愛・仕事タイプ診断やってみた!\n性格: ${p} / 恋愛: ${l} / 仕事: ${w}\n#性格診断 #MBTI診断`,
    lineBtn: 'LINEでシェア',
    footerDisclaimer: '本診断はエンタメ目的のコンテンツです。科学的な心理診断や実際の占い・鑑定に代わるものではありません。',
    footerAffiliate: '🔖 本ページの「ラッキーアイテム」リンクにはアフィリエイト(広告)リンクを含みます。リンク経由の購入により、当サイトが紹介料を得る場合があります。',
  },
  en: {
    eyebrow: 'FREE PERSONALITY TEST',
    titleHtml: 'Reveal Your <span class="grad-text">3 Hidden Sides</span>',
    lead: 'Just chat with the AI to find out.<br>Your Personality, Love, and Career types<br>might all be different — a curiously accurate test.',
    badges: ['🐢 Animal', '☀️ Weather', '🚃 Vehicle', 'as your symbol'],
    startBtn: 'Start the Test ✨',
    sub: '30 questions · about 3 minutes',
    resultEyebrow: 'RESULT',
    resultTitleHtml: 'Your Results <span class="grad-text">Are In</span>',
    shareBtn: 'Share on X 🚀',
    restartBtn: 'Take the Test Again',
    luckyLabel: "🍀 Today's Lucky Item",
    prTag: 'AD',
    luckySeeMore: (name) => `Shop ${name}`,
    mbtiElementLine: (type, element) => `MBTI: ${type} · Element: ${element}`,
    catLine: (catName, mapName) => `${catName} — ${mapName} Edition`,
    shareText: (p, l, w) => `I just took a Personality / Love / Career type test!\nPersonality: ${p} / Love: ${l} / Career: ${w}\n#PersonalityTest #MBTI`,
    lineBtn: 'Share on LINE',
    footerDisclaimer: 'This test is for entertainment purposes only and is not a substitute for a scientific psychological assessment or professional reading.',
    footerAffiliate: '🔖 The "Lucky Item" links on this page are affiliate (ad) links. We may earn a commission on purchases made through these links.',
  },
};

function applyLangUI() {
  const t = UI_TEXT[LANG];
  document.getElementById('start-eyebrow').textContent = t.eyebrow;
  document.getElementById('start-title').innerHTML = t.titleHtml;
  document.getElementById('start-lead').innerHTML = t.lead;
  document.getElementById('start-badges').innerHTML = t.badges.map(b => `<span class="badge">${b}</span>`).join('');
  document.getElementById('btn-start').textContent = t.startBtn;
  document.getElementById('start-sub').textContent = t.sub;
  document.getElementById('result-eyebrow').textContent = t.resultEyebrow;
  document.getElementById('result-title-el').innerHTML = t.resultTitleHtml;
  document.getElementById('btn-share').textContent = t.shareBtn;
  document.getElementById('btn-share-line').textContent = t.lineBtn;
  document.getElementById('btn-restart').textContent = t.restartBtn;
  document.getElementById('footer-disclaimer').textContent = t.footerDisclaimer;
  document.getElementById('footer-affiliate').textContent = t.footerAffiliate;
  document.documentElement.lang = LANG;
}

function setLang(lang) {
  LANG = lang;
  document.getElementById('btn-lang-ja').classList.toggle('active', lang === 'ja');
  document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
  applyLangUI();
}

// ===== 状態 =====
let currentIndex = 0;
let answers = []; // { block, axis, weight }

// ===== DOM =====
const screens = {
  start: document.getElementById('screen-start'),
  chat: document.getElementById('screen-chat'),
  result: document.getElementById('screen-result'),
};
const chatLog = document.getElementById('chat-log');
const chatOptions = document.getElementById('chat-options');
const blockLabel = document.getElementById('block-label');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
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
  const questions = getQuestions();
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }
  const q = questions[currentIndex];
  const meta = getBlockMeta()[q.block];
  blockLabel.textContent = meta.label;
  blockLabel.style.background = meta.color + '22';
  blockLabel.style.color = meta.color;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;
  progressText.textContent = `${currentIndex + 1} / ${questions.length}`;

  addBubble(q.text, 'ai');
  renderOptions(q);
}

function addBubble(text, who) {
  const wrap = document.createElement('div');
  wrap.className = `bubble-row ${who}`;
  if (who === 'ai') {
    wrap.innerHTML = `<div class="avatar">🤖</div><div class="bubble ai">${text}</div>`;
  } else {
    wrap.innerHTML = `<div class="bubble user">${text}</div>`;
  }
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// 4択: すべて異なる文章。1〜4の番号だけ振って提示する
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
  answers.push({ block: q.block, axis: opt.axis, weight: opt.weight });
  chatOptions.innerHTML = '';
  currentIndex++;
  setTimeout(askNext, 350);
}

const AXIS_PAIRS = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];

// 同数の場合は毎回ランダムに決める(常に同じ側に倒すと、その側のタイプが
// 統計的に偏って出やすくなることが4000回シミュレーションで確認されたため、2026-08-09に修正)
function computeType(block) {
  const blockAnswers = answers.filter(a => a.block === block);
  const scores = {};
  blockAnswers.forEach(a => { scores[a.axis] = (scores[a.axis] || 0) + a.weight; });

  let type = '';
  AXIS_PAIRS.forEach(([first, second]) => {
    const s1 = scores[first] || 0;
    const s2 = scores[second] || 0;
    if (s1 === s2) {
      type += Math.random() < 0.5 ? first : second;
    } else {
      type += s1 > s2 ? first : second;
    }
  });
  return type;
}

function showResult() {
  showScreen('result');
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const blockMeta = getBlockMeta();
  const blockMapName = getBlockMapName();
  const luckyMap = getLuckyMap();
  const resultCards = document.getElementById('result-cards');
  resultCards.innerHTML = '';

  ['personality', 'love', 'work'].forEach((block, i) => {
    const type = computeType(block);
    const map = blockMap[block];
    const [emoji, label, desc] = map[type] || ['❓', '???', 'Unexpected data during diagnosis'];
    const meta = blockMeta[block];
    const element = TYPE_ELEMENT[type];
    const lucky = luckyMap[block][element];

    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.setProperty('--accent', meta.color);
    card.style.animationDelay = `${i * 0.15}s`;
    card.innerHTML = `
      <div class="card-icon">${emoji}</div>
      <div class="cat-name">${meta.icon} ${t.catLine(meta.catName, blockMapName[block])}</div>
      <div class="type-name">${label}</div>
      <div class="mbti-code">${t.mbtiElementLine(type, getElementName(element))}</div>
      <div class="desc">${desc}</div>
      <a class="lucky-item" href="${affiliateUrl(lucky.keyword)}" target="_blank" rel="noopener sponsored">
        <span class="lucky-emoji">${lucky.emoji}</span>
        <span class="lucky-text"><span class="lucky-label">${t.luckyLabel}<span class="lucky-pr-tag">${t.prTag}</span></span><span class="lucky-name">${t.luckySeeMore(lucky.name)}</span></span>
        <span class="lucky-arrow">›</span>
      </a>
    `;
    resultCards.appendChild(card);
  });
}

function shareResult() {
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const p = computeType('personality'), l = computeType('love'), w = computeType('work');
  const pLabel = blockMap.personality[p][1], lLabel = blockMap.love[l][1], wLabel = blockMap.work[w][1];
  const text = t.shareText(pLabel, lLabel, wLabel);
  const url = encodeURIComponent(location.href);
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

function shareResultLine() {
  const url = encodeURIComponent(location.href);
  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

function restartQuiz() {
  startQuiz();
}

// ===== アクセス解析(任意) =====
// GA4の測定IDが決まったらここに設定してください(空文字の間は何も読み込みません、追加コストなし)
const GA_MEASUREMENT_ID = '';
if (GA_MEASUREMENT_ID) {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

document.getElementById('btn-start').addEventListener('click', startQuiz);
document.getElementById('btn-share').addEventListener('click', shareResult);
document.getElementById('btn-share-line').addEventListener('click', shareResultLine);
document.getElementById('btn-restart').addEventListener('click', restartQuiz);
document.getElementById('btn-lang-ja').addEventListener('click', () => setLang('ja'));
document.getElementById('btn-lang-en').addEventListener('click', () => setLang('en'));
