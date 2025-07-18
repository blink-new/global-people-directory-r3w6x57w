import { Link } from 'react-router-dom'
import { User, Mail, Shield, FileText } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl">PeopleDir</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The world's free global people directory. Connect, discover, and showcase professional profiles.
            </p>
          </div>

          {/* Directory */}
          <div className="space-y-4">
            <h3 className="font-semibold">Directory</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Profiles
                </Link>
              </li>
              <li>
                <Link to="/search?verified=true" className="text-muted-foreground hover:text-foreground transition-colors">
                  Verified Profiles
                </Link>
              </li>
              <li>
                <Link to="/search?type=public-figure" className="text-muted-foreground hover:text-foreground transition-colors">
                  Public Figures
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-muted-foreground hover:text-foreground transition-colors">
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-foreground transition-colors">
                  Report Content
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PeopleDir. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" />
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              <Shield className="h-4 w-4" />
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}