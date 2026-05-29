const QUESTIONS = {
  q1: {
    progress: 1,
    text: "旅行では、“ゆっくり味わうこと”より、“新しい刺激”を求めますか？",
    yes: "q2r",
    no: "q2l"
  },
  q2l: {
    progress: 2,
    text: "旅先では、人の暮らしや文化に触れることに魅力を感じますか？",
    yes: "q3c",
    no: "q3d"
  },
  q2r: {
    progress: 2,
    text: "旅先では、計画通りより“偶然の発見”を楽しみたいですか？",
    yes: "q3a",
    no: "q3b"
  },
  q3c: {
    progress: 3,
    text: "“職人の技術”より、“街や建物に残る歴史”に惹かれますか？",
    yes: "result3",
    no: "result4"
  },
  q3d: {
    progress: 3,
    text: "旅行では観光より、“食や日常の空気感”を楽しみたいですか？",
    yes: "result7",
    no: "result1"
  },
  q3a: {
    progress: 3,
    text: "知らない場所を“調べたい”より、“踏み込んでみたい”気持ちが強いですか？",
    yes: "result8",
    no: "result2"
  },
  q3b: {
    progress: 3,
    text: "旅では、景色や空気感で“気分が高まる瞬間”を求めますか？",
    yes: "result6",
    no: "result5"
  }
};

const RESULTS = [
  {
    id: 1,
    category: "心を癒したい・リセットしたい",
    numeral: "①",
    prefecture: "群馬県東吾妻町",
    spot: "岩櫃山・箱島湧水",
    image: "assets/images/result-01.png",
    url: "https://www.youtube.com/watch?v=7nuJbipsWRc&t=56s"
  },
  {
    id: 2,
    category: "日本を知りたい・学びたい",
    numeral: "②",
    prefecture: "神奈川県小田原市",
    spot: "小田原城、常盤木門 SAMURAI館",
    image: "assets/images/result-02.png",
    url: "https://www.youtube.com/watch?v=zo3f7BZ3dNQ&t=63s"
  },
  {
    id: 3,
    category: "歴史的建造物を前にして思いを馳せたい",
    numeral: "③",
    prefecture: "大阪府東大阪市",
    spot: "石切劔箭神社",
    image: "assets/images/result-03.png",
    url: "https://www.youtube.com/watch?v=NdXBdUlltts"
  },
  {
    id: 4,
    category: "伝承の技を前にして感銘を受けたい",
    numeral: "④",
    prefecture: "奈良県",
    spot: "當麻寺 練供養会式",
    image: "assets/images/result-04.png",
    url: "https://www.youtube.com/watch?v=Y_9Xo8kUbhQ&t=38s"
  },
  {
    id: 5,
    category: "ロマンチックになりたい・感動したい",
    numeral: "⑤",
    prefecture: "富山県南砺市",
    spot: "菅沼合掌造り集落、相倉合掌造り集落",
    image: "assets/images/result-05.png",
    url: "https://www.youtube.com/watch?v=5n2so5M8EvU&t=80s"
  },
  {
    id: 6,
    category: "解放感やワクワクを味わいたい",
    numeral: "⑥",
    prefecture: "北海道ニセコ町",
    spot: "アンヌプリスキー場",
    image: "assets/images/result-06.png",
    url: "https://www.youtube.com/watch?v=nsKV9GSn8Ew"
  },
  {
    id: 7,
    category: "暮らしや食を味わいたい",
    numeral: "⑦",
    prefecture: "岡山県倉敷市",
    spot: "美観地区",
    image: "assets/images/result-07.png",
    url: "https://www.youtube.com/watch?v=MLyLSdGLvS8"
  },
  {
    id: 8,
    category: "探検・探求したい",
    numeral: "⑧",
    prefecture: "高知県",
    spot: "龍河洞",
    image: "assets/images/result-08.png",
    url: "https://www.youtube.com/watch?v=ymx02AQDWBk"
  }
];
