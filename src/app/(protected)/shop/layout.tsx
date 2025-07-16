import ShopHeader from '@/app/components/shop/ShopHeader';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*<ShopHeader points={points} />*/}
      {children}
    </>
  );
}
