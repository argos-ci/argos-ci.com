import Image, { ImageProps } from "next/image";
import type { ComponentProps } from "react";
import { TwcComponentProps, twc } from "react-twc";

export const PostCard = twc.div`text-left cursor-pointer transition duration-300 hover:bg-subtle`;

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
      className="relative overflow-hidden"
      style={{
        aspectRatio: extended ? "21/9" : "2/1",
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
  <div className="p-6" {...props} />
);

export const PostCardTag: React.FC<{ children: React.ReactNode }> = (props) => (
  <p className="text-low mb-2 text-xs" {...props} />
);

type PostCardTitleProps = TwcComponentProps<"h2"> & {
  $extended?: boolean;
  $classname?: string;
};

export const PostCardTitle = twc.h2<PostCardTitleProps>((props) => [
  "mb-2 font-accent font-semibold",
  props.$extended ? "text-3xl" : "text-xl",
  props.$classname,
]);

export const PostCardDescription = (props: ComponentProps<"div">) => (
  <div className="text-low mb-6 text-sm leading-normal" {...props} />
);

export const PostCardFooter = (props: ComponentProps<"div">) => (
  <div className="text-low flex items-center gap-2 text-sm" {...props} />
);

export const PostCardAuthor = (props: ComponentProps<"div">) => (
  <div className="text-low" {...props} />
);

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
