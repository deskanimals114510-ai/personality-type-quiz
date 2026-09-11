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

// textColor: block-labelの文字色。背景(colorの13%透過)に対してWCAG AA(4.5:1)を満たす
// 濃色バリアントを別途用意している(colorそのものを文字色に使うと同系色×薄背景で低コントラストになるため)。
const BLOCK_META = {
  personality: { label: '性格編', catName: '性格タイプ', icon: '✨', color: '#b892ff', textColor: '#6a3fb0' },
  love:        { label: '恋愛編', catName: '恋愛タイプ', icon: '💌', color: '#ff8fb3', textColor: '#a8305c' },
  work:        { label: '仕事編', catName: '仕事タイプ', icon: '💼', color: '#5bc8b5', textColor: '#0d6e5e' },
};
const BLOCK_META_EN = {
  personality: { label: 'Personality', catName: 'Personality Type', icon: '✨', color: '#b892ff', textColor: '#6a3fb0' },
  love:        { label: 'Love', catName: 'Love Type', icon: '💌', color: '#ff8fb3', textColor: '#a8305c' },
  work:        { label: 'Career', catName: 'Career Type', icon: '💼', color: '#5bc8b5', textColor: '#0d6e5e' },
};

// ===== 結果マッピング(絵文字 / ひねりを加えたタイプ名 / 詳細説明+占い要素+アドバイス) =====
// [絵文字, タイプ名, 詳細説明(五行占いの要素→【意識するといいこと】まで含む)]
const ANIMAL_MAP = {
  ISTJ: ['🐢', '石橋を叩きすぎる亀', '「まあ大丈夫でしょ」が世界で一番信用できない言葉、というくらい確認を怠らない人です。締め切りは破るものではなく守るもの、約束は忘れるものではなく果たすもの。そんなあなたの周りには「あの人に任せれば絶対大丈夫」という静かな信頼が積もっています。流行の新しさより使い込んだ定番を選ぶのは、臆病だからではなく、本当に大事なものを知っているから。昨日より一歩進んだ今日を重ねる生き方こそ、あなたの最大の財産です。占いの視点では、あなたは五行(木・火・土・金・水)でいう「土」の気質を持つタイプ。どっしり構えて周りを支える、大地そのものの属性です。ラッキーカラーは黄土色。【意識するといいこと】たまには石橋を叩かずに渡ってみると、橋の向こうに思わぬ景色が待っているかもしれません。'],
  ISFJ: ['🐕', '気づいたら支えてる柴犬', '誰かが困った顔をする0.5秒前に気づいて、もう動いている。そんな察知能力の持ち主です。「大丈夫?」と聞く前に温かいお茶を差し出せるタイプで、記念日も好みも、頼まれてもいないのにちゃんと覚えています。ただ、その優しさは「断るのが苦手」という弱点とセットで、気づけば自分の予定表が他人の用事で埋まっていることも。それでも「困ったときはあの人」と真っ先に名前が挙がるのは、あなたの誠実さが本物だからです。占いの視点では、あなたは五行でいう「土」の気質を持つタイプ。黙って周りを支える、大地のような属性です。ラッキーカラーは黄土色。【意識するといいこと】「今日は無理」と言っても嫌われません。自分の希望を口にする練習を、少しずつ始めてみましょう。'],
  INFJ: ['🦉', '全部お見通しのフクロウ', '会議で一言も発していないのに、終わる頃には誰が何を考えていたか全部把握している。そんな静かな観察者です。雑談10回より本音の対話1回を選ぶタイプで、心を許す相手は少数精鋭。感情は内側の深いところにしまってあるので「ミステリアス」と言われがちですが、実は誰よりも熱い理想を胸に抱えています。一度「これだ」と信じたものへの静かな覚悟は、簡単には揺らぎません。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。器に合わせて形を変えながら、深く静かに進んでいく属性です。ラッキーカラーは藍色。【意識するといいこと】頭の中で完結させる前に、信頼できる人に途中経過を話してみると、抱えていた重さが半分になります。'],
  INTJ: ['🐺', '頭の中はすでに勝ってる狼', '雑談をしている間も、頭の中では3手先のシミュレーションが走っている人です。「なんとなく」で動くことがほぼなく、あらゆる行動の裏に自分なりの戦略があります。一度決めたら外野の声ではブレない芯の強さが持ち味ですが、その分「人に頼る」というコマンドだけ実装されていない疑惑も。非効率なものを見ると、頼まれてもいないのに改善案を組み立て始めてしまいます。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。無駄を削ぎ落として本質だけを残す、刃物のような鋭さを持つ属性です。ラッキーカラーは白金色。【意識するといいこと】たまには計画書を閉じて、誰かに丸ごと任せてみましょう。想定外の中にこそ、あなたの計画を超える発見があります。'],
  ISTP: ['🐱', 'やる気スイッチ気まぐれ猫', '説明書は読まない。まず触る。それがあなたの学び方です。理屈をこねるより手を動かして確かめる実践派で、興味のスイッチが入った時の集中力は周りが驚くレベル。ただしそのスイッチの場所は誰にも(たぶん本人にも)わかりません。束縛の気配を感じるとスッと距離を取る自由人ですが、トラブルの瞬間だけは誰よりも冷静で、気づけば一番頼りにされている——そんな不思議な存在です。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。余計なものを断ち切り、本質を一瞬で見抜く属性です。ラッキーカラーは白金色。【意識するといいこと】「言わなくても伝わる」は、案外伝わっていません。気持ちをたまに言語化すると、世界がもう少し楽になります。'],
  ISFP: ['🐰', '静かに全部感じてるうさぎ', '口数は少なくても、心の中では誰よりも多くのことを感じ取っている人です。夕焼けの色、音楽の一節、ふとした優しさ——人が通り過ぎてしまう瞬間に、いちいち心を動かしています。争いが苦手で主張は控えめですが、内側には譲れない美意識がしっかりとあり、あなたの「なんとなく良い」の精度は抜群です。心を開くまでは時間がかかるものの、一度懐に入れた相手への愛情は深く、長く続きます。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。時間をかけて自分だけの世界を静かに育てていく属性です。ラッキーカラーは若草色。【意識するといいこと】その「なんとなく」をもっと口に出して大丈夫。あなたの感性は、あなたが思う3倍は価値があります。'],
  INFP: ['🦌', '傷つきやすいけど譲れない鹿', '損得勘定の電卓ではなく、「自分が納得できるか」という羅針盤で生きている人です。流行にも多数決にも流されにくく、心の中の大切な価値観だけは何があっても手放しません。人の痛みに敏感で、物語や音楽に本気で泣けるタイプ。傷つきやすさと引き換えに、誰よりも深く感じる力を持っています。心を許した相手に注ぐ優しさは、静かだけれど驚くほど熱いものです。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。理想という光に向かって、じっくり伸びていく属性です。ラッキーカラーは若草色。【意識するといいこと】理想との距離に落ち込んだ日は、進んだ距離の方を数えてください。小さな一歩は、ちゃんと前進です。'],
  INTP: ['🦝', '気づいたら早口になるタヌキ', '普段は省エネモードで飄々としているのに、好きな話題になった瞬間、急に早口になる人です。「なぜそうなるのか」が気になり始めると止まらず、気づけば深夜まで調べものをしていることも。効率や常識より仕組みと理屈が大事で、誰も気にしていなかった矛盾をふと指摘して場を静まらせる特技があります。マイペースの皮をかぶった、頭脳フル回転の探究者です。占いの視点では、あなたは五行でいう「金」の気質を持つタイプ。物事を切り分けて核心を取り出す、分析の属性です。ラッキーカラーは白金色。【意識するといいこと】頭の中の名案は、外に出して初めて評価されます。完成度6割でも、まず誰かに話してみましょう。'],
  ESTP: ['🐆', '考える前に動いてるチーター', '「とりあえずやってみよう」の「とりあえず」が、誰よりも早い人です。みんなが会議で悩んでいる10分の間に、もう現場で試しています。リスクを前にしても足がすくまない度胸があり、ピンチの場面ほど目が輝くタイプ。細かい計画は苦手でも、走りながら答えを見つける嗅覚は天下一品で、その勢いが周りの空気ごと動かしていきます。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。触れたものを明るく燃え上がらせる、情熱と行動力の属性です。ラッキーカラーは朱色。【意識するといいこと】全力疾走の合間に、来た道を振り返る5分を挟んでみてください。次のダッシュが、もっと速くなります。'],
  ESFP: ['🐬', 'その場のノリを生きるイルカ', 'あなたが部屋に入ると、空気の温度が2度くらい上がります。初対面の壁を感じさせない天性の社交性があり、みんなの笑顔を見ることが自分のエネルギー源。「先のことは先の自分がなんとかする」と、今この瞬間を全力で味わうのが信条です。落ち込んでいる人をいつの間にか笑わせている——その才能は、努力で身につくものではありません。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。どんな場所にもすっと馴染み、自在に流れていく属性です。ラッキーカラーは藍色。【意識するといいこと】楽しかった日の夜に、3分だけ振り返りを。「楽しかった」が「次に活きる経験」に変わります。'],
  ENFP: ['🐶', '今日も新しい沼にハマる子犬', '昨日ハマっていたものと今日ハマっているものが違う、好奇心の申し子です。新しい人・新しいアイデアと出会うたびに心のしっぽが千切れそうに振れて、思い立った時にはもう動いています。その熱量は伝染力が強く、気づけば周りを巻き込んでお祭りが始まっていることも。やりたいことリストは常に渋滞中ですが、その渋滞こそがあなたらしさでもあります。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。四方八方に枝を伸ばして、ぐんぐん育っていく属性です。ラッキーカラーは若草色。【意識するといいこと】沼は同時に3つまで、と決めてみましょう。絞った分だけ、一つひとつが成果に変わりやすくなります。'],
  ENTP: ['🦊', 'あえて反対意見を言いたいキツネ', '全員が頷いている会議ほど、「本当にそうかな?」と言いたくなる人です。逆張りがしたいわけではなく、別の角度から見ないと気が済まない知的好奇心の持ち主。頭の回転が速く、議論はスポーツ、退屈は天敵です。話を煙に巻いているようで、実は相手に新しい視点をプレゼントしていることも多く、あなたと話した後は世界が少し違って見えます。占いの視点では、あなたは五行でいう「水」の気質を持つタイプ。決まった形を持たず、自在に発想を変えていく属性です。ラッキーカラーは藍色。【意識するといいこと】論破の快感より、相手の「なるほど」を集めることを意識すると、あなたのアイデアは倍の速さで実現します。'],
  ESTJ: ['🦁', '仕切りたがりの生まれ変わりライオン', 'グループができると、3分後には自然と仕切っている人です。曖昧なままふわふわ進む状況が苦手で、役割と締め切りが決まって初めて安心できるタイプ。決めたルールは自分が一番きっちり守り、頼られたら全力で応える責任感の塊です。その背中を見て、周りは安心してついていきます。ただし、その几帳面さが「圧」として届いてしまう日もあるかもしれません。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。先頭で燃えて、隊列全体を照らしていく属性です。ラッキーカラーは朱色。【意識するといいこと】正しい段取りの前に、まず相手の言い分を最後まで聞く。それだけでチームの推進力が変わります。'],
  ESFJ: ['🐕‍🦺', '頼まれると断れないゴールデン', '飲み会の席順から友人の悩み事まで、気づけば全部気にかけている人です。場の空気の小さな変化を見逃さず、輪から外れかけた人をさりげなく戻す名人。揉め事が起きると、頼まれてもいないのに仲裁役を引き受けてしまいます。「ありがとう」の一言で今日一日が報われる、そんな温かさの持ち主で、あなたの周りにはいつも自然と人が集まっています。占いの視点では、あなたは五行でいう「土」の気質を持つタイプ。人と人の間を耕して、調和を実らせていく属性です。ラッキーカラーは黄土色。【意識するといいこと】たまには「私はこうしたい」を一番最初に言ってみてください。あなたの希望は、後回しにしなくていいものです。'],
  ENFJ: ['🦢', 'みんなの応援団長・白鳥', '人の長所を見つける速さなら、プロのスカウトにも負けないかもしれません。「あなたならできるよ」が口癖で、実際にその言葉に背中を押された人が何人もいるはずです。共感力が高く、場の空気を柔らかく整える天性の調整力があります。ただし応援団長は、自分のことを応援するのを忘れがち。気づけば自分の休憩時間だけが消えていることも。占いの視点では、あなたは五行でいう「木」の気質を持つタイプ。一本の木ではなく、周りの木々と一緒に森ごと育っていく属性です。ラッキーカラーは若草色。【意識するといいこと】誰かを励ましたその言葉を、今日は一度、鏡の中の自分にもかけてあげてください。'],
  ENTJ: ['🦅', 'もう次のこと考えてる鷲', '目標が決まった瞬間、頭の中には最短ルートの地図が完成しています。決断は速く、行動はもっと速く、周りが1合目で息を整えている間に5合目から手を振っているタイプ。曖昧さと非効率が何より苦手で、「で、結論は?」が思わず口をつくことも。その推進力は組織を動かす本物のエンジンですが、速度の違いに戸惑う人がいるのも事実です。占いの視点では、あなたは五行でいう「火」の気質を持つタイプ。大きな目標を燃料にして、勢いよく燃え上がる属性です。ラッキーカラーは朱色。【意識するといいこと】ゴールへの最短距離より、全員でゴールする道を選ぶ日があってもいい。回り道が、チームを強くします。'],
};

const ANIMAL_MAP_EN = {
  ISTJ: ['🐢', 'The Turtle Who Triple-Checks the Bridge', '"It\'ll probably be fine" is, to you, the least trustworthy sentence in the language. You check, then check again — which is exactly why people hand you the things that truly cannot go wrong. You keep promises the way other people keep souvenirs: carefully, and for years. You\'ll take a proven method over a shiny new one every time, not out of timidity but because you know what actually matters. Your quiet, one-step-a-day consistency is a fortune most people never manage to build. In Five Element terms, you carry the energy of Earth — the solid ground everyone else builds on. Lucky color: ochre. Tip: cross a bridge without tapping it first once in a while — the view on the other side might surprise you.'],
  ISFJ: ['🐕', 'The Golden Retriever Who\'s Already Got You Covered', 'You notice someone needs help about half a second before they do — and you\'re usually already moving. You remember birthdays, coffee orders, and offhand comments from months ago, all without being asked. The catch: "no" is the hardest word in your vocabulary, and your calendar quietly fills up with other people\'s errands. Still, when trouble hits, yours is the first name anyone thinks of — because your kindness is the real thing. Your element is Earth — the quiet, dependable ground others stand on. Lucky color: ochre. Tip: saying "not today" won\'t cost you anyone worth keeping. Practice voicing what you want, one small request at a time.'],
  INFJ: ['🦉', 'The Owl Who Sees Right Through You', 'You can sit through an entire meeting without a word and still walk out knowing exactly what everyone in the room was really thinking. You\'d trade ten small talks for one honest conversation, and you keep your circle small on purpose. People call you mysterious because your feelings live far below the surface — but down there, a fiercely held ideal is burning steadily. Once you believe in something, your quiet resolve barely wavers. Your element is Water — moving deep and silent, taking the shape each moment requires. Lucky color: indigo. Tip: before a thought finishes its hundredth lap in your head, say it out loud to someone you trust — it gets lighter the moment it leaves.'],
  INTJ: ['🐺', 'The Wolf Who\'s Already Won the Argument in Their Head', 'Even mid-small-talk, there\'s a simulation running three moves ahead in your head. Almost nothing you do is "just because" — there\'s a strategy behind it, whether or not anyone asked. Once you\'ve decided, outside noise doesn\'t move you, though the "ask for help" feature seems to have shipped disabled. Show you an inefficient process and you\'ll be redesigning it before anyone requested a fix. Your element is Metal — the blade that trims away everything but the essential. Lucky color: platinum. Tip: close the master plan occasionally and hand something over whole — the unplanned is where you\'ll find what your plan couldn\'t reach.'],
  ISTP: ['🐱', 'The Cat With the Mood-Dependent \'Go\' Switch', 'You don\'t read the manual. You pick the thing up. That\'s how you learn — hands first, theory later — and when something genuinely hooks you, your focus gets almost unsettling. Nobody knows where that switch is, possibly including you. You slip quietly out of range the moment anything feels like a leash, yet when real trouble hits, you\'re suddenly the calmest, most useful person in the room. Your element is Metal — cutting cleanly through the noise to what actually matters. Lucky color: platinum. Tip: "they\'ll figure out how I feel" — they usually don\'t. Say it out loud occasionally; life gets easier.'],
  ISFP: ['🐰', 'The Rabbit Quietly Feeling Everything', 'You may not say much, but you\'re feeling more than almost anyone around you — the color of a sunset, one line of a song, a small kindness others walk right past. You keep your opinions soft, but your inner sense of what\'s beautiful is precise and non-negotiable, and your "I just like it" turns out to be right remarkably often. You open up slowly; once someone\'s in, they\'re in for good. Your element is Wood — quietly growing a world of your own, in its own season. Lucky color: moss green. Tip: say the "I just like it" out loud more often — your taste is worth about three times what you think it is.'],
  INFP: ['🦌', 'The Deer Who\'s Easily Hurt but Never Bends', 'Where others carry a calculator, you carry a compass — "does this sit right with me?" beats "what do I gain?" every single time. Trends and majority votes rarely move you; the values at your core are simply not for sale. You cry real tears at stories and feel other people\'s pain as if it were your own. Yes, that means you bruise easily — but it also means you feel more deeply than almost anyone, and the warmth you give someone you trust runs quiet and hot. Your element is Wood — growing patiently toward the light of an ideal. Lucky color: moss green. Tip: on days the ideal feels far away, count the distance you\'ve covered, not the distance left. Small steps are still steps.'],
  INTP: ['🦝', 'The Raccoon Who Suddenly Starts Talking Fast', 'You idle along in low-power mode — until your topic comes up, and suddenly you\'re talking twice as fast. Once "but why does it work that way?" gets its hooks in, you\'ll follow it past midnight without noticing. You care about mechanisms more than conventions, and you have a gift for casually pointing out the one contradiction nobody in the room had spotted. Under the easygoing surface, the engine never actually stops. Your element is Metal — taking things apart to extract the core. Lucky color: platinum. Tip: brilliant ideas only count once they leave your head. Share at sixty percent done — it\'s enough.'],
  ESTP: ['🐆', 'The Cheetah Who Moves Before Thinking', 'Your "let\'s just try it" arrives faster than anyone else\'s. While the meeting is still debating, you\'ve already tested it in the field. Risk doesn\'t freeze you — if anything, a crisis is when your eyes light up. Detailed plans were never your style, but your instinct for finding answers mid-sprint is world-class, and your momentum has a way of dragging the whole room forward with it. Your element is Fire — passion that sets everything around it alight. Lucky color: vermillion. Tip: slip five minutes of looking back between sprints — it makes the next dash even faster.'],
  ESFP: ['🐬', 'The Dolphin Riding the Vibe of the Room', 'When you walk into a room, the temperature rises a couple of degrees. Strangers don\'t stay strangers around you for long, and other people\'s smiles are quite literally your fuel. Your motto: future-you can handle the future — present-you is busy enjoying right now. You have a knack for making someone laugh before they\'ve even finished being sad, and that is not a common gift. Your element is Water — flowing easily into any space and belonging there instantly. Lucky color: indigo. Tip: spend three minutes at night replaying the good days — that\'s how "that was fun" becomes "that made me better."'],
  ENFP: ['🐶', 'The Puppy Falling Down a New Rabbit Hole Today', 'Yesterday\'s obsession and today\'s obsession are rarely the same one — you\'re curiosity in human form. Every new person and new idea sets your inner tail wagging, and by the time you\'ve finished thinking "maybe I should," you already have. Your enthusiasm is contagious enough to start a festival nobody planned. Your list of things to try is permanently over capacity — but honestly, that traffic jam is very you. Your element is Wood — branching out in every direction at once. Lucky color: moss green. Tip: cap yourself at three rabbit holes at a time — narrowing the field is how the wins start landing.'],
  ENTP: ['🦊', 'The Fox Who Just Has to Play Devil\'s Advocate', 'The more unanimously a room is nodding, the more you want to ask "but is that actually true?" It\'s not contrarianism — you just physically cannot leave an angle unexplored. Debate is your sport; boredom is your only real enemy. It might look like you\'re running circles around people, but half the time you\'re handing them a brand-new viewpoint for free — the world looks a little different after a conversation with you. Your element is Water — formless, endlessly reshaping ideas to fit the moment. Lucky color: indigo. Tip: collect "oh, I see!" moments instead of victories — your ideas will get built twice as fast.'],
  ESTJ: ['🦁', 'The Lion Born to Run the Show', 'Put you in any group, and within three minutes you\'re somehow running it. Vague, drifting situations genuinely bother you — you only relax once roles and deadlines exist. Whatever rules you set, you follow harder than anyone, and when someone counts on you, you deliver at full power. People follow that steady back of yours with real confidence — though on some days, your thoroughness can read as pressure. Your element is Fire — burning at the front, lighting the way for the whole column. Lucky color: vermillion. Tip: before perfecting the plan, hear people out to the very end — that alone changes how fast the team moves.'],
  ESFJ: ['🐕‍🦺', 'The Golden Who Can Never Say No', 'From the seating chart at dinner to a friend\'s unspoken worry, you\'re somehow tracking all of it. You catch the smallest shift in a room\'s mood, and if someone\'s drifting toward the edge of the circle, you fold them back in so smoothly nobody notices. When conflict breaks out, you\'re mediating before anyone asks. A single "thank you" can redeem your whole day — and that warmth is exactly why people keep gathering around you. Your element is Earth — tilling the ground between people so harmony can grow. Lucky color: ochre. Tip: try saying "here\'s what I want" first, just sometimes. Your wishes don\'t belong at the back of the line.'],
  ENFJ: ['🦢', 'Everyone\'s Head Cheerleader, the Swan', 'You spot people\'s strengths faster than a professional scout. "You\'ve got this" is practically your catchphrase — and there are real people out there who changed course because you said it and meant it. Your empathy runs deep, and you soften the air of any room you\'re in. But head cheerleaders are famously bad at cheering for themselves, and somehow it\'s always your own break time that vanishes first. Your element is Wood — growing as a forest, never just a single tree. Lucky color: moss green. Tip: the encouragement you gave someone today — turn around and say it once to the mirror, too.'],
  ENTJ: ['🦅', 'The Eagle Already Three Moves Ahead', 'The moment a goal exists, the shortest-route map is already drawn in your head. You decide fast and move faster — while everyone else is catching their breath at base camp, you\'re waving from halfway up the mountain. Ambiguity and inefficiency genuinely irritate you, and "so, what\'s the conclusion?" escapes you more often than you intend. That drive is a real engine that moves whole organizations — even if not everyone travels at your speed. Your element is Fire — burning hot on the fuel of big ambitions. Lucky color: vermillion. Tip: some days, choose the route where everyone reaches the summit together — the detour is what makes the team strong.'],
};

