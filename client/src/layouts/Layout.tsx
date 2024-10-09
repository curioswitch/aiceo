import type React from "react";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto prose max-w-7xl prose-img:m-0">
			<div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
				{children}
			</div>
		</div>
	);
}
