import React from 'react';
import Logo from '../../assets/images/hero.jpg'
import { Link } from 'react-router-dom';
const Hello: React.FC = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src={Logo} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">All Sports Information
              <br className="hidden lg:inline-block" />On Your Finger Tips!!!
            </h1>
            <p className="mb-8 leading-relaxed">Are you a sports enthusiast who wants to keep up with the most recent reports, results, and evaluations from the sports world? If the answer is yes, you've found the proper site.</p> <a className='font-bold'> Welcome to Sports Prime</a>
            <div className="flex justify-center">
              <Link to='/signin' > <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button> </Link>
              <Link to='/matches'> <button className="ml-4 inline-flex text-white bg-indigo-500  hover:bg-indigo-600 border-0 py-2 px-6 focus:outline-none rounded text-lg">Continue Without Login</button> </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Hello;