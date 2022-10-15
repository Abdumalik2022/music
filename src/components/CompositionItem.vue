<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div
      class="p-5 rounded text-white text-center font-bold mb-4"
      :class="alert_variant"
      v-if="show_alert"
    >
      {{ alert_msg }}
    </div>
    <div v-if="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">{{
            $t("composition.songTitle")
          }}</label>
          <vee-field
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            name="modified_name"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="modified_name" class="text-red-600" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t("composition.genre") }}</label>
          <vee-field
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            name="genre"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage name="genre" class="text-red-600" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 mr-1.5"
          :disabled="in_submission"
        >
          {{ $t("buttons.submit") }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click="showForm = !showForm"
          @click.prevent="show_alert = false"
          :disabled="in_submission"
        >
          {{ $t("buttons.goBack") }}
        </button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { songsCollection, storage } from "../includes/firebase";
export default {
  name: "CompositionItem",
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_msg: "Please wait! Updading song info.",
    };
  },
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_varian = "bg-blue-500";
      this.alert_msg = this.$t("composition.alertWait");

      try {
        await songsCollection.doc(this.song.docId).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg = this.$t("composition.alertError");
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_msg = this.$t("composition.alertSuccess");
    },
    async deleteSong() {
      // Deleting song from the storage.
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);
      await songRef.delete();

      // Deleting song from the firestore-database.
      await songsCollection.doc(this.song.docId).delete();

      // Deleting song from the page.
      this.removeSong(this.index);
    },
  },
};
</script>
