import clsx from "clsx";
import { twc } from "react-twc";

export const Table = twc.table`w-full min-w-[50em] table-fixed`;
export const Tr = twc.tr`border-b border-dashed border-violet-6 align-baseline md:[&>th]:whitespace-nowrap`;
export const Td = twc.td`px-3 py-4`;
export const Th = twc.th`px-3 py-4 text-left font-normal text-low`;

export function List(props: {
  list: string[];
  icon?: React.ReactNode;
  columns?: number;
}) {
  const { list, icon, columns = 1 } = props;
  return (
    <>
      <div className="sm:hidden">{list.join(", ")}</div>
      <ul
        className={clsx(
          "hidden sm:grid",
          {
            1: "sm:grid-cols-1",
            2: "sm:grid-cols-2",
          }[columns],
        )}
      >
        {list.map((item) => {
          if (icon) {
            return (
              <li key={item} className="flex items-center gap-1">
                {icon}
                {item}
              </li>
            );
          }
          return (
            <li key={item} className="list-inside list-disc text-sm">
              <span className="relative -left-1 text-base">{item}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
