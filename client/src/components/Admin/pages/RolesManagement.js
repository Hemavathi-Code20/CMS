import React, { useEffect, useState } from "react";
import axios from "axios";
import RolesForm from "../Components/RolesForm";
import RolesTable from "../Components/RolesTable";

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles : ", error);
    }
  };

  const addRoles = async (newRole) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/roles",
        newRole
      );
      setRoles([...roles, response.data]);
    } catch (error) {
      console.error("Error adding Roles : ", error);
    }
  };

  const updateRoles = async (updatedRoles) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/roles/${updatedRoles._id}`,
        updatedRoles
      );
      setRoles(
        roles.map((roles) =>
          roles._id === updatedRoles._id ? response.data : roles
        )
      );
      setSelectedRole(null); // Clear the form after updating
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const deleteRoles = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/roles/${id}`);
      setRoles(roles.filter((roles) => roles._id !== id));
    } catch (error) {
      console.error("Error deleting roles:", error);
    }
  };

  const handleEditRoles = (roles) => {
    setSelectedRole(roles); // Set the selected item for editing
  };
  return (
    <div>
      <h1>User Management</h1>
      <RolesForm
        onAddRole={addRoles}
        onUpdateRole={updateRoles}
        selectedRole={selectedRole}
      />
      <RolesTable
        roles={roles}
        onUpdateRole={handleEditRoles}
        onDeleteRole={deleteRoles}
      />
    </div>
  );
};

export default RolesManagement;
