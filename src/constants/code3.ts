export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Testcase {
  input: string;
  output: string;
}

export interface CodeSnippets {
  JAVASCRIPT: string;
  JAVA: string;
  CPP: string;
  PYTHON: string;
}

export interface ReferenceSolutions {
  JAVASCRIPT: string;
  JAVA: string;
  CPP: string;
  PYTHON: string;
}

export interface Editorial {
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  codeLanguage: "JAVASCRIPT" | "JAVA" | "CPP" | "PYTHON";
}

export interface ProblemFormData {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  examples: Example[];
  constraints: string;
  testcases: Testcase[];
  codeSnippets: CodeSnippets; // This is the "starterCode" equivalent
  referenceSolutions: ReferenceSolutions; // This is the "solutions" equivalent
  hints: string[];
  editorial: Editorial;
  companyTag?: string;
}

export const concatenationOfArrayProblem: ProblemFormData = {
  title: "Concatenation of Array",
  description:
    "You are given an integer array `nums` of length `n`. Create an array `ans` of length `2n` where `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n` **(0-indexed)**.\n\nSpecifically, `ans` is the concatenation of two `nums` arrays.\n\nReturn the array `ans`.",
  difficulty: "Easy",
  tags: ["Array"],
  examples: [
    {
      input: "[1,4,1,2]",
      output: "[1,4,1,2,1,4,1,2]",
    },
    {
      input: "[22,21,20,1]",
      output: "[22,21,20,1,22,21,20,1]",
    },
  ],
  constraints:
    "1 <= nums.length <= 1000\n1 <= nums[i] <= 1000",
  testcases: [
    { input: "[1,4,1,2]", output: "[1,4,1,2,1,4,1,2]" },
    { input: "[22,21,20,1]", output: "[22,21,20,1,22,21,20,1]" },
    { input: "[1]", output: "[1,1]" },
    { input: "[1,2,3]", output: "[1,2,3,1,2,3]" },
    { input: "[]", output: "[]" }, // Assuming empty input is possible & results in empty
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Javascript Starter Code (Judge0 Compatible)\nconst fs = require('fs');\n\nclass Solution {\n    /**\n     * @param {number[]} nums\n     * @return {number[]}\n     */\n    getConcatenation(nums) {\n        // Your code here\n        return []; // Placeholder\n    }\n}\n\n// Main execution for Judge0\nfunction main() {\n    try {\n        const inputRaw = fs.readFileSync(0, 'utf-8').trim();\n        const nums = JSON.parse(inputRaw);\n\n        const solution = new Solution();\n        const result = solution.getConcatenation(nums);\n        console.log(JSON.stringify(result));\n    } catch (e) {\n        // console.error(\"Error:\", e.message);\n        // In Judge0, usually, you'd just let it crash or output specific error format if required\n        // For simplicity, if input is malformed, it might just fail tests.\n        if (inputRaw === \"[]\") { // Handle empty array case specifically if needed by problem spec\n             console.log(JSON.stringify([]));\n        } else {\n             console.error(\"Failed to process input or an error occurred.\")\n        }\n    }\n}\n\nmain();",
    JAVA:
      "// Java Starter Code (Judge0 Compatible)\nimport java.util.*;\nimport com.google.gson.Gson; // Requires Gson library for Judge0 if used, or manual parsing\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass Solution {\n    public int[] getConcatenation(int[] nums) {\n        // Your code here\n        if (nums == null) return new int[0]; // Or handle as per problem spec for null input\n        return new int[2 * nums.length]; // Placeholder size, content needs filling\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String numsStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson(); // Assuming Gson is available in Judge0 environment\n        // Or use manual parsing for simple array string like \"[1,2,3]\"\n        int[] nums_arr;\n        if (numsStr.equals(\"[]\")) {\n            nums_arr = new int[0];\n        } else {\n            Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n            List<Integer> numList = gson.fromJson(numsStr, listType);\n            nums_arr = numList.stream().mapToInt(Integer::intValue).toArray();\n        }\n\n        Solution sol = new Solution();\n        int[] result = sol.getConcatenation(nums_arr);\n        System.out.println(gson.toJson(result)); // Output as JSON array string\n    }\n}",
    CPP:
      "// C++ Starter Code (Judge0 Compatible)\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n\n// Helper function to parse input like \"[1,2,3]\"\nstd::vector<int> parseInputArray(const std::string& s_in) {\n    std::string s = s_in;\n    std::vector<int> result;\n    if (s.length() <= 2) { // Handles \"[]\"\n        return result;\n    }\n    s = s.substr(1, s.length() - 2); // Remove brackets\n    if (s.empty()) { // Handles case where string was \"[]\" and became empty\n        return result;\n    }\n    std::stringstream ss(s);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        try {\n            result.push_back(std::stoi(item));\n        } catch (const std::invalid_argument& ia) {\n            // Handle error or skip malformed part, depending on requirements\n        }\n    }\n    return result;\n}\n\n// Helper function to print vector as JSON-like string \"[1,2,3]\"\nvoid printOutputArray(const std::vector<int>& arr) {\n    std::cout << \"[\";\n    for (size_t i = 0; i < arr.size(); ++i) {\n        std::cout << arr[i];\n        if (i < arr.size() - 1) {\n            std::cout << \",\";\n        }\n    }\n    std::cout << \"]\" << std::endl;\n}\n\nclass Solution {\npublic:\n    std::vector<int> getConcatenation(std::vector<int>& nums) {\n        // Your code here\n        return {}; // Placeholder\n    }\n};\n\nint main() {\n    std::ios_base::sync_with_stdio(false);\n    std::cin.tie(NULL);\n    std::string line;\n    std::getline(std::cin, line);\n    std::vector<int> nums = parseInputArray(line);\n\n    Solution sol;\n    std::vector<int> ans = sol.getConcatenation(nums);\n    printOutputArray(ans);\n\n    return 0;\n}",
    PYTHON:
      "# Python Starter Code (Judge0 Compatible)\nimport sys\nimport json\nfrom typing import List\n\nclass Solution:\n    def getConcatenation(self, nums: List[int]) -> List[int]:\n        # Your code here\n        return [] # Placeholder\n\nif __name__ == '__main__':\n    try:\n        input_line = sys.stdin.readline().strip()\n        # Handle potential empty input if necessary, though constraints say 1 <= nums.length\n        if not input_line and \"[]\" in sys.argv: # A way to simulate for local test if needed\n             nums_list = []\n        elif not input_line:\n             # Or based on problem spec, this might be an error or specific handling\n             nums_list = [] # Default to empty if absolutely no input for safety\n        else:\n            nums_list = json.loads(input_line)\n\n        solution = Solution()\n        result = solution.getConcatenation(nums_list)\n        print(json.dumps(result))\n    except Exception as e:\n        # print(f\"Error: {e}\", file=sys.stderr) # For debugging, not for Judge0 output\n        # If specific error output is needed for Judge0, handle here\n        # Otherwise, let it fail based on incorrect output or runtime error\n        if input_line == \"[]\": # Example of specific handling\n            print(json.dumps([]))\n        else:\n            pass # Let Judge0 handle runtime errors or wrong output\n",
  },
  referenceSolutions: {
    JAVASCRIPT:
      "// Javascript Full Solution (Judge0 Compatible)\nconst fs = require('fs');\n\nclass Solution {\n    /**\n     * @param {number[]} nums\n     * @return {number[]}\n     */\n    getConcatenation(nums) {\n        if (!nums) return [];\n        const n = nums.length;\n        if (n === 0) return [];\n        const ans = new Array(2 * n);\n        for (let i = 0; i < n; i++) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n}\n\n// Main execution\nfunction main() {\n    const inputRaw = fs.readFileSync(0, 'utf-8').trim();\n    let nums_arr;\n    try {\n       nums_arr = JSON.parse(inputRaw);\n    } catch (e) {\n        if (inputRaw === \"[]\") {\n            nums_arr = [];\n        } else {\n            console.error(\"Invalid JSON input\");\n            return;\n        }\n    }\n\n    const solution = new Solution();\n    const result = solution.getConcatenation(nums_arr);\n    console.log(JSON.stringify(result));\n}\n\nmain();",
    JAVA:
      "// Java Full Solution (Judge0 Compatible)\nimport java.util.*;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass Solution {\n    public int[] getConcatenation(int[] nums) {\n        if (nums == null || nums.length == 0) {\n            return new int[0];\n        }\n        int n = nums.length;\n        int[] ans = new int[2 * n];\n        for (int i = 0; i < n; i++) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String numsStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        int[] nums_arr;\n        if (numsStr.equals(\"[]\")) {\n            nums_arr = new int[0];\n        } else {\n            Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n            List<Integer> numList = gson.fromJson(numsStr, listType);\n            if (numList == null) { // Gson might return null for malformed that isn't "[]"\n                nums_arr = new int[0]; // Or throw error\n            } else {\n                nums_arr = numList.stream().mapToInt(Integer::intValue).toArray();\n            }\n        }\n\n        Solution sol = new Solution();\n        int[] result = sol.getConcatenation(nums_arr);\n        System.out.println(gson.toJson(result));\n    }\n}",
    CPP:
      "// C++ Full Solution (Judge0 Compatible)\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n\n// Helper function to parse input like \"[1,2,3]\"\nstd::vector<int> parseInputArray(const std::string& s_in) {\n    std::string s = s_in;\n    std::vector<int> result;\n    if (s.length() <= 2) { // Handles \"[]\"\n        return result;\n    }\n    s = s.substr(1, s.length() - 2); // Remove brackets\n    if (s.empty()) { // Handles case where string was \"[]\" and became empty\n        return result;\n    }\n    std::stringstream ss(s);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        try {\n            result.push_back(std::stoi(item));\n        } catch (const std::invalid_argument& ia) { /* skip */ }\n    }\n    return result;\n}\n\n// Helper function to print vector as JSON-like string \"[1,2,3]\"\nvoid printOutputArray(const std::vector<int>& arr) {\n    std::cout << \"[\";\n    for (size_t i = 0; i < arr.size(); ++i) {\n        std::cout << arr[i];\n        if (i < arr.size() - 1) {\n            std::cout << \",\";\n        }\n    }\n    std::cout << \"]\" << std::endl;\n}\n\nclass Solution {\npublic:\n    std::vector<int> getConcatenation(std::vector<int>& nums) {\n        if (nums.empty()) {\n            return {};\n        }\n        int n = nums.size();\n        std::vector<int> ans(2 * n);\n        for (int i = 0; i < n; ++i) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n};\n\nint main() {\n    std::ios_base::sync_with_stdio(false);\n    std::cin.tie(NULL);\n    std::string line;\n    std::getline(std::cin, line);\n    std::vector<int> nums_vec = parseInputArray(line);\n\n    Solution sol_obj;\n    std::vector<int> ans_vec = sol_obj.getConcatenation(nums_vec);\n    printOutputArray(ans_vec);\n\n    return 0;\n}",
    PYTHON:
      "# Python Full Solution (Judge0 Compatible)\nimport sys\nimport json\nfrom typing import List\n\nclass Solution:\n    def getConcatenation(self, nums: List[int]) -> List[int]:\n        if not nums:\n            return []\n        n = len(nums)\n        ans = [0] * (2 * n)\n        for i, num_val in enumerate(nums):\n            ans[i] = num_val\n            ans[i + n] = num_val\n        return ans\n\nif __name__ == '__main__':\n    input_line = sys.stdin.readline().strip()\n    nums_list_input = []\n    if input_line: # Ensure input_line is not empty before parsing\n        try:\n            nums_list_input = json.loads(input_line)\n        except json.JSONDecodeError:\n            # Handle cases like non-json input if necessary, or let Judge0 fail it.\n            # For this problem, if input is \"[]\", json.loads works.\n            if input_line == \"[]\":\n                 nums_list_input = []\n            else:\n                 # Error or specific handling\n                 pass \n    \n    solution_obj = Solution()\n    result_list = solution_obj.getConcatenation(nums_list_input)\n    print(json.dumps(result_list))",
  },
  hints: [
    "The problem asks you to create a new array of double the length of the input array `nums`.",
    "The first half of the new array (from index 0 to n-1) should be a copy of `nums`.",
    "The second half of the new array (from index n to 2n-1) should also be a copy of `nums`.",
    "You can achieve this by iterating from `i = 0` to `n-1` (where `n` is `nums.length`). In each iteration, set `ans[i] = nums[i]` and `ans[i + n] = nums[i]`.",
    "Consider creating an answer array `ans` of size `2*n` first."
  ],
  editorial: {
    explanation:
      "The problem requires us to construct an array `ans` that is essentially the array `nums` concatenated with itself. If `nums` has length `n`, `ans` will have length `2n`.\nThe elements of `ans` are defined as:\n- `ans[i] = nums[i]` for `0 <= i < n`\n- `ans[i + n] = nums[i]` for `0 <= i < n`\n\nWe can achieve this with a single pass through the input array `nums`:\n1. Initialize an array `ans` of size `2 * n` (where `n` is the length of `nums`).\n2. Iterate with an index `i` from `0` to `n-1`:\n   a. Set `ans[i] = nums[i]`. This copies the first occurrence of `nums` into the first half of `ans`.\n   b. Set `ans[i + n] = nums[i]`. This copies the second occurrence of `nums` into the second half of `ans`.\n3. Return `ans`.",
    timeComplexity: "O(n), where n is the length of the `nums` array, because we iterate through `nums` once.",
    spaceComplexity: "O(n) (or O(2n), which simplifies to O(n)) for the output array `ans`. If we don't count the output array as extra space (as it's required by the problem), then the space complexity is O(1).",
    code:
      "# Python Editorial Code (One Pass)\nfrom typing import List\n\nclass Solution:\n    def getConcatenation(self, nums: List[int]) -> List[int]:\n        n = len(nums)\n        ans = [0] * (2 * n)\n        for i, num in enumerate(nums):\n            ans[i] = num\n            ans[i + n] = num\n        return ans",
    codeLanguage: "PYTHON",
  },
  companyTag: "Various (Common easy array manipulation)",
};

// You can then add this to your problemSet array:
// export const problemSet: ProblemFormData[] = [
//   concatenationOfArrayProblem,
//   // ... other problems
// ];