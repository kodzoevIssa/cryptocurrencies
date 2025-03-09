import { useEffect, useState } from "react";
import axios from "axios";
import "./CryptoList.css";

const API_URL = "http://127.0.0.1:8000/cryptocurrencies";

const CryptoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="loading">Загрузка...</p>;
    if (error) return <p className="loading">Сервер не работает</p>;

  return (
    <div>
      <div>
        <ul className="cryptoList">
          {data.map((crypto) => {
            return (
              <li key={crypto.id} className="cryptoCard">
                <strong>{crypto.name}</strong> ({crypto.symbol}) - $
                {crypto.quote.USD.price.toFixed(2)}
                <img
                  className="cryptoImg"
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CryptoList;
