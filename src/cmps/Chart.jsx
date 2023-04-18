import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

export function Chart({ data }) {
  return (
    
    <Sparklines data={data} >
      <SparklinesLine color="red"/>
    </Sparklines>
  );
}
