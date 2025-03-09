import { useMemo, useState } from "react";
import "./HeaderPanel.css";
import { Genre } from "../../types/types";

export type HeaderPanelProps  = {
  onSearch: (query: string) => void;
  onYearChange: (year: string) => void;
  onGenreChange: (genre: string) => void;
  years: number[];
  genres: Genre;
}


const HeaderPanel: React.FC<HeaderPanelProps> = ({ onSearch, onYearChange, onGenreChange, years, genres }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const uniqueYears = useMemo(() => [...new Set(years)].sort((a, b) => b - a), [years]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    onYearChange(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
    onGenreChange(e.target.value);
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
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Select Genre</option>
        {Object.entries(genres).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderPanel;
