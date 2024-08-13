import { formatDate, getDaysRemaining, truncateDescription } from "@/utils/utils";
import { Task } from "../context/TasksContext";
import { motion } from "framer-motion";

interface CardTarefaProps {
  tarefa: Task;
  onClick: (tarefa: Task) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export default function CardTarefa({ tarefa, onClick, onDragStart }: CardTarefaProps) {
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
    <motion.div
      layout
      layoutId={tarefa.id}
      onClick={() => onClick(tarefa)}
      onDragStart={(e) => onDragStart(e, tarefa.id)}
      data-status={tarefa.status}
      draggable={true}
      className="cursor-grab active:cursor-grabbing data-[status=developed]:border border-[#63B150] bg-white rounded-3xl shadow-md w-full p-4 relative"
    >
      <img src="./checkmark.svg" width={14} height={18} data-status={tarefa.status} className="data-[status=developed]:flex hidden absolute top-[-4px]" />
      <h6 className="font-semibold text-sm mb-2">{tarefa.title}</h6>
      <p className="text-[10px] text-[#747F93] mb-4">
        {truncateDescription(tarefa.description, 117)}
      </p>
      <div className="border border-dashed p-2 border-[#747F93] rounded-full flex flex-row items-end justify-between">
        <p className="text-[#747F93] text-[10px]">Data limite: {formatDate(tarefa.date)}</p>
        <p className={`text-[10px] font-semibold ${tarefa.status === 'developed' ? statusColor : color}`}>
          {tarefa.status === 'developed' ? statusMessage : message}
        </p>
      </div>
      <div className="w-full flex-wrap flex flex-row gap-2 mt-4">
        {tarefa.responsible.map(responsavel => (
          <span key={responsavel} className="bg-[#1E90FF] p-2 rounded-lg text-white text-[10px]">
            {responsavel}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
