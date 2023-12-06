import { clsx } from "clsx";
import { ComponentType, ElementType, forwardRef } from "react";

type Template<TComponent extends ElementType> = (
  strings: TemplateStringsArray,
  ...values: any[]
) => TComponent;

type Twc = (<T extends ElementType>(component: T) => Template<T>) & {
  [Key in keyof HTMLElementTagNameMap]: Template<Key>;
};

const template =
  (Component: ComponentType) =>
  (strings: TemplateStringsArray, ...values: unknown[]) => {
    const twClassName = String.raw({ raw: strings }, ...values);
    return forwardRef(({ className, ...props }: any, ref) => (
      <Component
        ref={ref}
        className={clsx(twClassName, className)}
        {...props}
      />
    ));
  };

export const twc = new Proxy(
  (component: ComponentType) => {
    return template(component);
  },
  {
    get(_, name) {
      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        const Component = name as "div";
        const twClassName = String.raw({ raw: strings }, ...values);
        return forwardRef(({ className, ...props }: any, ref) => (
          <Component
            ref={ref}
            className={clsx(twClassName, className)}
            {...props}
          />
        ));
      };
    },
  },
) as any as Twc;
