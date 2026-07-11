const STORAGE_KEY = "nlaGalleryPromptGenerator.v2";

const defaultPools = {
  themeCategory: [
    "Flower × Memory × Water",
    "Flower × Emotion × Season",
    "Memory × Architecture × Story",
    "Sky × Emotion × Story",
    "Water × Memory × Emotion",
    "Architecture × Sky × Story",
    "Season × Flower × Emotion",
    "Story × Memory × Architecture"
  ],
  theme: [
    "祈りが静かにほどける夜",
    "戻らない時間を抱いた展示肖像",
    "別れの直前に残された沈黙",
    "希望だけが薄く光る暗い余白",
    "封印された記憶が輪郭だけを残す",
    "遠い再会を待つための静かな儀式",
    "孤独が美しさとして額装される瞬間",
    "小さな光を守るための夜"
  ],
  outfit: [
    "黒のゴシックロリータドレス、細いレース、マットなベルベット、控えめな銀装飾",
    "白と黒のクラシカルロリータ、硬質な襟、繊細な袖口、抑制されたフリル",
    "深いワインレッドのドレス、重い布地、黒レース、細いコルセットライン",
    "生成りのロングドレス、古い礼拝服のような構造、柔らかなレース",
    "墨色の和ゴス衣装、直線的な袖、静かな布の重なり、装飾は最小限"
  ],
  gaze: [
    "無表情に近い穏やかな顔、こちらを見ない斜め下の視線",
    "静かに祈るような表情、遠くを見る視線",
    "感情を閉じ込めた瞳、真正面を見つめる視線",
    "少しだけ寂しげな表情、横顔、視線は象徴へ向かう",
    "眠りから覚めた直後のような淡い表情、半眼、光を受ける視線"
  ],
  pose: [
    "胸元に片手を添えて静かに立つ",
    "椅子に浅く腰掛け、背筋を伸ばす",
    "片膝をわずかに曲げ、余白の中央に立つ",
    "両手を前で重ね、儀式の前のように佇む",
    "横向きに立ち、顔だけを少しこちらへ向ける"
  ],
  background: [
    "暗いグラデーション背景、余白の奥に象徴の気配だけが沈む",
    "黒に近い静かな背景、光沢紙で破綻しない柔らかな明暗",
    "展示壁のように静かな余白、象徴だけが薄い反射として広がる",
    "深い影を持つ背景、輪郭を読みやすくするリムライト",
    "余白を大きく取った縦構図、額装時に呼吸が残る背景"
  ],
  direction: [
    "象徴を背景・光・影・衣装の質感へ薄く浸透させる",
    "象徴を大きく増やさず、構図全体の法則として扱う",
    "象徴の輪郭を遠目で読ませ、近くでは質感として見せる",
    "光は粒ではなく、面・筋・反射・リムライトとして整理する",
    "暗部を潰しすぎず、白を飛ばしすぎない展示向けの明暗にする"
  ],
  signatureHook: [
    "象徴の形が衣装のレース端にだけ反復している",
    "瞳の反射に象徴の輪郭が一度だけ映る",
    "余白のグラデーションが象徴の方向へ静かに流れる",
    "リムライトが象徴の輪郭とキャラクターの輪郭をつなぐ",
    "手元の影だけが象徴の形をわずかに示す"
  ],
  visualSurprise: [
    "近付いて見ると、レースの細部が象徴の流れに沿っている",
    "遠目では静かな肖像、近くでは象徴が光沢として見える",
    "背景の暗部に、象徴を支える微細な質感だけが隠れている",
    "顔・手・象徴の三点だけに自然な光沢が残る",
    "余白そのものが象徴の重さを支えるように見える"
  ]
};

