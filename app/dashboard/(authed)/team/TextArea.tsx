export default function TextArea({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  helpText,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2"
      >
        {label}
        {required && <span className="text-[#E02020] ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#1A1A1A] text-sm font-sans placeholder:text-[#888] outline-none focus:border-[#E02020]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(224,32,32,0.08)] transition-all duration-200 resize-y"
      />
      {helpText && (
        <p className="text-xs text-[#888] font-sans mt-1.5">{helpText}</p>
      )}
    </div>
  );
}
