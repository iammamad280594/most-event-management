// app/register/page.js
export default function SignUpPage() {
  return (
    <div className="container mx-auto my-8 p-4 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input type="text" id="name" name="name" className="border p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" className="border p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input type="password" id="password" name="password" className="border p-2 rounded w-full" required />
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
