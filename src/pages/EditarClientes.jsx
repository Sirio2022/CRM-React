import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from 'react-router-dom';
import { obtenerCliente, actualizarCliente } from '../data/clientes';
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Cliente no existe en la base de datos',
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const email = formData.get('email');

  // Validación de datos
  const errors = [];
  if (Object.values(data).includes('')) {
    errors.push('Todos los campos son obligatorios');
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errors.push('El email no es válido');
  }

  // Retornar datos si hay errores
  if (Object.keys(errors).length) {
    return errors;
  }

  // TODO: Actualizar cliente
  await actualizarCliente(params.clienteId, data);

  return redirect('/');
}

function EditarClientes() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errors = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Ingresa los datos a modificar del cliente en el formulario
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="POST" noValidate>
          <Formulario cliente={cliente} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 font-bold text-white text-lg cursor:pointer hover:bg-blue-900"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarClientes;
