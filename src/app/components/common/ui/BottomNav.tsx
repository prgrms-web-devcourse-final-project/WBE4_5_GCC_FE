// // // // // import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
// // // // // import Link from 'next/link';

// // // // // export default function BottomNav() {
// // // // //   return (
// // // // //     <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
// // // // //       <ul className="flex justify-between px-10 py-4">
// // // // //         <li>
// // // // //           <Link
// // // // //             href="/routine"
// // // // //             className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]"
// // // // //           >
// // // // //             <List size={32} />
// // // // //             <span className="mt-2 text-sm">루틴</span>
// // // // //           </Link>
// // // // //         </li>

// // // // //         <li>
// // // // //           <Link
// // // // //             href="/report"
// // // // //             className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]"
// // // // //           >
// // // // //             <BarChart2 size={32} />
// // // // //             <span className="mt-2 text-sm">리포트</span>
// // // // //           </Link>
// // // // //         </li>

// // // // //         <li>
// // // // //           <Link
// // // // //             href="/"
// // // // //             className="relative -mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFB84C] text-white shadow-lg hover:bg-[#FFE29A] active:bg-[#FFE29A]"
// // // // //             aria-label="홈"
// // // // //           >
// // // // //             <House size={40} />
// // // // //           </Link>
// // // // //         </li>

// // // // //         <li>
// // // // //           <Link
// // // // //             href="/shop"
// // // // //             className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]"
// // // // //           >
// // // // //             <ShoppingCart size={32} />
// // // // //             <span className="mt-2 text-sm">상점</span>
// // // // //           </Link>
// // // // //         </li>

// // // // //         <li>
// // // // //           <Link
// // // // //             href="/mypage"
// // // // //             className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]"
// // // // //           >
// // // // //             <User size={32} />
// // // // //             <span className="mt-2 text-sm">프로필</span>
// // // // //           </Link>
// // // // //         </li>
// // // // //       </ul>
// // // // //     </nav>
// // // // //   );
// // // // // }



// // // // 'use client';

// // // // import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
// // // // import Link from 'next/link';
// // // // import { usePathname } from 'next/navigation';

// // // // export default function BottomNav() {
// // // //   const pathname = usePathname();

// // // //   // 현재 경로와 비교해 활성화 여부 확인 함수
// // // //   const isActive = (path: string) => {
// // // //     if (path === '/') {
// // // //       return pathname === '/';
// // // //     }
// // // //     // 예: /report/123 이런 경우도 활성화하려면
// // // //     return pathname.startsWith(path);
// // // //   };

// // // //   return (
// // // //     <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
// // // //       <ul className="flex justify-between px-10 py-4">
// // // //         <li>
// // // //           <Link
// // // //             href="/routine"
// // // //             className={`flex flex-col items-center ${isActive('/routine') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // // //           >
// // // //             <List size={32} />
// // // //             <span className="mt-2 text-sm">루틴</span>
// // // //           </Link>
// // // //         </li>

// // // //         <li>
// // // //           <Link
// // // //             href="/report"
// // // //             className={`flex flex-col items-center ${isActive('/report') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // // //           >
// // // //             <BarChart2 size={32} />
// // // //             <span className="mt-2 text-sm">리포트</span>
// // // //           </Link>
// // // //         </li>

// // // //         <li>
// // // //           <Link
// // // //             href="/"
// // // //             aria-label="홈"
// // // //             className={`relative -mt-10 flex h-20 w-20 items-center justify-center rounded-full shadow-lg
// // // //               ${isActive('/') ? 'bg-[#FFB84C] text-white' : 'bg-gray-200 text-gray-700'}
// // // //               hover:bg-[#FFE29A] active:bg-[#FFE29A]`}
// // // //           >
// // // //             <House size={40} />
// // // //           </Link>
// // // //         </li>

// // // //         <li>
// // // //           <Link
// // // //             href="/shop"
// // // //             className={`flex flex-col items-center ${isActive('/shop') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // // //           >
// // // //             <ShoppingCart size={32} />
// // // //             <span className="mt-2 text-sm">상점</span>
// // // //           </Link>
// // // //         </li>

