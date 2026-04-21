<script setup>
import { ref, watch } from 'vue';
import {
  CButton, CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CForm, CFormInput, CFormSelect, CFormLabel
} from '@coreui/vue';

const props = defineProps({
  visible: Boolean,
  user: Object
});

const emit = defineEmits(['update:visible', 'save']);

const editForm = ref({
  name: '',
  email: '',
  role: ''
});

watch(() => props.user, (newUser) => {
  if (newUser) {
    editForm.value = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || 'user'
    };
  }
}, { immediate: true });

const handleClose = () => {
  emit('update:visible', false);
};

const handleSave = () => {
  emit('save', editForm.value);
};
</script>

<template>
  <CModal :visible="visible" @close="handleClose">
    <CModalHeader>
      <CModalTitle>Edit User</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <div class="mb-3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput v-model="editForm.name" />
        </div>
        <div class="mb-3">
          <CFormLabel>Email</CFormLabel>
          <CFormInput v-model="editForm.email" />
        </div>
        <div class="mb-3">
          <CFormLabel>Role</CFormLabel>
          <CFormSelect v-model="editForm.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </CFormSelect>
        </div>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="handleClose">Cancel</CButton>
      <CButton color="primary" @click="handleSave">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
