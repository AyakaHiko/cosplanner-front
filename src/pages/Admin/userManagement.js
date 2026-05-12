import { ref, onMounted } from 'vue';
import { adminService } from '@/services/api/adminService';

export function useUserManagement() {
  const users = ref([]);
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    total: 0
  });
  const loading = ref(false);
  const error = ref(null);
  const searchQuery = ref('');

  const editModalVisible = ref(false);
  const editingUser = ref(null);

  const fetchUsers = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await adminService.fetchUsers(page, searchQuery.value);
      const data = await response.json();
      if (response.ok) {
        users.value = data.data;
        pagination.value = {
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total
        };
      } else {
        error.value = data.message || 'Failed to fetch users';
      }
    } catch (e) {
      error.value = 'An error occurred while fetching users';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (pagination.value.current_page < pagination.value.last_page) {
      fetchUsers(pagination.value.current_page + 1);
    }
  };

  const prevPage = () => {
    if (pagination.value.current_page > 1) {
      fetchUsers(pagination.value.current_page - 1);
    }
  };

  const openEditModal = (user) => {
    editingUser.value = user;
    editModalVisible.value = true;
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await adminService.updateUser(editingUser.value.id, formData);
      if (response.ok) {
        editModalVisible.value = false;
        await fetchUsers(pagination.value.current_page);
      } else {
        const data = await response.json();
        alert(data.message || 'Update failed');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await adminService.deleteUser(id);
      if (response.ok) {
        await fetchUsers(pagination.value.current_page);
      } else {
        const data = await response.json();
        alert(data.message || 'Delete failed');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred');
    }
  };

  onMounted(() => {
    fetchUsers();
  });

  return {
    users,
    pagination,
    loading,
    error,
    editModalVisible,
    editingUser,
    searchQuery,
    fetchUsers,
    nextPage,
    prevPage,
    openEditModal,
    handleUpdate,
    deleteUser
  };
}
