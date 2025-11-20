import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-uw-gray text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: BadgerSpace */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🦡</span>
              <span className="text-xl font-bold text-white">BadgerSpace</span>
            </div>
            <p className="text-slate-300 text-sm">
              Connect UW students with available spaces
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-slate-300 hover:text-white transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@badgerspace.com" className="hover:text-white transition-colors">
                  hello@badgerspace.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-center text-sm text-slate-400">
            © 2025 BadgerSpace. Built for UW-Madison students.
          </p>
          <p className="text-center text-xs text-slate-500 mt-2">
            BadgerSpace is a connection platform only. We do not facilitate transactions or verify arrangements. Users are responsible for obtaining landlord permissions.
          </p>
        </div>
      </div>
    </footer>
  );
}

