
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  HelpCircle, 
  Cookie
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/40 backdrop-blur-sm border-t border-muted py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Cluj Party Mapster</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate guide to explore and discover the best parties, clubs, and events in Cluj-Napoca.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <Link to="/map">Party Map</Link>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <Link to="/contact">
                  <MessageCircle className="h-4 w-4 mr-1" /> Contact
                </Link>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <Link to="/faq">
                  <HelpCircle className="h-4 w-4 mr-1" /> FAQ
                </Link>
              </Button>
              <Button variant="link" className="justify-start p-0 h-auto" asChild>
                <Link to="/cookies">
                  <Cookie className="h-4 w-4 mr-1" /> Cookies
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Social Media and Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="rounded-full" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cluj Party Mapster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
