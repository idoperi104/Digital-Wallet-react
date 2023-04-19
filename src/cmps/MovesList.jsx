import React from "react";

export function MovesList({ title, moves }) {
  console.log("moves", moves);
  return (
    <section className="move-list">
      <h2>{title}</h2>
      {moves.map((move, idx) => {
        return (
          <div className="move-preview" key={idx}>
            <p>
              <span>At:</span> {new Date(move.at).toLocaleString()}
            </p>
            <p>
              <span>Amount:</span> {move.amount}$
            </p>
            <p>
              <span>Transferd to:</span> {move.to}
            </p>
          </div>
        );
      })}
    </section>
  );
}
