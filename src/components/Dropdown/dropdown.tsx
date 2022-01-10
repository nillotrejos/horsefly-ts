interface ItemProps {
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
}

const SelectDropDown = ({
  captionKey,
  handler,
  className,
  items,
  disable,
  selected,
  title
}: SelectDropDownProps) => {
  return (
    <select
      className={className}
      disabled={disable}
      onChange={(e) => handler(e.target.value)}
      value={selected}
    >
      <option value="" disabled >
        {title}
      </option>
      {items.map((item: ItemProps) => (
        <option  key={item["id"]} value={item["id"]}>
          {(item as any)[captionKey]}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
