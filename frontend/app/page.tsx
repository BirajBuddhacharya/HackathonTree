'use client'
import Image from 'next/image';
import NavBar from '@/components/AppComponents/NavBar';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from '@/components/AppComponents/footer'
import Link from 'next/link';

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } }
};

function useAnimateOnInView(threshold = 0.5) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: threshold, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return [ref, controls] as const;
}

function HeroSection() {
  // Split into two lines
  const lines = [
    ["Empowering", "Startup"],
    ["Fostering", "Growth"]
  ];
  const baseDelay = 0.5;
  let wordIndex = 0;

  // Animate the whole hero text on 50% view
  const [ref, controls] = useAnimateOnInView(0.5);

  return (
    <div className='h-[80vh] sm:h-[100vh] relative'>
      <Image
        src="/image/heroTree.jpg"
        alt="Tree Logo"
        width={1600}
        height={800}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/20" />
      <div
        ref={ref}
        className='relative z-20 font-bold text-white h-full flex justify-center flex-col px-4 sm:px-10 md:px-20 lg:px-32 py-10 sm:text-4xl md:text-7xl text-3xl'
      >
        {/* Animate each word with framer-motion */}
        <div className='w-auto max-w-full'>
          {lines.map((line, i) => (
            <h1 key={i} className="flex flex-wrap gap-4">
              {line.map((word) => {
                const delay = baseDelay * wordIndex;
                wordIndex++;
                return (
                  <motion.div
                    key={word}
                    variants={fadeUpVariant}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.6, delay }}
                  >
                    {word}
                  </motion.div>
                );
              })}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- FIXED BROWSE TOP CATEGORY SECTION ---
function FeaturedCategory() {
  // This will be replaced with API data later
  const categories = [
    {
      name: "Technology",
      image: "https://picsum.photos/400/300?random=1"
    },
    {
      name: "Health",
      image: "https://picsum.photos/400/300?random=2"
    },
    {
      name: "Finance",
      image: "https://picsum.photos/400/300?random=3"
    },
    {
      name: "Education",
      image: "https://picsum.photos/400/300?random=4"
    },
    {
      name: "Environment",
      image: "https://picsum.photos/400/300?random=5"
    },
    {
      name: "Retail",
      image: "https://picsum.photos/400/300?random=6"
    },
  ];

  // Animate the section on 50% view
  const [ref, controls] = useAnimateOnInView(0.5);

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariant}
      initial="hidden"
      animate={controls}
    >
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center'>
        Browse Our Top Categories
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center'>
        {categories.map((category, idx) => (
          <motion.div
            key={category.name}
            variants={fadeUpVariant}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.08 * idx }}
            className='w-full flex justify-center'
          >
            <Card
              className="h-36 sm:h-44 w-full max-w-[200px] overflow-hidden relative flex items-end flex-shrink-0 border-none shadow-md"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minWidth: '140px',
                minHeight: '140px'
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <CardContent className="relative z-10 w-full flex items-end p-3 sm:p-4">
                <h2 className="text-white text-base sm:text-lg font-semibold drop-shadow text-center w-full">
                  {category.name}
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Top Startups Section
function TopStartups() {
  // Example data, replace with API data as needed
  const startups = [
    {
      name: "GreenLeaf",
      description: "Revolutionizing urban farming with IoT-powered solutions.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "FinSage",
      description: "AI-driven personal finance assistant for Gen Z.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "HealthNest",
      description: "Connecting patients to doctors instantly, anywhere.",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      name: "EduSpark",
      description: "Interactive learning platform for STEM education.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "AquaPure",
      description: "Smart water purification for rural communities.",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      name: "EcoMove",
      description: "Sustainable urban mobility solutions for smart cities.",
      avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    },
  ];

  // Animate the section on 50% view
  const [ref, controls] = useAnimateOnInView(0.5);

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariant}
      initial="hidden"
      animate={controls}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Top Startups</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {startups.map((startup, idx) => (
          <motion.div
            key={idx}
            variants={fadeUpVariant}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.1 * idx }}
          >
            <Card
              className="flex items-center bg-gray-200/40 border-none rounded-xl p-2"
            >
              <CardContent className="flex items-center gap-3 py-2 px-3 w-full">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                  <AvatarImage src={startup.avatar} alt={startup.name} />
                  <AvatarFallback>
                    {startup.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                    {startup.name}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {startup.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function JustForYou() {
  // This will be replaced with API data later
  const products = [
    {
      name: "Wireless Headphones",
      image: "https://picsum.photos/400/300?random=11",
      price: 99.99,
      rating: 4.5,
    },
    {
      name: "Smart Fitness Watch",
      image: "https://picsum.photos/400/300?random=12",
      price: 149.99,
      rating: 4.2,
    },
    {
      name: "Portable Speaker",
      image: "https://picsum.photos/400/300?random=13",
      price: 59.99,
      rating: 4.7,
    },
    {
      name: "Eco-Friendly Water Bottle",
      image: "https://picsum.photos/400/300?random=14",
      price: 24.99,
      rating: 4.3,
    },
    {
      name: "Bluetooth Keyboard",
      image: "https://picsum.photos/400/300?random=15",
      price: 39.99,
      rating: 4.1,
    },
    {
      name: "Smart LED Lamp",
      image: "https://picsum.photos/400/300?random=16",
      price: 29.99,
      rating: 4.6,
    },
    {
      name: "Noise Cancelling Earbuds",
      image: "https://picsum.photos/400/300?random=17",
      price: 79.99,
      rating: 4.4,
    },
  ];

  // Animate the section on 50% view
  const [ref, controls] = useAnimateOnInView(0.5);

  // Helper to render stars for rating
  function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">&#9733;</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-400">&#189;</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">&#9733;</span>);
    }
    return stars;
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariant}
      initial="hidden"
      animate={controls}
    >
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 sm:mb-10'>
        For You
      </h1>
      <div className='flex gap-4 sm:gap-6 overflow-x-auto pb-4'>
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            variants={fadeUpVariant}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.1 * idx }}
            className="no-underline flex-shrink-0"
          >
            <Link href="/product/1">
              <Card
                className="w-60 sm:w-72 min-w-[220px] sm:min-w-[288px] flex flex-col overflow-hidden shadow-lg py-0"
              >
                <div className="relative h-36 sm:h-44 w-full">
                  {/* Heart icon at top right corner */}
                  <div className="absolute top-2 right-2 z-20 bg-white/40 rounded-full p-2 shadow-md cursor-pointer hover:bg-white transition">
                    <Heart size={12} className="text-gray-600" fill="none" />
                  </div>
                  <img // replace later 
                    src={product.image}
                    alt={product.name}
                    className="object-cover"
                    style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    sizes="220px"
                  />
                </div>
                <CardContent className="flex flex-col gap-1 p-3 sm:p-4 pt-8 sm:pt-10 pb-4 sm:pb-5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-900">{product.name}</h2>
                    <span className="text-lg sm:text-xl font-bold text-gray-800">Rs. {product.price.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 flex">{renderStars(product.rating)}</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-0">({product.rating})</span>
                  </div>
                  <div className="flex gap-2 mt-0">
                    <Button className="flex-1 text-xs sm:text-base" variant="default">
                      Add to Cart
                    </Button>
                    <Button className="flex-1 text-xs sm:text-base" variant="secondary">
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-[100vh] relative flex flex-col">
      <NavBar variant='ghost' />
      <HeroSection />
      <div className='px-4 sm:px-8 md:px-16 lg:px-28 py-6 sm:py-12 flex flex-col gap-16 sm:gap-24 flex-1'>
        <FeaturedCategory />
        <TopStartups />
        <JustForYou />
      </div>
      <Footer />
    </div>
  )
}