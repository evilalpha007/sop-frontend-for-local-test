// countBox.tsx
"use client";
import Typography from "@/components/elements/texts/Typography";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useInView } from "react-intersection-observer";
const CountUp = dynamic(() => import("react-countup"), {
  suspense: true,
  ssr: false,
});

interface CountBoxProps {
  count: number;
  postfix: string;
}

const CountBox: React.FC<CountBoxProps> = ({ count, postfix }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.2, // Start animation when 20% of component is visible
  });

  return (
    <div ref={ref}>
      <Typography
        as="p"
        className="text-center !font-roboto text-2xl font-light leading-7 text-white sm:text-[44px] sm:!leading-none"
      >
        {inView ? (
          <Suspense fallback={0}>
            <CountUp
              start={0}
              end={count}
              duration={2}
              decimals={count % 1 !== 0 ? 1 : 0}
              separator="" // No comma separator
            />
          </Suspense>
        ) : (
          0
        )}
        <span>
          {" "}
          {` `}
          {postfix}
        </span>
      </Typography>
    </div>
  );
};

export default CountBox;
