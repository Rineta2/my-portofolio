import {
  parseISO,
  formatDistanceToNow,
  differenceInMonths,
  format,
} from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (date) => {
  const parsedDate = parseISO(date);
  const monthsDifference = differenceInMonths(new Date(), parsedDate);

  if (monthsDifference >= 1) {
    return format(parsedDate, "dd MMMM yyyy", { locale: id });
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: id });
};
