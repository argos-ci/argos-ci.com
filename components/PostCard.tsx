import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import type { ComponentPropsWithRef } from "react";

import type { Employee } from "@/app/assets/people/library";

export function PostCard(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={clsx(
        "hover:bg-subtle cursor-pointer text-left transition duration-300",
        props.className,
      )}
      {...props}
    />
  );
}

export interface PostCardImageProps extends ImageProps {
  extended?: Boolean;
}

export function PostCardImage(props: PostCardImageProps) {
  const { extended, alt, width, height, ...rest } = props;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: extended ? "21/9" : "2/1",
      }}
    >
      <Image
        {...rest}
        fill
        sizes={
          extended
            ? "(max-width: 768px) 100vw, 1100px"
            : "(max-width: 768px) 100vw, 510px"
        }
        priority={Boolean(extended)}
        alt={alt}
        style={{
          objectFit: "cover",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export function PostCardBody(props: ComponentPropsWithRef<"div">) {
  return <div className={clsx("p-6", props.className)} {...props} />;
}

export function PostCardTag(props: ComponentPropsWithRef<"p">) {
  return (
    <p className={clsx("text-low mb-2 text-xs", props.className)} {...props} />
  );
}

export function PostCardTitle(
  props: ComponentPropsWithRef<"h2"> & {
    extended?: boolean;
  },
) {
  const { extended, ...rest } = props;
  return (
    <h2
      className={clsx(
        "font-accent mb-2 font-semibold",
        extended ? "text-3xl" : "text-xl",
        rest.className,
      )}
      {...rest}
    />
  );
}

export function PostCardDescription(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={clsx("text-low mb-6 text-sm leading-normal", props.className)}
      {...props}
    />
  );
}

export function PostCardFooter(props: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={clsx(
        "text-low flex items-center gap-2 text-sm",
        props.className,
      )}
      {...props}
    />
  );
}

export function PostCardAvatar(props: { author: Employee }) {
  return (
    <Image
      alt={props.author.name}
      src={props.author.avatar}
      className="size-8 rounded-full"
    />
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export function PostCardDate(props: { date: string }) {
  const { date } = props;
  return (
    <time className="text-low" dateTime={date}>
      {dateFormatter.format(new Date(date))}
    </time>
  );
}