const motifCatalog = {
  Flower: [
    "白百合 = 純粋、別れ、静かな愛",
    "薔薇 = 愛、献身、美と棘",
    "彼岸花 = 別れ、記憶、届かない祈り",
    "勿忘草 = 記憶、約束、忘れられない心"
  ],
  Memory: [
    "手紙 = 残された言葉、記憶、届かない想い",
    "鍵 = 選択、運命を開く扉",
    "時計 = 時間、宿命、戻らない刻",
    "鳥籠 = 憧れ、守られた自由、閉じ込められた心"
  ],
  Sky: [
    "月 = 静寂、永遠、祈り、夜の支配",
    "星 = 願い、遠い記憶、孤独な光",
    "流星 = 一瞬の願い、通り過ぎる運命",
    "オーロラ = 夢、境界、夜を染める希望"
  ],
  Water: [
    "水鏡 = 反射、もう一人の自分、境界",
    "湖 = 静寂、深い記憶、沈んだ感情",
    "雨 = 郷愁、記憶、静かな感情",
    "波紋 = 影響、余韻、広がる記憶"
  ],
  Architecture: [
    "礼拝堂 = 祈り、神聖、静かな孤独",
    "回廊 = 道、反復、戻れない時間",
    "駅 = 別れ、旅立ち、待つ時間",
    "塔 = 憧れ、隔たり、届かない場所"
  ],
  Emotion: [
    "別れ = 静かな痛み、終わり、残された愛",
    "祈り = 願い、救い、夜の中の静寂",
    "孤独 = 美しい沈黙、距離、閉じた心",
    "希望 = 小さな光、旅立ち、未来への余白"
  ],
  Story: [
    "待つ = 時間、約束、動かない祈り",
    "見送る = 別れ、献身、背中に残る光",
    "封印 = 秘密、守護、触れられない記憶",
    "再会 = 約束、回帰、ほどける運命"
  ],
  Season: [
    "春 = 再生、始まり、薄い希望",
    "梅雨 = 記憶、湿度、静かな感情",
    "七夕 = 願い、隔たり、一夜の再会",
    "冬 = 静寂、眠り、白い祈り"
  ]
};

const categoryNotes = {
  Flower: "花のカテゴリ。最終的に見せる花・植物系の象徴は一つだけに絞る。",
  Memory: "記憶のカテゴリ。過去の気配は質感として扱い、別モチーフを増やさない。",
  Sky: "空のカテゴリ。夜・光・距離感を設計するが、象徴は一つだけにする。",
  Water: "水のカテゴリ。反射や余韻を光として扱い、別の水モチーフを追加しない。",
  Architecture: "建築のカテゴリ。構図と余白の硬さを作るために使い、背景過多にしない。",
  Emotion: "感情のカテゴリ。表情と明暗で表現し、説明的な物語を増やさない。",
  Story: "物語のカテゴリ。瞬間の状態だけを示し、過剰な演出にしない。",
  Season: "季節のカテゴリ。色温度と空気感に留め、季節小物を増やさない。"
};

const labels = {
  themeCategory: "カテゴリ",
  theme: "今日のテーマ",
  motif: "象徴モチーフ",
  outfit: "衣装",
  gaze: "表情・視線",
  pose: "ポーズ",
  background: "背景",
  direction: "演出",
  signatureHook: "Signature Hook",
  visualSurprise: "Visual Surprise"
};

const pools = JSON.parse(JSON.stringify(defaultPools));

let state = createInitialState();

const fieldControls = document.querySelector("#fieldControls");
const promptOutput = document.querySelector("#promptOutput");
const selectedMotif = document.querySelector("#selectedMotif");
const selectedCategory = document.querySelector("#selectedCategory");
const selectedHook = document.querySelector("#selectedHook");
const motifTitle = document.querySelector("#motifName");
const copyStatus = document.querySelector("#copyStatus");
const poolSelect = document.querySelector("#poolSelect");
const poolEditor = document.querySelector("#poolEditor");
const promptStats = document.querySelector("#promptStats");

function createInitialState() {
  return {
    current: {},
    locked: Object.fromEntries(Object.keys(labels).map((key) => [key, false]))
  };
}

