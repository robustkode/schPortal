import Link from "next/link";
import Subscribe from "./subscribe";

export default function Footer() {
  return (
    <footer className="bg-primary-var">
      <div className="main-container text-gray-100">
        <div className="py-8 mb-4">
            <Subscribe />
        </div>
        <hr className="border-gray-600"/>
        <div className="flex items-center justify-between py-4">
        <Link href="/Logo" className="header"><strong>EthioAcademy</strong></Link>
        <Link href="/">Blog</Link>
        <Link href="/">Contact</Link>
        <p className="text-gray-700">&copy; Copyright 2024 EthioAcademy</p>
        </div>
        
      </div>
    </footer>
  );
}
