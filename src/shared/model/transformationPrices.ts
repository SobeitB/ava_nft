
export function transformationPrices(idStatus:number, count:number) {
   // const priceWl = .007;
   // const pricePublic = .02;

   // testnet
   const priceWl = .00007;
   const pricePublic = .0002;

   switch (idStatus){
      case 0:
         return 0;
      case 1:
         return 0;
      case 2:
         return (priceWl * count);
      case 3:
         return (pricePublic * count);
      default:
         return 0;
   }
}