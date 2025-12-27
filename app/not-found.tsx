import Link from "next/link";

import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex h-full items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-lg text-center">
          <h1 className="font-accent mb-8 text-9xl">
            <span className="sr-only">Error</span>404
          </h1>
          <p className="font-accent text-2xl md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-(--gray-400)">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button size="large" asChild>
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
