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
import Button from '../../common/ui/Button';
import { useState } from 'react';
import DatePicker from './Calendar/DatePicker';
import { CalendarDays } from 'lucide-react';

const reasonsData = [
  {
    name: '2월',
    lazy: 200,
    difficult: 100,
    similarApp: 50,
    noMotivation: 80,
    noExpect: 30,
    wrongRoutine: 10,
  },
  {
    name: '3월',
    lazy: 250,
    difficult: 110,
    similarApp: 60,
    noMotivation: 90,
    noExpect: 50,
    wrongRoutine: 20,
  },
];

const lineConfig = [
  { key: 'lazy', color: '#3366FF', label: '기록하는 게 귀찮아요' },
  { key: 'difficult', color: '#FFA500', label: '앱이 어렵거나 불편했어요' },
  {
    key: 'similarApp',
    color: '#FFD700',
    label: '이미 비슷한 앱을 쓰고 있어요',
  },
  { key: 'wrongRoutine', color: '#FF00FF', label: '루틴이 잘 안 맞았어요' },
  { key: 'noExpect', color: '#FF4500', label: '기대했던 기능이 없어요' },
  {
    key: 'noMotivation',
    color: '#32CD32',
    label: '혼자 하니까 동기부여가 안 됐어요',
  },
];

export default function MultiLineChart({
  setErrors,
  setShowAlert,
}: {
  setErrors: (errors: string) => void;
  setShowAlert: (show: boolean) => void;
}) {
  const [selectedPreDate, setSelectedPreDate] = useState(new Date());
  const [selectedNextDate, setSelectedNextDate] = useState(new Date());

  const handleClick = () => {
    if (selectedPreDate > selectedNextDate) {
      setErrors('시작 날짜는 종료 날짜보다 이전이어야 합니다.');
      setShowAlert(true);
      return;
    }
  };
  return (
    <>
      <div>
        <span className="text-sm font-semibold">기간 선택</span>
        <div className="mt-1.5 mb-5 flex items-center justify-center space-x-[15px]">
          <div className="flex h-[30px] w-[122px] items-center justify-between rounded-[3px] border border-[#E0E0E0] p-2">
            <div className="">
              <DatePicker
                selectedDate={selectedPreDate}
                setSelectedDate={setSelectedPreDate}
                wrapperClassName="right-[-200px]"
              />
            </div>
            <CalendarDays className="ml-auto h-3 w-3 cursor-pointer" />
          </div>
          <hr className="w-1.5 border" />
          <div className="flex h-[30px] w-[122px] items-center justify-between rounded-[3px] border border-[#E0E0E0] p-2">
            <div className="">
              <DatePicker
                selectedDate={selectedNextDate}
                setSelectedDate={setSelectedNextDate}
                wrapperClassName="right-[-35px]"
              />
            </div>
            <CalendarDays className="ml-auto h-3 w-3" />
          </div>
          <Button
            className="h-[30px] w-[59px] rounded-[3px] text-xs"
            onClick={handleClick}
          >
            조회
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <LineChart data={reasonsData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis style={{ fontSize: '8px' }} />
          <YAxis style={{ fontSize: '8px' }} width={20} />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={6}
            height={36}
            wrapperStyle={{
              fontSize: '10px',
              color: '#000',
            }}
          />
          {lineConfig.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              name={line.label}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
