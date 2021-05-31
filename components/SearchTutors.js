import SearchSelector from "./SearchSelector";

const SearchTutors = () => {
	return (
		<div className="bg-blue-400 mt-8 pb-4 flex flex-col justify-center items-center">
			<h2 className="text-lg text-white font-semibold text-center py-4">
				Search Home Tutor
			</h2>
			<div className="grid grid-rows-4 grid-flow-col p-6 place-content-center gap-3 md:grid-rows-2">
				<SearchSelector selectedList={[]} placeholder="Select City" />
				<SearchSelector selectedList={[]} placeholder="Select Location" />
				<SearchSelector selectedList={[]} placeholder="Select Class" />
				<SearchSelector selectedList={[]} placeholder="Select Subject" />
			</div>
			<button className="bg-yellow-500 px-3 py-2 rounded w-24">Search</button>
		</div>
	);
};

export default SearchTutors;
