import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProblemCard = ({ problem }) => {
  const { authUser } = useAuthStore();
  return (
    <Link to={`/problem/${problem.id}`}>
      <div className="flex justify-between bg-[#303133] hover:bg-[#13181c] px-4 py-2 rounded-lg shadow-xl">
        <div className="flex gap-2 w-[80%] ">
          {problem?.solvedBy?.includes(authUser.id) && (
            <p className="font-semibold">✅</p>
          )}
          <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full font-semibold">
            {problem.title}
          </p>
        </div>
        <span className="text-green-400 font-bold">{problem.difficulty}</span>
      </div>
    </Link>
  );
};

export default ProblemCard;

// {
//             "id": "b5963ce3-81a5-48a5-947c-a7a9d144628f",
//             "title": "Climbing Stairs",
//             "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
//             "difficulty": "EASY",
//             "tags": [
//                 "Dynamic Programming",
//                 "Math",
//                 "Memoization"
//             ],
//             "userId": "78f38ea9-6a1b-4b2f-8a02-f5b3694c1a55",
//             "examples": {
//                 "CPP": {
//                     "input": "n = 4",
//                     "output": "5",
//                     "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
//                 },
//                 "JAVA": {
//                     "input": "n = 4",
//                     "output": "5",
//                     "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
//                 },
//                 "PYTHON": {
//                     "input": "n = 3",
//                     "output": "3",
//                     "explanation": "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
//                 },
//                 "JAVASCRIPT": {
//                     "input": "n = 2",
//                     "output": "2",
//                     "explanation": "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
//                 }
//             },
//             "constraints": "1 <= n <= 45",
//             "hints": null,
//             "editorial": null,
//             "testcases": [
//                 {
//                     "input": "2",
//                     "output": "2"
//                 },
//                 {
//                     "input": "3",
//                     "output": "3"
//                 },
//                 {
//                     "input": "4",
//                     "output": "5"
//                 }
//             ],
//             "codeSnippets": {
//                 "CPP": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Main {\npublic:\nint climbStairs(int n) {\n    // Write your code here\n                       return 0;\n                     }\n                 };\n\n                 int main() {\n                    string input;\n                     getline(cin, input);\n                     int n = stoiinput);\n\n                     Main mainObj; // Use Main class instead of Solution\n                     int result = mainObj.climbStairs(n);\n\n                     cout << result << endl;\n                     return 0;\n                 };",
//                 "JAVA": "import java.util.Scanner;\n\nclass Main {\n  public int climbStairs(int n) {\n      // Write your code here\n      return 0;\n  }\n  \n  public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n      int n = Integer.parseInt(scanner.nextLine().trim());\n      \n      // Use Main class instead of Solution\n      Main main = new Main();\n      int result = main.climbStairs(n);\n      \n      System.out.println(result);\n      scanner.close();\n  }\n}",
//                 "PYTHON": "class Solution:\n  def climbStairs(self, n: int) -> int:\n      # Write your code here\n      pass\n\n# Input parsing\nif __name__ == \"__main__\":\n  import sys\n  \n  # Parse input\n  n = int(sys.stdin.readline().strip())\n  \n  # Solve\n  sol = Solution()\n  result = sol.climbStairs(n)\n  \n  # Print result\n  print(result)",
//                 "JAVASCRIPT": "/**\n* @param {number} n\n* @return {number}\n*/\nfunction climbStairs(n) {\n// Write your code here\n}\n\n// Parse input and execute\nconst readline = require('readline');\nconst rl = readline.createInterface({\ninput: process.stdin,\noutput: process.stdout,\nterminal: false\n});\n\nrl.on('line', (line) => {\nconst n = parseInt(line.trim());\nconst result = climbStairs(n);\n\nconsole.log(result);\nrl.close();\n});"
//             },
//             "referenceSolutions": {
//                 "CPP": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nclass Main {\npublic:\n    int climbStairs(int n) {\n        // Base cases\n        if (n <= 2) {\n            return n;\n        }\n\n        // Dynamic programming approach\n        vector<int> dp(n + 1);\n        dp[1] = 1;\n        dp[2] = 2;\n\n        for (int i = 3; i <= n; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n\n        return dp[n];\n\n        /* Alternative approach with O(1) space\n        int a = 1; // ways to climb 1 step\n        int b = 2; // ways to climb 2 steps\n\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n\n        return n == 1 ? a : b;\n        */\n    }\n};\n\nint main() {\n    string input;\n    getline(cin, input);\n    int n = stoi(input);\n\n    // Use Main class instead of Solution\n    Main mainObj;\n    int result = mainObj.climbStairs(n);\n\n    cout << result << endl;\n    return 0;\n}\n",
//                 "JAVA": "import java.util.Scanner;\n\nclass Main {\n  public int climbStairs(int n) {\n      // Base cases\n      if (n <= 2) {\n          return n;\n      }\n      \n      // Dynamic programming approach\n      int[] dp = new int[n + 1];\n      dp[1] = 1;\n      dp[2] = 2;\n      \n      for (int i = 3; i <= n; i++) {\n          dp[i] = dp[i - 1] + dp[i - 2];\n      }\n      \n      return dp[n];\n      \n      /* Alternative approach with O(1) space\n      int a = 1; // ways to climb 1 step\n      int b = 2; // ways to climb 2 steps\n      \n      for (int i = 3; i <= n; i++) {\n          int temp = a + b;\n          a = b;\n          b = temp;\n      }\n      \n      return n == 1 ? a : b;\n      */\n  }\n  \n  public static void main(String[] args) {\n      Scanner scanner = new Scanner(System.in);\n      int n = Integer.parseInt(scanner.nextLine().trim());\n      \n      // Use Main class instead of Solution\n      Main main = new Main();\n      int result = main.climbStairs(n);\n      \n      System.out.println(result);\n      scanner.close();\n  }\n}",
//                 "PYTHON": "class Solution:\n  def climbStairs(self, n: int) -> int:\n      # Base cases\n      if n <= 2:\n          return n\n      \n      # Dynamic programming approach\n      dp = [0] * (n + 1)\n      dp[1] = 1\n      dp[2] = 2\n      \n      for i in range(3, n + 1):\n          dp[i] = dp[i - 1] + dp[i - 2]\n      \n      return dp[n]\n      \n      # Alternative approach with O(1) space\n      # a, b = 1, 2\n      # \n      # for i in range(3, n + 1):\n      #     a, b = b, a + b\n      # \n      # return a if n == 1 else b\n\n# Input parsing\nif __name__ == \"__main__\":\n  import sys\n  \n  # Parse input\n  n = int(sys.stdin.readline().strip())\n  \n  # Solve\n  sol = Solution()\n  result = sol.climbStairs(n)\n  \n  # Print result\n  print(result)",
//                 "JAVASCRIPT": "/**\n* @param {number} n\n* @return {number}\n*/\nfunction climbStairs(n) {\n// Base cases\nif (n <= 2) {\n  return n;\n}\n\n// Dynamic programming approach\nlet dp = new Array(n + 1);\ndp[1] = 1;\ndp[2] = 2;\n\nfor (let i = 3; i <= n; i++) {\n  dp[i] = dp[i - 1] + dp[i - 2];\n}\n\nreturn dp[n];\n\n/* Alternative approach with O(1) space\nlet a = 1; // ways to climb 1 step\nlet b = 2; // ways to climb 2 steps\n\nfor (let i = 3; i <= n; i++) {\n  let temp = a + b;\n  a = b;\n  b = temp;\n}\n\nreturn n === 1 ? a : b;\n*/\n}\n\n// Parse input and execute\nconst readline = require('readline');\nconst rl = readline.createInterface({\ninput: process.stdin,\noutput: process.stdout,\nterminal: false\n});\n\nrl.on('line', (line) => {\nconst n = parseInt(line.trim());\nconst result = climbStairs(n);\n\nconsole.log(result);\nrl.close();\n});"
//             },
//             "createdAt": "2025-05-27T05:06:33.996Z",
//             "updatedAt": "2025-05-27T05:06:33.996Z"
//         }
