import { getRandomNumberInRange } from "./get-random-number-in-range";
import makeAsyncTask from "./make-async-task";

type TGetGroupedItemsProps<T> = {
  items?: T[] | null | undefined;
  groupSize?: number;
};

const getGroupedItemsSync = <T>({
  items,
  groupSize = 1,
}: TGetGroupedItemsProps<T>): T[][] => {
  try {
    const groups: T[][] = [];
    let currentGroup: T[] = [];
    const confirmArrayItem = Array.isArray(items) ? items : [];

    for (const item of confirmArrayItem) {
      currentGroup.push(item);
      if (currentGroup.length === groupSize) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    }

    // If there are remaining items in the current group, fill it with random items
    if (currentGroup?.length > 0) {
      while (currentGroup.length < groupSize) {
        const randomIndex = getRandomNumberInRange({
          min: 0,
          max: (items?.length ?? 1) - 1,
        });
        const randomItem = items?.[randomIndex];
        if (randomItem) currentGroup.push(randomItem);
      }
      groups.push(currentGroup);
    }

    return groups;
  } catch (error) {
    return [];
  }
};

export const getGroupedItems = async <T>({
  items,
  groupSize = 1,
}: TGetGroupedItemsProps<T>): Promise<T[][]> => {
  return makeAsyncTask(() => getGroupedItemsSync({ items, groupSize }));
};

// // Example usage
// const items = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
//   { id: 4, name: "Item 4" },
//   { id: 5, name: "Item 5" },
//   { id: 6, name: "Item 6" },
// ];

//  // console.log("main thread first task");

// (async () => {
//   //   const groupSize = 3;
//    // console.log("before getGroupedItems run ");
//   const groupedItemsRes = await getGroupedItems({ items, groupSize: 7 });
//    // console.log("output: ", groupedItemsRes);
// })();

//  // console.log("main thread last task");
