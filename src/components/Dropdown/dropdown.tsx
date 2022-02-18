interface ItemProps {
  code: string | number | readonly string[] | undefined;
  id: number | string;
  name: string;
}

interface SelectDropDownProps {
  captionKey?: any;
  className?: string;
  items?: any;
  handler: (event: any) => void;
  disable?: boolean;
  selected?: string;
  title?: string;
  extra?: string;
  name?: string;
}

const SelectDropDown = ({
  handler,
  className,
  items,
  disable,
  extra,
  name,
}: SelectDropDownProps) => {

  return (
    <select
      name={name}
      className={className}
      disabled={disable}
      // value={value}
      onChange={(e) => handler(e)}
    >
      {items?.map((item: ItemProps, index: number) => (
        <option key={index} value={item?.code}>
          {item?.name} {extra ? extra : null}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
