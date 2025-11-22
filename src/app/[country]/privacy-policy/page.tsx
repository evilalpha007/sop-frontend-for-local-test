import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Typography from "@/components/elements/texts/Typography";
import ExpertPropertyContactCard from "@/features/ExpertPropertyContactCard";
import LinkIcons from "@/features/Footer/LinkIcons";
import HorizontalAd from "@/features/HorizontalAd";
import TextBlock from "@/features/TextBlock";
import VerticalAd from "@/features/VerticalAd";
import { cn } from "@/library/utils/cn";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/in/privacy-policy",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate India | Exclusive Homes & Investment Opportunities",
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

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Section>
        <Section.HeroContainer className="flex min-h-[302px] flex-col items-center justify-center">
          <Section.BackgroundImage
            src="/images/banner/privacy-policy.webp"
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(0deg,#1A1A1A_0%,rgba(73,73,73,0.00)_78.5%)]" />

          <Section.Container className="w-full px-5">
            <Typography
              as="h1"
              className="mb-1.5 text-center text-3xl font-normal uppercase leading-tight text-theme-light-golden md:text-[52px]"
            >
              PRIVACY POLICY
            </Typography>

            <Typography
              as="h2"
              className="text-center text-sm font-medium text-theme-off-white md:text-[26px]"
            >
              Safeguarding Your Personal Information
            </Typography>
          </Section.Container>
        </Section.HeroContainer>
      </Section>

      <Section.Container className="mt-10">
        <div className="flex flex-col gap-[50px] md:flex-row">
          <div className="w-full md:flex-[68%]">
            <i>Effective Date: 15th March 2025</i>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Description>
                Silver Oak Properties (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) is committed to safeguarding your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                protect your information when you interact with our website,
                https://www.silveroakglobal.ae/ (the &quot;Site&quot;). It also
                outlines your rights concerning your data and explains how you
                can exercise these rights. By accessing or using the Site, you
                consent to this Privacy Policy. If you do not agree with the
                terms of this Privacy Policy, you must discontinue using the
                Site.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Definitions</TextBlock.Title>
              <TextBlock.Description>
                &quot;Personal Data&quot; means any information relating to an
                identified or identifiable individual, such as a name, contact
                details, IP address, or other identifiers.
                <br />
                &quot;Processing&quot; means any operation performed on Personal
                Data, such as collection, storage, usage, or deletion.
                <br />
                &quot;Cookies&quot; refer to small text files stored on your
                device to collect and store information about your browsing
                preferences.
                <br />
                &quot;Data Controller&quot; refers to Silver Oak Properties,
                responsible for deciding how and why Personal Data is processed.
                <br />
                &quot;Data Processor&quot; refers to any third party that
                processes Personal Data on behalf of the Data Controller.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Scope and Applicability</TextBlock.Title>
              <TextBlock.Description>
                This Privacy Policy applies to:
                <ul>
                  <li>
                    All visitors, users, and customers accessing the Site.
                  </li>
                  <li>
                    All Personal and Non-Personal Data collected, stored, and
                    processed through the Site.
                  </li>
                </ul>
                It does not apply to third-party websites, applications, or
                services that we do not own or control, even if linked to our
                Site.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Information We Collect</TextBlock.Title>
              <TextBlock.Description>
                <strong>Personal Data We Collect</strong>
                <br />
                We may collect the following categories of Personal Data:
                <ul>
                  <li>
                    Identity Information: Name, gender, date of birth, and
                    nationality.
                  </li>
                  <li>
                    Contact Information: Email address, phone number, and
                    mailing address.
                  </li>
                  <li>
                    Transaction Data: Records of products or services purchased,
                    payment methods, and billing information.
                  </li>
                  <li>
                    Account Information: Login credentials, preferences, and
                    user-generated content.
                  </li>
                  <li>
                    Sensitive Information: Only where legally required, such as
                    identification documents or residency details.
                  </li>
                </ul>
                <br />
                <strong>Non-Personal Data We Collect</strong>
                <br />
                Non-Personal Data collected automatically includes:
                <ul>
                  <li>IP address, browser type, and operating system.</li>
                  <li>Geographic location and time zone.</li>
                  <li>Device type and usage statistics.</li>
                  <li>
                    Website activity, such as pages viewed, time spent, and
                    referral sources.
                  </li>
                </ul>
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>
                Cookies and Similar Technologies
              </TextBlock.Title>
              <TextBlock.Description>
                We use cookies, pixel tags, and web beacons for:
                <ul>
                  <li>Enhancing Site functionality.</li>
                  <li>Tracking visitor behavior and preferences.</li>
                  <li>Delivering targeted advertising.</li>
                </ul>
                Users may configure their browsers to reject cookies, but this
                may impair some Site functionalities.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Legal Basis for Processing</TextBlock.Title>
              <TextBlock.Description>
                We process Personal Data based on the following legal grounds:
                <ul>
                  <li>
                    Consent: Where you have provided clear consent for
                    processing (e.g., newsletter subscription).
                  </li>
                  <li>
                    Contractual Necessity: To fulfill contractual obligations,
                    such as providing purchased services.
                  </li>
                  <li>
                    Legal Obligations: Compliance with applicable laws and
                    regulations.
                  </li>
                  <li>
                    Legitimate Interests: To improve services, prevent fraud, or
                    enhance security, provided such interests do not override
                    your rights.
                  </li>
                </ul>
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>How We Use Your Information</TextBlock.Title>
              <TextBlock.Description>
                We use the information collected for the following purposes:
                <ul>
                  <li>
                    <strong>Service Delivery</strong>
                    <ul>
                      <li>
                        To provide, personalize, and improve our products and
                        services.
                      </li>
                      <li>
                        To respond to inquiries, process orders, and deliver
                        services.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Communication</strong>
                    <ul>
                      <li>
                        To send transaction confirmations, service updates, and
                        technical notices.
                      </li>
                      <li>
                        To provide promotional offers, newsletters, and
                        marketing communications (with your consent).
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Analytics and Improvement</strong>
                    <ul>
                      <li>
                        To analyze user behavior and measure Site performance.
                      </li>
                      <li>To identify trends and enhance user experience.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Legal and Regulatory Compliance</strong>
                    <ul>
                      <li>
                        To fulfill legal obligations, including fraud
                        prevention, tax reporting, and compliance audits.
                      </li>
                      <li>
                        To cooperate with regulatory authorities as required.
                      </li>
                    </ul>
                  </li>
                </ul>
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Data Sharing and Transfers</TextBlock.Title>
              <TextBlock.Description>
                <strong>Internal Sharing</strong>
                <ul>
                  <li>
                    We may share information with employees or departments
                    within our organization to deliver services effectively.
                  </li>
                </ul>
                <br />
                <strong>Third-Party Processors</strong>
                <ul>
                  <li>Payment gateways and financial institutions.</li>
                  <li>Cloud hosting providers and IT service vendors.</li>
                  <li>Marketing platforms and analytics tools.</li>
                </ul>
                These third parties are contractually obligated to handle your
                data securely and in compliance with applicable laws.
                <br />
                <strong>International Data Transfers</strong>
                <ul>
                  <li>
                    Binding corporate rules or standard contractual clauses.
                  </li>
                  <li>
                    Adequate data protection laws in the destination country.
                  </li>
                </ul>
                <br />
                <strong>Legal Disclosures</strong>
                <ul>
                  <li>
                    We may disclose information to law enforcement, regulatory
                    bodies, or courts where legally required or necessary for
                    our legitimate interests.
                  </li>
                </ul>
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Data Retention and Security</TextBlock.Title>
              <TextBlock.Description>
                <strong>Retention Period</strong>
                <ul>
                  <li>We retain Personal Data only as long as necessary to:</li>
                  <li>Fulfill the purposes outlined in this Privacy Policy.</li>
                  <li>Comply with legal or regulatory requirements.</li>
                </ul>
                <br />
                <strong>Security Measures</strong>
                <ul>
                  <li>
                    Encryption and secure socket layers (SSL) for data
                    transmission.
                  </li>
                  <li>Regular audits of our systems and processes.</li>
                  <li>Restricted access to authorized personnel only.</li>
                </ul>
                Despite our efforts, no system is completely secure, and we
                cannot guarantee absolute security.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Your Rights and Choices</TextBlock.Title>
              <TextBlock.Description>
                Depending on your location, you may have the following rights:
                <ul>
                  <li>
                    <strong>Right to Access</strong> Request a copy of the
                    Personal Data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Rectification</strong> Request correction
                    of inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>
                      Right to Erasure (&quot;Right to Be Forgotten&quot;)
                    </strong>{" "}
                    Request deletion of your data, subject to legal obligations.
                  </li>
                  <li>
                    <strong>Right to Restriction</strong> Request the limitation
                    of processing under specific conditions.
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong> Request transfer
                    of your data to another service provider.
                  </li>
                  <li>
                    <strong>Right to Object</strong> Object to data processing
                    for direct marketing or other specific purposes.
                  </li>
                </ul>
                To exercise your rights, contact us at info@silveroak.ae. We may
                require identity verification to process your request.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Children’s Privacy</TextBlock.Title>
              <TextBlock.Description>
                Our Site is not intended for use by individuals under the age of
                18. We do not knowingly collect Personal Data from children. If
                you believe a child has provided us with their data, please
                contact us immediately.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Updates to This Privacy Policy</TextBlock.Title>
              <TextBlock.Description>
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal requirements. The updated
                policy will be posted on this page with a revised effective
                date. Continued use of the Site signifies acceptance of the
                updated Privacy Policy.
              </TextBlock.Description>
            </TextBlock>
            <Hr className="mb-[38px] mt-[50px]" />
            <TextBlock>
              <TextBlock.Title>Contact Information</TextBlock.Title>
              <TextBlock.Description>
                If you have questions or concerns about this Privacy Policy,
                please reach out to us:
                <br />
                Silver Oak Properties
                <br />
                Email: info@silveroakglobal.ae
                <br />
                Phone: +971 800-555-555
              </TextBlock.Description>
            </TextBlock>
          </div>
        </div>
      </Section.Container>
    </div>
  );
};

export default PrivacyPolicyPage;
