import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [uuid, setUuid] = useState("");

  const uuidRef = useRef(null);

  //function to generate uuid

  const uuidGenrator = useCallback(() => {
    const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    setUuid(newUuid);
  }, [setUuid]);

  const copyUuidToClipBoared = useCallback(() => {
    uuidRef.current?.select();
    window.navigator.clipboard.writeText(uuid);
  }, [uuid]);

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, [uuid]);

  useEffect(() => {
    uuidGenrator();
  }, [uuidGenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500 bg-blue-300">
        <h1 className="text-white text-center my-3 text-3xl font-bold">
          UUID Generator
        </h1>
        <div className=" flex flex-shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={uuid}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={uuidRef}
          />
          <button
            onClick={copyUuidToClipBoared}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
      </div>
      <div className="text-gray-500 cursor-pointer" onClick={refreshPage}>
        Please <span className="text-blue-400">Refresh</span> for new UUID{" "}
      </div>
      <div className="my-10">
        <p className="text-white">
          UUID Version 4 is one of the most commonly used types of UUIDs. It is
          a random-based identifier that relies heavily on randomness to ensure
          its uniqueness
        </p>
        <h2 className="my-8 text-white font-medium text-2xl">
          Why UUID Version 4 is Unique?
        </h2>
        <div className="text-white">
          <ul>
            <h3 className="font-medium">Randomness</h3>
            <p>
              The uniqueness of a UUID depends on the randomness of the 122
              bits. Even though randomness can lead to duplicates in theory, the
              odds are astronomically low.
            </p>
          </ul>
          <ul className="my-7">
            <h3 className="font-medium">Probability of Collision</h3>
            <p>
            For a system generating 1 billion UUIDs per second for 100 years, the probability of generating a duplicate is negligible.
            </p>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
