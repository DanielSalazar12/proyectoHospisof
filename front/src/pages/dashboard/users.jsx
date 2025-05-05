import { useUsersLogic } from "@/hooks/users/useUsersLogic";
import UsersForm from "@/components/usuarios/formUsers";
import UsersTable from "@/components/usuarios/usersTable";
import { Button } from "@material-tailwind/react";
//import { epsList } from "@/hooks/usePacientesData";

export default function Users() {
    const {
        open,
        abrirModalUsers,
        formData,
        users,
        roles,
        handleChange,
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
            />
            <UsersTable
                users={users}
                roles={roles}
            />



        </div>
    );
}



