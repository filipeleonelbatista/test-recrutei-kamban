import { Task } from "@/context/TasksContext";
import { formatDate, getDaysRemaining } from "@/utils/utils";

interface ModalDetalhesTarefaProps {
  tarefa: Task
  onClose: () => void;
}

export default function ModalDetalhesTarefa({ tarefa, onClose }: ModalDetalhesTarefaProps) {
  const responsaveis = tarefa.responsible || [];

  const { days, color, message } = getDaysRemaining(tarefa.date);

  let statusColor = '';
  let statusMessage = '';

  if (tarefa.status === 'developed') {
    if (days >= 0) {
      statusColor = 'text-[#63B150]';
      statusMessage = 'Entregue no prazo';
    } else {
      statusColor = 'text-[#E14942]';
      statusMessage = 'Fora do prazo';
    }
  }

  return (
    <div className="fixed z-20 h-screen w-screen bg-black/30 flex flex-col items-center gap-2">
      <button onClick={onClose} className="w-10 h-10 rounded-full bg-white shadow-md text-[#747F93] mt-5">{"X"}</button>
      <div className="max-w-[430px] max-h-[80%] overflow-auto w-full bg-white shadow-md px-4 py-5 rounded-3xl">
        <div className="mb-4 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm">{tarefa.title}</h4>
            <p className="text-[10px] text-[#747F93]">
              Responsáveis: {responsaveis.length > 0 ? responsaveis.join(", ") : "Nenhum responsável"}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className={`text-[10px] font-semibold ${tarefa.status === 'developed' ? statusColor : color}`}>
              {tarefa.status === 'developed' ? statusMessage : message}
            </p>
            <div className="w-fit border border-dashed p-2 border-[#747F93] rounded-lg flex flex-row items-end justify-between">
              <p className="text-[#747F93] text-[10px]"> {formatDate(tarefa.date)}</p>
            </div>
          </div>
        </div>

        <p className="bg-[#F1F3F6] px-3 py-4 rounded-xl text-[10px] text-[#747F93]">
          {tarefa.description}
        </p>
      </div>
    </div>
  );
}