const WEATHER_MAP = {
  ISTJ: ['☀️', '絶対に崩れない快晴', '恋の駆け引きやサプライズより、「いつも通り」を一緒に積み重ねられることが最高の愛情表現だと知っている人です。毎日の「おはよう」が同じ時間に届く——その安心感こそ、あなたの誠実さの形。一度好きになったら脇目もふらない一途さは折り紙付きですが、「好き」を口にするのはどうにも照れくさく、行動で示す派です。恋愛運の面では、「土」のエネルギーが、時間をかけた分だけ固くなる絆を暗示しています。開運アクションは、公園など土や緑に近い場所でふたりの時間を過ごすこと。【意識するといいこと】伝わっているはずの気持ちも、年に数回は言葉に。あなたの「好き」は、相手にとって何よりのお守りになります。'],
  ISFJ: ['🌤️', '気づいたら側にいる陽だまり', '「そういえば前に言ってたあれ」を、ちゃんと覚えていて差し出せる人です。大げさな告白より、寒い日にそっと手渡す温かい飲み物のような愛し方をします。相手の喜ぶ顔が自分へのご褒美になるタイプですが、その優しさゆえに、自分の疲れや小さな不満はつい後回しにしがちです。恋愛運の面では、「土」のエネルギーが、じっくり育てた信頼ほど強くなる絆を暗示しています。開運アクションは、公園など土や緑に近い場所で過ごす時間を増やすこと。【意識するといいこと】尽くし切って空っぽになる前に、「実はこうしてほしい」を伝えてみて。あなたの本音は、相手にとって迷惑ではなく喜びです。'],
  INFJ: ['🌫️', '一筋縄ではいかない霧', '出会ってすぐに距離が縮まるタイプではありません。でもそれは壁ではなく、あなたの愛が浅瀬ではなく深海仕様だから。世間話だけの恋人ごっこには興味がなく、心の奥まで潜り合える相手を静かに探しています。相手の声のトーンが昨日と少し違う——そんな変化に気づく繊細なセンサーの持ち主です。一度心を開いた後の一途さは、霧が晴れた後の景色のように鮮やかです。恋愛運の面では、「水」のエネルギーが、相手に寄り添って形を変えるしなやかさを暗示しています。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】本音を明かすタイミングを、自分が思うより一歩だけ早めに。その一歩が、関係を一気に深めます。'],
  INTJ: ['🌀', '静かなのに目が離せない台風の目', '恋に落ちても取り乱さない、けれど内側では静かに本気の炎が灯っている人です。「なんとなく付き合う」という選択肢がそもそも存在せず、好きになった相手とは何年も先を見据えて向き合います。駆け引きは非効率なので却下。感情表現は少なめでも、「この人だ」と決めた後のまっすぐさは、周りが驚くほどです。恋愛運の面では、「金」のエネルギーが、自分を曲げない恋ほど良縁につながることを暗示しています。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】頭の中の愛情は、相手には見えません。週に一度でいいので、言葉に翻訳して手渡しましょう。'],
  ISTP: ['🍃', '捕まえようとすると逃げるそよ風', 'ベタベタは苦手、でも冷たいわけではない。ちょうどいい距離で隣にいてくれる人が一番落ち着く、風のような恋をする人です。「今日何してた?」の報告義務があるより、お互い好きに過ごして夜に合流するくらいの関係が理想。言葉のプレゼントは少なめですが、相手が本当に困った時、一番に駆けつけるのはたぶんあなたです。恋愛運の面では、「金」のエネルギーが、自分のペースを守る恋ほど長続きすることを暗示しています。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】風は、待っていても捕まえられません。月に一度は、自分から会いに行く風になってみましょう。'],
  ISFP: ['🌦️', 'そっと降ってそっと止む小雨', '大声の「好き」より、傘をそっと相手に傾けるような「好き」を選ぶ人です。相手の沈黙の理由に気づいて、何も聞かずに隣にいられる——静かな寄り添いの名手です。衝突が苦手で、言いたいことを雨音と一緒に流してしまうこともありますが、その優しさは確実に相手の心に染み込んでいます。恋愛運の面では、「木」のエネルギーが、ゆっくり水をやるほど深く根を張る恋を暗示しています。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】飲み込んだ言葉は、消えるのではなく溜まっていきます。小さな不満ほど、小雨のうちに伝えましょう。'],
  INFP: ['🌇', '理由もなく泣きたくなる夕焼け', '「この人と出会ったのは偶然じゃない気がする」——そんな物語を本気で信じられる、生粋のロマンチストです。何気ない瞬間に意味を見つけて、ひとりで胸をいっぱいにしていることも。深く想う分だけ、期待と現実の落差に人知れず傷つく夜もありますが、心を開いた相手に注ぐ愛情の深さは本物です。恋愛運の面では、「木」のエネルギーが、焦らず育てるほど美しく咲く恋を暗示しています。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】理想の脚本を一度閉じて、目の前の相手のアドリブを楽しんでみて。現実の方が、良いシーンをくれることもあります。'],
  INTP: ['❄️', '触れるとちょっと冷たい霜', '「恋愛に興味なさそう」と言われがちですが、実際は観察と考察が済むまで動かないだけの人です。好きな人ができると、まず相手という謎を解きたくなるタイプ。感情表現は最小限でも、信頼した相手の前でだけ見せる無防備な素顔には、霜が朝日に溶ける瞬間のような特別さがあります。恋愛運の面では、「金」のエネルギーが、無理に自分を演出しない恋ほど実ることを暗示しています。開運アクションは、シルバーかゴールドのアクセサリーを身につけること。【意識するといいこと】分析結果が出る前に、「会いたい」の一言を。恋には、正確さより速さが効く場面が結構あります。'],
  ESTP: ['⛈️', '来る時は来る、夕立', '恋の始まりはいつも突然。「いいな」と思った瞬間には、もう連絡先を聞いている直球勝負の人です。駆け引きのターン制バトルは性に合わず、想いはその日のうちに伝えたい派。燃え上がりが早い分、終わった恋をいつまでも引きずらない、カラッとした切り替えの良さも持っています。恋愛運の面では、「火」のエネルギーが、一気に距離を縮める情熱的な恋を暗示しています。ただし着火の速さには少し注意を。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】あなたの時速に、相手はまだ助走中かもしれません。ときどき速度計を、相手に合わせてみましょう。'],
  ESFP: ['🏖️', '今日も絶好調な真夏の青空', 'デートの完璧な計画表より、「今日楽しかったね」の回数を増やしたい人です。一緒にいるだけで相手の悩みが小さく見えてくる、太陽みたいな存在感があります。気持ちはストレートに伝える派で、腹の探り合いとは無縁。将来の心配より今日の思い出づくりを優先しがちですが、その明るさこそが関係を前に進める推進力です。恋愛運の面では、「水」のエネルギーが、相手に合わせて自在に形を変える柔軟さを暗示しています。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】晴れの日だけでなく、相手の曇りの日にも隣にいること。それだけで、信頼は倍になります。'],
  ENFP: ['🌦️', '読めない、にわか雨', '昨日は水族館、今日は急に星を見に行きたくなる。予測不能で、だからこそ一緒にいて絶対に飽きない人です。好きになったら気持ちは全力でぶつける直球派で、マンネリの気配には人一倍敏感。関係の中に常に小さな冒険を仕込みます。ただ、ときめきの雨は通り過ぎるのも早いことがあり、自分でも戸惑うことも。恋愛運の面では、「木」のエネルギーが、時間をかけて育てる恋ほど深く根付くことを暗示しています。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】ときめきが落ち着いた後に残るものが、本物の恋です。「これからも一緒にいたい」を、言葉にして渡しましょう。'],
  ENTP: ['🌬️', '急に空気を変える春一番', 'デート中の会話こそが一番の遊園地、という人です。気の利いた返しが返ってくるやり取りに恋のときめきを感じ、予定調和だけの関係はすぐ退屈してしまいます。素直に「好き」と言うより、からかいや軽口に愛情を包んで渡しがちで、それがうまく伝わらずに損をすることも。一緒にいると景色が変わり続ける、そんな刺激をくれる存在です。恋愛運の面では、「水」のエネルギーが、発想を自在に変えられる柔軟さが良縁を呼ぶことを暗示しています。開運アクションは、水辺で過ごす時間を増やすこと。【意識するといいこと】10回の軽口に1回、まっすぐな言葉を混ぜてみて。そのギャップが、一番効きます。'],
  ESTJ: ['☀️', '頼れる、晴天続き', '「この人といれば大丈夫」と思わせる安定感が、あなたの最大の魅力です。記念日や将来設計はきっちり決めたい派で、曖昧な関係をずるずる続けるのは苦手。一度パートナーと決めた相手には、口約束ではなく行動と実績で誠意を示し続けます。ロマンチックな台詞は少し不器用でも、その頼もしさが何よりの愛情表現になっています。恋愛運の面では、「火」のエネルギーが、真剣な想いほど熱く燃える恋を暗示しています。ただし加速のしすぎには注意を。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】計画にない寄り道こそ、デートのごちそうです。たまには予定表を白紙にして出かけてみましょう。'],
  ESFJ: ['🌳', '気づけば癒される木漏れ日', '相手の「ちょっと疲れてる」を、本人より先に見抜く人です。記念日はもちろん、髪型の変化も新しい靴も見逃さず、ちゃんと言葉にして伝えられる気配りの達人。パートナーとの穏やかな調和が何よりの幸せで、尽くすこと自体が喜びになっています。ただその優しさは、ときどき自分自身を置き去りにします。恋愛運の面では、「土」のエネルギーが、信頼を重ねるほど揺るがなくなる絆を暗示しています。開運アクションは、公園など土や緑に近い場所で過ごす時間を増やすこと。【意識するといいこと】支える側を一日お休みして、思いきり甘える日を作りましょう。それもまた、相手への信頼の示し方です。'],
  ENFJ: ['🌈', 'みんなが見上げる虹', '相手の夢を、本人以上に信じられる人です。「あなたならできる」と本気で言えるその愛し方は、恋人にとって何よりの追い風になります。相手の小さな表情の変化も見逃さない共感力があり、自然と関係をリードしていくタイプ。ただ、相手の幸せを優先しすぎて、自分の願いがどこかへ行ってしまうことも。恋愛運の面では、「木」のエネルギーが、ふたりで一緒に育っていく恋を暗示しています。開運アクションは、観葉植物をそばに置くこと。【意識するといいこと】いつも相手に向けている「あなたはどうしたい?」という優しい問いを、たまには自分自身にも向けてください。'],
  ENTJ: ['⛅', '存在感だけで空を占める入道雲', '付き合う前から「この関係をどこへ導くか」を考えている、恋愛にも本気度全開の人です。将来の話から逃げないその姿勢には、遊びの恋には出せない迫力があります。頼りがいは抜群ですが、デートの段取りまで最適化してしまい、「効率いいけど…」と思われる日もあるかもしれません。恋愛運の面では、「火」のエネルギーが、真剣な想いを燃料に燃え上がる恋を暗示しています。ただし火力の上げすぎには注意を。開運アクションは、赤系のアイテムをひとつ身につけること。【意識するといいこと】目的のない散歩、結論のないおしゃべり。その「無駄」こそが、ふたりの一番の栄養です。'],
};

const WEATHER_MAP_EN = {
  ISTJ: ['☀️', 'The Clear Sky That Never Clouds Over', 'To you, the greatest romantic gesture isn\'t a surprise — it\'s showing up, the same way, every single day. A good-morning text that arrives at the same time is your love language, and once you fall for someone, your loyalty is beyond question. You\'re just a bit shy about saying the words, so your actions do the talking. Your Earth energy points to a bond that hardens like well-packed ground — the longer you build, the stronger it holds. Lucky action: spend more time together somewhere close to nature, like a park. Tip: even feelings that "should be obvious" deserve saying out loud a few times a year — your spoken "I love you" is a keepsake your partner will carry.'],
  ISFJ: ['🌤️', 'The Sunbeam You Didn\'t Notice Warming You', '"You mentioned this once, so I got it for you" — that\'s your kind of love. Not grand declarations, but a warm drink pressed into cold hands. Your partner\'s happy face is genuinely your reward, though that same sweetness means your own tiredness always gets filed under "later." Your Earth energy points to trust that grows sturdier the longer you tend it. Lucky action: spend more time somewhere close to nature, like a park. Tip: before you pour yourself completely empty, try saying "actually, here\'s what I\'d like." Your honest wishes are a gift to your partner, not a burden.'],
  INFJ: ['🌫️', 'The Fog That\'s Hard to Pin Down', 'You\'re not quick to close the distance — but that\'s not a wall. It\'s that your love is built for deep water, not the shallows. Playing at romance doesn\'t interest you; you\'re quietly searching for someone who can dive all the way down with you. You notice when their voice sounds one shade different from yesterday. And once you finally open up, your devotion is as vivid as the view after fog lifts. Your Water energy points to a supple love that shapes itself around the person you\'re with. Lucky action: spend more time near water. Tip: reveal your real feelings one step earlier than feels natural — that single step can deepen everything at once.'],
  INTJ: ['🌀', 'The Calm Eye of a Very Focused Storm', 'Falling in love doesn\'t make you lose your footing — but make no mistake, a serious flame is burning under all that calm. "Casually dating" was never on your menu; when you choose someone, you\'re already thinking in years. Games get rejected as inefficient. You don\'t emote much, but once you\'ve decided "this is the one," your straight-line devotion startles people. Your Metal energy suggests the less you bend yourself out of shape, the better your connections get. Lucky action: wear a piece of silver or gold jewelry. Tip: the love inside your head is invisible to your partner. Once a week, translate it into words and hand it over.'],
  ISTP: ['🍃', 'The Breeze That Slips Away If You Chase It', 'Clingy isn\'t your style — but cold isn\'t either. You love like a breeze: closest to the person who lets you come and go freely. Your ideal isn\'t hourly check-ins; it\'s two people doing their own thing and drifting back together at night. You don\'t hand out many words, but when your partner is truly in trouble, you\'re the first one there. Your Metal energy suggests a love that lasts longest when you keep your own rhythm. Lucky action: wear a piece of silver or gold jewelry. Tip: a breeze can\'t be caught by waiting. Once a month, be the one who blows their way first.'],
  ISFP: ['🌦️', 'The Soft Rain That Falls and Fades Quietly', 'You\'d rather tilt the umbrella toward someone than shout "I love you" across the street. You notice the reason behind their silence and sit beside it without asking questions — quiet companionship is your particular genius. You dislike conflict enough to let your own words wash away with the rain sometimes, but your gentleness soaks in deeper than you realize. Your Wood energy points to a love that roots deepest when watered slowly. Lucky action: keep a houseplant nearby. Tip: swallowed words don\'t disappear — they accumulate. Voice the small frustrations while they\'re still drizzle, not storm.'],
  INFP: ['🌇', 'The Sunset That Makes You Want to Cry for No Reason', '"Meeting this person doesn\'t feel like a coincidence" — you\'re the kind of romantic who can genuinely believe that. You find meaning in ordinary moments and quietly let them fill you up. Loving deeply means the gap between hope and reality can sting on some nights, but the devotion you give someone you\'ve opened up to is absolutely real. Your Wood energy points to a love that blooms most beautifully when it isn\'t rushed. Lucky action: keep a houseplant nearby. Tip: set the ideal script aside and enjoy your partner\'s ad-libs — reality sometimes writes better scenes than you would.'],
  INTP: ['❄️', 'The Frost That\'s a Little Cold to the Touch', 'People assume you\'re not interested in romance — actually, you just don\'t move until the observation phase is complete. When you like someone, your first instinct is to solve them like a puzzle. You keep expression to a minimum, but the unguarded face you show only to someone you trust is as rare as frost melting in the morning sun. Your Metal energy suggests love goes best when you don\'t perform a version of yourself. Lucky action: wear a piece of silver or gold jewelry. Tip: send "I want to see you" before the analysis is finished — in love, speed beats accuracy surprisingly often.'],
  ESTP: ['⛈️', 'The Sudden Downpour That Comes When It Comes', 'Your romances start like summer storms — by the time you\'ve finished thinking "I like them," you\'ve already asked for their number. Turn-based courtship games aren\'t for you; you\'d rather say it today. You catch fire fast, and you don\'t sit in the ashes either — when something ends, you genuinely move on. Your Fire energy points to a passion that closes distance in a single burst — just watch how quickly things ignite. Lucky action: wear something red. Tip: you\'re doing highway speeds while your partner may still be merging. Check your speedometer against theirs now and then.'],
  ESFP: ['🏖️', 'The Blue Summer Sky, Always in Top Form', 'You\'d rather rack up "today was so fun" moments than perfect the date itinerary. Just being next to you makes people\'s worries look smaller — you have sunshine-grade presence. You say what you feel, straight out, with zero appetite for mind games. Tomorrow\'s worries lose to today\'s memories, and honestly, that brightness is what keeps the relationship moving forward. Your Water energy points to a flexibility that flows to fit whoever you\'re with — it\'s what draws good matches in. Lucky action: spend more time near water. Tip: be there on their cloudy days, not just the sunny ones — that alone doubles the trust.'],
  ENFP: ['🌦️', 'The Unpredictable Passing Shower', 'Aquarium yesterday, suddenly stargazing tonight — you\'re unpredictable in the way that makes a person impossible to be bored with. When you fall, you throw your whole heart in, and you keep planting little adventures inside the relationship to keep it alive. The catch: your showers of excitement can pass as quickly as they arrive, which sometimes surprises even you. Your Wood energy points to a love that roots deepest when grown slowly. Lucky action: keep a houseplant nearby. Tip: what remains after the flutter settles — that\'s the real thing. Say "I want this to last" out loud, and mean it.'],
  ENTP: ['🌬️', 'The First Spring Wind That Changes the Whole Mood', 'For you, the conversation is the best ride at the amusement park. A sharp comeback gives you actual butterflies, and a relationship running on autopilot loses you fast. You tend to wrap your affection in teasing and jokes rather than plain words — and sometimes it doesn\'t survive the wrapping. Still, life next to you keeps changing scenery, and that\'s a rare gift. Your Water energy suggests your shape-shifting mind is exactly what attracts the right person. Lucky action: spend more time near water. Tip: for every ten jokes, slip in one completely sincere line. That gap hits harder than anything.'],
  ESTJ: ['☀️', 'The Reliable Stretch of Clear Skies', '"With this person, I\'ll be okay" — that\'s the feeling you give people, and it\'s your greatest charm. You like anniversaries scheduled and the future discussed properly; letting a vague relationship drift just isn\'t in you. Once you\'ve committed, you prove your sincerity through action and track record, not pretty promises. You may fumble the romantic lines, but that dependability speaks louder anyway. Your Fire energy points to a love that burns hotter the more serious you are — mind the acceleration. Lucky action: wear something red. Tip: the unplanned detour is the best part of the trip. Leave the itinerary blank once in a while and just go.'],
  ESFJ: ['🌳', 'The Dappled Sunlight You Didn\'t Know You Needed', 'You spot your partner\'s "I\'m a bit worn out" before they\'ve noticed it themselves. Anniversaries, a new haircut, new shoes — nothing slips past you, and you actually say the kind words out loud. Gentle harmony with your partner is your happiness, and giving is genuinely its own joy for you — though that kindness sometimes leaves you yourself behind. Your Earth energy points to a bond that grows unshakable as trust piles up. Lucky action: spend more time somewhere close to nature, like a park. Tip: take one full day off from being the supporter and let yourself be spoiled — that, too, is a way of trusting them.'],
  ENFJ: ['🌈', 'The Rainbow Everyone Looks Up At', 'You can believe in your partner\'s dreams harder than they do. Saying "you can do this" and fully meaning it — that\'s a tailwind money can\'t buy. You read the smallest shifts in their expression and naturally end up guiding the relationship. The risk: their happiness comes first so often that your own wishes quietly wander off somewhere. Your Wood energy points to a love where both of you grow, together, side by side. Lucky action: keep a houseplant nearby. Tip: that kind question you always ask them — "what do you want?" — turn it on yourself once in a while.'],
  ENTJ: ['⛅', 'The Towering Cloud That Owns the Whole Sky', 'Even before things are official, you\'re already thinking about where this relationship is headed — you bring full commitment to love, same as everything else. You don\'t dodge the big conversations, and that seriousness has a gravity casual romance can\'t fake. You\'re supremely dependable, though you have been known to optimize a date down to the minute. Your Fire energy points to a love that burns on the fuel of real intention — just don\'t crank the heat too high. Lucky action: wear something red. Tip: a walk with no destination, a chat with no conclusion — that "wasted" time is the best nourishment a couple can get.'],
};

const VEHICLE_MAP = {
  ISTJ: ['🚃', '1分も遅れない電車', 'あなたに任された仕事は、ダイヤ通りに、静かに、確実に届きます。手順と締め切りを守ることに安心を感じ、一度覚えた仕事の再現精度はチームでも群を抜くレベル。急な路線変更にはやや弱いものの、「あの人がやると言ったら、もう終わっている」という信頼は、どんな肩書きより強い武器です。仕事運の面では、「土」のエネルギーが、日々の積み重ねを確かな評価へ変えていく暗示。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】「前例がない」を理由に見送った提案の中に、次のダイヤ改正のヒントが眠っているかもしれません。'],
  ISFJ: ['🚌', '気づけば全員乗せてる路線バス', '新人が困っている、備品が切れかけている、あの人が今日少し元気がない——チームの「小さな異変」に一番早く気づくのがあなたです。目立つ席よりも、みんなが気持ちよく働ける状態を裏で支える役回りにやりがいを感じるタイプ。ただ、停留所を増やしすぎて自分の積載量を超えてしまいがちなのが玉に瑕です。仕事運の面では、「土」のエネルギーが、地道な支えを確かな信頼へ変えていく暗示。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】「今は乗せられません」と言う勇気も、安全運行のうち。断ることは、あなたの価値を下げません。'],
  INFJ: ['⛵', '静かに舵を切る帆船', '大声で号令をかけるわけではないのに、気づけばチームの向かう先を静かに指し示している人です。「この仕事は何のためにあるのか」という問いを常に胸に置いていて、意味を感じた仕事への集中力は、帆いっぱいに風を受けたときのそれ。人間関係の風向きにも敏感で、揉め事の気配を早めに察知します。一人で深く考える時間が、あなたの舵の精度を支えています。仕事運の面では、「水」のエネルギーが、流れを読む柔軟さでチャンスを引き寄せる暗示。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】考えを溜め込んで沈黙の航海をしないこと。途中の海図こそ、早めに仲間へ共有しましょう。'],
  INTJ: ['🛥️', '見えないところで進む潜水艦', '「進捗どうなってるの?」と思われがちですが、水面下では誰よりも深く、正確に進んでいる人です。長期計画の設計が得意で、非効率な業務フローを見ると、頼まれてもいないのに頭の中で改善案が組み上がっていきます。感情論より構造で考えるためドライに見られることもありますが、狙いを定めた目標への到達率は驚異的です。仕事運の面では、「金」のエネルギーが、決断力と実行力を研ぎ澄ます暗示。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】完成してから浮上するのではなく、ときどき潜望鏡を上げて途中経過を見せると、周りの安心感が段違いです。'],
  ISTP: ['🏍️', '状況見て即対応するバイク', '渋滞した状況の間をすり抜けて、最短ルートで現場に到着する機動力の持ち主です。マニュアルより実地、会議より現物。トラブルが起きた瞬間に一番冷静になれるタイプで、「とりあえずあの人を呼ぼう」と言われる存在です。その代わり、長い定例会議と細かすぎる進捗管理では、正直エンジンが止まりそうになります。仕事運の面では、「金」のエネルギーが、迷いのない即断即決を後押しする暗示。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】目の前の対応と並行して、月に一度は地図を広げる時間を。行き先の決まった機動力は、もっと強くなります。'],
  ISFP: ['🛶', '自分のペースを崩さないカヌー', 'スピード競争には参加しない代わりに、自分の漕ぎ方は決して崩さない人です。雑に10個こなすより、丁寧に3個仕上げたい職人肌で、成果物の細部には静かなこだわりが宿っています。競争や衝突の多い環境より、落ち着いた流れの中でこそ本来の実力が出るタイプです。仕事運の面では、「木」のエネルギーが、コツコツ育てた実績を大きな信頼へ変えていく暗示。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】丁寧な仕事は、黙っていると意外と気づかれません。「ここを工夫しました」と一言添える習慣を持ちましょう。'],
  INFP: ['🎈', '風向き任せの熱気球', '「なぜやるのか」に火が入った瞬間、誰よりも高く昇れる人です。共感力が高く、チームのぎすぎすした空気をふわりと和らげる存在でもあります。ただ、意味を感じられない作業の日は、燃料切れの気球のように高度が上がりません。そのモチベーションの波は欠陥ではなく、あなたに進むべき方角を教えてくれる風向計です。仕事運の面では、「木」のエネルギーが、じっくり積んだ努力を確かな信頼へ育てる暗示。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】気の乗らない作業の前に、「これが誰の役に立つか」を一つだけ書き出してみて。燃料が少し戻ります。'],
  INTP: ['🧪', '目的地よりエンジンが気になる実験車両', '「この業務、そもそもなぜこの手順なんですか?」——その一言で会議を止めたことがある(または止めたくてうずうずしている)人です。目的地に着くことより、エンジンの構造を理解して改良することに燃えるタイプ。単純作業の繰り返しでは性能を持て余しますが、考える余地のある難題では、誰も思いつかなかった解を持ってきます。仕事運の面では、「金」のエネルギーが、鋭い分析を実行に変える力を後押しする暗示。開運アクションは、白か金色の文房具を使うこと。【意識するといいこと】試作品は完成度6割で走らせて見せること。あなたの設計の凄さは、動いて初めて伝わります。'],
  ESTP: ['🏎️', 'アクセル全開スポーツカー', 'キックオフの号砲と同時に飛び出して、走りながらコースを覚えていく人です。企画書を磨き込む時間があるなら、まず一回試して現場の反応を見たい派。アクシデントが起きても慌てず、その場で最適な一手を打てる反射神経は、変化の激しい現場でこそ光ります。逆に、何も動かない停滞期間が一番の苦行です。仕事運の面では、「火」のエネルギーが、勢いに乗った時の爆発力を後押しする暗示。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】ピットイン(振り返り)を挟むレーサーほど速くなります。週に一度は、ラップタイムの確認を。'],
  ESFP: ['🚗', 'みんなを乗せて走るオープンカー', 'あなたがいるチームは、月曜日の空気が少しだけ軽くなります。場を明るくしながら仕事を回すムードメーカーで、接客や人と関わる仕事では特に輝くタイプ。台本のないハプニングへの対応力も抜群で、「なんとかなる」を本当になんとかしてしまいます。一方、単調なルーティンが続くと燃費がぐっと悪くなりがちです。仕事運の面では、「水」のエネルギーが、流れに合わせる柔軟さでチャンスを掴む暗示。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】ドライブの楽しさに日々の点検(地道な作業)を少し足すだけで、あなたの評価は一段上がります。'],
  ENFP: ['🪂', '気流次第で行き先が変わるグライダー', 'ブレストの場では、アイデアの上昇気流を誰よりも早く掴む人です。ゼロから何かを立ち上げる場面で最大の揚力を発揮し、その熱は周りにも伝染していきます。ただし安定飛行が続くと退屈してしまい、気づけば別の気流に乗っていることも。着地までの操縦を任せられる仲間と組むと、最強のコンビになります。仕事運の面では、「木」のエネルギーが、続けた分だけ実績が育つことを暗示しています。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】飛び立つ前に「どこに着地したら成功か」を一行だけ書いておくと、あなたの飛行は何倍も評価されます。'],
  ENTP: ['🏁', 'コース取りで語りたいレーシングカート', '「そのやり方、本当にベストですか?」とコース取りに一石を投じるのが得意な人です。前例をなぞるだけの仕事より、頭を使う課題解決レースでこそ本領発揮。議論の場では空気を活性化させるエンジン役で、あなたの一言から新しい企画が走り出すことも珍しくありません。ただし、興味を失った瞬間の減速も早めです。仕事運の面では、「水」のエネルギーが、状況を読む柔軟さでチャンスを引き寄せる暗示。開運アクションは、こまめな水分補給を意識すること。【意識するといいこと】提案したアイデアは、最後の一周まで自分で走り切ること。完走の実績が、次の発言力になります。'],
  ESTJ: ['🚄', '遅延を許さない新幹線', '定刻に発車し、定刻に着く。あなたの関わる仕事には、そういう安心感があります。計画立案から進捗管理まで、遅れの芽を先回りで摘んでいく実務能力はチーム随一。責任感が強く、任された範囲は必ず走り切るため、リーダーやマネジメントの役割で最も輝きます。逆に、曖昧な指示と行き当たりばったりの進行は、あなたにとって最大のストレス源です。仕事運の面では、「火」のエネルギーが、勢いに乗った時の推進力を後押しする暗示。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】ダイヤ通りの運行と同じくらい、乗っている人の乗り心地にも目を向けると、チームはもっと速くなります。'],
  ESFJ: ['🚙', '全員のシートベルトを確認するファミリーカー', '出発前に全員のシートベルトを確認するように、チームの一人ひとりの状態へ自然と目が行き届く人です。関係者の間を丁寧につないで物事を前へ進める調整力は、目立たないけれど組織の生命線。頼まれた仕事を途中で放り出さない誠実さがあり、「ありがとう」の一言が何よりのガソリンになるタイプです。仕事運の面では、「土」のエネルギーが、積み重ねた気配りを確かな評価へ変えていく暗示。開運アクションは、デスク周りを整理整頓すること。【意識するといいこと】調整役に徹するだけでなく、会議で自分の意見を最初に言う日を、月に一度つくってみましょう。'],
  ENFJ: ['🚍', '気づけば全員案内してる観光バス', 'メンバーの得意なことを見つけて、光の当たる席へ案内するのが上手な人です。後輩の成長を自分の成果のように喜べるタイプで、あなたの声かけひとつでチームのモチベーションは目に見えて変わります。ただ、全員のケアに気を配っているうちに、自分の座席だけ荷物置き場になっていることも。仕事運の面では、「木」のエネルギーが、育てた信頼を大きな実りへ変えていく暗示。開運アクションは、デスクに小さな観葉植物を置くこと。【意識するといいこと】メンバーの成果と同じ熱量で、自分の成果も案内すること。あなたの働きにも、ガイドされる価値があります。'],
  ENTJ: ['🚢', '艦隊を率いるフラッグシップ', '困難なプロジェクトほどエンジンの回転数が上がる、生粋の指揮官です。全体を見渡して針路を決め、大胆な決断も迷いなく下せるため、停滞した組織に配属されると空気が一変します。効率と成果への要求水準は高く、それは周りだけでなく自分自身にも同じだけ向けられています。仕事運の面では、「火」のエネルギーが、大きな目標への推進力を燃やす暗示。開運アクションは、朝日を浴びてから一日を始めること。【意識するといいこと】旗艦の速度に、全艦が追いつけるとは限りません。ときどき後方の艦影を確認すると、艦隊全体がもっと強くなります。'],
};

