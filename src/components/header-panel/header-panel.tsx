import { useMemo, useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, OutlinedInput, SelectChangeEvent } from "@mui/material";
import "./HeaderPanel.css";
import { Genre } from "../../types/types";

const MenuProps = {
  PaperProps: {
    style: {
      width: 300,
    },
  },
};

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
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const genreOptions = useMemo(
    () => Object.entries(genres).map(([id, name]) => ({ value: Number(id), label: name })),
    [genres]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    onSearch(query);
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    const year = event.target.value;
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleGenreChange = (event: SelectChangeEvent<number[]>) => {
    const { target: { value } } = event;
    const selectedValues = typeof value === "string" ? value.split(",").map(Number) : value;
    setSelectedGenres(selectedValues);
    onGenreChange(selectedValues);
  };

  return (
    <div>
      <div className="center-flex">
        <h3>Video Browser</h3>
      </div>
      <div className="center-flex" style={{ gap: '12px' }}>
        <TextField
          label="Search by title or artist"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
        />

        <FormControl sx={{ width: 300 }}>
          <InputLabel>Select Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange} label="Select Year">
            <MenuItem value="">None</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 300 }}>
          <InputLabel>Select Genres</InputLabel>
          <Select
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Select Genres" />}
            MenuProps={MenuProps}
          >
            {genreOptions.map((genre) => (
              <MenuItem key={genre.value} value={genre.value}>
                {genre.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default HeaderPanel;
