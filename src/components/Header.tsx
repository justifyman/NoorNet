export default function Header() {
  return (
    <div className="flex justify-end p-3 md:p-4 space-x-2 md:space-x-4">
      <button className="text-gray-400 hover:text-white text-xs md:text-sm">Report Bug</button>
      <button className="text-gray-400 hover:text-white text-xs md:text-sm">Sign Up</button>
      <button className="text-gray-400 hover:text-white text-xs md:text-sm">Sign In</button>
    </div>
  );
}
