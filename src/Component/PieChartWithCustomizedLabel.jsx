import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const PieChartWithCustomizedLabel = ({ data, sizing }) => {
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
};

export default PieChartWithCustomizedLabel;
