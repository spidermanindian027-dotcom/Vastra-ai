export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] p-8 md:p-24 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-[#8b5cf6]">Privacy Policy</h1>
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>Last updated: October 2023</p>
        <h2 className="text-2xl font-bold text-white mt-8">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, including images for styling analysis, account details, and preferences.</p>
        <h2 className="text-2xl font-bold text-white mt-8">2. How We Use Your Information</h2>
        <p>Your images and data are used solely to provide and improve the VESTRA AI styling service. We do not sell your data.</p>
        <h2 className="text-2xl font-bold text-white mt-8">3. Data Storage</h2>
        <p>All data is encrypted in transit and at rest. You may delete your data at any time via your profile settings.</p>
      </div>
    </div>
  );
}
