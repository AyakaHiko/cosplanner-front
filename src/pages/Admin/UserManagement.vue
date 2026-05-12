<script setup>
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CPagination, CPaginationItem, CButton, CAlert, CSpinner, CFormInput
} from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { cilPencil, cilTrash, cilSearch } from '@coreui/icons';
import EditUserModal from '@/components/Admin/EditUserModal.vue';
import { useUserManagement } from './userManagement';
import { watch } from 'vue';

const {
  users, pagination, loading, error,
  editModalVisible, editingUser, searchQuery,
  fetchUsers, nextPage, prevPage,
  openEditModal, handleUpdate, deleteUser
} = useUserManagement();

let timeout = null;
watch(searchQuery, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchUsers(1);
  }, 500);
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">User Management</h5>
        <div style="width: 300px;">
          <CFormInput
            v-model="searchQuery"
            placeholder="Search by name or email..."
          >
            <template #prepend>
              <CIcon :icon="cilSearch" />
            </template>
          </CFormInput>
        </div>
      </div>
      <div class="card-body">
        <CAlert v-if="error" color="danger">{{ error }}</CAlert>

        <div v-if="loading" class="text-center py-4">
          <CSpinner color="primary" />
        </div>

        <template v-else>
          <CTable align="middle" responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in users" :key="user.id">
                <CTableDataCell>{{ user.id }}</CTableDataCell>
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.email }}</CTableDataCell>
                <CTableDataCell>
                  <span :class="['badge', user.role === 'admin' ? 'bg-danger' : 'bg-primary']">
                    {{ user.role }}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" class="me-2" @click="openEditModal(user)">
                    <CIcon :icon="cilPencil" />
                  </CButton>
                  <CButton color="danger" size="sm" @click="deleteUser(user.id)">
                    <CIcon :icon="cilTrash" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>

          <CPagination v-if="pagination.last_page > 1" align="center" class="mt-3">
            <CPaginationItem
              :disabled="pagination.current_page === 1"
              component="button"
              @click="prevPage"
            >
              &laquo;
            </CPaginationItem>
            <CPaginationItem
              v-for="page in pagination.last_page"
              :key="page"
              :active="page === pagination.current_page"
              component="button"
              @click="fetchUsers(page)"
            >
              {{ page }}
            </CPaginationItem>
            <CPaginationItem
              :disabled="pagination.current_page === pagination.last_page"
              component="button"
              @click="nextPage"
            >
              &raquo;
            </CPaginationItem>
          </CPagination>
        </template>
      </div>
    </div>

    <EditUserModal
      v-model:visible="editModalVisible"
      :user="editingUser"
      @save="handleUpdate"
    />
  </div>
</template>
