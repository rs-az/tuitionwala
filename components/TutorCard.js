import Image from "next/image";
const TutorCard = ({ imageUrl, name, quote }) => {
	return (
		<div className="flex justify-center w-96 h-56 space-x-6 rounded-lg border-2 border-gray-100 mx-4 my-4">
			<div className="flex flex-col justify-center">
				<p className="px-4 text-gray-500">{quote}</p>
				<h3 className="text-right mx-4 text-gray-500 font-semibold">-{name}</h3>
			</div>
			<img src={imageUrl} className="w-32" />
		</div>
	);
};

export default TutorCard;
