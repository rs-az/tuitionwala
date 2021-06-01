import Services from './Services';

const Hero = () => {
  return (
    <>
      <main className='flex pb-12 justify-around items-center bg-gradient-to-b from-blue-400 to-pink-300'>
        <div className='text-white px-2 flex flex-col md:items-center'>
          <h1 className='text-2xl'>Find best Home Tutor</h1>
          <p className='text-sm w-52'>
            Search for the best home tutor in your local area and get one to one
            free trial session.
          </p>
          <a className='text-md mt-4 bg-yellow-500 rounded px-3 py-1 mx-4 text-center rounded block'>
            Hire Tutor
          </a>
        </div>
        <img src='./images/hero.png' alt='hero' className='hidden md:flex' />
      </main>
      <Services />
    </>
  );
};

export default Hero;
