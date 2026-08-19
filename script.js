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

// ===== 五行(占い要素)とラッキーアイテム =====
// MBTIタイプごとの五行属性(3つのマップ全てで共通の属性を使用)
const TYPE_ELEMENT = {
  ISTJ: '土', ISFJ: '土', ESFJ: '土',
  INFJ: '水', ESFP: '水', ENTP: '水',
  INTJ: '金', ISTP: '金', INTP: '金',
  ISFP: '木', INFP: '木', ENFP: '木', ENFJ: '木',
  ESTP: '火', ESTJ: '火', ENTJ: '火',
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
    luckyPriceHint: '¥1,000〜3,000で買えるプチギフト',
    luckySeeMore: (name) => `${name}を見てみる`,
    mbtiElementLine: (type, element) => `MBTI: ${type} ・ 五行: ${element}`,
    catLine: (catName, mapName) => `${catName}(${mapName}にたとえると)`,
    shareText: (p, l, w) => `性格・恋愛・仕事タイプ診断やってみた!\n性格: ${p} / 恋愛: ${l} / 仕事: ${w}\nあなたのタイプもチェック→\n#性格診断 #MBTI診断`,
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
    footerDisclaimer: '本診断はエンタメ目的のコンテンツです。科学的な心理診断や実際の占い・鑑定に代わるものではありません。',
    footerAffiliate: '🔖 本ページの「ラッキーアイテム」リンクにはアフィリエイト(広告)リンクを含みます。リンク経由の購入により、当サイトが紹介料を得る場合があります。',
    followLabel: '🐹 Desk Animalsをフォローする',
    followLabel2: '🔮 他の診断もチェックする',
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
    luckyPriceHint: 'A cute $10–30 treat',
    luckySeeMore: (name) => `Shop ${name}`,
    mbtiElementLine: (type, element) => `MBTI: ${type} · Element: ${element}`,
    catLine: (catName, mapName) => `${catName} — ${mapName} Edition`,
    shareText: (p, l, w) => `I just took a Personality / Love / Career type test!\nPersonality: ${p} / Love: ${l} / Career: ${w}\nTry yours →\n#PersonalityTest #MBTI`,
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
    footerDisclaimer: 'This test is for entertainment purposes only and is not a substitute for a scientific psychological assessment or professional reading.',
    footerAffiliate: '🔖 The "Lucky Item" links on this page are affiliate (ad) links. We may earn a commission on purchases made through these links.',
    followLabel: '🐹 Follow Desk Animals',
    followLabel2: '🔮 Try another quiz',
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
  document.getElementById('btn-copy-url').textContent = t.copyUrlBtn;
  document.getElementById('btn-restart').textContent = t.restartBtn;
  document.getElementById('btn-save-card').textContent = t.saveCardBtn;
  document.getElementById('btn-save-card-story').textContent = t.saveCardStoryBtn;
  document.getElementById('result-card-preview-hint').textContent = t.cardPreviewHint;
  document.getElementById('footer-disclaimer').textContent = t.footerDisclaimer;
  document.getElementById('footer-affiliate').textContent = t.footerAffiliate;
  document.getElementById('follow-label').textContent = t.followLabel;
  document.getElementById('follow-label-2').textContent = t.followLabel2;
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
  updateCompatLink(lastResult);
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

function decodeResultCode(code) {
  if (!/^[A-Z]{12}$/.test(code)) return null;
  return {
    personality: code.slice(0, 4),
    love: code.slice(4, 8),
    work: code.slice(8, 12),
  };
}

function resultUrl() {
  if (!lastResult) return location.href;
  return location.origin + location.pathname + '?r=' + buildResultCode(lastResult);
}

function copyResultUrl() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const btn = document.getElementById('btn-copy-url');
  navigator.clipboard.writeText(resultUrl()).then(() => {
    const original = btn.textContent;
    btn.textContent = t.copiedLabel;
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
      <div class="desc">${desc}</div>
      <div class="lucky-bridge">${luckyBridge}</div>
      <a class="lucky-item" href="${affiliateUrl(luckyKeyword)}" target="_blank" rel="noopener sponsored">
        <span class="lucky-emoji">${LUCKY_ICON_MAP[lucky.emoji] ? `<img src="img/lucky-icons/${LUCKY_ICON_MAP[lucky.emoji]}.jpg" alt="" loading="lazy">` : lucky.emoji}</span>
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

// 結果画面に常時イラストを表示する(ダウンロードボタンを押すまで中身が見えない状態を避けるため)。
// <img>化しておくことで、スマホの長押し保存やPCの右クリック保存もそのまま使える。
async function renderCardPreview(types) {
  const preview = document.getElementById('result-card-preview');
  preview.innerHTML = '';
  try {
    const canvas = await buildResultCardCanvas(types, 'x');
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.alt = 'result card preview';
    preview.appendChild(img);
  } catch (e) {
    console.error('結果カードプレビューの生成に失敗しました', e);
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
  } catch (e) {
    console.error('結果カード生成に失敗しました', e);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

function shareResult() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const pLabel = blockMap.personality[lastResult.personality][1];
  const lLabel = blockMap.love[lastResult.love][1];
  const wLabel = blockMap.work[lastResult.work][1];
  const text = t.shareText(pLabel, lLabel, wLabel);
  const url = encodeURIComponent(resultUrl());
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

function shareResultLine() {
  if (!lastResult) return;
  const t = UI_TEXT[LANG];
  const blockMap = getBlockMap();
  const pLabel = blockMap.personality[lastResult.personality][1];
  const lLabel = blockMap.love[lastResult.love][1];
  const wLabel = blockMap.work[lastResult.work][1];
  const text = t.shareText(pLabel, lLabel, wLabel);
  const url = encodeURIComponent(resultUrl());
  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

function restartQuiz() {
  startQuiz();
}

// ===== アクセス解析(任意) =====
// GA4の測定IDが決まったらここに設定してください(空文字の間は何も読み込みません、追加コストなし)
const GA_MEASUREMENT_ID = 'G-GH850PJWLP';
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
document.getElementById('btn-copy-url').addEventListener('click', copyResultUrl);
document.getElementById('btn-restart').addEventListener('click', restartQuiz);
document.getElementById('btn-save-card').addEventListener('click', () => downloadResultCard('x'));
document.getElementById('btn-save-card-story').addEventListener('click', () => downloadResultCard('story'));
document.getElementById('btn-lang-ja').addEventListener('click', () => setLang('ja'));

// 結果URL(?r=符号)で直接開かれた場合は、その場で同じ結果を再現して表示する
(function loadFromResultCode() {
  const code = new URLSearchParams(location.search).get('r');
  if (!code) return;
  const types = decodeResultCode(code);
  if (!types) return;
  lastResult = types;
  showScreen('result');
  renderResultCards(types);
  renderCardPreview(types);
  updateCompatLink(types);
})();
document.getElementById('btn-lang-en').addEventListener('click', () => setLang('en'));
