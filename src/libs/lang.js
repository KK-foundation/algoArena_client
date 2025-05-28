export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    54:"CPP",
    62:"JAVA",
    71:"PYTHON",
    63:"JAVASCRIPT"
  }

  return LANGUAGE_NAMES[languageId] || "Unknown";
}

export function getLanguageId(language) {
  const languageMap = {
    "CPP" : 54,
    "JAVA": 62,
    "PYTHON" : 71,
    "JAVASCRIPT": 63
  }
  return languageMap[language];
}