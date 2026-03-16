import Hero from '../components/Hero'
import Features from '../components/Features'
import Courses from '../components/Courses'
import JobsCarousel from '../components/JobsCarousel'
import Testimonials from '../components/Testimonials'
import LocationMap from '../components/LocationMap'

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <Courses />
            <JobsCarousel />
            <Testimonials />
            <LocationMap />
        </>
    )
}

export default Home
