import React, { useEffect, useState } from 'react';

const BitcoinPrice: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<string | null>(null);

  const updateBitcoinPrice = async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      const data = await response.json();
      const price = data.bitcoin.usd;
      setBtcPrice(price.toLocaleString());
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
    }
  };

  useEffect(() => {
    updateBitcoinPrice();
    const intervalId = setInterval(updateBitcoinPrice, 2400000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="btc-price">
      <img src="./icons/Bitcoin.png" alt="Bitcoin" id="btc-icon" />
      <span id="btc-value">{btcPrice ? `${btcPrice} $` : "Loading..."}</span>
    </div>
  );
};

export default BitcoinPrice;