const VEHICLE_MAP_EN = {
  ISTJ: ['🚃', 'The Train That\'s Never a Minute Late', 'Work handed to you arrives quietly, precisely, and exactly on schedule. You find real comfort in procedure and deadlines, and once you\'ve learned a task, your consistency is unmatched on the team. Sudden route changes throw you slightly, but "if they said they\'d do it, it\'s already done" is a reputation stronger than any job title. Your Earth energy points to daily accumulation steadily converting into solid recognition. Lucky action: keep your desk organized. Tip: somewhere among the proposals you\'ve dismissed as "unprecedented" may be the hint for your next timetable revision.'],
  ISFJ: ['🚌', 'The Local Bus Quietly Carrying Everyone', 'A new hire looking lost, supplies running low, a coworker slightly off today — you\'re the first to notice the small anomalies on a team. You find real satisfaction not in the spotlight seat, but in quietly keeping the whole operation running comfortably for everyone. The catch: you keep adding stops to your route until you\'re over capacity. Your Earth energy points to quiet support steadily converting into solid trust. Lucky action: keep your desk organized. Tip: "this bus is full" is part of safe driving, too — saying no doesn\'t lower your value.'],
  INFJ: ['⛵', 'The Sailboat Steering Quietly Toward Its Goal', 'You never bark orders, yet somehow the team ends up sailing in the direction you quietly pointed. You keep the question "what is this work actually for?" close at hand, and when the meaning is real, your focus fills like a sail catching wind. You sense shifts in team dynamics early, and your solo thinking time is what keeps your steering precise. Your Water energy favors reading the currents — that flexibility is what pulls unexpected opportunities your way. Lucky action: stay hydrated throughout the day. Tip: don\'t sail in silence with a head full of charts — share the route while you\'re still mid-voyage.'],
  INTJ: ['🛥️', 'The Submarine Moving Unseen Beneath the Surface', 'People sometimes wonder if anything\'s happening — meanwhile, below the surface, you\'re moving deeper and more precisely than anyone. Long-term design is your specialty, and inefficient workflows get mentally re-architected whether anyone asked or not. Thinking in structures rather than feelings can read as cold, but your hit rate on locked-in targets is remarkable. Your Metal energy sharpens decision and execution. Lucky action: use white or gold stationery. Tip: instead of surfacing only when it\'s finished, raise the periscope now and then — visible progress buys enormous goodwill.'],
  ISTP: ['🏍️', 'The Motorcycle That Reads the Situation and Reacts', 'You weave through the gridlock and arrive at the scene by the shortest possible line. Field over manual, the actual thing over another meeting. The moment trouble hits, you become the calmest person there — the one everyone means when they say "just call that person." Long standing meetings and micromanaged trackers, though, nearly stall your engine. Your Metal energy backs clean, unhesitating decisions. Lucky action: use white or gold stationery. Tip: alongside handling what\'s in front of you, unfold the map once a month — mobility with a destination is even more powerful.'],
  ISFP: ['🛶', 'The Canoe That Never Breaks Its Own Pace', 'You sit out the speed race — and refuse to compromise your own stroke. You\'d rather finish three things beautifully than ten things roughly, and the details of your work carry a quiet, deliberate pride. You do your best work in calm waters, away from constant competition and clashing egos. Your Wood energy points to patiently grown results maturing into deep trust. Lucky action: keep a small houseplant on your desk. Tip: careful work is surprisingly invisible when you stay quiet about it — get in the habit of adding one line: "here\'s what I did differently."'],
  INFP: ['🎈', 'The Hot-Air Balloon Riding the Wind of an Idea', 'The moment the "why" catches fire, you can climb higher than anyone. Your empathy softens the sharp edges of a team, but on days the work feels meaningless, your altitude drops like a balloon out of fuel. Those motivation swings aren\'t a defect — they\'re a wind gauge telling you which direction is truly yours. Your Wood energy favors slow-grown effort ripening into real trust. Lucky action: keep a small houseplant on your desk. Tip: before starting a task you dread, write down one person it helps. That alone puts a little fuel back in the burner.'],
  INTP: ['🧪', 'The Experimental Vehicle More Interested in the Engine Than the Destination', '"Wait — why is this the procedure in the first place?" You\'ve stopped a meeting with that line, or badly wanted to. Reaching the destination interests you less than understanding the engine and improving it. Routine repetition wastes your horsepower, but hand you a problem with real thinking room and you\'ll come back with a solution nobody else considered. Your Metal energy backs turning sharp analysis into action. Lucky action: use white or gold stationery. Tip: run the prototype at sixty percent done, in front of people — your design only proves its brilliance once it moves.'],
  ESTP: ['🏎️', 'The Sports Car with the Pedal Always Down', 'You launch at the starting gun and learn the course mid-race. Given the choice between polishing the proposal and testing it once in the real world, you take the test every time. Accidents don\'t rattle you — your reflex for the right move on the spot shines brightest where things change fast. Standing still, on the other hand, is your one true ordeal. Your Fire energy backs explosive output when you\'re riding momentum. Lucky action: catch the morning sun before starting your day. Tip: the racers who pit (reflect) are the ones who get faster. Check your lap times once a week instead of driving flat-out forever.'],
  ESFP: ['🚗', 'The Convertible Giving Everyone a Ride', 'Teams with you on them have noticeably lighter Mondays. You keep the work moving while keeping the mood up, and you\'re at your absolute best in roles with real human contact. Unscripted surprises don\'t faze you either — you turn "we\'ll figure it out" into actually figuring it out. Long stretches of monotonous routine, though, drain your fuel economy fast. Your Water energy favors flexible flow — reading the moment is how you catch unexpected chances. Lucky action: stay hydrated throughout the day. Tip: add a little routine maintenance (the steady, boring work) to the joyride, and your reputation shifts up a gear.'],
  ENFP: ['🪂', 'The Glider Whose Destination Changes With the Wind', 'In a brainstorm, you catch the thermal before anyone else has even noticed the wind change. You generate maximum lift at the zero-to-one stage of a project, and your enthusiasm is genuinely contagious. Level, steady flight bores you, though, and sometimes you\'re riding a new air current before the old flight has landed. Paired with someone who loves landings, you\'re unstoppable. Your Wood energy favors results that grow with continuity. Lucky action: keep a small houseplant on your desk. Tip: before takeoff, write one line defining what "landed successfully" means — it multiplies how much your flights count for.'],
  ENTP: ['🏁', 'The Go-Kart That Wants to Talk Racing Lines', '"Is that really the best line through this corner?" — questioning the racing line is your specialty. You\'re at your best in problem-solving races that demand actual thinking, not laps around precedent. In discussions you\'re the engine that wakes the room up, and new projects have a habit of starting from something you said. The flip side: when your interest dies, you decelerate just as fast. Your Water energy favors reading conditions flexibly to seize openings. Lucky action: stay hydrated throughout the day. Tip: drive your own ideas through the final lap yourself. A record of finishes is what buys your next idea its hearing.'],
  ESTJ: ['🚄', 'The Bullet Train That Refuses to Run Late', 'Departs on time, arrives on time — that\'s the reputation your projects carry. From planning through progress management, you weed out delays before they even sprout, and your sense of ownership makes you strongest in leadership and management roles. Vague instructions and improvised processes, on the other hand, are your single biggest stressor. Your Fire energy backs powerful forward drive when you\'re rolling. Lucky action: catch the morning sun before starting your day. Tip: give the passengers\' comfort the same attention you give the timetable — the whole train gets faster.'],
  ESFJ: ['🚙', 'The Family Car Checking Everyone\'s Seatbelt', 'Like checking every seatbelt before pulling out of the driveway, you naturally keep an eye on how each person on the team is doing. Your gift for carefully connecting people and moving things forward is quiet — but it\'s the lifeline of an organization. You never abandon what you\'ve been handed, and a sincere "thank you" is genuinely your fuel. Your Earth energy points to accumulated care converting into solid recognition. Lucky action: keep your desk organized. Tip: once a month, be the first person in the meeting to state an opinion — coordinator isn\'t your only seat.'],
  ENFJ: ['🚍', 'The Tour Bus Guide Who Somehow Guides Everyone', 'You\'re skilled at spotting what each member does best and guiding them to a seat where the light hits it. A junior colleague\'s growth genuinely feels like your own win, and one word of encouragement from you visibly changes a team\'s energy. But while you\'re looking after every passenger, your own seat quietly becomes the luggage rack. Your Wood energy favors trust you\'ve cultivated ripening into real results. Lucky action: keep a small houseplant on your desk. Tip: narrate your own achievements with the same enthusiasm you give everyone else\'s — your work deserves the tour, too.'],
  ENTJ: ['🚢', 'The Flagship Commanding the Whole Fleet', 'The harder the project, the higher your engine revs — you\'re a born commander. You survey the whole board, set the heading, and make bold calls without flinching; drop you into a stalled organization and the air changes within a week. Your standards for efficiency and results run high, and you apply them to yourself every bit as hard as to everyone else. Your Fire energy fuels the drive toward big targets. Lucky action: catch the morning sun before starting your day. Tip: not every ship can match the flagship\'s speed. Glance back at the fleet now and then — that\'s how the whole formation gets stronger.'],
};

const BLOCK_MAP = { personality: ANIMAL_MAP, love: WEATHER_MAP, work: VEHICLE_MAP };
const BLOCK_MAP_NAME = { personality: '動物', love: '天気', work: '乗り物' };
const BLOCK_MAP_EN = { personality: ANIMAL_MAP_EN, love: WEATHER_MAP_EN, work: VEHICLE_MAP_EN };
const BLOCK_MAP_NAME_EN = { personality: 'Animal', love: 'Weather', work: 'Vehicle' };

// ===== 気質グループ(16タイプ→4グループ、相性診断で確立済みの分類をそのまま流用) =====
// 「恋愛キャラ診断(全64通り)」(2026-09-05、性格ブロックの気質グループ×恋愛ブロックの16タイプ=64通り)用。
// 新規の判定ロジックは無く、既存2ブロックの結果を組み合わせて表示するだけ。
const TEMPERAMENT = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

