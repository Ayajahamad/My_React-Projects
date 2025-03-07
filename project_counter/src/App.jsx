import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [autoCount, setAutoCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const conuntUp = () => {
    /*
    React batches the first two updates:
    setCount(count + 1) → ignored (not applied, as setCount(count + 2) overwrites it)
    setCount(count + 2) → Applied: count = 2
    */
    setCount(count + 1);
    // setCount(count + 2);

    /*
    React applies the functional updates one by one:
    setCount((prevCount) => prevCount + 1) → 2 + 1 = 3
    setCount((prevCount) => prevCount + 2) → 3 + 2 = 5
    */
    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 2);
  };

  const conuntDown = () => {
    setCount(count - 1);
  };

  const countEqual = () => {
    setCount(0);
  }

  const countAutoIncrease = () => {
    stopAutoCount();
    const id = setInterval(() => {
      setAutoCount((prevCount) => prevCount + 1);
    }, 1000);
    setIntervalId(id);
  }

  const countAutoDecrease = () => {
    stopAutoCount();
    const id = setInterval(() => {
      setAutoCount((prevCount) => prevCount - 1);
    }, 1000);
    setIntervalId(id);
  }

  const stopAutoCount = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  useEffect(() => {
    return () => {
      stopAutoCount();
    }
  }, []);


  return (
      <div className="flex flex-row justify-center p-5">
        <div className="border border-gray-300 p-5 rounded-lg">
          <h1 className="text-2xl font-bold text-center">Counter</h1>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={conuntDown}
            >
              -
            </button>
            <div className="px-4 py-2 bg-gray-100 mx-2 text-gray-900">{count}</div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={conuntUp}
            >
              +
          </button>
          <button
              className="px-4 py-2 bg-blue-500 mx-2 text-white rounded"
              onClick={countEqual}
            >
              =
            </button>
          </div>  
        </div>
        {/* Counter */}
        <div className="border border-gray-300 mx-2 p-5 rounded-lg">
          <h1 className="text-2xl font-bold text-center">Auto Counter</h1>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={countAutoDecrease}
            >
              --
            </button>
            <div className="px-4 py-2 bg-gray-100 mx-2 text-gray-900">{autoCount}</div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={countAutoIncrease}
            >
              ++
          </button>
          <button
              className="px-4 py-2 bg-blue-500 mx-2 text-white rounded"
              onClick={stopAutoCount}
            >
              ==
            </button>
          </div>  
        </div>
      </div>
  );
}

export default App;
