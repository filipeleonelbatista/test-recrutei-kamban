import CardTarefa, { CardTarefaProps } from "@/components/card-tarefa";
import { Meta, StoryObj } from "@storybook/react";
import { Task } from "../context/TasksContext";

export default {
  title: "Components/CardTarefa",
  component: CardTarefa,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#E7EDF0",
        }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: "clicked" },
    onDragStart: { action: "dragged" },
  },
} as Meta<CardTarefaProps>;

export const Default: StoryObj<CardTarefaProps> = {
  args: {
    tarefa: {
      id: "1",
      date: "2024-08-19",
      title: "Concluir a documentação",
      status: "development",
      description: "Este é um exemplo de tarefa que precisa ser concluída até a data limite.",
      responsible: ["João Silva", "Maria Souza"],
    } as Task,
  },
};

export const Developed: StoryObj<CardTarefaProps> = {
  args: {
    tarefa: {
      id: "2",
      date: "2024-08-15",
      title: "Implementar a funcionalidade X",
      status: "developed",
      description: "Esta tarefa foi concluída, mas está fora do prazo.",
      responsible: ["Ana Paula"],
    } as Task,
  },
};

export const Backlog: StoryObj<CardTarefaProps> = {
  args: {
    tarefa: {
      id: "3",
      date: "2024-09-01",
      title: "Planejar a sprint",
      status: "backlog",
      description: "Tarefa planejada para a próxima sprint.",
      responsible: ["Carlos Alberto"],
    } as Task,
  },
};

export const Doing: StoryObj<CardTarefaProps> = {
  args: {
    tarefa: {
      id: "4",
      date: "2024-08-20",
      title: "Revisar o código",
      status: "doing",
      description: "Revisão de código para garantir a qualidade.",
      responsible: ["Paula Lima", "Rafael Santos"],
    } as Task,
  },
};