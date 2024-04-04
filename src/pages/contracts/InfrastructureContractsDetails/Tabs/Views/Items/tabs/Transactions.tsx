import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useContext, useEffect, useState } from "react";
import { CreateTransactionContext } from "../context/CreateTransactionContext";
import axios from "axios";
import { Api } from "../../../../../../../constants";
import { ContractSubItem } from "../../../../../../../types/Contracts/ContractItems";
import { TransactionType } from "../../../../../../../types/Contracts/ContractTransactionAttachment";
import Loader from "../../../../../../../components/Loading/Loader";

export default function Transactions(props: PropsType) {
  //TODO::declare and define component state and variables
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  // get create transaction context data
  const transactionCxtData = useContext(CreateTransactionContext);
  const [loading, setLoading] = useState(false);

  // TODO::define helpers method
  // * This method will be refresh method in context :)
  const getTransactionData = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get<{
        contract_sub_item: ContractSubItem;
      }>(Api(`employee/contract/items/show-subitem/${id}`));
      setTransactions(data.contract_sub_item.processing || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error in fetch data::", err);
    }
  };

  // Fetch sub item transactions data
  useEffect(() => {
    if (props.activeSubItemId != -1) {
      getTransactionData(props.activeSubItemId);
    }
  }, [props.activeSubItemId]);
  // TODO::define helper variables
  let attachementsBtns = (
    <>
      <RemoveRedEyeIcon />
      <CloudDownloadIcon color="secondary" />
    </>
  );
  let RowItem = ({
    label,
    value,
  }: {
    label: string;
    value: JSX.Element | string;
  }) => (
    <Box marginY={1}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );

  const SingleRow = ({ item }: { item: TransactionType }) => {
    return (
      <Grid
        item
        xs={12}
        padding={2}
        borderRadius={"12px"}
        display={"flex"}
        alignItems={"center"}
        marginY={2}
        justifyContent={"space-around"}
        bgcolor="#fff"
      >
        <RowItem label="رقم المعاملة" value={"" + item.id} />
        <RowItem
          label="تاريخ الارسال"
          value={new Date(item.created_at).toLocaleDateString()}
        />
        <RowItem
          label="عدد الردود"
          value={item?.comments_count ? "" + item?.comments_count : "0"}
        />
        <RowItem
          label="اسم الراسل"
          value={
            item?.system_logs && item?.system_logs?.length > 0
              ? item?.system_logs[0]?.name
              : ""
          }
        />
        <RowItem label="اخر رد" value={"تم ارسال الملف"} />
        <RowItem label="الاجراء" value={"مرسل"} />
        <RowItem label="المرفقات" value={attachementsBtns} />
        <RowItem
          label="اخر تحديث"
          value={new Date(item.updated_at).toLocaleDateString()}
        />
      </Grid>
    );
  };

  return (
    <Grid container xs={12}>
      {loading && <Loader title={"جاري تحميل البنود الفرعية"} />}
      {!loading && transactions.length == 0 && (
        <Stack
          width={"100%"}
          minHeight={"300px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body1" textAlign={"center"} fontWeight={600}>
            لايوجد معاملات فى هذالبند
          </Typography>
        </Stack>
      )}
      {transactions.length > 0 &&
        transactions.map((item) => (
          <SingleRow key={`SR-${item.id}`} item={item} />
        ))}
    </Grid>
  );
}

type PropsType = {
  activeSubItemId: number;
};
