import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-primary mb-3">
              <Logo className="h-7 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A service by Red Reach Middle East FZE, Dubai. Connecting patients worldwide with India's finest hospitals.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#/hospitals" className="hover:text-primary transition-colors">Our Hospitals</a></li>
              <li><a href="#/estimate" className="hover:text-primary transition-colors">Cost Estimator</a></li>
              <li><a href="#/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Treatment Areas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cardiac Surgery</li>
              <li>Orthopedics</li>
              <li>Oncology</li>
              <li>Fertility & IVF</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Red Reach Middle East FZE</li>
              <li>Dubai, United Arab Emirates</li>
              <li>info@rrmedcare.com</li>
              <li>+971-4-XXX-XXXX</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} RRmedcare by Red Reach Middle East FZE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
