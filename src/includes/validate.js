import {
  Field as VeeField,
  Form as VeeForm,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";

// Importing rules.
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  max_value as maxVal,
  min_value as minVal,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeField", VeeField);
    app.component("VeeForm", VeeForm);
    app.component("ErrorMessage", ErrorMessage);

    // rules:
    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("max_val", maxVal);
    defineRule("min_val", minVal);
    defineRule("password_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} is may only contain alphabetic characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_val: `The field ${ctx.field} is too low.`,
          max_val: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this for the field ${ctx.field}.`,
          country_excluded:
            "Due to restrictions, we do not accept users from this location.",
          password_mismatch: "The passwords don't match",
          tos: "You must accept the Terms of Service.",
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
