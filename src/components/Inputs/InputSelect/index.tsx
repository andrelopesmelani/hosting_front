import "./styles.scss";

interface IInputSelectProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const InputSelect = ({
  label,
  options,
  value,
  onChange,
}: IInputSelectProps) => {
  return (
    <div className="select-container">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          Select a option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
