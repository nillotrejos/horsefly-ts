interface ItemProps {
  code: string | number | readonly string[] | undefined;
  id: number | string;
  name: string;
}

interface SelectDropDownProps {
  captionKey?: any ;
  className?: string;
  items?: any;
  handler: (value: string) => void;
  disable?: boolean;
  selected?: string;
  title?:string
  extra?:string
}

const SelectDropDown = ({
  captionKey,
  handler,
  className,
  items,
  disable,
  selected,
  extra
}: SelectDropDownProps) => {
  return (
    <select
      className={className}
      disabled={disable}
      onChange={(e) => handler(e.target.value)}
      value={selected}
    >
     
      {items.map((item: ItemProps) => (
   
        <option  key={item?.name} value={item?.code}>
          {item?.name } {extra? extra:null}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