function loadPools() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);
    Object.keys(pools).forEach((key) => {
      if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
        pools[key] = parsed[key];
      }
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function savePools() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pools));
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  promptOutput.focus();
  promptOutput.select();
  document.execCommand("copy");
}

function pickRandomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickRandom(key) {
  return pickRandomFrom(pools[key]);
}

function motifName(value) {
  return (value || "-").split("=")[0].trim();
}

function primaryCategory(value) {
  const category = (value || "").split("×")[0].trim();
  return motifCatalog[category] ? category : "";
}

function motifPoolForCurrentTheme() {
  const category = primaryCategory(state.current.themeCategory);
  return category ? motifCatalog[category] : Object.values(motifCatalog).flat();
}

function pickMotifForCurrentTheme() {
  return pickRandomFrom(motifPoolForCurrentTheme());
}

function generatePrompt() {
  const previousCategory = state.current.themeCategory;

  Object.keys(labels).forEach((key) => {
    if (key === "motif") return;
    if (!state.locked[key] || !state.current[key]) {
      state.current[key] = pickRandom(key);
    }
  });

  const categoryChanged = previousCategory !== state.current.themeCategory;
  if (!state.locked.motif || !state.current.motif || categoryChanged) {
    state.current.motif = pickMotifForCurrentTheme();
  }

  renderFields();
  renderPrompt();
}

function rerollField(key) {
  if (key === "motif") {
    state.current.motif = pickMotifForCurrentTheme();
  } else {
    state.current[key] = pickRandom(key);
    if (key === "themeCategory" && !state.locked.motif) {
      state.current.motif = pickMotifForCurrentTheme();
    }
  }

  renderFields();
  renderPrompt();
}

function renderFields() {
  fieldControls.innerHTML = "";

  Object.keys(labels).forEach((key, index) => {
    const card = document.createElement("article");
    card.className = "field-card";

    const fieldIndex = document.createElement("div");
    fieldIndex.className = "field-index";
    fieldIndex.textContent = String(index + 1).padStart(2, "0");

    const body = document.createElement("div");
    body.className = "field-body";

    const title = document.createElement("div");
    title.className = "field-title";
    title.innerHTML = `<span>${labels[key]}</span><span class="field-state">${state.locked[key] ? "固定中" : "ランダム"}</span>`;

    const value = document.createElement("div");
    value.className = "field-value";
    value.textContent = state.current[key] || "-";

    const actions = document.createElement("div");
    actions.className = "field-actions";

    const reroll = document.createElement("button");
    reroll.className = "text-button";
    reroll.type = "button";
    reroll.textContent = "この項目だけ再抽選";
    reroll.addEventListener("click", () => rerollField(key));

    const lockLabel = document.createElement("label");
    lockLabel.className = "lock-label";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.locked[key];
    checkbox.addEventListener("change", () => {
      state.locked[key] = checkbox.checked;
      renderFields();
    });
    lockLabel.append(checkbox, "固定");

    actions.append(reroll, lockLabel);
    body.append(title, value, actions);
    card.append(fieldIndex, body);
    fieldControls.append(card);
  });
}

