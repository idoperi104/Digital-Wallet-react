import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

export function Chart({ title = "", data }) {
  return (
    <section className="chart">
      <h2>{title}</h2>
      <Sparklines data={data}>
        <SparklinesLine color="#e1e16c" />
      </Sparklines>
    </section>
  );
}
