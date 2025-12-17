export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto flex items-center justify-center px-6">

        <div className="text-center flex-1 border-t border-slate-700/50 p-5">
          © {new Date().getFullYear()} <span className="text-accentP">
          Mohammad Shafayet Bin Zaman
          </span>
        </div>

      </div>
    </footer>
  );
}
