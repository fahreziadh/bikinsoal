import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchOption({ onCheckedChange, checked }: SwitchOptionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="switch-option" checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor="switch-option">Pilihan Ganda</Label>
    </div>
  );
}

interface SwitchOptionProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
