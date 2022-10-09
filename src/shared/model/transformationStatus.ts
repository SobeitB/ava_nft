export function transformationStatus(idStatus:number) {
   switch (idStatus){
      case 0:
         return 'Not started';
      case 1:
         return 'Og';
      case 2:
         return 'White List';
      case 3:
         return 'Public';
      default:
         return 'Not started';
   }
}