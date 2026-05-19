interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex justify-center mb-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for the perfect gift..."
        className="w-full max-w-md px-6 py-4 text-base border-2 border-[var(--primary-light)] rounded-full bg-white text-[var(--charcoal)] outline-none shadow-sm transition-all duration-300 focus:shadow-lg focus:-translate-y-0.5 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-light)]"
      />
    </div>
  );
};

export default SearchBar;
