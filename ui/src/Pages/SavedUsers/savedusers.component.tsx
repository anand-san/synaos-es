import MuiTable from "../../Components/MaterialTable";
import SavedUsersBehaviour from "./savedusers.behaviour";
import {ErrorAlert} from "../../Components/FullPageAlerts"

export default function SavedUsers() {
  const { tableData, isLoading, isError } = SavedUsersBehaviour();

  if (isError) return <ErrorAlert />

  return (
    <div>
      <MuiTable
        columns={[
          {
            title: "Image",
            field: "picture",
            render: (rowData: any): JSX.Element => (
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
        title="Users"
        isLoading={isLoading}
      />
    </div>
  );
}
