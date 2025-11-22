import Title from "./Title";
import { ITextBlockProps } from "./type";
import Description from "./Description";

const TextBlock = (props: ITextBlockProps) => {
  return <div {...props} />;
};

TextBlock.Title = Title;
TextBlock.Description = Description;

export default TextBlock;
