import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
// import { IProfileResponse } from "../../Pages/Profile";

const PersonalInformation = ({
  userData,
  handlePersonalInfoSubmit,
  isProfileUpdating,
}: {
  userData: any;
  handlePersonalInfoSubmit: (firstName: string, lastname: string, phoneNo: string) => Promise<void>;
  isProfileUpdating: boolean;
}) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneNo, setPhoneNo] = useState(userData.phoneNo);

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleChangePhoneNo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(event.target.value);
  };

  const handleSubmit = () => {
    handlePersonalInfoSubmit(firstName, lastName, phoneNo);
  };

  return (
    <div className="tabContent">
      <div className="personalInfoContainer">
        <TextField
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={handleChangeFirstName}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={userData.lastName}
          onChange={handleChangeLastName}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          id="phoneNo"
          label="Phone Number"
          value={userData.phoneNo}
          onChange={handleChangePhoneNo}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </div>
      <Button
        style={{ position: "absolute", left: "40%", marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        {isProfileUpdating ? <CircularProgress color="inherit" /> : "Submit"}
      </Button>
    </div>
  );
};

export default PersonalInformation;
