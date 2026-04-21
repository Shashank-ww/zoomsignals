"use client";

import React from "react";

export default function LegalPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-6 text-sm leading-relaxed">
      {/* NAV */}
      <div className="mb-10 border-b pb-4">
        <h1 className="
        py-1
        lg:text-6xl
        text-3xl
        md:text-5xl bg-linear-to-tr from-green-500 to-blue-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        my-16">
            Legal Disclosure and Use Policies
            </h1>
        <div className="flex gap-6 text-gray-600 text-sm">
          <a href="#terms" className="hover:text-black">TERMS</a>
          <a href="#privacy" className="hover:text-black">PRIVACY</a>
          <a href="#disclaimer" className="hover:text-black">DISCLAIMER</a>
        </div>
      </div>

{/* TERMS */}
<section id="terms" className="mb-16 space-y-6">
  <h2 className="text-2xl font-semibold">Terms & Conditions</h2>

  <p>
    By accessing or using MyAdBreak, you agree to be bound by these Terms under applicable laws of India. 
    MyAdBreak operates as a structured advertising intelligence platform that provides curated datasets, 
    signal frameworks, and analytical interpretations of advertising formats across platforms and categories.
  </p>

  <p>
    The Service is designed to assist marketing teams, strategists, and creative professionals in identifying 
    emerging advertising patterns. It does not function as an execution platform or performance guarantee system.
  </p>

  <h3 className="font-semibold">Subscription & Access</h3>
  <p>
    Standard subscription is offered at ₹4,600 per month and provides access to curated signal datasets, 
    including downloadable Excel-based libraries and structured insights.
  </p>
  <p>
    Premium access may include extended intelligence services such as deeper signal interpretation, 
    category-level observations, and strategic advisory layers, with an indicative value of ₹50,000 per month.
  </p>

  <h3 className="font-semibold">Nature of Data Access</h3>
  <p>
    Access to MyAdBreak is provided as a data license. All downloadable files, including Excel datasets, 
    are provided for internal use only and do not constitute transfer of ownership.
  </p>

  <ul className="list-disc pl-6">
    <li>Access is limited, non-exclusive, and non-transferable</li>
    <li>Data may be used for internal strategy, planning, and research</li>
    <li>Downloaded datasets remain subject to these Terms at all times</li>
  </ul>

  <h3 className="font-semibold">Restrictions on Use</h3>
  <ul className="list-disc pl-6">
    <li>No resale, sublicensing, or redistribution of datasets</li>
    <li>No publishing or sharing in public repositories or platforms</li>
    <li>No replication of platform structure, signal formats, or taxonomy</li>
    <li>No use for building competing products or intelligence systems</li>
  </ul>

  <h3 className="font-semibold">Intellectual Property</h3>
  <p>
    All signal frameworks, classification systems, scoring methodologies, and structural interpretations 
    available on MyAdBreak are proprietary intellectual property.
  </p>
  <p>
    Any attempt to reproduce, reverse engineer, extract patterns for replication, or commercially exploit 
    derived structures will be treated as infringement under applicable intellectual property laws in India.
  </p>

  <h3 className="font-semibold">Platform Use & Conduct</h3>
  <ul className="list-disc pl-6">
    <li>No automated scraping, crawling, or bulk extraction</li>
    <li>No unauthorized access, misuse of data, or system interference</li>
    <li>No attempt to bypass access controls or subscription layers</li>
  </ul>

  <h3 className="font-semibold">Third-Party References</h3>
  <p>
    MyAdBreak may reference publicly available advertisements or third-party platforms. 
    All such content remains the property of respective owners and is used solely for analytical purposes.
  </p>

  <h3 className="font-semibold">Payments & Billing</h3>
  <p>
    Subscription fees are billed in advance and are non-refundable unless explicitly stated. 
    Failure to maintain valid payment may result in suspension of access.
  </p>

  <h3 className="font-semibold">Termination</h3>
  <p>
    Access may be suspended or terminated without notice in cases of misuse, unauthorized redistribution, 
    violation of these Terms, or non-payment.
  </p>

  <h3 className="font-semibold">Limitation of Liability</h3>
  <p>
    MyAdBreak shall not be liable for any direct or indirect losses, including campaign performance, 
    business decisions, or financial outcomes arising from use of the platform.
  </p>

  <h3 className="font-semibold">Jurisdiction</h3>
  <p>
    These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction 
    of courts located in Gurgaon, Haryana.
  </p>
</section>

{/* PRIVACY */}
<section id="privacy" className="mb-16 space-y-6">
  <h2 className="text-2xl font-semibold">Privacy Policy</h2>

  <p>
    MyAdBreak collects limited user information required to provide access to its services, 
    including name, email, and payment-related details.
  </p>

  <h3 className="font-semibold">Use of Information</h3>
  <ul className="list-disc pl-6">
    <li>Provision of platform access and services</li>
    <li>Communication related to subscriptions and updates</li>
    <li>Improvement of product experience and analytics</li>
  </ul>

  <h3 className="font-semibold">Data Protection</h3>
  <p>
    Reasonable security measures are implemented to protect user data. However, no system can 
    guarantee absolute security, and users acknowledge associated risks.
  </p>

  <h3 className="font-semibold">Data Sharing</h3>
  <p>
    MyAdBreak does not sell or rent user data. Information may only be shared where required 
    by law or for essential service operations such as payment processing.
  </p>

  <h3 className="font-semibold">User Rights</h3>
  <p>
    Users may request access, correction, or deletion of their personal data by contacting us directly.
  </p>

  <h3 className="font-semibold">Data Retention</h3>
  <p>
    Data is retained only for as long as necessary to provide services and comply with legal obligations.
  </p>
</section>

{/* DISCLAIMER */}
<section id="disclaimer" className="space-y-6">
  <h2 className="text-2xl font-semibold">Disclaimer</h2>

  <p>
    MyAdBreak provides structured observations and analytical insights into advertising formats. 
    The platform does not provide guarantees of performance, virality, or campaign success.
  </p>

  <h3 className="font-semibold">Nature of Insights</h3>
  <p>
    Signals represent patterns identified across advertising activity. These are interpretative 
    and may evolve over time as markets change.
  </p>

  <h3 className="font-semibold">No Performance Guarantee</h3>
  <p>
    Outcomes from applying insights depend on multiple external factors including execution, 
    media strategy, audience targeting, and market conditions.
  </p>

  <h3 className="font-semibold">Third-Party Content</h3>
  <p>
    Advertisements referenced on the platform belong to their respective owners. 
    MyAdBreak does not claim ownership and uses such references for analysis only.
  </p>

  <h3 className="font-semibold">User Responsibility</h3>
  <p>
    Users are expected to apply independent judgment while using insights. 
    MyAdBreak is not responsible for strategic decisions or business outcomes.
  </p>

  <h3 className="font-semibold">Data Evolution</h3>
  <p>
    Signals and interpretations may change as new data emerges. 
    No representation is made regarding permanence or completeness.
  </p>
</section>
    </div>
  );
}
