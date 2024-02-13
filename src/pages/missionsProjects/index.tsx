import {
  Box,
  Button,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SelectCustom from "../../components/MuiCustom";
import { useState } from "react";
import MissionsDataTable from "./components/mainTable";
import "./index.scss";

const dummyData = [
  {
    id: "m-1",
    incommingNumber: 123456,
    serviceType: "type 1",
    referenceNumber: "ref 1",
    clientNumber: 1233456,
    clientName: "client 1",
    incommingDate: "11/05/2024",
    finishDate: "11/05/2024",
    prevState: "active",
    responsibleName: "someone",
  },
  {
    id: "m-2",
    incommingNumber: 223456,
    serviceType: "type 2",
    referenceNumber: "ref 2",
    clientNumber: 1233456,
    clientName: "client 1",
    incommingDate: "11/05/2024",
    finishDate: "11/05/2024",
    prevState: "active",
    responsibleName: "someone",
  },
  {
    id: "m-3",
    incommingNumber: 323456,
    serviceType: "type 3",
    referenceNumber: "ref 3",
    clientNumber: 1233456,
    clientName: "client 1",
    incommingDate: "11/05/2024",
    finishDate: "11/05/2024",
    prevState: "active",
    responsibleName: "someone",
  },
];

export default function MissionsProjects() {
  const [searchType, setSearchType] = useState<number>(0);
  const options: { value: number | string; name: string }[] = [
    { value: 1, name: "search type 1" },
    { value: 2, name: "search type 2" },
    { value: 3, name: "search type 3" },
    { value: 4, name: "search type 4" },
  ];
  let searchTypesArr = [
    { val: 0, text: "نوع الخدمة" },
    { val: 1, text: "الرقم المرجعي" },
    { val: 2, text: "اسم العميل" },
    { val: 3, text: "الجهة الحكومية" },
  ];

  const singleRadioBtn = searchTypesArr.map((ele) => {
    return (
      <FormControlLabel
        key={ele.val}
        control={
          <Radio
          onChange={()=>setSearchType(ele.val)}
          checked={searchType === ele.val}
          />
        }
        label={ele.text}
      />
    );
  });

  // return our view
  return (
    <Box>
      <SelectCustom size="small" label="طريقة البحث" options={options} />
      <Box sx={{ margin: "1rem" }}>
        <RadioGroup name="use-radio-group" defaultValue={0}>
          <Box sx={{ mb: 2 }}>{singleRadioBtn}</Box>
        </RadioGroup>
        <Typography variant="h6" fontWeight={700}>
          بحث
        </Typography>
        <TextField fullWidth size="small" placeholder="بحث بالاسم او الرقم" />
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <Button
            sx={{
              bgcolor: "primary.main",
              width: "90%",
              color: "#fff",
              margin: "0.5rem 0",
            }}
            color="primary"
          >
            بحث
          </Button>
        </Box>
      </Box>

      <Button
        sx={{
          padding: "0.7rem",
          fontWeight: 800,
          backgroundColor: "background.paper",
        }}
      >
        المهام الواردة
      </Button>
      <Button
        sx={{
          padding: "0.7rem",
          fontWeight: 800,
          color: "gray",
          backgroundColor: "#fff",
        }}
      >
        المهام الجارية
      </Button>
      <MissionsDataTable missions={dummyData} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "1rem",
          bgcolor: "background.paper",
          borderRadius: "12px",
        }}
      >
        <Typography sx={{ width: "30%" }} fontWeight={"bolder"} variant="body1">
          عدد المهام خلال الشهر
        </Typography>
        <Box
          sx={{
            width: "70%",
            paddingX: "1rem",
          }}
        >
          <Box
            className="missionsBox"
            sx={{
              width: "100%",
              marginTop: "0.3rem",
              position: "relative",
            }}
          >
            <LinearProgress variant="determinate" value={50} />
            <Typography
              sx={{
                display: "flex",
                width: "93px",
                position: "absolute",
                top: "9%",
                left: "2%", //اقل من قيمة ب 20
                fontWeight: 700,
                paddingRight: "0.4rem",
              }}
              variant="body2"
            >
              7
            </Typography>
            <Typography
              sx={{
                display: "flex",
                width: "93px",
                position: "absolute",
                top: "9%",
                right: "0", //اقل من قيمة ب 20
                fontWeight: 700,
                textAlign: "left",
              }}
              variant="body2"
            >
              14
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="body1" fontWeight={800}>
                عدد المهام الواردة
              </Typography>
              <Typography variant="body1" fontWeight={800}>
                عدد المهام الجارية
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
