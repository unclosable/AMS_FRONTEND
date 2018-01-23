export const SENDOFFER = 'SENDOFFER'
export function sendOffer(menu) {
  return {
    type: SENDOFFER,
    menu
  }
}
