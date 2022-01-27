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
  handler,
  className,
  items,
  disable,
  extra
}: SelectDropDownProps) => {
  return (
    <select
      className={className}
      disabled={disable}
      onChange={(e) => handler(e.target.value)}
    >
     
      {items?.map((item: ItemProps,index:number) => (
        <option  key={index} value={item?.code}>
          {item?.name } {extra? extra:null}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
