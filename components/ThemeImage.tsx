/* eslint-disable jsx-a11y/alt-text */
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

export function ThemeImage(
  props: Omit<ImageProps, "src"> & {
    src:
      | ImageProps["src"]
      | { light: ImageProps["src"]; dark: ImageProps["src"] };
  },
) {
  const { src, ...rest } = props;
  if (typeof src !== "string" && "dark" in src) {
    return (
      <>
        <Image
          loading="lazy"
          {...rest}
          src={src.light}
          className={clsx("dark:hidden", rest.className)}
        />
        <Image
          loading="lazy"
          {...rest}
          src={src.dark}
          className={clsx("hidden dark:inline", rest.className)}
        />
      </>
    );
  }
  return <Image {...rest} src={src} />;
}
