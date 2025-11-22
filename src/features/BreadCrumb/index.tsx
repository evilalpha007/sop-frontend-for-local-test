import Link from "next/link";

export interface IPathname {
  title?: string;
  link?: string;
}

interface IBreadCrumbProps {
  data?: IPathname[];
  className?: string;
}

const BreadCrumb = ({ data, className }: IBreadCrumbProps) => {
  const lastIdx = (data?.length || 1) - 1;

  return (
    <nav className={className}>
      <ul className="flex flex-wrap items-center">
        {data?.map(({ title, link }, index) => {
            if(title != null){
          return (
            <li className="flex items-center" key={index}>
              <span
                
                className="text-[12px] font-medium text-white opacity-50 md:text-sm"
              >
                {title}
              </span>

              {lastIdx !== index && (
                <span className="px-1 text-sm font-medium text-white opacity-50">
                  {" > "}
                </span>
              )}
            </li>
          );
        }
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
