import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "この項目は必須入力です。"
});
