import { useShop } from '../store';
import { Go } from './ui';

/** Small confirmation that slides up after "Add to Bag" / "Try it free". */
export default function Toast() {
  const { toast, dismissToast } = useShop();
  if (!toast) return null;

  const isRemoval = toast.message.toLowerCase().includes('removed') || toast.message.toLowerCase().includes('emptied');

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="fixed left-1/2 bottom-[20px] z-[200] w-[calc(100%-32px)] max-w-[440px] -translate-x-1/2 bg-[#1d1d1f]/95 backdrop-blur-md text-white rounded-[14px] shadow-2xl px-5 py-4 flex items-center gap-4 animate-[toast-in_.25s_ease-out] border border-white/10"
    >
      {isRemoval ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff453a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ) : (
        <span className="text-[#30d158] text-[18px] shrink-0 font-bold" aria-hidden="true">✓</span>
      )}
      <p className="m-0 text-[14px] flex-1 leading-snug">{toast.message}</p>
      {toast.action && (
        toast.action.to ? (
          <Go to={toast.action.to} className="text-[#2997ff] hover:text-[#52aaff] text-[14px] font-medium whitespace-nowrap no-underline hover:underline">
            {toast.action.label}
          </Go>
        ) : (
          <button
            type="button"
            onClick={() => {
              toast.action.onClick?.();
              dismissToast();
            }}
            className="text-[#2997ff] hover:text-[#52aaff] bg-transparent border-0 p-0 text-[14px] font-semibold whitespace-nowrap cursor-pointer hover:underline"
          >
            {toast.action.label}
          </button>
        )
      )}
      <button onClick={dismissToast} aria-label="Dismiss notification" className="bg-transparent border-0 text-white/60 hover:text-white text-[16px] cursor-pointer p-0 shrink-0">
        ✕
      </button>
    </div>
  );
}
