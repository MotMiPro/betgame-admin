import { Aview } from "../../../Presentations/UIs";
import { AdminPieCharts } from "../../../Presentations/UIs/Charts";
import React, { useEffect } from "react";

export default function GameOverview() {
  // const [dataChart, setDataChart] = useState(null);

  // const handleFetchApi = useCallback(async () => {}, []);

  useEffect(() => {
    // handleFetchApi();
  }, []);
  return (
    <div>
      <Aview title="chart pie">{<AdminPieCharts dataChart={null} />}</Aview>
    </div>
  );
}
