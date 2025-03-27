import { Select, 
         SelectContent, 
         SelectItem, 
         SelectTrigger,
        SelectValue } from "@/components/ui/select";

interface Props {
  label?: string;
  items: string[];
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const SelectComponent: React.FC<Props> = ({label, items, placeholder = items[0], value, onValueChange, className, disabled = false }) => {

  return (
    <div className={`flex flex-row w-full items-center gap-2 ${className}`}>
      {label && <p className="text-foreground/80">{label}</p>}
      <Select value={value || ''} onValueChange={(selectedValue) => onValueChange(selectedValue || '')} disabled={disabled}>
        <SelectTrigger className= "focus:border-transparent transition-shadow duration-300 ease-in-out" >
          <SelectValue placeholder={placeholder} /> 
        </SelectTrigger>
        <SelectContent> 
          {items.map((item) => ( // Mapping over the items array to create select items
            <SelectItem className={`${className}`} key={item} value={item}> 
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;