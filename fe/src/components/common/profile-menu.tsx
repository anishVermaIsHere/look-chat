import { Icons } from "@/widgets/icons";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/store/auth"


export function ProfileMenu() {
  const { user, logOut } = useAuthStore(s=>s);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="rounded-full" data-testid="profile-menu">{user?.firstName.slice(0,1)}</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem variant="destructive" onClick={logOut}>
          <Icons.logout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}