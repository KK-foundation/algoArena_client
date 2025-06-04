import { ProblemFormData } from "@/pages/CreateProblemPage";

// --- Sample Data and Load Functionality ---
export const sampledData: ProblemFormData = {
  title: "Longest Common Subsequence",
  description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.
A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.`,
  difficulty: "Medium",
  tags: ["Dynamic Programming", "String"],
  examples: [
    {
      input: `text1 = "abcde", text2 = "ace"`,
      output: `3`,
      explanation: `The longest common subsequence is "ace" and its length is 3.`,
    },
    {
      input: `text1 = "abc", text2 = "abc"`,
      output: `3`,
      explanation: `The longest common subsequence is "abc" and its length is 3.`,
    },
    {
      input: `text1 = "abc", text2 = "def"`,
      output: `0`,
      explanation: `There is no such common subsequence, so the result is 0.`,
    },
  ],
  constraints: `1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.`,
  testcases: [
    { input: `"abcde", "ace"`, output: `3` },
    { input: `"abc", "abc"`, output: `3` },
    { input: `"abc", "def"`, output: `0` },
    { input: `"bl", "yby"`, output: `1` },
  ],
  codeSnippets: {
    JAVASCRIPT: `/**\n * @param {string} text1\n * @param {string} text2\n * @return {number}\n */\nvar longestCommonSubsequence = function(text1, text2) {\n    \n};`,
    JAVA: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}`,
    CPP: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};`,
    PYTHON: `def longestCommonSubsequence(text1, text2):
    pass`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**\n * @param {string} text1\n * @param {string} text2\n * @return {number}\n */\nvar longestCommonSubsequence = function(text1, text2) {\n    const m = text1.length;\n    const n = text2.length;\n    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (text1[i - 1] === text2[j - 1]) {\n                dp[i][j] = 1 + dp[i - 1][j - 1];\n            } else {\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n    return dp[m][n];\n};`,
    JAVA: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length();\n        int n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                    dp[i][j] = 1 + dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n}`,
    CPP: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m = text1.length();\n        int n = text2.length();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1[i - 1] == text2[j - 1]) {\n                    dp[i][j] = 1 + dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n};`,
    PYTHON: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m):
        for j in range(n):
            if text1[i] == text2[j]:
                dp[i + 1][j + 1] = 1 + dp[i][j]
            else:
                dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])
    
    return dp[m][n]`,
  },
  hints: [
    "Try to build a 2D DP array where dp[i][j] stores the length of the longest common subsequence of text1[0...i-1] and text2[0...j-1].",
    "If characters match, it's 1 + dp[i-1][j-1]. Otherwise, it's max(dp[i-1][j], dp[i][j-1]).",
  ],
  editorial: {
    explanation: `The problem can be solved using dynamic programming. Let \`dp[i][j]\` be the length of the longest common subsequence of \`text1[0...i-1]\` and \`text2[0...j-1]\`.
If \`text1[i-1] == text2[j-1]\`, then the characters match, and we can extend the common subsequence found for \`text1[0...i-2]\` and \`text2[0...j-2]\` by 1. So, \`dp[i][j] = 1 + dp[i-1][j-1]\`.
If \`text1[i-1] != text2[j-1]\`, then we cannot include both characters. We take the maximum of the longest common subsequence by either excluding \`text1[i-1]\` (i.e., \`dp[i-1][j]\`) or excluding \`text2[j-1]\` (i.e., \`dp[i][j-1]\`). So, \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`.
The base cases are when either \`i\` or \`j\` is 0, in which case \`dp[i][j] = 0\` as there's no common subsequence with an empty string. The final answer is \`dp[m][n]\` where \`m\` and \`n\` are the lengths of \`text1\` and \`text2\` respectively.`,
    timeComplexity: "O(m*n)",
    spaceComplexity: "O(m*n)",
    code: `// See reference solution for code example.`,
    codeLanguage: "PYTHON",
  },
  companyTag: "Amazon, Google",
};

export const sampleStringProblem: ProblemFormData = {
  title: "Reverse String",
  description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.
You must do this by modifying the input array \`in-place\` with O(1) extra memory.`,
  difficulty: "Easy",
  tags: ["String", "Two Pointers", "Array"],
  examples: [
    {
      input: `s = ["h","e","l","l","o"]`,
      output: `["o","l","l","e","h"]`,
      explanation: `The string "hello" is reversed to "olleh".`,
    },
    {
      input: `s = ["H","a","n","n","a","h"]`,
      output: `["h","a","n","n","a","H"]`,
      explanation: `The string "Hannah" is reversed to "hannaH".`,
    },
  ],
  constraints: `1 <= s.length <= 10^5\ns[i] is a printable ascii character.`,
  testcases: [
    { input: `["h","e","l","l","o"]`, output: `["o","l","l","e","h"]` },
    { input: `["a","b","c"]`, output: `["c","b","a"]` },
    { input: `["A"]`, output: `["A"]` },
  ],
  codeSnippets: {
    PYTHON: `class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        """\n        Do not return anything, modify s in-place instead.\n        """\n        pass`,
    JAVASCRIPT: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    \n};`,
    JAVA: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`,
    CPP: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};`,
  },
  referenceSolutions: {
    PYTHON: `class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        left, right = 0, len(s) - 1\n        while left < right:\n            s[left], s[right] = s[right], s[left]\n            left += 1\n            right -= 1`,
    JAVASCRIPT: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    let left = 0;\n    let right = s.length - 1;\n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++;\n        right--;\n    }\n};`,
    JAVA: `class Solution {\n    public void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n    }\n}`,
    CPP: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        int left = 0, right = s.size() - 1;\n        while (left < right) {\n            swap(s[left], s[right]);\n            left++;\n            right--;\n        }\n    }\n};`,
  },
  hints: ["Use two pointers approach.", "Swap characters from both ends."],
  editorial: {
    explanation: `The problem can be solved efficiently using the two-pointer technique. Initialize two pointers, \`left\` at the beginning of the array and \`right\` at the end of the array. While \`left\` is less than \`right\`, swap the characters at \`s[left]\` and \`s[right]\`, then increment \`left\` and decrement \`right\`. This process continues until the pointers meet or cross, ensuring the entire string is reversed in-place.`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `// See reference solution for code example.`,
    codeLanguage: "PYTHON",
  },
  companyTag: "Facebook, Apple",
};
