'use client';
import { useState } from 'react';

const faqs = [
    {
      question: `What is Fuel My Flow?`,
      answer: `Fuel My Flow is a simple and transparent platform for creators of all kinds to receive appreciation and financial support from their audience. Think of it as a "Buy Me a Coffee" alternative tailored for Indian creators.`,
    },
    {
      question: `Who can use Fuel My Flow?`,
      answer: `Anyone who creates — developers, writers, designers, artists, musicians, educators, streamers, or any other kind of creator — is welcome. There are no category restrictions.`,
    },
    {
      question: `How do supporters donate?`,
      answer: `Supporters can contribute using Razorpay’s payment options, including UPI, credit/debit cards, net banking, and PayLater.`,
    },
    {
      question: `Can someone donate without creating an account?`,
      answer: `Yes! Supporters can donate anonymously — no sign-up is required.`,
    },
    {
      question: `What is a "Fuel"?`,
      answer: `A "Fuel" is a creator-defined unit of support.
          For example, if a creator sets their fuel cost at ₹100, a supporter can choose to send 1 Fuel (₹100), 2 Fuels (₹200), and so on.`,
    },
    {
      question: `What are the platform fees?`,
      answer: `Fuel My Flow charges a flat 4% platform fee per transaction, in addition to Razorpay’s payment processing fee (approx. 2%).`,
    },
    {
      question: `How do creators receive their earnings?`,
      answer: `Withdrawals are processed manually every Wednesday to minimize transaction costs. Creators will receive their balance in the bank account linked to Razorpay.`,
    },
    {
      question: `How can I thank my supporters?`,
      answer: `On your dashboard, you’ll find a Thank You button next to each donation.
          You can:
          • Write a public appreciation message.
          • Optionally send a personal thank-you via email if the supporter shared their address.`,
    },
    {
      question: `Why is Fuel My Flow better than other platforms?`,
      answer: `Fuel My Flow is designed specifically for Indian creators.
          Unlike platforms like Buy Me a Coffee, Ko-fi, or Patreon that rely on international payment gateways like Stripe and charge high currency conversion and processing fees, Fuel My Flow uses Razorpay, keeping costs lower and settlements faster for Indian users.
          We also support UPI and PayLater, which are widely used in India but unavailable on international platforms. Plus, our 4% flat fee is more transparent and competitive.`,
    },
    {
      question: `I’m a YouTuber — why should I use Fuel My Flow?`,
      answer: `YouTube takes around 30% from Super Thanks, Super Chat, and other monetization tools. Fuel My Flow offers a much fairer alternative for Indian creators by using Razorpay for donations — where the total fees are typically around 6% (4% platform + ~2% payment processing).
          This means you keep significantly more of what your audience contributes. Plus, supporters don’t need a YouTube account — they can support you directly with UPI, cards, or net banking, and you get more flexibility in how you thank them.`,
    },
    {
      question: `Is Fuel My Flow available internationally?`,
      answer: `Currently, Fuel My Flow is focused on Indian creators, providing a cost-effective alternative to platforms like Ko-fi and Patreon that use Stripe and have higher international fees.`,
    },
    {
      question: `Can I set up recurring donations or memberships?`,
      answer: `Recurring subscriptions and membership tiers are on the roadmap. Stay tuned — we’re actively working to support more ways for creators to build consistent income.`,
    },
    {
      question: `Is my data safe?`,
      answer: `Yes, your data is safe. We do not store any payment information — all transactions are securely handled by Razorpay, which is PCI-DSS compliant.
          If you choose to let Razorpay save your payment details, that data is managed solely by them.
          As for personal data, we collect only the minimum necessary and never share it. All user data is stored securely and protected by modern security practices.`,
    },
    {
      question: `I have another question. How can I contact support?`,
      answer: `You can reach out anytime at sahupiyush112@gmail.com — we’re here to help!`,
    },
  ];
  


export default function FAQsQue() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 ">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <p className='text-center font-medium'>If you can’t find an answer that you’re looking for, feel free to drop us a line.</p>
            {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-200/10 rounded-md p-4 my-3 ">
                    <button
                        className="flex cursor-pointer justify-between items-center w-full text-left"
                        onClick={() => toggleFAQ(index)}
                    >
                        <span className="font-semibold text-lg text-white">{faq.question}</span>
                        <span className="text-xl transition-all duration-500">
                            {openIndex === index ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            )}
                        </span>
                    </button>
                    {openIndex === index && (
                        <div className="mt-2 text-gray-200 font-medium">{faq.answer.split('\n').map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
