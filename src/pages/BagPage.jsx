import { useState } from 'react';
import { money, useShop } from '../store';
import { Go } from '../components/ui';

const Thumb = ({ item }) =>
  item.crop ? (
    <div
      role="img"
      aria-label={item.name}
      className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] md:w-[120px] md:h-[120px] rounded-[12px] bg-white bg-no-repeat shrink-0"
      style={{ backgroundImage: `url(${item.image})`, backgroundSize: item.crop.size, backgroundPosition: item.crop.pos }}
    />
  ) : (
    <img src={item.image} alt="" className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] md:w-[120px] md:h-[120px] object-contain rounded-[12px] bg-white shrink-0" />
  );

const TrashIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/** Shopping bag with quantity, item deletion, Delete Cart, totals and a checkout confirmation. */
export default function BagPage() {
  const { bag, setQty, removeFromBag, clearBag } = useShop();
  const [order, setOrder] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const subtotal = bag.reduce((s, x) => s + x.price * x.qty, 0);
  const tax = Math.round(subtotal * 0.0725 * 100) / 100;
  const total = subtotal + tax;

  if (order) {
    return (
      <Shell>
        <div className="text-center py-[32px] sm:py-[40px] animate-modal-pop">
          <div className="mx-auto w-[64px] sm:w-[72px] h-[64px] sm:h-[72px] rounded-full bg-[#1d8a3a] text-white text-[32px] sm:text-[36px] leading-[64px] sm:leading-[72px]">✓</div>
          <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] m-0 mt-6 leading-tight">Thank you. Your order is placed.</h1>
          <p className="text-[15px] sm:text-[17px] text-[#6e6e73] m-0 mt-2">
            Order {order.no} · {money(order.total)}
          </p>
          <Go to="" className="inline-block mt-8 bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white rounded-full px-[26px] py-[12px] text-[16px] sm:text-[17px] no-underline transition">
            Continue Shopping
          </Go>
        </div>
      </Shell>
    );
  }

  if (bag.length === 0) {
    return (
      <Shell>
        <div className="text-center py-[48px] sm:py-[60px] animate-modal-pop">
          <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto text-[#86868b] mb-4 animate-apple-float-subtle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] m-0">Your bag is empty.</h1>
          <p className="text-[15px] sm:text-[17px] text-[#6e6e73] m-0 mt-2">Free delivery and free returns on every order.</p>
          <Go to="store" className="inline-block mt-8 bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white rounded-full px-[26px] py-[12px] text-[16px] sm:text-[17px] no-underline transition">
            Shop iPhone
          </Go>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="text-center">
        <h1 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold text-[#1d1d1f] m-0">
          Review your bag.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#6e6e73] m-0 mt-2">Free delivery and free returns.</p>
      </div>

      {/* Cart toolbar with Delete Cart action */}
      <div className="flex items-center justify-between mt-[32px] sm:mt-[40px] pb-3 border-b border-[#d2d2d7]">
        <span className="text-[14px] sm:text-[15px] text-[#6e6e73] font-medium">
          {bag.length} {bag.length === 1 ? 'product' : 'products'} ({bag.reduce((n, x) => n + x.qty, 0)} items)
        </span>
        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-medium text-[#e30000] hover:text-[#b80000] hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-red-200 hover:border-red-300"
          title="Delete all items from Bag"
        >
          <TrashIcon size={14} />
          Delete Cart
        </button>
      </div>

      <ul className="list-none m-0 p-0">
        {bag.map((it) => (
          <li key={it.key} className="flex gap-3 sm:gap-6 md:gap-8 py-5 sm:py-6 border-b border-[#d2d2d7] transition-all">
            <Thumb item={it} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h2 className="text-[16px] sm:text-[18px] md:text-[21px] font-semibold text-[#1d1d1f] m-0 leading-snug">{it.name}</h2>
                  {it.detail && <p className="text-[12px] text-[#6e6e73] m-0 mt-1">{it.detail}</p>}
                </div>
                <p className="text-[16px] sm:text-[18px] md:text-[21px] font-semibold text-[#1d1d1f] m-0 sm:text-right mt-1 sm:mt-0">{money(it.price * it.qty)}</p>
              </div>
              <div className="flex items-center justify-between mt-3 sm:mt-4">
                <label className="text-[13px] sm:text-[14px] text-[#1d1d1f] flex items-center gap-2">
                  Qty
                  <select
                    value={it.qty}
                    onChange={(e) => setQty(it.key, Number(e.target.value))}
                    className="border border-[#d2d2d7] rounded-[8px] px-2 py-1 text-[13px] sm:text-[14px] bg-white cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => removeFromBag(it.key)}
                  className="inline-flex items-center gap-1.5 text-[#e30000] hover:text-[#b80000] hover:bg-red-50 px-2.5 py-1 rounded-md text-[13px] sm:text-[14px] font-medium transition-colors cursor-pointer border-0 bg-transparent"
                  title={`Delete ${it.name} from Bag`}
                >
                  <TrashIcon size={14} />
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="md:ml-[152px] mt-6 space-y-2 text-[15px] sm:text-[17px] text-[#1d1d1f]">
        <Row label="Subtotal" value={money(subtotal)} />
        <Row label="Shipping" value="FREE" />
        <Row label="Estimated tax" value={money(tax)} />
        <div className="border-t border-[#d2d2d7] pt-4 mt-4">
          <Row label={<span className="text-[19px] sm:text-[21px] md:text-[24px] font-semibold">Total</span>} value={<span className="text-[19px] sm:text-[21px] md:text-[24px] font-semibold">{money(total)}</span>} />
          <p className="text-right text-[12px] text-[#6e6e73] m-0 mt-1">or ${(total / 24).toFixed(2)}/mo. for 24 mo. at 0% APR</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6">
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="text-[14px] text-[#86868b] hover:text-[#e30000] bg-transparent border-0 cursor-pointer hover:underline py-2 sm:mr-auto"
          >
            Delete Cart
          </button>
          <Go to="store" className="text-center border border-[#0071e3] text-[#0071e3] rounded-[12px] px-[28px] py-[12px] sm:py-[14px] text-[16px] sm:text-[17px] no-underline hover:bg-[#0071e3]/5 w-full sm:w-auto">
            Continue Shopping
          </Go>
          <button
            type="button"
            onClick={() => {
              setOrder({ no: `W${Math.floor(100000000 + Math.random() * 899999999)}`, total });
              clearBag();
            }}
            className="bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 transition text-white rounded-[12px] border-0 px-[40px] py-[12px] sm:py-[14px] text-[16px] sm:text-[17px] cursor-pointer w-full sm:w-auto font-medium"
          >
            Check Out
          </button>
        </div>
      </div>

      {/* Delete Cart confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[dropdown_.2s_ease-out]">
          <div className="bg-white rounded-[24px] p-6 sm:p-7 max-w-[400px] w-full shadow-2xl text-center animate-modal-pop border border-[#d2d2d7]/40">
            <div className="w-14 h-14 rounded-full bg-red-100 text-[#e30000] flex items-center justify-center mx-auto mb-4">
              <TrashIcon size={26} />
            </div>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1d1d1f] m-0">Delete Cart?</h3>
            <p className="text-[14px] text-[#6e6e73] m-0 mt-2 leading-relaxed">
              Are you sure you want to remove all {bag.length} {bag.length === 1 ? 'item' : 'items'} from your shopping bag?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-[#d2d2d7] text-[#1d1d1f] text-[14px] font-medium hover:bg-[#f5f5f7] cursor-pointer transition"
              >
                Keep Items
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowClearConfirm(false);
                  clearBag();
                }}
                className="flex-1 py-2.5 rounded-full bg-[#e30000] hover:bg-[#c90000] active:scale-95 text-white text-[14px] font-medium cursor-pointer transition shadow-sm"
              >
                Delete Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const Shell = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-[980px] mx-auto px-4 md:px-8 pt-[36px] sm:pt-[48px] md:pt-[72px] pb-[80px] sm:pb-[100px]">{children}</div>
  </section>
);
