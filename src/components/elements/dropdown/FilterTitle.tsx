interface IFilterTitleProps {
  onClick?: () => void;
  isExpended?: boolean;
  title?: React.ReactNode;
  groupHoverMode?: boolean;
}

const FilterTitle = ({
  title,
  isExpended,
  groupHoverMode,
  onClick,
}: IFilterTitleProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex w-fit max-w-full cursor-pointer items-center gap-0.5"
    >
      {title}
    </button>
  );
};

export default FilterTitle;
