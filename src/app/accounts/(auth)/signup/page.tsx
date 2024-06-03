'use client';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
     // useState and other hooks here...
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  // useEffect hook to navigate to a new page after successful form submission
  useEffect(() => {
    if (isSubmitting) {
      router.push('/'); // Replace '/' with the path of your success page
    }
   });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // useRouter hook to navigate to a new page
  const router = useRouter();
  
  // Handle input changes and update state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          alert('Sign up successful');
        } else {
          alert(result.message || 'An error occurred');
        }
      } catch (error) {
        alert('An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }

  
   //[isSubmitting, router]);

  // handleSubmit function
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form data submitted successfully');
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('An error occurred while submitting form data:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

};

  return (
    <main className="flex flex-col min-h-screen justify-evenly p-6 bg-black smm:p-4 sm:flex-row smm:items-center">
      <div className="w-full sm:w-1/2 m-5 p-5">
        <Link href="/">
          <div className="flex flex-row items-center no-underline font-bold text-sm lg:text-base mb-4">
            <a className="flex items-center gap-1">
              <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
              <p aria-label="Genius Tech Space">BBRI</p>
            </a>
          </div>
        </Link>
        <h1 className="font-semibold font-mono text-2xl md:text-4xl xl:text-5xl">
          Become a <span className="text-orange-600">BBRISchooler <span>🧡</span></span>
        </h1>
        <p className="font-semibold font-mono text-2xl md:text-2xl xl:text-5xl">
          The Developers Space
        </p>
        <div className="mt-5">
          {/* <img src="/images/research.jpg" alt="Data Driven Research" className="w-full h-auto" /> */}
          <Image
            className="w-full h-auto"
            src="/images/research.jpg"
            alt="Data Driven Research"
            width={500} // replace with actual width
            height={300} // replace with actual height
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full sm:w-1/3 ring-1 ring-white border-1 rounded-md m-3 p-5 shadow bg-white smm:p-4">
        <p className="font-bold text-black text-left smm:text-[20px] m-auto pt-3">Sign Up</p>
        <p className="font-bold text-black text-center m-auto pt-6 smm:text-[12px] smm:pt-3">
          Become a BrainBox Researcher. Free to use, easy to love
        </p>
        <div className="flex justify-center mt-5">
          <button type="button" className="flex items-center text-black w-9/12 border rounded-full h-9 justify-evenly font-normal hover:text-white hover:bg-blue-300 smm:text-[12px]">
            <Image src="/images/google.png" alt="Google Logo" width={24} height={24} className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>
        <div className="flex items-center justify-center my-5">
          <div className="border-t border-gray-400 flex-grow mr-3"></div>
          <span className="text-gray-400 font-normal">or</span>
          <div className="border-t border-gray-400 flex-grow ml-3"></div>
        </div>
        <div className="flex flex-col -mx-3 mb-6 mt-6">
          <div className="w-full px-3 mb-4">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="firstName">
              First name<span className="text-red-500">*</span>
            </label>
            <input
              className="bg-transparent appearance-none block w-full h-9 text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
          </div>
          <div className="w-full px-3 mb-4">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="lastName">
              Last name<span className="text-red-500">*</span>
            </label>
            <input
              className="bg-transparent appearance-none block w-full h-9 text-gray-700 border rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
          </div>
        </div>
        <div className="flex flex-col -mx-3 mb-6">
          <div className="w-full px-3 mb-4">
            <label className="block text-gray-700 text-xs font-normal mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              className="bg-transparent appearance-none block w-full h-9 text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="w-full px-3">
            <label className="block tracking-wide text-gray-700 text-xs font-normal mb-2" htmlFor="password">
               Password<span className="text-red-500">*</span>
            </label>
            <input
              className="bg-transparent appearance-none block w-full h-9 text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
        </div>
        <div className="flex -mx-3 mb-6 ml-3">
          <input type="checkbox" className="default:ring-2 ..." />
          <p className="ml-2 text-black">
            I agree to the <span className="text-blue-500">terms of service</span> and <span className="text-blue-500">privacy policy</span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white border rounded-full font-normal h-9 m-3 hover:bg-black hover:text-orange-500 smm:mt-0"
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </main>
  );
}

