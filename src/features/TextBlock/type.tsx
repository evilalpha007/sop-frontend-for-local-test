export interface ITitleProps {
  children?: React.ReactNode;
  className?: string;
}
export interface IDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface ITextBlockProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
