import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col overflow-hidden p-4">{children}</main>
  );
}
