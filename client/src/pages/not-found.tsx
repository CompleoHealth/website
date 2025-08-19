import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/common/back-to-top';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <h1 className="heading-1 text-compleo-deep-teal mb-4">404</h1>
            <h2 className="heading-2 text-compleo-deep-teal mb-6">Page Not Found</h2>
            <p className="body-large text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-br from-compleo-teal via-compleo-teal to-compleo-deep-teal hover:shadow-xl hover:scale-105 text-white font-bold px-8 py-3 rounded-xl shadow-xl border-2 border-compleo-teal/20 backdrop-blur-sm transition-all duration-300">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="bg-compleo-yellow hover:bg-compleo-gold text-compleo-deep-teal border-2 border-compleo-yellow font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}
