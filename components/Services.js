const Services = () => {
	const services = [
		{
			id: "1",
			name: "Courses",
			desc: "100+ courses from all subjects to all classes",
			icon: "./images/courses.png",
		},
		{
			id: "2",
			name: "Expert Home Tutors",
			desc: "We provide 800+ tutors for all subjects",
			icon: "./images/instructors.png",
		},
		{
			id: "3",
			name: "Tution Jobs",
			desc: "We provide 50000+ jobs from all over india and you local area",
			icon: "./images/clock.png",
		},
	];
	return (
		<div className="flex justify-center flex-col items-center space-y-8 -mt-8 md:flex-row md:space-x-8 md:space-y-0 ">
			{services.map((e, i) => (
				<div
					key={i}
					className="flex items-center bg-white px-4 py-0 shadow text-gray-600 text-sm w-64 h-32 rounded-lg"
				>
					<img src={e.icon} alt="" className="h-12" />
					<div className="flex flex-col">
						<h3 className="font-semibold">{e.name}</h3>
						<p>{e.desc}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Services;
