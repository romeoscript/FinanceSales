import { useState } from 'react';
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
// import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQItem[] = [
    {
      question: "Why is Emmanuel so good at UI/UX design?",
      answer: "Emmanuel's has always had the curiosity to explore, build and think outside the box. He always finds a reason to pursue his passions and desires, regardless of how they appear to others."
    },
    {
      question: "Why is Emmanuel so good at UI/UX design?",
      answer: "Emmanuel brings a unique perspective to design challenges and consistently delivers innovative solutions."
    },
    {
      question: "Why is Emmanuel so good at UI/UX design?",
      answer: "His combination of technical skills and creative vision allows him to excel in UI/UX design."
    },
    {
      question: "Why is Emmanuel so good at UI/UX design?",
      answer: "Through continuous learning and experimentation, Emmanuel has developed a strong foundation in design principles."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg">
        <div className="mb-8">
          <div className="bg-gray-100 inline-block px-4 py-2 rounded-full">
            <span className="text-gray-700">FAQs</span>
          </div>
          <h2 className="text-2xl font-bold mt-4 mb-6">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-left font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <IoChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;