// // // //         <li>
// // // //           <Link
// // // //             href="/mypage"
// // // //             className={`flex flex-col items-center ${isActive('/mypage') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // // //           >
// // // //             <User size={32} />
// // // //             <span className="mt-2 text-sm">프로필</span>
// // // //           </Link>
// // // //         </li>
// // // //       </ul>
// // // //     </nav>
// // // //   );
// // // // }



// // // 'use client';

// // // import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';

// // // export default function BottomNav() {
// // //   const pathname = usePathname();

// // //   const isActive = (path: string) => {
// // //     if (path === '/') {
// // //       return pathname === '/';
// // //     }
// // //     return pathname.startsWith(path);
// // //   };

// // //   return (
// // //     <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
// // //       <ul className="flex justify-between px-10 py-4">
// // //         <li>
// // //           <Link
// // //             href="/routine"
// // //             className={`flex flex-col items-center ${isActive('/routine') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // //           >
// // //             <List size={32} />
// // //             <span className="mt-2 text-sm">루틴</span>
// // //           </Link>
// // //         </li>

// // //         <li>
// // //           <Link
// // //             href="/report"
// // //             className={`flex flex-col items-center ${isActive('/report') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // //           >
// // //             <BarChart2 size={32} />
// // //             <span className="mt-2 text-sm">리포트</span>
// // //           </Link>
// // //         </li>

// // //         <li>
// // //           <Link
// // //             href="/"
// // //             aria-label="홈"
// // //             className={`relative -mt-10 flex h-22 w-22 items-center justify-center rounded-full shadow-lg
// // //               ${isActive('/')
// // //                 ? 'bg-[#FFB84C] text-white border-none'
// // //                 : 'border-2 bg-[#fff] border-[#FFB84C] text-[#FFB84C]'
// // //               }
// // //               hover:bg-[#FFE29A] active:bg-[#FFE29A]`}
// // //           >
// // //             <House size={40} />
// // //           </Link>
// // //         </li>

// // //         <li>
// // //           <Link
// // //             href="/shop"
// // //             className={`flex flex-col items-center ${isActive('/shop') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // //           >
// // //             <ShoppingCart size={32} />
// // //             <span className="mt-2 text-sm">상점</span>
// // //           </Link>
// // //         </li>

// // //         <li>
// // //           <Link
// // //             href="/mypage"
// // //             className={`flex flex-col items-center ${isActive('/mypage') ? 'text-[#FFB84C]' : 'text-[#222222]'
// // //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// // //           >
// // //             <User size={32} />
// // //             <span className="mt-2 text-sm">프로필</span>
// // //           </Link>
// // //         </li>
// // //       </ul>
// // //     </nav>
// // //   );
// // // }

// // 'use client';

// // import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';

// // export default function BottomNav() {
// //   const pathname = usePathname();

// //   const isActive = (path: string) => {
// //     if (path === '/') {
// //       return pathname === '/';
// //     }
// //     return pathname.startsWith(path);
// //   };

// //   return (
// //     <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
// //       <ul className="flex justify-between px-10 py-4">
// //         <li>
// //           <Link
// //             href="/routine"
// //             className={`flex flex-col items-center ${isActive('/routine') ? 'text-[#FFB84C]' : 'text-[#222222]'
// //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// //           >
// //             <List size={32} />
// //             <span className="mt-2 text-sm">루틴</span>
// //           </Link>
// //         </li>

// //         <li>
// //           <Link
// //             href="/report"
// //             className={`flex flex-col items-center ${isActive('/report') ? 'text-[#FFB84C]' : 'text-[#222222]'
// //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// //           >
// //             <BarChart2 size={32} />
// //             <span className="mt-2 text-sm">리포트</span>
// //           </Link>
// //         </li>

// //         <li>
// //           <Link
// //             href="/"
// //             aria-label="홈"
// //             className={`relative -mt-10 flex h-20 w-20 items-center justify-center rounded-full shadow-lg
// //               ${isActive('/')
// //                 ? 'bg-[#FFB84C] text-white border-none'
// //                 : 'bg-white border-2 border-[#FFB84C] text-[#FFB84C]'
// //               }
// //               hover:bg-[#FFE29A] active:bg-[#FFE29A]`}
// //           >
// //             <House size={40} />
// //           </Link>
// //         </li>

