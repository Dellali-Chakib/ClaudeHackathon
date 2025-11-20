import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Search, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/download.png"
            alt="State Street, Madison looking towards Wisconsin State Capitol"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect Space at UW-Madison
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200">
            Connect with verified students for summer housing, storage, and short-term stays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-uw-red hover:bg-uw-red/90" asChild>
              <Link href="/browse">Browse Listings</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <Link href="/create">Post Your Space</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-uw-red mb-2">$3,200</div>
              <div className="text-slate-600">Average savings per student</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-uw-red mb-2">30,000+</div>
              <div className="text-slate-600">UW students with year-round leases</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-uw-red mb-2">100%</div>
              <div className="text-slate-600">Verified UW-Madison students</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-uw-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-uw-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Your Space</h3>
              <p className="text-slate-600">
                List available dates and pricing for your space. It only takes a few minutes.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-uw-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-uw-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Connect</h3>
              <p className="text-slate-600">
                Filter by dates, location, and price to find the perfect space for your needs.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-uw-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-uw-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communicate Directly</h3>
              <p className="text-slate-600">
                Arrange details with verified students through secure messaging.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