// 気質グループ(NT/NF/SJ/SP)×恋愛タイプ16通り=64通りの個別キャラクター(2026-09-07全面リビルド)。
// 旧版は気質グループ単位の4パターン使い回しだったが、ユーザー指摘により64通り全て個別の
// character_name/roast_blurb/punchlineを用意。テキストはJapanese限定のJKノリ・毒舌文体のため、
// 英語版は用意していない(EN版では本セクション自体を非表示にする、下記のlovechar-sectionを参照)。
// 元データ: 診断ツール群/MBTI診断/恋愛キャラ64_データ/lovechar64_final.json
const LOVECHAR64 = {
  NT: {
    ISTJ: { name: '一途系契約書フクロウ', blurb: '記念日のリマインダーは完璧、デートの店は必ず予約済み、移動ルートは乗換案内で3パターン確認済み。ここまでは百点です。でも、相手が「今日はやっぱりこっち行きたい」と言った瞬間に「先週合意した内容と違う」って返したこと、ありますよね。旅行の初日、相手が30分寝坊しただけで「8時出発の計画が崩れた」と朝から不機嫌になり、その一日を丸ごと重い空気にした記憶もあるはず。予定通りに進んだデートより、予定が崩れた時のあなたの顔を相手はよく覚えてます。あなたの安定感は快晴級だけど、予定変更を裏切りみたいに扱う癖、元恋人は「契約書と付き合ってるみたい」と思ってました。しかもその契約書、改訂条項がないんです。', punchline: '誕生日プレゼントの候補、去年の11月にはもう決めてありました。' },
    ISFJ: { name: '尽くし系監視ログ羊', blurb: '相手の好きな食べ物、苦手な話題、機嫌の周期まで頭の中で表になってる。先回りして用意する優しさは本物です。ただ、その気遣いが的確すぎて「なんで知ってるの?」と言われた瞬間の空気、忘れてないでしょ。半年前に一度だけ「最近胃が弱くて」とこぼした話を覚えていて、デートの店を全部あっさり系で固めたあの日、相手は感謝より先にちょっと怖かった。しかも尽くした分の見返りを口には出さないくせに、相手が同じ精度で覚えていないと静かに傷つく。「私の好物、覚えてないんだ」の一言で相手を追い詰めたこと、ありますよね。愛情のつもりの観察が、相手には「監視ログ」に見えている。尽くしてるのに重いと言われる理由、そこですよ。', punchline: '「言ってないのに覚えてる」を褒め言葉だと思ってたの、あなただけです。' },
    INFJ: { name: 'ミステリアス系先読み白狐', blurb: '相手が言葉にする前に本音を察して、先に正解を出しちゃう人。しかも当たる。でもね、「今こう思ってるでしょ」と的中させた時、相手は感動じゃなくてちょっと引いてます。相手が「別に何もないよ」と言ったのを「何かある顔」と読んで、深夜まで「話したくなったら聞くよ」の姿勢で待ち続けたあの夜、相手はただ眠かっただけかもしれない。しかもあなた自身の落ち込みは「大丈夫」の一言で霧の奥に隠して、「察してもらえなかった」と後から一人で傷ついてる。あなたは霧の中に隠れて何も明かさないくせに、相手の心だけは丸裸にする。その不公平さ、「何考えてるか分からない」と別れ際に言われた原因です。', punchline: '「別れ話、だいたい2週間前から予想してた」と言って、さらに気まずくしました。' },
    INTJ: { name: '策士系詰み計算黒猫', blurb: '告白する前に、成功確率と失敗した場合の関係修復プランまで頭の中で組み終えてる。恋愛を三手先まで読む姿は格好いい。ただ、相手をうまく「詰ませた」と思った瞬間、それは恋じゃなくて攻略です。相手が急に「今夜泊まりに行っていい?」と言った時、嬉しさより先に「明日の予定の再調整」が頭をよぎった顔、ちゃんとバレてましたよ。喧嘩の最中も相手の主張の矛盾を静かに記憶して、感情が落ち着いた頃に一気に指摘する癖、あれは仲直りじゃなくて反撃です。「あなたの好意、全部計算に見える」って言われた過去、心当たりあるでしょ。静かに全部握ってる感じ、外から見ると台風です。中心にいるあなただけが無風だと思ってる。', punchline: '初デートの店、3軒目まで代替案があるのに「どこでもいいよ」と言いました。' },
    ISTP: { name: '追うと逃げるクール系山猫', blurb: '連絡が来たら「用件は?」、会いたいと言われたら「何する?」と返す人。効率としては正しい。でも相手が求めてたのは効率じゃない。「おはよう」のスタンプに何を返せばいいか分からなくて、結果として何も返さないまま昼になったこと、何回ありましたか。「返さない=嫌いじゃない」はあなたの中では成立してるけど、相手の中では成立してません。既読のまま3日放置を「考えてた」で済ませて、追いかけられると距離を取るその動き、元恋人は「掴んだと思ったらいない」と言ってましたよ。しかも相手が本当に離れそうになった時だけ急に手際よく修理に来るから、相手は「壊れかけないと来てくれないんだ」と学習します。自由と逃げは、風上から見るとほぼ同じ形です。', punchline: '「好き?」と聞かれて「定義による」と答え、話が本当に終わりました。' },
    ISFP: { name: 'マイペース系好き検算中カワウソ', blurb: '気持ちが動いた時、それを口にする前に一回頭の中で検算するタイプ。「これは本当に好きか、それとも状況か」と分析している間に、相手は3回くらい不安になってます。「好きなの?」と聞かれてから答えたこと、ありますよね。しかもその答えが「たぶん」だった夜、相手は帰りの電車でだいぶ落ち込んでました。記念日に手作りのプレゼントを用意したのに、渡す直前で「重いと思われないか」を検算し直して、結局カバンから出さずに持ち帰ったこともあるはず。感情はちゃんと動いてるのに、出力される前に減衰する。さらっと降ってさらっと止む恋の演出は美しいけど、その静けさを相手は「興味がないのかも」と読みました。', punchline: '「好き」を伝えるのに3日、返事の間の沈黙を分析するのに5日かかりました。' },
    INFP: { name: '恋愛脳系妄想が本命シカ', blurb: '頭の中に「理想の恋愛モデル」が完成していて、目の前の相手をそれとの差分で採点している人。感受性が豊かなのは本当。でも「こういう時こう言ってくれるはず」が外れるたびに勝手に傷ついて、相手に何も伝えず夕焼けの中で沈むの、それ相手には無理ゲーです。「なんか元気ない?」と聞かれて「何でもない」と返し、その「何でもない」を深掘りしてくれなかったことをまた減点に加えるループ、覚えありますよね。理想の中のあなたは相手に全部を打ち明けて泣くのに、現実のあなたは一人で日記に書いてる。「理想と付き合ってるの?」と言われた夜、心当たりあるでしょ。減点の内訳を、相手は一度も見せてもらってません。', punchline: 'まだ付き合ってない相手との「理想の会話」を、頭の中で50往復ぶんストックしてます。' },
    INTP: { name: 'クール系正論返しペンギン', blurb: '「それは感情の話? 事実の話?」を恋人に向けて言ったこと、あるでしょ。しかもだいたい正しい。正しさで相手を凍らせた回数、たぶんあなたが思ってるより多いです。記念日を忘れて「毎年同じ日に意味を持たせる合理性が分からない」と反論したの、あれは論破じゃなくて事故です。相手が愚痴を言い始めた時に「それ、前も同じ構造の話だったよね」と指摘して、相手が黙ったのを「納得した」と解釈したこともあるはず。黙ったんじゃなくて、諦めたんです。しかも自分の気持ちを聞かれると「まだ検証中」で保留にするから、相手だけが感情をさらす一方通行になる。頭のいい人が一番やりがちな失恋の型ですよ。', punchline: '泣いてる恋人の前で「まず論点を整理しよう」と言い、論点がひとつ増えました。' },
    ESTP: { name: 'ワンチャン系落として冷める虎', blurb: '勝ち筋が見えた瞬間に動くのが速い。距離の詰め方は天才的。ただ、あなたにとって恋愛は「落とすまでがゲーム」で、落ちた後の維持フェーズになると急に興味が薄くなるでしょ。付き合う前は毎日来てた「今何してる?」が、付き合った翌週から週1に減った理由を、相手はちゃんと数えてました。「飽きてないよ、忙しいだけ」の弁明も、付き合う前は同じ忙しさを自力で突破してた事実の前で崩れます。「追いかけてる時が一番楽しかった」を本人の前で口にした黒歴史、ありますよね。しかも関係が冷えてきた時の対処が「サプライズ旅行」みたいな派手な一手ばかりで、地味な毎日を積み上げる方向には絶対に行かない。夕立は来る時は派手だけど、去るのもあっさり。それを相手は覚えてます。', punchline: '告白は即日、記念日の予定は当日、別れ話も突然でした。全部、夕立です。' },
    ESFP: { name: 'かまってちゃん系デート採点柴犬', blurb: 'デートは毎回企画書レベル、盛り上げは完璧、帰り道の「今日どうだった?」まで確認する。楽しいのは本当。でもね、その「今日の満足度は?」が、相手にはアンケートに見えてます。何もしないだらだらした休日に耐えられなくて、相手の休息を「時間の無駄」にしちゃったこと、あるでしょ。相手が「今日は家でゆっくりしたい」と言った日に「じゃあ家でできる企画を3つ考えた」と返したの、あれは休息の否定です。しかも相手が乗り気じゃないと分かった瞬間、盛り上げの出力を倍にするから、静かにしたい人ほど疲弊する。真夏の青空は明るいけど、ずっと日陰がないのは疲れるんですよ。あなたの明るさに、相手は日焼けしてます。', punchline: '「今日の楽しかった度、10点満点で?」とベッドで聞いて、6点と言われました。' },
    ENFP: { name: '小悪魔系3回で冷めるリス', blurb: '相手のことを「面白い」と感じた瞬間、頭の中で仮説が10個くらい立つタイプ。質問が上手くて、相手はすぐ心を開きます。ただ、その興味が「研究対象への好奇心」だったこと、本人にバレてますよ。初回のデートで子どもの頃の傷まで聞き出しておいて、3回目には相手の話の途中でスマホを見てたの、相手は気づいてます。質問の熱量が、答えの新鮮さと連動してるんです。全部聞き出して理解した気になった後、急に熱が冷めてにわか雨みたいに去る癖、「私の何が面白くなくなったの?」と言われませんでした? しかも冷めた自覚がないまま、新しく気になる人の話を今の恋人にワクワクした顔で語り始める。雨雲が次の街へ移動してるの、丸見えです。', punchline: '「今の恋人と別れたらどうなるか」を、付き合ってる最中なのに考察し始めます。' },
    ENTP: { name: 'ドS系論破デートキツネ', blurb: '恋人が「今日こんなことあって」と話し始めた時、「でも逆の立場から見ると」と反論しちゃう人。しかも本気じゃなく、議論を面白くしたくて言ってる。それ、相手には全然伝わってません。相手が職場の愚痴を言ってるだけなのに上司側の合理性を丁寧に解説して、「あなたはどっちの味方なの」と言われたこと、ありますよね。「反対意見をあえて言う」が習性になりすぎて、相手を泣かせた後に「ディベートのつもりだった」と説明した黒歴史も。さらに謝る時まで「確かに俯瞰すれば自分の言い方も」と論理構造の話から入るから、謝罪がまた議論になる。春一番は爽快だけど、毎日吹かれるとしんどいんですよ。', punchline: '「それ、逆の立場から見ると?」を言った回数と、相手のため息の回数が一致します。' },
    ESTJ: { name: 'ドS系恋人KPI管理ライオン', blurb: '恋人に対して、無意識にKPIを設定してませんか。「連絡頻度」「家事の分担」「月1の外食」。守ってる自分は完璧に頼れる。でも相手の泣き言を「課題」と呼び、悩みを聞いた翌日に「改善案」を出したこと、ありますよね。相手が「ただ聞いてほしかっただけ」と言った時、「聞いた上で解決策を出すのが誠実でしょ」と正論で押し返したのも覚えてるはず。しかも自分が決めたルールを相手が守れないと、理由を聞く前に「約束したよね」から入る。相手はそのたびに、恋人じゃなく部下として査定されてる気分になってます。上司じゃなくて恋人なんですよ。「あなたと話してると面談みたい」と言われた過去、正直に思い出してみて。', punchline: 'ケンカの翌朝に「昨日の件、振り返りしよう」と言って、二回戦が始まりました。' },
    ESFJ: { name: 'みんな味方系根回しウサギ', blurb: '相手の親友、家族、職場の人まで、誰を先に味方にすれば関係が安定するか無意識に設計してる人。実際に全員に好かれる能力もある。でもね、「なんで私より先に私の友達と仲良くなるの」って言われたこと、ありませんか。喧嘩した翌日、相手の親友から「あの人も反省してたよ」と伝言が届いて、相手が「え、もう話したの?」と固まったあの空気。あなたにとっては和解の根回しでも、相手にとっては自分の喧嘩が外部に共有された事故です。しかも本人にはいつも笑顔で接するから、直接の不満は言いにくい。あなたの気遣いは本物だけど、相手からは自分抜きで周囲が固められていくように見えてる。木漏れ日は優しいけど、逃げ場も少ないんです。', punchline: '相手のお母さんの誕生日を、相手より先に把握してLINEを送ってました。' },
    ENFJ: { name: '溺愛系恋人育成プロジェクト鶴', blurb: '相手の可能性が見えすぎて、「あなたはもっとこうなれる」を恋愛だと思っちゃってる人。導く力は本物、みんなが見上げる虹なのも本当。でも恋人を育成対象にした結果、「恋人じゃなくてメンターみたい」と言われたこと、あるでしょ。相手が「仕事つらい」と言った時、共感より先に「その環境で何を学べるか考えてみようよ」と前向きに変換して、相手が「つらいって言っただけなんだけど」と黙ったの、覚えてますよね。しかも相手が成長を見せた時のあなたの喜び方が、恋人というより保護者のそれになってる。相手はあなたに成長させてほしくて付き合ったんじゃない。虹はきれいだけど、ずっと見上げさせられると首が疲れるんです。', punchline: '別れ話の最中に相手の「今後の成長プラン」を語り始めて、逆に感謝されました。' },
    ENTJ: { name: '野心系結婚は合併ドラゴン', blurb: '初デートで5年後の話をして、相手の意見を「検討します」で処理した人。恋愛にも事業計画があって、進捗が遅いと「次のフェーズに進もう」と提案する。頼もしいのは本当。ただ「結婚って合併みたいなものだよね」を、冗談じゃなく本気で言った黒歴史、ありますね。相手が転職に悩んでいた時、話を聞く前に業界の市場規模と将来性を語り始めて、「私の話は?」と言われたことも。しかも相手の決断が遅いと感じると「決めないのも一つの決断だよ」と静かに圧をかけるから、相手はいつも期限付きで生きてる気分になります。あなたの存在感で空は全部埋まるけど、相手の居場所が残ってるかは確認しましたか。', punchline: 'プロポーズの候補日を3つ用意して「どれが都合いい?」とカレンダー招待を送りました。' },
  },
  NF: {
    ISTJ: { name: '根に持つ系ゴーストヒツジ', blurb: '「気にしてないよ」と笑った顔のまま、心の帳簿には日付と発言を一言一句記帳しています。相手が「たぶん行けると思う」と言った予定を、あなたは確定事項として手帳に赤丸で書き込み、当日ドタキャンされた時点で帳簿に静かに一行追加。爆発しないから相手は気づかず、そのまま黒字だと思い込んで積み重ね、ある日「もう疲れた」と静かに手切れ。元恋人に「その時言ってくれれば」と言われたはずですが、あなたの中では十分言ったつもり…ため息と、いつもより一秒長い沈黙で。記念日を一度も忘れないあなたが、相手の「ごめん、忘れてた」を一度も忘れないのは、同じ性能の裏表です。約束を守る人ほど、破られた約束を忘れない。', punchline: '「気にしてないよ」と言った日の日付を、3年後の喧嘩で正確に言える。' },
    ISFJ: { name: '尽くし系見返り待ちハムスター', blurb: '頼まれてない世話を先回りしすぎて、「ありがたいけど、ちょっと重い」と言われた過去、ありますよね。相手が「今日寒いね」と言っただけで、翌日にはカイロとマフラーと温かい飲み物が用意され、相手は喜びつつ「これ断ったら悪い人になる」空気を感じている。「何食べたい?」に「なんでもいい」と答えて、希望を汲み取ってもらえないと静かにしゅん。しかもその「しゅん」を相手が気づいて謝ってくると「気にしてないよ」で二重に隠す。見返りは求めてないつもりが、「気づいてほしい」在庫が倉庫いっぱい。あなたの誕生日を相手が普通に祝っただけで、なぜか「私はもっとやったのに」の差額計算が始まりませんか。優しさが請求書化する前に、口で言おう。', punchline: '相手が風邪をひく前日に、薬とポカリがもう玄関に置いてある。' },
    INFJ: { name: '深読み系即ブロックキツネ', blurb: '相手が言ってないことまで「本当はこう思ってるでしょ」と深読みし、答え合わせのテストを勝手に出題。返信が「うん」だけだった夜、あなたはその二文字から冷めた理由を三つ組み立て、相手はただ風呂に入っていただけ。落ちた相手は理由も知らされず、ある日突然ブロック。あの元恋人、いまだに「何があったのか」わかってません。付き合っている間も、相手のちょっとした言葉を「三か月前のあの発言と矛盾してる」と静かに照合していたはず。「察してほしい」と言いながら、察されると「そんな単純じゃない」と思うあなた、難易度が高すぎます。しかも一度「この人は違う」と判定した相手を、再審査した回数はゼロ。霧の奥の答え合わせは、相手に問題用紙が配られていないのが最大の欠陥です。', punchline: '「別に」の裏に3段階の本音があるのに、相手は1段階目にも到達できない。' },
    INTJ: { name: '束縛系静かな策士クロネコ', blurb: '付き合って早々、頭の中に「理想の二人」の設計図が完成し、ズレを一人で修正案にしています。相手が「なんとなく」で選んだ休日の予定を、帰宅後にこっそり採点し、次回は「効率がいいから」を理由にあなたのプランへ静かに置き換える。「あなたのためを思って」で相手の服や交友関係に助言するけど、それ、相手には静かな監視です。喧嘩の最中に相手が感情で話し始めると、「それは今の論点じゃない」と整理を始めて、相手をさらに泣かせた経験、ありますよね。「私、重い?」と聞くタイミングだけは完璧で、そこで「重くないよ」と言わせるのも計画通り。愛が精密すぎて、逃げ場がない。設計図には二人の未来が描かれているのに、相手が図面を書き換える権限だけは、どこにも記載されていません。', punchline: '付き合って2週間で、相手の5年後の誕生日プレゼントまで決まっている。' },
    ISTP: { name: 'マイペース系逃げ足リス', blurb: '相手の気持ちには敏感なのに、自分の気持ちを聞かれた瞬間「わからない」でふわっと逃げる。「好き」と言われた翌日に返信が丸一日空くのはあなたです。楽しく過ごした帰り道、相手が「次はいつ会える?」と聞いた瞬間、急に「今月ちょっと忙しくて」が口から出る。実際の予定表は空白なのに。距離を詰められると急に予定が埋まり、離れられると寂しくて自分から連絡。そして相手が「もう追いかけない」と決めた頃に、絶妙なタイミングで「元気?」と送るせいで、相手は諦めるチャンスさえ逃す。元恋人の「結局どうしたかったの?」に、今も答えられないでしょ。一人の時間が好きなのは本当。でもその静けさの中で、相手を待たせている音だけ聞こえていない。自由と孤独を交互に選ぶ人。', punchline: '「会いたい」と送った直後、既読がつく前に「忙しかったら大丈夫」を追送している。' },
    ISFP: { name: '繊細系3日後長文カエル', blurb: '傷ついたその場では「大丈夫」を12回言って、3日後に長文で届く。相手のちょっとした一言を花瓶にそっと溜めて、満杯になった日に一気に決壊。しかも決壊するのは、相手が全く別件で機嫌よく話している日曜の夜で、相手からすれば「なぜ今?」しかない。「言ってくれれば直せたのに」と何人に言われましたか。喧嘩の最中も、頭の中では反論が完璧に組み立てられているのに、口から出るのは「ごめん、なんでもない」だけ。そして帰り道に一人でその反論を全部再生して、また傷つく。優しさゆえに黙る、はわかる。でも黙って傷つく権利を独占されると、相手は謝るチャンスすらもらえないんですよ。便箋を濡らしているその雨、実は相手の頭上には一滴も降っていない。', punchline: '送らなかった長文LINEの下書きが、スマホのメモ帳に47本たまっている。' },
    INFP: { name: '夢見がち系脳内恋人コジカ', blurb: '脳内の恋人が、現実の恋人より完成度が高い。相手の些細な一言を夜中に日記に書き起こし、「本当に私を理解してくれる人はいない」と結論を出したのに、別れ話は切り出せず一年フェードアウト。デート中に相手がスマホを見た三秒間を、その夜には「私との時間を大事にしてない証拠」として一章分に膨らませたこと、ありますよね。「わかってくれない」を本人に言ったことは一度もないのに、脳内では30回言ってる。相手からの「今日何かあった?」に「別に」と答えながら、日記には二千字の本音が書かれている。その二千字を相手が読める日は、永遠に来ない。理想が高いんじゃなく、現実に採点が甘い。夕焼けを独り占めしているその丘、隣のクッションは最初からあなたが空けている。', punchline: '付き合う前の「両想いかも期間」が、付き合ってからの全期間より幸せだった。' },
    INTP: { name: 'クール系恋を論文化ペンギン', blurb: '相手の感情は精密に読めるのに、自分の感情だけ「これは好きなのか?」と論文化して返事を一週間放置。「好き」の代わりに、おすすめの本を貸す。記念日に相手が期待していたのは花や言葉なのに、あなたが持参したのは「二人の関係を客観的に整理した」メモ。相手が泣いていると、慰めるより先に「なぜ泣いているのか」を分析し始めて、そこを指摘されたこと、ありますよね。指摘された後も「でも原因を特定しないと再発するよね?」と返して、二回目の涙を発生させた実績もあるはず。「寂しい」と言われて「寂しさの定義によるけど」と返した瞬間、相手の中で何かが静かに閉店しています。理解と愛情はセットのはずなのに、あなたは理解だけ納品する。ココアが温かいのは、あなたのマグだけです。', punchline: '「愛とは何か」を真剣に3時間語ったデートの帰り道、手はつながなかった。' },
    ESTP: { name: '沼落ち系3日で運命コイヌ', blurb: '出会って3日で「運命かも」、その勢いで相手の週末を全部埋める。相手が沈んでいると「今から迎えに行く」と本当に来る、その熱量は素敵。深夜二時に「声聞きたくなった」と電話をかけて、翌朝の相手の寝不足には気づかないのも、あなたです。でも相手が同じ速さで燃えないのを「冷めた?」と解釈し、「もう好きじゃないの?」を付き合った初週に聞いた実績、あるでしょ。返信が三時間空いただけで「何かあった?」「大丈夫?」「怒ってる?」の三連投。しかも相手が「ゆっくり進めたい」と言うと、その日のうちにサプライズを企画して「ゆっくり」を上書きする。あなたの夕立は嬉しい。ただ、傘を用意する時間もほしい。閉じたままの傘をくわえて走ってくるのは、そういう意味です。', punchline: '「今から会える?」の返事が来る前に、もう電車に乗っている。' },
    ESFP: { name: '天然系笑顔で本音隠すイルカ', blurb: '恋人の前では常に晴れ、落ちてる日も笑顔、家に帰って一人で泣く。「悩みなさそう」と言われるのが実は一番きついのに、「重いと思われたくない」から本音は出荷ゼロ。相手が「最近どう?」と聞いてくれたその日ですら「めっちゃ元気!」と即答して、一番聞いてほしいタイミングを自分で潰している。代わりに周囲全員に愛想よくして、「誰にでも優しいよね」と言われて喧嘩になったこと、ありますよね。そして喧嘩の翌日も普通に明るく振る舞うので、相手は「本当に平気だったのか」を確かめられずに終わる。別れ話の場面でさえ笑顔でいてしまい、相手に「本当は何を考えてたの?」と最後まで言われた人、手を挙げて。青空を維持するコスト、そろそろ相手に請求してよい。', punchline: '「いつも元気だね」と言われた日ほど、シャワーの時間が長い。' },
    ENFP: { name: '恋多き系運命年3回インコ', blurb: '「この人しかいない」を年に3回言う人。始まりは花火、3か月で「なんか違う」が芽生えるのに、相手を傷つけたくなくて別れ話をぐずぐず引き延ばし、結局相手に切り出させる。付き合って一週間で友人全員に「今回は本物」と宣言し、その友人たちが「今回は」の回数を数えていることには気づいていない。「いい人なんだけど」が別れの定型文。しかも「なんか違う」の正体を相手に説明したことは一度もなく、本人も言語化できていないから、相手は改善点すら聞けずに置いていかれる。そして元恋人全員と「いい友達」を続けているのは、優しさじゃなく、嫌われる勇気がないだけかもしれない。晴れと雨が同時に降るその空、実は次の虹を探している最中の空です。', punchline: '元恋人全員とまだ「いい友達」で、全員の誕生日にちゃんとお祝いを送っている。' },
    ENTP: { name: 'お調子者系笑って逃げるカワウソ', blurb: '真剣な話になると、面白い話題を投げて空気を変える。相手が「ちゃんと話したい」と言った瞬間にボケた回数、二桁ですよね。将来の話を切り出された瞬間に「ところで知ってる?」と無関係な豆知識を投入し、相手が準備した言葉を五分で蒸発させた夜、ありませんか。実は相手の感情を全部読んでいて、重くなるのが怖くて笑いに逃げているだけ。だから相手が本当に泣き出した時、あなたは冗談の在庫を切らして固まる。「真面目に聞いてる?」と言われて「聞いてるよ〜」と返した時点で、相手の信頼メーターは静かに削れてます。ポケットの「ちゃんと話そう」の手紙、書いたのはあなた本人なのに、渡す前に自分でネタにしてしまうのが一番の問題。春一番は気持ちいいけど、砂も飛ぶ。', punchline: '「私たちってどういう関係?」に、面白い返しを3案考えている間に沈黙が10秒過ぎた。' },
    ESTJ: { name: '頼れる系弱音吐けないクマ', blurb: '相手が「聞いてほしいだけ」なのに、解決策5個と期限をセットで提示。相手の家族の誕生日まで管理し、記念日は必ずあなたがプラン。相手が「今日ちょっと疲れた」と言えば、翌週の休日に整体の予約が入っていて、本人はまだ何も頼んでいない。「頼りになる」と言われ続けた結果、自分が弱音を吐く場所がどこにもなくなってませんか。相手が珍しく「何か手伝う?」と言ってくれた時に「大丈夫、もうやった」と返して、相手の出番を毎回ゼロにしているのも、あなたです。「大丈夫」を言い続けて突然ダウンし、相手に「なんで言ってくれなかったの」と言われた回、思い出してみて。他人の荷物を全部背負って、自分のリュックだけぺしゃんこ。それ、頼もしさじゃなくて、頼らせてもらえない側から見た孤独です。', punchline: '恋人の「ただ聞いてほしい」に、翌朝までにスプレッドシートを作って送った。' },
    ESFJ: { name: '世話焼き系恋人後回しウサギ', blurb: '恋人の友人・家族全員に気を配り「いい人」と評判なのに、当の恋人からは「私より周りの評価が大事なんだね」と言われた経験、ありますよね。「今日なにかあった?」を毎日聞き、SNSの「いいね」の順番まで見ている。相手の友人グループの空気が少し悪いと、頼まれていないのに間に入って調整し、当の恋人には「そういうの、しなくていいのに」と言われる。恋人が「別に何もない」と答えた日には「何かあったはず」と質問の角度を変えて三回聞き、結局本人より先に疲れさせている。木漏れ日みたいに全員を癒す代わりに、一番近い人の影に気づかない。恋人の母親からの信頼度が恋人本人より高いのは、褒め言葉じゃない。全員のカップを満たして自分のカップだけ空なのは、優しさというより手順の抜け漏れです。', punchline: '恋人の母親へのLINE返信速度が、恋人本人への返信より速い。' },
    ENFJ: { name: '理想主義系メンター化ハクチョウ', blurb: '恋人の成長プランを勝手に描き、「あなたはもっとできる」を愛だと思って言い続ける。相手が仕事の愚痴をこぼしただけで、翌日には転職サイトのリンクと「向いてると思う分野」のメモが届く。周囲には理想の恋人と評価されつつ、恋人本人からは「私はあなたのプロジェクトじゃない」と言われた夜、ありましたよね。自分のしんどさは誰にも言わず、「相談される側」を降りられない。相手が「最近大丈夫?」と聞いてくれた時も「私は平気、それより君は?」で即座に話を返して、心配される側になる機会を自分で閉じている。そのくせ誰にも頼られない日が続くと、静かに存在価値を疑い始める。みんなに虹を架けている間、自分だけずっと雨の中に立っている。首に巻いた「頼っていいよ」のリボン、あなた自身が一番読めていない。', punchline: '恋人の「疲れた」に、励ましの長文と参考動画のリンク3本を添えて返信した。' },
    ENTJ: { name: '溺愛系一人にさせないトラ', blurb: '愛が大きすぎて、相手が呼吸する隙間がない。「私はあなたを世界で一番理解してる」と本気で思っていて、相手が沈むと即介入し、自分で立ち直る時間まで奪う。相手が「一人で考えたい」と言った夜、三十分後に「考え、まとまった?」と送るのがあなたです。恋人の友人を「あなたに良くない」と査定したこと、ありますよね。相手の趣味や休日の過ごし方にも「もっと有意義な使い方がある」と提案し、相手が好きだった時間を一つずつ二人の時間に置き換えていく。欲しいのは「あなたがいないとダメ」の一言。でもそれ、支えているんじゃなく、依存を育てている。雨粒を受ける側が浮き輪を握っているのは、愛が足りないからではなく、多すぎて溺れそうだからです。', punchline: '「重い」と言われた夜、なぜ重いと感じたのかを分析した返信がさらに重かった。' },
  },
  SJ: {
    ISTJ: { name: '一途系ノーサプライズ柴犬', blurb: '記念日は完璧、予約も1か月前。でも「サプライズ嫌い」を相手にまで適用して、恋人からの不意打ちプレゼントに「事前に言ってくれれば」と返した黒歴史、あるでしょ。「たまには予定なしで会いたい」に「じゃあ何時に?」と聞き返した瞬間、相手の恋は少し冷めてます。デート当日、相手が「あっちの店も気になる」と指さした瞬間に「予約してあるから」で即却下、でしょ。しかも相手の遅刻は分単位で覚えてるのに、自分が正しく待った回数もきっちり覚えてて、喧嘩のときにその貯金を切り崩す。「前回もそうだった」の「前回」を日付つきで言えるのは、記憶力じゃなくて査定です。あなたの安心は、相手にとっては点呼です。', punchline: '旅行のしおりをA4で自作して、当日朝に相手へ配布した経験、あるでしょ。' },
    ISFJ: { name: '尽くし系察してちゃんうさぎ', blurb: '言われる前に飲み物を用意し、寒がる前に上着を渡す。優しさは本物。でも「言わなくても察して」を自分だけ実践して、相手が察せないと静かに減点してるでしょ。溜めた「私ばっかり」を半年分まとめて放出して、相手を「何のこと?」と困惑させた過去がある。相手が「疲れた」と言えば黙って肩を揉むのに、自分が疲れた日は「ううん、平気」でごまかして、夜に一人でため息をつく。行きたい店を聞かれても「どこでもいいよ」と答えて、決まった店が自分の好みじゃなくても笑顔で完食。そのあと「私の好みなんて知らないもんね」と心の帳簿に小さく記入するの、やめなさい。元恋人に言われた「察してちゃん」、ちょっと当たってます。', punchline: '「大丈夫?」に即答で「大丈夫」、その3日後に半年分をまとめて放出するやつ。' },
    INFJ: { name: 'ミステリアス系ゴースト銀狐', blurb: '相手の好みも予定も全部覚えてるのに、自分のことは一切話さない。「あなたのために」で自分を消し続けて、限界が来たら突然の音信不通。1年後に「実はあの時」と語り出して、相手を「今それ言うの?」とさせた黒歴史、心当たりあるでしょ。「今日どうしたい?」と聞かれて「あなたが楽しいのが一番」と返すのを優しさだと思ってるけど、相手からすれば選択を全部押しつけられてる。しかも心の中では「本当は海に行きたかった」を密かに記録してて、それを言わずに相手が気づかないことだけ覚えてる。誰にも見せないノートに相手の減点を書き続けて、開示するのは別れの日。守ってるのは相手じゃなくて、自分の弱さが見える瞬間です。', punchline: '「何考えてるかわからない」と言われた回数、片手で足りないでしょ。' },
    INTJ: { name: '策士系結婚逆算クール黒猫', blurb: '交際3か月で結婚までのマイルストーンを表計算ソフトに作ってる。相手の「なんとなく好き」が理解できず、「その根拠は?」と聞いて泣かせた実績、あるでしょ。喧嘩は必ず論点を整理してから始め、相手が感情で話すと「それは別の話」と切る。誕生日プレゼントは相手の欲しい物リストから「費用対効果が最も高い」一点を選び、相手が「サプライズがよかった」とこぼすと「事前調査の方が満足度は高い」とデータで反論。旅行の帰り道、相手が「楽しかったね」と言った直後に「移動時間の配分は次回改善だね」と振り返り会を始めたの、あなたです。相手の「疲れた」は課題じゃなく、ただの共感待ち。正しい。でも正しさで抱きしめることはできません。', punchline: '初デートの店選び、口コミ星3.5未満を除外したスプレッドシートで決めた。' },
    ISTP: { name: 'クール系既読スルーフェレット', blurb: '約束の時間には必ず来る。壊れた物も黙って直す。でもそれ以外の日は既読スルー、3日返信なしを「何か問題あった?」と本気で聞いた黒歴史があるでしょ。相手の「今日ちょっと聞いてほしいことがあって」に「うん」の二文字で返して、続きを待たれてることに気づかない。実際に会えば頼りになるし、電球も自転車も直してくれる。でも「昨日どうだった?」の一言が出せないから、相手は「私に興味ないのかな」と勝手に結論を出して、あなたはそれを別れ際に初めて知る。「ちゃんと来たじゃん」を免罪符にしてる限り、相手の「もっと話したい」は届きません。あなたが守ってるのは約束だけで、つながりじゃない。', punchline: '記念日は忘れないのに、記念日前日の「明日楽しみ」は送らない。' },
    ISFP: { name: '怒ってない系サイレント灰猫', blurb: '不満を口で言えない代わりに、部屋の掃除と手作りプレゼントが増えるタイプ。喧嘩をしないのは平和だからじゃなく、逃げてるだけでしょ。「別に怒ってない」を3か月続けて、別れ話は「なんとなく合わなくて」で説明放棄した黒歴史。相手の発言に傷ついた日は、その場では「そっか」と笑って、帰り道でひとつ前の駅から歩き出す。相手が「何かあった?」と気づいてくれたときも「ちょっと疲れてるだけ」で扉を閉め、翌朝には手作りのお弁当で全部なかったことにする。相手は謝るタイミングを永遠にもらえない。プレゼントが急に増えた月は、実は不満が一番溜まってた月。相手はそれを「最近優しいな」と誤読して、崖の直前まで気づけない。相手からすれば、雨がいつ降ったのかも止んだのかも、最後まで分からない。', punchline: '「怒ってない」と言った日に限って、キッチンの排水口まで異様にピカピカ。' },
    INFP: { name: '恋愛脳系思い出保管ハリネズミ', blurb: '初めて会った日のレシートを取ってあるでしょ。トーク履歴は3か所にバックアップ。相手がその日付を覚えてないと「私だけが大事にしてる」と傷ついて、頭の中の理想の恋と比べて現実の相手を減点し始める。「あの時こう言ってくれた」を1年前のスクショつきで持ち出して、相手に「言った覚えがない」と言わせて二重に傷つくの、何回目ですか。記念日に相手が用意したケーキより、自分の脚本にあった「夕焼けの帰り道で手をつなぐ」が実現しなかったことのほうが記憶に残ってる。相手が何気なく捨てた映画の半券を、ゴミ箱から救出して黙って保管したこと、ありますよね。元恋人が言った「重い」は暴言じゃなくて、正直な感想です。思い出の管理より、今日の会話を大事にして。', punchline: 'プレゼントの包装紙まで日付を書いて保管してる。捨てられない。' },
    INTP: { name: '理屈系好きの定義論ペンギン', blurb: '相手が泣いてるときに「まず原因を整理しよう」と言った黒歴史、あるでしょ。決めた手順どおりに謝るけど、心が入ってないのは相手にバレてる。「正論だけど今言うことじゃない」を人生で何回言われたか、覚えてないのが答えです。「好きって言って」と頼まれて「言葉にすると意味が固定される」と返し、記念日の「何が欲しい?」に「実用性で選ぶなら」と前置きしてから相手を絶望させた。相手が愚痴を話し始めた10秒後に「それはこうすれば解決する」と口を挟んで、話す気を根こそぎ奪ってきた前科、一件じゃないでしょ。相手が「今日寒いね」と言った意図が「手をつなぎたい」だと理解できたのは、別れて半年後です。あなたの誠実さは疑わない。でも感情に説明書はついてこない。', punchline: '「なんで怒ってるの?」を純粋な確認事項として投げて、火に給油する。' },
    ESTP: { name: '押せ押せ系突撃デートカワウソ', blurb: '「会おう」と言ってから30分で現地に着いて、相手の予定を聞く前にコースを全部決めてる。最初は「頼もしい」、半年後には「勝手」に変わる流れ、身に覚えあるでしょ。喧嘩したら「行動で示す」と言って高額プレゼントで片付けようとした黒歴史。相手が「ここ行きたい」と店の名前を出した3秒後に「もう予約した」と言うのを気遣いだと思ってるけど、相手は「行きたいな」と言い合う時間が欲しかっただけ。しかも「今日は静かに家で」と言われた日に、車で迎えに来て「ドライブなら家みたいなもんでしょ」と押し切った。相手が悩みを話し始めると「よし、今から行こう」と現場に向かいたがるのも、聞くより動くほうが楽だからでしょ。行動力は魅力です。でも相手が欲しかったのは、決める前に一言聞くことです。', punchline: '記念日ディナー、押さえたのは店だけじゃなく相手の予定もだった。' },
    ESFP: { name: '盛り上げ系デート採点レトリバー', blurb: '盛り上げ上手で楽しませてくれる。でも「今日楽しかった?」の確認を毎回するでしょ。ノリで動いてるように見せて裏では下見と予約が完了済み、相手が乗ってくれないと「せっかく用意したのに」が出て空気が一瞬凍る。相手が静かに疲れてる日も、あなたは「元気出そ!」でカラオケに連行し、相手の無言を「盛り上がりが足りない」と誤読して曲数を増やす。ふたりの写真を撮る時は必ず相手にピースを要求し、写りが微妙だと撮り直しを5回、相手の笑顔は3回目で消えてる。相手が「今日はなんとなく楽しかった」と言うと「なんとなく? どこが一番?」と感想を採点表に落とし込みたがるの、盛り上げじゃなくて検収です。元恋人が疲れたのは、あなたの明るさじゃなく、明るさを採点される感じのほうです。', punchline: '「なんでもいいよ」の相手に、選択肢3つのアンケートを送った。' },
    ENFP: { name: '天然系ネタバレサプライズインコ', blurb: '「サプライズしたい」のに事前確認しちゃう。「今日空いてる?」と誘った時点で、コースと帰りの電車まで決まってる。話は飛ぶのに予定は飛ばさない。「行けたら行く」を額面どおり受け取って席を確保して待った黒歴史、あるでしょ。会話の途中で「そういえば」を5回挟んで、相手が最初に話しかけた相談ごとが宙に浮いたまま解散したの、何度目ですか。相手が「今度こそ本気で聞いて」と言えば、翌日には「聞くための時間」を予定表にブロックして、相手を余計に脱力させる。「今度あそこ行こう!」と3か所盛り上げておいて、実際に行くのは自分が事前に調べ切った1か所だけ。残り2か所は相手だけが覚えてる。相手の自由行動を口では歓迎して、内心の予定表が崩れると顔に出てます。', punchline: '話は毎回脱線するのに、デートの解散時刻だけは一度もずれてない。' },
    ENTP: { name: 'ドS系正論添削キツネ', blurb: '話が面白いから最初はモテる。でも相手の「そうだよね」に「本当にそう思う?」と返して疲れさせた黒歴史、あるでしょ。しかもルールには意外と厳格で、恋人のドタキャンに正論を並べて説教。「いや、それは違くて」を告白の返事に使った人、あなたです。相手が観た映画の感想を「泣けた」と言えば「どのシーンの構造が?」と掘り下げて、感想を言う気を失わせる。喧嘩で相手が言葉に詰まると「じゃあ論点を3つに分けようか」とホワイトボードを取り出し、勝ったのは議論、負けたのは関係。相手の親の前でも持論を曲げずに食卓を静まらせた夜、「盛り上がった」と思ってたのは自分だけです。空気は変えられても、相手の気持ちまで議論で変えようとしないで。', punchline: '白熱した議論の途中で腕時計を見て「あ、門限」と帰った日がある。' },
    ESTJ: { name: '上司系改善点箇条書きクマ', blurb: '頼れる。連絡は即返、段取りは完璧。でも相手の悩みに「解決案3つ」で返して、ただ聞いてほしかっただけの人を凍らせた黒歴史、あるでしょ。「なんでできないの?」を恋人に言ったこと、一度で済んでない。家事も予定も担当表を作りたがる。相手が「今日は仕事で失敗して」と切り出した瞬間、「報告・連絡・相談が足りなかったんじゃない?」と上司の顔で返して、恋人を部下に格下げしたの、あなたです。デートの遅刻には理由を聞き、その理由に「事前に見込めたよね」とダメ出し。相手が体調を崩した日も「昨日の夜更かしが原因」と分析から入って、労いは最後に添える程度。喧嘩の後に「次回の改善点」を箇条書きで送るのは、恋人じゃなく部下への対応です。', punchline: '待ち合わせの10分前集合をこちらだけ守って、5分前に「今どこ?」と送る。' },
    ESFJ: { name: 'おせっかい系感謝待ちニワトリ', blurb: 'お弁当、体調管理、親への挨拶まで完璧。でも「見返りは求めてない」は嘘で、感謝が足りないと「私がどれだけ」が出るでしょ。相手の友達付き合いにまで口を出して「一緒にいると息苦しい」と言われた黒歴史。相手の予定を本人より先に相手の母親と共有してたの、あなたです。相手が「今日は一人で過ごしたい」と言った日に、夕方「大丈夫?」の連絡とおかずのおすそ分けを届けて、一人の時間を実質ゼロにする。相手が風邪をひくと「言ったのに」から始まる看病セット。手厚いけど、その「言ったのに」で相手は毎回ちょっと縮んでる。相手の職場の人間関係を、本人の話だけで「あの同僚はやめたほうがいい」と判定したこともあるでしょ。愛は多いほど良いわけじゃない。', punchline: '相手の冷蔵庫の中身を本人より把握してて、賞味期限の通知までしてる。' },
    ENFJ: { name: '育成系転職リンク送信白鹿', blurb: '恋人の成長プランを勝手に作ってるでしょ。「あなたのためだから」と言うけど、それは自分の理想像への矯正です。しかも恋人より周りの相談を優先して、「私は何番目?」と聞かれた黒歴史。恋人の資格試験の勉強スケジュールを本人より把握してるのは、支えてるんじゃなく管理してる。相手が「今の仕事、まあ楽しいよ」と言えば「もっと向いてる道がある」と転職サイトのリンクを3つ送り、相手の「今」を毎回未達扱いにする。相手の友達に「あの人のこと、私がちゃんと見てるから」と言ってたのを本人経由で聞かれて、笑顔のまま関係がひとつ冷えた。相手を褒める時も「前より良くなったね」と成長軸でしか褒めないから、相手は常に途中経過扱いです。虹は見上げるもので、指導するものじゃない。', punchline: '恋人の悩み相談の途中で、別の友達からの相談LINEに先に返信した。' },
    ENTJ: { name: '支配系恋愛プロジェクトライオン', blurb: '交際は「プロジェクト」、恋人は「メンバー」。相手の意見を聞いてるつもりで、最終決定権は常に自分。「私は間違ってない」を毎回言うでしょ。「一緒にいると部下みたい」と言われた黒歴史、あるはず。別れ話を「今後の方向性のすり合わせ」と呼んだ人も、あなたです。相手が「なんとなく不安」と言うと「具体的に何が?」と即座に課題化し、答えられない相手を「じゃあ問題ないね」で締めて、不安だけがそこに置き去り。誕生日は前年の反省を踏まえた「改善版」を実施し、相手の「去年のほうがよかった」を想定外のフィードバックとして持ち帰る。「今週は忙しいから」を相手に告げる時、代替日を3つ提示済みなのが優しさだと思ってるでしょ。守ってるのは相手じゃなく、自分の計画の進行率。', punchline: '同棲の話し合いに四半期ごとの目標シートを持参して、相手を黙らせた。' },
  },
  SP: {
    ISTJ: { name: 'マイペース系晴れ限定レトリバー', blurb: '「晴れてるから今から行こう」は即決なのに、雨が降ったら「じゃあ中止」で連絡すら来ない。約束を守るのは天気が味方した日だけ。相手が「たまには家でゆっくりしたい」と言った時、「じゃあひとりで行くわ」と返して本当に行ったでしょ。付き合ってるのに単独行動が多すぎて、「私はオプション?」と聞かれたこと、絶対ある。集合時間の5分前には必ず着いてるのに、相手が3分遅れると無言でストップウォッチを見せる癖、あれは注意じゃなくて威圧。旅先で相手が「この店入ってみたい」と言っても「ルートに入ってない」で却下して、帰宅後に「今日は楽しかったね」と一人で総括するのもお決まり。規律正しいのは長所だけど、その規律の中に相手の席が用意されてない。', punchline: '記念日も雨天中止。「来年晴れたらやるね」の来年は、まだ来ていない。' },
    ISFJ: { name: '甘えん坊系押しかけハムスター', blurb: 'アポなしで相手の家に差し入れを持って現れるの、優しさじゃなくて奇襲。「近く通ったから」は嘘で、電車で40分かけて来てる。相手の「今日はひとりでいたい」を「体調悪いの?」に翻訳して居座るから、「ありがたいけど息が詰まる」と一度は言われたはず。世話を焼くことで自分の居場所を確保してるの、バレてるよ。相手が「ありがとう」を言い忘れた日は翌日のLINEが妙に短くなって、「何かあった?」と聞かれると「何もないよ」。何もなくないでしょ。しかも頼まれてない部屋の片付けまで始めて、相手が探し物をするたび「私に聞けばわかるよ」と得意げになるの、便利さと支配の境目が消えてる。断られるのが怖くて先に差し出す癖、そろそろ「欲しい?」と聞いてから動いて。', punchline: '相手の冷蔵庫の中身、本人より把握してる。合鍵はまだもらってないのに。' },
    INFJ: { name: 'ミステリアス系3日蒸発クロネコ', blurb: '「ちょっと出てくる」から3日音信不通、戻ってきて「考えごとしてた」の一言で済ませようとするの、ミステリアスじゃなくてただの失踪。相手が心配して問い詰めたら「察してほしかった」。霧の中の気持ちを察せる人はいない。「あなたのこと何も知らない気がする」と別れ際に言われたの、一回じゃないでしょ。相手の悩みは深夜まで聞いて的確に言い当てるのに、自分の話になると「大丈夫」の一言でシャッターを閉める。その非対称、相手からすれば一方的にカウンセリングされてるだけ。しかも自分の中で結論が出た瞬間、相談ゼロで「距離を置きたい」と切り出すから、相手は前日まで幸せだったのに翌日には終わってる。深いつながりを求めてるのに、深く入られるのは拒む。その矛盾に気づいてるのは、たぶんあなただけ。', punchline: '深夜のバイクで行った先を聞くと「海」。どこの海かは、永遠に教えてくれない。' },
    INTJ: { name: '策士系全部シナリオ通りフクロウ', blurb: '「どこでもいいよ」と言われた0.5秒後に店名を即答するの、聞いてるフリすら省略してる。デートは無計画に見えて実は全部あなたのシナリオ通りで、相手はいつも助手席。静かに全部決めていくその圧、「私の意見いつ聞いた?」って喧嘩になったよね。しかも反論されると黙って別ルートに変えるから、なお怖い。相手が「ここ良さそう」と出した候補を「レビュー3.2だよ」の一言で沈めたこと、数え切れないでしょ。効率で人の気持ちは動かないのに、記念日プランまで表にして比較検討して、相手の「そういうのじゃない」に本気で首をかしげてる。相手が泣いた日も「何が最適解か」を考えて黙り込むから、無言が冷たさに見えてる。感情論と切り捨てたその「感情」が恋愛の本体だって、いつ気づくの。', punchline: '旅先で道に迷っても「想定内」。想定外なのは、相手が怒ってることだけ。' },
    ISTP: { name: 'クール系月イチ気分屋キツネ', blurb: '連絡は月イチ、既読は気分次第。相手が寂しいと言えば「重い」と距離を取るくせに、相手の連絡が同じく月イチになった瞬間、急に「最近冷たくない?」と拗ねる。追われるのは嫌、追われないのも嫌。この二段構えの面倒くささ、元恋人に「結局どうしてほしいの」と聞かれて、答えられなかったでしょ。「今何してる?」に「別に」、「会いたい」に「そのうち」、返事が全部二文字前後で会話が成立しない。なのに相手が友達と楽しそうな写真を上げた夜だけ、なぜか通知より早く既読がつく。会えば無口でも居心地はいいから、相手は「たぶん好かれてる」と信じて待ち続けてる。その信頼残高を、月イチの気まぐれで使い切ってることに気づいて。', punchline: '「自由でいたい」と言った翌週、相手のインスタを一番見てるのはあなた。' },
    ISFP: { name: '繊細ゴースト系そっと消える小鹿', blurb: '傷ついても言葉にせず、ある日そっといなくなるフェードアウト型。相手は何が悪かったか永遠に知らされず、あなただけがひとり旅で癒されてる。「言ってくれれば直したのに」は元恋人の共通セリフでしょ。喧嘩を避けたつもりでも、黙って消えるのは一番残酷な喧嘩の売り方だって、そろそろ気づいて。何気ない一言に傷ついた日、その場では笑って流して、家に帰ってスケッチブックに黒い絵を描いてる。相手が「今日どうだった?」と聞いても「楽しかったよ」。その「楽しかった」が3ヶ月分積み上がった後で、突然の「ごめん、もう無理」。相手にとってはノーヒントの不合格通知。感受性が豊かなのは武器なのに、傷を伝える言葉だけ持たずに旅立つの、いつまで続けるの。', punchline: '別れの理由を聞かれて「なんとなく」。その旅の写真だけは、やけに枚数が多い。' },
    INFP: { name: '匂わせ系元恋人美化ハリネズミ', blurb: '夕焼けを見るたび「あの頃」を思い出して勝手に泣くけど、その「あの頃」の8割は元恋人との思い出。しかもそれを匂わせポエムでSNSに投稿するから、今の相手がスクロールして固まってる。過去を美化して現在と比べる癖、「私は思い出の代用品?」と言われたこと、あるよね。旅に出るのはいいけど、逃げ先に過去を選ぶのはやめて。今の相手が優しくしてくれても「あの人もそうだった」と心の中で照合してるから、素直に喜べていない。プレイリストには元恋人と聴いた曲がそのまま残っていて、車で流れた瞬間に無言になるのも、隣の人は全部気づいてる。「理想の恋」を描くのが好きなだけで目の前の人を見てない、と言われても、たぶん否定できないでしょ。', punchline: '旅先の絶景で泣いた理由を聞かれ「景色がきれいで」。嘘。流れてた曲が元恋人の好きな曲だった。' },
    INTP: { name: '理屈屋系スペック表返しペンギン', blurb: '相手が泣いてる横で「それ、論理的には何が問題?」と聞いた事件、忘れてないよね。感情の話にスペック表で返すから、「話が通じない」と何度も言われてる。新しいガジェットが届いた日はデートより開封が優先で、「私とスマホどっちが大事」に本気で3秒考えたのが致命傷。手先は器用なのに、相手の心だけ組み立て方がわからない。「今日は疲れた」と言われて「睡眠時間は?」と原因分析を始めるの、求められてるのは解決じゃなくて共感。デート中に気になる仕組みを見つけると、相手の話を聞き流したまま調べ始めて、10分後に「で、何の話だった?」で戻ってくる。しかも自分では「ちゃんと聞いてた」と思ってるのが厄介。人間には仕様書がないから面倒、って言いかけたその口、そろそろ閉じよう。', punchline: '記念日のプレゼントは自作の便利ツール。「欲しいって言ったっけ?」に、まだ返せていない。' },
    ESTP: { name: 'ワンチャン系深夜呼び出しトラ', blurb: '深夜2時に「今から来れる?」を送って、来たら全力で楽しませて、翌週は音信不通。相手の予定を雷みたいに吹き飛ばして、自分の予定は一切動かさない。「都合いい時だけ現れる」と言われたことがあるのは確定で、そのとき「そんなことないよ」と言いながら次に会ったのが1ヶ月後なのも確定。会えば最高、会えなきゃ最低の落差、正直しんどい。「来週の土曜空けといて」と言った本人が、当日昼に「ごめん急に予定入った」を送ってくるのも常習。相手が「先に約束してたよね」と言えば「なんで怒ってるの?」と本気で不思議がる。将来の話を振られると急にトイレに立つのも、もう気づかれてる。刺激を追いかける分だけ、相手が安心できる時間はゼロ。夕立は気持ちいいけど、住める天気じゃない。', punchline: '「一生忘れない夜」を年に何回も作って、相手の誕生日だけ本当に忘れる。' },
    ESFP: { name: '天然系デートに友達呼ぶイルカ', blurb: '二人きりのデートに「盛り上がるから」と友達を呼ぶの、相手にとっては公開処刑。「二人で過ごしたい」を「みんなの方が楽しいじゃん」で返すたび、恋人はパーティ参加者の一人に格下げされてる。ノリの良さは最高だけど、静かな夜が耐えられなくて予定を詰め込む癖、「私とじゃ物足りないの?」って泣かせたことあるでしょ。相手が真面目な相談を始めると、5分で「まあ何とかなるよ、飲み行こ」と切り上げて、話を聞いたつもりになってる。恋人との内輪の失敗談を飲み会でネタにして、その場は盛り上がったけど帰り道が無言だった夜、あったよね。明るさで全部押し切れると思ってるけど、相手が欲しいのは観客席のチケットじゃなくて、あなたの隣の特等席。', punchline: '記念日ディナーの写真、全員ピースしてて誰が恋人かわからない。' },
    ENFP: { name: '沼落ち系3日で運命の人リス', blurb: '出会って3日で「運命の人」、1ヶ月で興味が次へ。にわか雨みたいな全力の愛情は嬉しいけど、止むのも早すぎて相手は傘を出す暇もない。「運命」の更新頻度が年3回なの、自分でも気づいてるでしょ。別れた相手に「私のこと本当に好きだった?」と聞かれて、本気で「うん、あの時は」と答えたの、正直ひどい。付き合った初週は毎日長文メッセージと「今から会いたい」の連打、3週目には返信の間隔が半日、1ヶ月後には相手からのメッセージが「元気?」だけになってる。しかも冷めた自覚がなくて「なんか最近合わないかも」と相手側の問題にすり替える。新しい趣味も新しい人も、始めるのは最速なのに続けるのは最短。次の「運命」に会う前に、今の人の誕生日、ちゃんと覚えてる?', punchline: '「一緒に世界一周しよう」の約束、パスポート申請の前に相手が変わっている。' },
    ENTP: { name: 'ドS系デートまで添削オウム', blurb: 'デート中の何気ない一言を拾って論破し始めるの、相手は議論を申し込んでない。「議論が楽しい」のはあなた一人で、相手は「なんで今それ?」しか思ってない。「別に勝ちたいわけじゃない」と言いながら最後にもう一言足して勝ちに行く癖、「あなたと話すと疲れる」と言われたこと、一度で済んでないでしょ。相手が「この映画泣けた」と言えば「でも設定に矛盾あったよね」、「この店美味しい」と言えば「あそこの方がコスパいい」。感想を言うたび添削されるから、相手はもう何も言わなくなってる。それを「最近会話がつまらなくなった」と評してるの、原因は鏡の中。しかも相手が本気で怒ると「冗談だったのに」で逃げるから、負けを認めたことが一度もない。喋りは一流でも、聞くのは補欠。', punchline: 'ケンカで謝った3秒後に「でも論理的にはね」を足して、謝罪を無効にする。' },
    ESTJ: { name: '仕切り屋系全部予約済みビーバー', blurb: '旅行の計画、相手に相談するフリして予約もルートも全部自分で確定済み。相手が5分遅れたら「時間守れないの?」で朝からムード終了。頼れるのは事実だけど、相手は「一緒に楽しんでる」というより「連れ回されてる」感覚で、「私は荷物じゃない」と言われたはず。しかも言い返されると「じゃあ自分で決めてよ」と拗ねるの、面倒くさい。相手の部屋の収納を「効率悪い」と勝手に並べ替えて、感謝されると思ってたら喧嘩になった件、覚えてる? 相手が友達の愚痴を話し始めても「じゃあこうすれば」と3秒で解決策を出して、「聞いてほしかっただけ」と言われて黙る。予定表にない寄り道を「非効率」で切り捨てて、相手が一番楽しみにしてた店を素通りしたのも一度じゃない。仕切る力は一流なのに、隣を歩く力だけ未習得。', punchline: '記念日は完璧に段取りするけど、相手の「今日は何もしたくない」は予定外なので却下。' },
    ESFJ: { name: '外面天使系恋人に塩コアラ', blurb: '恋人より友達の集まりを優先して、「みんなが呼んでるから」を免罪符にする常習犯。外では誰にでも優しい癒しキャラなのに、その分の疲れと不機嫌は恋人の前だけで解放するから、恋人にとってあなたは木漏れ日じゃなくて日陰。「私だけ後回しだよね」と言われて、「そんなつもりじゃない」で流したの、何回目? 二人の予定を組んでいたのに、友達から「来れる?」の一言が来た瞬間に「ちょっとだけ顔出していい?」と聞いて、結局最後まで居座って終電。翌日の埋め合わせデートでは、その集まりの話で1時間潰してる。しかも自分が疲れてる日は恋人の些細な言葉に「なんでそんな言い方するの」と当たるのに、外の人には絶対その顔を見せない。優しさの総量は多いのに、恋人への配分だけが常に最下位。', punchline: '恋人の誕生日にサークルの飲み会を入れて、「後で埋め合わせする」の後は来ない。' },
    ENFJ: { name: '小悪魔系全方位優しいアルパカ', blurb: '恋人がいるのに全方位に優しくて、勘違いした人を量産してる。「みんなの推し」でいたい欲が強すぎて、恋人からの「あの子と何?」の詰問が定期イベント化。悪気はないのが一番厄介で、「勘違いさせる才能」を無自覚に振り回してる。「私だけを見て」と言われて「みんな大事なんだよ」と返したの、あれは事故じゃなくて事件。SNSのコメント欄で誰にでも「いつもありがとう、大好き」を返してるの、恋人は毎回スクロールして見てる。相談されると断れなくて、元恋人の悩みまで深夜の電話で聞いて、今の相手に「ただの相談だよ」と言い切ったの、その言葉を信じられる人はいない。「あなたが必要」と言われることに中毒になってて、恋人一人では供給が足りてない。推しは全員に平等でいいけど、恋人は一人にだけ特別なものだよ。', punchline: '二人のデート先で知り合いに遭遇、気づけば5人で遊んでる。恋人の顔は見ていない。' },
    ENTJ: { name: 'ドS系恋の悩みも即結論ライオン', blurb: 'デートも旅行も「ついてこい」の一本調子で、相手の「ちょっと疲れた」は聞こえてない設定。行動力は圧倒的だけど、相手を巻き込んでるんじゃなく引きずってるだけ。「相談じゃなくて報告だよね」と言われたことがあるはずで、そのときも「決めた方が早いじゃん」で押し切った。あなたの恋人、自分の意見を言うのを諦めてるかもよ。相手が「悩んでる」と言えば、話を聞き終わる前に「じゃあこうしよう」と結論を出して、翌日には進捗を聞いてくる。恋人の悩みはプロジェクトじゃない。しかも相手が弱音を吐くと「そんなの気にしなくていい」と一蹴するから、弱い部分を見せられなくなってる。「一緒にいると成長できる」と言われるけど、それは恋人の感想じゃなくて部下の感想。ジェットスキーの後ろに人が乗ってることを、時々でいいから思い出して。', punchline: '相手が「行きたくない」と言った場所で、一番楽しんでいるのはあなた。' },
  },
};

