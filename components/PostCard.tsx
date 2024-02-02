import Image, { ImageProps } from "next/image";
import type { ComponentProps } from "react";
import { TwcComponentProps, twc } from "react-twc";

export const PostCard = twc.div`rounded-lg border bg-subtle text-left transition duration-300 hover:-translate-y-2 hover:scale-[101%]`;

export interface PostCardImageProps extends ImageProps {
  extended?: Boolean;
}

export const PostCardImage = ({
  extended,
  alt,
  width,
  height,
  ...props
}: PostCardImageProps) => {
  return (
    <div
      className="rounded-t-lg"
      style={{
        position: "relative",
        aspectRatio: extended ? "21/9" : "2/1",
        overflow: "hidden",
      }}
    >
      <Image
        {...props}
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
};

export const PostCardBody = (props: ComponentProps<"div">) => (
  <div className="p-4" {...props} />
);

export const PostCardTag: React.FC<{ children: React.ReactNode }> = (props) => (
  <p className="mb-2 text-xs text-low" {...props} />
);

type PostCardTitleProps = TwcComponentProps<"h2"> & {
  extended?: boolean;
  classname?: string;
};

export const PostCardTitle = twc.h2<PostCardTitleProps>((props) => [
  "mb-2 font-accent",
  props.extended ? "text-4xl" : "text-2xl",
  props.classname,
]);

export const PostCardDescription = (props: ComponentProps<"div">) => (
  <div className="mb-8 leading-normal text-low" {...props} />
);

export const PostCardFooter = (props: ComponentProps<"div">) => (
  <div className="flex items-center gap-2 text-sm text-low" {...props} />
);

export const PostCardAuthor = (props: ComponentProps<"div">) => (
  <div className="text-low" {...props} />
);

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export const PostCardDate = ({ date }: { date: string }) => {
  return (
    <time className="text-low" dateTime={date}>
      {dateFormatter.format(new Date(date))}
    </time>
  );
};
