export interface IProduct {
    Id: number,
    Name: string,
    Description: string,
    Quantity: number,
    Unit: string,
    Сurrency: string,
    Price: number,
    DiscountedPrice: number,
    Images: {
        FileName: string,
        FileExtension: string,
        Image: string,
      }
 
}
export interface User{
  LogoImg: string,
  UsedGuid: string,
  UserName: string,
}