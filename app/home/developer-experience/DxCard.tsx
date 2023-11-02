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
    <section className="bg-subtle border rounded p-8 pt-0 flex-1 flex flex-col h-96">
      <div className="flex items-center justify-center flex-1 min-h-0 relative">
        {children}
      </div>
      <h3 className="font-semibold text-xl mb-0.5">{title}</h3>
      <p>{text}</p>
    </section>
  );
}
