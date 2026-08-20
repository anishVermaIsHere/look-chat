import { cn } from "@/lib/utils"
import { AppConfig } from "@/config/app-config"

const BrandLogo = ({ src, alt, className}: { src?: string, alt?: string, className?: string }) => (
     <div className="flex items-center">
        <img
          src={src ?? AppConfig.brandLogo}
          alt={alt ?? "Brand Logo"}
          className={cn("rounded-none min-h-8 min-w-8", className)}
        />
    </div>
)

export default BrandLogo