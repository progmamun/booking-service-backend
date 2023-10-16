/* eslint-disable no-unused-vars */
export enum LocationEnum {
  Alabama = 'Alabama',
  Alaska = 'Alaska',
  Arizona = 'Arizona',
  Arkansas = 'Arkansas',
  California = 'California',
  Colorado = 'Colorado',
  Connecticut = 'Connecticut',
  Delaware = 'Delaware',
  Florida = 'Florida',
  Georgia = 'Georgia',
}

export const ServiceSearchableFields = ['name', 'location', 'category'];
export const ServiceFilterableFields = [
  'searchTerm',
  'minPriceRange',
  'maxPriceRange',
  'roomType',
];
