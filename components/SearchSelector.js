const SearchSelector = ({ selectorList, placeholder }) => {
	return (
		<div className="">
			<input
				list="cities"
				placeholder={placeholder}
				className="h-8 flex-1 border-2 border-gray-100 text-gray-600 focus:outline-none"
			/>

			<datalist id="cities">
				<option value="Mumbai"></option>
				<option value="Delhi"></option>
				<option value="Kolkata"></option>
				<option value="Chennai"></option>
				<option value="Hydrabad"></option>
			</datalist>
		</div>
	);
};

export default SearchSelector;
