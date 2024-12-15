import {
  parseISO,
  formatDistanceToNow,
  differenceInDays,
  format,
} from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (date) => {
  const parsedDate = parseISO(date);
  const daysDifference = differenceInDays(new Date(), parsedDate);

  if (daysDifference > 7) {
    return format(parsedDate, "dd MMMM yyyy", { locale: enUS });
  }

  const formattedDate = formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: enUS,
  });
  return formattedDate.replace("about ", "");
};
