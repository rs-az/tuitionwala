import JobCardFooter from "./JobCardFooter";
import ViewAllBtn from "./ViewAllBtn";

const JobCarousel = () => {
	return (
		<>
			<h1 className="text-xl font-semibold text-center">
				Leatest Tuition Jobs <ViewAllBtn hrefLink="#" />
			</h1>
			<div className="my-2 border-t-2 border-gray-100 flex ">
				<div className="slider">
					<div className="slide-track">
						{Array.apply(null, { length: 14 }).map((e, i) => (
							<JobCardFooter
								className="slide"
								key={i}
								area="Lucknow"
								parent="Rohit Singh"
								tuition="Nursery- All Subjects"
								gender="female"
								requirement="want female teacher for english language assdladwdn endqewfj af  
                                mcc,sdc';dl'
                                dsamdda'das
                                adlmc;s,s'd
                                adlmcd;cA
                                 ASC;DCSD'S
                                d efedjqodj jdjodjd d ajdjd dd djedeod dwed wdowjed"
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default JobCarousel;
