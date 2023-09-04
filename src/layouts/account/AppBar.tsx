import { useState, useContext, Fragment } from 'react'
import { ThemeContext } from "../../context/theme";
import { Disclosure, Menu, Transition, Switch } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Logo from "../../assets/images/logo.jpg"
import { Link } from "react-router-dom"

const userNavigation = [
  { name: 'Sign out', href: '/logout' },
]
const userData = JSON.parse(localStorage.getItem('userData')|| '{}');

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  // const { pathname } = useLocation()
  const { theme, setTheme } = useContext(ThemeContext)
  const [enabled, setEnabled] = useState(theme === 'dark')
  const toggleTheme = () => {
    if(theme==="light"){
     var newTheme = "dark";
document.documentElement.classList.add("dark");
}
else{
newTheme="light";
document.documentElement.classList.remove("dark");
}
    setEnabled(!enabled)
    setTheme(newTheme)
  }

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-300">
        {({  }) => (
            
          <div>
            <div className="flex px-6 justify-between">
              <div className="flex items-center">
              <Link to='/'>  <div className="flex">
                    <img
                    className="h-8 w-auto"
                    src={Logo}
                    alt="Sports Prime"
                  />
                  
                </div> </Link>
                <h1 className='text-justify px-2 py-2 font-semibold text-xl'>Sports Prime</h1>
              </div>
              <Switch
        checked={enabled}
        onChange={toggleTheme}
        className={`${enabled ? 'bg-slate-400' : 'bg-slate-700'}
          relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white  ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          { (userData.email)?
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1  ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>


                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            :""
}
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;