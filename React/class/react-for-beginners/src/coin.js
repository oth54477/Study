import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [select, setSelect] = useState(0);
  const [amount, setAmount] = useState(0);
  const [inverted, setInverted] = useState(false);
  const onSelect = (event) => {
    setSelect(event.target.value);
  };
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const onClick = () => {
    setInverted((current) => !current);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <br />
      <br />
      <div>
        <label htmlFor="USD">USD</label>
        <input
          onChange={onChange}
          id="USD"
          value={amount}
          type="number"
          placeholder="USD"
          disabled={inverted}
        />
        <br />
        <label htmlFor="coin">COIN</label>
        <input id="coin" type="number" placeholder="USD" disabled={!inverted} />
      </div>
      <button onClick={onClick}>Flip</button>
    </div>
  );
}

export default App;
