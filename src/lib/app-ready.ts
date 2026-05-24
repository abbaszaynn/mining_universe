const ROUTE_READY_EVENT = "gos:route-ready";
const CANVAS_READY_EVENT = "gos:canvas-ready";

export function markRouteReady() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.routeReady = "true";
  window.dispatchEvent(new Event(ROUTE_READY_EVENT));
}

export function clearRouteReady() {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset.routeReady;
}

export function markCanvasReady() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.gosCanvasReady = "true";
  window.dispatchEvent(new Event(CANVAS_READY_EVENT));
}

export function clearCanvasReady() {
  if (typeof document === "undefined") return;
  delete document.documentElement.dataset.gosCanvasReady;
}

export function pageRequiresCanvas() {
  if (typeof document === "undefined") return false;
  return Boolean(document.querySelector("[data-gos-requires-canvas]"));
}

export function isPageReady() {
  const root =
    document.querySelector("[data-gos-page-root]") ??
    document.querySelector("main");

  if (!root || root.childElementCount === 0) return false;

  if (pageRequiresCanvas()) {
    return document.documentElement.dataset.gosCanvasReady === "true";
  }

  return true;
}

export function waitForRouteReady(timeoutMs = 20000): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise((resolve) => {
    if (document.documentElement.dataset.routeReady === "true" && isPageReady()) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timeoutId);
      window.removeEventListener(ROUTE_READY_EVENT, onReady);
      window.removeEventListener(CANVAS_READY_EVENT, onReady);
      resolve();
    };

    const onReady = () => {
      if (isPageReady()) finish();
    };

    const observer = new MutationObserver(onReady);
    observer.observe(document.body, { childList: true, subtree: true });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-gos-canvas-ready"],
    });

    const timeoutId = window.setTimeout(finish, timeoutMs);
    window.addEventListener(ROUTE_READY_EVENT, onReady);
    window.addEventListener(CANVAS_READY_EVENT, onReady);
    onReady();
  });
}
