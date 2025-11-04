import { Metadata } from "next";

import { Container } from "@/components/Container";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "OSS Friends",
  description: "Open-source projects and tools for an open world.",
  pathname: "/oss-friends",
});

type Friend = {
  name: string;
  description: string;
  href: string;
};

export default async function Page() {
  const res = await fetch("https://formbricks.com/api/oss-friends");
  const { data: friends } = (await res.json()) as { data: Friend[] };
  return (
    <Container className="py-16 md:py-24">
      <h1 className="font-accent text-center text-5xl md:text-7xl md:leading-[1.1]">
        Our Open-source Friends
      </h1>
      <p className="text-low mx-auto mt-4 text-center text-lg text-balance">
        In Argos, we are proud to collaborate with a diverse group of partners
        to promote open-source software and the values of transparency,
        collaboration, and community that it represents.
      </p>
      <ul className="mt-16 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {friends.map(({ name, description, href }, index) => {
          return (
            <li key={index}>
              <article className="bg-subtle flex h-full flex-col justify-between rounded-sm border border-(--violet-6) p-8 lg:rounded-2xl lg:px-5 lg:pt-5 lg:pb-6">
                <div>
                  <header>
                    <h3 className="text-2xl">{name}</h3>
                  </header>
                  <p className="text-low mt-4 font-light">{description}</p>
                </div>
                <div className="mt-6">
                  <a
                    className="text-sm font-medium underline hover:no-underline"
                    href={href}
                    target="_blank"
                  >
                    Visit {name}
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
