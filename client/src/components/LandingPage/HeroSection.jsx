import HeroSVG from "./HeroSVG";

export default function HeroSection() {
  return (
    <main className='flex flex-col lg:flex-row-reverse justify-center items-center text-white text-center bg-gradient-to-r from-gray-900 to-gray-800'>
      <div className="w-[70%] pl-40 animate-pulse lg:w-[30%] lg:p-0">
        <HeroSVG />
      </div>
      <div className="md:pt-[8%]">
        <h1 className='font-bold text-6xl text-yellow-500'>Hostel <span className='text-blue-500'>Management</span> System</h1>
        <br/>
        <div className="py-20">
          <a href="/auth/login" className="bg-yellow-500 py-3 px-40 hover:bg-yellow-600 transition rounded text-2xl">Login</a>
          <p className="mt-6 mb-3">OR</p>
          <a href="/auth/request" className="text-xl hover:underline hover:text-yellow-500">Request Registration</a>
        </div>
      </div>
    </main>
  );
}
