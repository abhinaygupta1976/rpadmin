import { React, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { TableLoader } from "../../components/TableLoader";
import { TableError } from "../../components/TableError";
import { stateContext } from "../../context/StateContext";
import { EditState } from "./EditState";
export const StateTable = ({ axiosState }) => {
  const [states, setStates] = useContext(stateContext);
  if (axiosState.loading) return <TableLoader />;
  if (axiosState.isApiError)
    return <TableError errors={axiosState.apiErrors.errorMessage} />;
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      State Name
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Display Order
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((s) => {
                    return (
                      <tr
                        className="odd:bg-white even:bg-gray-100"
                        key={uuidv4()}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {s.StateName}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {s.DisplayOrder}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <EditState state={s} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              ;
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
