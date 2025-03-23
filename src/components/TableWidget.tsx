import { usePasswordContext } from '@/data/PasswordContext';

import { LoginForm } from './login-form';
import { DataTable } from './DataTable';
export const TableWidget = () => {
    const { state } = usePasswordContext();

    if (!state.token) {
       return (<LoginForm />) 
    }
  if(state.token) {
    return (
        <DataTable />
    )
  }
}
