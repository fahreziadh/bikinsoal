import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipShared({ children, tooltipText }: TooltipSharedProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children ?? <Button>Button</Button>}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText ?? "Tooltip Text"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface TooltipSharedProps {
  children?: React.ReactNode;
  tooltipText?: string;
}
