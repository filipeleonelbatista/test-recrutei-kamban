import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Task } from "@/context/TasksContext";
import { useTasks } from "@/hooks/useTasks";

export default function ModalAdicionarTarefa({ onClose }) {
  const { createTask } = useTasks();

  const [selectedResponsaveis, setSelectedResponsaveis] = useState([]);

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descricao: "",
      responsaveis: [],
      dataLimite: "",
    },
    validationSchema: Yup.object({
      titulo: Yup.string()
        .max(50, "Máximo de 50 caracteres")
        .required("Campo obrigatório"),
      descricao: Yup.string()
        .max(200, "Máximo de 200 caracteres")
        .required("Campo obrigatório"),
      responsaveis: Yup.array()
        .min(1, "Selecione pelo menos um responsável")
        .required("Campo obrigatório"),
      dataLimite: Yup.date().required("Campo obrigatório"),
    }),
    onSubmit: (values) => {

      const createdTask: Task = {
        date: values.dataLimite,
        description: values.descricao,
        responsible: values.responsaveis,
        id: uuidv4(),
        status: "backlog",
        title: values.titulo
      }

      createTask(createdTask)

      alert("Tarefa criada com sucesso!")
      onClose()
    },
  });

  const handleResponsavelChange = (event) => {
    const value = event.target.value;
    if (!selectedResponsaveis.includes(value)) {
      setSelectedResponsaveis([...selectedResponsaveis, value]);
      formik.setFieldValue("responsaveis", [...selectedResponsaveis, value]);
    }
  };

  const removeResponsavel = (responsavel) => {
    const updatedResponsaveis = selectedResponsaveis.filter(
      (item) => item !== responsavel
    );
    setSelectedResponsaveis(updatedResponsaveis);
    formik.setFieldValue("responsaveis", updatedResponsaveis);
  };

  return (
    <div className="fixed z-20 h-screen w-screen bg-black/30 flex flex-col items-center gap-2">
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full bg-white shadow-md text-[#747F93] mt-5"
      >
        {"X"}
      </button>
      <div className="max-w-[430px] max-h-[80%] overflow-auto w-full bg-white shadow-md px-4 py-5 rounded-3xl">
        <div className="mb-[19px]">
          <h4 className="font-semibold text-lg mb-2">Adicionar tarefa</h4>
          <p className="text-[10px] text-[#747F93]">Preencha os detalhes da nova tarefa</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="titulo" className="text-xs font-bold text-[#747F93]">Título da tarefa</label>
            <input
              type="text"
              id="titulo"
              {...formik.getFieldProps("titulo")}
              className={`bg-white rounded-full border px-4 py-2 ${formik.touched.titulo && formik.errors.titulo ? "border-red-500" : "border-[#ADB8CB]"}`}
            />
            {formik.touched.titulo && formik.errors.titulo ? (
              <div className="text-red-500 text-xs">{formik.errors.titulo}</div>
            ) : null}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="descricao" className="text-xs font-bold text-[#747F93]">Descrição da tarefa</label>
            <textarea
              id="descricao"
              rows={4}
              {...formik.getFieldProps("descricao")}
              className={`bg-white rounded-3xl border px-4 py-2 ${formik.touched.descricao && formik.errors.descricao ? "border-red-500" : "border-[#ADB8CB]"}`}
            ></textarea>
            {formik.touched.descricao && formik.errors.descricao ? (
              <div className="text-red-500 text-xs">{formik.errors.descricao}</div>
            ) : null}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="responsaveis" className="text-xs font-bold text-[#747F93]">Responsáveis</label>
            <select
              id="responsaveis"
              value=""
              onChange={handleResponsavelChange}
              className={`bg-white rounded-full border px-4 py-2 ${formik.touched.responsaveis && formik.errors.responsaveis ? "border-red-500" : "border-[#ADB8CB]"}`}
            >
              <option value="" disabled>Selecione um responsável</option>
              <option value="Matheus Gomes">Matheus Gomes</option>
              <option value="Pedro Paulo">Pedro Paulo</option>
              <option value="Paulo">Paulo</option>
            </select>
            {formik.touched.responsaveis && formik.errors.responsaveis ? (
              <div className="text-red-500 text-xs">{formik.errors.responsaveis}</div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedResponsaveis.map((responsavel) => (
              <div key={responsavel} className="bg-[#1E90FF] p-2 rounded-lg text-white text-[10px] flex items-center">
                {responsavel}
                <button type="button" onClick={() => removeResponsavel(responsavel)} className="ml-2 w-4 h-4 rounded-full bg-red-400 text-white">X</button>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col gap-2 mb-8">
            <label htmlFor="dataLimite" className="text-xs font-bold text-[#747F93]">Data limite</label>
            <input
              type="date"
              id="dataLimite"
              {...formik.getFieldProps("dataLimite")}
              className={`w-6/12 bg-white rounded-full border px-4 py-2 ${formik.touched.dataLimite && formik.errors.dataLimite ? "border-red-500" : "border-[#ADB8CB]"}`}
            />
            {formik.touched.dataLimite && formik.errors.dataLimite ? (
              <div className="text-red-500 text-xs">{formik.errors.dataLimite}</div>
            ) : null}
          </div>

          <button type="submit" className="bg-[#4169E1] px-4 py-3 rounded-full text-white hover:bg-[#3458c4] transition-all">
            Adicionar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
