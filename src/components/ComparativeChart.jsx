

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ComparativeChart = ({ data }) => {
  return (
    <div className="w-full h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 40, right: 20, left: 0, bottom: 20 }}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* hide long bottom labels */}
          <XAxis dataKey="name" hide />

          <YAxis />

          <Tooltip />

          <Legend verticalAlign="top" height={36} />

          {/* THIS BATCH */}
          <Bar
            dataKey="thisBatch"
            name="This Batch"
            fill="#16a34a"
            barSize={40}
            radius={[6, 6, 0, 0]}
          >
            {/* value inside bar */}
            <LabelList
              dataKey="thisBatch"
              position="insideTop"
              fill="#fff"
              fontSize={12}
            />

            {/* metric name above bar */}
            <LabelList
              dataKey="name"
              position="top"
              fontSize={12}
              fill="#333"
            />
          </Bar>

          {/* MARKET */}
          <Bar
            dataKey="marketAvg"
            name="Market Avg"
            fill="#f59e0b"
            barSize={40}
            radius={[6, 6, 0, 0]}
          >
            <LabelList
              dataKey="marketAvg"
              position="insideTop"
              fill="#fff"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparativeChart;


