<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "checkbox",
    validator: (value) => ["checkbox", "radio", "switch"].includes(value),
  },
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [Array, String, Number, Boolean],
    default: null,
  },
  inputValue: {
    type: [String, Number, Boolean],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const inputType = computed(() =>
  props.type === "radio" ? "radio" : "checkbox"
);

const formClass = computed(() => {
  if (props.type === "switch") {
    return "form-check form-switch";
  }
  return "form-check";
});
</script>

<template>
  <div :class="formClass" class="mb-3">
    <input
      v-model="computedValue"
      :type="inputType"
      :name="name"
      :value="inputValue"
      class="form-check-input"
      :id="name + '-' + inputValue"
    />
    <label class="form-check-label ps-2" :for="name + '-' + inputValue">
      {{ label }}
    </label>
  </div>
</template>
