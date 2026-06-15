const shoeProducts = [
  // --- CASUAL SHOES (休閒鞋) ---
  {
    id: "casual_1",
    name: "AeroWalk Knit",
    zhName: "AeroWalk 輕盈透氣編織休閒鞋",
    category: "casual",
    categoryZh: "休閒鞋",
    price: 2580,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 245,
    tag: "暢銷推薦",
    description: "AeroWalk Knit 採用全新升級的 3D 一體成型編織技術，完美貼合腳型。極輕量化的設計與高透氣孔洞，讓您在都市漫步時感受前所未有的無感體驗。簡約的灰色調，輕鬆百搭各式日常穿搭。",
    features: [
      "3D 一體成型針織鞋面，極致透氣與貼合度",
      "高彈性緩震 EVA 中底，有效吸收步行衝擊",
      "防滑耐磨橡膠大底，提升行走穩定性",
      "內置吸濕排汗抗菌鞋墊，長效保持足部乾爽"
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "太空灰", hex: "#94a3b8" },
      { name: "極簡白", hex: "#e2e8f0" }
    ]
  },
  {
    id: "casual_2",
    name: "UrbanCanvas Low",
    zhName: "UrbanCanvas 經典低筒帆布鞋",
    category: "casual",
    categoryZh: "休閒鞋",
    price: 1880,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewsCount: 189,
    tag: "經典百搭",
    description: "傳承經典的低筒帆布設計，UrbanCanvas Low 採用 12oz 重磅耐磨純棉帆布製作。搭配加厚乳膠鞋墊，徹底改善傳統帆布鞋底偏硬的問題。經典海軍藍配色與復古膠底，是街頭潮流不退流行的標誌。",
    features: [
      "12oz 雙股重磅高密度棉質帆布，耐磨且透氣",
      "加厚高彈力乳膠鞋墊，提供全天候舒適腳感",
      "硫化橡膠防滑大底，抓地力強且不易開膠",
      "經典低筒剪裁，修飾腿部線條"
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "海軍藍", hex: "#1e3a8a" },
      { name: "純黑", hex: "#111827" }
    ]
  },
  {
    id: "casual_3",
    name: "StreetLuxe Leather",
    zhName: "StreetLuxe 奢華白皮革小白鞋",
    category: "casual",
    categoryZh: "休閒鞋",
    price: 3580,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 312,
    tag: "質感嚴選",
    description: "這款精心打造的精品級白鞋，採用頂級頭層牛皮製成。極簡的白色鞋身搭配精緻的金線縫線與亮金色後跟細節，散發無與倫比的輕奢質感。無論是商務休閒還是週末約會，都能完美駕馭。",
    features: [
      "嚴選頂級頭層荔枝紋牛皮，觸感柔軟、越穿越有質感",
      "全真皮內裡與高密度記憶棉鞋墊，極致親膚緩震",
      "金屬質感精緻 LOGO 烙印與高級鞋帶孔細節",
      "手工縫線針步，質感與耐用度大幅提升"
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "奢華白", fillName: "Luxury White", hex: "#f8fafc" },
      { name: "極光黑", fillName: "Aurora Black", hex: "#0f172a" }
    ]
  },
  {
    id: "casual_4",
    name: "RetroVibe Suede",
    zhName: "RetroVibe 復古麂皮德訓鞋",
    category: "casual",
    categoryZh: "休閒鞋",
    price: 2980,
    originalPrice: 3800,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 154,
    tag: "復古潮流",
    description: "致敬經典德訓鞋款，RetroVibe Suede 將高級牛麂皮與荔枝皮拼接，堆疊出豐富的層次感。搭配標誌性的焦糖色生膠鞋底，流露出濃郁的復古氣息。搭載改良版足弓支撐鞋墊，復古與舒適並存。",
    features: [
      "進口牛麂皮與優質荔枝皮拼接鞋面，層次感極佳",
      "天然耐磨焦糖色生膠底，提供優異摩擦力與復古調性",
      "足弓微加高人體工學鞋墊，舒緩長時間站立疲勞",
      "柔軟包覆鞋口防磨腳設計"
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "焦糖栗", hex: "#78350f" },
      { name: "石泥灰", hex: "#4b5563" }
    ]
  },

  // --- RUNNING SHOES (慢跑鞋) ---
  {
    id: "running_1",
    name: "ApexRunner Evo",
    zhName: "ApexRunner Evo 科技緩震跑鞋",
    category: "running",
    categoryZh: "慢跑鞋",
    price: 4280,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 428,
    tag: "專業跑鞋",
    description: "ApexRunner Evo 是為追求極致表現的跑者設計的旗艦鞋款。中底搭載全新 Evo-Foam 螢光綠避震科技科技，回彈率高達 75%。工程網眼鞋面在關鍵部位加強抗拉伸，確保高速奔馳下的支撐感與穩定性。",
    features: [
      "Evo-Foam 高回彈超臨界發泡中底，極致緩震回彈",
      "工程提花網布鞋面，分區透氣與精準支撐",
      "後跟 TPU 穩定環，鎖定足跟，防止側翻",
      "耐磨碳素橡膠大底 (AHAR)，耐磨度提升 3 倍"
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "暗夜綠", hex: "#334155" },
      { name: "極速紅", hex: "#991b1b" }
    ]
  },
  {
    id: "running_2",
    name: "CloudStride Pro",
    zhName: "CloudStride Pro 雲感超緩震慢跑鞋",
    category: "running",
    categoryZh: "慢跑鞋",
    price: 3880,
    originalPrice: 4800,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 367,
    tag: "舒適雲感",
    description: "CloudStride Pro 帶來如同踩在雲朵上的柔軟路感。增厚 33mm 的雙密度中底，能大幅降低跑步對膝蓋關節的衝擊。專為中長距離路跑與日常踏步所設計，也是體重較重跑者的首選避震跑鞋。",
    features: [
      "33mm 超厚度 Cloud-Pad 雙層避震中底",
      "搖擺弧形中底設計，引導步態轉換，跑步更省力",
      "親膚彈性針織鞋領，完美包覆踝部防入沙",
      "輕量化工程橡膠防滑大底"
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "破曉藍", hex: "#0284c7" },
      { name: "櫻花粉", hex: "#f472b6" }
    ]
  },
  {
    id: "running_3",
    name: "TrailBlazer GTX",
    zhName: "TrailBlazer 防水越野徒步跑鞋",
    category: "running",
    categoryZh: "慢跑鞋",
    price: 4980,
    originalPrice: 5800,
    image: "https://images.unsplash.com/photo-1538802621024-8bba79e94b43?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 198,
    tag: "戶外越野",
    description: "無懼惡劣天氣與複雜地形！TrailBlazer 配備 RainShield 奈米防潑水塗層，保持雙腳全天候乾爽。底盤採用 5mm 深溝槽防滑橡膠，在濕滑的泥地、碎石路面上皆具備絕佳的抓地性能，深灰搭配亮橘極具戶外山系美學。",
    features: [
      "奈米級防撕裂防潑水科技鞋面，無懼泥沙與風雨",
      "5mm 齒爪狀粗獷抓地橡膠大底，濕滑泥地救星",
      "前掌防穿刺護足板 (Rock Plate)，免受尖石傷害",
      "快速綁帶系統，一拉即緊，便利性十足"
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "熔岩橙", hex: "#ea580c" },
      { name: "軍綠黑", hex: "#1c1917" }
    ]
  },
  {
    id: "running_4",
    name: "SwiftKnit Lite",
    zhName: "SwiftKnit Lite 超輕量競速路跑鞋",
    category: "running",
    categoryZh: "慢跑鞋",
    price: 3680,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviewsCount: 112,
    tag: "競速輕量",
    description: "單隻重量僅 185 克的 SwiftKnit Lite，是為尋求自我突破的競速跑者而生。超薄高強度的針織鞋身緊密貼合足部，幾乎感覺不到重量。高彈力薄型推進中底，將您的每一分推力精準地轉化為向前的動力。",
    features: [
      "極限輕量化設計，單足重僅 185g (US 9)",
      "一體編織網孔鞋面，宛如第二層肌膚的透氣度",
      "Lite-Speed 薄型超回彈推进板，提供強大前推力",
      "耐磨輕量橡膠防滑配置，完美兼顧重量與壽命"
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "烈焰紅", hex: "#dc2626" },
      { name: "極光白", hex: "#f8fafc" }
    ]
  },

  // --- BASKETBALL SHOES (籃球鞋) ---
  {
    id: "basketball_1",
    name: "HyperDunk Prime",
    zhName: "HyperDunk Prime 經典實戰籃球鞋",
    category: "basketball",
    categoryZh: "籃球鞋",
    price: 3980,
    originalPrice: 4800,
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 512,
    tag: "全能實戰",
    description: "HyperDunk Prime 是為球場上全能型球員打造的實戰利器。高筒設計配合高強度護踝結構，提供極致的足踝鎖定。中底搭載前掌 Zoom 與後掌 Bounce 的雙重緩震科技，確保落地時的完美防護與起步時的瞬間爆發。",
    features: [
      "立體高筒加厚保護泡棉，提供強踝支撐",
      "前 Zoom + 後 Bounce 雙科技配置，回彈與避震完美平衡",
      "側向防側翻延伸結構 (Outrigger)，有效預防扭傷",
      "耐磨生膠人字紋大底，提供頂級的防滑抓地力"
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    colors: [
      { name: "公牛紅", hex: "#991b1b" },
      { name: "黑曜石", hex: "#111827" }
    ]
  },
  {
    id: "basketball_2",
    name: "CourtKing Alpha",
    zhName: "CourtKing Alpha 低筒後衛籃球鞋",
    category: "basketball",
    categoryZh: "籃球鞋",
    price: 3780,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 289,
    tag: "靈活速度",
    description: "專為速度型與變向突破後衛設計。CourtKing Alpha 採用低筒剪裁，釋放踝關節最大靈活度。中底採貼地感極佳的超薄緩震材料，大幅縮短反應時間。紫金華麗配色，讓您在球場上成為目光焦點。",
    features: [
      "極速反應貼地中底，切入、變向毫不拖泥帶水",
      "熱熔式 TPU 加固工程網布鞋面，輕量且防撕裂",
      "足弓大面積 TPU 抗扭轉穩定片，強韌支撐",
      "人體工學放射狀抓地紋路，急停變向救星"
    ],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: [
      { name: "湖人紫", hex: "#581c87" },
      { name: "傳奇金", hex: "#eab308" }
    ]
  },
  {
    id: "basketball_3",
    name: "AirBounce Max",
    zhName: "AirBounce Max 概念全氣墊籃球鞋",
    category: "basketball",
    categoryZh: "籃球鞋",
    price: 4580,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 340,
    tag: "旗艦緩震",
    description: "AirBounce Max 結合了未來感設計與極限緩震。鞋底配備可視化全掌高容量氣墊，為每次躍起落地帶來驚人的回彈與膝蓋保護。半透明冰藍色橡膠大底配合深黑鞋身，猶如穿梭於未來賽博空間的戰靴。",
    features: [
      "可視化全掌高承載氣墊 (Full-Length Air)，吸收 95% 衝擊力",
      "碳纖維紋理防扭片，確保重度實戰下的底盤穩定",
      "半透明水晶耐磨大底，質感與機能完美結合",
      "Kevlar 防彈纖維強化鞋帶孔，強力包裹"
    ],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    colors: [
      { name: "霓虹藍", hex: "#06b6d4" },
      { name: "暗夜黑", hex: "#111827" }
    ]
  },
  {
    id: "basketball_4",
    name: "ZoneDefender Mid",
    zhName: "ZoneDefender 鋒線禁區中筒籃球鞋",
    category: "basketball",
    categoryZh: "籃球鞋",
    price: 3680,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewsCount: 167,
    tag: "極致支撐",
    description: "這是一款為中鋒與強力鋒線球員設計的防守硬派戰靴。中筒設計兼顧足踝活動度與保護，側向大面積 TPU 包裹穩定翼提供頂級的側向防護，是禁區肉搏、搶奪籃板時最堅實的後盾。",
    features: [
      "高密度防撞泡棉護踝，專為禁區對抗設計",
      "雙密度緩震中底，吸收跳躍落地重力衝擊",
      "3D 立體側向 TPU 鎖定結構，防止側翻與滑移",
      "高耐磨粗人字紋外底，抓地力強大持久"
    ],
    sizes: [41, 42, 43, 44, 45, 46, 47, 48],
    colors: [
      { name: "鋼鐵灰", hex: "#94a3b8" },
      { name: "純潔白", hex: "#e2e8f0" }
    ]
  },

  // --- ACCESSORIES (配件) ---
  {
    id: "accessory_1",
    name: "VibeCrew Socks 3-Pack",
    zhName: "VibeCrew 專業吸濕排汗運動中筒襪 (三雙裝)",
    category: "accessory",
    categoryZh: "配件",
    price: 490,
    originalPrice: 650,
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 520,
    tag: "暢銷配件",
    description: "專為高強度運動設計的 Crew 中筒襪。在足底與後跟等關鍵易磨損部位進行加厚圈絨設計，提供額外的緩震保護。搭配專利排汗編織，即使長時間運動，也能保持雙腳涼爽不悶熱。內含黑、白、灰三色各一雙。",
    features: [
      "足底高密度圈絨加厚避震，舒緩落地衝擊力",
      "中足環狀彈性防滑收縮帶，確保襪子服貼不滑移",
      "阿基里斯腱處特殊防摩擦保護加厚",
      "CoolMax 吸濕排汗科技纖維，透氣抗菌防臭"
    ],
    sizes: ["S (22-24cm)", "M (25-27cm)", "L (28-30cm)"],
    colors: [
      { name: "經典三色組", hex: "#64748b" }
    ]
  },
  {
    id: "accessory_2",
    name: "SoleCare Cleaner Kit",
    zhName: "SoleCare 頂級溫和洗鞋清潔組",
    category: "accessory",
    categoryZh: "配件",
    price: 680,
    originalPrice: 850,
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 298,
    tag: "洗鞋神器",
    description: "SoleCare 清潔套組是維持您愛鞋一塵不染的秘密武器。98.3% 天然環保溫和清潔配方，不傷材質亦不傷手，適用於皮革、帆布、麂皮、網布等多種材質。附贈 100% 天然馬毛刷，能溫和且高效刷除髒污。",
    features: [
      "天然椰子油萃取溫和清潔液 (120ml)，無毒環保",
      "高密度軟質天然馬毛刷，不傷鞋面，清潔力卓越",
      "極細纖維超吸水擦拭布，一擦即乾",
      "附便攜拉鍊收納包，旅行攜帶超方便"
    ],
    sizes: ["標準版 120ml"],
    colors: [
      { name: "環保黑綠", hex: "#0f172a" }
    ]
  },
  {
    id: "accessory_3",
    name: "FlexLace Lock",
    zhName: "FlexLace 反光彈性免綁鞋帶組",
    category: "accessory",
    categoryZh: "配件",
    price: 290,
    originalPrice: 390,
    image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviewsCount: 142,
    tag: "實用好物",
    description: "討厭慢跑或運動到一半鞋帶鬆脫嗎？FlexLace 提供完美的解決方案。採用高彈性編織材料，結合專利金屬按扣鎖定裝置，穿鞋只需一拉即可固定。鞋帶中混編高亮度 3M 反光絲，顯著提升夜間運動安全性。",
    features: [
      "免綁快速鞋扣系統，一拉即穿，運動永不鬆脫",
      "加強版 3M 強力反光絲，夜跑警示安全性大加分",
      "高張力橡膠彈性內芯，均勻分佈腳背壓力",
      "隨包附贈兩組金屬膠囊螺絲扣與修剪配件"
    ],
    sizes: ["通用長度 (120cm)"],
    colors: [
      { name: "極光綠", hex: "#10b981" },
      { name: "炫彩紫", hex: "#6366f1" }
    ]
  },

  // --- OTHERS (其它類) ---
  {
    id: "other_1",
    name: "SlideEase Sandal",
    zhName: "SlideEase 運動恢復避震拖鞋",
    category: "other",
    categoryZh: "其它類",
    price: 990,
    originalPrice: 1280,
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 423,
    tag: "運動恢復",
    description: "SlideEase 是高強度訓練或比賽後，雙腳舒緩的最佳選擇。採用極致柔軟的雲感 EVA 發泡材料，根據足底壓力分佈設計人體工學足弓支撐曲線。防滑抓地底紋，不論居家穿著、健身房盥洗或海灘活動皆合適。",
    features: [
      "超軟雲感 EVA 一體成型發泡，釋放全天候壓力",
      "人體工學足弓起伏曲線，支撐並放鬆疲憊足底筋膜",
      "排水凹槽足底顆粒設計，防滑且不黏腳",
      "加厚 4cm 防震大底，腳感超群"
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: [
      { name: "太空黑", hex: "#18181b" },
      { name: "霧夜紫", hex: "#a855f7" }
    ]
  },
  {
    id: "other_2",
    name: "RainShield Covers",
    zhName: "RainShield 高彈性耐磨防水矽膠鞋套",
    category: "other",
    categoryZh: "其它類",
    price: 390,
    originalPrice: 490,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviewsCount: 165,
    tag: "下雨救星",
    description: "突如其來的梅雨讓新買的愛鞋濕透？RainShield 矽膠鞋套是您的完美隨身雨具。採用高彈性食品級矽膠製作，完全包覆鞋身，不留一絲縫隙。底部加厚且帶有仿輪胎抓地防滑紋路，兼顧防水與安全。",
    features: [
      "食品級高彈性防拉扯矽膠，完美緊貼鞋型，百分百防水",
      "加厚鞋底設計，抗撕裂耐用度顯著提升",
      "輪胎防滑紋路鞋底，大幅增加摩擦力，行走超安心",
      "極極量可折疊，附贈專用防水密封袋，輕鬆收納於隨身包"
    ],
    sizes: ["M (適用 35-39碼)", "L (適用 40-45碼)"],
    colors: [
      { name: "半透明白", hex: "#ffffff" },
      { name: "晴空藍", hex: "#38bdf8" }
    ]
  }
];
