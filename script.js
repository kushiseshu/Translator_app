const languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fj-FJ": "Fijian",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "kl-GL": "Greenlandic",
    "km-KH": "Cambodian",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "lo-LA": "Lao",
    "lt-LT": "Lithuanian",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "mk-MK": "Macedonian",
    "ml-IN": "Malayalam",
    "mn-MN": "Mongolian",
    "mfe-MU": "Mauritian Creole",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "pau-PW": "Palauan",
    "pa-IN": "Punjabi",
    "ps-PK": "Pashto",
    "pap-AN": "Papiamento",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "qu-PE": "Quechua",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "sr-RS": "Serbian",
    "sk-SK": "Slovak",
    "sl-SI": "Slovenian",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "ur-PK": "Urdu",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
  };
  
  const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    exchangeIcon = document.querySelector(".exchange"),
    selectTag = document.querySelectorAll("select"),
    icons = document.querySelectorAll(".row ion-icon"),
    translateBtn = document.querySelector("button");
  
  selectTag.forEach((tag, id) => {
    for (let lang_code in languages) {
      let selected =
        id == 0
          ? lang_code == "en-GB"
            ? "selected"
            : ""
          : lang_code == "fa-IR"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${lang_code}">${languages[lang_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });
  
  fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
      toText.value = "";
    }
  });
  
  translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
      translateFrom = selectTag[0].value,
      translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach((data) => {
          if (data.id === 0) {
            toText.value = data.translation;
          }
        });
        toText.setAttribute("placeholder", "Translation");
      });
  });
  
  exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
      tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
  });
  
  icons.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
      if (!fromText.value && !toText.value) return;
      if (target.getAttribute("name") == "copy-outline") {
        if (target.id == "from") {
          navigator.clipboard.writeText(fromText.value);
        } else {
          navigator.clipboard.writeText(toText.value);
        }
      } else {
        let utterance;
        if (target.id == "from") {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTag[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
      }
    });
  });
  