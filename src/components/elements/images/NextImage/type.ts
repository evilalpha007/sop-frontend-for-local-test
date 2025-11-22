import { type ClassValue } from "clsx";
export type TOptimizationProps = { width: number; height: number };
export type TDisabledOptimizationProps = { fill?: true };
export type TImageMode = TDisabledOptimizationProps | TOptimizationProps;

export type TImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: ClassValue;
  priority?: boolean;
  disableBlur?: boolean;
  blurDataURL?: string | null;
  style?: React.CSSProperties;
  externalUrl?: boolean;
  quality?: number;
};

export type TNextImageProps = Omit<TImageProps, "blurDataURL"> &
  TImageMode & { blurDataURL?: string | null };

export type TNextImageWithOptimization = TImageProps & TOptimizationProps;

export interface IWrapperProps {
  children?: React.ReactNode;
}
