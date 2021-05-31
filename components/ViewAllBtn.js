import Link from "next/link";

const ViewAllBtn = ({ hrefLink }) => {
	return (
		<Link href={hrefLink}>
			<a className="bg-blue-500 px-3 py-2 rounded text-sm text-white">
				View All
			</a>
		</Link>
	);
};

export default ViewAllBtn;
