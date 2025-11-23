import { InputHTMLAttributes } from 'react';
import './SearchInput.css';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
}

const SearchInput = ({ onClear, className = '', ...props }: SearchInputProps) => {
  return (
    <div className={`search-input-container ${className}`}>
      <input
        type="search"
        className="search-input"
        placeholder="Buscar por nome..."
        {...props}
      />
      {props.value && onClear && (
        <button className="search-input-clear" onClick={onClear} type="button">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;

