import { useEffect, useState } from "react";

export default function useCurrencyInfo() {
    const [currencyInfo, setCurrencyInfo] = useState(null);
    const api = `http://127.0.0.1:5000/currencies`;
    
    useEffect(() => {
        fetch(api)
        .then((res) => res.json())
        .then((data) => setCurrencyInfo(data));
    }, [currency]);
    
    console.log(currencyInfo);
    return currencyInfo;
}