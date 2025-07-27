'use client';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const dummyData = [
  { name: '월', uv: 100, pv: 40, xyz: 280, abc: 10 },
  { name: '화', uv: 130, pv: 50, xyz: 260, abc: 30 },
  { name: '수', uv: 160, pv: 70, xyz: 250, abc: 25 },
  { name: '목', uv: 200, pv: 55, xyz: 240, abc: 30 },
  { name: '금', uv: 250, pv: 80, xyz: 180, abc: 20 },
  { name: '토', uv: 290, pv: 70, xyz: 140, abc: 15 },
  { name: '일', uv: 320, pv: 100, xyz: 110, abc: 15 },
];

interface LineLabels {
  uv?: string;
  pv?: string;
  xyz?: string;
  abc?: string;
}

interface UserLineChartProps {
  labels?: LineLabels;
}

export default function UserLineChart({
  labels = {
    uv: '라벨1',
    pv: '라벨2',
    xyz: '라벨3',
    abc: '라벨4',
  },
}: UserLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={dummyData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fontSize: '8px' }} />
        <YAxis style={{ fontSize: '8px' }} width={20} />
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="left"
          iconSize={6}
          height={36}
          iconType="circle"
          wrapperStyle={{
            fontSize: '10px',
          }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#3366FF"
          name={labels.uv}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#FFCC00"
          name={labels.pv}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="xyz"
          stroke="#28A745"
          name={labels.xyz}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="abc"
          stroke="#FF5722"
          name={labels.abc}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
