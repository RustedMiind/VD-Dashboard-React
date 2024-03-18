import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React, { useEffect, useState } from "react";
import SetView from "./Views/Create";
import { useParams } from "react-router-dom";
import { Story } from "../../../../types/Stories";
import axios from "axios";
import { Api } from "../../../../constants";
import { useSnackbar } from "notistack";
import { NumberParam, useQueryParam } from "use-query-params";
import AttachmentsView from "./Views/Attachments";

const steps = ["بيانات القصة", "مرفقات القصة"];

interface Root {
  story: Story;
  message: string;
  status: boolean;
}

async function getStory(id: number | string, params?: unknown): Promise<Story> {
  return (
    await axios.get<Root>(Api(`employee/client/stories/${id}`), {
      headers: {
        from: "dashboard",
      },
    })
  ).data.story;
}

function SetStory() {
  const [paramStep, setStep] = useQueryParam("step", NumberParam);
  const [story, setStory] = useState<Story | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const { storyId } = useParams();
  async function seedStory() {
    if (storyId) {
      try {
        const story = await getStory(storyId);
        setStory(story);
      } catch (error) {
        enqueueSnackbar("تعذر في تحميل بيانات القصة", { variant: "error" });
      }
    }
  }
  const step = +(paramStep || !!paramStep);

  // Fetch story data on init state
  useEffect(() => {
    seedStory();
  }, [storyId]);

  // Render the current step view
  let view: React.ReactNode;
  switch (step) {
    case 1:
      view = <AttachmentsView story={story} seedStory={seedStory} />;
      break;
    default:
      view = <SetView story={story} getStory={seedStory} />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        {storyId ? "تعديل قصة" : "انشاء قصة"}
      </Typography>
      <Box sx={{ width: 1 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              {/* Can navigate between steps only in edit mode */}
              <StepLabel onClick={() => (storyId ? setStep(index) : undefined)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>{view}</Box>
    </Stack>
  );
}

export default SetStory;
