import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from "react-router-dom";


type Inputs={
    current_password:string;
    new_password:string;
    token:string;
}

function ResetPassword() {
    const nav = useNavigate();
    let [isOpen, setIsOpen] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const closeModal = () => {
        setIsOpen(false)
    }
    const [error, setError] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async (data:Inputs) => {
        const{current_password,new_password}=data;
        console.log(current_password,new_password);
       const token=localStorage.getItem("authToken");
       console.log(token);
        try {
            const response = await fetch(`${API_ENDPOINT}/user/password`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" ,
              "Authorization": "Bearer " + token},
              body: JSON.stringify({ current_password, new_password }),
            });
      
            if (response.ok) {
                setIsOpen(false);
                console.log("Password Reset successful");
              
            } else{
                setError(true)
                throw new Error("Rest Password Failed");
            }
      
            nav("/home/matches");
          } catch (error) {
            console.error("Reset Password Failed:", error);
          }
    }

    return (
        <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Reset Your Password</Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error &&
                        <span>{error}</span>
                    }
                    <input
                        type="text"
                        placeholder='Enter Current Password'
                        autoFocus
                        {...register('current_password', { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.current_password ? 'border-red-500' : ''
                            }`}
                    />
                     {errors.current_password && <span>This field is required</span>}
                     <input
                        type="text"
                        placeholder='Enter New Password'
                        autoFocus
                        {...register('new_password', { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.new_password ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.new_password && <span>This field is required</span>}
                    <button type="submit"  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Submit
                    </button>
                    <button type="submit" onClick={closeModal} className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Cancel
                    </button>
                </form>
            </Dialog.Panel>
            </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition>
        </>
    )
}
export default ResetPassword;