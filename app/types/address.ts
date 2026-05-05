export interface AddressForm {
  firstName: string;
  lastName: string;
  address: string;
  addressInfo: string;
  city: string;
  zip: string;
  country: string;
  isPrimary: boolean;
  touched: boolean;
  label?: string;
}
