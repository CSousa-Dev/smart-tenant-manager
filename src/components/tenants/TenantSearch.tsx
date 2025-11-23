import SearchInput from '@/components/shared/SearchInput';
import './TenantSearch.css';

interface TenantSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

const TenantSearch = ({ value, onChange, resultCount }: TenantSearchProps) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="tenant-search">
      <SearchInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClear={handleClear}
      />
      {resultCount !== undefined && (
        <span className="tenant-search-count">
          {resultCount} {resultCount === 1 ? 'tenant encontrado' : 'tenants encontrados'}
        </span>
      )}
    </div>
  );
};

export default TenantSearch;

