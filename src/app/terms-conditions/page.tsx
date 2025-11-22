import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import ExpertPropertyContactCard from "@/features/ExpertPropertyContactCard";
import LinkIcons from "@/features/Footer/LinkIcons";
import HorizontalAd from "@/features/HorizontalAd";
import TextBlock from "@/features/TextBlock";
import VerticalAd from "@/features/VerticalAd";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/terms-conditions",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate | Exclusive Homes & Investment Opportunities",
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.title,
      description: seoData?.description,
      url: seoData?.route,
      type: "website",
    },
  };
}
const TermsConditionPage = () => {
  return (
    <div>
      <Section className="flex min-h-[302px] flex-col items-center justify-center">
        <Section.BackgroundImage
          src="/images/banner/terms-conditions.webp"
          className="h-full"
          priority
          quality={50}
          width={1440}
          height={302}
        />

        {/* <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#141213_5.5%,rgba(73,73,73,0.00)_68%)]" /> */}
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,#1A1A1A_0%,rgba(73,73,73,0.00)_78.5%)]" />

        <Section.Container className="bg-red-500# w-full px-5">
          <Typography
            as="h1"
            className="mb-1.5 text-center text-3xl font-normal uppercase leading-tight text-theme-light-golden md:text-[52px]"
          >
            TERMS OF USE
          </Typography>

          <Typography
            as="h2"
            className="text-center text-sm font-medium text-theme-off-white md:text-[26px]"
          >
            User Agreement and Guidelines
          </Typography>
        </Section.Container>
      </Section>

      <Section.Container className="mt-10">
        <div className="flex gap-[50px]">
          <div className="flex-[68%]">
            <TextBlock>
              {/* <TextBlock.Title>Your responsibilities</TextBlock.Title> */}
              <TextBlock.Description>
                Welcome to the Silver Oak Properties website
                www.silveroakglobal.com . By accessing or using this Website,
                you agree to comply with and be bound by the following Terms and
                Conditions (the &quot;Terms&quot;). If you do not agree with
                these Terms, you must immediately discontinue use of the
                Website. These Terms are governed by the laws of the United Arab
                Emirates (UAE) and India, where applicable, without regard to
                conflict of laws principles.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[38px] mt-[50px]" />

            <TextBlock>
              <TextBlock.Title>Definitions</TextBlock.Title>
              <TextBlock.Description>
                For the purposes of these Terms, the following definitions
                apply:
                <br />
                &quot;Silver Oak Properties,&quot; &quot;we,&quot;
                &quot;our,&quot; or &quot;us&quot; refers to the legal entity
                managing this Website.
                <br />
                &quot;You&quot; or &quot;your&quot; refers to any individual or
                entity accessing the Website.
                <br />
                &quot;Content&quot; includes all text, images, data, software,
                and other material available on the Website.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[38px] mt-[50px]" />

            <TextBlock>
              <TextBlock.Title>Acceptance of Terms</TextBlock.Title>
              <TextBlock.Description>
                By using the Website, you confirm that you have read,
                understood, and agree to these Terms.
                <br />
                These Terms incorporate our Privacy Policy and Cookie Policy,
                which are available on the Website. Your continued use signifies
                acceptance of all policies.
                <br />
                We reserve the right to amend these Terms at any time. Revisions
                will be posted on this page with the “Last Update”.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[38px] mt-[50px]" />

            <TextBlock>
              <TextBlock.Title>Access and Use of the Website</TextBlock.Title>
              <TextBlock.Description>
                The Website is intended for users who are 18 years or older. By
                using this Website, you confirm that you meet this age
                requirement.
                <br />
                Use of the Website is granted strictly for personal and
                non-commercial purposes unless otherwise authorized by us in
                writing.
              </TextBlock.Description>
            </TextBlock>
          </div>
        </div>

        <Hr className="my-[85px]" />

        <TextBlock>
          <TextBlock.Title>User Responsibilities</TextBlock.Title>
          <TextBlock.Description>
            <ul>
              <li>
                You agree to:
                <ul>
                  <li>
                    Provide accurate, complete, and current information when
                    required.
                  </li>
                  <li>
                    Use the Website lawfully and refrain from using it for
                    fraudulent or malicious purposes.
                  </li>
                </ul>
              </li>
              <li>
                You must not:
                <ul>
                  <li>
                    Attempt to gain unauthorized access to any part of the
                    Website.
                  </li>
                  <li>
                    Introduce viruses, malware, or any other harmful material.
                  </li>
                  <li>
                    Scrape, copy, or collect data without our express
                    permission.
                  </li>
                </ul>
              </li>
            </ul>
          </TextBlock.Description>
        </TextBlock>

        <Hr className="my-[70px]" />

        <TextBlock>
          <TextBlock.Title>Property Information Disclaimer</TextBlock.Title>
          <TextBlock.Description>
            The information provided on this Website, including property
            descriptions and images, is for general informational purposes only.
            <br />
            Although we strive for accuracy, we do not guarantee the
            reliability, completeness, or correctness of property data.
            Prospective buyers or tenants are responsible for verifying property
            information directly with the listing agent.
          </TextBlock.Description>
        </TextBlock>

        <Hr className="mb-[70px] mt-[89px]" />

        <TextBlock>
          <TextBlock.Title>Intellectual Property Rights</TextBlock.Title>
          <TextBlock.Description>
            All intellectual property rights, including copyrights, trademarks,
            and database rights, on this Website are owned or licensed by Silver
            Oak Properties.
            <br />
            You are permitted to download or print Content for personal use
            only. Modifications, commercial use, or republication of the Content
            without prior written consent is prohibited.
          </TextBlock.Description>
        </TextBlock>

        <Hr className="mb-[45px] mt-[76px]" />

        <TextBlock>
          <TextBlock.Title>Limitation of Liability</TextBlock.Title>
          <TextBlock.Description>
            <ul>
              <li>
                <ul>
                  To the fullest extent permitted by applicable law, Silver Oak
                  Properties shall not be liable for:
                  <li>
                    Direct, indirect, or consequential damages, including but
                    not limited to loss of profits, revenue, or data.
                  </li>
                  <li>
                    Damages resulting from the use or inability to use the
                    Website.
                  </li>
                </ul>
              </li>

              <li>
                Any reliance placed on property valuations or other data on the
                Website is solely at your own risk.
              </li>
            </ul>
          </TextBlock.Description>
        </TextBlock>

        <Hr className="my-[67px]" />

        <TextBlock>
          <TextBlock.Title>Indemnification</TextBlock.Title>
          <TextBlock.Description>
            <ul>
              You agree to indemnify and hold harmless Silver Oak Properties,
              its affiliates, officers, employees, and agents from any claims,
              liabilities, damages, or expenses arising out of:
              <li>Your breach of these Terms.</li>
              <li>Your misuse of the Website.</li>
              <li>
                Your infringement of third-party intellectual property rights.
              </li>
            </ul>
          </TextBlock.Description>
        </TextBlock>

        <Hr className="mb-[55px] mt-[61px]" />

        <div className="flex gap-[50px]">
          <div className="flex-[68%]">
            <TextBlock>
              <TextBlock.Title>
                Third-Party Links and Advertisements
              </TextBlock.Title>

              <TextBlock.Description>
                The Website may contain links to third-party websites or display
                advertisements. These are provided for convenience only and do
                not imply endorsement.
                <br />
                We are not responsible for the content, accuracy, or practices
                of third-party websites.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[50px] mt-[55px]" />

            <TextBlock>
              <TextBlock.Title>Privacy and Data Protection</TextBlock.Title>

              <TextBlock.Description>
                By using the Website, you consent to our collection and use of
                your personal data as outlined in our Privacy Policy.
                <br />
                We comply with the UAE Data Protection Law (Federal Decree-Law
                No. 45 of 2021) and India’s Information Technology (Reasonable
                Security Practices and Procedures and Sensitive Personal Data or
                Information) Rules, 2011.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[50px] mt-[55px]" />

            <TextBlock>
              <TextBlock.Title>Viruses and Security</TextBlock.Title>

              <TextBlock.Description>
                We do not guarantee that the Website will be free of bugs,
                viruses, or other harmful components.
                <br />
                You are responsible for implementing adequate security measures
                to protect your devices and data.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[50px] mt-[55px]" />

            <TextBlock>
              <TextBlock.Title>Governing Law and Jurisdiction</TextBlock.Title>

              <TextBlock.Description>
                These Terms shall be governed by and construed in accordance
                with the laws of the UAE.
                <br />
                Any disputes arising out of or in connection with these Terms
                shall be subject to the exclusive jurisdiction of UAE courts,
                unless otherwise required by law.
              </TextBlock.Description>
            </TextBlock>

            <Hr className="mb-[50px] mt-[55px]" />

            <TextBlock>
              <TextBlock.Title>Force Majeure</TextBlock.Title>

              <TextBlock.Description>
                We are not liable for failure to perform due to causes beyond
                our reasonable control, including but not limited to natural
                disasters, government actions, or internet service
                interruptions.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[50px] mt-[55px]" />
            <TextBlock>
              <TextBlock.Title>Termination of Access</TextBlock.Title>

              <TextBlock.Description>
                We reserve the right to terminate or restrict your access to the
                Website at our discretion for violations of these Terms or other
                applicable laws.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[50px] mt-[55px]" />
            <TextBlock>
              <TextBlock.Title>Dispute Resolution</TextBlock.Title>

              <TextBlock.Description>
                Any dispute between you and Silver Oak Properties shall first be
                attempted to be resolved through negotiation. If unresolved,
                disputes will proceed to binding arbitration in the UAE.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[50px] mt-[55px]" />
            <TextBlock>
              <TextBlock.Title>
                Additional Provisions for Indian Users
              </TextBlock.Title>

              <TextBlock.Description>
                For users accessing the Website from India, these Terms shall
                also comply with the Indian Contract Act, 1872, and other
                applicable Indian laws.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[50px] mt-[55px]" />
            <TextBlock>
              <TextBlock.Title>Contact Information</TextBlock.Title>

              <TextBlock.Description>
                For any questions or concerns, please contact us:
                <br />
                Silver Oak Properties <br />
                Email: info@silveroakglobal.ae <br />
                Phone: +971 800-555-555
              </TextBlock.Description>
            </TextBlock>
          </div>
        </div>
      </Section.Container>
    </div>
  );
};

export default TermsConditionPage;
