import React from "react";

const Accepted = ({ submitResult }) => {
  let memoryArray;
  let timeArray;

  if (submitResult) {
    console.log("he")
    memoryArray =
      submitResult &&
      JSON.parse(submitResult.memory)?.map((m) =>
        parseInt(m.replace(" KB", ""))
      );
    timeArray =
      submitResult &&
      JSON.parse(submitResult.time)?.map((t) => parseFloat(t.replace(" s", "")));
  }
  const avgMemory = memoryArray?.reduce((a, b) => a + b, 0) / memoryArray?.length;
  const avgTime = timeArray?.reduce((a, b) => a + b, 0) / timeArray?.length;

  return (
    <div className="p-4">
      <h1
        className={`text-2xl font-bold ${
          submitResult.status === "Accepted" ? "text-green-500" : "text-red-500"
        } `}
      >
        {submitResult.status}
      </h1>
      <br />
      <div>
        {submitResult.compileOutput ? (
          <div>
            <p>{submitResult.compileOutput}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col bg-[#13181c] p-4 rounded-lg">
              <h3 className=" font-bold">Total Passed :</h3>
              {/* <br /> */}
              <p className="mt-2">
                {submitResult.testCases.reduce(
                  (acc, curr) => (curr.passed ? acc + 1 : acc),
                  0
                )}
                /{submitResult.testCases.length}
              </p>
            </div>

            {submitResult.time && (
              <div className="flex flex-col bg-[#13181c] p-4 rounded-lg">
                <h3 className=" font-bold">Time taken :</h3>
                {/* <br /> */}
                <p className="mt-2">{avgTime} s</p>
              </div>
            )}
            {submitResult.memory && (
              <div className="flex flex-col bg-[#13181c] p-4 rounded-lg">
                <h3 className=" font-bold">Memory :</h3>
                {/* <br /> */}
                <p className="mt-2">{avgMemory.toFixed(2)} KB</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accepted;
