export default function CheckBox({
  label,
  onChange,
  checked,
}: {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}) {
  return (
    <>
      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="accent-[#222222] w-[16px] h-[16px]"
          onChange={onChange}
          checked={checked}
        />
        {label && <span>{label}</span>}
      </label>
    </>
  );
}