// 気質グループの出現率(既存のTYPE_RARITY、16タイプ別の参考値をグループ単位で合算しただけ、新規調査なし)。
// 「そこ!?」の驚き要素として、恋愛キャラカードに一言添える(2026-09-05追加)。
function getGroupRarity(groupKey) {
  return Object.keys(TEMPERAMENT)
    .filter((code) => TEMPERAMENT[code] === groupKey)
    .reduce((sum, code) => sum + (TYPE_RARITY[code] || 0), 0);
}

// ===== 五行(占い要素)とラッキーアイテム =====
// MBTIタイプごとの五行属性(3つのマップ全てで共通の属性を使用)
const TYPE_ELEMENT = {
  ISTJ: '土', ISFJ: '土', ESFJ: '土',
  INFJ: '水', ESFP: '水', ENTP: '水',
  INTJ: '金', ISTP: '金', INTP: '金',
  ISFP: '木', INFP: '木', ENFP: '木', ENFJ: '木',
  ESTP: '火', ESTJ: '火', ENTJ: '火',
};

// 2026-09-02追加: MBTI人口分布としてよく引用される一般的な出現率(米国調査ベースの目安値、
// 診断結果の「レア度」演出用)。この診断独自の集計値ではなく、あくまで参考値として表示する。
const TYPE_RARITY = {
  ISFJ: 13.8, ESFJ: 12.3, ISTJ: 11.6, ISFP: 8.8, ESTJ: 8.7, ESFP: 8.5,
  ENFP: 8.1, ISTP: 5.4, INFP: 4.4, ESTP: 4.3, INTP: 3.3, ENTP: 3.2,
  ENFJ: 2.5, INTJ: 2.1, ENTJ: 1.8, INFJ: 1.5,
};

// 性格タイプ(ANIMAL_MAP)の結果文中で言及される「ラッキーカラー」と一致させる
// (このカラー名は結果文には出るが、これまでAmazon検索キーワードには反映されていなかった)
const ELEMENT_COLOR = { '木': '若草色', '火': '朱色', '土': '黄土色', '金': '白金色', '水': '藍色' };
const ELEMENT_COLOR_EN = { '木': 'moss green', '火': 'vermillion', '土': 'ochre', '金': 'platinum', '水': 'indigo' };

// 2026-08-15: 診断結果の文章とラッキーアイテムのリンクが唐突に見える(何のつながりもない)という
// ユーザー目線レビューでの指摘への対応。商品名には触れず、カテゴリ×五行属性(15パターン)の
// 気質に合わせた一言だけを結果文とアイテムリンクの間に挟む(Fable執筆)。
const LUCKY_BRIDGE = {
  personality: {
    '木': '誰かを気づかう毎日の合間に、自分の心にも水をやる小さな贈り物を。',
    '火': '全速力で駆けるあなたの毎日に、一瞬だけ足を止めたくなるご褒美を。',
    '土': '使い込んだ定番を愛するあなたの棚に、次の定番候補をひとつ。',
    '金': '細部まで妥協しないその審美眼に、あえて試してほしい一品があります。',
    '水': '今日のひらめきの続きは、思いがけない小さな出会いから始まるかもしれません。',
  },
  love: {
    '木': '相手の気持ちを先に考えるあなたへ、たまには自分を甘やかす口実を。',
    '火': 'まっすぐな愛情表現のあなたなら、想いはこんな形にしても伝わります。',
    '土': '言葉より積み重ねで愛を示すあなたの日常に、ささやかな彩りをひとつ。',
    '金': '多くを語らないあなたの代わりに、センスが語ってくれる贈り物もあります。',
    '水': '型にはまらない二人の関係には、誰も予想しない小さなサプライズを。',
  },
  work: {
    '木': '人を育て、支えるあなたこそ、頑張った自分をねぎらう時間とご褒美を。',
    '火': '走り続けるあなたのデスクに、次の一歩を後押しする小さな相棒を。',
    '土': 'コツコツ積み上げた一日の終わりには、確かな品質のご褒美がよく似合います。',
    '金': '道具にこだわる人ほど、仕事は磨かれる。あなたの基準に挑むプチギフトを。',
    '水': '発想の泉にも、ときどき補給を。机の上に小さな遊び心をひとつ。',
  },
};
const LUCKY_BRIDGE_EN = {
  personality: {
    '木': 'You spend so much of each day caring for everyone else — maybe today, a small treat can be the one thing that is just for you.',
    '火': 'You move through life at full speed, so here is a little reward worth slowing down for, even if only for a moment.',
    '土': 'You love the things that have earned their place through years of use — perhaps this small find could become your next well-worn favorite.',
    '金': 'Your eye for detail rarely lets anything slide, so consider this a little something chosen to stand up to your standards.',
    '水': 'Your best ideas tend to arrive from unexpected places — and sometimes a small surprise is exactly where the next one begins.',
  },
  love: {
    '木': "You always put your partner's feelings first, so let this be your gentle excuse to spoil yourself a little today.",
    '火': 'Your love is bold and direct, and when words are not quite enough, a small gift can carry that straightforward warmth just as well.',
    '土': 'You show love through steady, everyday devotion — one small addition to that shared routine might say more than any grand gesture.',
    '金': 'You are not one for saying much out loud, but a thoughtfully chosen little gift can speak with all the taste you carry quietly.',
    '水': "Your relationship has never followed anyone else's script, so why not add one more small, delightful surprise nobody saw coming?",
  },
  work: {
    '木': 'You spend your working hours helping others grow — today, let a small reward remind you that your own effort deserves tending, too.',
    '火': 'You never stop moving, so give your desk a tiny companion that cheers you on toward whatever comes next.',
    '土': 'You build your work brick by steady brick — at the end of a day like that, you have earned a treat of dependable quality.',
    '金': 'People who care about their tools tend to do sharper work — here is a little something bold enough to face your exacting standards.',
    '水': 'Even a wellspring of ideas needs refilling now and then, so keep a small spark of playfulness within arm’s reach of your desk.',
  },
};
function getLuckyBridge() { return LANG === 'en' ? LUCKY_BRIDGE_EN : LUCKY_BRIDGE; }

// 2026-08-15: ラッキーアイテムのカードが絵文字のみで「何の商品か」が視覚的に伝わりにくい
// というユーザー目線レビューの指摘への対応。90件それぞれの実商品写真ではなく、
// Midjourney生成のパステル系アイコンイラスト(9カテゴリ、img/lucky-icons/)で代替する
// 低コスト案(実商品との齟齬が起きない・保守が軽い)。全40種の絵文字を9カテゴリに集約。
const LUCKY_ICON_MAP = {
  '🪴': 'plant', '🌸': 'plant', '🌱': 'plant', '🌵': 'plant',
  '🌿': 'bath', '🛁': 'bath', '🍫': 'bath', '🫧': 'bath',
  '🍀': 'candle', '🕯️': 'candle',
  '💄': 'cosmetics', '💋': 'cosmetics', '💦': 'cosmetics', '💧': 'cosmetics', '💅': 'cosmetics',
  '👛': 'pouch', '👝': 'pouch', '🧸': 'pouch',
  '☕': 'mug', '🍵': 'mug', '🍶': 'mug', '🥤': 'mug', '🫖': 'mug',
  '🧦': 'textile', '🧺': 'textile', '🧣': 'textile',
  '💼': 'jewelry', '💍': 'jewelry', '✨': 'jewelry', '💫': 'jewelry', '🌟': 'jewelry',
  '🖼️': 'stationery', '🗂️': 'stationery', '📱': 'stationery', '🪞': 'stationery',
  '🎀': 'stationery', '🖊️': 'stationery', '📔': 'stationery', '🖇️': 'stationery', '🖋️': 'stationery',
};

