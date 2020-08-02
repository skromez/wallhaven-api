export interface ImageInterface {
   id : string,
   url : string,
   short_url : string,
   views : number,
   favorites : number,
   source : string,
   purity : string,
   category : string,
   dimension_x : number,
   dimension_y : number,
   resolution : string,
   ratio : string,
   file_size : number,
   file_type : string,
   created_at : string,
   colors : [
    '#999999',
    '#cccccc',
    '#424153',
    '#996633',
    '#ffcc33'
  ],
   path : string,
   thumbs : {
     large : string,
     original : string,
     small : string,
  }
}
