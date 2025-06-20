import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import { Eye, Target, Leaf, Users, LucideIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import myBrandLogo from '/logo 3.png';
import useParallax from '../hooks/useParallax';

const Header: React.FC = () => {
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={myBrandLogo} alt="Ophelia Brand Logo" className="w-9 h-7" />
          <span className="text-xl font-bold text-black-700">OPHELIA</span>
        </Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/signin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-green-600 hover:bg-green-50 rounded-full px-4"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-4"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Link to={user?.role === 'buyer' ? '/buyer/browse' : '/seller/dashboard'}>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full px-4"
              >
                {user?.role === 'buyer' ? 'Browse Items' : 'Dashboard'}
              </Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

const HeroSection: React.FC = () => {
  const { user } = useAuthStore();
  const isAuthenticated = !!user;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'image',
      src: '/c1.jpg',
      alt: 'Sustainable fashion'
    },
    {
      type: 'image',
      src: '/sh2.jpeg',
      alt: 'Clothing rack'
    },
    {
      type: 'image',
      src: '/c2.jpg',
      alt: 'Second-hand fashion'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[650px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.type === 'image' ? (
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={slide.src}
              className="w-full h-full object-cover"
              loop
              autoPlay
              muted
            />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
          <span className="text-white-400">OPHELIA</span>
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-fade-in-delayed">
          Join India's sustainable fashion marketplace. Buy and sell pre-loved clothing with purpose.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delayed-more">
          {isAuthenticated ? (
            <Link to={user?.role === 'buyer' ? '/buyer/browse' : '/seller/dashboard'}>
              <Button variant="secondary" size="lg">
                {user?.role === 'buyer' ? 'Browse Clothes' : 'Sell Your Clothes'}
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="secondary" size="lg">Create Account</Button>
              </Link>
              <Link to="/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:bg-opacity-10"
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

const useRevealOnScroll = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return ref;
};

const WhyOphelia: React.FC = () => {
  const sectionVisibleRef = useRevealOnScroll();

  const { elementRef: imageParallaxRef, offsetY: imageOffsetY } = useParallax(0.4);

  const { elementRef: textParallaxRef, offsetY: textOffsetY } = useParallax(0.1);

  return (
    <section
      ref={sectionVisibleRef}
      className="relative py-16 bg-cover bg-center reveal-on-scroll"
      style={{
        backgroundImage: `url('/ss4.png')`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 overflow-hidden">
        
        <div
          ref={imageParallaxRef as React.RefObject<HTMLDivElement>}
          className="flex justify-center"
          style={{ transform: `translateY(${imageOffsetY}px)` }}
        >
          <img
            src="/o1.png"
            alt="Sustainable fashion market"
            className="rounded-lg shadow-xl object-cover h-[500px] w-full max-w-md animate-slide-in-left"
            loading="lazy"
          />
        </div>

        <div
          ref={textParallaxRef as React.RefObject<HTMLDivElement>}
          className="md:pl-8 flex flex-col space-y-6"
          style={{ transform: `translateY(${textOffsetY}px)` }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-in-up">
            OPHELIA
          </h2>
          <div className="text-gray-700 text-lg leading-relaxed animate-fade-in-delayed">
            <p className="mb-4">
              Ophelia is your go-to platform for sustainable fashion.
              It's a vibrant online marketplace where you can easily buy and sell pre-loved clothing,
              connecting a community passionate about conscious consumption.
            </p>
            <p className="mb-4">
              The process is simple: create an account, list your items or browse unique finds,
              then connect directly via WhatsApp to complete exchanges. This streamlined approach makes
              sustainable fashion accessible to everyone.
            </p>
            <p>
              Ophelia helps by extending the lifecycle of clothes, significantly reducing textile waste.
              It empowers individuals to refresh their wardrobes responsibly and earn from their existing garments,
              fostering a more circular economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CapabilityItem {
  label: string;
  description: string;
  image: string;
  link: string;
}

const CapabilityCard = ({ item, index }: { item: CapabilityItem; index: number }) => (
   <Link to={item.link} className="block">
  <div
    className={`capability-card relative group bg-cover bg-center h-[320px] w-full max-w-sm mx-auto flex items-center justify-center rounded-lg overflow-hidden transition-all duration-500 opacity-0 translate-y-8 shadow-lg`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <img
      src={item.image}
      alt={item.label}
      className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
    <div className="relative z-10 text-center p-4 transform transition-transform duration-300 group-hover:translate-y-0">
      <h4 className="text-white text-xl font-bold uppercase mb-2">{item.label}</h4>
      <p className="text-white text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[250px] mx-auto">
        {item.description}
      </p>
    </div>
  </div>
  </Link>
);

const BenefitSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const capabilities: CapabilityItem[] = [
    {
      label: 'EASY PROCESS',
      description: 'Upload clothes easily with multiple photos',
      image: '/sh14.png',
      link: '/process-details'
    },
    {
      label: 'DIRECT COMMUNICATION',
      description: 'Message sellers directly on WhatsApp with ease',
      image: '/sh12.png',
      link: '/communication-details'
    },
    {
      label: 'DIVERSE SELECTION',
      description: 'Shop by gender, category, or style with clarity',
      image: '/sh11.png',
      link: '/selection-details'
    },
    {
      label: 'AFFORDABLE',
      description: 'Access quality secondhand clothes at fraction of retail prices',
      image: '/sh10.png',
      link: '/affordable-details'
    },
    {
      label: 'EARN MONEY',
      description: 'Generate income from clothes you don\'t use anymore',
      image: '/sh15.png',
      link: '/earn-money-details'

    },
    {
      label: 'SUSTAINABLE',
      description: 'Join the sustainable fashion movement',
      image: '/sh17.png',
      link: '/sustainable-details'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.capability-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('is-visible');
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 pl-4 pr-8 mb-4 md:mb-0 md:text-left">
            Capabilities
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Ophelia offers best-in-class platforms to redefine fashion experiences, seamlessly connecting buyers and sellers. We deliver meaningful outcomes by transforming clothes waste to their best, actively helping nature. Our solutions enable widespread re-wearing with unparalleled speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {capabilities.map((item, i) => (
            <CapabilityCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface VisionMissionItem {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  link: string;
}

const VisionMissionCard: React.FC<{ item: VisionMissionItem }> = ({ item }) => {
  return (
    <Link to={item.link} className="block">
    <div className="relative group bg-white overflow-hidden border border-gray-200">
      <div className="text-center py-24 bg-white border-b border-gray-200 flex flex-col items-center justify-center h-72">
        {item.icon && (
          <item.icon className="w-12 h-12 mb-4 text-gray-700" />
        )}
        <h3 className="text-xl font-bold text-gray-800 uppercase px-4">
          {item.title}
        </h3>
      </div>

      <div className="relative w-full h-72">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-500 ease-in-out
                           group-hover:translate-y-full"
        />
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-0
                           transition-opacity duration-300 delay-200
                           group-hover:bg-opacity-90 group-hover:opacity-100">
          <p className="text-white text-base text-center
                           opacity-0 transition-opacity duration-300 delay-300
                           group-hover:opacity-100">
            {item.description}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

const OurVisionMission: React.FC = () => {
  const visionMissionItems: VisionMissionItem[] = [
    {
      title: 'Vision',
      description: 'To be India\'s leading platform for sustainable fashion, making pre-loved clothing the first choice for conscious consumers.',
      image: '/ss1.png',
      icon: Eye,
      link:'/vision'
    },
    {
      title: 'Mission',
      description: 'Empowering individuals to extend the life cycle of clothing, reduce textile waste, and foster a community that embraces eco-friendly fashion choices.',
      image: '/ss2.png',
      icon: Target,
      link:'/mission'
    },
    {
      title: 'Impact',
      description: 'Creating a positive environmental and social impact by promoting circular fashion and supporting local communities through conscious consumption.',
      image: '/ss3.png',
      icon: Leaf,
      link:'/impact'
    },
    {
      title: 'Community',
      description: 'Building a vibrant community of fashion enthusiasts who share a passion for sustainability and ethical consumption.',
      image: '/ss4.png',
      icon: Users,
      link:'/community'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0 md:w-1/2">
            Vision & Mission
          </h2>
          <p className="mt-4 text-lg text-gray-600 md:w-1/2 md:pl-8">
            Ophelia's core vision is to unite buyers and sellers under one roof, fostering a thriving community dedicated to sustainable fashion. Our mission focuses on actively helping nature by promoting the invaluable practice of re-wearing clothes, transforming textile waste into cherished items. We're committed to making eco-conscious choices accessible and impactful for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {visionMissionItems.map((item, index) => (
            <VisionMissionCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PromoImageSection: React.FC = () => {
  return (
    <section>
      <img
        src="/o2.png"
        alt="Ophelia Promotional Banner"
        className="w-full h-[900px] object-cover"
      />
    </section>
  );
};

const brandLogos = [
  { name: 'Nike', src: '/i1.jpeg' },
  { name: 'Nike', src: '/i2.jpeg' },
  { name: 'Nike', src: '/i3.jpg' },
  { name: 'Nike', src: '/i4.webp' },
  { name: 'Nike', src: '/i5.webp' },
  { name: 'Nike', src: '/i6.webp' },
  { name: 'Nike', src: '/i7.webp' },
  { name: 'Nike', src: '/i8.webp' },
  { name: 'Nike', src: '/i9.avif' },
  { name: 'Nike', src: '/i10.webp' },
  { name: 'Nike', src: '/i11.webp' },
  { name: 'Nike', src: '/i12.jpg' },
  { name: 'Nike', src: '/i13.png' },
  { name: 'Nike', src: '/i14.png' },
  { name: 'Nike', src: '/i15.webp' },
  { name: 'Nike', src: '/i16.jpg' },
  { name: 'Nike', src: '/i17.png' },
];

const ImageBannerSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const brandsPerPage = 4;

  const nextBrands = () => {
    setCurrentIndex((prevIndex) => (prevIndex + brandsPerPage) % brandLogos.length);
  };

  const prevBrands = () => {
    setCurrentIndex((prevIndex) => (prevIndex - brandsPerPage + brandLogos.length) % brandLogos.length);
  };

  const displayedBrands = [];
  for (let i = 0; i < brandsPerPage; i++) {
    displayedBrands.push(brandLogos[(currentIndex + i) % brandLogos.length]);
  }

  return (
    <section className="py-16 bg-[#e7edf4] min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        SHOP FOR POPULAR BRANDS
      </h2>

      <div className="relative w-full max-w-[1200px] flex items-center justify-center mb-20">
        <button
          onClick={prevBrands}
          className="absolute left-4 md:left-8 -translate-x-full md:-translate-x-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label="Previous brands"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div className="flex justify-center items-center overflow-hidden w-full space-x-10 md:space-x-20">
          {displayedBrands.map((brand) => (
            <div key={brand.name} className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className="max-w-full max-h-full object-contain filter transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <button
          onClick={nextBrands}
          className="absolute right-4 md:right-8 translate-x-full md:translate-x-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
          aria-label="Next brands"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <Link to="/explore">
          <Button
            className="bg-[#28A745] text-white hover:bg-[#218838] px-8 py-4 rounded-lg text-lg font-semibold shadow-md"
          >
            Explore Now
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            className="bg-[#FFC107] text-gray-800 hover:bg-[#e0a800] px-8 py-4 rounded-lg text-lg font-semibold shadow-md"
          >
            Join Ophelia Today
          </Button>
        </Link>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white-50 ">
      <Header />
      <HeroSection />
      <WhyOphelia />
      <BenefitSection />
      <ImageBannerSection/>
      <OurVisionMission />
      <PromoImageSection />
    </div>
  );
};

export default Home;