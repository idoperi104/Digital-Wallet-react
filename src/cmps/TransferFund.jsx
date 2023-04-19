import React from "react";
import { useState } from "react";

export function TransferFund({ contact, maxCoins, onTransferCoins }) {
  const [amount, setAmount] = useState(0);

  function onSetAmount({ target }) {
    setAmount(target.value);
  }
  return (
    <section className="transfer-fund">
      <h3>How much?</h3>
      <input onChange={onSetAmount} type="number" name="amount" id="amount" />
      <button
        className="btn-transfer"
        type="submit"
        onClick={() => onTransferCoins(amount, contact)}
      >
        Transfer
      </button>
    </section>
  );
}
