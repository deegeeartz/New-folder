export const openConsultant = (prompt = "") => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("quonote:open-consultant", {
      detail: { prompt },
    })
  );
};