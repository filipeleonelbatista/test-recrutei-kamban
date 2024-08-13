export const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

export const formatDate = (date: string): string => {
  const options = { day: '2-digit', month: '2-digit' } as const;
  return new Date(date).toLocaleDateString('pt-BR', options);
};

export const getDaysRemaining = (dueDate: string): { days: number; color: string; message: string } => {
  const today = new Date();
  const deadline = new Date(dueDate);
  const timeDiff = deadline.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysRemaining > 0) {
    if (daysRemaining <= 5) {
      return { days: daysRemaining, color: 'text-[#FFA500]', message: `Faltam ${daysRemaining} dias` };
    } else {
      return { days: daysRemaining, color: 'text-[#63B150]', message: `Faltam ${daysRemaining} dias` };
    }
  } else {
    return { days: Math.abs(daysRemaining), color: 'text-[#E14942]', message: `Atrasado há ${Math.abs(daysRemaining)} dias` };
  }
};