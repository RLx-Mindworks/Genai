import { useState } from 'react';

interface User {
  name: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: userName, email: userEmail });
    setUserName('');
    setUserEmail('');
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-white p-4">
        <h1 className="text-3xl font-bold">My Awesome App</h1>
      </header>
      <main className="container mx-auto p-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">User Input</h2>
          {!user ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="userEmail" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          ) : (
            <div>
              <p className="text-gray-700">
                Welcome, {user.name}! Your email is {user.email}.
              </p>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </div>
          )}
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">Feature 1</h3>
              <p className="text-gray-700">Description of feature 1.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">Feature 2</h3>
              <p className="text-gray-700">Description of feature 2.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold mb-2">Feature 3</h3>
              <p className="text-gray-700">Description of feature 3.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-secondary text-white p-4 text-center">
        <p>&copy; 2024 My Awesome App</p>
      </footer>
    </div>
  );
};

export default HomePage;
