import ShopHeader from '@/app/components/shop/ShopHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShopHeader />
      {children}
    </>
  );
}
