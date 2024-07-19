'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type SignUpData = {
  name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'CREATOR';
  referralCode?: string;
};

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const initialValues: SignUpData = {
    name: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
    referralCode: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.mixed<'CUSTOMER' | 'CREATOR'>().oneOf(['CUSTOMER', 'CREATOR']).required('Role is required'),
    referralCode: Yup.string(),
  });

  const handleSignUp = async (values: SignUpData) => {
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();

      if (data.success) {
        // Save user status to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', values.email);
        localStorage.setItem('userType', values.role);

        // Redirect to the home page
        router.push('/');
      } else {
        throw new Error('Sign up failed');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSignUp(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Field
              as="select"
              id="role"
              name="role"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="CREATOR">Creator</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500" />
          </div>
          <div>
            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
              Referral Code
            </label>
            <Field
              type="text"
              id="referralCode"
              name="referralCode"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="referralCode" component="div" className="text-red-500" />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
