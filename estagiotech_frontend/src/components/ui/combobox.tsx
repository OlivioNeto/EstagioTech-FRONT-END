import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxProps = {
  value: string;
  label: string;
};

export function Combobox({
  data,
  value,
  setValue,
}: {
  data: ComboboxProps[];
  value: string;
  setValue: Function;
}) {
  const [open, setOpen] = React.useState(false);

  if (data.length <= 0) return;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((empresa) => empresa.value === value)?.label
            : "Selecione a emrpesa..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar empresa..." />
          <CommandEmpty>Ops! Não localizado</CommandEmpty>
          <CommandGroup>
            {data.map((empresa) => (
              <CommandItem
                key={empresa.value}
                value={empresa.value}
                onSelect={() => {
                  setValue(empresa.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === empresa.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {empresa.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
