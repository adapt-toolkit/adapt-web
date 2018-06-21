export function getCookie(cookieStr) {
  if (!cookieStr) {
    return {acceptPolicy: ''};
  }

  const cookieArray = cookieStr.split(';');
  const cookieObj = {};

  cookieArray.forEach((currEl)=>{
    const keyValue = currEl.split('=');
    keyValue[0] = keyValue[0].trim();
    cookieObj[keyValue[0]] = keyValue[1];
  });

  return cookieObj;
}
