export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    54:"C++ (GCC 9.2.0)",
    62:"Java (OpenJDK 13.0.1)",
    71:"Python (3.8.1)",
    63:"JavaScript (Node.js 12.14.0)"
  }

  return LANGUAGE_NAMES[languageId] || "Unknown";
}

export function getLanguageId(language) {
  const languageMap = {
    "C++ (GCC 9.2.0)" : 54,
    "Java (OpenJDK 13.0.1": 62,
    "Python (3.8.1)" : 71,
    "JavaScript (Node.js 12.14.0)": 63
  }
  return languageMap[language.toUpperCase()];
}