"use client";

type TErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: TErrorProps) => {
  return (
    <div>
      {JSON.stringify(error)}
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Error;
