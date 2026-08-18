import type { SVGProps } from "react"
import type { LucideIcon } from "lucide-react"
import {
    ArrowLeft,
    CircleCheck,
    CircleX,
    AlignRight,
    X,
    MoveRight,
    Star,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Menu,
    Phone,
    AtSign,
    MapPin,
    Upload,
    Ellipsis,
    LoaderIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    GlobeIcon,
    ImageIcon,
    MessageCircleDashedIcon,
    PaperclipIcon,
    RotateCwIcon,
    TelescopeIcon,
    PlusIcon,
    PanelLeftIcon,
    BrainIcon,
    LogOutIcon,
    CheckIcon,
    AlertCircleIcon,
    Pencil,
    Trash,
    Copy,
    Share
} from "lucide-react"

export const Icons: Record<string, LucideIcon> = {
    trash: Trash,
    pencil: Pencil,
    alertCircle: AlertCircleIcon,
    check: CheckIcon,
    logout: LogOutIcon,
    brain: BrainIcon,
    panelLeft: PanelLeftIcon,
    arrowUp: ArrowUpIcon,
    arrowDown: ArrowDownIcon,
    globe: GlobeIcon,
    image: ImageIcon,
    messageCircle: MessageCircleDashedIcon,
    paperClip: PaperclipIcon,
    rotateCw: RotateCwIcon,
    telescope: TelescopeIcon,
    plus: PlusIcon,
    loader: LoaderIcon,
    ellipsis: Ellipsis,
    arrowLeft: ArrowLeft,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronDown: ChevronDown,
    chevronUp: ChevronUp,
    circleCheck: CircleCheck,
    circleCancel: CircleX,
    hambgMenu: Menu,
    hambgMenu2: AlignRight,
    cancel: X,
    moveRight: MoveRight,
    outlineStar: Star,
    phone: Phone,
    atSign: AtSign,
    location: MapPin,
    upload: Upload,
    copy: Copy,
    share: Share
};

export const AssortedIcons: Record<string, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  sidebar: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 6h6v12H4zm8 12V6h8v12z" />
      <path d="M6 8h2v2H6zm0 4h2v2H6z" />
    </svg>
  ),
};