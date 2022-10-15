<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.name") }}</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Alex"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.email") }}</label>
      <vee-field
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="alex@gmail.com"
        name="email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.age") }}</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.password") }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.passwordConfirm") }}</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("form.country") }}</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">{{ $t("form.tos") }}</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ $t("auth.register") }}
    </button>
  </vee-form>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "../stores/user";

export default {
  data() {
    return {
      schema: {
        name: "required|min:3|max:20|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|max_val:100|min_val:18",
        password: "required|min:3|max:100",
        confirm_password: "password_mismatch:@password",
        country: "required|country_excluded:Antarctica",
        tos: "tos",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: this.$t("register.alertWait"),
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = this.$t("register.alertWait");

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg = this.$t("register.alertError");
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = this.$t("register.alertSuccess");

      console.log(values);
      window.location.reload();
    },
  },
};
</script>
