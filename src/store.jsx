/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/*
 * App-wide state: the shopping bag + toast messages.
 * Navigation itself is handled by React Router (see App.jsx for the route table).
 *
 * Components pass short route names around (e.g. "store", "section/compare",
 * "page/mac"); toPath() turns them into real URLs:
 *   ''                  -> /
 *   'section/compare'   -> /#compare          (home page, scrolled to #compare)
 *   'store'             -> /store
 *   'store/accessories' -> /store#store-accessories
 *   'buy/iphone-14'     -> /buy/iphone-14
 *   'page/mac'          -> /mac
 *   'bag'               -> /bag
 */
export function toPath(to = '') {
  if (to.startsWith('/')) return to;
  const [page, param] = to.split('/');
  if (!page) return '/';
  if (page === 'section') return `/#${param}`;
  if (page === 'store' && param) return `/store#store-${param}`;
  if (page === 'page') return `/${param}`;
  return `/${to}`;
}

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const routerNavigate = useNavigate();
  const [bag, setBag] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const navigate = useCallback((to) => routerNavigate(toPath(to)), [routerNavigate]);

  const notify = useCallback((message, action) => {
    clearTimeout(toastTimer.current);
    setToast({ message, action, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const addToBag = useCallback(
    (item) => {
      setBag((b) => {
        const found = b.find((x) => x.key === item.key);
        if (found) return b.map((x) => (x.key === item.key ? { ...x, qty: Math.min(x.qty + 1, 10) } : x));
        return [...b, { ...item, qty: 1 }];
      });
      notify(`${item.name} added to your Bag.`, { label: 'Review Bag', to: 'bag' });
    },
    [notify]
  );

  const setQty = useCallback((key, qty) => {
    setBag((b) => (qty <= 0 ? b.filter((x) => x.key !== key) : b.map((x) => (x.key === key ? { ...x, qty } : x))));
  }, []);

  const removeFromBag = useCallback(
    (key) => {
      setBag((b) => {
        const item = b.find((x) => x.key === key);
        if (item) {
          notify(`Removed ${item.name} from your Bag.`, {
            label: 'Undo',
            onClick: () => setBag((prev) => [...prev, item]),
          });
        }
        return b.filter((x) => x.key !== key);
      });
    },
    [notify]
  );

  const clearBag = useCallback(() => {
    setBag((currentBag) => {
      if (currentBag.length === 0) return currentBag;
      const snapshot = [...currentBag];
      notify('Your Bag has been emptied.', {
        label: 'Undo',
        onClick: () => setBag(snapshot),
      });
      return [];
    });
  }, [notify]);

  const value = useMemo(
    () => ({
      navigate,
      bag,
      bagCount: bag.reduce((n, x) => n + x.qty, 0),
      addToBag,
      removeFromBag,
      setQty,
      clearBag,
      toast,
      notify,
      dismissToast: () => setToast(null),
    }),
    [navigate, bag, addToBag, removeFromBag, setQty, clearBag, toast, notify]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);

/**
 * After every navigation: scroll to the #hash target if there is one, otherwise to the top.
 * Keyed on location.key so tapping the same link twice scrolls again.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // wait for the new page to render before looking for the target
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, hash, key]);
  return null;
}

export const money = (n) =>
  n === 0 ? 'Free' : `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
