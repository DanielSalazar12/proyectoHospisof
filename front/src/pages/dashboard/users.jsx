import { useUsersLogic } from "@/hooks/users/useUsersLogic";
import UsersForm from "@/components/usuarios/formUsers";
import UsersTable from "@/components/usuarios/usersTable";
import { Button } from "@material-tailwind/react";


export function Users() {
    const {
        open,
        abrirModalUsers,
        formData,
        users,
        roles,
        handleChange,
        modoEdicion,
        handleUpdate,
        handleDelete,
        handleEditClick,

    } = useUsersLogic();


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex justify-end px-6">
                <Button color="blue" onClick={abrirModalUsers}>
                    Registrar Usuario
                </Button>
            </div>

            <UsersForm
                open={open}
                formData={formData}
                abrirModalUsuarios={abrirModalUsers}
                roles={roles}
                handleChange={handleChange}
                modoEdicion={modoEdicion}
                handleUpdate={handleUpdate}

            />
            <UsersTable
                users={users}
                roles={roles}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
            />
        </div>
    );
}

export default Users;


