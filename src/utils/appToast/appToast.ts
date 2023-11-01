import { toast } from 'react-toastify';
import { ToastType } from './appToast.type';

export const appToast = (
  message: string,
  type: ToastType = ToastType.success
) => {
  return toast(message, {
    autoClose: false,
    type: type,
  });
};
