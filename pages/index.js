import Image from 'next/image';

const Home = () => {
  return (
    <div class='bg-gray-100 h-screen'>
      <div className='bg-gray-100 w-full  grid place-content-center text-2xl pt-4'>
        <div className='inline-flex items-center justifySelf text-4xl font-medium text-red-900 hover:underline cursor-pointer'>
          <Image src='/images/whatsapp.svg' width='50' height='50'></Image>
          <a href='https://wa.me/message/L7A5BB7BOMIAK1'>
            Contact Us on Whatsapp
          </a>
        </div>

        <div className='inline-flex items-center justifySelf text-4xl mt-4 font-medium text-red-900 hover:underline cursor-pointer'>
          <Image src='/images/fb.svg' width='50' height='50'></Image>
          <a href='https://www.facebook.com/Tuition8182837919/?ti=as'>
            Contact Us on Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
