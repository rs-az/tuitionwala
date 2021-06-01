import Image from 'next/image';
import Link from 'next/link';
const AboutUs = () => {
  return (
    <div className='bg-blue-300 py-6'>
      <div className='grid gap-6 place-content-center w-3/4 mx-auto text-xl bg-white py-4 px-4'>
        <p>
          TuitionWala is a portal for both students/parents seeking top-quality
          tuition teachers, as well as tuition teachers looking for consistent,
          part-time income via teaching assignments in their preferred
          localities. We act as a quality interface, working with students,
          parents and tuition teachers all over India, supporting their
          educational endeavors.
        </p>
        <Image
          src='https://thetuitionteacher.com/wp-content/uploads/2012/04/corses.jpg'
          className='w-96'
          width={543}
          height={200}
        />
        <p>
          Kindly explore tuitionwala.in to learn how we can help you as a
          Student/Parent or as a tuition teacher.
        </p>
        <p>
          For Student/Parent to find the perfect tuition teacher to match your
          needs, kindly request at :{' '}
          <Link href='#'>
            <a className='font-semibold'>Request a tuition teacher</a>
          </Link>
        </p>
        <p>
          For tuition teachers looking for part-time teaching assignments, you
          are requested to use the tuition teacher registration link to find
          jobs matching your set parameters. At TheTuitionTeacher.com, we have a
          set of chosen core values that drive us as a team to build tomorrow’s
          leaders
        </p>
        <h1 className='text-2xl font-medium text-center'>
          Our aim is simple - To bring teachers, students & parents together and
          improve the standard of tutoring!
        </h1>
      </div>
    </div>
  );
};

export default AboutUs;
