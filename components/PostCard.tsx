import type { ComponentProps, ReactNode } from "react";
import Image, { ImageProps } from "next/image";
import { clsx } from "clsx";

export const PostCard = ({ children }: { children: ReactNode }) => (
  <div
    className={clsx(
      "rounded-lg border text-left bg-subtle hover:-translate-y-2 hover:scale-[101%] duration-300 transition",
    )}
  >
    {children}
  </div>
);

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
        sizes="(max-width: 1024px) 100vw, 50vw"
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
  <p className="text-xs text-low mb-2" {...props} />
);

export const PostCardTitle = ({
  extended,
  children,
}: {
  extended?: Boolean;
  children: ReactNode;
}) => (
  <h2 className={`mb-2 ${extended ? "text-4xl" : "text-2xl"} font-accent text`}>
    {children}
  </h2>
);

export const PostCardDescription = (props: ComponentProps<"div">) => (
  <div className="mb-8 text-low leading-normal" {...props} />
);

export const PostCardFooter = (props: ComponentProps<"div">) => (
  <div className="text-sm text-low flex gap-2 items-center" {...props} />
);

export const PostCardAuthor = (props: ComponentProps<"div">) => (
  <div className="text-low" {...props} />
);

export const PostCardDate: React.FC<{ children: React.ReactNode }> = (
  props,
) => <div className="text-low" {...props} />;
