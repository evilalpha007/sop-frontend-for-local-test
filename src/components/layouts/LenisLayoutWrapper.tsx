"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

const options = {
  lerp: 0.07,
};

const LenisLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
};

export default LenisLayoutWrapper;
