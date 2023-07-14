import { useState } from "react";
import Logo from "@/components/layout/Logo";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";


function SignupForm() {
  const router = useRouter();
  const { user, signup } = useAuthContext();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const user = await signup(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password
      );
      if (user) {
        router.push("/home");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(userData);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:relative lg:block lg:p-12">
            <Logo />
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Quoted!
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              A simple app to share quotes with your friends.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center w-full px-2 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative block lg:hidden">
              <Logo />

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Quoted!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                A social network for sharing quotes!
              </p>
            </div>

            <form
              onSubmit={handleSignup}
              className="mt-8 grid grid-cols-8 gap-6"
            >
              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-8">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={userData.passwordConfirmation}
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-span-8 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Sign up
                </button>

                <p className="mt-4 text-base text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link href="/login" className="text-gray-700 underline m-2">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
export default SignupForm;
