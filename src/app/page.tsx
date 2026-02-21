export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            RentSafe-ai
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Safe and Secure Property Rental Platform
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Find Properties
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              List Your Property
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              🔒 Secure Transactions
            </h3>
            <p className="text-gray-600">
              Safe and verified payments for both tenants and landlords.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              🏠 Verified Properties
            </h3>
            <p className="text-gray-600">
              All properties are verified to ensure quality and authenticity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              🤖 AI-Powered
            </h3>
            <p className="text-gray-600">
              Smart recommendations based on your preferences.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
