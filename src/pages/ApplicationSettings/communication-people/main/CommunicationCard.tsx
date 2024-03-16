import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { CommunicationPerson } from "../../../../types/CommunicationPeople";

function CommunicationCard({ person }: PropsType) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          العميل رقم {person.id}
        </Typography>
        <Typography variant="h5" component="div">
          {person.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {person.phone}
        </Typography>
        <Typography variant="body2">
          {!!person.inside_saudi ? (
            <Typography color="secondary">داخل المملكة</Typography>
          ) : (
            <Typography color="text.secondary">خارج المملكة</Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary" size="small">
          تعديل البيانات
        </Button>
      </CardActions>
    </Card>
  );
}

type PropsType = {
  person: CommunicationPerson;
};

export default CommunicationCard;
