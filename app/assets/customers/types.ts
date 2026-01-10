import type { ThemeImageProps } from "@/components/ThemeImage";

export type CustomerCompany = {
  logo: {
    adjusted: ThemeImageProps["src"];
    "140x48": ThemeImageProps["src"];
    emblem?: ThemeImageProps["src"];
  };
  name: string;
  url: string;
  storyUrl?: string;
};

export type CustomerUser = {
  name: string;
  title: string;
  avatar: ThemeImageProps["src"];
};

export type CustomerQuote = {
  company: CustomerCompany;
  text: React.ReactNode;
  author: CustomerUser;
};
