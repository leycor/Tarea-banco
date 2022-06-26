import { atom } from "recoil";

export const dniState = atom({
  key: "dniState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const userBankState = atom({
  key: "userBankState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

