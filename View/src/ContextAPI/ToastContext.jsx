import { Toaster } from 'sonner';

function ToastContext({children}) {
  return (
    <>
      <Toaster position="top-right" richColors />
     {children}
    </>
  );
}
export default ToastContext;
