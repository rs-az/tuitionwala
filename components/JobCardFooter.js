import Link from "next/link";

const JobCardFooter = ({ area, parent, tuition, gender, requirement }) => {
	return (
		<div className="text-sm slide mt-2 px-2 border-r-2 border-gray-100 flex-col justify-between items-end">
			<div>
				<p className="md:text-md text-gray-600">
					<strong>Area: </strong>
					{area}
				</p>
				<p className="md:text-md text-gray-600">
					<strong>Parent: </strong>
					{parent}
				</p>
				<p className="md:text-md text-gray-600">
					<strong>Tuition For: </strong>
					{tuition}
				</p>
				<p className="md:text-md text-gray-600">
					<strong>Teacher's Preferred Gender: </strong>
					{gender}
				</p>
				<p className="md:text-md text-gray-600 truncate ">
					<strong>Requirement: </strong>
					{requirement}
				</p>
			</div>
			<ul className="flex justify-end space-x-2 m-2">
				<li>
					<Link href="#">
						<a className="bg-gray-600 text-white px-2 py-1">Apply</a>
					</Link>
				</li>
				<li>
					<Link href="#">
						<a className="bg-gray-600 text-white px-2 py-1">View</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default JobCardFooter;
