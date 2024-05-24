'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

function ComboboxUI({
	items,
	value,
	onItemSelect,
	placeholder = 'Select an item',
	disableSearch = false,
	showAllItem = true, // Add a new prop to control whether to show "All" item
}) {
	const [open, setOpen] = React.useState(false);
	const combinedItems = showAllItem
		? [{ value: 'All', label: 'All' }, ...items]
		: items;
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[150px] justify-between'
				>
					{value
						? combinedItems.find((item) => item.value === value)?.label
						: placeholder}
					<ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					{!disableSearch && (
						<CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
					)}
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup className='h-48 overflow-y-auto'>
						{combinedItems.map((item) => (
							<CommandItem
								key={item.value}
								onSelect={() => {
									onItemSelect(item.value);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-6',
										value === item.value ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
export { ComboboxUI };
