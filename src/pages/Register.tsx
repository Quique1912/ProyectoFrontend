import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthService } from "../services/authService";
import User from "../models/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import ErrorMsgData from "../utils/ErrorMsgData";

const Register: React.FC = () => {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    course: "",
    accepNotifications: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      setErrors({});

      e.preventDefault();

      await AuthService.registerUser(form);

      toast.success("Usuario registrado con éxito!");
      navigate("/offers");
    } catch (error) {
      toast.error("Error al registrar el usuario.");

      if(Array.isArray(error)){
        const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
          const errorDetail = err as ErrorMsgData;
          acc[errorDetail.path] = errorDetail.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      }else if(error instanceof Error){
        const msg = error instanceof Error ? error.message : "Error desconocido"
        setErrors({message: msg || 'Error desconocido'});
      }else{
        setErrors({message: error as string || 'Error desconocido'});
      }
      
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    //if(name==='idCategory') valueNew = Number(value)
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({ ...form, [name]: checked });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
      <InputForm text="Nombre" name="name" value={form.name || ''} handleChange={handleChange} error={errors.name} /> 
      <InputForm text="Apellidos" name="surname" value={form.surname || ''} handleChange={handleChange} error={errors.surname} /> 
      <InputForm text="Email" name="email" value={form.email || ''} handleChange={handleChange} error={errors.email} /> 
      <InputForm text="Password" name="password" value={form.password || ''} handleChange={handleChange} error={errors.password} /> 

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="acceptNotifications"
            name="accepNotifications"
            type="checkbox"
            value={form.accepNotifications ? "on" : "off"}
            onChange={handleChangeCheckbox}
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
       
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Aceptas recibir notificaciones?
        </label>
        {errors.accepNotifications && <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.accepNotifications}</p> }

      </div>
      {errors && errors.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;