import tableIcons from "../../Components/MaterialTableIcons";
import SavedUsersBehaviour from "./savedusers.behaviour";
import { ErrorAlert } from "../../Components/FullPageAlerts";
import MaterialTable from "material-table";
import { updateUser, deleteUser } from "../../api/request-layer";

export default function SavedUsers() {
  const { tableData, isLoading, isError, setTableData } = SavedUsersBehaviour();

  if (isError) return <ErrorAlert />;

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        columns={[
          {
            title: "Avatar",
            field: "picture",
            render: (rowData): JSX.Element => (
              <img
                alt={rowData.uuid}
                src={rowData.picture}
                style={{ width: 40, borderRadius: "50%" }}
              />
            ),
          },
          { title: "Name", field: "name" },
          { title: "Gender", field: "gender" },
          { title: "DOB", field: "dob" },
          { title: "Phone", field: "phone" },
        ]}
        data={tableData}
        title="Saved Users"
        isLoading={isLoading}
        options={{
          // actionsColumnIndex: -1,  // Show actions buttons at end or start
          pageSize: 5,
          pageSizeOptions: [5, 10, 15, 20],
          emptyRowsWhenPaging: false,
          actionsCellStyle: { textAlign: "center" },
        }}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            let newTableData: Array<any> = [...tableData];
            const index = oldData?.tableData.id;
            newTableData[index] = newData;
            setTableData([...newTableData]);
            return await updateUser(newData);
          },
          onRowDelete: async (oldData) => {
            let newTableData = [...tableData];
            const index = oldData.tableData.id;
            newTableData.splice(index, 1);
            setTableData(newTableData);
            await deleteUser(oldData.uuid);
          },
        }}
      />
    </div>
  );
}
