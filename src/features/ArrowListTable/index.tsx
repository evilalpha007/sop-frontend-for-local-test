import Section from "@/components/blocks/Section/index";
import Description from "./Description";
import ListRowsGroup from "./ListRowsGroup";
import Title from "./Title";

interface IArrowListTableProps {
  className?: string;
  children?: React.ReactNode;
}

const ArrowListTable = ({ children, className }: IArrowListTableProps) => {
  return (
    <Section.Container className={className}>{children}</Section.Container>
  );
};

ArrowListTable.Title = Title;
ArrowListTable.Description = Description;
ArrowListTable.ListRowsGroup = ListRowsGroup;

export default ArrowListTable;
