import { useSignUpStore } from '@/store/SignupStore';

export default function NextBtn({
  label,
  className,
  disabled,
  onClick,
}: {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const name = useSignUpStore((state) => state.name);
  const email = useSignUpStore((state) => state.email);
  const password = useSignUpStore((state) => state.password);
  const wantEmail = useSignUpStore((state) => state.wantEmail);
  const residenceExperience = useSignUpStore(
    (state) => state.residenceExperience,
  );
  const interest_category = useSignUpStore((state) => state.categories);

  return (
    <>
      <button
        className={`fixed bottom-0 flex h-[88px] w-full justify-center pt-[18px] text-[#FDFDFD] ${
          className ?? ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        {label}
      </button>
    </>
  );
}
