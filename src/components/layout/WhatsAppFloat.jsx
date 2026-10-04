import WhatsAppIcon from '@/components/ui/icons/WhatsAppIcon';
import { generalEnquiry } from '@/lib/whatsapp';

/**
 * Floating booking button, pinned bottom-right on mobile and mid-right on
 * desktop to match the design. Server rendered — it is only a link.
 */
export default function WhatsAppFloat({ label = 'Plan with Us' }) {
  return (
    <a
      href={generalEnquiry('floating button')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2.5 rounded-pill bg-whatsapp px-5 py-3 text-[15px] font-medium text-white shadow-lg transition-colors hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-whatsapp sm:bottom-8 sm:right-0 sm:rounded-r-none"
    >
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">Plan with Us</span>
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}
