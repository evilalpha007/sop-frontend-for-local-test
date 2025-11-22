import Tab, { ITabItem } from "./Tab";

export interface ITabsProps {
  data: ITabItem[];
  activeTab?: string | number;
  onTabClick?: (data?: ITabItem) => void;
}

const Tabs = ({ data, activeTab, onTabClick }: ITabsProps) => {
  return (
    <div className="relative flex w-full flex-row overflow-x-auto overflow-y-hidden">
      <span className="absolute bottom-[1px] left-0 h-0 w-full self-stretch border-b-[0.5px] border-b-theme-off-white opacity-60"></span>
      <ul className="mb-1 flex items-center justify-start gap-x-2 gap-y-2">
        {data?.map((filter) => {
          //  // console.log(filter);
          const lowerCaseActiveTab = activeTab
            ? String(activeTab).toLowerCase()
            : undefined;
          const lowerCaseTitle = filter?.title?.toLowerCase();
          const isTitleMatched =
            !!lowerCaseActiveTab &&
            !!lowerCaseTitle &&
            lowerCaseActiveTab === lowerCaseTitle;
          const isIdMatched =
            !!activeTab && !!filter.value && activeTab === filter.value;
          const isvalueMatched =
            !!filter.value && !!activeTab && activeTab === filter.value;
          const isActive = isIdMatched || isTitleMatched || isvalueMatched;

          return (
            <Tab key={filter.id} info={{ filter, isActive, onTabClick }}>
              {filter?.title}
            </Tab>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
