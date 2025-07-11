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
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-[16px] w-[16px] accent-[#222222]"
          onChange={onChange}
          checked={checked}
        />
        {label && <span>{label}</span>}
      </label>
    </>
  );
}
