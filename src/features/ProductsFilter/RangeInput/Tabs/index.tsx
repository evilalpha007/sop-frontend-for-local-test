import { cn } from "@/library/utils/cn";
import Tab from "./Tab";

interface ITabsProps {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const Tabs = ({ children, className, align = "left" }: ITabsProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        {
          "justify-start": align === "left",
          "justify-center": align === "center",
          "justify-end": align === "right",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

Tabs.Tab = Tab;
export default Tabs;
