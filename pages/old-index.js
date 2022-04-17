import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import JobCarousel from "../components/JobCarousel";
import SearchTutors from "../components/SearchTutors";
import TutorCard from "../components/TutorCard";
import ViewAllBtn from "../components/ViewAllBtn";

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faThumbsUp } from '@fortawesome/pro-regular-svg-icons';
// library.add(faThumbsUp);

export default function Home() {
	const quotes = [
		{
			name: "John Doe",
			profileUrl: "https://placekitten.com/200/200",
			remarks:
				"Good. They provides tuition jobs instantly. I have the best experience with The Tuition Teacher.com",
		},
		{
			name: "Jack Daniel",
			profileUrl: "https://placekitten.com/201/200",
			remarks:
				"A very good company, helpful for both parent and for those who want to earn from part time job , so nice that I am in touch with the Tuition Teacher.",
		},
		{
			name: "Denice",
			profileUrl: "https://placekitten.com/202/200",
			remarks:
				"The tuition teacher is the best platform to connecting with study, especially for those who are pursuing preparation. The tuition teacher provide best facility for both teacher and parents.",
		},
	];
	return (
		<>
			<Hero />
			<SearchTutors />
			<div className="flex flex-col items-center mt-4">
				<h1 className="text-lg font-semibold">
					Recently Joined Tutors <ViewAllBtn hrefLink="#" />
				</h1>
				<div className="flex flex-col items-center lg:flex-row">
					{quotes.map((e, i) => (
						<TutorCard
							key={i}
							imageUrl={e.profileUrl}
							name={e.name}
							quote={e.remarks}
						/>
					))}
				</div>
			</div>
		</>
	);
}
