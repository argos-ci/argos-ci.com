import Link from "next/link";

import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <section className="flex h-full items-center p-16">
        <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
          <div className="max-w-lg text-center">
            <h2 className="mb-8 font-accent text-9xl">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="font-accent text-2xl md:text-3xl">
              Sorry, we couldn&apos;t find this page.
            </p>
            <p className="mb-8 mt-4 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Button size="large" asChild>
              <Link href="/">Back to homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
