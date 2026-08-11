import clsx from "clsx";

/**
 * The SNKR.shop product grid from the live example, reduced to a skeleton: a
 * storefront header and four columns of product cards on a white page. It
 * exists so a pane that claims to show sneakers-listing.png rhymes with the
 * real screenshot a visitor sees after clicking through to the share page.
 *
 * The two variants encode the actual change the pull request makes, not a
 * generic "something changed" tint: `before` keeps the price at the bottom of
 * the card next to an outline preview button, `after` moves the price up next
 * to the name and gives every card a solid add-to-cart button. The button is
 * the page's feature color rather than the shop's black, for the same reason
 * every skeleton on this site paints the one meaningful mark in the accent.
 */
export function Storefront(props: {
  variant: "before" | "after";
  /**
   * Two rows fit the compare panes; three fill the taller pinned-feedback
   * crop, and match the real capture, which shows a third row of sneakers.
   */
  rows?: 2 | 3;
  className?: string;
}) {
  const { variant, rows = 2, className } = props;
  return (
    <div
      aria-hidden
      className={clsx(
        "flex flex-col gap-1.5 rounded-sm border-[0.5px] bg-app p-1.5 shadow-xs",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <span className="h-1 w-5 rounded-full bg-(--neutral-12)/25" />
        <span className="ml-auto h-1 w-2.5 rounded-full bg-(--neutral-12)/10" />
        <span className="h-1 w-2.5 rounded-full bg-(--neutral-12)/10" />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: rows * 4 }, (_, index) => (
          <ProductCard key={index} variant={variant} />
        ))}
      </div>
    </div>
  );
}

function ProductCard(props: { variant: "before" | "after" }) {
  return (
    <div className="flex flex-col gap-1 rounded-xs border-[0.5px] p-1">
      <span className="h-4 rounded-[1px] bg-(--neutral-12)/10" />
      {props.variant === "before" ? (
        <>
          <span className="h-1 w-3/4 rounded-full bg-(--neutral-12)/25" />
          <span className="flex items-center">
            <span className="h-1.5 w-1/2 rounded-[2px] border-[0.5px]" />
            <span className="ml-auto h-1 w-2 rounded-full bg-(--neutral-12)/25" />
          </span>
        </>
      ) : (
        <>
          <span className="flex items-center">
            <span className="h-1 w-1/2 rounded-full bg-(--neutral-12)/25" />
            <span className="ml-auto h-1 w-2 rounded-full bg-(--neutral-12)/25" />
          </span>
          <span className="h-1.5 w-full rounded-[2px] bg-(--plum-9)" />
        </>
      )}
    </div>
  );
}
