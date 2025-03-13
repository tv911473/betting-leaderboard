import type { ChangeEvent } from "react";

interface FilterDropdownProps {
  countries: string[];
  selectCountry: string | undefined;
  countryChange: (country: string | undefined) => void;
}

export function Filter({
  countries,
  selectCountry,
  countryChange,
}: FilterDropdownProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    countryChange(e.target.value === "" ? undefined : e.target.value);
  };

  return (
    <div className="filter" style={{ marginBottom: "20px" }}>
      <label htmlFor="dropDown" style={{ marginRight: "10px" }}>
        Filter by country
      </label>
      <select id="dropDown" value={selectCountry || ""} onChange={handleChange}>
        <option value="">All</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
