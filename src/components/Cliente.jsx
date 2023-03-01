import { Form, useNavigate, redirect } from 'react-router-dom';
import { eliminarCliente } from '../data/clientes';

export async function action({ params }) {
  await eliminarCliente(params.clienteId);
  return redirect('/');
}

function Cliente({ cliente }) {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6">
        <p className="text-2xl  text-gray-800 space-y-2">{nombre}</p>
        <p className="text-gray-600">{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600">
          {' '}
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          {' '}
          <span className="text-gray-800 uppercase font-bold">TEL: </span>
          {telefono}
        </p>
      </td>
      <td className="p-6 flex-center space-x-4">
        <button
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          editar
        </button>

        <Form
          method="POST"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm('¿Estás seguro de eliminar este cliente?')) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >
            eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Cliente;
