// import { useQuery } from '@tanstack/react-query';
// import { Badge } from '../../../types/general';
// import { getBadges } from '../badges';

//   // 업적 목록 조회
//   const { data: badgesData, isLoading } = useQuery<
//     { badges: Badge[]; totalPages: number },
//     Error,
//     { badges: Badge[]; totalPages: number },
//     [string, number]
//   >({
//     queryKey: ['user-badges', page],
//     queryFn: () => getBadges(page, size),
//     staleTime: 5 * 60 * 1000,
//     placeholderData: (prev) => prev, // 이전 데이터를 잠시 유지
//   });
