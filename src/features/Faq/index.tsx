import { getFaqs } from "@/api/get-faqs";
import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import FaqList from "./FaqList";

interface IFaqProps {
  className?: string;
  apiQuery?: {
    country?: string;
    // limit?: number | string;
  };
}

// const data = [
//   {
//     id: crypto.randomUUID(),
//     title: "Who can get a mortgage in the UAE?",
//     description:
//       "We’re here to help you through your mortgage span. We can help you secure your first mortgage and also with existing, such as buyouts where you move mortgages from one bank to another, and also equity releases, if you want to take out a second mortgage.",
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "Does SOP only offer support on new mortgages?",
//     description:
//       "We’re here to help you through your mortgage span. We can help you secure your first mortgage and also with existing, such as buyouts where you move mortgages from one bank to another, and also equity releases, if you want to take out a second mortgage.",
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "What type of properties can be mortgaged?",
//     description:
//       "We’re here to help you through your mortgage span. We can help you secure your first mortgage and also with existing, such as buyouts where you move mortgages from one bank to another, and also equity releases, if you want to take out a second mortgage.",
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "What is the minimum downpayment required?",
//     description:
//       "We’re here to help you through your mortgage span. We can help you secure your first mortgage and also with existing, such as buyouts where you move mortgages from one bank to another, and also equity releases, if you want to take out a second mortgage.",
//   },
//   {
//     id: crypto.randomUUID(),
//     title:
//       "Can my downpayment be paid from the mortgage or with another type of finance?",
//     description:
//       "We’re here to help you through your mortgage span. We can help you secure your first mortgage and also with existing, such as buyouts where you move mortgages from one bank to another, and also equity releases, if you want to take out a second mortgage.",
//   },
// ];

export type TAFaq = {
  id: number;
  question: string;
  answer: string;
};

const Faq = async ({ className, apiQuery }: IFaqProps) => {
  const limitFaqData = await getFaqs({ limit: 5, country: apiQuery?.country });
  const allFaqData = await getFaqs({ country: apiQuery?.country });
  // const allFaqRes = await nextFetch<TResponse<TAFaq[]>>("v1/auth/faqs", {
  //   cache: "no-store",
  // });
  // const allFaqData = allFaqRes?.data;

  // const limitFaqRes = await nextFetch<TResponse<TAFaq[]>>(
  //   "v1/auth/faqs?limit=5",
  //   {
  //     cache: "no-store",
  //   },
  // );
  // const limitFaqData = limitFaqRes?.data;

  return (
    <Section.Container className={className}>
      <Typography
        as="h2"
        className="mb-[18px] text-center text-[20px] font-medium text-theme-off-white sm:mb-[35px] sm:text-[32px]"
      >
        Frequently asked questions
      </Typography>

      <FaqList allData={allFaqData} limitedData={limitFaqData} />
    </Section.Container>
  );
};

export default Faq;
