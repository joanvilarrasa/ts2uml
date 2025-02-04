import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { CheckboxPartialCheckedStatus } from '@ts2uml/models';
import { Check, Minus } from 'lucide-react';

export function CheckboxPartial({
  checked,
  onClick,
}: {
  checked: CheckboxPartialCheckedStatus;
  onClick: () => void;
}) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer flex h-3 w-3 shrink-0 items-center justify-center border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        checked === 'checked' && 'bg-primary text-primary-foreground',
        checked === 'unchecked' && 'bg-transparent text-transparent',
        checked === 'partial' && 'bg-primary text-primary-foreground'
      )}
      onClick={onClick}
    >
      {checked === 'checked' && <Check className="h-3 w-3" />}
      {checked === 'unchecked' && <Check className="h-3 w-3 text-transparent" />}
      {checked === 'partial' && <Minus className="h-3 w-3" />}
    </CheckboxPrimitive.Root>
  );
}
