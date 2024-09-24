import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-screen-2xl px-3 pb-8 md:pb-12 lg:px-0">
      <div className="mx-auto mt-10 max-w-4xl rounded-lg p-6 text-gray-600 shadow-lg dark:bg-gray-950 dark:text-gray-200">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Terms and Conditions
        </h1>
        <p className="mb-4 text-right text-sm">
        Last updated: {new Date().toDateString()}
        </p>

        <h3 className="mb-2 mt-6 text-xl font-bold">
          Interpretation and Definitions
        </h3>
        <h6 className="mb-2 mt-4 text-lg font-bold">Interpretation</h6>
        <p className="leading-relaxed">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>

        <h6 className="mb-2 mt-6 text-lg font-bold">Definitions</h6>
        <p className="leading-relaxed">
          For the purposes of these Terms and Conditions:
        </p>
        <ul className="ml-4 list-inside list-disc leading-relaxed">
          <li>
            <strong>Application</strong> means the software program provided by
            the Company downloaded by You on any electronic device, named
            BIT—Build It Better.
          </li>
          <li>
            <strong>Application Store</strong> means the digital distribution
            service operated and developed by Apple Inc. (Apple App Store) or
            Google Inc. (Google Play Store) in which the Application has been
            downloaded.
          </li>
          <li>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party, where
            &quot;control&quot; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </li>
          <li>
            <strong>Country</strong> refers to: Ghana.
          </li>
          <li>
            <strong>Company</strong> (referred to as either &quot;the
            Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
            this Agreement) refers to Build It Better Sokoban Wood Village
            Company, PLT A5 BLOCK 7, Sokoban.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone, or a digital tablet.
          </li>
          <li>
            <strong>Service</strong> refers to the Application or the Website or
            both.
          </li>
          <li>
            <strong>Terms and Conditions</strong> (also referred as
            &quot;Terms&quot;) mean these Terms and Conditions that form the
            entire agreement between You and the Company regarding the use of
            the Service.
          </li>
          <li>
            <strong>Third-party Social Media Service</strong> means any services
            or content (including data, information, products or services)
            provided by a third-party that may be displayed, included or made
            available by the Service.
          </li>
          <li>
            <strong>Website</strong> refers to BIT—Build It Better, accessible
            from{" "}
            <Link
              href="https://bims.onrender.com/"
              className="text-blue-500 hover:underline"
            >
              https://bims.onrender.com/
            </Link>
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </li>
        </ul>

        <h3 className="mb-2 mt-8 text-xl font-bold">Acknowledgment</h3>
        <p className="leading-relaxed">
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. These
          Terms and Conditions set out the rights and obligations of all users
          regarding the use of the Service.
        </p>
        <p className="mt-4 leading-relaxed">
          Your access to and use of the Service is conditioned on Your
          acceptance of and compliance with these Terms and Conditions. These
          Terms and Conditions apply to all visitors, users, and others who
          access or use the Service.
        </p>
        <p className="mt-4 leading-relaxed">
          By accessing or using the Service You agree to be bound by these Terms
          and Conditions. If You disagree with any part of these Terms and
          Conditions then You may not access the Service.
        </p>
        <p className="mt-4 leading-relaxed">
          You represent that you are over the age of 18. The Company does not
          permit those under 18 to use the Service.
        </p>
        <p className="mt-4 leading-relaxed">
          Your access to and use of the Service is also conditioned on Your
          acceptance of and compliance with the Privacy Policy of the Company.
          Our Privacy Policy describes Our policies and procedures on the
          collection, use, and disclosure of Your personal information when You
          use the Application or the Website and tells You about Your privacy
          rights and how the law protects You. Please read Our Privacy Policy
          carefully before using Our Service.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">Links to Other Websites</h3>
        <p className="leading-relaxed">
          Our Service may contain links to third-party websites or services that
          are not owned or controlled by the Company.
        </p>
        <p className="mt-4 leading-relaxed">
          The Company has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third-party
          websites or services. You further acknowledge and agree that the
          Company shall not be responsible or liable, directly or indirectly,
          for any damage or loss caused or alleged to be caused by or in
          connection with the use of or reliance on any such content, goods, or
          services available on or through any such websites or services.
        </p>
        <p className="mt-4 leading-relaxed">
          We strongly advise You to read the terms and conditions and privacy
          policies of any third-party websites or services that You visit.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">Termination</h3>
        <p className="leading-relaxed">
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </p>
        <p className="mt-4 leading-relaxed">
          Upon termination, Your right to use the Service will cease
          immediately.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">Limitation of Liability</h3>
        <p className="leading-relaxed">
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven&apos;t purchased anything through the Service.
        </p>
        <p className="mt-4 leading-relaxed">
          To the maximum extent permitted by applicable law, in no event shall
          the Company or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever (including, but not
          limited to, damages for loss of profits, loss of data or other
          information, for business interruption, for personal injury, loss of
          privacy arising out of or in any way related to the use of or
          inability to use the Service, third-party software and/or third-party
          hardware used with the Service, or otherwise in connection with any
          provision of this Terms), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy
          fails of its essential purpose.
        </p>
        <p className="mt-4 leading-relaxed">
          Some states do not allow the exclusion of implied warranties or
          limitation of liability for incidental or consequential damages, which
          means that some of the above limitations may not apply. In these
          states, each party&apos;s liability will be limited to the greatest
          extent permitted by law.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">
          &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
        </h3>
        <p className="leading-relaxed">
          The Service is provided to You &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; and with all faults and defects without warranty of
          any kind. To the maximum extent permitted under applicable law, the
          Company, on its own behalf and on behalf of its Affiliates and its and
          their respective licensors and service providers, expressly disclaims
          all warranties, whether express, implied, statutory or otherwise, with
          respect to the Service, including all implied warranties of
          merchantability, fitness for a particular purpose, title, and
          non-infringement, and warranties that may arise out of course of
          dealing, course of performance, usage or trade practice.
        </p>
        <p className="mt-4 leading-relaxed">
          Without limitation to the foregoing, the Company provides no warranty
          or undertaking, and makes no representation of any kind that the
          Service will meet Your requirements, achieve any intended results, be
          compatible or work with any other software, applications, systems or
          services, operate without interruption, meet any performance or
          reliability standards or be error-free or that any errors or defects
          can or will be corrected.
        </p>
        <p className="mt-4 leading-relaxed">
          Without limiting the foregoing, neither the Company nor any of the
          company&apos;s providers makes any representation or warranty of any
          kind, express or implied: (i) as to the operation or availability of
          the Service, or the information, content, and materials or products
          included thereon; (ii) that the Service will be uninterrupted or
          error-free; (iii) as to the accuracy, reliability, or currency of any
          information or content provided through the Service; or (iv) that the
          Service, its servers, the content, or e-mails sent from or on behalf
          of the Company are free of viruses, scripts, trojan horses, worms,
          malware, timebombs or other harmful components.
        </p>
        <p className="mt-4 leading-relaxed">
          Some jurisdictions do not allow the exclusion of certain types of
          warranties or limitations on applicable statutory rights of a
          consumer, so some or all of the above exclusions and limitations may
          not apply to You. But in such a case, the exclusions and limitations
          set forth in this section shall be applied to the greatest extent
          enforceable under applicable law.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">Governing Law</h3>
        <p className="leading-relaxed">
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service. Your use of the
          Application may also be subject to other local, state, national, or
          international laws.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">Disputes Resolution</h3>
        <p className="leading-relaxed">
          If You have any concern or dispute about the Service, You agree to
          first try to resolve the dispute informally by contacting the Company.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">
          For European Union (EU) Users
        </h3>
        <p className="leading-relaxed">
          If You are a European Union consumer, you will benefit from any
          mandatory provisions of the law of the country in which You are
          resident.
        </p>

        <h3 className="mb-2 mt-8 text-xl font-bold">
          United States Legal Compliance
        </h3>
        <p className="leading-relaxed">
          You represent and warrant that (i) You are not located in a country
          that is subject to the United States government embargo, or that has
          been designated by the United States government as a &quot;terrorist
          supporting&quot; country, and (ii) You are not listed on any United
          States government list of prohibited or restricted parties.
        </p>
      </div>
    </main>
  );
}