// アフィリエイトタグ未設定の間は通常の商品検索リンクとして機能する
// AFFILIATE_TAG: Amazonアソシエイト(日本, amazon.co.jp用)。取得済み(2026-08-10)
// AFFILIATE_TAG_EN: Amazon Associates(US, amazon.com用)。国ごとに別プログラムのため、
// 日本のタグはamazon.comには使えない。US版を取得したらここに設定してください
const AFFILIATE_TAG = 'tinywonders-22';
const AFFILIATE_TAG_EN = ''; // 例: 'yourtag-20'

// カテゴリ×五行属性でラッキーアイテムを分ける(同じ属性が複数カテゴリで重なっても被らないように)
// 2026-08-15改訂: ターゲット(女性)に対して価格帯が高すぎる・トレンド訴求が弱い品目を、
// 女性人気×低価格帯(概ね¥1,000〜3,000)のものに入れ替えた(元は香水・アロマディフューザー・
// 光目覚まし時計・「高級」文房具セットなど単価が上がりやすい/女性向け訴求が弱い品目が混在していた)。
// 2026-08-15追記: 各属性を単一アイテムから3候補の配列に変更、結果画面を表示するたびランダムに
// 1つ選ぶ(pickLuckyItem)ようにした。属性そのものはMBTIタイプで決定的に決まる(五行の文脈を維持)、
// ランダムなのはその属性内でどのアイテムが出るか、という2段構成。
// 2026-08-15再改訂: 「プチプラ」という願望頼みのキーワードをやめ、価格帯・レビュー順はURL側
// (affiliateUrl)で強制するように変更。品目自体もPerplexity調査(20〜30代女性への1000〜3000円
// ギフトで人気の5大ジャンル: 美容・コスメ/文房具・雑貨/バスグッズ・リラックス/アロマ/お菓子。
// 「自分では買わないけどもらうと嬉しいプチ贅沢感」が鍵、デパコスミニ・波佐見焼・今治タオル・
// KINTOのような具体的トレンドワードが有効)に基づいて選定し直した。
const LUCKY_ITEM_MAP = {
  personality: {
    '木': [
      { emoji: '🪴', name: '観葉植物', keyword: '観葉植物 卓上 ミニ' },
      { emoji: '🌿', name: 'ハンドクリームギフト', keyword: 'ハンドクリーム ギフト' },
      { emoji: '🍀', name: 'アロマキャンドル', keyword: 'アロマキャンドル ギフト' },
    ],
    '火': [
      { emoji: '💄', name: 'デパコスミニリップ', keyword: 'デパコス ミニ リップ' },
      { emoji: '💋', name: 'チーク', keyword: 'チーク 頬紅 デパコス' },
      { emoji: '👛', name: 'ミニポーチ', keyword: 'ミニポーチ 可愛い' },
    ],
    '土': [
      { emoji: '☕', name: '波佐見焼マグカップ', keyword: 'マグカップ 波佐見焼' },
      { emoji: '🧦', name: 'あったかルームソックス', keyword: 'ルームソックス 可愛い' },
      { emoji: '🧺', name: '今治タオル', keyword: '今治タオル ギフト' },
    ],
    '金': [
      { emoji: '💼', name: 'コスメのコフレギフト', keyword: 'コスメ コフレ ギフト' },
      { emoji: '💍', name: 'ピアス・イヤリング', keyword: 'ピアス レディース' },
      { emoji: '👛', name: 'コインケース', keyword: 'コインケース レディース' },
    ],
    '水': [
      { emoji: '💦', name: 'フェイスミスト', keyword: 'フェイスミスト 保湿' },
      { emoji: '🛁', name: 'バスソルトギフトセット', keyword: 'バスソルト ギフトセット' },
      { emoji: '💧', name: 'リップオイル', keyword: 'リップオイル デパコス' },
    ],
  },
  love: {
    '木': [
      { emoji: '🍵', name: '紅茶ギフトセット', keyword: '紅茶 ギフトセット' },
      { emoji: '🍫', name: 'ちょっと贅沢なチョコレート', keyword: 'チョコレート ギフト 高級' },
      { emoji: '🌸', name: 'ミニプリザーブドフラワー', keyword: 'プリザーブドフラワー ミニ' },
    ],
    '火': [
      { emoji: '💅', name: '赤いネイルポリッシュ', keyword: 'ネイルポリッシュ レッド' },
      { emoji: '💄', name: 'レッドのティントリップ', keyword: 'ティントリップ レッド' },
      { emoji: '👝', name: 'レッドのミニポーチ', keyword: 'ポーチ レッド' },
    ],
    '土': [
      { emoji: '🍶', name: '波佐見焼ペアマグカップ', keyword: 'ペアマグカップ 波佐見焼' },
      { emoji: '🧸', name: 'ペアキーホルダー', keyword: 'ペアキーホルダー カップル ハート' },
      { emoji: '🧦', name: 'ペアソックス', keyword: 'カップルソックス お揃い' },
    ],
    '金': [
      { emoji: '✨', name: 'シルバー・ゴールドのネックレス', keyword: 'ネックレス レディース シンプル 華奢' },
      { emoji: '💫', name: 'ブレスレット', keyword: 'ブレスレット レディース シンプル' },
      { emoji: '🌟', name: 'リング', keyword: 'リング レディース シンプル' },
    ],
    '水': [
      { emoji: '🥤', name: 'おしゃれなタンブラー', keyword: 'ガラスタンブラー おしゃれ ギフト' },
      { emoji: '🫧', name: '入浴剤ギフトセット', keyword: '入浴剤 ギフトセット' },
      { emoji: '🧣', name: 'ミニスカーフ', keyword: 'スカーフ レディース おしゃれ 小さめ' },
    ],
  },
  work: {
    '木': [
      { emoji: '🌱', name: 'デスク用ミニ観葉植物', keyword: 'デスク 観葉植物 ミニ' },
      { emoji: '🌵', name: 'ミニ多肉植物', keyword: '多肉植物 デスク ミニ' },
      { emoji: '🖼️', name: '卓上フォトフレーム', keyword: 'フォトフレーム おしゃれ ゴールド 卓上' },
    ],
    '火': [
      { emoji: '🕯️', name: 'デスク用アロマストーン', keyword: 'アロマストーン デスク' },
      { emoji: '☕', name: '保温マグカップ', keyword: '保温マグカップ おしゃれ' },
      { emoji: '🧣', name: 'オフィス用ひざ掛け', keyword: 'ひざ掛け オフィス' },
    ],
    '土': [
      { emoji: '🗂️', name: 'デスクオーガナイザー', keyword: 'デスク収納 おしゃれ かわいい' },
      { emoji: '📱', name: 'おしゃれなスマホスタンド', keyword: 'スマホスタンド おしゃれ' },
      { emoji: '🪞', name: 'おしゃれな卓上ミラー', keyword: '卓上ミラー おしゃれ' },
    ],
    '金': [
      { emoji: '🎀', name: 'おしゃれなマスキングテープセット', keyword: 'マスキングテープ セット おしゃれ' },
      { emoji: '🖊️', name: 'おしゃれなボールペン', keyword: 'ボールペン おしゃれ ギフト' },
      { emoji: '📔', name: 'おしゃれな手帳', keyword: '手帳 おしゃれ' },
    ],
    '水': [
      { emoji: '🍶', name: 'KINTOの水筒', keyword: 'KINTO 水筒' },
      { emoji: '🫖', name: '保冷保温マイボトル', keyword: 'マイボトル 保冷保温' },
      { emoji: '🍵', name: '水出し茶ボトル', keyword: '水出し茶 ボトル おしゃれ' },
    ],
  },
};

// 英語版: 要素名の英訳とラッキーアイテム(Amazon.com向けキーワード)
const ELEMENT_NAME_EN = { '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water' };
const LUCKY_ITEM_MAP_EN = {
  personality: {
    '木': [
      { emoji: '🪴', name: 'a small potted plant', keyword: 'small desk plant' },
      { emoji: '🌿', name: 'a hand cream', keyword: 'hand cream moisturizing affordable' },
      { emoji: '🍀', name: 'a mini aroma candle', keyword: 'mini aroma candle affordable' },
    ],
    '火': [
      { emoji: '💄', name: 'a tinted lip balm', keyword: 'tinted lip balm affordable' },
      { emoji: '💋', name: 'a cream blush', keyword: 'cream blush affordable' },
      { emoji: '👛', name: 'a cute mini pouch', keyword: 'cute mini pouch affordable' },
    ],
    '土': [
      { emoji: '☕', name: 'a cute ceramic mug', keyword: 'cute ceramic mug affordable' },
      { emoji: '🧦', name: 'cozy room socks', keyword: 'cozy room socks cute' },
      { emoji: '🧺', name: 'a fabric storage box', keyword: 'small fabric storage basket cute gift' },
    ],
    '金': [
      { emoji: '💼', name: 'a jewelry case', keyword: 'jewelry case accessory affordable' },
      { emoji: '💍', name: 'earrings', keyword: 'earrings women affordable' },
      { emoji: '👛', name: 'a coin purse', keyword: 'coin purse women affordable' },
    ],
    '水': [
      { emoji: '💦', name: 'a hydrating face mist', keyword: 'hydrating face mist' },
      { emoji: '🛁', name: 'bath salts', keyword: 'bath salts gift affordable' },
      { emoji: '💧', name: 'a lip oil', keyword: 'lip oil moisturizing affordable' },
    ],
  },
  love: {
    '木': [
      { emoji: '🍵', name: 'a herbal tea gift set', keyword: 'herbal tea gift set' },
      { emoji: '🍫', name: 'a nice box of chocolates', keyword: 'chocolate gift box' },
      { emoji: '🌸', name: 'a mini preserved flower', keyword: 'mini preserved flower affordable' },
    ],
    '火': [
      { emoji: '💅', name: 'a red nail polish', keyword: 'red nail polish affordable' },
      { emoji: '💄', name: 'a red tinted lip', keyword: 'red tinted lip affordable' },
      { emoji: '👝', name: 'a red mini pouch', keyword: 'red mini pouch affordable' },
    ],
    '土': [
      { emoji: '🍶', name: 'matching couple mugs', keyword: 'matching couple mugs' },
      { emoji: '🧸', name: 'matching keychains', keyword: 'matching couple keychains affordable' },
      { emoji: '🧦', name: 'matching socks', keyword: 'matching couple socks affordable' },
    ],
    '金': [
      { emoji: '✨', name: 'an affordable necklace', keyword: 'simple necklace women gift' },
      { emoji: '💫', name: 'a bracelet', keyword: 'bracelet women affordable' },
      { emoji: '🌟', name: 'a ring', keyword: 'ring women affordable' },
    ],
    '水': [
      { emoji: '🥤', name: 'a stylish tumbler', keyword: 'stylish tumbler' },
      { emoji: '🫧', name: 'bath bombs', keyword: 'bath bombs gift set for women' },
      { emoji: '🧣', name: 'a mini scarf', keyword: 'mini scarf affordable' },
    ],
  },
  work: {
    '木': [
      { emoji: '🌱', name: 'a small desk plant', keyword: 'small desk plant' },
      { emoji: '🌵', name: 'a mini succulent', keyword: 'mini succulent desk' },
      { emoji: '🖼️', name: 'a small desk photo frame', keyword: 'small desk photo frame cute' },
    ],
    '火': [
      { emoji: '🕯️', name: 'a desk aroma stone', keyword: 'aroma stone desk no electricity' },
      { emoji: '☕', name: 'an insulated mug', keyword: 'insulated mug cute affordable' },
      { emoji: '🧣', name: 'a small office blanket', keyword: 'small lap blanket desk cute' },
    ],
    '土': [
      { emoji: '🗂️', name: 'a desk organizer', keyword: 'desk organizer' },
      { emoji: '📱', name: 'a cute phone stand', keyword: 'cute desk phone holder pink' },
      { emoji: '🖇️', name: 'a sticky note and clip set', keyword: 'cute sticky note clip set' },
    ],
    '金': [
      { emoji: '🖋️', name: 'a cute stationery set', keyword: 'cute stationery gift set affordable' },
      { emoji: '🖊️', name: 'a cute ballpoint pen', keyword: 'cute ballpoint pen affordable' },
      { emoji: '📔', name: 'a stylish notebook', keyword: 'stylish notebook affordable' },
    ],
    '水': [
      { emoji: '🍶', name: 'a stylish water bottle', keyword: 'stylish water bottle tumbler' },
      { emoji: '🫖', name: 'an insulated bottle', keyword: 'insulated water bottle affordable' },
      { emoji: '🍵', name: 'a cold-brew tea bottle', keyword: 'cold brew tea bottle stylish' },
    ],
  },
};

// 属性(五行)自体はMBTIタイプで決定的に決まるが、その属性内のどのアイテムを見せるかは
// 結果画面を表示するたびランダムに選ぶ(同じ属性でも毎回同じ商品にならないようにするため)。
function pickLuckyItem(luckyMap, block, element) {
  const candidates = luckyMap[block][element];
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// 2026-08-15: 「プチプラ」等のキーワードだけでは価格帯や品質を保証できず、Amazon検索結果が
// 何を返すかは運任せだったため、URLパラメータで価格帯を実際に強制するよう変更。
// JA(amazon.co.jp): rh=p_36:100000-300000 は¥1,000〜¥3,000(100倍した整数で指定する仕様)、
// s=review-rank はレビュー評価の高い順ソート。実際にamazon.co.jpで動作確認済み。
// EN(amazon.com): rh=p_36:1000-3000 は$10〜$30(セント単位)相当、実機で動作確認済み。
// ただしEN側にs=review-rankを付けると、ジュエリー等で遺灰・追悼(cremation)アイテムのような
// 特定ニッチカテゴリがレビュー数で上位を独占してしまう副作用を実地で確認したため、
// EN側は価格帯フィルタのみ適用しソートは既定(関連度順)のままにする。
function affiliateUrl(keyword) {
  const domain = LANG === 'en' ? 'www.amazon.com' : 'www.amazon.co.jp';
  let base = `https://${domain}/s?k=${encodeURIComponent(keyword)}`;
  if (LANG === 'en') {
    base += '&rh=p_36%3A1000-3000';
  } else {
    base += '&rh=p_36%3A100000-300000&s=review-rank';
  }
  const tag = LANG === 'en' ? AFFILIATE_TAG_EN : AFFILIATE_TAG;
  return tag ? `${base}&tag=${encodeURIComponent(tag)}` : base;
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
    pageTitle: 'MBTI性格・恋愛・仕事タイプ診断',
    pageDescription: 'AIとチャットするだけの3分診断。性格・恋愛・仕事でタイプが変わるかも?動物・天気・乗り物にたとえてお届けします。',
    eyebrow: 'FREE PERSONALITY TEST',
    titleHtml: 'あなたの<span class="grad-text">3つの顔</span>、診断します',
    lead: 'AIとチャットしながら答えるだけの、MBTIベースの診断。<br>「性格」「恋愛」「仕事」でタイプが変わる、<br>ちょっと不思議な診断です。',
    badges: ['🐢 動物', '☀️ 天気', '🚃 乗り物', '🪄 でたとえます'],
    startBtn: '診断をはじめる ✨',
    sub: '全30問・所要時間 約3分',
    resultEyebrow: 'RESULT',
    resultTitleHtml: '診断結果 <span class="grad-text">できました</span>',
    shareBtn: '結果をXでシェア 🚀',
    restartBtn: 'もう一度診断する',
    restartBtnFirstVisit: '自分も診断してみる ✨',
    luckyLabel: '🍀 今日のラッキーアイテム',
    prTag: '広告',
    luckyPriceHint: '¥1,000〜3,000で買えるプチギフト',
    luckySeeMore: (name) => `${name}を見てみる`,
    mbtiElementLine: (type, element) => `MBTI: ${type} ・ 五行: ${element}`,
    catLine: (catName, mapName) => `${catName}(${mapName}にたとえると)`,
    rarityLine: (pct) => `✨ 出現率 約${pct}%(参考値)`,
    shareText: (p, l, w) => `性格・恋愛・仕事タイプ診断やってみた!\n性格: ${p} / 恋愛: ${l} / 仕事: ${w}\nあなたのタイプもチェック→\n※エンタメ目的の診断です\n#性格診断 #MBTI診断`,
    lineBtn: 'LINEでシェア',
    copyUrlBtn: '結果URLをコピー 🔗',
    copiedLabel: 'コピーしました ✓',
    saveCardBtn: '結果カードを保存 🖼️',
    saveCardStoryBtn: 'ストーリーズ用に保存 📱',
    generatingLabel: '生成中…',
    cardEyebrow: 'わたしの3つのタイプ',
    cardCta: 'あなたは何タイプ？ 無料3分診断',
    cardBrand: 'Desk Animals | 性格・恋愛・仕事タイプ診断',
    cardPreviewHint: '画像を長押し(スマホ)または右クリックで保存できます',
    cardPreviewHintLink: '保存ボタンはこちら 👇',
    footerDisclaimer: '本診断はエンタメ目的のオリジナルコンテンツで、MBTI(Myers-Briggs Type Indicator)の考え方を参考にした独自基準の診断です。The Myers & Briggs Foundation等の公式機関とは提携しておらず、挿絵はAI画像生成です。科学的な心理診断や実際の心理検査に代わるものではありません。',
    footerPrivacy: '本診断は名前・生年月日等の個人情報の入力を求めません。回答内容はすべてお使いの端末内で処理され、サーバーへの送信・保存は一切行いません。なお、アクセス解析(Googleアナリティクス)は行っており、閲覧したページの情報が計測されます。また、Google Fontsの読み込み時にお使いのIPアドレスがGoogleに送信されます。',
    footerAffiliate: '🔖 本ページの「ラッキーアイテム」リンクにはアフィリエイト(広告)リンクを含みます。リンク経由の購入により、当サイトが紹介料を得る場合があります。',
    followLabel: '🐹 Desk Animalsをフォローする',
    followLabel2: '🔮 黒曜診断で、生年月日から占ってもらう',
    linkCompatBtn: '🔮 お相手との相性を見る',
    nanderePromoLabel: '💘 「デレ」軸×動物で診断する新作もチェック',
    nanderePromoLink: '何デレ診断(ツンデレ・クーデレ等)へ',
    hubCtaNandereTitle: '「デレ」軸×動物で診断する何デレ診断',
    hubCtaNandereSub: 'ツンデレ・クーデレ等、新作もチェック',
    hubCtaTitle: 'MBTI 16タイプ一覧を見る',
    hubCtaSubStart: '診断前に全タイプの性格・恋愛・仕事をチェック',
    hubCtaSubResult: '気になる他のタイプの性格・恋愛・仕事もチェック',
    jpOnlyNote: '',
    loveCardLabel: '💘 恋愛タイプだけシェアする',
    loveShareBtn: '💘 恋愛タイプをXでシェア',
    loveSaveCardBtn: '💘 恋愛タイプカードを保存 🖼️',
    loveCardEyebrow: 'わたしの恋愛タイプ',
    loveShareText: (l) => `恋愛タイプは『${l}』でした💘\nあなたの恋愛タイプは?→\n※エンタメ目的の診断です\n#恋愛タイプ診断 #ラブタイプ診断 #MBTI診断`,
    loveCharCardLabel: '💞 恋愛キャラ診断(全64通り)',
    loveCharShareBtn: '💞 恋愛キャラをXでシェア',
    loveCharSaveCardBtn: '💞 恋愛キャラカードを保存 🖼️',
    loveCharSaveCardStoryBtn: '💞 ストーリーズ用に保存 📱',
    loveCharCardEyebrow: 'わたしの恋愛キャラ',
    loveCharShareText: (name, p) => `恋愛キャラは「${name}」でした💞\n${p}\nあなたの恋愛キャラは?→\n※エンタメ目的の診断です\n#恋愛キャラ診断 #恋愛タイプ診断 #MBTI診断`,
    loveCharRarityLine: (pct) => pct >= 35
      ? `🤝 この気質グループは全体の約${pct}%——気が合う仲間がきっと近くにいるはず(海外調査ベースの参考値、恋愛64キャラ独自の統計ではありません)`
      : `✨ この気質グループの人は全体の約${pct}%(海外調査ベースの参考値、恋愛64キャラ独自の統計ではありません)`,
    guessInviteLabel: '🔮 友達にあなたの性格を予想してもらう',
    guessInviteBtn: '予想リンクをコピー 🔗',
    guessInviteCopiedLabel: 'コピーしました ✓',
    guessBlockLabel: '性格を予想',
    guessIntroTitle: 'この人の性格、当ててみて!',
    guessIntroLead: '友達や知り合いを思い浮かべながら、4問だけ答えてね。<br>正解できるか、ドキドキしながらどうぞ。',
    guessStartBtn: '予想をはじめる ✨',
    guessRevealTitleCorrect: '大正解! 🎉',
    guessRevealTitleWrong: '惜しい!',
    guessRevealBody: (guessed, actual, guessedLabel, actualLabel) => guessed === actual
      ? `あなたの予想は「${actualLabel}」——ぴったり当たり!よく見てるね。`
      : `あなたの予想は「${guessedLabel}」だったけど、本当は「${actualLabel}」でした。`,
    guessTakeQuizBtn: '自分も診断してみる ✨',
    guessInvalidBody: 'この予想リンクは正しく読み込めませんでした。リンクを送ってくれた人に、もう一度リンクを送ってもらってね。',
  },
  en: {
    pageTitle: 'MBTI Personality, Love & Career Type Quiz',
    pageDescription: 'A 3-minute quiz you take by chatting with AI. Your Personality, Love, and Career types might all be different — described through animals, weather, and vehicles.',
    eyebrow: 'FREE PERSONALITY TEST',
    titleHtml: 'Reveal Your <span class="grad-text">3 Hidden Sides</span>',
    lead: 'Just chat with the AI to find out.<br>Your Personality, Love, and Career types<br>might all be different — a curiously accurate test.',
    badges: ['🐢 Animal', '☀️ Weather', '🚃 Vehicle', '🪄 as your symbol'],
    startBtn: 'Start the Test ✨',
    sub: '30 questions · about 3 minutes',
    resultEyebrow: 'RESULT',
    resultTitleHtml: 'Your Results <span class="grad-text">Are In</span>',
    shareBtn: 'Share on X 🚀',
    restartBtn: 'Take the Test Again',
    restartBtnFirstVisit: 'Take Your Own Test ✨',
    luckyLabel: "🍀 Today's Lucky Item",
    prTag: 'AD',
    luckyPriceHint: 'A cute $10–30 treat',
    luckySeeMore: (name) => `Shop ${name}`,
    mbtiElementLine: (type, element) => `MBTI: ${type} · Element: ${element}`,
    catLine: (catName, mapName) => `${catName} — ${mapName} Edition`,
    rarityLine: (pct) => `✨ Roughly ${pct}% of people (reference stat)`,
    shareText: (p, l, w) => `I just took a Personality / Love / Career type test!\nPersonality: ${p} / Love: ${l} / Career: ${w}\nTry yours →\n(For entertainment purposes only)\n#PersonalityTest #MBTI`,
    lineBtn: 'Share on LINE',
    copyUrlBtn: 'Copy Result URL 🔗',
    copiedLabel: 'Copied ✓',
    saveCardBtn: 'Save Result Card 🖼️',
    saveCardStoryBtn: 'Save for Stories 📱',
    generatingLabel: 'Generating…',
    cardEyebrow: 'My 3 Types',
    cardCta: "What's your type? Free 3-min quiz",
    cardBrand: 'Desk Animals | Personality / Love / Career Quiz',
    cardPreviewHint: 'Long-press (mobile) or right-click the image to save it',
    cardPreviewHintLink: 'Save it via the button below 👇',
    footerDisclaimer: 'This is an original entertainment quiz inspired by MBTI (Myers-Briggs Type Indicator) concepts, using our own independent criteria. It is not affiliated with or endorsed by The Myers & Briggs Foundation or any official body. Illustrations are AI-generated, and this is not a substitute for a scientific psychological assessment.',
    footerPrivacy: "This quiz never asks for your name, birth date, or other personal information. Your answers are processed entirely on your own device and are never sent to or stored on a server. We do use Google Analytics for traffic measurement, which records information about the pages you view. Loading Google Fonts also sends your IP address to Google.",
    footerAffiliate: '🔖 The "Lucky Item" links on this page are affiliate (ad) links. We may earn a commission on purchases made through these links.',
    followLabel: '🐹 Follow Desk Animals',
    followLabel2: '🔮 Try another quiz',
    linkCompatBtn: '🔮 Check Compatibility',
    nanderePromoLabel: '💘 Also try our new "Dere Type" quiz',
    nanderePromoLink: 'Take the Dere Type Quiz',
    hubCtaNandereTitle: 'Dere Type Quiz (Tsundere, Kuudere & more)',
    hubCtaNandereSub: 'A new quiz combining "dere" types with animals',
    hubCtaTitle: 'Browse All 16 MBTI Types',
    hubCtaSubStart: 'Preview every type before you start',
    hubCtaSubResult: 'Check out the other types too',
    jpOnlyNote: 'Available in Japanese only',
    loveCardLabel: '💘 Share just your Love Type',
    loveShareBtn: '💘 Share Love Type on X',
    loveSaveCardBtn: '💘 Save Love Type Card 🖼️',
    loveCardEyebrow: 'My Love Type',
    loveShareText: (l) => `My love type is "${l}" 💘\nWhat's yours? →\n(For entertainment purposes only)\n#LoveTypeQuiz #LoveType #MBTI`,
    loveCharCardLabel: '💞 Love Character Quiz (64 combos)',
    loveCharShareBtn: '💞 Share Love Character on X',
    loveCharSaveCardBtn: '💞 Save Love Character Card 🖼️',
    loveCharSaveCardStoryBtn: '💞 Save for Stories 📱',
    loveCharCardEyebrow: 'My Love Character',
    loveCharShareText: (name, p) => `My love character is "${name}" 💞\n${p}\nWhat's yours? →\n(For entertainment purposes only)\n#LoveCharacterQuiz #LoveType #MBTI`,
    loveCharRarityLine: (pct) => pct >= 35
      ? `🤝 About ${pct}% share this group — odds are good you'll find your people (a general reference stat from an overseas survey, not specific to this 64-combo quiz)`
      : `✨ About ${pct}% of people share this temperament group (a general reference stat from an overseas survey, not specific to this 64-combo quiz)`,
    guessInviteLabel: '🔮 See if a friend can guess your type',
    guessInviteBtn: 'Copy Guess Link 🔗',
    guessInviteCopiedLabel: 'Copied ✓',
    guessBlockLabel: 'Guess Their Type',
    guessIntroTitle: 'Can you guess this person\'s type?',
    guessIntroLead: 'Think of the friend who sent you this, and answer 4 quick questions about them.',
    guessStartBtn: 'Start Guessing ✨',
    guessRevealTitleCorrect: 'Nailed it! 🎉',
    guessRevealTitleWrong: 'So close!',
    guessRevealBody: (guessed, actual, guessedLabel, actualLabel) => guessed === actual
      ? `You guessed "${actualLabel}" — spot on! You really know them.`
      : `You guessed "${guessedLabel}", but they're actually "${actualLabel}".`,
    guessTakeQuizBtn: 'Take Your Own Test ✨',
    guessInvalidBody: 'This guess link didn\'t load correctly. Ask your friend to send it again.',
  },
};

