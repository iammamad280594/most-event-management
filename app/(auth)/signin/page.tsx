// app/signin/page.js
import SignInForm from '../_component/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <SignInForm />
      </div>
    </div>
  );
}
