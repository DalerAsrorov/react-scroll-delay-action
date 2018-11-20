export const getParent = (parentNode: any): any | Window =>
  parentNode ? parentNode : window;

export const isScrolledIntoView = (
  domElement: any,
  parentNode?: any
): boolean => {
  if (!domElement) {
    return false;
  }

  const rect = domElement.getBoundingClientRect();
  const parent = getParent(parentNode);
  const topVal = rect.top;
  const bottomVal = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = topVal >= 0 && bottomVal <= window.innerHeight;

  // Uncomment line below if decided that partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;

  return isVisible;
};
