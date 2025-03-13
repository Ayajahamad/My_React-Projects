import { useEffect, useState } from "react";

function App() {
  const [currencyInfo, setCurrencyInfo] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(""); 
  const [toCurrency, setToCurrency] = useState(""); 
  const [amount, setAmount] = useState("");
  const [changeInfo, setChangeInfo] = useState(null);

  const api = `http://127.0.0.1:5000/currencies`;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyInfo(data.Available_Currencies || []);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/exchange/${fromCurrency}/${toCurrency}/${parseFloat(amount)}`)
      .then((res) => res.json())
      .then((data) => {
        setChangeInfo(data);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-6 overflow-hidden">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg h-[90vh] overflow-hidden">
        
        <div className="w-1/2 hidden md:flex items-center justify-center bg-blue-500 p-6">
          <div className="w-72 h-72 flex items-center justify-center">
            <img 
              src="https://picsum.photos/200/300" 
              alt="Currency Exchange" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
              Currency Converter
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">From Currency:</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select from</option>
                  {currencyInfo.map((currency) => (
                    <option value={currency} key={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">To Currency:</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select to</option>
                  {currencyInfo.map((currency) => (
                    <option value={currency} key={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Enter amount in ${fromCurrency}`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Convert
              </button>
            </form>
          </div>

          {/* Show Currencies BEFORE Submit | Show Result AFTER Submit */}
          <div className="mt-4 h-40 overflow-y-auto border border-gray-300 rounded-md">
            {!changeInfo ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-1 text-left">Available Currencies</th>
                  </tr>
                </thead>
                <tbody>
                  {currencyInfo.map((currency, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="border border-gray-300 p-1">{currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1 font-semibold">Base Currency</td>
                    <td className="border border-gray-300 p-1">{changeInfo.Base_Currency}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1 font-semibold">Target Currency</td>
                    <td className="border border-gray-300 p-1">{changeInfo.Target_Currency}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1 font-semibold">Conversion Rate</td>
                    <td className="border border-gray-300 p-1">{changeInfo.Conversion_Rate}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1 font-semibold">Amount to Convert</td>
                    <td className="border border-gray-300 p-1">{changeInfo.Amount_to_Convert}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1 font-bold">Converted Amount</td>
                    <td className="border border-gray-300 p-1 font-bold text-green-600">
                      {changeInfo.Converted_Amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