// ===== 友達の性格を予想する4問(2026-09-12、[[project_diagnostic_web_tool]]流入拡大策より。
// 相性診断の「お相手のタイプを推測する4問」と同じ設計思想・同水準の観察ベース設問を、
// 三人称視点(この人は/they are)に書き替えて流用) =====
const AXIS_ORDER = ['EI', 'SN', 'TF', 'JP'];
const GUESS_QUESTIONS = [
  { axis: 'EI', text: '大人数の場で、その人はどちらかというと…', a: { letter: 'E', text: '自分から輪の中心に入っていくタイプ' }, b: { letter: 'I', text: '気づいたら端の方で誰かと話しているタイプ' } },
  { axis: 'SN', text: '話していて多いのは…', a: { letter: 'S', text: '具体的な事実や経験の話' }, b: { letter: 'N', text: '抽象的な考えやアイデアの話' } },
  { axis: 'TF', text: '相談すると、その人はまず…', a: { letter: 'T', text: '論理的に整理してくれる' }, b: { letter: 'F', text: '気持ちに寄り添ってくれる' } },
  { axis: 'JP', text: '約束や予定に対して、その人は…', a: { letter: 'J', text: '早めにきっちり決めたがる' }, b: { letter: 'P', text: '直前まで決めない・柔軟な方' } },
];
const GUESS_QUESTIONS_EN = [
  { axis: 'EI', text: 'In a big group, are they more the type who…', a: { letter: 'E', text: 'Jumps right into the center of things' }, b: { letter: 'I', text: 'Ends up quietly talking with one person off to the side' } },
  { axis: 'SN', text: 'When you talk, they tend to bring up more…', a: { letter: 'S', text: 'Concrete facts and real experiences' }, b: { letter: 'N', text: 'Abstract ideas and possibilities' } },
  { axis: 'TF', text: 'When you go to them for advice, they usually…', a: { letter: 'T', text: 'Break it down logically first' }, b: { letter: 'F', text: 'Meet your feelings first' } },
  { axis: 'JP', text: 'When it comes to plans and commitments, they…', a: { letter: 'J', text: 'Like to lock things in early' }, b: { letter: 'P', text: 'Keep it flexible until the last minute' } },
];
function getGuessQuestions() { return LANG === 'en' ? GUESS_QUESTIONS_EN : GUESS_QUESTIONS; }

function applyLangUI() {
  const t = UI_TEXT[LANG];
  document.title = t.pageTitle;
  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute('content', t.pageDescription);
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
  document.getElementById('btn-copy-url').textContent = t.copyUrlBtn;
  document.getElementById('btn-restart').textContent = isSharedView ? t.restartBtnFirstVisit : t.restartBtn;
  document.getElementById('guess-invite-label').textContent = t.guessInviteLabel;
  document.getElementById('btn-invite-guess').textContent = t.guessInviteBtn;
  document.getElementById('guess-block-label').textContent = t.guessBlockLabel;
  document.getElementById('guess-intro-title').textContent = t.guessIntroTitle;
  document.getElementById('guess-intro-lead').innerHTML = t.guessIntroLead;
  document.getElementById('btn-guess-start').textContent = t.guessStartBtn;
  document.getElementById('btn-guess-take-quiz').textContent = t.guessTakeQuizBtn;
  document.getElementById('btn-save-card').textContent = t.saveCardBtn;
  document.getElementById('btn-save-card-story').textContent = t.saveCardStoryBtn;
  document.getElementById('love-card-label').textContent = t.loveCardLabel;
  document.getElementById('btn-share-love').textContent = t.loveShareBtn;
  document.getElementById('btn-save-love-card').textContent = t.loveSaveCardBtn;
  // 恋愛キャラ診断64は全件JAテキストのみ(英訳は未整備)のため、ENでは丸ごと非表示にする
  document.getElementById('lovechar-section').style.display = LANG === 'en' ? 'none' : '';
  document.getElementById('lovechar-card-label').textContent = t.loveCharCardLabel;
  document.getElementById('btn-share-lovechar').textContent = t.loveCharShareBtn;
  document.getElementById('btn-save-lovechar-card').textContent = t.loveCharSaveCardBtn;
  document.getElementById('btn-save-lovechar-card-story').textContent = t.loveCharSaveCardStoryBtn;
  document.getElementById('lovechar-card-preview-hint-text').textContent = t.cardPreviewHint;
  document.getElementById('lovechar-card-preview-hint-link').textContent = t.cardPreviewHintLink;
  document.getElementById('result-card-preview-hint-text').textContent = t.cardPreviewHint;
  document.getElementById('result-card-preview-hint-link').textContent = t.cardPreviewHintLink;
  document.getElementById('footer-disclaimer').textContent = t.footerDisclaimer;
  document.getElementById('footer-privacy').textContent = t.footerPrivacy;
  document.getElementById('footer-affiliate').textContent = t.footerAffiliate;
  document.getElementById('follow-label').textContent = t.followLabel;
  document.getElementById('follow-label-2').textContent = t.followLabel2;
  document.getElementById('link-compat').textContent = t.linkCompatBtn;
  const linkCompatNoteEl = document.getElementById('link-compat-note');
  linkCompatNoteEl.textContent = t.jpOnlyNote;
  linkCompatNoteEl.style.display = t.jpOnlyNote ? '' : 'none';
  const followNote2El = document.getElementById('follow-note-2');
  followNote2El.textContent = t.jpOnlyNote;
  followNote2El.style.display = t.jpOnlyNote ? '' : 'none';
  document.getElementById('nandere-promo-label').textContent = t.nanderePromoLabel;
  document.getElementById('nandere-promo-link').textContent = t.nanderePromoLink;
  const nanderePromoNoteEl = document.getElementById('nandere-promo-note');
  nanderePromoNoteEl.textContent = t.jpOnlyNote;
  nanderePromoNoteEl.style.display = t.jpOnlyNote ? '' : 'none';
  // types/en/追加(2026-09-05)によりMBTI 16タイプ一覧は日英とも提供済みのため、
  // このハブへのリンクだけは「日本語のみ」注記を出さずlang=enなら types/en/ に向ける。
  const hubUrl = LANG === 'en' ? 'types/en/' : 'types/';
  document.getElementById('hub-cta-start-title').textContent = t.hubCtaTitle;
  document.getElementById('hub-cta-start-sub').textContent = t.hubCtaSubStart;
  document.getElementById('hub-cta-start').setAttribute('href', hubUrl);
  const hubCtaStartNoteEl = document.getElementById('hub-cta-start-note');
  hubCtaStartNoteEl.textContent = '';
  hubCtaStartNoteEl.style.display = 'none';
  document.getElementById('hub-cta-nandere-title').textContent = t.hubCtaNandereTitle;
  document.getElementById('hub-cta-nandere-sub').textContent = t.hubCtaNandereSub;
  const hubCtaNandereNoteEl = document.getElementById('hub-cta-nandere-note');
  hubCtaNandereNoteEl.textContent = t.jpOnlyNote;
  hubCtaNandereNoteEl.style.display = t.jpOnlyNote ? '' : 'none';
  document.getElementById('hub-cta-result-title').textContent = t.hubCtaTitle;
  document.getElementById('hub-cta-result-sub').textContent = t.hubCtaSubResult;
  document.getElementById('hub-cta-result').setAttribute('href', hubUrl);
  const hubCtaResultNoteEl = document.getElementById('hub-cta-result-note');
  hubCtaResultNoteEl.textContent = '';
  hubCtaResultNoteEl.style.display = 'none';
  const footerHubLinkEl = document.getElementById('footer-hub-link');
  if (footerHubLinkEl) {
    footerHubLinkEl.textContent = t.hubCtaTitle;
    footerHubLinkEl.setAttribute('href', hubUrl);
  }
  document.documentElement.lang = LANG;
}

function setLang(lang) {
  LANG = lang;
  // data-lang属性を持つ言語切替ボタンをすべて同期する(スタート画面・チャット画面ヘッダー等、
  // 複数箇所に切替UIがあっても1箇所の切替操作で全部の見た目が揃う)
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  applyLangUI();
}

// ===== 状態 =====
let currentIndex = 0;
let answers = []; // { block, axis, weight }
// 結果URL(?r=)経由でこのページを開いた(=誰かの結果を見ている)かどうか。restartボタンの文言分岐に使う。
let isSharedView = false;

// ===== DOM =====
const screens = {
  start: document.getElementById('screen-start'),
  chat: document.getElementById('screen-chat'),
  result: document.getElementById('screen-result'),
  guess: document.getElementById('screen-guess'),
  guessReveal: document.getElementById('screen-guess-reveal'),
};
const chatLog = document.getElementById('chat-log');
const chatOptions = document.getElementById('chat-options');
const blockLabel = document.getElementById('block-label');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// 画面遷移のたびに新しい画面の見出しへフォーカスを移し、スクリーンリーダー・
// キーボードユーザーに遷移が起きたことを伝える(tabindex="-1"は一時的なフォーカス対象化のため)
function focusScreenHeading(name) {
  const headingIds = { start: 'start-title', chat: 'block-label', result: 'result-title-el', guess: 'guess-intro-title', guessReveal: 'guess-reveal-title' };
  const el = document.getElementById(headingIds[name]);
  if (!el) return;
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: false });
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  focusScreenHeading(name);
}

function startQuiz() {
  currentIndex = 0;
  answers = [];
  chatLog.innerHTML = '';
  showScreen('chat');
  askNext();
}

// 現在の設問のブロックラベル(性格編/恋愛編/仕事編)を表示中の言語で描き直す。
// askNext()での初回表示と、チャット中に言語を切り替えた際の即時反映(No.89)の両方から呼ぶ。
function refreshBlockLabel() {
  const questions = getQuestions();
  if (currentIndex >= questions.length) return;
  const meta = getBlockMeta()[questions[currentIndex].block];
  blockLabel.textContent = meta.label;
  blockLabel.style.background = meta.color + '22';
  blockLabel.style.color = meta.textColor;
}

function askNext() {
  const questions = getQuestions();
  if (currentIndex >= questions.length) {
    showResult();
    return;
  }
  const q = questions[currentIndex];
  refreshBlockLabel();
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  progressText.textContent = `${currentIndex + 1} / ${questions.length}`;
  const progressBarEl = progressFill.parentElement;
  progressBarEl.setAttribute('aria-valuenow', String(currentIndex + 1));
  progressBarEl.setAttribute('aria-valuemax', String(questions.length));

  addBubble(q.text, 'ai');
  renderOptions(q);
}

function addBubble(text, who) {
  const wrap = document.createElement('div');
  wrap.className = `bubble-row ${who}`;
  if (who === 'ai') {
    wrap.innerHTML = `<div class="avatar">🔮</div><div class="bubble ai">${text}</div>`;
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
  // 前の設問への回答直後は次の選択肢群の先頭にフォーカスを移し、キーボードユーザーが
  // 毎回Tabで最初からたどり直す必要がないようにする
  const firstOption = chatOptions.querySelector('.option-btn');
  if (firstOption) firstOption.focus({ preventScroll: false });
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

let lastResult = null; // { personality, love, work } 各4文字のMBTIタイプコード

function showResult() {
  showScreen('result');
  lastResult = {
    personality: computeType('personality'),
    love: computeType('love'),
    work: computeType('work'),
  };
  renderResultCards(lastResult);
  renderCardPreview(lastResult);
  renderLoveCharCardPreview(lastResult);
  updateCompatLink(lastResult);
  trackEvent('quiz_complete', { personality_type: lastResult.personality });
}

// 相性診断サイトへ自分の結果コードを引き継ぐ(?me=)。相性診断側はこのコードを
// 「あなたの結果コード」欄に自動入力し、お相手のコード入力または推測クイズへ進む。
function updateCompatLink(types) {
  const link = document.getElementById('link-compat');
  if (!link) return;
  link.href = `https://deskanimals114510-ai.github.io/aisho-shindan/?me=${buildResultCode(types)}`;
}

// 生年月日等の入力を持たないため、確定した3タイプ(各4文字)をそのままURLに載せる
// (MBTIタイプは元々公開して問題ない情報なので、黒曜診断のような追加の符号化は不要)
function buildResultCode(types) {
  return `${types.personality}${types.love}${types.work}`;
}

// 実在する16タイプの組み合わせ(E/I, S/N, T/F, J/Pの4軸)かどうかまで検証する。
// 単純な[A-Z]{4}の書式チェックだけでは「AAAA」等の不正な組み合わせが通ってしまい、
// TYPE_ELEMENT等の後続ルックアップがundefinedになってクラッシュする不具合があったため
// (2026-09-02修正)、各4文字ブロックを軸ごとに検証する。
const MBTI_TYPE_RE = /^[EI][SN][TF][JP]$/;
function decodeResultCode(code) {
  if (!/^[A-Z]{12}$/.test(code)) return null;
  const personality = code.slice(0, 4);
  const love = code.slice(4, 8);
  const work = code.slice(8, 12);
  if (![personality, love, work].every(t => MBTI_TYPE_RE.test(t))) return null;
  return { personality, love, work };
}

function resultUrl() {
  if (!lastResult) return location.href;
  return location.origin + location.pathname + '?r=' + buildResultCode(lastResult) + '&lang=' + LANG;
}

// 2026-09-11: X/LINEシェア時のリンクプレビュー(OGP)対策。`?r=`の動的URLはクローラーが
// JSを実行しないため常に汎用OGP(サイト共通のog-image.jpg)のままで、結果を反映しない。
// 性格タイプ別の静的ページ(types/{code}.html)は個別canonical/OGPを既に持つため、
// SNS共有リンクにはこちらを使う。コピーURL・ネイティブ共有(画像添付)は従来通り
// resultUrl()の完全な結果コードURLを維持する(友達に自分の3ブロック結果をそのまま見せる用途のため)。
function shareOgUrl() {
  if (!lastResult) return resultUrl();
  const path = location.pathname;
  const dir = path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/') + 1);
  const typesDir = LANG === 'en' ? 'types/en/' : 'types/';
  return location.origin + dir + typesDir + lastResult.personality.toLowerCase() + '.html';
}

// ===== 友達に性格タイプを予想してもらう招待リンク(2026-09-12) =====
function inviteGuessUrl() {
  if (!lastResult) return location.href;
  return location.origin + location.pathname + '?guess=' + lastResult.personality + '&lang=' + LANG;
}
function copyInviteGuessUrl() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const btn = document.getElementById('btn-invite-guess');
  navigator.clipboard.writeText(inviteGuessUrl()).then(() => {
    const original = btn.textContent;
    btn.textContent = t.guessInviteCopiedLabel;
    trackEvent('guess_invite_copy');
    setTimeout(() => { btn.textContent = original; }, 2000);
  }).catch(() => { /* クリップボード権限が無い環境でも診断導線自体は続行する */ });
}

// ===== 予想クイズ本体 =====
let guessQuizIndex = 0;
let guessAnswers = {};
let guessTargetCode = null;
function startGuessQuiz() {
  trackEvent('guess_quiz_start');
  document.getElementById('guess-intro').style.display = 'none';
  document.getElementById('guess-log').style.display = '';
  guessQuizIndex = 0;
  guessAnswers = {};
  renderGuessQuestion();
}
function updateGuessProgress() {
  const questions = getGuessQuestions();
  document.getElementById('guess-progress-fill').style.width = `${Math.round((guessQuizIndex / questions.length) * 100)}%`;
  document.getElementById('guess-progress-text').textContent = `${guessQuizIndex + 1} / ${questions.length}`;
}
function renderGuessQuestion() {
  const questions = getGuessQuestions();
  const q = questions[guessQuizIndex];
  const wrap = document.getElementById('guess-options');
  wrap.innerHTML = `
    <div class="q-text" style="margin-bottom:12px;">${q.text}</div>
    <button type="button" class="option-btn" data-letter="${q.a.letter}"><span class="option-text">${q.a.text}</span></button>
    <button type="button" class="option-btn" data-letter="${q.b.letter}"><span class="option-text">${q.b.text}</span></button>
  `;
  updateGuessProgress();
  wrap.querySelectorAll('.option-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.option-btn').forEach((b) => { b.disabled = true; });
      btn.classList.add('selected');
      guessAnswers[q.axis] = btn.dataset.letter;
      setTimeout(() => {
        if (guessQuizIndex < questions.length - 1) {
          guessQuizIndex++;
          renderGuessQuestion();
        } else {
          finishGuessQuiz();
        }
      }, 350);
    });
  });
}
function finishGuessQuiz() {
  const guessedCode = AXIS_ORDER.map((a) => guessAnswers[a]).join('');
  trackEvent('guess_quiz_complete', { guessed: guessedCode, target: guessTargetCode, correct: guessedCode === guessTargetCode });
  renderGuessReveal(guessedCode, guessTargetCode);
  showScreen('guessReveal');
}
function renderGuessReveal(guessedCode, actualCode) {
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const body = document.getElementById('guess-reveal-body');
  if (!actualCode || !blockMap.personality[actualCode]) {
    body.innerHTML = `<p class="lead">${t.guessInvalidBody}</p>`;
    document.getElementById('guess-reveal-title').textContent = '';
    return;
  }
  const isCorrect = guessedCode === actualCode;
  const guessedLabel = blockMap.personality[guessedCode] ? blockMap.personality[guessedCode][1] : guessedCode;
  const actualLabel = blockMap.personality[actualCode][1];
  document.getElementById('guess-reveal-title').textContent = isCorrect ? t.guessRevealTitleCorrect : t.guessRevealTitleWrong;
  body.innerHTML = `<p class="lead">${t.guessRevealBody(guessedCode, actualCode, guessedLabel, actualLabel)}</p>`;
}

function copyResultUrl() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const btn = document.getElementById('btn-copy-url');
  navigator.clipboard.writeText(resultUrl()).then(() => {
    const original = btn.textContent;
    btn.textContent = t.copiedLabel;
    trackEvent('copy_url');
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
}

function renderResultCards(types) {
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const blockMeta = getBlockMeta();
  const blockMapName = getBlockMapName();
  const luckyMap = getLuckyMap();
  const resultCards = document.getElementById('result-cards');
  resultCards.innerHTML = '';

  ['personality', 'love', 'work'].forEach((block, i) => {
    const type = types[block];
    const map = blockMap[block];
    const [emoji, label, desc] = map[type] || ['❓', '???', 'Unexpected data during diagnosis'];
    const meta = blockMeta[block];
    const element = TYPE_ELEMENT[type];
    const lucky = pickLuckyItem(luckyMap, block, element);
    // 性格タイプの結果文で明言している「ラッキーカラー」を、実際の商品検索にも反映する
    const colorWord = block === 'personality' ? (LANG === 'en' ? ELEMENT_COLOR_EN[element] : ELEMENT_COLOR[element]) : null;
    const luckyKeyword = colorWord ? `${lucky.keyword} ${colorWord}` : lucky.keyword;
    const luckyBridge = getLuckyBridge()[block][element];

    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.setProperty('--accent', meta.color);
    card.style.animationDelay = `${i * 0.15}s`;
    card.innerHTML = `
      <div class="card-icon">${emoji}</div>
      <div class="cat-name">${meta.icon} ${t.catLine(meta.catName, blockMapName[block])}</div>
      <div class="type-name">${label}</div>
      <div class="mbti-code">${t.mbtiElementLine(type, getElementName(element))}</div>
      ${block === 'personality' && TYPE_RARITY[type] ? `<div class="rarity-line">${t.rarityLine(TYPE_RARITY[type])}</div>` : ''}
      <div class="desc">${desc}</div>
      <div class="lucky-bridge">${luckyBridge}</div>
      <a class="lucky-item" href="${affiliateUrl(luckyKeyword)}" target="_blank" rel="noopener sponsored">
        <span class="lucky-emoji">${LUCKY_ICON_MAP[lucky.emoji] ? `<img src="img/lucky-icons/${LUCKY_ICON_MAP[lucky.emoji]}.jpg" alt="" width="42" height="42" loading="lazy">` : lucky.emoji}</span>
        <span class="lucky-text"><span class="lucky-label">${t.luckyLabel}<span class="lucky-pr-tag">${t.prTag}</span></span><span class="lucky-name">${t.luckySeeMore(lucky.name)}</span><span class="lucky-price">${t.luckyPriceHint}</span></span>
        <span class="lucky-arrow">›</span>
      </a>
    `;
    resultCards.appendChild(card);
  });
}

// ===== 結果カード画像生成(Canvas、サーバー不要) =====
// Pinterest配布中のイラスト(pinterest/illustrations/)と同一のseedで生成した動物イラストを
// img/animals/<MBTIコード>.jpg として軽量化・同梱している。結果カードでも同じ絵を使うことで
// Pinterest経由の流入者が「見たことある絵」を再認識できるようにする(意図的な連動)。
const CARD_PAL = {
  bg1: '#ffe9f3', bg2: '#f4e9ff', bg3: '#fff6e9',
  primaryDark: '#ef6b96', text: '#55404f', sub: '#a3899e',
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
    [w * 0.85, h * 0.15, w * 0.30, '#ffd8e8'],
    [w * 0.15, h * 0.92, w * 0.28, '#e2d4ff'],
    [w * 0.65, h * 0.88, w * 0.22, '#fff0d8'],
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

function cardCoverImage(ctx, img, x, y, w, h) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s, dh = img.height * s;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

// Pinterest配布用に彩度高めで作った動物イラストを、サイト全体のパステルトーンへ寄せるための
// 薄いパステルベールを画像の上に重ねる(絵柄自体は変えず、視覚差を緩和するだけに留める、2026-09-05追加)
function cardApplyPastelWash(ctx, x, y, w, h) {
  ctx.save();
  const wash = ctx.createLinearGradient(x, y, x, y + h);
  wash.addColorStop(0, 'rgba(255,233,243,0.16)');
  wash.addColorStop(1, 'rgba(244,233,255,0.22)');
  ctx.fillStyle = wash;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// 指定フォントサイズでmaxWidthに収まるよう、単語(英語)または文字(日本語など)単位で行分割する。
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

// maxLines行に収まるまでフォントサイズをmaxからminへ1pxずつ縮めながら折り返す。
// 日本語のニックネームは最長21字程度で1行に収まるが、英語版は最長75字前後あるため
// (例: "The Experimental Vehicle More Interested in the Engine Than the Destination")、
// 縮小だけでなく複数行への折り返しが必須。それでもmaxLinesに収まらない場合は最終行を省略記号で切る。
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

function loadCardImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function buildCardCats(types) {
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const blockMeta = getBlockMeta();
  const blockMapName = getBlockMapName();
  return ['personality', 'love', 'work'].map((block) => {
    const type = types[block];
    const [emoji, label] = blockMap[block][type];
    return { block, emoji, label, color: blockMeta[block].color, catLabel: blockMeta[block].catName, mapName: blockMapName[block] };
  });
}

function drawResultCardX(ctx, img, cats) {
  const t = UI_TEXT[LANG];
  const W = 1200, H = 630;
  cardDrawBackground(ctx, W, H);

  const ix = 56, iy = 45, iw = 372, ih = 540;
  ctx.save();
  ctx.shadowColor = 'rgba(120,90,130,0.28)';
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#fff';
  cardRoundRect(ctx, ix, iy, iw, ih, 32);
  ctx.fill();
  ctx.restore();
  ctx.save();
  cardRoundRect(ctx, ix, iy, iw, ih, 32);
  ctx.clip();
  cardCoverImage(ctx, img, ix, iy, iw, ih);
  cardApplyPastelWash(ctx, ix, iy, iw, ih);
  ctx.restore();

  const cx = 486, rightMax = 1144;
  const maxTextWidth = rightMax - cx;

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 25px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardEyebrow, cx, 74);

  // ピルをタイプ名の上に置く構成にすることで、タイプ名は幅いっぱい(maxTextWidth)を使って
  // 折り返せる(ピル横並びだとピル分の残り幅しか使えず、長い英語ニックネームで破綻するため)。
  const rowSizes = [
    { maxFont: 38, minFont: 22, pillFont: 20, lineHeight: 1.14, maxLines: 2 }, // 性格(強調)
    { maxFont: 27, minFont: 17, pillFont: 16, lineHeight: 1.16, maxLines: 2 }, // 恋愛
    { maxFont: 27, minFont: 17, pillFont: 16, lineHeight: 1.16, maxLines: 2 }, // 仕事
  ];
  let y = 118;
  cats.forEach((c, i) => {
    const rs = rowSizes[i];
    cardPill(ctx, cx, y, c.catLabel.replace(/タイプ$|Type$/, ''), c.color, rs.pillFont);
    y += rs.pillFont * 1.9 + rs.pillFont * 0.55;

    const prefix = `${c.emoji} `;
    ctx.font = `700 ${rs.maxFont}px 'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif`;
    const prefixWidth = ctx.measureText(prefix).width;
    const fit = cardFitTextMultiline(ctx, c.label, maxTextWidth - prefixWidth, '700', "'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif", rs.maxFont, rs.minFont, rs.maxLines);
    ctx.fillStyle = CARD_PAL.text;
    ctx.font = `700 ${fit.size}px 'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif`;
    const lineStep = fit.size * rs.lineHeight;
    fit.lines.forEach((line, li) => {
      ctx.fillText(li === 0 ? prefix + line : line, cx, y + li * lineStep + fit.size * 0.5);
    });
    y += fit.lines.length * lineStep + rs.pillFont * 1.1;
  });

  y += 6;
  ctx.strokeStyle = 'rgba(160,130,175,0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(rightMax, y);
  ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 26px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, cx, y + 44);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 19px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, cx, y + 80);
}

