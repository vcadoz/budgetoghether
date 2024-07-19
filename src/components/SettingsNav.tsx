import { CoinsIcon, LockIcon, MoonIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Nav(){
    return(<aside className="hidden w-64 flex-col border-r bg-background p-6 md:flex">
        <div className="mb-6 text-lg font-semibold">Settings</div>
        <nav className="space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <UserIcon className="h-5 w-5" />
            Account
          </Link>
          <Link
            href="/settings/bank"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <CoinsIcon className="h-5 w-5" />
            Your Banks
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <LockIcon className="h-5 w-5" />
            Privacy
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <MoonIcon className="h-5 w-5" />
            Appearance
          </Link>
        </nav>
      </aside>
      )}