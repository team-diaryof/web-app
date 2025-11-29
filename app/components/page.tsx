"use client";
import dynamic from "next/dynamic";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ErrorPage from "@/components/ui/error-page";
import Loading from "@/components/ui/loading";
import Select from "@/components/ui/select";
import TextArea from "@/components/ui/text-area";
import TextSwitcher from "@/components/ui/text-switcher";
import { Dropdown } from "@/components/ui/dropdown/dropdown";
import { DropdownItem } from "@/components/ui/dropdown/dropdown-item";

const Map = dynamic(() => import("@/components/ui/map"), {
	ssr: false,
});

export default function UIComponentVariantsDemo() {
	return (
		<div className="max-w-5xl mx-auto flex flex-1 flex-col gap-8 py-8">
			<h1 className="text-3xl font-bold mb-6">UI Component Variants Showcase</h1>

			{/* Button Variants */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Button</h2>
				<div className="mb-2">Variants:</div>
				<div className="flex gap-2 flex-wrap mb-4">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="link">Link</Button>
					<Button variant="empty">Empty</Button>
				</div>
				<div className="mb-2">Sizes:</div>
				<div className="flex gap-2 flex-wrap">
					<Button size="xs">XS</Button>
					<Button size="sm">SM</Button>
					<Button size="md">MD</Button>
					<Button size="lg">LG</Button>
				</div>
			</section>

			{/* Input Variants */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Input</h2>
				<div className="flex gap-4 flex-wrap">
					<Input type="text" placeholder="Text input" />
					<Input type="password" placeholder="Password input" />
				</div>
			</section>

			{/* Error Page */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Error Page</h2>
				<ErrorPage title="404 Not Found" />
			</section>

			{/* Loading Variants */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Loading</h2>
				<div className="mb-2">Sizes:</div>
				<div className="flex gap-4 items-center">
					<Loading size="xs" />
					<Loading size="sm" />
					<Loading size="md" />
					<Loading size="lg" />
				</div>
			</section>

			{/* Map */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Map</h2>
				<Map position={[37.7749, -122.4194]} title="San Francisco" description="A demo location." zoom={12} />
			</section>

			{/* Select */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Select</h2>
				<Select
					options={[
						{ label: "Option 1", value: "1" },
						{ label: "Option 2", value: "2" },
					]}
					value="1"
					onChange={() => {}}
				/>
			</section>

			{/* Dropdown */}
			<section className="mb-8 space-x-2">
				<h2 className="text-xl font-semibold mb-2">Dropdown</h2>
				<Dropdown  position="top-left" mobileSlideFrom="bottom" trigger={<Button variant="primary">Top Left</Button>}>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown  position="top-right" trigger={<Button variant="primary">Top Right</Button>}>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown  position="top-center" trigger={<Button variant="primary">Top Center</Button>}>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
				<Dropdown  position="bottom-left" trigger={<Button variant="primary">Bottom Left</Button>}>
					<DropdownItem>Item 1</DropdownItem>
					<DropdownItem>Item 2</DropdownItem>
				</Dropdown>
			
				<Dropdown trigger={<Button variant="primary">Custom Dropdown</Button>}>
                <div className="p-4">
                    Drop down with custom content
                </div>
				</Dropdown>
			</section>

			{/* Text Area */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Text Area</h2>
				<TextArea placeholder="Type here..." />
			</section>

			{/* Text Switcher */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Text Switcher (Animation Variants)</h2>
				<TextSwitcher words={["Hello", "World", "Variants"]} />
			</section>

		</div>
	);
}