function renderPrompt() {
  const motif = state.current.motif;
  const motifOnly = motifName(motif);
  const category = state.current.themeCategory;
  const mainCategory = primaryCategory(category);
  const categoryNote = categoryNotes[mainCategory] || "カテゴリは設計指針として使い、可視化する象徴は一つだけに絞る。";

  motifTitle.textContent = motifOnly;
  selectedMotif.textContent = motif;
  selectedCategory.textContent = category;
  selectedHook.textContent = state.current.signatureHook;

  promptOutput.value = `Positive Prompt:
NLA Gallery,
展示・プリント向けの静かなゴシックアート,
Display First Design,
最終出力はL判・2L判・A4プリント、光沢写真紙、額装展示を想定する,
5:7 vertical composition,
optimized for glossy photo paper printing,
designed for framed display,
museum-quality composition,

【固定世界観】
Serafina,
白い髪の人形めいた少女,
陶器のようになめらかな肌,
宝石の瞳,
静かなゴシックロリータ,
キャラクター主体,
大きな余白（negative space）,
引き算された構成,
強いシルエット,
遠目でも読める明確な輪郭,
近くで見ると繊細なレースや質感が分かる,
一つの象徴だけを世界化する,

【今日のテーマ】
${state.current.theme}

【テーマカテゴリ】
${category}
${categoryNote}
カテゴリは作品設計のために使い、画面上の象徴モチーフとして増やさない。

【衣装】
${state.current.outfit}

【表情・視線】
${state.current.gaze}

【ポーズ】
${state.current.pose}

【背景】
${state.current.background}

【演出】
${state.current.direction}

【Signature Hook】
${state.current.signatureHook}

【Visual Surprise】
${state.current.visualSurprise}

【象徴モチーフ（1つだけ）】
Only one symbolic motif: ${motif}

その象徴は、背景・光・影・衣装・レース・構図へ静かに浸透し、
作品全体を支配する世界の法則として存在する。
装飾ではなく、作品そのものの核として表現する。

すべての要素はこの象徴を支えるためだけに存在する。
象徴を強めない要素は加えない。
他の象徴モチーフや物語要素は追加しない。

視線誘導：
①セラフィナ
↓
②${motifOnly}
↓
③近付いて初めて分かる繊細な描写

暗い余白,
静かなグラデーション背景,
余白も作品の一部として扱う,
額に入れたときに完成する構図,
光沢写真紙で美しく見える明暗設計,
黒は潰れすぎず、白は飛びすぎない,
瞳・髪・肌・象徴モチーフに自然な光沢感,
反射は整理され、印刷時に破綻しない,
光は粒ではなく、面・筋・反射・リムライトとして広がる,
マットで滑らかな質感,
超クリーン,
低ノイズ,

Negative Prompt:
過剰装飾なし,
過剰な背景なし,
象徴の重複なし,
複数の象徴モチーフなし,
${motifOnly}以外の象徴モチーフなし,
カテゴリ名に含まれる要素を別モチーフとして追加しない,
過剰なストーリー演出なし,
説明的な小物なし,
粒状ノイズなし,
ざらつきなし,
パーティクル過多なし,
シルエットが崩れる情報量なし,
印刷で潰れるほどの細密背景なし,
端が切れて困る重要要素を配置しない,
重要な顔・手・象徴モチーフは安全域内に収める.`;

  const lineCount = promptOutput.value.split("\n").length;
  promptStats.textContent = `${promptOutput.value.length} chars / ${lineCount} lines`;
}

function renderPoolEditor() {
  poolSelect.innerHTML = "";

  Object.keys(labels)
    .filter((key) => key !== "motif")
    .forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = labels[key];
      poolSelect.append(option);
    });

  poolEditor.value = pools[poolSelect.value].join("\n");
}

document.querySelector("#generateButton").addEventListener("click", generatePrompt);

document.querySelector("#copyButton").addEventListener("click", async () => {
  await copyText(promptOutput.value);
  copyStatus.textContent = "コピーしました";
  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
});

document.querySelector("#resetButton").addEventListener("click", () => {
  state = createInitialState();
  generatePrompt();
});

poolSelect.addEventListener("change", () => {
  poolEditor.value = pools[poolSelect.value].join("\n");
});

document.querySelector("#savePoolButton").addEventListener("click", () => {
  const key = poolSelect.value;
  const nextValues = poolEditor.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (nextValues.length === 0) return;

  pools[key] = nextValues;
  savePools();
  generatePrompt();
});

document.querySelector("#restorePoolButton").addEventListener("click", () => {
  const key = poolSelect.value;
  pools[key] = [...defaultPools[key]];
  savePools();
  poolEditor.value = pools[key].join("\n");
  generatePrompt();
});

loadPools();
renderPoolEditor();
generatePrompt();
