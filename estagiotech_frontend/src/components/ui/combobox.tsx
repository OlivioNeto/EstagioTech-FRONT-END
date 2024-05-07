import * as React from "react";
import { Check, ChevronsUpDown, Ghost } from "lucide-react";

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
  data = [],
  value,
  setValue,
}: {
  data: ComboboxProps[];
  value: string;
  setValue: Function;
}) {
  const [open, setOpen] = React.useState(false);

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
            ? data.find((item) => item.value === value)?.label
            : "Selecione..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          {/* <CommandList> 
          <CommandEmpty>Ops! Não localizado</CommandEmpty>*/}
          <CommandGroup>
            <div className="flex flex-col">
              {data.length && data.map((item) => (
                // {data.map((item) => (
                //   <CommandItem
                //   key={item.value}
                //   value={item.value}
                //   onSelect={(currentValue) => {
                //     setValue(currentValue === value ? "" : currentValue);
                //     setOpen(false);
                //   }}
                // >
                //   <Check
                //     className={cn(
                //       "mr-2 h-4 w-4",
                //       value === item.value ? "opacity-100" : "opacity-0"
                //     )}
                //   />
                //   {item.label}
                // </CommandItem>
                <Button variant="ghost" key={item.value} onClick={() => {
                  setValue(item.value)
                  setOpen(false)
                }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </CommandGroup>
          {/* </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
