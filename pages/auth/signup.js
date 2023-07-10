import Link from "next/link";
import Image from "next/image";

function Signup() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img
                  className="m-2 col-span-4"
                  width="80"
                  height="80"
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Quote_Mining_Fallacy_Icon.png"
                  alt="Quoted"
                />
                <h1 className="col-span-4 mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Quoted!
                </h1>
            </Link>

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
              <Link
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <img width="80" height="80" src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Quote_Mining_Fallacy_Icon.png" alt="Quoted" />
              </Link>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Quoted!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                A social network for sharing quotes!
              </p>
            </div>

            <form action="#" className="mt-8 grid grid-cols-8 gap-6">
              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                />
              </div>

              <div className="col-span-8">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
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
                  id="Password"
                  name="password"
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                />
              </div>

              <div className="col-span-8 sm:col-span-4">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="w-full h-10 border-solid border-2 rounded-lg border-gray-200 p-4 pe-12 text-base shadow-sm"
                />
              </div>

              <div className="col-span-8 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-base text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link
                    href="/auth/login"
                    className="text-gray-700 underline m-2"
                  >
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
export default Signup;
