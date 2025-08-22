import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error('All fields are required');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error('Invalid email address');
    }
    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success===true) signup(formData);

  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-[var(--color-card)] shadow sm:rounded-lg flex justify-center flex-1 border border-[var(--color-border)]">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-bold text-[var(--color-text)] mb-6">
              Sign up
            </h1>
            <div className="w-full flex-1 mt-8">

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium 
                               bg-[var(--color-secondary)] border border-[var(--color-border)] 
                               placeholder-[var(--color-text)]/60 text-sm 
                               focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-card)] mt-5"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium 
                               bg-[var(--color-secondary)] border border-[var(--color-border)] 
                               placeholder-[var(--color-text)]/60 text-sm 
                               focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-card)] mt-5"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium 
                               bg-[var(--color-secondary)] border border-[var(--color-border)] 
                               placeholder-[var(--color-text)]/60 text-sm 
                               focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-card)] mt-5"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]/70"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="relative mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium 
                                 bg-[var(--color-secondary)] border border-[var(--color-border)] 
                                 placeholder-[var(--color-text)]/60 text-sm 
                                 focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-card)]"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]/70"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold 
                               bg-[var(--color-accent)] text-[var(--color-bg)] 
                               w-full py-4 rounded-lg hover:opacity-90 
                               transition-all duration-300 ease-in-out 
                               flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 008-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                    )}
                    <span className="ml-3">
                      {isSigningUp ? "Signing Up..." : "Sign Up"}
                    </span>
                  </button>
                </form>
                <p className="mt-6 text-xs text-[var(--color-text)]/80 text-center">
                  I agree to abide by knot's{' '}
                  <Link to="#" className="border-b border-[var(--color-border)] border-dotted">
                    Terms of Service{' '}
                  </Link>
                  and its{' '}
                  <Link to="#" className="border-b border-[var(--color-border)] border-dotted">
                    Privacy Policy{' '}
                  </Link>
                </p>
                <p className="mt-4 text-sm text-[var(--color-text)] text-center">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[var(--color-accent)] hover:underline font-semibold"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[var(--color-secondary)] text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background.png')",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage