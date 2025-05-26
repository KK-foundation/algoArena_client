import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSamples = {
  js: `const nums = [1, 2, 3];\nconst ans = [...nums, ...nums];\nconsole.log(ans);`,
  cpp: `#include<iostream>\nusing namespace std;\nint main() {\n  vector<int> nums = {1, 2, 3};\n  nums.insert(nums.end(), nums.begin(), nums.end());\n  for(int x : nums) cout << x << " ";\n}`,
  java: `import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    int[] nums = {1, 2, 3};\n    int[] ans = new int[nums.length * 2];\n    for (int i = 0; i < nums.length; i++) {\n      ans[i] = nums[i];\n      ans[i + nums.length] = nums[i];\n    }\n    System.out.println(Arrays.toString(ans));\n  }\n}`,
  python: `nums = [1, 2, 3]\nans = nums + nums\nprint(ans)`,
};

const Code = () => {
  const [selected, setSelected] = useState("js");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSamples[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="w-full mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Header Tabs */}
      <div className="">
        {["js", "cpp", "java", "python"].map((lang) => (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className={`px-4 py-2 font-medium capitalize cursor-pointer ${
              selected === lang ? "border-b-2" : ""
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="relative group bg-[#212326] text-white text-sm overflow-x-auto">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 hidden group-hover:block bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
        >
          {copied ? "Copied!" : <Copy size={16} />}
        </button>

        <SyntaxHighlighter
          language={selected}
          style={oneDark}
          customStyle={{ margin: 0, padding: "1rem" }}
        >
          {codeSamples[selected]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;
