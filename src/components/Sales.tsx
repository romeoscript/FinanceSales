import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, CheckCircle, Clock, ChevronRight } from 'lucide-react';



export default function SalesPage() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const ServiceIcon = ({ className }: { className?: string }) => (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30 50 L45 65 L70 35" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
    );

    return (
        <>

            {/* Add this after Hero Section */}
            <section className="py-20 bg-white">
                <motion.div
                    className="container mx-auto px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            className="text-4xl font-bold mb-12"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Who We Are
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-600 mb-8"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Swift Trade Finance is a leading international money transfer agency dedicated to serving high scale businesses, Banks and Institutions with trust and transparency. Our mission is to simplify global financial transactions by bridging the gap between senders and verified, expert receivers who specialize in using banking instruments to make secure international transactions seamless.
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-600 font-semibold"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Our Mission: To provide reliable, fast, and secure solutions for global transactions, empowering our clients to focus on growth while we handle the complexities of trade finance.
                        </motion.p>
                    </div>
                </motion.div>
            </section>
            <div className="min-h-screen bg-white">
                {/* Services Section */}
                <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                    <motion.div
                        className="container mx-auto px-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl font-bold text-center mb-16"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Our Services
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative overflow-hidden group"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full -mr-10 -mt-10" />
                                    <div className="mb-6">
                                        {/* Replace the img tag with the ServiceIcon component */}
                                        <ServiceIcon className="w-16 h-16 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <motion.button
                                        className="text-blue-600 font-semibold flex items-center group-hover:text-blue-700"
                                        whileHover={{ x: 5 }}
                                    >
                                        Learn More <ChevronRight className="ml-2 w-4 h-4" />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 bg-white">
                    <motion.div
                        className="container mx-auto px-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl font-bold text-center mb-16"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Why Choose Us
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Shield, title: "Trust", desc: "Trusted networks of verified and reliable receivers" },
                                { icon: Globe, title: "Expertise", desc: "10 Years of experience in banking instruments" },
                                { icon: CheckCircle, title: "Transparency", desc: "Clear, upfront processes and competitive pricing" },
                                { icon: Clock, title: "Speed", desc: "Streamlined systems for swift global transactions" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <item.icon className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Who We Serve */}
                <section className="py-20 bg-gray-50">
                    <motion.div
                        className="container mx-auto px-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl font-bold text-center mb-16"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Who We Serve
                        </motion.h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {clientTypes.map((client, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    whileHover={{ y: -5 }}
                                >
                                    <img
                                        src={`https://placehold.co/400x200`}
                                        alt={client.type}
                                        className="w-full h-48 object-cover rounded-lg mb-6"
                                    />
                                    <h3 className="text-xl font-semibold mb-4">{client.type}</h3>
                                    <ul className="space-y-3">
                                        {client.points.map((point, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="flex items-start"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.2 }}
                                            >
                                                <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                                                <span className="text-gray-600">{point}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>
                {/* Add this before Contact Section */}
<section className="py-20 bg-white">
  <motion.div 
    className="container mx-auto px-4"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={containerVariants}
  >
    <motion.h2 
      className="text-4xl font-bold text-center mb-16"
      variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
    >
      What Our Clients Say
    </motion.h2>
    <div className="grid md:grid-cols-3 gap-8">
      <motion.div 
        className="bg-gray-50 p-8 rounded-xl"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <p className="text-gray-600 italic mb-6">Swift Trade Finance made our international transactions smoother than ever. The team is highly professional and trustworthy.</p>
        <div className="flex items-center">
          <div className="ml-4">
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-500">CEO, Global Logistics Inc.</p>
          </div>
        </div>
      </motion.div>
      {/* Add more testimonials as needed */}
    </div>
  </motion.div>
</section>

                {/* Contact Section */}
                <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                    <motion.div
                        className="container mx-auto px-4 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl font-bold mb-8"
                            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Ready to Get Started?
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-12 text-gray-600"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            Take the first step toward secure and reliable global transactions.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl">
                                Request a Consultation
                            </button>
                            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold">
                                Contact Us Now
                            </button>
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </>
    );
}

const services = [
    {
        title: "GPI Semi-Automatic Manual Download",
        description: "Streamline processes while maintaining control over manual transactions for secure, reliable fund movement."
    },
    {
        title: "GPI Semi-Authentic",
        description: "Achieve cost-effective and dependable transaction processing with semi-authentic solutions designed for efficiency."
    },
    {
        title: "DTC Transfer",
        description: "Simplify fund transfers securely and swiftly, tailored to meet business cash flow needs."
    },
    {
        title: "MT103 Cash Transfer",
        description: "Experience instant, transparent cash transfers with full compliance and real-time tracking."
    },
    {
        title: "Bank Guarantee Services",
        description: "Strengthen trust with your partners through legally binding bank guarantees, tailored to meet your specific transaction needs."
    },
    {
        title: "Trade Finance Consulting",
        description: "Leverage expert insights to optimize your trade finance strategy and navigate the complexities of global transactions."
    }
];

const clientTypes = [
    {
        type: "Importers and Exporters",
        points: [
            "Facilitating quick and secure payment methods for international trade",
            "Streamlining transactions to reduce delays and risks in foreign markets"
        ]
    },
    {
        type: "Small and Medium Enterprises",
        points: [
            "Growing businesses looking to simplify cross-border transactions",
            "Overcoming financial hurdles with efficient trade finance solutions"
        ]
    },
    {
        type: "Corporate Enterprises",
        points: [
            "Simplifying high-volume, multi-currency transactions",
            "Leveraging advanced payment methods for scalability and compliance"
        ]
    },
    {
        type: "Financial Institutions",
        points: [
            "Utilizing advanced services like GPI and DTC transfers",
            "Enhancing customer offerings with cutting-edge financial technologies"
        ]
    },
    {
        type: "E-commerce Businesses",
        points: [
            "Handling multiple payment channels and international orders efficiently",
            "Utilizing automated transfers to maintain seamless operations"
        ]
    },
    {
        type: "Real Estate and Investment Firms",
        points: [
            "Processing large transactions securely, such as property acquisitions",
            "Benefiting from secure SWIFT services like MT103"
        ]
    }
];