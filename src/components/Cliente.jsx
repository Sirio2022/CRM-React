function Cliente({ cliente }) {
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
      <td className="p-6 flex gap-5">
        <button className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs">
          editar
        </button>

        <button className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">
          eliminar
        </button>
      </td>
    </tr>
  );
}

export default Cliente;
