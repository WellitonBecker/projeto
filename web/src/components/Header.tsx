import { Menu } from "lucide-react";
import { Profile } from "./Profile";
import { getUser } from "@/lib/auth";

export default function Header() {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex h-16 w-full flex-col bg-gray-300 md:space-y-4">
      <header className="z-40 flex h-16 w-full items-center justify-between">
        <div className="ml-6 block lg:hidden">
          <button className="text-md flex items-center rounded-full bg-white p-2 text-gray-500 shadow">
          </button>
        </div>
        <div className="relative z-20 flex h-full  justify-end px-3 md:w-full">
          <div className="relative flex w-full items-center justify-end space-x-4 p-1">
            <Profile avatarUrl={avatarUrl} name={name} />
          </div>
        </div>
      </header>
    </div>
  );
}
