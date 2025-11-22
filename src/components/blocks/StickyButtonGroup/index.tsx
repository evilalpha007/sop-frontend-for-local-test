import ScrollToTopButton from "@/components/elements/buttons/ScrollToTopButton";
import WhatsAppButton from "@/components/elements/buttons/WhatsAppButton";

const StickyButtonGroup = () => {
  return (
    <div className="fixed bottom-8 right-8 z-10 flex items-center gap-3">
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
};

export default StickyButtonGroup;
