import * as React from "react";

export function DxCard({
  title,
  text,
  children,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-subtle flex h-96 flex-1 flex-col rounded-sm border p-8 pt-0">
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {children}
      </div>
      <h3 className="mb-0.5 text-xl font-semibold">{title}</h3>
      <p>{text}</p>
    </section>
  );
}
