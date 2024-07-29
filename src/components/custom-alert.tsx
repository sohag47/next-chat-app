import {Card, CardBody} from "@nextui-org/react";
import {useState} from "react";

type TCustomAlert = {
  success: boolean;
  status?: number;
  message?: string;
  errors?: object | object[] | string | null;
  data?: object | object[] | string | null;
};

const CustomAlert = () => {
  const [alertState, setAlertState] = useState<TCustomAlert>();
  // console.log("alertState :>> ", alertState);

  const FormatErrorResponse = () => {
    if (Array.isArray(alertState?.errors) && alertState?.errors.length > 0) {
      // return errors list
      return (
        <ul className="mt-2 text-sm text-red-700">
          {alertState?.errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      );
    } else if (typeof alertState?.errors === "object") {
      // return errors object
    } else if (typeof alertState?.errors === "string") {
      // return errors string
      return (
        <p className="mt-2 text-sm text-red-700 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi assumenda numquam
          deserunt consectetur autem nihil quos debitis dolor culpa.
        </p>
      );
    } else {
      // return empty
      return <></>;
    }
  };

  const ShowMessage = () => {
    return (
      <div
        role="alert"
        className="rounded border-s-4 border-red-500 bg-red-50 p-4 shadow-md w-full"
      >
        <div className="flex items-center gap-2 text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>

          <strong className="block font-medium"> {alertState?.message} </strong>
        </div>

        {alertState?.success ? (
          <p className="mt-2 text-sm text-red-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi assumenda numquam
            deserunt consectetur autem nihil quos debitis dolor culpa.
          </p>
        ) : (
          <FormatErrorResponse />
        )}
      </div>
    );
  };

  const clearMessages = () => {
    setAlertState(undefined);
  };

  return {
    alertState,
    setAlertState,
    ShowMessage,
    clearMessages,
  };
};
export default CustomAlert;
