import { DotLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
  loading?: boolean;
}

export default function LoadingSpinner({
  color = '#FFB84C',
  size = 48,
  loading = true,
}: LoadingSpinnerProps) {
  return <DotLoader color={color} size={size} loading={loading} />;
}