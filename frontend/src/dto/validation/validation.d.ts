interface validationConditionsDto {
  regex: RegExp | string;
  message: string;
}

export interface validationdDto {
  value: string;
  validationConditions: Array<validationConditionsDto>;
  setError: any;
}
