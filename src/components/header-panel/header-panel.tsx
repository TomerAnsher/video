import { useMemo, useState } from "react";
import Select, { MultiValue } from "react-select";
import "./HeaderPanel.css";
import { Genre } from "../../types/types";

export type HeaderPanelProps = {
  onSearch: (query: string) => void;
  onYearChange: (year: string) => void;
  onGenreChange: (genres: number[]) => void;
  years: number[];
  genres: Genre;
};

const HeaderPanel: React.FC<HeaderPanelProps> = ({ onSearch, onYearChange, onGenreChange, years, genres }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<{ label: string; value: number }[]>([]);

  const genreOptions = useMemo(
    () => Object.entries(genres).map(([id, name]) => ({ value: Number(id), label: name })),
    [genres]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleGenreChange = (newValue: MultiValue<{ label: string; value: number }>) => {
    const selectedArray = [...newValue]; 
    setSelectedGenres(selectedArray);
    onGenreChange(selectedArray.map((genre) => genre.value));
  };

  return (
    <div className="header-panel">
      <h2>Video Browser</h2>

      <input
        type="text"
        placeholder="Search by title or artist..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <Select
        isMulti
        options={genreOptions}
        value={selectedGenres}
        onChange={handleGenreChange}
        placeholder="Select Genres..."
        className="multi-select"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "40px",
            maxHeight: "40px",
            overflow: "hidden",
          }),
          valueContainer: (base) => ({
            ...base,
            maxHeight: "40px",
            overflowY: "auto",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default HeaderPanel;
