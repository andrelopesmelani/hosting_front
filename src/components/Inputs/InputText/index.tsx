import "./styles.scss";

interface IInputProps {
  label: string;
  value: string | string[];
  type?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: () => void
}

const Input = ({
  label,
  value,
  type = "text",
  error,
  placeholder,
  disabled,
  onKeyDown,
  onChange,
}: IInputProps) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        className="custom-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        style={{ borderColor: error && "red" }}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
