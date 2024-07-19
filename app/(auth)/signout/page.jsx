// import { useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// export default function SignOutPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const signOut = async () => {
//       await axios.post('/api/auth/signout');
//       router.push('/signin');  // Redirect to sign-in page after sign out
//     };

//     signOut();
//   }, [router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <p className="text-xl">You are being signed out...</p>
//       </div>
//     </div>
//   );
// }
