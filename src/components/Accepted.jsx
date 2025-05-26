import { Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";


const Accepted = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const acceptedData = [
    { lang: "C++", date: "May 25, 2025 at 02:42 PM" },
    { lang: "JavaScript", date: "May 25, 2025 at 03:00 PM" },
    { lang: "Python", date: "May 25, 2025 at 03:30 PM" },
    { lang: "Java", date: "May 25, 2025 at 04:00 PM" },
    { lang: "C++", date: "May 25, 2025 at 04:30 PM" },
    { lang: "Python", date: "May 25, 2025 at 05:00 PM" },
  ];
  const codeSamples = {
    js: `const nums = [1, 2, 3];\nconst ans = [...nums, ...nums];\nconsole.log(ans);`,
    cpp: `#include<iostream>\nusing namespace std;\nint main() {\n  vector<int> nums = {1, 2, 3};\n  nums.insert(nums.end(), nums.begin(), nums.end());\n  for(int x : nums) cout << x << " ";\n}`,
    java: `import java.util.*;\nclass Main {\n  public static void main(String[] args) {\n    int[] nums = {1, 2, 3};\n    int[] ans = new int[nums.length * 2];\n    for (int i = 0; i < nums.length; i++) {\n      ans[i] = nums[i];\n      ans[i + nums.length] = nums[i];\n    }\n    System.out.println(Arrays.toString(ans));\n  }\n}`,
    python: `nums = [1, 2, 3]\nans = nums + nums\nprint(ans)`,
  };

  const handleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // toggle off
    } else {
      setOpenIndex(index);
    }
  };


  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState("js");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSamples[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        {acceptedData.map((item, index) => (
          <div key={index}>
            <div
              className="bg-[#212326] flex justify-between p-3 rounded-lg hover:bg-[#2f3136] cursor-pointer"
              onClick={() => handleOpen(index)}
            >
              <h4 className="font-bold text-green-500">Accepted</h4>
              <div className="flex gap-8 text-white">
                <span>{item.lang}</span>
                <span>{item.date}</span>
              </div>
            </div>

            {openIndex === index && (
              <div className="mt-2 border-l-4 border-green-500 p-4 bg-[#1e1f22] rounded">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accepted;
