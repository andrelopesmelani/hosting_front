import "./styles.scss";

interface YearSelectorProps {
  onSelect: (displayDate: string, valueDate: string, years: number) => void;
  selectedYear: number | null;
  label: string
}

const YearSelector = ({ onSelect, selectedYear, label }: YearSelectorProps) => {
  const handleSelect = (years: number) => {
    const today = new Date();
    const expirationDate = new Date(
      today.getFullYear() + years,
      today.getMonth(),
      today.getDate()
    );

    const valueDate = expirationDate.toISOString().split("T")[0];
    const displayDate = expirationDate.toLocaleDateString("pt-BR");

    onSelect(displayDate, valueDate, years);
  };

  return (
    <div className="year-container">
      <label>{label}</label>
      <div className="year-selector">
        {[1, 2, 3].map((year) => (
          <button
            key={year}
            className={`year-option ${selectedYear === year ? "selected" : ""}`}
            onClick={() => handleSelect(year)}
          >
            {year} ano{year > 1 ? "s" : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector;
