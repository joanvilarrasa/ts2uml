import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type LinkPathAlgorithm, ZLinkPathAlgorithm } from '@ts2uml/models';

type LinkPathAlgorithmSelectProps = {
  value: LinkPathAlgorithm;
  onChange: (value: LinkPathAlgorithm) => void;
};

export function LinkPathAlgorithmSelect({ value, onChange }: LinkPathAlgorithmSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {ZLinkPathAlgorithm.options.map((algorithm) => (
          <SelectItem key={algorithm} value={algorithm}>
            {algorithm}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