// //         <li>
// //           <Link
// //             href="/shop"
// //             className={`flex flex-col items-center ${isActive('/shop') ? 'text-[#FFB84C]' : 'text-[#222222]'
// //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// //           >
// //             <ShoppingCart size={32} />
// //             <span className="mt-2 text-sm">상점</span>
// //           </Link>
// //         </li>

// //         <li>
// //           <Link
// //             href="/mypage"
// //             className={`flex flex-col items-center ${isActive('/mypage') ? 'text-[#FFB84C]' : 'text-[#222222]'
// //               } hover:text-[#FFB84C] active:text-[#FFB84C]`}
// //           >
// //             <User size={32} />
// //             <span className="mt-2 text-sm">프로필</span>
// //           </Link>
// //         </li>
// //       </ul>
// //     </nav>
// //   );
// // }
// 'use client';

// import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function BottomNav() {
//   const pathname = usePathname();

//   const isActive = (path: string) => {
//     if (path === '/') {
//       return pathname === '/';
//     }
//     return pathname.startsWith(path);
//   };

//   return (
//     <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
//       <ul className="flex justify-between px-10 py-4">
//         <li>
//           <Link
//             href="/routine"
//             className={`flex flex-col items-center ${isActive('/routine') ? 'text-[#FFB84C]' : 'text-[#222222]'
//               }`}
//           >
//             <List size={32} />
//             <span className="mt-2 text-sm">루틴</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/report"
//             className={`flex flex-col items-center ${isActive('/report') ? 'text-[#FFB84C]' : 'text-[#222222]'
//               }`}
//           >
//             <BarChart2 size={32} />
//             <span className="mt-2 text-sm">리포트</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/"
//             aria-label="홈"
//             className={`relative -mt-10 flex h-22 w-2 items-center justify-center rounded-full shadow-lg
//               ${isActive('/')
//                 ? 'bg-[#FFB84C] text-white border-none'
//                 : 'bg-white border-2 border-[#FFB84C] text-[#FFB84C]'
//               }`}
//           >
//             <House size={40} />
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/shop"
//             className={`flex flex-col items-center ${isActive('/shop') ? 'text-[#FFB84C]' : 'text-[#222222]'
//               }`}
//           >
//             <ShoppingCart size={32} />
//             <span className="mt-2 text-sm">상점</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/mypage"
//             className={`flex flex-col items-center ${isActive('/mypage') ? 'text-[#FFB84C]' : 'text-[#222222]'
//               }`}
//           >
//             <User size={32} />
//             <span className="mt-2 text-sm">프로필</span>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }




'use client';

import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 w-[614px] border-t border-[#e0e0e0] bg-white shadow-md">
      <ul className="flex justify-between px-10 py-4">
        <li>
          <Link
            href="/routine"
            className={`flex flex-col items-center ${isActive('/routine') ? 'text-[#FFB84C]' : 'text-[#222222]'
              }`}
          >
            <List size={32} />
            <span className="mt-2 text-sm">루틴</span>
          </Link>
        </li>

        <li>
          <Link
            href="/report"
            className={`flex flex-col items-center ${isActive('/report') ? 'text-[#FFB84C]' : 'text-[#222222]'
              }`}
          >
            <BarChart2 size={32} />
            <span className="mt-2 text-sm">리포트</span>
          </Link>
        </li>

        <li>
          <Link
            href="/"
            aria-label="홈"
            className="relative -mt-10 flex h-22 w-22 items-center justify-center rounded-full bg-[#FFB84C] text-white shadow-lg"
          >
            <House size={40} />
          </Link>
        </li>

        <li>
          <Link
            href="/shop"
            className={`flex flex-col items-center ${isActive('/shop') ? 'text-[#FFB84C]' : 'text-[#222222]'
              }`}
          >
            <ShoppingCart size={32} />
            <span className="mt-2 text-sm">상점</span>
          </Link>
        </li>

        <li>
          <Link
            href="/mypage"
            className={`flex flex-col items-center ${isActive('/mypage') ? 'text-[#FFB84C]' : 'text-[#222222]'
              }`}
          >
            <User size={32} />
            <span className="mt-2 text-sm">프로필</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