function drawResultCardStory(ctx, img, cats) {
  const t = UI_TEXT[LANG];
  const W = 1080, H = 1920;
  cardDrawBackground(ctx, W, H);

  const ih = 1180;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, ih);
  ctx.clip();
  cardCoverImage(ctx, img, 0, 0, W, ih);
  cardApplyPastelWash(ctx, 0, 0, W, ih);
  const fade = ctx.createLinearGradient(0, ih - 320, 0, ih);
  fade.addColorStop(0, 'rgba(250,240,248,0)');
  fade.addColorStop(1, CARD_PAL.bg2);
  ctx.fillStyle = fade;
  ctx.fillRect(0, ih - 320, W, 320);
  ctx.restore();

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 34px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardEyebrow, W / 2, 1245);

  const maxTextWidth = W - 160;
  const rowSizes = [
    { maxFont: 50, minFont: 28, pillFont: 24, lineHeight: 1.16, maxLines: 2 }, // 性格(強調)
    { maxFont: 36, minFont: 22, pillFont: 20, lineHeight: 1.18, maxLines: 2 },
    { maxFont: 36, minFont: 22, pillFont: 20, lineHeight: 1.18, maxLines: 2 },
  ];
  let y = 1330;
  cats.forEach((c, i) => {
    const rs = rowSizes[i];
    ctx.textAlign = 'center';
    ctx.font = `700 ${rs.pillFont}px 'Zen Maru Gothic', sans-serif`;
    const label = c.catLabel.replace(/タイプ$|Type$/, '');
    const lw = ctx.measureText(label).width + rs.pillFont * 1.9;
    y += rs.pillFont * 1.3;
    ctx.fillStyle = c.color;
    cardRoundRect(ctx, W / 2 - lw / 2, y - rs.pillFont * 0.75, lw, rs.pillFont * 1.5, rs.pillFont * 0.75);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(label, W / 2, y);
    y += rs.pillFont * 1.5;

    const prefix = `${c.emoji} `;
    ctx.font = `700 ${rs.maxFont}px 'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif`;
    const prefixWidth = ctx.measureText(prefix).width;
    const fit = cardFitTextMultiline(ctx, c.label, maxTextWidth - prefixWidth, '700', "'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif", rs.maxFont, rs.minFont, rs.maxLines);
    ctx.fillStyle = CARD_PAL.text;
    ctx.font = `700 ${fit.size}px 'Zen Maru Gothic', 'Segoe UI Emoji', sans-serif`;
    const lineStep = fit.size * rs.lineHeight;
    y += fit.size * 0.6;
    fit.lines.forEach((line, li) => {
      ctx.fillText(li === 0 ? prefix + line : line, W / 2, y + li * lineStep);
    });
    y += (fit.lines.length - 1) * lineStep + fit.size * 0.9;
  });

  y += 14;
  ctx.strokeStyle = 'rgba(160,130,175,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, y);
  ctx.lineTo(930, y);
  ctx.stroke();
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 36px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, W / 2, y + 55);
  ctx.textAlign = 'left';
}

async function buildResultCardCanvas(types, mode) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* フォント読み込み待ちに失敗しても既定フォントで続行 */ }
  }
  const img = await loadCardImage(`img/animals/${types.personality}.jpg`);
  const cats = buildCardCats(types);
  const canvas = document.createElement('canvas');
  if (mode === 'story') {
    canvas.width = 1080; canvas.height = 1920;
    drawResultCardStory(canvas.getContext('2d'), img, cats);
  } else {
    canvas.width = 1200; canvas.height = 630;
    drawResultCardX(canvas.getContext('2d'), img, cats);
  }
  return canvas;
}

// ===== 恋愛タイプ単体のシェアカード(2026-08-28、「恋愛タイプ診断」トレンド対応) =====
// 性格・恋愛・仕事3タイプまとめカードとは別に、恋愛タイプだけを大きく見せる単体カードを用意する。
// 天気メタファーの専用イラストは無いため、既存の絵文字(blockMap.loveの1要素目)を主役にした
// 文字主体のデザインにすることで、新規画像アセットの追加なしに実装できるようにしている。
function buildLoveCardCat(types) {
  const blockMap = getBlockMap();
  const [emoji, label] = blockMap.love[types.love];
  return { emoji, label };
}

function drawLoveCardX(ctx, cat) {
  const t = UI_TEXT[LANG];
  const W = 1200, H = 630;
  cardDrawBackground(ctx, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 28px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.loveCardEyebrow, W / 2, 84);

  ctx.font = "170px 'Segoe UI Emoji', sans-serif";
  ctx.fillText(cat.emoji, W / 2, 268);

  const fit = cardFitTextMultiline(ctx, cat.label, W - 200, '700', "'Zen Maru Gothic', sans-serif", 60, 32, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `700 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
  const lineStep = fit.size * 1.16;
  const startY = 452 - ((fit.lines.length - 1) * lineStep) / 2;
  fit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, startY + li * lineStep);
  });

  ctx.strokeStyle = 'rgba(160,130,175,0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 260, 548);
  ctx.lineTo(W / 2 + 260, 548);
  ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 25px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, W / 2, 583);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 18px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, W / 2, 612);
  ctx.textAlign = 'left';
}

function drawLoveCardStory(ctx, cat) {
  const t = UI_TEXT[LANG];
  const W = 1080, H = 1920;
  cardDrawBackground(ctx, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 40px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.loveCardEyebrow, W / 2, 300);

  ctx.font = "380px 'Segoe UI Emoji', sans-serif";
  ctx.fillText(cat.emoji, W / 2, 760);

  const fit = cardFitTextMultiline(ctx, cat.label, W - 160, '700', "'Zen Maru Gothic', sans-serif", 84, 44, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `700 ${fit.size}px 'Zen Maru Gothic', sans-serif`;
  const lineStep = fit.size * 1.18;
  const startY = 1080 - ((fit.lines.length - 1) * lineStep) / 2;
  fit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, startY + li * lineStep);
  });

  ctx.strokeStyle = 'rgba(160,130,175,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, 1220);
  ctx.lineTo(930, 1220);
  ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 38px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, W / 2, 1280);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 26px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, W / 2, 1330);
  ctx.textAlign = 'left';
}

async function buildLoveCardCanvas(types, mode) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* フォント読み込み待ちに失敗しても既定フォントで続行 */ }
  }
  const cat = buildLoveCardCat(types);
  const canvas = document.createElement('canvas');
  if (mode === 'story') {
    canvas.width = 1080; canvas.height = 1920;
    drawLoveCardStory(canvas.getContext('2d'), cat);
  } else {
    canvas.width = 1200; canvas.height = 630;
    drawLoveCardX(canvas.getContext('2d'), cat);
  }
  return canvas;
}

// 結果画面に常時イラストを表示する(ダウンロードボタンを押すまで中身が見えない状態を避けるため)。
// <img>化しておくことで、スマホの長押し保存やPCの右クリック保存もそのまま使える。
async function renderCardPreview(types) {
  const preview = document.getElementById('result-card-preview');
  preview.innerHTML = '';
  try {
    const canvas = await buildResultCardCanvas(types, 'x');
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    // プレビュー画像は#result-cardsのテキスト内容と重複するため、装飾画像として扱う
    // (JA/ENどちらでも読み上げ不要、スクリーンリーダーの二重読み上げを防ぐ)
    img.alt = '';
    img.width = 1200;
    img.height = 630;
    preview.appendChild(img);
  } catch (e) {
    console.error('結果カードプレビューの生成に失敗しました', e);
    preview.remove();
  }
}

// 恋愛キャラ診断64のカードも、性格診断カードと同じく結果画面に直接プレビュー表示する
// (2026-09-08追加)。以前は保存・シェアボタンを押すまでカード自体が一切見えず、
// 「せっかく作ったキャラ・毒舌文が誰の目にも触れていない」状態だった。ENでは
// lovechar-section自体が非表示のため、無駄なcanvas生成を避けるため呼び出し側で
// LANGガードする。
async function renderLoveCharCardPreview(types) {
  if (LANG === 'en') return;
  const preview = document.getElementById('lovechar-card-preview');
  preview.innerHTML = '';
  try {
    const canvas = await buildLoveCharCardCanvas(types, 'x');
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.alt = '';
    img.width = 1200;
    img.height = 630;
    preview.appendChild(img);
  } catch (e) {
    console.error('恋愛キャラカードプレビューの生成に失敗しました', e);
    preview.remove();
  }
}

async function downloadResultCard(mode) {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const btnId = mode === 'story' ? 'btn-save-card-story' : 'btn-save-card';
  const btn = document.getElementById(btnId);
  const original = btn.textContent;
  btn.textContent = t.generatingLabel;
  btn.disabled = true;
  try {
    const canvas = await buildResultCardCanvas(lastResult, mode);
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `deskanimals-quiz-${lastResult.personality}-${mode}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        resolve();
      }, 'image/png');
    });
    trackEvent('save_card', { mode });
  } catch (e) {
    console.error('結果カード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

// モバイル(主にWeb Share API + ファイル共有に対応した環境)では結果カード画像を
// 添付したネイティブ共有シートを優先し、非対応環境(主にデスクトップ)では
// 従来通りテキスト+リンクのXシェアにフォールバックする(2026-09-02追加)。
async function shareResult() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const pLabel = blockMap.personality[lastResult.personality][1];
  const lLabel = blockMap.love[lastResult.love][1];
  const wLabel = blockMap.work[lastResult.work][1];
  const text = t.shareText(pLabel, lLabel, wLabel);

  if (navigator.share && navigator.canShare) {
    try {
      const canvas = await buildResultCardCanvas(lastResult, 'x');
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], `deskanimals-quiz-${lastResult.personality}.png`, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, url: resultUrl() });
        trackEvent('share', { method: 'native_image' });
        return;
      }
    } catch (e) {
      // ユーザーによる共有シートのキャンセル、または非対応環境。下のフォールバックへ続ける。
      if (e && e.name === 'AbortError') { trackEvent('share_cancelled', { method: 'native_image' }); return; }
      console.error('ネイティブ共有に失敗しました、テキストシェアにフォールバックします', e);
    }
  }

  const url = encodeURIComponent(shareOgUrl());
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'x' });
}

function shareResultLine() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const pLabel = blockMap.personality[lastResult.personality][1];
  const lLabel = blockMap.love[lastResult.love][1];
  const wLabel = blockMap.work[lastResult.work][1];
  const text = t.shareText(pLabel, lLabel, wLabel);
  const url = encodeURIComponent(shareOgUrl());
  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'line' });
}

async function downloadLoveCard() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const btn = document.getElementById('btn-save-love-card');
  const original = btn.textContent;
  btn.textContent = t.generatingLabel;
  btn.disabled = true;
  try {
    const canvas = await buildLoveCardCanvas(lastResult, 'x');
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `deskanimals-love-${lastResult.love}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        resolve();
      }, 'image/png');
    });
    trackEvent('save_card', { mode: 'love' });
  } catch (e) {
    console.error('恋愛タイプカード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

function shareLoveResult() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const lLabel = blockMap.love[lastResult.love][1];
  const text = t.loveShareText(lLabel);
  const url = encodeURIComponent(resultUrl());
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'x_love' });
}

// ===== 恋愛キャラ診断・全64通り(2026-09-05、「ラブキャラ診断64」トレンド対応) =====
// 命名は先方の商標(ラブキャラ診断64)と紛らわしくならないよう、"64"を名称に融合させず
// 「(全64通り)」という補足に留めている(5名パネルレビュー2026-09-05で指摘・修正)。
// 既存の恋愛タイプ(16通り、天気メタファー)×性格タイプが属する気質グループ(NT/NF/SJ/SP、
// 相性診断で確立済みの分類)を組み合わせた16×4=64通りの「恋愛キャラ」。
// 2026-09-07全面リビルド: 気質グループ4件の使い回し文言から、64通り全て個別イラスト
// (img/lovechar64/{group}_{loveCode}.jpg)+個別テキスト(LOVECHAR64)に差し替え。
function buildLoveCharCardCat(types) {
  const t = UI_TEXT[LANG];
  const groupKey = TEMPERAMENT[types.personality];
  const entry = LOVECHAR64[groupKey][types.love];
  const rarityPct = Math.round(getGroupRarity(groupKey) * 10) / 10;
  return {
    groupKey, name: entry.name, blurb: entry.blurb, punchline: entry.punchline,
    rarityText: t.loveCharRarityLine(rarityPct),
  };
}

function drawLoveCharCardX(ctx, img, cat) {
  const t = UI_TEXT[LANG];
  const W = 1200, H = 630;
  cardDrawBackground(ctx, W, H);

  const ix = 56, iy = 45, iw = 372, ih = 540;
  ctx.save();
  ctx.shadowColor = 'rgba(120,90,130,0.28)';
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#fff';
  cardRoundRect(ctx, ix, iy, iw, ih, 32);
  ctx.fill();
  ctx.restore();
  ctx.save();
  cardRoundRect(ctx, ix, iy, iw, ih, 32);
  ctx.clip();
  cardCoverImage(ctx, img, ix, iy, iw, ih);
  cardApplyPastelWash(ctx, ix, iy, iw, ih);
  ctx.restore();

  const cx = 486, rightMax = 1144;
  const maxTextWidth = rightMax - cx;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 24px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.loveCharCardEyebrow, cx, 66);

  const nameFit = cardFitTextMultiline(ctx, cat.name, maxTextWidth, '700', "'Zen Maru Gothic', sans-serif", 38, 24, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `700 ${nameFit.size}px 'Zen Maru Gothic', sans-serif`;
  const nameStep = nameFit.size * 1.18;
  let y = 116;
  nameFit.lines.forEach((line, li) => {
    ctx.fillText(line, cx, y + li * nameStep);
  });
  y += nameFit.lines.length * nameStep + 8;

  const rarityFit = cardFitTextMultiline(ctx, cat.rarityText, maxTextWidth, '600', "'Zen Maru Gothic', sans-serif", 14, 10, 2);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = `600 ${rarityFit.size}px 'Zen Maru Gothic', sans-serif`;
  const rarityStep = rarityFit.size * 1.3;
  rarityFit.lines.forEach((line, li) => {
    ctx.fillText(line, cx, y + li * rarityStep);
  });
  y += rarityFit.lines.length * rarityStep + 12;

  const blurbFit = cardFitTextMultiline(ctx, cat.blurb, maxTextWidth, '500', "'Zen Maru Gothic', sans-serif", 17, 12, 7);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `500 ${blurbFit.size}px 'Zen Maru Gothic', sans-serif`;
  const blurbStep = blurbFit.size * 1.5;
  blurbFit.lines.forEach((line, li) => {
    ctx.fillText(line, cx, y + li * blurbStep);
  });
  y += blurbFit.lines.length * blurbStep + 16;

  const punchFit = cardFitTextMultiline(ctx, cat.punchline, maxTextWidth, '700', "'Zen Maru Gothic', sans-serif", 16, 12, 2);
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = `700 ${punchFit.size}px 'Zen Maru Gothic', sans-serif`;
  const punchStep = punchFit.size * 1.4;
  punchFit.lines.forEach((line, li) => {
    ctx.fillText(line, cx, y + li * punchStep);
  });
  y += punchFit.lines.length * punchStep + 12;

  const lineY = Math.min(y, 548);
  ctx.strokeStyle = 'rgba(160,130,175,0.28)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, lineY);
  ctx.lineTo(rightMax, lineY);
  ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 24px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, cx, lineY + 38);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 17px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, cx, lineY + 68);
}

function drawLoveCharCardStory(ctx, img, cat) {
  const t = UI_TEXT[LANG];
  const W = 1080, H = 1920;
  cardDrawBackground(ctx, W, H);

  const ih = 1000;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, ih);
  ctx.clip();
  cardCoverImage(ctx, img, 0, 0, W, ih);
  cardApplyPastelWash(ctx, 0, 0, W, ih);
  const fade = ctx.createLinearGradient(0, ih - 320, 0, ih);
  fade.addColorStop(0, 'rgba(250,240,248,0)');
  fade.addColorStop(1, CARD_PAL.bg2);
  ctx.fillStyle = fade;
  ctx.fillRect(0, ih - 320, W, 320);
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "700 34px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.loveCharCardEyebrow, W / 2, 1060);

  const maxTextWidth = W - 140;
  const nameFit = cardFitTextMultiline(ctx, cat.name, maxTextWidth, '700', "'Zen Maru Gothic', sans-serif", 58, 34, 2);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `700 ${nameFit.size}px 'Zen Maru Gothic', sans-serif`;
  const nameStep = nameFit.size * 1.18;
  let y = 1130 + nameFit.size * 0.5;
  nameFit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, y + li * nameStep);
  });
  y += nameFit.lines.length * nameStep + 16;

  const rarityFit = cardFitTextMultiline(ctx, cat.rarityText, maxTextWidth, '600', "'Zen Maru Gothic', sans-serif", 24, 17, 2);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = `600 ${rarityFit.size}px 'Zen Maru Gothic', sans-serif`;
  const rarityStep = rarityFit.size * 1.3;
  rarityFit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, y + li * rarityStep);
  });
  y += rarityFit.lines.length * rarityStep + 24;

  const blurbFit = cardFitTextMultiline(ctx, cat.blurb, maxTextWidth, '500', "'Zen Maru Gothic', sans-serif", 30, 20, 7);
  ctx.fillStyle = CARD_PAL.text;
  ctx.font = `500 ${blurbFit.size}px 'Zen Maru Gothic', sans-serif`;
  const blurbStep = blurbFit.size * 1.48;
  blurbFit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, y + li * blurbStep);
  });
  y += blurbFit.lines.length * blurbStep + 32;

  const punchFit = cardFitTextMultiline(ctx, cat.punchline, maxTextWidth, '700', "'Zen Maru Gothic', sans-serif", 28, 18, 3);
  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = `700 ${punchFit.size}px 'Zen Maru Gothic', sans-serif`;
  const punchStep = punchFit.size * 1.4;
  punchFit.lines.forEach((line, li) => {
    ctx.fillText(line, W / 2, y + li * punchStep);
  });
  y += punchFit.lines.length * punchStep + 30;

  const lineY = Math.min(y, 1780);
  ctx.strokeStyle = 'rgba(160,130,175,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, lineY);
  ctx.lineTo(930, lineY);
  ctx.stroke();

  ctx.fillStyle = CARD_PAL.primaryDark;
  ctx.font = "700 38px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(t.cardCta, W / 2, lineY + 60);
  ctx.fillStyle = CARD_PAL.sub;
  ctx.font = "600 26px Poppins, sans-serif";
  ctx.fillText(t.cardBrand, W / 2, lineY + 110);
  ctx.textAlign = 'left';
}

async function buildLoveCharCardCanvas(types, mode) {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch (e) { /* フォント読み込み待ちに失敗しても既定フォントで続行 */ }
  }
  const groupKey = TEMPERAMENT[types.personality];
  const img = await loadCardImage(`img/lovechar64/${groupKey}_${types.love}.jpg`);
  const cat = buildLoveCharCardCat(types);
  const canvas = document.createElement('canvas');
  if (mode === 'story') {
    canvas.width = 1080; canvas.height = 1920;
    drawLoveCharCardStory(canvas.getContext('2d'), img, cat);
  } else {
    canvas.width = 1200; canvas.height = 630;
    drawLoveCharCardX(canvas.getContext('2d'), img, cat);
  }
  return canvas;
}

async function downloadLoveCharCard(mode) {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const groupKey = TEMPERAMENT[lastResult.personality];
  const btnId = mode === 'story' ? 'btn-save-lovechar-card-story' : 'btn-save-lovechar-card';
  const btn = document.getElementById(btnId);
  const original = btn.textContent;
  btn.textContent = t.generatingLabel;
  btn.disabled = true;
  try {
    const canvas = await buildLoveCharCardCanvas(lastResult, mode);
    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `deskanimals-lovechar-${lastResult.love}-${groupKey}-${mode === 'story' ? 'story' : 'x'}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        resolve();
      }, 'image/png');
    });
    trackEvent('save_card', { mode: mode === 'story' ? 'lovechar_story' : 'lovechar', group_key: groupKey });
  } catch (e) {
    console.error('恋愛キャラカード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

function shareLoveCharResult() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const groupKey = TEMPERAMENT[lastResult.personality];
  const entry = LOVECHAR64[groupKey][lastResult.love];
  const text = t.loveCharShareText(entry.name, entry.punchline);
  const url = encodeURIComponent(resultUrl());
  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
  trackEvent('share', { method: 'x_lovechar', group_key: groupKey });
}

function restartQuiz() {
  isSharedView = false;
  document.getElementById('btn-restart').textContent = UI_TEXT[LANG].restartBtn;
  startQuiz();
}

// ===== アクセス解析(任意) =====
// GA4の測定IDが決まったらここに設定してください(空文字の間は何も読み込みません、追加コストなし)
const GA_MEASUREMENT_ID = 'G-GH850PJWLP';
// ローカル開発サーバー(_devserver.ps1)からのアクセスを除外するガード。
// これがないと動作確認のたびに本番GA4にダミーのpageview/eventが記録されてしまう(2026-08-28判明)。
const isLocalDev = ['localhost', '127.0.0.1', ''].includes(location.hostname);
if (GA_MEASUREMENT_ID && !isLocalDev) {
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

// 行動計測用の共通ヘルパー(gtag未読み込み時は何もしない、計測失敗が機能を止めないよう安全に呼ぶ)
function trackEvent(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

// hub-cta(タイプ一覧・何デレ診断への導線)とラッキーアイテム(アフィリエイト)リンクは
// 動的生成/複数箇所に存在するため、クリックイベントを委譲で一括計測する
document.addEventListener('click', (e) => {
  const hubCta = e.target.closest('.hub-cta');
  if (hubCta) { trackEvent('hub_cta_click', { hub_cta_id: hubCta.id || 'unknown' }); return; }
  const luckyItem = e.target.closest('.lucky-item');
  if (luckyItem) { trackEvent('affiliate_click'); return; }
});

document.getElementById('btn-start').addEventListener('click', startQuiz);
document.getElementById('btn-start').addEventListener('click', () => trackEvent('quiz_start'));
document.getElementById('btn-share').addEventListener('click', shareResult);
document.getElementById('btn-share-line').addEventListener('click', shareResultLine);
document.getElementById('btn-copy-url').addEventListener('click', copyResultUrl);
document.getElementById('btn-restart').addEventListener('click', restartQuiz);
document.getElementById('btn-save-card').addEventListener('click', () => downloadResultCard('x'));
document.getElementById('btn-save-card-story').addEventListener('click', () => downloadResultCard('story'));
document.getElementById('btn-share-love').addEventListener('click', shareLoveResult);
document.getElementById('btn-save-love-card').addEventListener('click', downloadLoveCard);
document.getElementById('btn-share-lovechar').addEventListener('click', shareLoveCharResult);
document.getElementById('btn-save-lovechar-card').addEventListener('click', () => downloadLoveCharCard('x'));
document.getElementById('btn-save-lovechar-card-story').addEventListener('click', () => downloadLoveCharCard('story'));
document.getElementById('btn-invite-guess').addEventListener('click', copyInviteGuessUrl);
document.getElementById('btn-guess-start').addEventListener('click', startGuessQuiz);
document.getElementById('btn-guess-take-quiz').addEventListener('click', () => { trackEvent('guess_reveal_take_quiz'); startQuiz(); });
document.getElementById('btn-lang-ja').addEventListener('click', () => setLang('ja'));
document.getElementById('btn-lang-en').addEventListener('click', () => setLang('en'));
document.getElementById('btn-lang-ja-chat').addEventListener('click', () => { setLang('ja'); refreshBlockLabel(); });
document.getElementById('btn-lang-en-chat').addEventListener('click', () => { setLang('en'); refreshBlockLabel(); });

// URLの?lang=en/jaを見て表示言語を決める(?r=結果コードの有無に関わらず適用)。
// 以前は?r=とセットの時しか読んでいなかったため、EN向けSNS投稿等から?lang=en単独で
// 直接ランディングしても言語が切り替わらない不具合があった(2026-09-05修正)。
// さらに?langパラメータが無い通常訪問(検索流入・直接アクセス等)ではsetLang()自体が
// 一度も呼ばれず、setLang内でしか実行されないapplyLangUI()も未実行のままだったため、
// UI_TEXT.jaの内容(フッター免責文言等)が反映されずindex.html側の静的な初期文言が
// そのまま表示され続ける不具合があった(2026-09-08発見・修正、常にsetLangを実行させる)。
(function initLangFromUrl() {
  const params = new URLSearchParams(location.search);
  const langParam = params.get('lang');
  setLang(langParam === 'en' ? 'en' : 'ja');
})();

// 結果URL(?r=符号)で直接開かれた場合は、その場で同じ結果を再現して表示する
// (表示言語は上のinitLangFromUrlで?langから復元済み。共有した本人が見ていた言語で開ける)
(function loadFromResultCode() {
  const params = new URLSearchParams(location.search);
  const code = params.get('r');
  if (!code) return;
  const types = decodeResultCode(code);
  if (!types) return;
  isSharedView = true;
  document.getElementById('btn-restart').textContent = UI_TEXT[LANG].restartBtnFirstVisit;
  lastResult = types;
  showScreen('result');
  renderResultCards(types);
  renderCardPreview(types);
  renderLoveCharCardPreview(types);
  updateCompatLink(types);
})();

// 予想リンク(?guess=性格タイプ4文字)で開かれた場合は、友達の性格を予想する画面を出す
// (表示言語は上のinitLangFromUrlで?langから復元済み)。?r=と同時に来ることは無い想定だが、
// 念のため?rの結果表示より後に評価し、?guessがあればそちらを優先する。
(function loadFromGuessLink() {
  const params = new URLSearchParams(location.search);
  const target = params.get('guess');
  if (!target || !MBTI_TYPE_RE.test(target)) return;
  guessTargetCode = target;
  showScreen('guess');
})();
