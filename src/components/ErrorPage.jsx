import { useRouteError } from 'react-router-dom'; // Path: src\components\ErrorPage.jsx

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900 text-center mb-10">
        CRM - CLIENTES
      </h1>
      <div className="text-center bg-red-600 text-white font-bold p-3 uppercase">
        {error.message}
      </div>
      <p className="text-center text-2xl">Hubo un error!</p>
    </div>
  );
} // Path: src\components\ErrorPage.jsx
