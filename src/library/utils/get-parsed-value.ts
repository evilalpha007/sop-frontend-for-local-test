export const getParsedValue = <T = string>(
  jsonString: string | number | null | undefined,
): T | undefined => {
  if (typeof jsonString !== "string") {
    console.error("Invalid input: not a string");
    return undefined;
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return undefined;
  }
};
