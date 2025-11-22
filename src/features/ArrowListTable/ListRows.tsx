import { cn } from "@/library/utils/cn";
import ListRow, { TListRowProps } from "./ListRow";

type TListRowsProps = {
  data?: TListRowProps[];
  type?: "with-header" | "row";
  header?: string | null;
};

const ListRows = ({ data, type, header }: TListRowsProps) => {
  // console.log('Feature ArrowListTable ListRows', data);
  return (
    <div
      className={cn(
        "relative border-x border-solid border-x-theme-off-white border-opacity-20 bg-theme-gray bg-opacity-20",
        {
          "!border-b !border-x-theme-light-golden !border-b-theme-light-golden":
            type === "with-header",
        },
      )}
    >
      {type === "with-header" && (
        <ListRow type="header" title={header} index={-1} />
      )}

      {data?.map((item, index) => (
        <ListRow key={index} index={index} {...item} />
      ))}
    </div>
  );
};

export default ListRows;
