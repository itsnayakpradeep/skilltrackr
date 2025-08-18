import React from 'react';
import Image from 'next/image';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const testimonials: { name: string; feedback: string; image: string; rating: number }[] = [
  {
    name: "Sarah Moore",
    feedback: "An excellent tool for tracking skill development, highly recommended!",
    image: "/assets/images/lady-1.webp",
    rating: 5
  },
  {
    name: "Ently Chen",
    feedback: "Uploading achievements is a hassle. For practical use/superior experience.",
    image: "/assets/images/man.webp",
    rating: 4
  },
  {
    name: "Janies Lee",
    feedback: "The AI suggestions have been instrumental for my learning process.",
    image: "/assets/images/lady-2.webp",
    rating: 5
  },
  {
    name: "Felix Johnson",
    feedback: "A great platform for visualizing my progress and achievements. Highly effective!",
    image: "/assets/images/man-1.webp",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center font-heading">What Our Users Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <Image 
              src={testimonial.image} 
              alt={testimonial.name} 
              width={64} 
              height={64} 
              className="rounded-full mb-2 object-cover" 
            />
            <StarRating rating={testimonial.rating} />
            <p className="text-gray-600 mb-2">{testimonial.feedback}</p>
            <h3 className="font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
