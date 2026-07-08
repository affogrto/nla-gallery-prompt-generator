const STORAGE_KEY = "nlaGalleryPromptGenerator.v1";

const defaultPools = {
  character: [
    "銀髪のゴシックロリータ少女、陶器のような肌、静かな気配をまとう",
    "黒髪の少女、長い前髪、宝石のような瞳、沈黙の中に立つ",
    "白い髪の人形めいた少女、細い首筋、無垢さと影を併せ持つ",
    "深紅の瞳を持つ少女、凛とした佇まい、儀式の中心にいるような存在感",
    "淡い金髪の少女、冷たい透明感、古い肖像画のような気品"
  ],
  outfit: [
    "黒のゴシックロリータドレス、細いレース、マットなベルベット、控えめな銀装飾",
    "白と黒のクラシカルロリータ、硬質な襟、繊細な袖口、抑制されたフリル",
    "深いワインレッドのドレス、重い布地、黒レース、細いコルセットライン",
    "生成りのロングドレス、古い礼拝服のような構造、柔らかなレース",
    "墨色の和ゴス衣装、直線的な袖、静かな布の重なり、装飾は最小限"
  ],
  expression: [
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
  motif: [
    "月 = 静寂、永遠、祈り、夜の支配",
    "白蛇 = 導き、運命、再生、守護",
    "金魚 = 記憶、儚さ、幻想、流れる時間",
    "レース = 境界、世界を繋ぐもの、繊細な美",
    "蝶 = 変容、解放、魂の羽化",
    "狐面 = もう一つの顔、二面性、秘密、誘惑",
    "鳥籠 = 憧れ、守られた自由、閉じ込められた心",
    "時計 = 時間、宿命、戻らない刻",
    "鏡 = 反射、もう一人の自分、境界",
    "白百合 = 純粋、別れ、静かな愛",
    "薔薇 = 愛、献身、美と棘",
    "鍵 = 選択、運命を開く扉",
    "雨 = 郷愁、記憶、静かな感情",
    "羽 = 希望、旅立ち、祈り",
    "灯火 = 小さな希望、夜を導く光"
  ]
};

const pools = JSON.parse(JSON.stringify(defaultPools));

const labels = {
  character: "キャラクター",
  outfit: "衣装",
  expression: "表情・視線",
  pose: "ポーズ",
  motif: "象徴モチーフ"
};

let state = {
  current: {},
  locked: {
    character: false,
    outfit: false,
    expression: false,
    pose: false,
    motif: false
  }
};

const fieldControls = document.querySelector("#fieldControls");
const promptOutput = document.querySelector("#promptOutput");
const selectedMotif = document.querySelector("#selectedMotif");
const motifTitle = document.querySelector("#motifName");
const copyStatus = document.querySelector("#copyStatus");
const poolSelect = document.querySelector("#poolSelect");
const poolEditor = document.querySelector("#poolEditor");
const promptStats = document.querySelector("#promptStats");

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

function pickRandom(key) {
  const list = pools[key];
  return list[Math.floor(Math.random() * list.length)];
}

function motifName(value) {
  return value.split("=")[0].trim();
}

function generatePrompt() {
  Object.keys(pools).forEach((key) => {
    if (!state.locked[key] || !state.current[key]) {
      state.current[key] = pickRandom(key);
    }
  });

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
    reroll.addEventListener("click", () => {
      state.current[key] = pickRandom(key);
      renderFields();
      renderPrompt();
    });

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
  motifTitle.textContent = motifOnly;
  selectedMotif.textContent = motif;

  promptOutput.value = `Positive Prompt:
NLA Gallery,
展示・プリント向けの静かなゴシックアート,
Display First Design,
最終出力はL判・2L判・A4プリント、光沢写真紙、額装展示を想定する,
5:7 vertical composition,
optimized for glossy photo paper printing,
designed for framed display,
museum-quality composition,

キャラクター主体,
大きな余白（negative space）,
引き算された構成,
強いシルエット,
遠目でも読める明確な輪郭,
近くで見ると繊細なレースや質感が分かる,
一つの象徴だけを世界化する,

【キャラクター】
${state.current.character}

【衣装】
${state.current.outfit}

【表情・視線】
${state.current.expression}

【ポーズ】
${state.current.pose}

【象徴モチーフ（1つだけ）】
Only one symbolic motif: ${motif}

その象徴は、背景・光・影・衣装・レース・構図へ静かに浸透し、
作品全体を支配する世界の法則として存在する。
装飾ではなく、作品そのものの核として表現する。

すべての要素はこの象徴を支えるためだけに存在する。
象徴を強めない要素は加えない。
他の象徴モチーフや物語要素は追加しない。

視線誘導：
①キャラクター
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

陶器のようになめらかな肌,
宝石の瞳,
整理された反射,
光は粒ではなく、面・筋・反射・リムライトとして広がる,
マットで滑らかな質感,
超クリーン,
低ノイズ,

Negative Prompt:
過剰装飾なし,
過剰な背景なし,
象徴の重複なし,
過剰なストーリー演出なし,
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

  Object.keys(labels).forEach((key) => {
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
  state = {
    current: {},
    locked: {
      character: false,
      outfit: false,
      expression: false,
      pose: false,
      motif: false
    }
  };
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
