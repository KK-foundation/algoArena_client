import { ProblemFormData } from "@/pages/CreateProblemPage";


export const problemSet: ProblemFormData[] = [
  // Problem 1: Two Sum
 {
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
      `// Java Full Solution (Judge0 Compatible)\nimport java.util.*;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass Solution {\n    public int[] getConcatenation(int[] nums) {\n        if (nums == null || nums.length == 0) {\n            return new int[0];\n        }\n        int n = nums.length;\n        int[] ans = new int[2 * n];\n        for (int i = 0; i < n; i++) {\n            ans[i] = nums[i];\n            ans[i + n] = nums[i];\n        }\n        return ans;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String numsStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        int[] nums_arr;\n        if (numsStr.equals(\"[]\")) {\n            nums_arr = new int[0];\n        } else {\n            Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n            List<Integer> numList = gson.fromJson(numsStr, listType);\n            if (numList == null) { // Gson might return null for malformed that isn't "[]"\n                nums_arr = new int[0]; // Or throw error\n            } else {\n                nums_arr = numList.stream().mapToInt(Integer::intValue).toArray();\n            }\n        }\n\n        Solution sol = new Solution();\n        int[] result = sol.getConcatenation(nums_arr);\n        System.out.println(gson.toJson(result));\n    }\n}`,
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
},
  // Problem 2: Reverse Linked List
  {
    title: "Reverse Linked List",
    description:
      "Given the `head` of a singly linked list, reverse the list, and return *the new head of the reversed list*.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion", "Iteration"],
    examples: [
      {
        input: "[1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list 1->2->3->4->5->NULL is reversed to 5->4->3->2->1->NULL.",
      },
      {
        input: "[1,2]",
        output: "[2,1]",
        explanation:""
      },
      {
        input: "[]",
        output: "[]",
        explanation:""
      },
    ],
    constraints:
      "The number of nodes in the list is the range `[0, 5000]`.\n`-5000 <= Node.val <= 5000`",
    testcases: [
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "[1,2]", output: "[2,1]" },
      { input: "[1]", output: "[1]" },
      { input: "[]", output: "[]" },
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\n/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Your code here\n        return nullptr;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\n# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nfrom typing import Optional\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head: Optional[ListNode]) -> Optional[ListNode]:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\n// Definition for singly-linked list.\nfunction ListNode(val, next) {\n    this.val = (val===undefined ? 0 : val);\n    this.next = (next===undefined ? null : next);\n}\n\n// Helper to build list from array\nfunction buildList(arr) {\n    if (!arr || arr.length === 0) return null;\n    let head = new ListNode(arr[0]);\n    let current = head;\n    for (let i = 1; i < arr.length; i++) {\n        current.next = new ListNode(arr[i]);\n        current = current.next;\n    }\n    return head;\n}\n\n// Helper to print list to array for output\nfunction listToArray(head) {\n    const arr = [];\n    let current = head;\n    while (current) {\n        arr.push(current.val);\n        current = current.next;\n    }\n    return arr;\n}\n\nvar reverseListIterative = function(head) {\n    let prev = null;\n    let current = head;\n    while (current !== null) {\n        let nextTemp = current.next;\n        current.next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    return prev;\n};\n\nfunction solve() {\n    const inputStr = fs.readFileSync(0, 'utf-8').trim();\n    const nums = JSON.parse(inputStr);\n    const head = buildList(nums);\n    \n    const reversedHead = reverseListIterative(head);\n    console.log(JSON.stringify(listToArray(reversedHead)));\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport java.util.ArrayList;\nimport java.util.List;\nimport com.google.gson.Gson; // Assuming Gson for simple JSON parsing\nimport com.google.gson.reflect.TypeToken; // For list type token\nimport java.lang.reflect.Type;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n    // Iterative solution\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode current = head;\n        while (current != null) {\n            ListNode nextTemp = current.next;\n            current.next = prev;\n            prev = current;\n            current = nextTemp;\n        }\n        return prev;\n    }\n}\n\npublic class Main {\n    // Helper to build list from ArrayList\n    public static ListNode buildList(List<Integer> vals) {\n        if (vals == null || vals.isEmpty()) return null;\n        ListNode head = new ListNode(vals.get(0));\n        ListNode current = head;\n        for (int i = 1; i < vals.size(); i++) {\n            current.next = new ListNode(vals.get(i));\n            current = current.next;\n        }\n        return head;\n    }\n\n    // Helper to convert list to ArrayList for printing\n    public static List<Integer> listToArray(ListNode head) {\n        List<Integer> arr = new ArrayList<>();\n        ListNode current = head;\n        while (current != null) {\n            arr.add(current.val);\n            current = current.next;\n        }\n        return arr;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String inputStr = sc.nextLine(); // Reads like \"[1,2,3,4,5]\"\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> nums = gson.fromJson(inputStr, listType);\n\n        ListNode head = buildList(nums);\n        Solution solution = new Solution();\n        ListNode reversedHead = solution.reverseList(head);\n        \n        System.out.println(gson.toJson(listToArray(reversedHead)));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\n// Helper to build list from vector\nListNode* buildList(const std::vector<int>& vals) {\n    if (vals.empty()) return nullptr;\n    ListNode* head = new ListNode(vals[0]);\n    ListNode* current = head;\n    for (size_t i = 1; i < vals.size(); ++i) {\n        current->next = new ListNode(vals[i]);\n        current = current->next;\n    }\n    return head;\n}\n\n// Helper to convert list to vector for printing\nstd::vector<int> listToVector(ListNode* head) {\n    std::vector<int> vec;\n    ListNode* current = head;\n    while (current) {\n        vec.push_back(current->val);\n        current = current->next;\n    }\n    return vec;\n}\n\n// Helper to print vector as JSON-like string\nvoid printVector(const std::vector<int>& vec) {\n    std::cout << \"[\";\n    for (size_t i = 0; i < vec.size(); ++i) {\n        std::cout << vec[i];\n        if (i < vec.size() - 1) {\n            std::cout << \",\";\n        }\n    }\n    std::cout << \"]\" << std::endl;\n}\n\n// Helper function to parse input like \"[1,2,3,4,5]\"\nstd::vector<int> parse_input_list(const std::string& s) {\n    std::vector<int> result;\n    std::string temp = s;\n    if (!temp.empty() && temp.front() == '[') temp.erase(0, 1);\n    if (!temp.empty() && temp.back() == ']') temp.pop_back();\n    \n    std::stringstream ss(temp);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        if (!item.empty()) {\n            try {\n                 result.push_back(std::stoi(item));\n            } catch (const std::invalid_argument& ia) { /* ignore */ }\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    // Iterative solution\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* current = head;\n        ListNode* nextTemp = nullptr;\n        while (current != nullptr) {\n            nextTemp = current->next;\n            current->next = prev;\n            prev = current;\n            current = nextTemp;\n        }\n        return prev;\n    }\n};\n\nint main() {\n    std::string line;\n    std::getline(std::cin, line);\n    \n    std::vector<int> nums = parse_input_list(line);\n    ListNode* head = buildList(nums);\n\n    Solution sol;\n    ListNode* reversedHead = sol.reverseList(head);\n    \n    printVector(listToVector(reversedHead));\n\n    // Clean up memory (important for C++)\n    ListNode* current = reversedHead;\n    while(current != nullptr) {\n        ListNode* temp = current;\n        current = current->next;\n        delete temp;\n    }\n\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\n\n# Definition for singly-linked list.\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n# Helper to build list from array\ndef build_list(arr: list[int]) -> Optional[ListNode]:\n    if not arr:\n        return None\n    head = ListNode(arr[0])\n    current = head\n    for i in range(1, len(arr)):\n        current.next = ListNode(arr[i])\n        current = current.next\n    return head\n\n# Helper to print list to array for output\ndef list_to_array(head: Optional[ListNode]) -> list[int]:\n    arr = []\n    current = head\n    while current:\n        arr.append(current.val)\n        current = current.next\n    return arr\n\n# Iterative Solution\ndef solve_reverse_list_iterative(head: Optional[ListNode]) -> Optional[ListNode]:\n    prev_node = None\n    current_node = head\n    while current_node:\n        next_node_temp = current_node.next # Store next node\n        current_node.next = prev_node    # Reverse current node's pointer\n        prev_node = current_node         # Move prev_node one step forward\n        current_node = next_node_temp    # Move current_node one step forward\n    return prev_node # New head\n\nline = sys.stdin.readline().strip()\nnums = json.loads(line)\n\nhead_node = build_list(nums)\nreversed_head_node = solve_reverse_list_iterative(head_node)\n\nprint(json.dumps(list_to_array(reversed_head_node)))\n",
    },
    hints: [
      "Think about how pointers need to change. Each node's `next` pointer should point to its previous node.",
      "You'll need to keep track of the `previous` node, the `current` node, and temporarily store the `next` node before changing pointers.",
      "Iterative approach: Initialize `prev = null`. While `current` is not null, store `current.next` in a temporary variable. Then set `current.next = prev`. Update `prev = current` and `current = temporary_next`.",
      "Recursive approach: The base case is an empty list or a list with one node. For other cases, recursively reverse the rest of the list (`head.next`). Then, make `head.next.next` point to `head`, and `head.next` point to `null`.",
    ],
    editorial: {
      explanation:
        "Reversing a singly linked list can be done iteratively or recursively.\n\n**Iterative Approach:**\nWe need three pointers: `prev`, `current`, and `next_node`.\n1. Initialize `prev = null` and `current = head`.\n2. Iterate while `current` is not null:\n   a. Store `current.next` in `next_node` (to keep track of the rest of the list).\n   b. Set `current.next = prev` (this is the actual reversal step for the current node).\n   c. Move `prev` to `current` (`prev = current`).\n   d. Move `current` to `next_node` (`current = next_node`).\n3. After the loop, `prev` will be pointing to the new head of the reversed list.\n\n**Recursive Approach:**\n1. Base Case: If `head` is null or `head.next` is null, the list is already reversed (or empty/single node), so return `head`.\n2. Recursive Step: Recursively call `reverseList` on `head.next`. This will reverse the rest of the list and return the new head of that reversed sublist (let's call it `new_head`).\n3. Now, `head.next` (which was the original second node) is the *last* node of the reversed sublist. We want `head` to be after it. So, set `head.next.next = head`.\n4. Set `head.next = null` (because `head` is now the new tail of the partially reversed list).\n5. Return `new_head` (which is the head of the fully reversed list).",
      timeComplexity: "O(n), where n is the number of nodes in the list, as we visit each node once.",
      spaceComplexity: "O(1) for the iterative solution (uses a fixed number of pointers). O(n) for the recursive solution due to the recursion call stack in the worst case (a skewed list).",
      code:
        "# Python Editorial Code (Iterative)\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev = None\n        curr = head\n        while curr:\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        return prev",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Microsoft, Apple, Facebook, Google, Adobe, Bloomberg",
  },
  // Problem 3: Valid Parentheses
  {
    title: "Valid Parentheses",
    description:
      "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    examples: [
      {
        input: '"()"',
        output: "true",
        explanation:""
      },
      {
        input: '"()[]{}"',
        output: "true",
        explanation:""
      },
      {
        input: '"(]"',
        output: "false",
        explanation:""
      },
      {
        input: '"]"',
        output: "false",
        explanation:""
      },
      {
        input: '"([)]"',
        output: "false",
        explanation:""
      },
    ],
    constraints:
      "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    testcases: [
      { input: '"()"', output: "true" },
      { input: '"()[]{}"', output: "true" },
      { input: '"(]"', output: "false" },
      { input: '"]"', output: "false" },
      { input: '"([)]"', output: "false" },
      { input: '"{[]}"', output: "true" },
      { input: '"((()))"', output: "true" },
      { input: '"(()"', output: "false" },
      { input: '""', output: "true" }, // Edge case, though constraints say 1 <= s.length
                                    // Let's assume non-empty based on constraints,
                                    // or if empty is possible, it's typically true.
                                    // For now, adhering to constraints.
      { input: '"["', output: "false"},
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\nimport java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n#include <string>\n#include <stack>\n\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        // Your code here\n        return false;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\ndef isValid(s: str) -> bool:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        `// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction solve() {\n    let s = fs.readFileSync(0, 'utf-8').trim();\n    // Input might be like \"()\", remove quotes if present\n    if (s.startsWith('"') && s.endsWith('"')) {\n        s = s.substring(1, s.length - 1);\n    }\n\n    const stack = [];\n    const map = {\n        ')': '(',\n        '}': '{',\n        ']': '['\n    };\n\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (char === '(' || char === '{' || char === '[') {\n            stack.push(char);\n        } else if (char === ')' || char === '}' || char === ']') {\n            if (stack.length === 0 || stack.pop() !== map[char]) {\n                console.log(false);\n                return;\n            }\n        }\n    }\n    console.log(stack.length === 0);\n}\n\nsolve();`,
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport java.util.Stack;\nimport java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        // Input might be like \"()\", remove quotes if present\n        if (s.startsWith(\"\\\"\") && s.endsWith(\"\\\"\")) {\n            s = s.substring(1, s.length() - 1);\n        }\n        sc.close();\n\n        Solution solution = new Solution();\n        System.out.println(solution.isValid(s));\n    }\n}\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put(')', '(');\n        map.put('}', '{');\n        map.put(']', '[');\n\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') {\n                stack.push(c);\n            } else if (c == ')' || c == '}' || c == ']') {\n                if (stack.isEmpty() || stack.pop() != map.get(c)) {\n                    return false;\n                }\n            }\n        }\n        return stack.isEmpty();\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <string>\n#include <stack>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    bool isValid(std::string s) {\n        std::stack<char> st;\n        std::unordered_map<char, char> map = {\n            {')', '('},\n            {'}', '{'},\n            {']', '['}\n        };\n\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') {\n                st.push(c);\n            } else if (c == ')' || c == '}' || c == ']') {\n                if (st.empty() || st.top() != map[c]) {\n                    return false;\n                }\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};\n\nint main() {\n    std::string s;\n    std::getline(std::cin, s);\n    // Input might be like \"()\", remove quotes if present\n    if (!s.empty() && s.front() == '\"' && s.back() == '\"' && s.length() >=2) {\n        s = s.substr(1, s.length() - 2);\n    }\n    \n    Solution sol;\n    if (sol.isValid(s)) {\n        std::cout << \"true\" << std::endl;\n    } else {\n        std::cout << \"false\" << std::endl;\n    }\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\n\ns_input = sys.stdin.readline().strip()\n# Input might be like \"()\", remove quotes if present\nif len(s_input) >= 2 and s_input.startswith('\"') and s_input.endswith('\"'):\n    s = s_input[1:-1]\nelse:\n    s = s_input # In case input is just (), not \"()\"\n\ndef solve_is_valid(text: str) -> bool:\n    stack = []\n    mapping = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n\n    for char in text:\n        if char in mapping: # It's a closing bracket\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else: # It's an opening bracket\n            stack.append(char)\n    \n    return not stack\n\nresult = solve_is_valid(s)\nprint(str(result).lower()) # Output true/false in lowercase\n",
    },
    hints: [
      "Use a stack data structure.",
      "When you encounter an opening bracket, push it onto the stack.",
      "When you encounter a closing bracket, check if the stack is empty. If it is, the string is invalid. Otherwise, pop the top element from the stack.",
      "If the popped opening bracket does not match the type of the current closing bracket, the string is invalid.",
      "After iterating through the entire string, if the stack is empty, the string is valid. Otherwise, it's invalid (e.g., unclosed opening brackets).",
    ],
    editorial: {
      explanation:
        "This problem can be effectively solved using a stack. The idea is to process the string from left to right.\n1. If we encounter an opening bracket ('(', '{', or '['), we push it onto the stack. These are brackets that are waiting for their corresponding closing bracket.\n2. If we encounter a closing bracket (')', '}', or ']'), we check the top of the stack:\n   a. If the stack is empty, it means we have a closing bracket without a preceding opening bracket, so the string is invalid.\n   b. If the stack is not empty, we pop the top element. This element should be the corresponding opening bracket for the current closing bracket. If it's not the correct type (e.g., we see a ')' but popped a '{'), the string is invalid.\n3. After iterating through all characters in the string, if the stack is empty, it means all opening brackets found their matching closing brackets, and the string is valid.\n4. If the stack is not empty at the end, it means there are some opening brackets that were never closed, so the string is invalid.",
      timeComplexity: "O(n), where n is the length of the string `s`. We iterate through the string once, and stack operations (push and pop) take O(1) time.",
      spaceComplexity: "O(n) in the worst case, where n is the length of the string `s`. This happens if the string consists of all opening brackets (e.g., '((((((('), as the stack would store all of them.",
      code:
        "# Python Editorial Code\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        for char in s:\n            if char in mapping:  # If it's a closing bracket\n                if not stack or stack.pop() != mapping[char]:\n                    return False\n            else:  # If it's an opening bracket\n                stack.append(char)\n        return not stack # Stack should be empty for a valid string",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Facebook, Google, Microsoft, Bloomberg, Adobe, Uber",
  },
  // Problem 4: Merge Two Sorted Lists
  {
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists `list1` and `list2`.\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\nReturn *the head of the merged linked list*.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    examples: [
      {
        input: "[1,2,4]\n[1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation:""
      },
      {
        input: "[]\n[]",
        output: "[]",
        explanation:""
      },
      {
        input: "[]\n[0]",
        output: "[0]",
        explanation:""
      },
    ],
    constraints:
      "The number of nodes in both lists is in the range `[0, 50]`.\n`-100 <= Node.val <= 100`\nBoth `list1` and `list2` are sorted in non-decreasing order.",
    testcases: [
      { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", output: "[]" },
      { input: "[]\n[0]", output: "[0]" },
      { input: "[5]\n[1,2,4]", output: "[1,2,4,5]" },
      { input: "[1,3,5]\n[2,4,6]", output: "[1,2,3,4,5,6]" },
      { input: "[2]\n[1]", output: "[1,2]" },
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\n/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Your code here\n        return null;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Your code here\n        return nullptr;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\n# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nfrom typing import Optional\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction ListNode(val, next) {\n    this.val = (val===undefined ? 0 : val);\n    this.next = (next===undefined ? null : next);\n}\n\nfunction buildList(arr) {\n    if (!arr || arr.length === 0) return null;\n    let head = new ListNode(arr[0]);\n    let current = head;\n    for (let i = 1; i < arr.length; i++) {\n        current.next = new ListNode(arr[i]);\n        current = current.next;\n    }\n    return head;\n}\n\nfunction listToArray(head) {\n    const arr = [];\n    let current = head;\n    while (current) {\n        arr.push(current.val);\n        current = current.next;\n    }\n    return arr;\n}\n\nvar mergeTwoListsIterative = function(list1, list2) {\n    const dummy = new ListNode(-1);\n    let current = dummy;\n\n    while (list1 && list2) {\n        if (list1.val <= list2.val) {\n            current.next = list1;\n            list1 = list1.next;\n        } else {\n            current.next = list2;\n            list2 = list2.next;\n        }\n        current = current.next;\n    }\n\n    current.next = list1 || list2;\n    return dummy.next;\n};\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n    const arr1 = JSON.parse(input[0]);\n    const arr2 = JSON.parse(input[1]);\n\n    const list1 = buildList(arr1);\n    const list2 = buildList(arr2);\n\n    const mergedHead = mergeTwoListsIterative(list1, list2);\n    console.log(JSON.stringify(listToArray(mergedHead)));\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport java.util.ArrayList;\nimport java.util.List;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode current = dummy;\n\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                current.next = list1;\n                list1 = list1.next;\n            } else {\n                current.next = list2;\n                list2 = list2.next;\n            }\n            current = current.next;\n        }\n\n        if (list1 != null) {\n            current.next = list1;\n        } else {\n            current.next = list2;\n        }\n        return dummy.next;\n    }\n}\n\npublic class Main {\n    public static ListNode buildList(List<Integer> vals) {\n        if (vals == null || vals.isEmpty()) return null;\n        ListNode head = new ListNode(vals.get(0));\n        ListNode current = head;\n        for (int i = 1; i < vals.size(); i++) {\n            current.next = new ListNode(vals.get(i));\n            current = current.next;\n        }\n        return head;\n    }\n\n    public static List<Integer> listToArray(ListNode head) {\n        List<Integer> arr = new ArrayList<>();\n        ListNode current = head;\n        while (current != null) {\n            arr.add(current.val);\n            current = current.next;\n        }\n        return arr;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String inputStr1 = sc.nextLine();\n        String inputStr2 = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> nums1 = gson.fromJson(inputStr1, listType);\n        List<Integer> nums2 = gson.fromJson(inputStr2, listType);\n\n        ListNode list1 = buildList(nums1);\n        ListNode list2 = buildList(nums2);\n        \n        Solution solution = new Solution();\n        ListNode mergedHead = solution.mergeTwoLists(list1, list2);\n        \n        System.out.println(gson.toJson(listToArray(mergedHead)));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nListNode* buildList(const std::vector<int>& vals) {\n    if (vals.empty()) return nullptr;\n    ListNode* head = new ListNode(vals[0]);\n    ListNode* current = head;\n    for (size_t i = 1; i < vals.size(); ++i) {\n        current->next = new ListNode(vals[i]);\n        current = current->next;\n    }\n    return head;\n}\n\nstd::vector<int> listToVector(ListNode* head) {\n    std::vector<int> vec;\n    ListNode* current = head;\n    while (current) {\n        vec.push_back(current->val);\n        current = current->next;\n    }\n    return vec;\n}\n\nvoid printVectorAsJson(const std::vector<int>& vec) {\n    std::cout << \"[\";\n    for (size_t i = 0; i < vec.size(); ++i) {\n        std::cout << vec[i];\n        if (i < vec.size() - 1) std::cout << \",\";\n    }\n    std::cout << \"]\" << std::endl;\n}\n\nstd::vector<int> parse_input_list(const std::string& s) {\n    std::vector<int> result;\n    std::string temp = s;\n    if (!temp.empty() && temp.front() == '[') temp.erase(0, 1);\n    if (!temp.empty() && temp.back() == ']') temp.pop_back();\n    std::stringstream ss(temp);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        if (!item.empty()) {\n            try { result.push_back(std::stoi(item)); } catch (const std::invalid_argument&) {}\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (list1 && list2) {\n            if (list1->val < list2->val) {\n                tail->next = list1;\n                list1 = list1->next;\n            } else {\n                tail->next = list2;\n                list2 = list2->next;\n            }\n            tail = tail->next;\n        }\n        tail->next = list1 ? list1 : list2;\n        return dummy.next;\n    }\n};\n\nvoid deleteList(ListNode* head) {\n    while(head) {\n        ListNode* temp = head;\n        head = head->next;\n        delete temp;\n    }\n}\n\nint main() {\n    std::string line1, line2;\n    std::getline(std::cin, line1);\n    std::getline(std::cin, line2);\n    \n    std::vector<int> nums1 = parse_input_list(line1);\n    std::vector<int> nums2 = parse_input_list(line2);\n    ListNode* l1 = buildList(nums1);\n    ListNode* l2 = buildList(nums2);\n\n    Solution sol;\n    ListNode* mergedHead = sol.mergeTwoLists(l1, l2);\n    printVectorAsJson(listToVector(mergedHead));\n    deleteList(mergedHead); // l1 and l2 nodes are now part of mergedHead or were originals.\n                           // To be fully correct, original l1,l2 if not merged should also be deleted if allocated.\n                           // But for competitive programming, this is usually sufficient. \n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\nfrom typing import Optional, List\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef build_list(arr: List[int]) -> Optional[ListNode]:\n    if not arr:\n        return None\n    head = ListNode(arr[0])\n    current = head\n    for i in range(1, len(arr)):\n        current.next = ListNode(arr[i])\n        current = current.next\n    return head\n\ndef list_to_array(head: Optional[ListNode]) -> List[int]:\n    arr = []\n    current = head\n    while current:\n        arr.append(current.val)\n        current = current.next\n    return arr\n\ndef solve_merge_two_lists(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n    dummy = ListNode()\n    tail = dummy\n\n    while l1 and l2:\n        if l1.val < l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    \n    if l1:\n        tail.next = l1\n    elif l2:\n        tail.next = l2\n    \n    return dummy.next\n\nline1 = sys.stdin.readline().strip()\nline2 = sys.stdin.readline().strip()\n\narr1 = json.loads(line1)\narr2 = json.loads(line2)\n\nlist1_head = build_list(arr1)\nlist2_head = build_list(arr2)\n\nmerged_head_node = solve_merge_two_lists(list1_head, list2_head)\n\nprint(json.dumps(list_to_array(merged_head_node)))",
    },
    hints: [
      "Create a dummy node to serve as the starting point for the merged list.",
      "Maintain a pointer to the current tail of the merged list.",
      "Compare the values of the current nodes in `list1` and `list2`. Append the smaller one to the merged list and advance the pointer of that list.",
      "Once one of the lists is exhausted, append the remaining part of the other list to the merged list.",
      "Consider a recursive approach: if `list1.val < list2.val`, then `list1.next` should be merged with `list2`, and `list1` is the head. Otherwise, do the opposite.",
    ],
    editorial: {
      explanation:
        "We can merge two sorted linked lists iteratively or recursively.\n\n**Iterative Approach:**\n1. Create a `dummy` node that will act as a placeholder for the head of the merged list. This simplifies edge cases like an empty resulting list.\n2. Create a `tail` pointer, initially pointing to `dummy`. This pointer will always point to the last node in the merged list.\n3. While both `list1` and `list2` are not null:\n   a. Compare `list1.val` and `list2.val`.\n   b. Append the node with the smaller value to `tail.next`.\n   c. Advance the `tail` pointer to the newly appended node.\n   d. Advance the pointer of the list from which the node was taken.\n4. After the loop, one of the lists might still have remaining nodes (since they are sorted, these are all greater than the nodes already merged). Append the non-null list to `tail.next`.\n5. The merged list starts at `dummy.next`.\n\n**Recursive Approach:**\n1. Base Cases:\n   a. If `list1` is null, return `list2` (nothing left in `list1` to merge).\n   b. If `list2` is null, return `list1` (nothing left in `list2` to merge).\n2. Recursive Step:\n   a. If `list1.val <= list2.val`:\n      The current `list1` node is smaller. So, it becomes the head of this merge step. Its `next` pointer should be the result of merging the rest of `list1` (`list1.next`) with all of `list2`.\n      So, `list1.next = mergeTwoLists(list1.next, list2)`. Return `list1`.\n   b. Else (`list2.val < list1.val`):\n      The current `list2` node is smaller. It becomes the head. Its `next` pointer should be the result of merging all of `list1` with the rest of `list2` (`list2.next`).\n      So, `list2.next = mergeTwoLists(list1, list2.next)`. Return `list2`.",
      timeComplexity: "O(m + n), where m and n are the lengths of `list1` and `list2` respectively. We iterate through each node of both lists once.",
      spaceComplexity: "O(1) for the iterative solution (constant extra space for pointers). O(m + n) for the recursive solution in the worst case, due to recursion stack depth.",
      code:
        "# Python Editorial Code (Iterative)\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        tail = dummy\n\n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n        \n        if list1:\n            tail.next = list1\n        elif list2:\n            tail.next = list2\n        \n        return dummy.next",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Microsoft, Apple, LinkedIn, Facebook, Google",
  },

// Problem 5: Binary Search
  {
    title: "Binary Search",
    description:
      "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    examples: [
      {
        input: "[-1,0,3,5,9,12]\n9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "[-1,0,3,5,9,12]\n2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    constraints:
      "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in `nums` are unique.\n`nums` is sorted in ascending order.",
    testcases: [
      { input: "[-1,0,3,5,9,12]\n9", output: "4" },
      { input: "[-1,0,3,5,9,12]\n2", output: "-1" },
      { input: "[5]\n5", output: "0" },
      { input: "[5]\n-5", output: "-1" },
      { input: "[2,5]\n5", output: "1" },
      { input: "[2,5]\n0", output: "-1" },
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\nclass Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n#include <vector>\n\nclass Solution {\npublic:\n    int search(std::vector<int>& nums, int target) {\n        // Your code here\n        return -1;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\nfrom typing import List\n\ndef search(nums: List[int], target: int) -> int:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n    const nums = JSON.parse(input[0]);\n    const target = parseInt(input[1]);\n\n    let left = 0;\n    let right = nums.length - 1;\n\n    while (left <= right) {\n        const mid = Math.floor(left + (right - left) / 2);\n        if (nums[mid] === target) {\n            console.log(mid);\n            return;\n        }\n        if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    console.log(-1);\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n    public int search(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n\n        while (left <= right) {\n            int mid = left + (right - left) / 2; // Avoids potential overflow\n            if (nums[mid] == target) {\n                return mid;\n            }\n            if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return -1;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String numsStr = sc.nextLine();\n        int target = Integer.parseInt(sc.nextLine());\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> numList = gson.fromJson(numsStr, listType);\n        int[] nums = numList.stream().mapToInt(Integer::intValue).toArray();\n\n        Solution solution = new Solution();\n        System.out.println(solution.search(nums, target));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n\nstd::vector<int> parse_input_array(const std::string& s) {\n    std::vector<int> result;\n    std::string temp = s;\n    if (!temp.empty() && temp.front() == '[') temp.erase(0, 1);\n    if (!temp.empty() && temp.back() == ']') temp.pop_back();\n    std::stringstream ss(temp);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        if (!item.empty()) {\n            try { result.push_back(std::stoi(item)); } catch (const std::invalid_argument&) {}\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    int search(std::vector<int>& nums, int target) {\n        int left = 0;\n        int right = nums.size() - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                return mid;\n            }\n            if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        return -1;\n    }\n};\n\nint main() {\n    std::string line1, line2;\n    std::getline(std::cin, line1);\n    std::getline(std::cin, line2);\n\n    std::vector<int> nums = parse_input_array(line1);\n    int target = std::stoi(line2);\n\n    Solution sol;\n    std::cout << sol.search(nums, target) << std::endl;\n\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\nfrom typing import List\n\nline1 = sys.stdin.readline().strip()\nline2 = sys.stdin.readline().strip()\n\nnums_list = json.loads(line1)\ntarget_val = int(line2)\n\ndef solve_binary_search(nums: List[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nresult = solve_binary_search(nums_list, target_val)\nprint(result)",
    },
    hints: [
      "The array is sorted. This is a big hint for using binary search.",
      "Initialize two pointers, `left` at the beginning of the array and `right` at the end.",
      "While `left <= right`, calculate the middle index `mid`.",
      "If `nums[mid]` is the target, you've found it.",
      "If `nums[mid]` is less than the target, the target must be in the right half, so move `left = mid + 1`.",
      "If `nums[mid]` is greater than the target, the target must be in the left half, so move `right = mid - 1`.",
      "If the loop finishes without finding the target, it means the target is not in the array.",
    ],
    editorial: {
      explanation:
        "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.\n\nAlgorithm Steps:\n1. Initialize `left = 0` and `right = nums.length - 1`.\n2. Loop as long as `left <= right`:\n   a. Calculate the middle index: `mid = left + (right - left) / 2`. (Using this formula instead of `(left + right) / 2` helps prevent potential integer overflow if `left` and `right` are very large).\n   b. Compare `nums[mid]` with `target`:\n      i. If `nums[mid] == target`, the target is found at index `mid`. Return `mid`.\n      ii. If `nums[mid] < target`, the target, if it exists, must be in the right half of the current search space. So, update `left = mid + 1`.\n      iii. If `nums[mid] > target`, the target, if it exists, must be in the left half. So, update `right = mid - 1`.\n3. If the loop terminates (i.e., `left > right`), it means the target was not found in the array. Return -1.",
      timeComplexity: "O(log n), where n is the number of elements in the array. In each step, we reduce the search space by half.",
      spaceComplexity: "O(1), as we only use a constant amount of extra space for variables like `left`, `right`, and `mid`.",
      code:
        "# Python Editorial Code\nfrom typing import List\n\nclass Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = left + (right - left) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return -1",
      codeLanguage: "PYTHON",
    },
    companyTag: "Facebook, Amazon, Microsoft, Google, Apple, Adobe",
  },

// Problem 6: Invert Binary Tree
  {
    title: "Invert Binary Tree",
    description:
      "Given the `root` of a binary tree, invert the tree, and return its root.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Recursion"],
    examples: [
      {
        input: "[4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
        explanation: "Original: 4(2(1,3),7(6,9)) -> Inverted: 4(7(9,6),2(3,1))",
      },
      {
        input: "[2,1,3]",
        output: "[2,3,1]",
        explanation:""
      },
      {
        input: "[]",
        output: "[]",
        explanation:""
      },
    ],
    constraints:
      "The number of nodes in the tree is in the range `[0, 100]`.\n`-100 <= Node.val <= 100`",
    testcases: [
      { input: "[4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", output: "[2,3,1]" },
      { input: "[]", output: "[]" },
      { input: "[1,null,2]", output: "[1,2,null]" },
      { input: "[1,2,null,3]", output: "[1,null,2,null,3]" }, // Inorder: [3,2,1] -> [1,2,3] (inverted)
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = function(root) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\n/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Your code here\n        return null;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Your code here\n        return nullptr;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nfrom typing import Optional\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\n\n// Helper to build tree from array (level-order, null for empty)\nfunction buildTree(arr) {\n    if (!arr || arr.length === 0 || arr[0] === null) return null;\n    let root = new TreeNode(arr[0]);\n    let queue = [root];\n    let i = 1;\n    while (i < arr.length) {\n        let current = queue.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            current.left = new TreeNode(arr[i]);\n            queue.push(current.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            current.right = new TreeNode(arr[i]);\n            queue.push(current.right);\n        }\n        i++;\n    }\n    return root;\n}\n\n// Helper to convert tree to array (level-order)\nfunction treeToArray(root) {\n    if (!root) return [];\n    const arr = [];\n    const queue = [root];\n    while (queue.length > 0) {\n        let levelSize = queue.length;\n        let hasNonNull = false;\n        const currentLevelNodes = [];\n        for (let i = 0; i < levelSize; i++) {\n            const node = queue.shift();\n            if (node) {\n                currentLevelNodes.push(node.val);\n                queue.push(node.left);\n                queue.push(node.right);\n                if (node.left || node.right) hasNonNull = true;\n            } else {\n                currentLevelNodes.push(null);\n            }\n        }\n        arr.push(...currentLevelNodes);\n         // Trim trailing nulls from the overall array, but only if no more non-null nodes are coming\n    }\n    // Trim trailing nulls effectively\n    let lastNonNull = -1;\n    for(let i = 0; i < arr.length; i++) {\n        if (arr[i] !== null) lastNonNull = i;\n    }\n    return arr.slice(0, lastNonNull + 1);\n}\n\n\nvar invertTreeRecursive = function(root) {\n    if (!root) {\n        return null;\n    }\n    // Swap children\n    const temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n\n    // Recursively invert subtrees\n    invertTreeRecursive(root.left);\n    invertTreeRecursive(root.right);\n\n    return root;\n};\n\nfunction solve() {\n    const inputStr = fs.readFileSync(0, 'utf-8').trim();\n    const arr = JSON.parse(inputStr);\n    const root = buildTree(arr);\n    \n    const invertedRoot = invertTreeRecursive(root);\n    console.log(JSON.stringify(treeToArray(invertedRoot)));\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.*;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) {\n            return null;\n        }\n        TreeNode temp = root.left;\n        root.left = root.right;\n        root.right = temp;\n\n        invertTree(root.left);\n        invertTree(root.right);\n        return root;\n    }\n}\n\npublic class Main {\n    public static TreeNode buildTree(List<Integer> vals) {\n        if (vals == null || vals.isEmpty() || vals.get(0) == null) return null;\n        TreeNode root = new TreeNode(vals.get(0));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        int i = 1;\n        while (i < vals.size()) {\n            TreeNode current = queue.poll();\n            if (current == null) continue; // Should not happen with proper queue management\n\n            Integer leftVal = vals.get(i++);\n            if (leftVal != null) {\n                current.left = new TreeNode(leftVal);\n                queue.add(current.left);\n            }\n            if (i < vals.size()) {\n                Integer rightVal = vals.get(i++);\n                if (rightVal != null) {\n                    current.right = new TreeNode(rightVal);\n                    queue.add(current.right);\n                }\n            }\n        }\n        return root;\n    }\n\n    public static List<Integer> treeToArray(TreeNode root) {\n        List<Integer> result = new ArrayList<>();\n        if (root == null) return result;\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        while(!queue.isEmpty()){\n            TreeNode current = queue.poll();\n            if(current != null){\n                result.add(current.val);\n                queue.add(current.left);\n                queue.add(current.right);\n            } else {\n                result.add(null); // Add null for BFS representation\n            }\n        }\n        // Trim trailing nulls\n        int lastNonNull = -1;\n        for(int i = 0; i< result.size(); i++) {\n            if (result.get(i) != null) lastNonNull = i;\n        }\n        return result.subList(0, lastNonNull + 1);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String inputStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> nums = gson.fromJson(inputStr, listType);\n\n        TreeNode root = buildTree(nums);\n        Solution solution = new Solution();\n        TreeNode invertedRoot = solution.invertTree(root);\n        \n        System.out.println(gson.toJson(treeToArray(invertedRoot)));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n#include <queue>\n#include <list> // For list to store Integer pointers for treeToArray\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\n// Helper to build tree from vector (level-order, -1 for null)\nTreeNode* buildTree(const std::vector<int>& vals) {\n    if (vals.empty() || vals[0] == -101) return nullptr; // Use a sentinel for null not within val range\n    TreeNode* root = new TreeNode(vals[0]);\n    std::queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (i < vals.size()) {\n        TreeNode* current = q.front();\n        q.pop();\n        if (vals[i] != -101) {\n            current->left = new TreeNode(vals[i]);\n            q.push(current->left);\n        }\n        i++;\n        if (i < vals.size() && vals[i] != -101) {\n            current->right = new TreeNode(vals[i]);\n            q.push(current->right);\n        }\n        i++;\n    }\n    return root;\n}\n\n// Helper to convert tree to vector (level-order, -101 for null)\nstd::vector<int> treeToVector(TreeNode* root) {\n    std::vector<int> result;\n    if (!root) return result;\n    std::queue<TreeNode*> q;\n    q.push(root);\n    std::list<int*> tempList; // Use list of pointers to handle nulls correctly\n\n    while (!q.empty()) {\n        TreeNode* node = q.front();\n        q.pop();\n        if (node) {\n            tempList.push_back(new int(node->val));\n            q.push(node->left);\n            q.push(node->right);\n        } else {\n            tempList.push_back(nullptr);\n        }\n    }\n    // Trim trailing nulls from tempList\n    while (!tempList.empty() && tempList.back() == nullptr) {\n        delete tempList.back();\n        tempList.pop_back();\n    }\n    // Convert to vector<int> using -101 for null\n    for (int* val_ptr : tempList) {\n        if (val_ptr) {\n            result.push_back(*val_ptr);\n            delete val_ptr;\n        } else {\n            result.push_back(-101); // Sentinel for null\n        }\n    }\n    return result;\n}\n\nvoid printVectorAsJsonTree(const std::vector<int>& vec) {\n    std::cout << \"[\";\n    for (size_t i = 0; i < vec.size(); ++i) {\n        if (vec[i] == -101) std::cout << \"null\";\n        else std::cout << vec[i];\n        if (i < vec.size() - 1) std::cout << \",\";\n    }\n    std::cout << \"]\" << std::endl;\n}\n\n// Parse input like [4,2,7,1,3,6,9] where null is just missing or represented by \"null\"\nstd::vector<int> parse_tree_input(const std::string& s) {\n    std::vector<int> result;\n    std::string temp_s = s;\n    if (!temp_s.empty() && temp_s.front() == '[') temp_s.erase(0, 1);\n    if (!temp_s.empty() && temp_s.back() == ']') temp_s.pop_back();\n    std::stringstream ss(temp_s);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        if (item == \"null\" || item.empty()) {\n            result.push_back(-101); // Use sentinel for null\n        } else {\n            try { result.push_back(std::stoi(item)); } catch (const std::invalid_argument&) { result.push_back(-101); }\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        std::swap(root->left, root->right);\n        invertTree(root->left);\n        invertTree(root->right);\n        return root;\n    }\n};\n\nvoid deleteTree(TreeNode* root) {\n    if (!root) return;\n    deleteTree(root->left);\n    deleteTree(root->right);\n    delete root;\n}\n\nint main() {\n    std::string line;\n    std::getline(std::cin, line);\n    std::vector<int> nums = parse_tree_input(line);\n    TreeNode* root = buildTree(nums);\n\n    Solution sol;\n    TreeNode* invertedRoot = sol.invertTree(root);\n    \n    printVectorAsJsonTree(treeToVector(invertedRoot));\n    //deleteTree(invertedRoot); // Original root is now invertedRoot, so one delete is fine.\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\nfrom typing import Optional, List\nfrom collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(arr: List[Optional[int]]) -> Optional[TreeNode]:\n    if not arr or arr[0] is None:\n        return None\n    root = TreeNode(arr[0])\n    queue = deque([root])\n    i = 1\n    while i < len(arr):\n        current = queue.popleft()\n        if arr[i] is not None:\n            current.left = TreeNode(arr[i])\n            queue.append(current.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            current.right = TreeNode(arr[i])\n            queue.append(current.right)\n        i += 1\n    return root\n\ndef tree_to_array(root: Optional[TreeNode]) -> List[Optional[int]]:\n    if not root:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node:\n            result.append(node.val)\n            queue.append(node.left)\n            queue.append(node.right)\n        else:\n            result.append(None)\n    # Trim trailing Nones\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\ndef solve_invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:\n    if not root:\n        return None\n    \n    # Swap children\n    root.left, root.right = root.right, root.left\n    \n    # Recursively invert subtrees\n    solve_invert_tree(root.left)\n    solve_invert_tree(root.right)\n    \n    return root\n\nline = sys.stdin.readline().strip()\narr_input = json.loads(line)\n\nroot_node = build_tree(arr_input)\ninverted_root_node = solve_invert_tree(root_node)\n\nprint(json.dumps(tree_to_array(inverted_root_node)))",
    },
    hints: [
      "Think about what it means to invert a tree: for every node, its left child becomes its right child, and its right child becomes its left child.",
      "This operation needs to be performed recursively for all nodes in the tree.",
      "Base case for recursion: If the current node is null, do nothing and return.",
      "Recursive step: Swap the left and right children of the current node. Then, recursively call the invert function on the (new) left child and the (new) right child.",
      "Alternatively, you can use a breadth-first approach (iterative with a queue). For each node, swap its children and add the children to the queue to be processed.",
    ],
    editorial: {
      explanation:
        "Inverting a binary tree means that for every node, its left and right children are swapped. This process must be applied to all nodes in the tree.\n\n**Recursive (DFS) Approach:**\n1. Base Case: If the `root` is `null`, there's nothing to invert, so return `null`.\n2. Swap: Swap the `left` and `right` children of the current `root` node.\n   `temp = root.left`\n   `root.left = root.right`\n   `root.right = temp`\n3. Recursive Calls: Recursively call `invertTree` on the (new) `root.left` and (new) `root.right` subtrees.\n   `invertTree(root.left)`\n   `invertTree(root.right)`\n4. Return: Return the `root` of the inverted tree.\n\n**Iterative (BFS) Approach:**\n1. If `root` is `null`, return `null`.\n2. Initialize a queue and add the `root` to it.\n3. While the queue is not empty:\n   a. Dequeue a node (let's call it `current`).\n   b. Swap `current.left` and `current.right`.\n   c. If `current.left` is not null, enqueue `current.left`.\n   d. If `current.right` is not null, enqueue `current.right`.\n4. Return the `root`.",
      timeComplexity: "O(n), where n is the number of nodes in the tree, as we visit each node once.",
      spaceComplexity: "O(h) for the recursive solution due to the recursion call stack, where h is the height of the tree. In the worst case (skewed tree), h can be n, so O(n). For a balanced tree, h is O(log n).\nFor the iterative BFS solution, space complexity is O(w), where w is the maximum width of the tree. In the worst case (a complete binary tree), w can be roughly n/2, so O(n).",
      code:
        "# Python Editorial Code (Recursive)\nfrom typing import Optional\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root:\n            return None\n        \n        # Swap the children\n        root.left, root.right = root.right, root.left\n        \n        # Make recursive calls for the children\n        self.invertTree(root.left)\n        self.invertTree(root.right)\n        \n        return root",
      codeLanguage: "PYTHON",
    },
    companyTag: "Google, Amazon, Microsoft, Apple, Facebook, Uber",
  },

// Problem 7: Valid Anagram
  {
    title: "Valid Anagram",
    description:
      "Given two strings `s` and `t`, return `true` *if* `t` *is an anagram of* `s`*, and* `false` *otherwise*.\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "Easy",
    tags: ["String", "Hash Table", "Sorting"],
    examples: [
      {
        input: "anagram\nnagaram",
        output: "true",
        explanation:""
      },
      {
        input: "rat\ncar",
        output: "false",
        explanation:""
      },
    ],
    constraints:
      "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
    testcases: [
      { input: "anagram\nnagaram", output: "true" },
      { input: "rat\ncar", output: "false" },
      { input: "a\nb", output: "false" },
      { input: "aacc\nccac", output: "false" }, // Counts must match
      { input: "listen\nsilent", output: "true" },
      { input: "aabb\nbbaa", output: "true" },
      { input: "aa\na", output: "false" },
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        // Your code here\n        return false;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n#include <string>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    bool isAnagram(std::string s, std::string t) {\n        // Your code here\n        return false;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\ndef isAnagram(s: str, t: str) -> bool:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n    const s = input[0];\n    const t = input[1];\n\n    if (s.length !== t.length) {\n        console.log(false);\n        return;\n    }\n\n    const charCount = new Array(26).fill(0);\n    const baseCharCode = 'a'.charCodeAt(0);\n\n    for (let i = 0; i < s.length; i++) {\n        charCount[s.charCodeAt(i) - baseCharCode]++;\n        charCount[t.charCodeAt(i) - baseCharCode]--;\n    }\n\n    for (let count of charCount) {\n        if (count !== 0) {\n            console.log(false);\n            return;\n        }\n    }\n    console.log(true);\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) {\n            return false;\n        }\n        int[] charCounts = new int[26]; // For lowercase English letters\n        for (int i = 0; i < s.length(); i++) {\n            charCounts[s.charAt(i) - 'a']++;\n            charCounts[t.charAt(i) - 'a']--;\n        }\n        for (int count : charCounts) {\n            if (count != 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        String t = sc.nextLine();\n        sc.close();\n\n        Solution solution = new Solution();\n        System.out.println(solution.isAnagram(s, t));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm> // For std::sort (alternative solution)\n#include <unordered_map> // For hash map solution\n\nclass Solution {\npublic:\n    // Using frequency array\n    bool isAnagram(std::string s, std::string t) {\n        if (s.length() != t.length()) {\n            return false;\n        }\n        std::vector<int> counts(26, 0);\n        for (int i = 0; i < s.length(); ++i) {\n            counts[s[i] - 'a']++;\n            counts[t[i] - 'a']--;\n        }\n        for (int count : counts) {\n            if (count != 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n    // Alternative using sorting:\n    // bool isAnagram(std::string s, std::string t) {\n    //     if (s.length() != t.length()) return false;\n    //     std::sort(s.begin(), s.end());\n    //     std::sort(t.begin(), t.end());\n    //     return s == t;\n    // }\n};\n\nint main() {\n    std::string s, t;\n    std::getline(std::cin, s);\n    std::getline(std::cin, t);\n\n    Solution sol;\n    if (sol.isAnagram(s, t)) {\n        std::cout << \"true\" << std::endl;\n    } else {\n        std::cout << \"false\" << std::endl;\n    }\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nfrom collections import Counter\n\ns_str = sys.stdin.readline().strip()\nt_str = sys.stdin.readline().strip()\n\ndef solve_is_anagram(s: str, t: str) -> bool:\n    if len(s) != len(t):\n        return False\n    \n    # Using collections.Counter\n    # return Counter(s) == Counter(t)\n\n    # Using frequency array (for lowercase English letters)\n    count = [0] * 26\n    for i in range(len(s)):\n        count[ord(s[i]) - ord('a')] += 1\n        count[ord(t[i]) - ord('a')] -= 1\n    \n    for val in count:\n        if val != 0:\n            return False\n    return True\n\nresult = solve_is_anagram(s_str, t_str)\nprint(str(result).lower())",
    },
    hints: [
      "Two strings are anagrams if they contain the same characters with the same frequencies.",
      "First, check if the lengths of the two strings are different. If they are, they cannot be anagrams.",
      "One approach is to sort both strings. If they are anagrams, their sorted versions will be identical.",
      "Another approach is to use a hash map (or a frequency array if the character set is limited, like lowercase English letters) to count character frequencies.",
      "Iterate through the first string `s` and increment counts for each character. Then, iterate through the second string `t` and decrement counts. If all counts are zero at the end, they are anagrams.",
    ],
    editorial: {
      explanation:
        "An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once. There are a few common ways to check if two strings `s` and `t` are anagrams:\n\n1.  **Sorting:**\n    *   If the lengths of `s` and `t` are different, they cannot be anagrams, so return `false`.\n    *   Convert both strings to character arrays and sort them.\n    *   If the sorted arrays are identical, then `s` and `t` are anagrams. Otherwise, they are not.\n    *   Time complexity: O(N log N) where N is the length of the strings, due to sorting.\n    *   Space complexity: O(N) or O(1) depending on the sort implementation and whether strings are mutable (can we sort in place or need copies).\n\n2.  **Frequency Counting (Hash Map / Array):**\n    *   If the lengths of `s` and `t` are different, return `false`.\n    *   Create a frequency map (e.g., a hash map or an integer array of size 26 for lowercase English letters).\n    *   Iterate through string `s`: for each character, increment its count in the frequency map.\n    *   Iterate through string `t`: for each character, decrement its count in the frequency map.\n    *   After processing both strings, if all counts in the frequency map are zero, the strings are anagrams. If any count is non-zero, they are not.\n    *   A slight optimization for the frequency array approach: Iterate through both strings simultaneously. Increment for `s` and decrement for `t`. Then check if all array elements are zero.\n    *   Time complexity: O(N) because we iterate through the strings a constant number of times.\n    *   Space complexity: O(K) where K is the number of unique characters (e.g., O(26) for lowercase English letters, or O(1) if K is considered constant; or O(U) for general Unicode characters with a hash map, where U is the number of unique characters in the strings).",
      timeComplexity: "O(N) using frequency counting, or O(N log N) using sorting. N is the length of the strings.",
      spaceComplexity: "O(1) or O(K) for frequency counting (K = size of character set). O(N) or O(1) for sorting, depending on implementation details.",
      code:
        "# Python Editorial Code (Frequency Array)\nclass Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        \n        counts = [0] * 26  # For lowercase English letters 'a' through 'z'\n        \n        for i in range(len(s)):\n            counts[ord(s[i]) - ord('a')] += 1\n            counts[ord(t[i]) - ord('a')] -= 1\n            \n        for count in counts:\n            if count != 0:\n                return False\n                \n        return True",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Facebook, Microsoft, Google, Bloomberg, Uber, Adobe",
  },

// Problem 8: Maximum Depth of Binary Tree
  {
    title: "Maximum Depth of Binary Tree",
    description:
      "Given the `root` of a binary tree, return *its maximum depth*.\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: "Easy",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Recursion"],
    examples: [
      {
        input: "[3,9,20,null,null,15,7]",
        output: "3",
        explanation:""
      },
      {
        input: "[1,null,2]",
        output: "2",
        explanation:""
      },
      {
        input: "[]",
        output: "0",
        explanation:""
      },
    ],
    constraints:
      "The number of nodes in the tree is in the range `[0, 10^4]`.\n`-100 <= Node.val <= 100`",
    testcases: [
      { input: "[3,9,20,null,null,15,7]", output: "3" },
      { input: "[1,null,2]", output: "2" },
      { input: "[]", output: "0" },
      { input: "[0]", output: "1" },
      { input: "[1,2,3,4,5]", output: "3" }, // 1(2(4,5),3)
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function(root) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\n/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Your code here\n        return 0;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\n# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nfrom typing import Optional\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef maxDepth(root: Optional[TreeNode]) -> int:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\n\nfunction buildTree(arr) { /* Same as Invert Binary Tree */ \n    if (!arr || arr.length === 0 || arr[0] === null) return null;\n    let root = new TreeNode(arr[0]);\n    let queue = [root];\n    let i = 1;\n    while (i < arr.length) {\n        let current = queue.shift();\n        if (arr[i] !== null && arr[i] !== undefined) {\n            current.left = new TreeNode(arr[i]);\n            queue.push(current.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {\n            current.right = new TreeNode(arr[i]);\n            queue.push(current.right);\n        }\n        i++;\n    }\n    return root;\n}\n\nvar maxDepthRecursive = function(root) {\n    if (!root) {\n        return 0;\n    }\n    const leftDepth = maxDepthRecursive(root.left);\n    const rightDepth = maxDepthRecursive(root.right);\n    return Math.max(leftDepth, rightDepth) + 1;\n};\n\nfunction solve() {\n    const inputStr = fs.readFileSync(0, 'utf-8').trim();\n    const arr = JSON.parse(inputStr);\n    const root = buildTree(arr);\n    \n    console.log(maxDepthRecursive(root));\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.*;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass TreeNode { /* Same as Invert Binary Tree */ \n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) {\n            return 0;\n        }\n        int leftDepth = maxDepth(root.left);\n        int rightDepth = maxDepth(root.right);\n        return Math.max(leftDepth, rightDepth) + 1;\n    }\n}\n\npublic class Main {\n    public static TreeNode buildTree(List<Integer> vals) { /* Same as Invert Binary Tree */ \n        if (vals == null || vals.isEmpty() || vals.get(0) == null) return null;\n        TreeNode root = new TreeNode(vals.get(0));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        int i = 1;\n        while (i < vals.size()) {\n            TreeNode current = queue.poll();\n            if (current == null) continue;\n            Integer leftVal = vals.get(i++);\n            if (leftVal != null) {\n                current.left = new TreeNode(leftVal);\n                queue.add(current.left);\n            }\n            if (i < vals.size()) {\n                Integer rightVal = vals.get(i++);\n                if (rightVal != null) {\n                    current.right = new TreeNode(rightVal);\n                    queue.add(current.right);\n                }\n            }\n        }\n        return root;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String inputStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> nums = gson.fromJson(inputStr, listType);\n\n        TreeNode root = buildTree(nums);\n        Solution solution = new Solution();\n        System.out.println(solution.maxDepth(root));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\n#include <queue>\n\nstruct TreeNode { /* Same as Invert Binary Tree */ \n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\nTreeNode* buildTree(const std::vector<int>& vals) { /* Same as Invert Binary Tree, using -101 for null */ \n    if (vals.empty() || vals[0] == -101) return nullptr;\n    TreeNode* root = new TreeNode(vals[0]);\n    std::queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (i < vals.size()) {\n        TreeNode* current = q.front();\n        q.pop();\n        if (vals[i] != -101) {\n            current->left = new TreeNode(vals[i]);\n            q.push(current->left);\n        }\n        i++;\n        if (i < vals.size() && vals[i] != -101) {\n            current->right = new TreeNode(vals[i]);\n            q.push(current->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nstd::vector<int> parse_tree_input(const std::string& s) { /* Same as Invert Binary Tree */\n    std::vector<int> result;\n    std::string temp_s = s;\n    if (!temp_s.empty() && temp_s.front() == '[') temp_s.erase(0, 1);\n    if (!temp_s.empty() && temp_s.back() == ']') temp_s.pop_back();\n    std::stringstream ss(temp_s);\n    std::string item;\n    while (std::getline(ss, item, ',')) {\n        if (item == \"null\" || item.empty()) {\n            result.push_back(-101); \n        } else {\n            try { result.push_back(std::stoi(item)); } catch (const std::invalid_argument&) { result.push_back(-101); }\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        int leftDepth = maxDepth(root->left);\n        int rightDepth = maxDepth(root->right);\n        return std::max(leftDepth, rightDepth) + 1;\n    }\n};\n\nint main() {\n    std::string line;\n    std::getline(std::cin, line);\n    std::vector<int> nums = parse_tree_input(line);\n    TreeNode* root = buildTree(nums);\n\n    Solution sol;\n    std::cout << sol.maxDepth(root) << std::endl;\n    // No explicit deleteTree here as it's a common competitive programming pattern to skip for brevity\n    // but in real C++ apps, memory should be managed.\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\nfrom typing import Optional, List\nfrom collections import deque\n\nclass TreeNode: # Same as Invert Binary Tree\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(arr: List[Optional[int]]) -> Optional[TreeNode]: # Same as Invert Binary Tree\n    if not arr or arr[0] is None:\n        return None\n    root = TreeNode(arr[0])\n    queue = deque([root])\n    i = 1\n    while i < len(arr):\n        current = queue.popleft()\n        if arr[i] is not None:\n            current.left = TreeNode(arr[i])\n            queue.append(current.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            current.right = TreeNode(arr[i])\n            queue.append(current.right)\n        i += 1\n    return root\n\ndef solve_max_depth(root: Optional[TreeNode]) -> int:\n    if not root:\n        return 0\n    left_depth = solve_max_depth(root.left)\n    right_depth = solve_max_depth(root.right)\n    return max(left_depth, right_depth) + 1\n\nline = sys.stdin.readline().strip()\narr_input = json.loads(line)\n\nroot_node = build_tree(arr_input)\ndepth = solve_max_depth(root_node)\n\nprint(depth)",
    },
    hints: [
      "The depth of a tree can be defined recursively.",
      "If a node is null, its depth is 0.",
      "Otherwise, the depth of a node is `1 + max(depth of left child, depth of right child)`.",
      "This naturally leads to a recursive (DFS) solution.",
      "Alternatively, you can use BFS. The maximum depth is the number of levels in the tree. Perform a level-order traversal and count the levels.",
    ],
    editorial: {
      explanation:
        "The maximum depth of a binary tree is the number of nodes along the longest path from the root node to the farthest leaf node.\n\n**Recursive (DFS) Approach:**\nThis is the most intuitive way to solve this problem.\n1. Base Case: If the `root` is `null`, the depth is 0 (an empty tree has no depth).\n2. Recursive Step: If the `root` is not `null`:\n   a. Recursively find the maximum depth of the left subtree: `left_depth = maxDepth(root.left)`.\n   b. Recursively find the maximum depth of the right subtree: `right_depth = maxDepth(root.right)`.\n   c. The depth of the current tree rooted at `root` is `1 + max(left_depth, right_depth)`. The `+1` accounts for the current `root` node itself.\n\n**Iterative (BFS) Approach:**\n1. If `root` is `null`, return 0.\n2. Initialize a queue and add the `root` to it. Initialize `depth = 0`.\n3. While the queue is not empty:\n   a. Increment `depth` (we are processing a new level).\n   b. Get the number of nodes at the current level (`level_size = queue.size()`).\n   c. Dequeue `level_size` nodes from the queue (all nodes at the current level).\n   d. For each dequeued node, if it has a left child, enqueue it. If it has a right child, enqueue it.\n4. After the loop, `depth` will hold the maximum depth of the tree.",
      timeComplexity: "O(N), where N is the number of nodes in the tree, as we visit each node once.",
      spaceComplexity: "O(H) for the recursive DFS approach due to the recursion stack, where H is the height of the tree (worst case O(N) for a skewed tree, best case O(log N) for a balanced tree).\nFor the iterative BFS approach, space complexity is O(W), where W is the maximum width of the tree (worst case O(N) for a complete tree).",
      code:
        "# Python Editorial Code (Recursive)\nfrom typing import Optional\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        \n        left_depth = self.maxDepth(root.left)\n        right_depth = self.maxDepth(root.right)\n        \n        return max(left_depth, right_depth) + 1",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Microsoft, Apple, LinkedIn, Facebook, Google, Bloomberg",
  },

// Problem 9: Contains Duplicate
  {
    title: "Contains Duplicate",
    description:
      "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table", "Sorting"],
    examples: [
      {
        input: "[1,2,3,1]",
        output: "true",
        explanation:""
      },
      {
        input: "[1,2,3,4]",
        output: "false",
        explanation:""
      },
      {
        input: "[1,1,1,3,3,4,3,2,4,2]",
        output: "true",
        explanation:""
      },
    ],
    constraints:
      "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    testcases: [
      { input: "[1,2,3,1]", output: "true" },
      { input: "[1,2,3,4]", output: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", output: "true" },
      { input: "[]", output: "false" }, // Or based on constraints, min length 1
      { input: "[0]", output: "false" },
      { input: "[0,0]", output: "true" },
      { input: "[-1, -1, 5]", output: "true" },
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\n/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar containsDuplicate = function(nums) {\n    // Your code here\n};",
      JAVA:
        "// Java Code Snippet\nimport java.util.HashSet;\nimport java.util.Set;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Your code here\n        return false;\n    }\n}",
      CPP:
        "// C++ Code Snippet\n#include <vector>\n#include <unordered_set>\n\nclass Solution {\npublic:\n    bool containsDuplicate(std::vector<int>& nums) {\n        // Your code here\n        return false;\n    }\n};",
      PYTHON:
        "# Python Code Snippet\nfrom typing import List\n\ndef containsDuplicate(nums: List[int]) -> bool:\n    # Your code here\n    pass",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\nconst fs = require('fs');\n\nfunction solve() {\n    const inputStr = fs.readFileSync(0, 'utf-8').trim();\n    const nums = JSON.parse(inputStr);\n\n    if (!nums || nums.length === 0) { // Handle empty array as per typical contest interpretation\n        console.log(false);\n        return;\n    }\n\n    const seen = new Set();\n    for (const num of nums) {\n        if (seen.has(num)) {\n            console.log(true);\n            return;\n        }\n        seen.add(num);\n    }\n    console.log(false);\n}\n\nsolve();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Scanner;\nimport java.util.HashSet;\nimport java.util.Set;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\nimport java.util.ArrayList;\nimport java.util.List;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        if (nums == null || nums.length == 0) {\n            return false;\n        }\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num)) {\n                return true;\n            }\n            seen.add(num);\n        }\n        return false;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String numsStr = sc.nextLine();\n        sc.close();\n\n        Gson gson = new Gson();\n        Type listType = new TypeToken<ArrayList<Integer>>(){}.getType();\n        List<Integer> numList = gson.fromJson(numsStr, listType);\n        int[] nums = {};\n        if (numList != null) { // handle \"[]\" input from JSON\n            nums = numList.stream().mapToInt(Integer::intValue).toArray();\n        }\n        \n        Solution solution = new Solution();\n        System.out.println(solution.containsDuplicate(nums));\n    }\n}",
      CPP:
        "// C++ Reference Solution\n#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <unordered_set>\n#include <algorithm> // for sort (alternative)\n\nstd::vector<int> parse_input_array(const std::string& s) { /* Same as Binary Search */ \n    std::vector<int> result;\n    std::string temp = s;\n    if (!temp.empty() && temp.front() == '[') temp.erase(0, 1);\n    if (!temp.empty() && temp.back() == ']') temp.pop_back();\n    std::stringstream ss(temp);\n    std::string item;\n    if (temp.empty()) return result; // Handle \"[]\"\n    while (std::getline(ss, item, ',')) {\n        if (!item.empty()) {\n            try { result.push_back(std::stoi(item)); } catch (const std::invalid_argument&) {}\n        }\n    }\n    return result;\n}\n\nclass Solution {\npublic:\n    bool containsDuplicate(std::vector<int>& nums) {\n        if (nums.empty()) return false;\n        std::unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) {\n                return true;\n            }\n            seen.insert(num);\n        }\n        return false;\n    }\n    // Alternative using sorting:\n    // bool containsDuplicateSort(std::vector<int>& nums) {\n    //     if (nums.empty()) return false;\n    //     std::sort(nums.begin(), nums.end());\n    //     for (size_t i = 0; i < nums.size() - 1; ++i) {\n    //         if (nums[i] == nums[i+1]) {\n    //             return true;\n    //         }\n    //     }\n    //     return false;\n    // }\n};\n\nint main() {\n    std::string line;\n    std::getline(std::cin, line);\n    std::vector<int> nums = parse_input_array(line);\n\n    Solution sol;\n    if (sol.containsDuplicate(nums)) {\n        std::cout << \"true\" << std::endl;\n    } else {\n        std::cout << \"false\" << std::endl;\n    }\n    return 0;\n}",
      PYTHON:
        "# Python Reference Solution\nimport sys\nimport json\nfrom typing import List\n\nline = sys.stdin.readline().strip()\n\nnums_list = json.loads(line)\n\ndef solve_contains_duplicate(nums: List[int]) -> bool:\n    if not nums:\n        return False\n    seen = set()\n    for num in nums:\n        if num in seen:\n            return True\n        seen.add(num)\n    return False\n\nresult = solve_contains_duplicate(nums_list)\nprint(str(result).lower())",
    },
    hints: [
      "Think about how you can efficiently check if an element has been seen before.",
      "A hash set (or `Set` in JavaScript/Python, `HashSet` in Java, `unordered_set` in C++) is suitable for storing seen elements and checking for existence in O(1) average time.",
      "Iterate through the array. For each element, try to add it to the set. If it's already in the set, you've found a duplicate.",
      "Alternatively, you can sort the array. If there are duplicates, they will be adjacent after sorting. Then, iterate through the sorted array and check adjacent elements.",
    ],
    editorial: {
      explanation:
        "The problem asks us to determine if any value appears at least twice in an array of integers.\n\n**1. Using a Hash Set:**\n   - Iterate through the `nums` array.\n   - For each number, check if it's already present in a hash set (e.g., `HashSet` in Java, `set` in Python, `std::unordered_set` in C++).\n   - If the number is already in the set, it means we've encountered it before, so a duplicate exists. Return `true`.\n   - If the number is not in the set, add it to the set and continue.\n   - If the loop finishes without finding any duplicates, return `false`.\n   - Time Complexity: O(N) on average, as hash set insertions and lookups take O(1) on average. N is the number of elements.\n   - Space Complexity: O(N) in the worst case, if all elements are distinct and stored in the hash set.\n\n**2. Sorting:**\n   - Sort the `nums` array. This will bring duplicate elements next to each other.\n   - Iterate through the sorted array from the first element up to the second-to-last element.\n   - For each element `nums[i]`, compare it with the next element `nums[i+1]`. If `nums[i] == nums[i+1]`, a duplicate is found. Return `true`.\n   - If the loop finishes without finding adjacent identical elements, no duplicates exist. Return `false`.\n   - Time Complexity: O(N log N) due to sorting. The subsequent scan is O(N).\n   - Space Complexity: O(1) if the sorting is done in-place (like Heapsort), or O(N) if a sorting algorithm that uses extra space is used (like Timsort or Mergesort in some implementations, or if a copy is made).",
      timeComplexity: "O(N) using a hash set, or O(N log N) using sorting.",
      spaceComplexity: "O(N) for hash set, O(1) or O(N) for sorting.",
      code:
        "# Python Editorial Code (Hash Set)\nfrom typing import List\n\nclass Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        seen = set()\n        for num in nums:\n            if num in seen:\n                return True\n            seen.add(num)\n        return False",
      codeLanguage: "PYTHON",
    },
    companyTag: "Amazon, Apple, Microsoft, Facebook, Adobe, Google, Uber",
  },

// Problem 10: Implement Queue using Stacks
  {
    title: "Implement Queue using Stacks",
    description:
      "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).\n\nImplement the `MyQueue` class:\n- `void push(int x)` Pushes element x to the back of the queue.\n- `int pop()` Removes the element from the front of the queue and returns it.\n- `int peek()` Returns the element at the front of the queue.\n- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.\n\n**Notes:**\n- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.\n- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue), as long as you use only a stack's standard operations.",
    difficulty: "Easy",
    tags: ["Stack", "Queue", "Design"],
    examples: [
      {
        input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
        output: "[null, null, null, 1, 1, false]",
        explanation:
          "MyQueue myQueue = new MyQueue();\nmyQueue.push(1); // queue is: [1]\nmyQueue.push(2); // queue is: [1, 2] (leftmost is front)\nmyQueue.peek(); // return 1\nmyQueue.pop(); // return 1, queue is [2]\nmyQueue.empty(); // return false",
      },
    ],
    constraints:
      "1 <= x <= 9\nAt most 100 calls will be made to `push`, `pop`, `peek`, and `empty`.\nAll the calls to `pop` and `peek` are valid (i.e., will not be called on an empty queue).",
    testcases: [
      {
        input: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
        output: "[null,null,null,1,1,false]"
      },
      {
        input: '["MyQueue", "push", "pop", "empty"]\n[[], [1], [], []]',
        output: "[null,null,1,true]"
      },
      {
        input: '["MyQueue","push","push","push","pop","pop","peek","empty","pop","empty"]\n[[],[1],[2],[3],[],[],[],[],[],[]]',
        output: "[null,null,null,null,1,2,3,false,3,true]"
      }
    ],
    codeSnippets: {
      JAVASCRIPT:
        "// Javascript Code Snippet\nvar MyQueue = function() {\n    this.s1 = []; // For push operations (enqueue)\n    this.s2 = []; // For pop/peek operations (dequeue)\n};\n\n/** \n * @param {number} x\n * @return {void}\n */\nMyQueue.prototype.push = function(x) {\n    // Your code here\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.pop = function() {\n    // Your code here\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.peek = function() {\n    // Your code here\n};\n\n/**\n * @return {boolean}\n */\nMyQueue.prototype.empty = function() {\n    // Your code here\n};\n\n/** \n * Your MyQueue object will be instantiated and called as such:\n * var obj = new MyQueue()\n * obj.push(x)\n * var param_2 = obj.pop()\n * var param_3 = obj.peek()\n * var param_4 = obj.empty()\n */",
      JAVA:
        "// Java Code Snippet\nimport java.util.Stack;\n\nclass MyQueue {\n    private Stack<Integer> s1; // For push\n    private Stack<Integer> s2; // For pop/peek\n\n    public MyQueue() {\n        s1 = new Stack<>();\n        s2 = new Stack<>();\n    }\n    \n    public void push(int x) {\n        // Your code here\n    }\n    \n    public int pop() {\n        // Your code here\n        return -1; \n    }\n    \n    public int peek() {\n        // Your code here\n        return -1;\n    }\n    \n    public boolean empty() {\n        // Your code here\n        return true;\n    }\n}\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * MyQueue obj = new MyQueue();\n * obj.push(x);\n * int param_2 = obj.pop();\n * int param_3 = obj.peek();\n * boolean param_4 = obj.empty();\n */",
      CPP:
        "// C++ Code Snippet\n#include <stack>\n\nclass MyQueue {\nprivate:\n    std::stack<int> s1; // For push\n    std::stack<int> s2; // For pop/peek\npublic:\n    MyQueue() {\n        \n    }\n    \n    void push(int x) {\n        // Your code here\n    }\n    \n    int pop() {\n        // Your code here\n        return -1;\n    }\n    \n    int peek() {\n        // Your code here\n        return -1;\n    }\n    \n    bool empty() {\n        // Your code here\n        return true;\n    }\n};\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * MyQueue* obj = new MyQueue();\n * obj->push(x);\n * int param_2 = obj->pop();\n * int param_3 = obj->peek();\n * bool param_4 = obj->empty();\n */",
      PYTHON:
        "# Python Code Snippet\nclass MyQueue:\n\n    def __init__(self):\n        self.s1 = [] # For push\n        self.s2 = [] # For pop/peek\n\n    def push(self, x: int) -> None:\n        # Your code here\n        pass\n\n    def pop(self) -> int:\n        # Your code here\n        pass\n        \n    def peek(self) -> int:\n        # Your code here\n        pass\n\n    def empty(self) -> bool:\n        # Your code here\n        pass\n\n\n# Your MyQueue object will be instantiated and called as such:\n# obj = MyQueue()\n# obj.push(x)\n# param_2 = obj.pop()\n# param_3 = obj.peek()\n# param_4 = obj.empty()",
    },
    referenceSolutions: {
      JAVASCRIPT:
        "// Javascript Reference Solution\n// This problem is usually tested by calling methods on an object.\n// The main execution part would be handled by the testing environment.\n// Here's the class implementation. Driver code not typically needed for submission.\n\nvar MyQueue = function() {\n    this.s1 = []; // input stack\n    this.s2 = []; // output stack\n};\n\nMyQueue.prototype.push = function(x) {\n    this.s1.push(x);\n};\n\n// Helper function to move elements from s1 to s2 if s2 is empty\nMyQueue.prototype._transferIfNeeded = function() {\n    if (this.s2.length === 0) {\n        while (this.s1.length > 0) {\n            this.s2.push(this.s1.pop());\n        }\n    }\n};\n\nMyQueue.prototype.pop = function() {\n    this._transferIfNeeded();\n    return this.s2.pop();\n};\n\nMyQueue.prototype.peek = function() {\n    this._transferIfNeeded();\n    return this.s2[this.s2.length - 1];\n};\n\nMyQueue.prototype.empty = function() {\n    return this.s1.length === 0 && this.s2.length === 0;\n};\n\n// Example Usage (for local testing, not part of submission typically)\n// const fs = require('fs');\n// function runCommands() {\n//     const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n//     const commands = JSON.parse(input[0]);\n//     const params = JSON.parse(input[1]);\n//     let obj = null;\n//     const results = [];\n\n//     for (let i = 0; i < commands.length; i++) {\n//         const command = commands[i];\n//         const param = params[i];\n//         if (command === \"MyQueue\") {\n//             obj = new MyQueue();\n//             results.push(null);\n//         } else if (obj && typeof obj[command] === 'function') {\n//             const res = obj[command](...param);\n//             results.push(res === undefined ? null : res);\n//         }\n//     }\n//     console.log(JSON.stringify(results));\n// }\n// runCommands();",
      JAVA:
        "// Java Reference Solution\nimport java.util.Stack;\n// Main driver for this class structure is usually handled by the platform.\n\nclass MyQueue {\n    private Stack<Integer> s1; // input stack\n    private Stack<Integer> s2; // output stack\n\n    public MyQueue() {\n        s1 = new Stack<>();\n        s2 = new Stack<>();\n    }\n    \n    public void push(int x) {\n        s1.push(x);\n    }\n    \n    // Helper to ensure s2 has elements if needed\n    private void transferIfNeeded() {\n        if (s2.isEmpty()) {\n            while (!s1.isEmpty()) {\n                s2.push(s1.pop());\n            }\n        }\n    }\n\n    public int pop() {\n        transferIfNeeded();\n        return s2.pop();\n    }\n    \n    public int peek() {\n        transferIfNeeded();\n        return s2.peek();\n    }\n    \n    public boolean empty() {\n        return s1.isEmpty() && s2.isEmpty();\n    }\n}\n\n// Example of how it might be driven in a Main class for testing\n// import java.util.Scanner;\n// import com.google.gson.Gson;\n// import com.google.gson.reflect.TypeToken;\n// import java.lang.reflect.Type;\n// import java.util.ArrayList;\n// import java.util.List;\n// public class Main {\n//    public static void main(String[] args) {\n//        Scanner sc = new Scanner(System.in);\n//        Gson gson = new Gson();\n//        Type listStringType = new TypeToken<List<String>>(){}.getType();\n//        Type listOfListIntType = new TypeToken<List<List<Integer>>>(){}.getType();\n\n//        String commandsStr = sc.nextLine();\n//        String paramsStr = sc.nextLine();\n\n//        List<String> commands = gson.fromJson(commandsStr, listStringType);\n//        List<List<Integer>> params = gson.fromJson(paramsStr, listOfListIntType);\n\n//        MyQueue queue = null;\n//        List<Object> results = new ArrayList<>();\n\n//        for (int i = 0; i < commands.size(); i++) {\n//            String cmd = commands.get(i);\n//            List<Integer> p = params.get(i);\n//            switch (cmd) {\n//                case \"MyQueue\":\n//                    queue = new MyQueue();\n//                    results.add(null);\n//                    break;\n//                case \"push\":\n//                    queue.push(p.get(0));\n//                    results.add(null);\n//                    break;\n//                case \"pop\":\n//                    results.add(queue.pop());\n//                    break;\n//                case \"peek\":\n//                    results.add(queue.peek());\n//                    break;\n//                case \"empty\":\n//                    results.add(queue.empty());\n//                    break;\n//            }\n//        }\n//        System.out.println(gson.toJson(results));\n//        sc.close();\n//    }\n// }",
      CPP:
        "// C++ Reference Solution\n#include <stack>\n#include <vector> // For potential driver\n#include <string> // For potential driver\n#include <iostream> // For potential driver\n#include <stdexcept> // For runtime_error\n\n// The class implementation itself\nclass MyQueue {\nprivate:\n    std::stack<int> s1; // input stack\n    std::stack<int> s2; // output stack\n\n    void transferIfNeeded() {\n        if (s2.empty()) {\n            if (s1.empty()) {\n                // This case is handled by problem constraints: pop/peek on empty queue is invalid.\n                // However, for robustness, one might throw an exception or handle it.\n                // For this problem, we assume valid calls.\n            }\n            while (!s1.empty()) {\n                s2.push(s1.top());\n                s1.pop();\n            }\n        }\n    }\n\npublic:\n    MyQueue() {\n        // Constructor\n    }\n    \n    void push(int x) {\n        s1.push(x);\n    }\n    \n    int pop() {\n        transferIfNeeded();\n        // Assuming s2 is not empty due to problem constraints on valid calls\n        int val = s2.top();\n        s2.pop();\n        return val;\n    }\n    \n    int peek() {\n        transferIfNeeded();\n        // Assuming s2 is not empty\n        return s2.top();\n    }\n    \n    bool empty() {\n        return s1.empty() && s2.empty();\n    }\n};\n\n// Example Driver (not typically part of submission for class-based problems)\n/*\n#include <nlohmann/json.hpp> // External library for easy JSON parsing, for complex drivers\n// For simpler drivers, manual parsing of commands would be needed.\n// This part illustrates how it COULD be driven if you had a JSON parser.\nint main() {\n    std::string line1, line2;\n    std::getline(std::cin, line1);\n    std::getline(std::cin, line2);\n\n    // Manual parsing or using a JSON library for commands and params would be complex here.\n    // Online judges typically handle this part by directly calling the MyQueue methods.\n    // Let's simulate one of the examples:\n    MyQueue* myQueue = new MyQueue();\n    std::vector<std::string> results_str;\n    results_str.push_back(\"null\");\n\n    myQueue->push(1);\n    results_str.push_back(\"null\");\n    myQueue->push(2);\n    results_str.push_back(\"null\");\n\n    results_str.push_back(std::to_string(myQueue->peek()));\n    results_str.push_back(std::to_string(myQueue->pop()));\n    results_str.push_back(myQueue->empty() ? \"true\" : \"false\");\n\n    std::cout << \"[\";\n    for (size_t i = 0; i < results_str.size(); ++i) {\n        std::cout << results_str[i];\n        if (i < results_str.size() - 1) std::cout << \",\";\n    }\n    std::cout << \"]\" << std::endl;\n\n    delete myQueue;\n    return 0;\n}\n*/\n",
      PYTHON:
        "# Python Reference Solution\n# The class implementation for MyQueue\n\nclass MyQueue:\n    def __init__(self):\n        self.s1 = []  # input stack (for push operations)\n        self.s2 = []  # output stack (for pop/peek operations)\n\n    def push(self, x: int) -> None:\n        self.s1.append(x)\n\n    # Helper to transfer elements from s1 to s2 if s2 is empty\n    # This is the core of the amortized O(1) for pop/peek\n    def _transfer_if_needed(self) -> None:\n        if not self.s2:\n            while self.s1:\n                self.s2.append(self.s1.pop())\n\n    def pop(self) -> int:\n        self._transfer_if_needed()\n        return self.s2.pop() # Assumes s2 is not empty (valid call)\n\n    def peek(self) -> int:\n        self._transfer_if_needed()\n        return self.s2[-1] # Assumes s2 is not empty (valid call)\n\n    def empty(self) -> bool:\n        return not self.s1 and not self.s2\n\n# Example usage (for local testing, not usually part of submission)\n# import sys\n# import json\n# if __name__ == '__main__':\n#     commands_str = sys.stdin.readline().strip()\n#     params_str = sys.stdin.readline().strip()\n\n#     commands = json.loads(commands_str)\n#     params = json.loads(params_str)\n\n#     obj = None\n#     results = []\n\n#     for i in range(len(commands)):\n#         command = commands[i]\n#         param_list = params[i]\n\n#         if command == \"MyQueue\":\n#             obj = MyQueue()\n#             results.append(None)\n#         elif command == \"push\":\n#             obj.push(param_list[0])\n#             results.append(None)\n#         elif command == \"pop\":\n#             results.append(obj.pop())\n#         elif command == \"peek\":\n#             results.append(obj.peek())\n#         elif command == \"empty\":\n#             results.append(obj.empty())\n    \n#     print(json.dumps(results).replace(' ', '').replace('None', 'null').replace('False', 'false').replace('True', 'true'))\n",
    },
    hints: [
      "A queue is FIFO (First-In, First-Out) and a stack is LIFO (Last-In, First-Out).",
      "Use two stacks: one for `push` operations (let's call it `s1` or `inputStack`) and another for `pop`/`peek` operations (`s2` or `outputStack`).",
      "`push(x)`: Simply push `x` onto `s1`.",
      "`pop()` / `peek()`: If `s2` is empty, transfer all elements from `s1` to `s2`. This reverses their order, making the oldest element from `s1` now at the top of `s2`. Then, pop/peek from `s2`.",
      "`empty()`: The queue is empty if both `s1` and `s2` are empty.",
      "This approach gives amortized O(1) time complexity for `pop` and `peek` because each element is moved between stacks at most once.",
    ],
    editorial: {
      explanation:
        "We need to implement a FIFO queue using two LIFO stacks.\nLet's call the two stacks `s1` (for input/enqueue) and `s2` (for output/dequeue).\n\n**`push(int x)` operation:**\n- When we push an element `x` into the queue, we simply push it onto `s1`.\n- Stack `s1` will store elements in the order they are pushed, but in reverse order of how they should be dequeued if `s1` were a queue itself.\n- Time: O(1)\n\n**`pop()` and `peek()` operations (Amortized O(1)):**\nThese operations need to access the element at the front of the queue (the oldest element).\n1.  **Check `s2`:** If `s2` is not empty, the top element of `s2` is the front of the queue. For `pop()`, pop from `s2`. For `peek()`, return the top of `s2`.\n2.  **If `s2` is empty:** This means all previously processed elements are gone, or new elements are only in `s1`. We need to transfer elements from `s1` to `s2` to get them in the correct FIFO order.\n    - While `s1` is not empty, pop elements from `s1` and push them onto `s2`.\n    - After this transfer, the element that was at the bottom of `s1` (the oldest) is now at the top of `s2`.\n    - Now, `s2` holds elements in the correct FIFO order. Proceed as in step 1 (pop from `s2` for `pop()`, or peek `s2.top()` for `peek()`).\n\n    This transfer operation might seem expensive (O(N) in the worst case if N elements are in `s1`). However, each element is moved from `s1` to `s2` at most once during its lifetime in the queue. So, over a sequence of operations, the total cost of transfers is proportional to the total number of elements pushed. This leads to an **amortized time complexity of O(1)** for `pop` and `peek` operations.\n\n**`empty()` operation:**\n- The queue is empty if and only if both `s1` and `s2` are empty.\n- Time: O(1)\n\n**Space Complexity:** O(N), where N is the number of elements in the queue, as they are stored in the two stacks.",
      timeComplexity: "`push`: O(1). `pop`: Amortized O(1). `peek`: Amortized O(1). `empty`: O(1).",
      spaceComplexity: "O(N), where N is the number of elements in the queue.",
      code:
        "# Python Editorial Code\nclass MyQueue:\n    def __init__(self):\n        self.s1_in = []  # Stack for enqueue operations\n        self.s2_out = [] # Stack for dequeue operations\n\n    def push(self, x: int) -> None:\n        self.s1_in.append(x)\n\n    def _transfer_if_needed(self):\n        # If s2_out is empty, pour elements from s1_in to s2_out\n        # This reverses the order, making s2_out behave like a queue's front\n        if not self.s2_out:\n            while self.s1_in:\n                self.s2_out.append(self.s1_in.pop())\n\n    def pop(self) -> int:\n        self._transfer_if_needed()\n        # Constraints say pop will be called on non-empty queue\n        return self.s2_out.pop()\n\n    def peek(self) -> int:\n        self._transfer_if_needed()\n        # Constraints say peek will be called on non-empty queue\n        return self.s2_out[-1]\n\n    def empty(self) -> bool:\n        return not self.s1_in and not self.s2_out",
      codeLanguage: "PYTHON",
    },
    companyTag: "Microsoft, Amazon, Bloomberg, Facebook, Google, Apple",
  }
];

// To use this, you would typically do:
// const allProblems = problemSet;
// const specificProblem = problemSet[0]; // for "Two Sum"