function queryCheck(selector) {
  document.createDocumentFragment().querySelector(selector);
}

export default function isSelectorValid(selector) {
  try {
    queryCheck(selector);
  } catch (e) {
    return false;
  }
  return true;
}
